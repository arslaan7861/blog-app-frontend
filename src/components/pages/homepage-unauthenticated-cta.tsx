"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HomepageUnauthenticatedCTA() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Share Your Story?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join our growing community of writers and start publishing today
        </p>
        <Button
          size="lg"
          variant="secondary"
          asChild
          className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
        >
          <Link href="/register">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
