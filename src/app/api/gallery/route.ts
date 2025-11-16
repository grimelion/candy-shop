import { NextResponse } from "next/server";
import { Dropbox } from "dropbox";
import type { files } from "dropbox";

export async function GET() {
  try {
    const accessToken = process.env.DROPBOX_ACCESS_TOKEN;
    const folderPath = process.env.DROPBOX_FOLDER_PATH || "";

    if (!accessToken || accessToken === "your_dropbox_access_token_here") {
      return NextResponse.json(
        {
          error: "Dropbox access token not configured",
          message: "Please set DROPBOX_ACCESS_TOKEN in your .env file",
        },
        { status: 500 }
      );
    }

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
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        error: "Failed to fetch photos",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
