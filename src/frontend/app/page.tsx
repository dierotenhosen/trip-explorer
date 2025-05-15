"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Camera, Video, Utensils, Route, Map } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { GlobeMap } from "@/components/globe-map"

export default function Home() {
  // In a real app, this would come from an auth provider
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section with Globe Map */}
      <section className="relative w-full">
        <div className="h-[80vh]">
          <GlobeMap isLoggedIn={isLoggedIn} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent py-8">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Share Your Experiences
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setIsLoggedIn(!isLoggedIn)}>
                {isLoggedIn ? "View as Guest" : "Sign In"}
              </Button>
              <Link href="/explore">
                <Button size="lg" variant="outline">
                  Explore Trips
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
{/*       <section className="container mx-auto px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">Enrich Your Adventures with Travelogue</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Track Your Journeys",
              description: "Record your trips with detailed routes, check-ins, and statistics.",
              icon: <Route className="h-10 w-10" />,
            },
            {
              title: "Organize Memories",
              description: "Keep your photos, videos, and experiences organized by trip and location.",
              icon: <Camera className="h-10 w-10" />,
            },
            {
              title: "Discover New Places",
              description: "Get inspired by other travelers and find your next destination.",
              icon: <Map className="h-10 w-10" />,
            },
            {
              title: "Food Adventures",
              description: "Document the culinary highlights from your travels.",
              icon: <Utensils className="h-10 w-10" />,
            },
            {
              title: "Share Experiences",
              description: "Share your journeys with friends, family, or the world.",
              icon: <Video className="h-10 w-10" />,
            },
            {
              title: "Travel Stats",
              description: "Visualize your travel statistics and achievements.",
              icon: <MapPin className="h-10 w-10" />,
            },
          ].map((feature, i) => (
            <Card key={i} className="flex flex-col items-center text-center p-6">
              <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>
 */}
      {/* Footer */}
      <footer className="bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="text-xl font-bold">Travelogue</h2>
            </div>
            <nav className="flex gap-6">
              <Link href="/explore" className="text-sm hover:underline">
                Explore
              </Link>
              <Link href="#" className="text-sm hover:underline">
                Destinations
              </Link>
              <Link href="#" className="text-sm hover:underline">
                Community
              </Link>
              <Link href="#" className="text-sm hover:underline">
                About
              </Link>
            </nav>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Travelogue. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
