import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: {
    default:
      "Interview Prep Checklist | Software Engineering Interview Preparation",
    template: "%s | Interview Prep Checklist",
  },
  description:
    "Comprehensive interactive checklist for software engineering interview preparation. Track your progress through DSA, System Design, OOP, Operating Systems, Computer Networks, and more.",
  keywords: [
    "software engineering interview",
    "coding interview preparation",
    "data structures and algorithms",
    "system design",
    "interview checklist",
    "programming interview",
    "technical interview prep",
    "DSA practice",
    "leetcode preparation",
    "software engineer jobs",
  ],
  authors: [{ name: "Interview Prep Team" }],
  creator: "Interview Prep Checklist",
  publisher: "Interview Prep Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://interview-prep-checklist.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://interview-prep-checklist.vercel.app",
    title:
      "Interview Prep Checklist | Software Engineering Interview Preparation",
    description:
      "Master your software engineering interviews with our comprehensive interactive checklist. Track progress through 150+ topics including DSA, System Design, and more.",
    siteName: "Interview Prep Checklist",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Interview Prep Checklist - Software Engineering Interview Preparation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Interview Prep Checklist | Software Engineering Interview Preparation",
    description:
      "Master your software engineering interviews with our comprehensive interactive checklist.",
    images: ["/og-image.png"],
    creator: "@interviewprep",
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "education",
  classification: "Educational Technology",
  referrer: "origin-when-cross-origin",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: [
      { url: "assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "assets/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "Interview Prep",
    statusBarStyle: "default",
  },
  applicationName: "Interview Prep Checklist",
  generator: "Next.js",
  abstract:
    "Interactive checklist platform for comprehensive software engineering interview preparation covering all essential topics from data structures to system design.",
  archives: ["https://interview-prep-checklist.vercel.app/archive"],
  assets: ["https://interview-prep-checklist.vercel.app/assets"],
  bookmarks: ["https://interview-prep-checklist.vercel.app/bookmarks"],
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "theme-color": "#ffffff",
    "color-scheme": "light dark",
    "supported-color-schemes": "light dark",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Interview Prep" />
        <meta name="application-name" content="Interview Prep Checklist" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body
        className={`font-manrope antialiased bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen`}
      >
        <div className="relative">
          {/* Futuristic background pattern */}
          <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
          <div className="relative z-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
