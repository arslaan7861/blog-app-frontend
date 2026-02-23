import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/react-query-provider";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WriteCraft - Share Your Stories with the World",
  description:
    "A modern blogging platform where ideas come to life. Join thousands of writers and readers in our growing community.",
  keywords: "blog, writing, community, stories, publishing",
  authors: [{ name: "WriteCraft" }],
  openGraph: {
    title: "WriteCraft - Share Your Stories",
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
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster theme="light" richColors position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
