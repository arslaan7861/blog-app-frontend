"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/ui/hero-section";

interface HomepageHeroProps {
  isAuthenticated: boolean;
}

export function HomepageHero({ isAuthenticated }: HomepageHeroProps) {
  return (
    <HeroSection
      title="Share Your Stories with the World"
      subtitle="A modern blogging platform where ideas come to life. Join thousands of writers and readers in our growing community."
      showCta={!isAuthenticated}
    />
  );
}
