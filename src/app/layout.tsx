import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/react-query-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlogPlatform - Share Your Stories with the World",
  description:
    "A modern blogging platform where ideas come to life. Join thousands of writers and readers in our growing community.",
  keywords: "blog, writing, community, stories, publishing",
  authors: [{ name: "BlogPlatform" }],
  openGraph: {
    title: "BlogPlatform - Share Your Stories",
    description: "A modern blogging platform where ideas come to life",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReactQueryProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
