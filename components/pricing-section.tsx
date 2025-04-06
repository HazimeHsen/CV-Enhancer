"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Basic CV analysis for individuals",
      features: [
        "1 CV analysis per month",
        "Basic recommendations",
        "Job description matching",
        "Cover letter generation",
        "Export as PDF or TXT",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "Advanced features for job seekers",
      features: [
        "Unlimited CV analyses",
        "Advanced recommendations",
        "Field compatibility analysis",
        "Learning recommendations",
        "Multiple CV versions",
        "Priority support",
        "ATS optimization",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team management",
        "Bulk CV processing",
        "Custom integrations",
        "Dedicated account manager",
        "Training sessions",
        "Analytics dashboard",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Choose the plan that's right for your career goals
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden border ${
                plan.popular
                  ? "border-blue-600 shadow-lg shadow-blue-100"
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="bg-blue-600 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="ml-1 text-xl font-medium text-gray-500">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-gray-500">{plan.description}</p>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    className={`w-full py-6 ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-900 hover:bg-gray-800"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            All plans include a 14-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </div>
  );
}
