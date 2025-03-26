"use client";

import { useRouter } from "next/navigation";
import { Metadata } from "next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import HeroSection from "@/components/common/HeroSection";
import WritingAssistantSection from "@/components/common/WritingAssistantSection";
import TestimonialsSection from "@/components/common/TestimonialsSection";
import FAQSection from "@/components/common/FAQSection";
import CTASection from "@/components/common/CTASection";
import { useSiteStore } from "@/store/siteStore";
import { useEffect } from "react";

interface Feature {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  image: string;
}

interface Faq {
  id: number;
  question: string;
  answer: string;
}

interface SiteSettings {
  siteTitle: string;
  heroTitle: string;
  heroDescription: string;
  heroPrimaryButtonText: string;
  heroSecondaryButtonText: string;
  writingAssistantTitle: string;
  copyright: string;
}

export const metadata: Metadata = {
  title: "AI Detection Tool",
  description: "Get help with writing, proofreading, and enhancing your content with our advanced AI-powered platform.",
  keywords: "AI writing assistant, content creation, proofreading, AI detection, writing tool",
  openGraph: {
    title: "AI Detection Tool",
    description: "Get help with writing, proofreading, and enhancing your content with our advanced AI-powered platform.",
    url: "https://www.aidectiontool.com",
    siteName: "AI Detection Tool",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Detection Tool"
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: "AI Detection Tool",
    description: "Get help with writing, proofreading, and enhancing your content with our advanced AI-powered platform.",
    images: ["/og-image.jpg"]
  }
};

export default function Home() {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", url: "#" },
        { name: "Pricing", url: "/pricing" },
        { name: "Use Cases", url: "#" },
        { name: "Roadmap", url: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", url: "#" },
        { name: "Tutorials", url: "#" },
        { name: "Documentation", url: "#" },
        { name: "Support", url: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", url: "#" },
        { name: "Careers", url: "#" },
        { name: "Contact", url: "#" },
        { name: "Privacy Policy", url: "#" }
      ]
    }
  ]
  const router = useRouter();
  const { faqs, features, testimonials, siteSettings, loading, error, fetchSiteData } = useSiteStore();

  // Fetch data on mount
  useEffect(() => {
    fetchSiteData();
  }, [fetchSiteData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 p-4">
        <div className="text-red-600 text-lg">{error}</div>
        <button
          onClick={fetchSiteData}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // Add a check for empty data
  if (!faqs.length && !features.length && !testimonials.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">No data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Main Content */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <HeroSection
          title={siteSettings.heroTitle}
          description={siteSettings.heroDescription}
          primaryButtonText={siteSettings.heroPrimaryButtonText}
          secondaryButtonText={siteSettings.heroSecondaryButtonText}
          onPrimaryButtonClick={() => router.push('/pricing')}
          onSecondaryButtonClick={() => router.push('/features')}
        />

        {/* 2. Ultimate Writing Assistant Section */}
        <WritingAssistantSection
          title={siteSettings.writingAssistantTitle}
          features={features.map((feature: Feature) => ({
            image: feature.image,
            title: feature.title,
            description: feature.description,
          }))}
        />

        {/* 3. Testimonials / Join 1,000,000+ writers section */}
        <TestimonialsSection
          title="Join 1,000,000+ writers using AI Detection Tool"
          testimonials={testimonials.map((testimonial: Testimonial) => ({
            image: testimonial.image,
            quote: testimonial.quote,
            author: testimonial.author,
            role: testimonial.role,
          }))}
        />

        {/* 4. FAQ Section */}
        <FAQSection
          title="Frequently Asked Questions"
          faqs={faqs.map((faq: Faq) => ({
            question: faq.question,
            answer: faq.answer,
          }))}
        />

        {/* 5. CTA Section - Try AI Detection Tool for free today */}
        <CTASection
          title="Try AI Detection Tool for free today"
          description="Join over a million writers who've transformed their writing with our powerful AI assistant."
          buttonText="Get Started Free"
          onButtonClick={() => router.push('/auth/register')}
        />
      </main>

      {/* Footer */}
      <Footer
        siteTitle={siteSettings.siteTitle}
        copyright={siteSettings.copyright}
        footerLinks={footerLinks}
      />
    </div>
  );
}
