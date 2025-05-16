import { BorderTrail } from "@/components/general/border-trail"
import GridPattern from "@/components/general/grid-pattern"
import Footer from "@/components/web/footer"
import HeroSection from "@/components/web/hero-section"
import Divider from "@components/ui/divider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home Page",
  description: "A simple authentication service with sign-in functionality.",
}

export default async function Home() {
  return (
    <main className="flex flex-col gap-10 justify-center items-center w-full mt-20">
      <GridPattern />
      <HeroSection />
      <Divider
        styleChildren
        className="w-[70%] sm:w-[60%] md:w-[39%]"
        variant="gradient"
        color="hsl(var(--muted-foreground))"
        thickness="0.2rem"
      >
        <span className="w-6 h-2 bg-muted-foreground rounded-xl" />
      </Divider>
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
      <div className="h-screen w-full" />
      <Footer />
    </main>
  )
}
