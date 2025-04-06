"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FileText, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <div className="bg-blue-600 text-white p-2 rounded-lg mr-2">
              <FileText className="h-6 w-6" />
            </div>
            <span className="font-bold text-xl text-gray-900">CV Enhancer</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#benefits"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Benefits
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/enhancer">
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-6">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 sm:px-6 lg:px-8 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link
              href="#features"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#benefits"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Benefits
            </Link>
            <Link href="/enhancer" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="bg-blue-600 hover:bg-blue-700 w-full rounded-full">Get Started</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

