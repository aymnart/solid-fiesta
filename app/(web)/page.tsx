import { BorderTrail } from "@/components/general/border-trail"
import PatternGap from "@/components/general/pattern-gap"
import Footer from "@/components/web/footer"
import HeroSection from "@/components/web/hero-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home Page",
  description: "A simple authentication service with sign-in functionality.",
}

export default async function Home() {
  return (
    <main className="flex flex-col gap-10 justify-center items-center w-full mt-14">
      <HeroSection />

      <PatternGap fullwidth className="h-5" />

      <div className="relative flex h-[200px] w-[300px] flex-col items-center justify-center rounded-md bg-card px-5 py-2">
        <BorderTrail gradient size={161} />
        <output
          className="flex h-full animate-pulse flex-col items-start justify-center space-y-2"
          aria-label="Loading..."
        >
          <div className="h-1 w-4 rounded-[4px] bg-muted-foreground" />
          <div className="h-1 w-10 rounded-[4px] bg-muted-foreground" />
          <div className="h-1 w-12 rounded-[4px] bg-muted-foreground" />
          <div className="h-1 w-12 rounded-[4px] bg-muted-foreground" />
          <div className="h-1 w-12 rounded-[4px] bg-muted-foreground" />
        </output>
      </div>
      <PatternGap fullwidth />
      <Footer />
    </main>
  )
}
