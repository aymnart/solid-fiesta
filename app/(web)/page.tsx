import Footer from "@/components/web/footer"
import HeroSection from "@/components/web/hero-section"
import Divider from "@components/ui/divider"
import { Heart } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home Page",
  description: "A simple authentication service with sign-in functionality.",
}

export default async function Home() {
  return (
    <main className="flex flex-col justify-center items-center w-full mt-20">
      <HeroSection />
      <Divider variant="gradient" color="hsl(var(--primary))" thickness="0.2rem">
        <Heart color="hsl(var(--primary))" fill="hsl(var(--primary))" />
      </Divider>
      <Footer />
    </main>
  )
}
