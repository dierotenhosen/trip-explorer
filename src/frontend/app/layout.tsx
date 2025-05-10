import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Travelogue - Journeys All Around The World",
  description: "Discover the landscapes, delicious cuisine, and unforgettable experiences from fellow travelers."
}

export default function RootLayout({children}: {readonly children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
