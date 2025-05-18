"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, User, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const router = useRouter()
  
  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Failed to sign out:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold">Travelogue</span>
          </Link>
          <nav className="hidden md:flex md:gap-6">
            <Link href="/explore" className="text-sm font-medium transition-colors hover:text-primary">
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
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>Dashboard</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>My Trips</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/signin">
              <Button className="hidden md:flex">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
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
              href="/explore"
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
              {user ? (
                <Button className="w-full" onClick={handleSignOut}>
                  Sign Out
                </Button>
              ) : (
                <Link href="/signin" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
