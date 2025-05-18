"use client"
import { AnimatedGroup } from "@/components/ui/animated-group"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { memo, useMemo } from "react"
import BackgroundPattern from "../general/background-pattern"
import { H, headingVariants } from "../general/heading"
import { Separator } from "../ui/separator"
import DecryptedText from "./decrypted-text"
import Spotlight from "./spotlight"

const HeroSection = memo(function HeroSection() {
  const transitionVariants = useMemo(
    () => ({
      item: {
        hidden: {
          opacity: 0,
          filter: "blur(12px)",
          y: 12,
        },
        visible: {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          transition: {
            type: "spring",
            bounce: 0.3,
            duration: 1.5,
          },
        },
      },
    }),
    [],
  )

  return (
    <section className="overflow-hidden relative">
      <Spotlight />

      <BackgroundPattern type="grid" />
      <section>
        <div className="relative mt-4">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
              <AnimatedGroup variants={transitionVariants}>
                <Link
                  href="#link"
                  className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-0 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300"
                >
                  <H as="h6" className="text-muted-foreground text-xs capitalize">
                    Explore Web3 Tools
                  </H>
                  <Separator
                    orientation="vertical"
                    className="border-background block h-4 w-0.5 border-l"
                  />

                  <div className="bg-background group-hover:bg-muted size-5 m-0.5 overflow-hidden rounded-full duration-500">
                    <div className="flex w-10 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                      <span className="flex size-5">
                        <ArrowRight className="m-auto size-3" />
                      </span>
                      <span className="flex size-5">
                        <ArrowRight className="m-auto size-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedGroup>
              <div className="w-[61%] mx-auto mt-1.5">
                <DecryptedText
                  className={cn(headingVariants({ size: "h2" }), "text-foreground")}
                  text="Your Roadmap to the Decentralized Web"
                  animateOn="view"
                  encryptedClassName={cn(headingVariants({ size: "h2" }), "text-primary")}
                  speed={35}
                  revealDirection="center"
                  sequential
                  useOriginalCharsOnly
                />
              </div>
              <div className="w-[61%] mx-auto mt-4">
                <H as="h5" variant={"subtle"} align="center">
                  Discover top Web3 tools, dApps, and services — curated to help you build, explore,
                  and thrive in the decentralized ecosystem.
                </H>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
})

export default HeroSection
