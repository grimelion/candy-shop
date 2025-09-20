"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-destructive">Something went wrong!</CardTitle>
          <CardDescription>
            We encountered an unexpected error while loading the page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Error ID: {error.digest || "Unknown"}
          </p>
          <div className="flex flex-col gap-2">
            <Button onClick={reset} className="w-full">
              Try again
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">Go home</Link>
            </Button>
            <Button variant="ghost" asChild className="w-full">
              <a href="tel:+12675889191">Call us: (267) 588-9191</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}