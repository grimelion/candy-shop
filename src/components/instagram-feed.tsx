"use client";

import { useEffect, useState } from "react";
import Instafeed from "instafeed.js";

// interface InstagramPost {
//   id: string;
//   caption: string;
//   media_url: string;
//   permalink: string;
//   timestamp: string;
//   media_type: string;
// }

interface OEmbedResponse {
  html: string;
  width: number;
  height: number;
  type: string;
  version: string;
  title: string;
  author_name: string;
  author_url: string;
  provider_name: string;
  provider_url: string;
}

async function fetchInstagramOEmbed(
  postUrl: string
): Promise<OEmbedResponse | null> {
  try {
    const response = await fetch(
      `/api/instagram-embed?url=${encodeURIComponent(postUrl)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch oEmbed data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching Instagram oEmbed:", error);
    return null;
  }
}

function InstagramPostEmbed({ postUrl }: { postUrl: string }) {
  const [embedHtml, setEmbedHtml] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstagramOEmbed(postUrl).then((data) => {
      if (data) {
        setEmbedHtml(data.html);
      }
      setLoading(false);
    });
  }, [postUrl]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!embedHtml) {
    return (
      <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
        <p className="text-muted-foreground">Failed to load post</p>
      </div>
    );
  }

  return (
    <div
      className="instagram-embed"
      dangerouslySetInnerHTML={{ __html: embedHtml }}
    />
  );
}

export function InstagramFeed() {
  const [posts, setPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Create a temporary container for Instafeed
    const tempContainer = document.createElement("div");
    tempContainer.style.display = "none";
    document.body.appendChild(tempContainer);
    console.log(process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN);
    const feed = new Instafeed({
      accessToken: process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN || "",
      limit: 6,
      template: '<div data-permalink="{{link}}"></div>',
      target: tempContainer,
      after: function () {
        // Extract permalinks from the generated content
        const permalinks: string[] = [];
        const elements = tempContainer.querySelectorAll("[data-permalink]");
        elements.forEach((el) => {
          const permalink = el.getAttribute("data-permalink");
          if (permalink) {
            permalinks.push(permalink);
          }
        });

        setPosts(permalinks);
        setLoading(false);

        // Clean up
        document.body.removeChild(tempContainer);
      },
      error: function (message: string) {
        console.error("Instafeed error:", message);
        setError(message);
        setLoading(false);
        document.body.removeChild(tempContainer);
      },
    });

    try {
      feed.run();
    } catch (err) {
      console.error("Failed to initialize Instafeed:", err);
      setError("Failed to load Instagram posts");
      setLoading(false);
      document.body.removeChild(tempContainer);
    }

    // Load Instagram embed script
    if (
      !document.querySelector(
        'script[src="https://www.instagram.com/embed.js"]'
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Sweet Moments</h2>
            <p className="text-muted-foreground">
              Loading latest posts from Instagram...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex justify-center">
                <div className="flex items-center justify-center h-64 w-full max-w-sm bg-muted rounded-lg">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Sweet Moments</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unable to load Instagram posts at the moment. Please visit our
              Instagram directly:{" "}
              <a
                href="https://www.instagram.com/googahlinis_candy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                @googahlinis_candy
              </a>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Sweet Moments</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow our latest creations and behind-the-scenes moments on
            Instagram{" "}
            <a
              href="https://www.instagram.com/googahlinis_candy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              @googahlinis_candy
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posts.map((postUrl, index) => (
            <div key={index} className="flex justify-center">
              <InstagramPostEmbed postUrl={postUrl} />
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/googahlinis_candy/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Follow us on Instagram for more sweet moments
          </a>
        </div>
      </div>
    </section>
  );
}

// Global type for Instagram embed script
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process(): void;
      };
    };
  }
}
