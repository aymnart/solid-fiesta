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
        <div className="btn-container">
          <div className="btn">
            <button type="button" onClick={() => window.history.back()}>
              <ArrowLeft className="opacity-70 size-3 sm:size-5 mr-1.5" /> Previous page
            </button>
          </div>
          <div className="btn">
            <Link href="/">
              <Home className="opacity-70 size-3 sm:size-5 mr-1.5" /> Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
