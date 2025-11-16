"use client"

import { useState } from "react"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import Image from "next/image"
import mapImage from "@/app/assets/map.png"

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "1rem",
}

// Coordinates for 3605 Chapel Rd, Newtown Square, PA 19073
const center = {
  lat: 39.9929,
  lng: -75.3999,
}

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
}

const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Googahlinis+candy+land/data=!4m2!3m1!1s0x0:0xfb5bf5e78ca35b62?sa=X&ved=1t:2428&ictx=111"

function StaticMapFallback() {
  return (
    <a
      href={GOOGLE_MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="block aspect-video rounded-2xl overflow-hidden border border-[rgba(255,107,157,0.1)] relative group cursor-pointer"
    >
      <Image
        src={mapImage}
        alt="Map to Googahlin's Candy Shop"
        fill
        className="object-cover transition-opacity group-hover:opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
        <span className="text-white font-semibold text-sm">
          Click to open in Google Maps
        </span>
      </div>
    </a>
  )
}

export function StoreMap() {
  const [hasError, setHasError] = useState(false)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  // If no API key or error occurred, show static map fallback
  if (!apiKey || hasError) {
    return <StaticMapFallback />
  }

  return (
    <div className="aspect-video rounded-2xl overflow-hidden border border-[rgba(255,107,157,0.1)]">
      <LoadScript
        googleMapsApiKey={apiKey}
        onError={() => setHasError(true)}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={15}
          options={mapOptions}
        >
          <Marker position={center} title="Googahlin's Candy Shop" />
        </GoogleMap>
      </LoadScript>
    </div>
  )
}
