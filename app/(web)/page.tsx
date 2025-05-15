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
      <div className="h-screen w-full" />
      <Footer />
    </main>
  )
}
