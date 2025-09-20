import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  return (
    <>
      {children}
      <Analytics />
      <SpeedInsights />
    </>
  )
}

export function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    try {
      // Vercel Analytics injects this globally - using bracket notation to avoid type issues
      const va = (window as unknown as Record<string, unknown>)['va']
      if (typeof va === 'function') {
        va('track', name, properties)
      }
    } catch (error) {
      console.warn('Failed to track event:', error)
    }
  }
}