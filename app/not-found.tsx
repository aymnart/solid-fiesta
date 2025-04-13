"use client"
import "@/css/not-found.css"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <section className="room">
      <div className="cuboid">
        <div className="side" />
        <div className="side" />
        <div className="side" />
      </div>
      <div className="oops">
        <h2>OOPS!</h2>
        <p>We can&apos;t find the page that you&apos;re looking for :(</p>
      </div>
      <div className="center-line">
        <div className="hole">
          <div className="ladder-shadow" />
          <div className="ladder" />
        </div>
        <div className="four">4</div>
        <div className="four">4</div>
        <div className="btn">
          <button type="button" onClick={() => window.history.back()}>
            <ArrowLeft className="opacity-70" /> Back to previous page
          </button>
          <Link href={"/"}>
            {" "}
            <Home className="opacity-70" /> Home
          </Link>
        </div>
      </div>
    </section>
  )
}
