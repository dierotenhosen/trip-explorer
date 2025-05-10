"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock user data
type Trip = {
  id: string
  title: string
  date: string
  days: number
  kilometers: number
  imageUrl: string
  locations: { name: string; lat: number; lng: number }[]
}

type User = {
  name: string
  avatar: string
  countries: number
  followers: number
  following: number
  trips: Trip[]
}

// Mock data for demonstration
const mockUser: User = {
  name: "Corneliu C",
  avatar: "/placeholder.svg?height=100&width=100&text=C",
  countries: 4,
  followers: 0,
  following: 0,
  trips: [
    {
      id: "trip1",
      title: "Vietnam, Laos, Cambodia & China",
      date: "2025 APRIL",
      days: 17,
      kilometers: 1865,
      imageUrl: "/placeholder.svg?height=200&width=300&text=Vietnam",
      locations: [
        { name: "Hanoi", lat: 21.0285, lng: 105.8542 },
        { name: "Luang Prabang", lat: 19.8867, lng: 102.1359 },
        { name: "Phnom Penh", lat: 11.5564, lng: 104.9282 },
        { name: "Ho Chi Minh", lat: 10.8231, lng: 106.6297 },
      ],
    },
    {
      id: "trip2",
      title: "Portugal",
      date: "2025 MARCH",
      days: 5,
      kilometers: 123,
      imageUrl: "/placeholder.svg?height=200&width=300&text=Portugal",
      locations: [
        { name: "Lisbon", lat: 38.7223, lng: -9.1393 },
        { name: "Porto", lat: 41.1579, lng: -8.6291 },
      ],
    },
  ],
}

export function GlobeMap({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const [activeTab, setActiveTab] = useState<"trips" | "statistics">("trips")

  return (
    <div className="w-full bg-background">
      <div className="flex flex-col lg:flex-row">
        {/* Map */}
        <div className="w-full h-[600px] lg:h-[calc(100vh-64px)] relative">
          {/* For demonstration, we'll use an image of the map */}
          <Image
            src="/landing-page-for-corneliu.png.jpeg"
            alt="Travel map"
            fill
            className="object-cover"
          />

          {/* Map pins - would be dynamic in a real implementation */}
          {isLoggedIn && (
            <>
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </div>
              </div>
              <div className="absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
