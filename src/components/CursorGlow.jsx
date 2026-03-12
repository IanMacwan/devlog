import { useEffect, useRef } from "react"

export default function CursorBlob() {
  const blobRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const t = useRef(0)

  useEffect(() => {
    const blob = blobRef.current

    const onMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }

    const animate = () => {
      t.current += 0.03 // faster morphing

      // tighter follow (but still fluid)
      const dx = target.current.x - pos.current.x
      const dy = target.current.y - pos.current.y
      pos.current.x += dx * 0.14
      pos.current.y += dy * 0.14

      const speed = Math.sqrt(dx * dx + dy * dy)

      // exaggerated organic noise
      const wobble1 = Math.sin(t.current * 2.4) * 18
      const wobble2 = Math.cos(t.current * 2.1) * 22
      const wobble3 = Math.sin(t.current * 1.7) * 16
      const wobble4 = Math.cos(t.current * 2.9) * 20

      // micro-blob shape morphing
      const r1 = 42 + wobble1 + speed * 0.18
      const r2 = 58 + wobble2 - speed * 0.14
      const r3 = 55 + wobble3 + speed * 0.16
      const r4 = 45 + wobble4 - speed * 0.12

      blob.style.left = `${pos.current.x}px`
      blob.style.top = `${pos.current.y}px`

      blob.style.borderRadius = `
        ${r1}% ${r2}% ${r3}% ${r4}% /
        ${r3}% ${r1}% ${r4}% ${r2}%
      `

      // strong liquid deformation
      const stretchX = 1 + Math.min(speed * 0.006, 0.6)
      const stretchY = 1 - Math.min(speed * 0.004, 0.45)
      const angle = Math.atan2(dy, dx) * (180 / Math.PI)

      blob.style.transform = `
        translate(-50%, -50%)
        rotate(${angle}deg)
        scale(${stretchX}, ${stretchY})
      `

      requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", onMove)
    animate()

    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <div
      ref={blobRef}
      className="
        pointer-events-none
        fixed
        z-[3]
        w-[50px]
        h-[50px]
        bg-accent
        opacity-[0.22]
        blur-[25px]
      "
    />
  )
}
