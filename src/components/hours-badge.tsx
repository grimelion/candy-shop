"use client"

import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/content/site"
import { useMemo } from "react"

interface HoursBadgeProps {
  className?: string
}

export function HoursBadge({ className }: HoursBadgeProps) {
  const { isOpen, nextChange } = useMemo(() => {
    const now = new Date()
    const dayMap = {
      0: "sunday",
      1: "monday",
      2: "tuesday",
      3: "wednesday",
      4: "thursday",
      5: "friday",
      6: "saturday"
    } as const

    const currentDay = dayMap[now.getDay() as keyof typeof dayMap]
    const currentTime = now.getHours() * 60 + now.getMinutes()

    const todayHours = siteConfig.hours[currentDay as keyof typeof siteConfig.hours]

    // Since the shop is open every day, we don't need to check for "Closed" days

    // Parse opening hours (format: "9:00 AM - 6:00 PM")
    const [openTime, closeTime] = todayHours.split(" - ")
    const parseTime = (timeStr: string) => {
      const [time, period] = timeStr.split(" ")
      const [hours, minutes] = time.split(":").map(Number)
      const adjustedHours = period === "PM" && hours !== 12 ? hours + 12 :
                           period === "AM" && hours === 12 ? 0 : hours
      return adjustedHours * 60 + minutes
    }

    const openMinutes = parseTime(openTime)
    const closeMinutes = parseTime(closeTime)

    if (currentTime >= openMinutes && currentTime < closeMinutes) {
      const minutesUntilClose = closeMinutes - currentTime
      const hoursUntilClose = Math.floor(minutesUntilClose / 60)
      const remainingMinutes = minutesUntilClose % 60

      return {
        isOpen: true,
        nextChange: hoursUntilClose > 0
          ? `Closes in ${hoursUntilClose}h ${remainingMinutes}m`
          : `Closes in ${remainingMinutes}m`
      }
    } else {
      const tomorrow = new Date(now)
      tomorrow.setDate(now.getDate() + 1)

      // Get tomorrow's hours
      const tomorrowDayIndex = (now.getDay() + 1) % 7
      const tomorrowDayName = dayMap[tomorrowDayIndex as keyof typeof dayMap]
      const tomorrowHours = siteConfig.hours[tomorrowDayName as keyof typeof siteConfig.hours]
      const tomorrowOpenTime = tomorrowHours.split(" - ")[0]

      return {
        isOpen: false,
        nextChange: currentTime < openMinutes
          ? `Opens today at ${openTime}`
          : `Opens tomorrow at ${tomorrowOpenTime}`
      }
    }
  }, [])

  return (
    <Badge
      variant={isOpen ? "default" : "secondary"}
      className={className}
    >
      <div className="flex items-center gap-1">
        <div className={`w-2 h-2 rounded-full ${isOpen ? "bg-green-500" : "bg-red-500"}`} />
        <span className="font-medium">
          {isOpen ? "Open" : "Closed"}
        </span>
        {nextChange && (
          <span className="text-xs opacity-75 ml-1">
            • {nextChange}
          </span>
        )}
      </div>
    </Badge>
  )
}