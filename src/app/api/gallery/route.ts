import { NextResponse } from "next/server";
import { Dropbox } from "dropbox";
import type { files } from "dropbox";

// Cache for refreshed access token
let cachedAccessToken: string | null = null;
let tokenExpiry: number = 0;

async function getAccessToken(): Promise<string> {
  // If we have a cached token that's still valid, use it
  if (cachedAccessToken && Date.now() < tokenExpiry) {
    return cachedAccessToken;
  }

  const refreshToken = process.env.DROPBOX_REFRESH_TOKEN;
  const appKey = process.env.DROPBOX_APP_KEY;
  const appSecret = process.env.DROPBOX_APP_SECRET;

  // If refresh token credentials are available, use them
  if (refreshToken && appKey && appSecret) {
    try {
      const response = await fetch("https://api.dropbox.com/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: appKey,
          client_secret: appSecret,
        }).toString(),
      });

      const responseText = await response.text();

      if (!response.ok) {
        console.error("Refresh token error response:", responseText);
        throw new Error(`Failed to refresh token: ${response.status} - ${responseText}`);
      }

      const data = JSON.parse(responseText);
      cachedAccessToken = data.access_token;
      // Set expiry to 3.5 hours (tokens last 4 hours, refresh early)
      tokenExpiry = Date.now() + 3.5 * 60 * 60 * 1000;

      console.log("✅ Token refreshed successfully");
      return cachedAccessToken as string;
    } catch (error) {
      console.error("Error refreshing token:", error);
      console.log("Falling back to DROPBOX_ACCESS_TOKEN");
      // Don't throw, fall through to use access token
    }
  }

  // Fall back to direct access token
  const accessToken = process.env.DROPBOX_ACCESS_TOKEN;
  if (!accessToken || accessToken === "your_dropbox_access_token_here") {
    throw new Error("No valid Dropbox credentials configured");
  }

  return accessToken;
}

export async function GET() {
  try {
    const folderPath = process.env.DROPBOX_FOLDER_PATH || "";
    const accessToken = await getAccessToken();

    const dbx = new Dropbox({
      accessToken,
      fetch: fetch.bind(globalThis),
    });

    // List files in the specified folder
    const response = await dbx.filesListFolder({
      path: folderPath,
      limit: 100,
    });

    // Filter for image files and get temporary links
    // Note: HEIC removed as it's not supported by browsers
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const imageFiles = response.result.entries.filter(
      (entry): entry is files.FileMetadataReference =>
        entry[".tag"] === "file" &&
        imageExtensions.some((ext) => entry.name.toLowerCase().endsWith(ext))
    );

    // Get temporary links for each image
    const photos = await Promise.all(
      imageFiles.map(async (file) => {
        try {
          // Get temporary link for image
          const linkResponse = await dbx.filesGetTemporaryLink({
            path: file.path_lower || "",
          });

          const imageUrl = linkResponse.result.link;

          return {
            id: file.id,
            name: file.name,
            thumbnailLink: imageUrl,
            link: imageUrl,
            size: file.size,
          };
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
          return null;
        }
      })
    );

    // Filter out failed uploads
    const validPhotos = photos.filter((photo) => photo !== null);

    return NextResponse.json({
      photos: validPhotos,
      count: validPhotos.length,
    });
  } catch (error: unknown) {
    console.error("Dropbox API error:", error);

    let errorMessage = "Failed to fetch photos from Dropbox";
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
      if (errorMessage.includes("credentials")) {
        statusCode = 401;
      }
    }

    return NextResponse.json(
      {
        error: "Failed to fetch photos",
        message: errorMessage,
      },
      { status: statusCode }
    );
  }
}
