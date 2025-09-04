"use client"

import { User, Briefcase, FileText, Mail, Settings, Menu, X } from "lucide-react"

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function Sidebar({ currentPage, onPageChange, isOpen, setIsOpen }: SidebarProps) {
  const navItems = [
    { id: "about", icon: User, label: "ABOUT" },
    { id: "projects", icon: Briefcase, label: "PROJECTS" },
    { id: "resume", icon: FileText, label: "RESUME" },
    { id: "contact", icon: Mail, label: "CONTACT" },
    { id: "admin", icon: Settings, label: "ADMIN" },
  ]

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 md:top-1/2 md:-translate-y-1/2
          h-full md:h-auto
          bg-[#101820] border-r border-gray-800 flex flex-col z-50 rounded-r-lg
          transition-all duration-300 ease-in-out

          ${/* Mobile: absolute overlay */ ""}
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          w-16 px-0 py-8

          ${/* Desktop: toggle mini ↔ expanded */ ""}
          md:translate-x-0
          ${isOpen ? "md:w-48 md:px-4 md:py-6" : "md:w-16 md:px-0 md:py-8"}
        `}
      >
        {/* Expand/Collapse button (desktop only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden md:flex w-10 h-10 rounded-lg mb-4 items-center justify-center text-[#fee715] hover:bg-gray-800 transition-all duration-200 cursor-pointer mx-auto"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Close button (mobile only) */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden w-10 h-10 rounded-lg mb-4 flex items-center justify-center text-[#fee715] hover:bg-gray-800 transition-all duration-200 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Navigation items */}
        <div className="flex flex-col items-center space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id

            return (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id)
                  setIsOpen(false) // close on mobile after click
                }}
                className={`${
                  isOpen ? "md:w-full md:h-12 md:px-4 md:justify-start" : "w-10 h-10 justify-center"
                } rounded-lg flex items-center transition-all duration-200 group relative cursor-pointer ${
                  isActive
                    ? "bg-[#fee715] p-2 text-[#101820] shadow-lg shadow-[#fee715]/20"
                    : "text-gray-400 p-2 hover:text-[#fee715] hover:bg-gray-800/50"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />

                {/* Show labels only when expanded on desktop */}
                <span
                  className={`ml-3 text-sm font-medium transition-all duration-200 ${
                    isOpen ? "block opacity-100 " : "hidden opacity-0 overflow-hidden"
                  }`}
                >
                  {item.label}
                </span>

                {/* Tooltip for mobile since it’s mini only */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap md:hidden">
                  {item.label}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
