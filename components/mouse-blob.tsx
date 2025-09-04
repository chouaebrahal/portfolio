"use client"

import { useEffect, useState } from "react"

export function MouseBlob() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      className="fixed pointer-events-none z-30 transition-transform duration-100 ease-out"
      style={{
        left: mousePosition.x ,
        top: mousePosition.y ,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="w-96 h-96 bg-gradient-to-r from-[#fee715]/5 to-[#fee715]/5 rounded-full blur-2xl animate-pulse" />
    </div>
  )
}
