import { blogsServiceServer } from "@/features/blogs/blog.service.server";
import {
  HomepageHeroSection,
  HomepageStatsSectionContent,
  HomepageFeaturedBlogsContent,
  HomepageUnauthenticatedCTAContent,
  HomepageAuthenticatedCTAContent,
} from "./homepage-server-components";

export const homepageComponentsServer = {
  HeroSection: () => <HomepageHeroSection />,

  StatsSection: () => <HomepageStatsSectionContent />,

  FeaturedBlogsSection: async () => {
    try {
      const feedData = await blogsServiceServer.getFeed(1, 9, 30);
      const blogs = feedData?.data || [];
      return <HomepageFeaturedBlogsContent blogs={blogs} />;
    } catch (error) {
      console.error("Error fetching featured blogs:", error);
      return <HomepageFeaturedBlogsContent blogs={[]} />;
    }
  },

  CTASection: async () => {
    return <HomepageUnauthenticatedCTAContent />;
  },
};
