"use client";

import Link from "next/link";
import {
  FileText,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 text-white p-2 rounded-lg mr-2">
                <FileText className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg">CV Enhancer</span>
            </div>
            <p className="text-gray-400 mb-6">
              AI-powered CV enhancement to help you land your dream job. We use
              advanced algorithms to analyze your resume and provide tailored
              recommendations.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Mail className="h-4 w-4 mr-3" />
                <span className="text-sm">contact@cvenhancer.com</span>
              </div>
              <div className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Phone className="h-4 w-4 mr-3" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-400 hover:text-white transition-colors">
                <MapPin className="h-4 w-4 mr-3" />
                <span className="text-sm">123 Innovation St, Tech City</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/enhancer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Get Started
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" />
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="#benefits"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Benefits
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Career Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" />
                  CV Templates
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/gdpr"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" />
                  GDPR Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} CV Enhancer. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
