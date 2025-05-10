"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, User, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold">Travelogue</span>
          </Link>
          <nav className="hidden md:flex md:gap-6">
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Explore
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Destinations
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Community
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>My Trips</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => setIsLoggedIn(true)} className="hidden md:flex">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          )}

          <Button variant="outline" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="container pb-4 md:hidden">
          <nav className="flex flex-col space-y-3">
            <Link
              href="#"
              className="flex items-center rounded-md px-2 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              href="#"
              className="flex items-center rounded-md px-2 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Destinations
            </Link>
            <Link
              href="#"
              className="flex items-center rounded-md px-2 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#"
              className="flex items-center rounded-md px-2 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <div className="pt-2">
              <Button className="w-full" onClick={() => setIsLoggedIn(true)}>
                {isLoggedIn ? "Sign Out" : "Sign In"}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
