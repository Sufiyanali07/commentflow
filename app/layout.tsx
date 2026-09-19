import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://commentflow.io"),
  title: {
    default: "CommentFlow — Instagram Comment to DM Automation & Chatbot Tool",
    template: "%s | CommentFlow",
  },
  description:
    "Automate Instagram comments to private DMs in under 800ms. Boost Reels engagement, auto-deliver links, PDFs, and discount codes, and convert followers into customers with official Meta Graph API compliance.",
  keywords: [
    "Instagram comment to DM automation",
    "Instagram comment automation",
    "Instagram DM automation tool",
    "Instagram chatbot for creators",
    "automate Instagram comments",
    "Instagram Reels comment trigger",
    "Instagram lead generation automation",
    "Instagram sales funnel",
    "Instagram DM auto reply",
    "Meta Graph API Instagram automation",
    "Instagram bio link alternative",
    "Instagram marketing automation",
    "Instagram DM marketing software",
    "ManyChat alternative Instagram",
    "Instagram direct message chatbot",
    "social media direct message automation",
  ],
  authors: [{ name: "CommentFlow Studio", url: "https://commentflow.io" }],
  creator: "CommentFlow",
  publisher: "CommentFlow Studio",
  other: {
    "focus-keywords":
      "Instagram comment to DM automation, Instagram comment automation, Reels comment trigger, Instagram DM chatbot, Meta Graph API automation",
    "news_keywords":
      "Instagram comment automation, Instagram DM marketing, Meta Graph API chatbot, social media conversion",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://commentflow.io",
    title: "CommentFlow — Instagram Comment to DM Automation",
    description:
      "Convert comments on your Instagram Reels and Posts into automated private DMs, leads, and sales in under 800ms with official Meta Graph API compliance.",
    siteName: "CommentFlow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CommentFlow — Instagram Comment to DM Automation Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CommentFlow — Instagram Comment to DM Automation",
    description:
      "Convert comments on your Instagram Reels and Posts into automated private DMs, leads, and sales in under 800ms.",
    creator: "@commentflow",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "CommentFlow",
        "operatingSystem": "All (Web-based SaaS)",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Social Media Marketing Automation",
        "url": "https://commentflow.io",
        "description":
          "Automated comment-to-DM trigger engine for Instagram creators and businesses. Powered by official Meta Graph API.",
        "keywords":
          "Instagram comment to DM automation, Instagram comment automation, Reels comment trigger, Instagram DM chatbot, Instagram lead generator",
        "featureList": [
          "Instant Comment-to-DM trigger (<800ms)",
          "Context-aware AI comment variations",
          "Multi-step lead qualification in DMs",
          "Story mentions and live stream triggers",
          "CRM Webhook and Zapier integrations",
          "Official Meta Graph API compliance",
        ],
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "INR",
          "lowPrice": "1899",
          "highPrice": "14999",
          "offerCount": "3",
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "128",
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://commentflow.io/",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "The Concept",
            "item": "https://commentflow.io/#concept",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Core Capabilities",
            "item": "https://commentflow.io/#pillars",
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Pricing Spectrum (INR)",
            "item": "https://commentflow.io/#pricing",
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Request Private Access",
            "item": "https://commentflow.io/#contact",
          },
        ],
      },
      {
        "@type": "Organization",
        "name": "CommentFlow Studio",
        "url": "https://commentflow.io",
        "logo": "https://commentflow.io/logo.png",
        "sameAs": [
          "https://instagram.com/commentflow",
          "https://twitter.com/commentflow",
        ],
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${instrumentSerif.variable} h-full antialiased light`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF8FB] text-[#262626] font-sans selection:bg-[#FCEDF5] selection:text-[#C13584]">
        {children}
      </body>
    </html>
  );
}
