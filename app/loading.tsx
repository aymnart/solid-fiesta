import "@css/cube-loader.css"
import type { JSX } from "react"
/**
 * Loading component for the app
 * @description This component is used to display a loading cube animation
 */
const Loading = (): JSX.Element => {
  return (
    <main className="flex justify-center items-center h-screen w-screen">
      <div className="cube-wrapper ">
        <div className="cube">
          <div className="face" />
          <div className="face" />
          <div className="face" />
          <div className="face" />
          <div className="face" />
          <div className="face" />
        </div>
      </div>
    </main>
  )
}

export default Loading
