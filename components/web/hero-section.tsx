"use client"
import { AnimatedGroup } from "@/components/ui/animated-group"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { memo, useMemo } from "react"
import { H, headingVariants } from "../general/heading"
import DecryptedText from "./decrypted-text"

/**
 * HeroSection component displays the top section of the page with
 * background visuals, call-to-action, and animated headline/subheadings.
 *
 * - Uses Framer Motion variants for smooth transition animation.
 * - TextEffect provides per-character or per-line fade-in animations.
 * - Supports full accessibility and responsiveness.
 *
 * @component
 * @returns {JSX.Element} The hero section for the homepage.
 */
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
    <main className="overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
      >
        <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
        <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
      </div>
      <section>
        <div className="relative mt-4">
          <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]" />
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
              <AnimatedGroup variants={transitionVariants}>
                <Link
                  href="#link"
                  className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-0 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                >
                  <H as="h6" className="text-muted-foreground text-xs capitalize">
                    Explore Web3 Tools
                  </H>
                  <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700" />

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
              <div className="w-[61%] mx-auto">
                <DecryptedText
                  className={cn(headingVariants({ size: "h1" }), "text-foreground")}
                  text="Your Roadmap to the Decentralized Web"
                  animateOn="view"
                  encryptedClassName={cn(headingVariants({ size: "h1" }), "text-primary")}
                  speed={35}
                  revealDirection="start"
                  sequential
                  useOriginalCharsOnly
                />
              </div>
              <div className="w-[61%] mx-auto mt-4">
                <H as="h5" variant={"subtle"} align={"center"}>
                  Discover top Web3 tools, dApps, and services — curated to help you build, explore,
                  and thrive in the decentralized ecosystem.
                </H>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
})

export default HeroSection
