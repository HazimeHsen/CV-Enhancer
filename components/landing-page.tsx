"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Briefcase,
  Award,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  BarChart,
  Shield,
  Zap,
  Check,
} from "lucide-react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { TestimonialSlider } from "./testimonial-slider";

export function LandingPage() {
  const features = [
    {
      icon: <FileText className="h-6 w-6 text-white" />,
      bgColor: "bg-blue-600",
      title: "CV Analysis",
      description:
        "Get detailed feedback on your CV with GitHub-style diff view showing exactly what to change.",
    },
    {
      icon: <Briefcase className="h-6 w-6 text-white" />,
      bgColor: "bg-green-600",
      title: "Job Targeting",
      description:
        "Tailor your CV to specific job descriptions to increase your chances of getting interviews.",
    },
    {
      icon: <Award className="h-6 w-6 text-white" />,
      bgColor: "bg-amber-600",
      title: "Learning Recommendations",
      description:
        "Discover skills, certifications, and qualifications that will make you more competitive.",
    },
    {
      icon: <BarChart className="h-6 w-6 text-white" />,
      bgColor: "bg-purple-600",
      title: "Field Compatibility",
      description:
        "See how well your experience matches the job field and get tips to bridge any gaps.",
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      bgColor: "bg-red-600",
      title: "ATS Optimization",
      description:
        "Ensure your CV passes through Applicant Tracking Systems with optimized keywords and formatting.",
    },
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      bgColor: "bg-yellow-600",
      title: "Instant Cover Letters",
      description:
        "Generate tailored cover letters that complement your CV and address specific job requirements.",
    },
  ];

  const benefits = [
    "Increase interview callbacks by up to 40%",
    "Save hours of manual CV editing",
    "Get professional insights without hiring a resume writer",
    "Learn what skills to develop for your dream job",
    "Stand out from other applicants with a tailored CV",
    "Improve your chances with ATS-optimized formatting",
  ];

  return (
    <main className="flex-grow">
      <section className="relative bg-gradient-to-br from-white via-blue-50 to-indigo-50 py-56 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 "></div>
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 "></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6">
                AI-Powered CV Enhancement
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                <span className="block">Enhance Your CV with</span>
                <span className="block text-blue-600">AI-Powered Analysis</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600">
                Get professional feedback on your CV, tailored to specific job
                descriptions, with clear recommendations on what to improve and
                what skills to develop.
              </p>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/enhancer">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg rounded-full bg-blue-600 hover:bg-blue-700 transition-all w-full sm:w-auto shadow-lg hover:shadow-xl"
                  >
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg rounded-full w-full sm:w-auto border-2"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="bg-blue-600 text-white p-2 rounded-lg mr-2">
                        <FileText className="h-6 w-6" />
                      </div>
                      <span className="font-bold text-xl text-gray-900">
                        CV Analysis
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-3 rounded-md border border-green-100">
                      <div className="flex items-center">
                        <div className="text-green-700 w-4 flex-shrink-0 select-none">
                          +
                        </div>
                        <div className="text-green-900 text-sm font-mono">
                          Implemented responsive design patterns
                        </div>
                      </div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-md border border-red-100">
                      <div className="flex items-center">
                        <div className="text-red-700 w-4 flex-shrink-0 select-none">
                          -
                        </div>
                        <div className="text-red-900 text-sm font-mono">
                          Developed website
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                      <p className="text-blue-800 text-sm">
                        <span className="font-medium">Recommendation:</span> Be
                        more specific about your achievements and use metrics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-10 -right-10 bg-white p-4 rounded-xl shadow-lg transform -rotate-3 hidden md:block">
                <div className="flex items-center">
                  <div className="rounded-full bg-green-100 p-2">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    ATS Optimized
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg transform rotate-6 hidden md:block">
                <div className="flex items-center">
                  <div className="rounded-full bg-blue-100 p-2">
                    <Award className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    Field Match: 92%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">40%</p>
              <p className="text-gray-600 mt-2">More Interview Callbacks</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">10k+</p>
              <p className="text-gray-600 mt-2">CVs Enhanced</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">95%</p>
              <p className="text-gray-600 mt-2">Customer Satisfaction</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">3x</p>
              <p className="text-gray-600 mt-2">Faster Job Search</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">
              Features
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Powerful Features
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Everything you need to create a standout CV that gets you noticed.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-all hover:translate-y-[-5px]"
              >
                <div
                  className={`rounded-xl ${feature.bgColor} w-14 h-14 flex items-center justify-center mb-6`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">
              Process
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Three simple steps to transform your CV
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 md:ml-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                  <span className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg mr-2">
                    1
                  </span>
                  Upload Your CV
                </h3>
                <p className="text-gray-600 mb-4">
                  Upload your current CV in PDF format. Our system will analyze
                  the content and structure.
                </p>
                <img
                  src="/placeholder.svg?height=120&width=240"
                  alt="Upload CV illustration"
                  className="w-full h-32 object-cover rounded-lg bg-gray-100"
                />
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 md:ml-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                  <span className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg mr-2">
                    2
                  </span>
                  Add Job Description
                </h3>

                <p className="text-gray-600 mb-4">
                  Paste the job description you're applying for. This helps our
                  AI tailor recommendations specifically for that role.
                </p>
                <img
                  src="/placeholder.svg?height=120&width=240"
                  alt="Job description illustration"
                  className="w-full h-32 object-cover rounded-lg bg-gray-100"
                />
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 md:ml-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                  <span className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg mr-2">
                    3
                  </span>
                  Get Recommendations
                </h3>

                <p className="text-gray-600 mb-4">
                  Receive detailed recommendations on how to improve your CV,
                  what skills to highlight, and get a tailored cover letter.
                </p>
                <img
                  src="/placeholder.svg?height=120&width=240"
                  alt="Recommendations illustration"
                  className="w-full h-32 object-cover rounded-lg bg-gray-100"
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/enhancer">
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 py-6 text-lg shadow-md hover:shadow-lg">
                Try It Now <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">
              Benefits
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Use CV Enhancer?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Stand out from the competition and land your dream job.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start p-5 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="rounded-full bg-green-100 p-2 mr-4 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-lg text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/enhancer">
              <Button
                size="lg"
                className="px-8 py-6 text-lg rounded-full bg-blue-600 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                Enhance Your CV Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">
              Testimonials
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Users Say
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Real success stories from people who landed their dream jobs.
            </p>
          </div>

          <TestimonialSlider />
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to transform your job search?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-blue-100">
            Join thousands of successful job seekers who have improved their CVs
            and landed their dream jobs.
          </p>
          <div className="mt-8">
            <Link href="/sign-in">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-6 text-lg rounded-full bg-white text-blue-600 hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started For Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
