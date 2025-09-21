import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="hidden md:flex items-center">
            <Skeleton className="h-8 w-8 rounded" />
          </div>
          <Skeleton className="h-8 w-48" />
          <div className="hidden md:flex items-center">
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>
          <div className="md:hidden">
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>
      </div>

      <main>
        {/* Hero Section Skeleton */}
        <section className="relative overflow-hidden bg-background">
          <div className="container mx-auto px-4 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full max-w-lg" />
                  <Skeleton className="h-12 w-full max-w-md lg:hidden" />
                  <Skeleton className="h-6 w-full max-w-xl" />
                  <Skeleton className="h-6 w-full max-w-lg" />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Skeleton className="h-12 w-36 rounded-md" />
                </div>
                <div className="flex items-center space-x-6">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-28" />
                </div>
              </div>
              <div className="relative">
                <Skeleton className="aspect-square w-full rounded-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Skeleton */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Skeleton className="h-10 w-64 mx-auto mb-4" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group">
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6">
                      <Skeleton className="aspect-[4/3] w-full rounded-lg mb-4" />
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-5/6 mb-4" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional sections skeleton */}
        <div className="space-y-16 pb-16">
          {[1, 2, 3].map((i) => (
            <section key={i} className="py-16">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <Skeleton className="h-8 w-48 mx-auto mb-4" />
                  <Skeleton className="h-6 w-72 mx-auto" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Skeleton className="h-64 w-full rounded-lg" />
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-5/6" />
                    <Skeleton className="h-6 w-4/5" />
                    <Skeleton className="h-10 w-32 rounded-md" />
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Footer Skeleton */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-24" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            ))}
          </div>
          <div className="border-t mt-8 pt-8">
            <Skeleton className="h-4 w-64 mx-auto" />
          </div>
        </div>
      </footer>
    </div>
  )
}