"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Camera, Video, Utensils, Route, Map } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Track Your Journey</h1>
            <p className="mb-8 mx-auto max-w-2xl text-lg md:text-xl">
              Document your travels, share your experiences, and discover new destinations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setIsLoggedIn(!isLoggedIn)}>
                {isLoggedIn ? "View as Guest" : "Sign In"}
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Welcome to Travelogue</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Your personal travel journal. Document your journeys, share your experiences, and connect with fellow
            travelers around the world.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-muted-foreground" />
              <span>Photos</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="h-5 w-5 text-muted-foreground" />
              <span>Videos</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span>Check-ins</span>
            </div>
            <div className="flex items-center gap-2">
              <Utensils className="h-5 w-5 text-muted-foreground" />
              <span>Food</span>
            </div>
            <div className="flex items-center gap-2">
              <Route className="h-5 w-5 text-muted-foreground" />
              <span>Routes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold tracking-tight">Popular Destinations</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Explore some of the most visited places by our community
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Southeast Asia", countries: "Vietnam, Cambodia, Laos", photos: 1200 },
              { title: "Western Europe", countries: "Portugal, Spain, France", photos: 1800 },
              { title: "South America", countries: "Brazil, Argentina, Chile", photos: 950 },
            ].map((destination, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={`/placeholder.svg?height=300&width=600&text=${destination.title}`}
                    alt={destination.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{destination.title}</h3>
                  <div className="mb-4 flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{destination.countries}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Camera className="h-4 w-4" />
                      <span>{destination.photos}+ photos</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Explore
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">Why Use Travelogue</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            The perfect platform to document and share your travel experiences
          </p>
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

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">Ready to Start Your Journey?</h2>
          <p className="mb-8 mx-auto max-w-2xl">
            Join thousands of travelers documenting their adventures and sharing their experiences.
          </p>
          <Button size="lg" variant="secondary" onClick={() => setIsLoggedIn(true)}>
            Get Started
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="text-xl font-bold">Travelogue</h2>
              <p className="text-sm text-muted-foreground">Your Personal Travel Journal</p>
            </div>
            <nav className="flex gap-6">
              <Link href="#" className="text-sm hover:underline">
                Features
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
              <Link href="#" className="text-sm hover:underline">
                Contact
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
