/**
 * Renders a decorative grid pattern background using CSS gradients and masking.
 *
 * The grid consists of horizontal and vertical lines with a muted color,
 * spaced at 35px by 34px intervals. A radial mask is applied to create a
 * vignette effect, fading the grid towards the edges.
 *
 * @returns {JSX.Element} A div element with the grid pattern as its background.
 */
export default function GridPattern() {
  return (
    <div className="absolute inset-0 -z-50 bg-[linear-gradient(to_right,hsl(var(--muted))_1.618px,transparent_1.618px),linear-gradient(to_bottom,hsl(var(--muted))_1.618px,transparent_1px)] bg-[size:35px_35px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
  )
}
