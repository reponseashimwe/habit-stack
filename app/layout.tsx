import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import GlobalContextProvider from "./contextApi";

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "Your habits tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/logo.png" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Meta for Theme Color */}
        <meta name="theme-color" content="#4A90E2" />

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

        {/* Prevent Content Sniffing */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />

        {/* PWA Description */}
        <meta name="description" content="Your habits tracker" />
      </head>
      <ClerkProvider>
        <GlobalContextProvider>
          <body>{children}</body>
        </GlobalContextProvider>
      </ClerkProvider>
    </html>
  );
}
