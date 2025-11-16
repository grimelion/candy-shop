'use client';

import { useState, useEffect } from 'react';

interface Photo {
  id: string;
  name: string;
  thumbnailLink: string;
  link: string;
  size: number;
}

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch('/api/gallery');
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        const data = await response.json();
        setPhotos(data.photos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold mb-2">Error loading gallery</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-gray-600">No photos found in the gallery.</p>
      </div>
    );
  }

  return (
    <>
      <div className="gallery-container">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="gallery-item group cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="relative rounded-lg shadow-md hover:shadow-xl active:shadow-2xl transition-all duration-300 overflow-hidden bg-gray-100 h-full">
              <img
                src={photo.thumbnailLink}
                alt={photo.name}
                loading="lazy"
                className="gallery-image rounded-lg group-hover:scale-105 group-active:scale-95 transition-transform duration-300"
                onError={(e) => {
                  console.error('Image failed to load:', photo.name, photo.thumbnailLink);
                }}
                onLoad={(e) => {
                  console.log('Image loaded successfully:', photo.name);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 text-4xl sm:text-5xl font-light w-12 h-12 flex items-center justify-center bg-black bg-opacity-50 rounded-full"
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={selectedPhoto.link}
              alt={selectedPhoto.name}
              className="max-w-full max-h-[85vh] sm:max-h-[90vh] w-auto h-auto object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white text-center mt-4 px-4 text-sm sm:text-base">{selectedPhoto.name}</p>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Mobile: Grid layout with uniform squares */
        .gallery-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
          padding: 0;
          width: 100%;
        }

        .gallery-item {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }

        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Small mobile - tighter spacing */
        @media (max-width: 374px) {
          .gallery-container {
            gap: 0.375rem;
          }
        }

        /* Tablet - 3 columns grid */
        @media (min-width: 640px) and (max-width: 1023px) {
          .gallery-container {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
          }
        }

        /* Desktop: ORIGINAL MASONRY BENTO LAYOUT */
        @media (min-width: 1024px) {
          .gallery-container {
            display: block;
            column-count: 3;
            column-gap: 1rem;
            padding: 1rem;
          }

          .gallery-item {
            break-inside: avoid;
            margin-bottom: 1rem;
            display: block;
            width: 100%;
            aspect-ratio: auto;
          }

          .gallery-image {
            display: block;
            width: 100%;
            height: auto;
          }
        }

        /* Large desktop - 4 columns masonry */
        @media (min-width: 1280px) {
          .gallery-container {
            column-count: 4;
          }
        }
      `}</style>
    </>
  );
}
