import Divider from "@/components/ui/divider"
import { Heart } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home Page",
  description: "A simple authentication service with sign-in functionality.",
}

export default async function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-full">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl drop-shadow-md font-semibold text-foreground">Auth</h1>
        <p className="text-foreground capitalize text-lg">simple authentication service</p>

        <div className="mx-auto flex flex-col text-balance gap-4 h-96 w-[61ch] items-center justify-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia dolorum deleniti
          perferendis sunt perspiciatis, mollitia vel illum sapiente voluptates architecto
          laudantium. Voluptatum, quae blanditiis, non magni eaque sit autem suscipit soluta omnis
          odit iste aperiam vero nesciunt, saepe corrupti cupiditate. Quisquam ducimus laborum
          laboriosam ut asperiores illum sapiente? Exercitationem, autem!
          <Divider
            styleChildren
            orientation="h"
            color="hsl(var(--primary))"
            thickness={4}
            variant="gradient"
            className="w-[60%]"
          >
            {/* <div className="rounded-full m-0 bg-current h-1.5 w-4" /> */}
            {/* <span className="flex text-muted-foreground mx-1 w-max">or</span> */}
            <Heart fill="hsl(var(--primary))" className="size-4" />
            <Heart fill="hsl(var(--primary))" className="size-4" />
            <Heart fill="hsl(var(--primary))" className="size-4" />
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
