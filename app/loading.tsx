import "@/css/cube-loader.css"
export default function Loading() {
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
