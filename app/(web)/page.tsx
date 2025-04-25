import Footer from "@/components/web/footer"
import HeroSection from "@/components/web/hero-section"
import Divider from "@components/ui/divider"
import { Circle, X } from "lucide-react"
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
        className="w-[39%]"
        variant="gradient"
        color="hsl(var(--primary))"
        thickness="0.2rem"
      >
        <X fill="hsl(var(--primary))" size={20} strokeWidth={2.5} />
        <Circle fill="hsl(var(--primary))" size={16} />
        <X fill="hsl(var(--primary))" size={20} strokeWidth={2.5} />
      </Divider>
      <Footer />
    </main>
  )
}
