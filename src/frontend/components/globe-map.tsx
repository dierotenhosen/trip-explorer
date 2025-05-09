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
        {/* Left sidebar - User profile and trips */}
        <div className="w-full lg:w-1/4 border-r">
          {isLoggedIn ? (
            <>
              {/* User profile */}
              <div className="p-6 flex flex-col items-center border-b">
                <div className="relative h-16 w-16 rounded-full overflow-hidden mb-4">
                  <Image
                    src={mockUser.avatar || "/placeholder.svg"}
                    alt={mockUser.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold">{mockUser.name} 🇩🇪</h3>

                <div className="flex w-full justify-between mt-4 text-center">
                  <div>
                    <div className="text-xl font-bold">{mockUser.countries}</div>
                    <div className="text-xs text-muted-foreground">Countries</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{mockUser.followers}</div>
                    <div className="text-xs text-muted-foreground">Followers</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{mockUser.following}</div>
                    <div className="text-xs text-muted-foreground">Following</div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b">
                <button
                  className={`flex-1 py-3 text-center font-medium ${activeTab === "trips" ? "border-b-2 border-primary" : ""}`}
                  onClick={() => setActiveTab("trips")}
                >
                  Trips
                </button>
                <button
                  className={`flex-1 py-3 text-center font-medium ${activeTab === "statistics" ? "border-b-2 border-primary" : ""}`}
                  onClick={() => setActiveTab("statistics")}
                >
                  Statistics
                </button>
              </div>

              {/* Add trip button */}
              <div className="p-4">
                <Button className="w-full">Add a past, current or future trip</Button>
              </div>

              {/* Trip list */}
              <div className="overflow-auto max-h-[calc(100vh-400px)]">
                {mockUser.trips.map((trip) => (
                  <Card key={trip.id} className="m-4 overflow-hidden border">
                    <div className="relative h-40">
                      <Image src={trip.imageUrl || "/placeholder.svg"} alt={trip.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                        <h3 className="text-xl font-bold text-white">{trip.title}</h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-medium">{trip.date}</div>
                        <div className="flex gap-4">
                          <div className="text-center">
                            <div className="font-bold">{trip.days}</div>
                            <div className="text-xs text-muted-foreground">DAYS</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold">{trip.kilometers}</div>
                            <div className="text-xs text-muted-foreground">KILOMETERS</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="p-6 flex flex-col items-center justify-center h-full">
              <h3 className="text-xl font-bold mb-4">Track Your Travels</h3>
              <p className="text-center text-muted-foreground mb-6">
                Sign in to track your journeys, save memories, and share your adventures.
              </p>
              <Button>Sign In</Button>
            </div>
          )}
        </div>

        {/* Right side - Map */}
        <div className="w-full lg:w-3/4 h-[600px] lg:h-[calc(100vh-64px)] relative">
          {/* For demonstration, we'll use an image of the map */}
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/landing-page-for-corneliu.png-MDzieaRPnQF3MWfO2CJxSfamCYNiqj.jpeg"
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

          {/* Overlay for non-logged in users */}
          {!isLoggedIn && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="bg-white/90 p-6 rounded-lg max-w-md text-center">
                <h3 className="text-xl font-bold mb-2">Explore the World</h3>
                <p className="mb-4">Sign in to see your travel history and plan new adventures.</p>
                <Button>Get Started</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
