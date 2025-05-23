"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export function TestimonialSlider() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Thompson",
      role: "Software Engineer",
      company: "TechCorp",
      avatar: "S",
      content:
        "After using CV Enhancer, I received callbacks from 4 out of 6 companies I applied to. The tailored recommendations made all the difference!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Marketing Manager",
      company: "BrandWave",
      avatar: "M",
      content:
        "The learning recommendations helped me identify skills I needed to develop. Three months later, I landed a job that was previously out of reach.",
      rating: 5,
    },
    {
      id: 3,
      name: "Jessica Lee",
      role: "Data Analyst",
      company: "DataInsight",
      avatar: "J",
      content:
        "The cover letter generator saved me hours of work and produced better results than I could have written myself. Highly recommended!",
      rating: 4,
    },
    {
      id: 4,
      name: "David Chen",
      role: "Product Manager",
      company: "InnovateTech",
      avatar: "D",
      content:
        "CV Enhancer helped me transition from engineering to product management by highlighting my transferable skills. The field compatibility analysis was incredibly valuable.",
      rating: 5,
    },
    {
      id: 5,
      name: "Emma Wilson",
      role: "UX Designer",
      company: "DesignHub",
      avatar: "E",
      content:
        "As a designer, I was skeptical about an AI tool understanding my portfolio needs, but CV Enhancer surprised me. It helped me articulate my design process in ways recruiters appreciate.",
      rating: 4,
    },
    {
      id: 6,
      name: "James Johnson",
      role: "Financial Analyst",
      company: "CapitalGroup",
      avatar: "J",
      content:
        "The industry-specific recommendations were spot on. I was able to highlight relevant financial metrics and achievements that caught the attention of hiring managers.",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate max index based on screen size
  const maxIndex = testimonials.length - slidesPerView;

  // Update slides per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3); // Desktop: 3 slides
      } else if (window.innerWidth >= 640) {
        setSlidesPerView(2); // Tablet: 2 slides
      } else {
        setSlidesPerView(1); // Mobile: 1 slide
      }
    };

    // Initial calculation
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoplay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex >= maxIndex ? 0 : prevIndex + 1
        );
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [autoplay, maxIndex]);

  // Ensure currentIndex is valid when slidesPerView changes
  useEffect(() => {
    if (currentIndex > maxIndex && maxIndex >= 0) {
      setCurrentIndex(maxIndex);
    }
  }, [slidesPerView, currentIndex, maxIndex]);

  const handlePrev = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  };

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const getAvatarColor = (id: number) => {
    const colors = [
      "bg-blue-100 text-blue-600",
      "bg-green-100 text-green-600",
      "bg-amber-100 text-amber-600",
      "bg-purple-100 text-purple-600",
      "bg-pink-100 text-pink-600",
      "bg-indigo-100 text-indigo-600",
    ];
    return colors[id % colors.length];
  };

  const translatePercentage =
    slidesPerView === 1
      ? currentIndex * 100
      : slidesPerView === 2
      ? currentIndex * 50
      : currentIndex * (100 / 3);

  return (
    <div className="relative px-8 sm:px-10">
      {/* Navigation Buttons - Repositioned for better mobile experience */}
      <div className="absolute inset-y-0 left-0 z-10 flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white shadow-md hover:bg-gray-50"
          onClick={handlePrev}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="absolute inset-y-0 right-0 z-10 flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white shadow-md hover:bg-gray-50"
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Testimonial Cards */}
      <div className="overflow-hidden py-2" ref={containerRef}>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${translatePercentage}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
            >
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 h-full border border-gray-100 flex flex-col">
                <div className="mb-4 flex justify-between items-start">
                  <div className="flex items-center">
                    <div
                      className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full ${getAvatarColor(
                        testimonial.id
                      )} flex items-center justify-center text-lg sm:text-xl font-bold`}
                    >
                      {testimonial.avatar}
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <Quote className="h-5 w-5 sm:h-6 sm:w-6 text-blue-200 flex-shrink-0" />
                </div>

                <p className="text-gray-600 italic flex-grow text-sm sm:text-base">
                  "{testimonial.content}"
                </p>

                <div className="flex mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star
                      key={i + testimonial.rating}
                      className="h-4 w-4 text-gray-200"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center space-x-2">
        {maxIndex >= 0 &&
          Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex ? "bg-blue-600 w-4" : "bg-gray-300"
              }`}
              onClick={() => {
                setAutoplay(false);
                setCurrentIndex(index);
              }}
              aria-label={`Go to testimonial group ${index + 1}`}
            />
          ))}
      </div>
    </div>
  );
}
