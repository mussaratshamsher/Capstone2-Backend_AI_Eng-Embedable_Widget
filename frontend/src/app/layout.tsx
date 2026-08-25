import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";


const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "LeadForge — AI-Powered Lead Capture Platform",
    template: "%s | LeadForge",
  },
  description:
    "Deploy intelligent AI widgets that engage visitors, qualify leads, and capture valuable business insights in real-time. The future of lead generation is here.",
  keywords: [
    "AI widget",
    "lead capture",
    "chatbot",
    "lead qualification",
    "LeadForge",
    "FlyRank",
    "AI sales",
    "conversion optimization",
  ],
  authors: [{ name: "Mussarat Shamsher" }],
  creator: "Mussarat Shamsher",
  publisher: "LeadForge",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: 'data:image/svg+xml,<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="logoGrad1" x1="0%25" y1="0%25" x2="100%25" y2="100%25"><stop offset="0%25" stop-color="%23c4b5fd" /><stop offset="100%25" stop-color="%236d28d9" /></linearGradient><linearGradient id="logoGrad2" x1="0%25" y1="0%25" x2="100%25" y2="100%25"><stop offset="0%25" stop-color="%23818cf8" /><stop offset="100%25" stop-color="%233b82f6" /></linearGradient><filter id="logoGlow"><feGaussianBlur stdDeviation="1.5" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter></defs><path d="M20 2L35 10V30L20 38L5 30V10L20 2Z" fill="url(%23logoGrad1)" opacity="0.15" /><path d="M20 2L35 10V30L20 38L5 30V10L20 2Z" stroke="url(%23logoGrad1)" stroke-width="1.2" fill="none" /><path d="M23 6L13 21H20L17 34L28 18H21L23 6Z" fill="url(%23logoGrad2)" filter="url(%23logoGlow)" /></svg>'
  },
  openGraph: {
    title: "LeadForge — AI-Powered Lead Capture",
    description: "Turn visitors into qualified leads with intelligent AI widgets.",
    url: "/",
    siteName: "LeadForge",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadForge — AI-Powered Lead Capture",
    description: "Turn visitors into qualified leads with intelligent AI widgets.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col antialiased" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
