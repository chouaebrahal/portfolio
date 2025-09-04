"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Linkedin, Github, Mail, ExternalLink, Download } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { AboutPage } from "@/components/pages/about-page"
import { ProjectsPage } from "@/components/pages/projects-page"
import { ProjectDetailPage } from "@/components/pages/project-detail-page"
import { ResumePage } from "@/components/pages/resume-page"
import { ContactPage } from "@/components/pages/contact-page"
import { AdminPage } from "@/components/pages/admin-page"
import { LoginPage } from "@/components/auth/login-page"
import { MouseBlob } from "@/components/mouse-blob"
import { getProjectById, getPersonalInfo } from "@/lib/data"
import Link from "next/link"

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState("about")
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [personalInfo, setPersonalInfo] = useState(getPersonalInfo())
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const newPersonalInfo = getPersonalInfo()
      if (JSON.stringify(newPersonalInfo) !== JSON.stringify(personalInfo)) {
        setPersonalInfo(newPersonalInfo)
      }
    }, 500) // More frequent updates for better responsiveness
    return () => clearInterval(interval)
  }, [personalInfo])

  const handleProjectSelect = (projectId: number) => {
    setSelectedProjectId(projectId)
    setCurrentPage("project-detail")
  }

  const handleBackToProjects = () => {
    setSelectedProjectId(null)
    setCurrentPage("projects")
  }

  const handlePageChange = (page: string) => {
    if (page === "admin") {
      if (!isAuthenticated) {
        setShowLogin(true)
        return
      }
    }

    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentPage(page)
      setIsTransitioning(false)
    }, 150) // Short delay for smooth transition
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
    setShowLogin(false)
    setCurrentPage("admin")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentPage("about")
  }

  const handleBackFromLogin = () => {
    setShowLogin(false)
  }

  const handleDownloadCV = () => {
    const cvUrl = personalInfo.cvUrl || "/assets/cv/cv-w-eng.pdf"
    const link = document.createElement("a")
    link.href = cvUrl
    link.download = "Chouaeb-Rahal-CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (showLogin) {
    return <LoginPage onLogin={handleLogin} onBack={handleBackFromLogin} />
  }

  const renderPage = () => {
    switch (currentPage) {
      case "about":
        return (
          <AboutPage
            onProjectSelect={handleProjectSelect}
            onViewMore={() => setCurrentPage("projects")}
          />
        )
      case "projects":
        return <ProjectsPage onProjectSelect={handleProjectSelect} />
      case "project-detail":
        if (selectedProjectId) {
          const project = getProjectById(selectedProjectId)
          if (project) {
            return <ProjectDetailPage project={project} onBack={handleBackToProjects} />
          }
        }
        return <ProjectsPage onProjectSelect={handleProjectSelect} />
      case "resume":
        return <ResumePage />
      case "contact":
        return <ContactPage />
      case "admin":
        return <AdminPage onLogout={handleLogout} />
      default:
        return (
          <AboutPage
            onProjectSelect={handleProjectSelect}
            onViewMore={() => setCurrentPage("projects")}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#101820] text-white overflow-x-hidden">
      <MouseBlob />

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        * {
          cursor: default;
        }
        
        button, a, [role="button"], .cursor-pointer {
          cursor: pointer !important;
        }
        
        button:hover, a:hover, [role="button"]:hover {
          transform: translateY(-1px);
          transition: all 0.2s ease;
        }
      `}</style>

      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage === "project-detail" ? "projects" : currentPage}
        onPageChange={handlePageChange}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className=" transition-all duration-300 ease-in-out">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-800/50 backdrop-blur-sm bg-[#101820]/90 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <Menu className="w-5 h-5 text-[#fee715] md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}/>
            <div className="hidden sm:flex items-center gap-2  ">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-[#fee715] rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <X className="hidden md:block w-4 h-4 text-gray-400 hover:text-[#fee715] cursor-pointer transition-all duration-200 hover:scale-110" />
            <ExternalLink className="w-4 h-4 text-gray-400 hover:text-[#fee715] cursor-pointer transition-all duration-200 hover:scale-110" />
            <Link href={"https://www.linkedin.com/in/chouaeb-rahal"}> <Linkedin className="w-4 h-4 text-gray-400 hover:text-[#fee715] cursor-pointer transition-all duration-200 hover:scale-110" /></Link>
            <Link href={"https://www.github.com/chouaebrahal/"}><Github className="w-4 h-4 text-gray-400 hover:text-[#fee715] cursor-pointer transition-all duration-200 hover:scale-110" /></Link>
            <Mail className="w-4 h-4 text-gray-400 hover:text-[#fee715] cursor-pointer transition-all duration-200 hover:scale-110" />
            <Button
              onClick={handleDownloadCV}
              variant="outline"
              size="sm"
              className="border-[#fee715] text-[#fee715] text-[10px]  hover:bg-[#fee715]  hover:text-[#101820] transition-all duration-200 bg-transparent cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-[#fee715]/20"
            >
              <Download className="w-2 h-2 md:w-4 md:h-4 " />
              CV
            </Button>
          </div>
          <Button
            className="bg-[#fee715] hover:bg-[#fee715]/90 text-[#101820]  px-2 text-[12px] md:px-6 md:py-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-[#fee715]/20 cursor-pointer hover:scale-105 animate-pulse"
            onClick={() => setCurrentPage("contact")}
          >
            Hire Me
          </Button>
        </header>

        <div
          className={`transition-all duration-300 ease-in-out ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
        >
          {renderPage()}
        </div>

        {/* Footer */}
        <footer className="text-center py-8 px-4 border-t border-gray-800/50 backdrop-blur-sm bg-[#101820]/50">
          <p className="text-gray-400 text-sm">Template Copyright © 3rd Wave Media</p>
        </footer>
      </div>
    </div>
  )
}
