import { LoginButton } from "@/components/auth/login-button"
import { Button } from "@/components/ui/button"
import Divider from "@/components/ui/divider"
import type { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Home Page",
  description: "A simple authentication service with sign-in functionality.",
}

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-full">
      <div className="space-y-6 text-center">
        <h1 className={"text-6xl drop-shadow-md font-semibold text-foreground"}>Auth</h1>
        <p className="text-foreground capitalize text-lg">simple authentication service</p>

        <LoginButton mode="redirect">sign in</LoginButton>
        <div className="mx-auto flex  text-balance gap-4 h-96 w-[61ch] items-center justify-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia dolorum deleniti
          perferendis sunt perspiciatis, mollitia vel illum sapiente voluptates architecto
          laudantium. Voluptatum, quae blanditiis, non magni eaque sit autem suscipit soluta omnis
          odit iste aperiam vero nesciunt, saepe corrupti cupiditate. Quisquam ducimus laborum
          laboriosam ut asperiores illum sapiente? Exercitationem, autem!
          <Divider
            styleChildren
            orientation="v"
            thickness={3}
            variant="gradient"
            className="h-[60%]"
          >
            <div className="rounded-full m-0 bg-current h-4 w-1.5" />
            {/* <span className="flex mx-1 font-semibold w-max">or</span> */}
          </Divider>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia dolorum deleniti
          perferendis sunt perspiciatis, mollitia vel illum sapiente voluptates architecto
          laudantium. Voluptatum, quae blanditiis, non magni eaque sit autem suscipit soluta omnis
          odit iste aperiam vero nesciunt, saepe corrupti cupiditate. Quisquam ducimus laborum
          laboriosam ut asperiores illum sapiente? Exercitationem, autem!
        </div>
      </div>
    </main>
  )
}
