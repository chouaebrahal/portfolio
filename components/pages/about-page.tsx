"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Database, Cloud, Smartphone, Monitor } from "lucide-react"
import { getPersonalInfo, getFeaturedProjects, getTestimonials, getClients } from "@/lib/data"

interface AboutPageProps {
  onProjectSelect?: (projectId: number) => void;
  onViewMore?: () => void;
}

export function AboutPage({ onProjectSelect, onViewMore }: AboutPageProps) {
  const [personalInfo, setPersonalInfo] = useState(getPersonalInfo())
  const [projects, setProjects] = useState(getFeaturedProjects())
  const [testimonials, setTestimonials] = useState(getTestimonials())
  const [clients, setClients] = useState(getClients())
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPersonalInfo(getPersonalInfo())
      setProjects(getFeaturedProjects())
      setTestimonials(getTestimonials())
      setClients(getClients())
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen bg-[#101820] text-white">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-[#fee715] shadow-lg shadow-[#fee715]/20">
          <AvatarImage src={personalInfo.profileImage || "/assets/images/chouaib-pro.jpeg"} alt={personalInfo.name} />
          <AvatarFallback className="bg-[#fee715] text-[#101820] text-2xl font-bold">
            {personalInfo.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-[#fee715] bg-clip-text text-transparent">
          {personalInfo.name}
        </h1>
        <h2 className="text-xl text-[#fee715] font-semibold mb-6">{personalInfo.title}</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">{personalInfo.bio}</p>
        <Button className="bg-[#fee715] hover:bg-[#fee715]/90 text-[#101820] font-semibold px-8 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-[#fee715]/30 hover:scale-105">
          View Resume →
        </Button>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="text-[#fee715]">Featured</span> Projects
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Brief intro goes here. My main experience lies in building innovative solutions with modern technologies.
            I'm currently working on exciting new projects.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="bg-gray-800/50 pt-0  border-gray-700 hover:border-[#fee715] transition-all duration-300 hover:shadow-lg hover:shadow-[#fee715]/10 group cursor-pointer"
                onClick={() => onProjectSelect && onProjectSelect(project.id)}
              >
                <CardContent className="p-0 ">
                  <div className="relative overflow-hidden rounded-t-lg ">
                    <img
                      src={
                        project.image ||
                        `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(project.title + " project interface")}`
                      }
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#fee715]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[#fee715] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {project.shortDescription.substring(0, 120)}...
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-[#fee715]/20 text-[#fee715] text-xs rounded-full border border-[#fee715]/30"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="link"
                      className="text-[#fee715] p-0 hover:text-[#fee715]/80 font-semibold"
                      onClick={(e) => {
                        e.stopPropagation();
                        onProjectSelect && onProjectSelect(project.id);
                      }}
                    >
                      View more →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              className="bg-gray-700/50 hover:bg-[#fee715] hover:text-[#101820] text-white border border-[#fee715]/30 hover:border-[#fee715] px-8 py-3 rounded-full transition-all duration-200 font-semibold"
              onClick={() => onViewMore && onViewMore()}
            >
              More Projects →
            </Button>
          </div>
        </div>
      </section>

      {/* Clients */}
      {/* <section className="py-16 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Clients I <span className="text-[#fee715]">Worked With</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center mb-8">
            {clients.slice(0, 5).map((client, index) => (
              <img
                key={index}
                src={`/abstract-geometric-shapes.png?height=32&width=120&query=${encodeURIComponent(client.name + " company logo")}`}
                alt={client.name}
                className="h-8 opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-200 filter grayscale hover:grayscale-0"
              />
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center mb-12">
            {clients.slice(5).map((client, index) => (
              <img
                key={index}
                src={`/abstract-geometric-shapes.png?height=32&width=120&query=${encodeURIComponent(client.name + " company logo")}`}
                alt={client.name}
                className="h-8 opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-200 filter grayscale hover:grayscale-0"
              />
            ))}
          </div> */}

          {/* Testimonial */}
          {/* {testimonials.length > 0 && (
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevTestimonial}
                  className="text-gray-400 hover:text-[#fee715] hover:bg-[#fee715]/10 transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="flex-1">
                  <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-[#fee715]/30 transition-all duration-200">
                    <p className="text-gray-300 italic mb-6 text-lg leading-relaxed">
                      "{testimonials[currentTestimonial].text}"
                    </p>
                    <p className="text-[#fee715] font-semibold">{testimonials[currentTestimonial].author}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextTestimonial}
                  className="text-gray-400 hover:text-[#fee715] hover:bg-[#fee715]/10 transition-all duration-200"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentTestimonial ? "bg-[#fee715] scale-125" : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <Button className="bg-[#fee715] hover:bg-[#fee715]/90 text-[#101820] font-semibold px-8 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-[#fee715]/30">
              Get In Touch →
            </Button>
          </div>
        </div>
      </section> */}

      {/* Skills & Experiences */}
      {/* <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Skills & <span className="text-[#fee715]">Experiences</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            My technical expertise spans across modern web technologies, mobile development, and cloud infrastructure.
          </p> */}

          {/* Tech Stack */}
          {/* <div className="flex flex-wrap justify-center gap-4 mb-16">
            {personalInfo.techStack.map((tech, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-gray-800/50 border border-[#fee715]/30 rounded-full text-[#fee715] font-medium hover:bg-[#fee715]/10 hover:border-[#fee715] transition-all duration-200 hover:scale-105"
              >
                {tech}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="w-12 h-12 bg-[#fee715] rounded-lg flex items-center justify-center font-bold text-[#101820] hover:scale-110 transition-transform">
              JS
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center font-bold text-white hover:scale-110 transition-transform">
              NODE
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white hover:scale-110 transition-transform">
              TS
            </div>
            <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center font-bold text-white hover:scale-110 transition-transform">
              REACT
            </div>
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center font-bold text-white hover:scale-110 transition-transform">
              ANG
            </div>
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center font-bold text-white hover:scale-110 transition-transform">
              VUE
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white hover:scale-110 transition-transform">
              PY
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-white hover:scale-110 transition-transform">
              DJ
            </div>
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center font-bold text-white hover:scale-110 transition-transform">
              GIT
            </div>
            <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center font-bold text-white hover:scale-110 transition-transform">
              DOC
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white hover:scale-110 transition-transform">
              K8S
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white hover:scale-110 transition-transform">
              PHP
            </div>
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center font-bold text-white hover:scale-110 transition-transform">
              GQL
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center font-bold text-white hover:scale-110 transition-transform">
              LAR
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center font-bold text-white hover:scale-110 transition-transform">
              MONGO
            </div>
          </div>

          <div className="text-center mb-16">
            <Button className="bg-[#fee715] hover:bg-[#fee715]/90 text-[#101820] font-semibold px-8 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-[#fee715]/30">
              View Resume →
            </Button>
          </div> */}

          {/* Services Grid */}
          {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <Card className="bg-gray-800/50 border-gray-700 text-center p-8 hover:border-[#fee715] transition-all duration-300 hover:shadow-lg hover:shadow-[#fee715]/10 group">
              <div className="w-20 h-20 bg-[#fee715]/10 border-2 border-[#fee715]/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#fee715]/20 group-hover:border-[#fee715] transition-all duration-300">
                <Monitor className="w-10 h-10 text-[#fee715]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 group-hover:text-[#fee715] transition-colors">
                Web Development
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Full-stack web development with modern frameworks and technologies. Specialized in React, Next.js, and
                Node.js applications.
              </p>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 text-center p-8 hover:border-[#fee715] transition-all duration-300 hover:shadow-lg hover:shadow-[#fee715]/10 group">
              <div className="w-20 h-20 bg-[#fee715]/10 border-2 border-[#fee715]/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#fee715]/20 group-hover:border-[#fee715] transition-all duration-300">
                <Database className="w-10 h-10 text-[#fee715]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 group-hover:text-[#fee715] transition-colors">
                Database Infrastructure
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Database design and optimization with SQL and NoSQL solutions. Experience with PostgreSQL, MongoDB, and
                Redis.
              </p>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 text-center p-8 hover:border-[#fee715] transition-all duration-300 hover:shadow-lg hover:shadow-[#fee715]/10 group">
              <div className="w-20 h-20 bg-[#fee715]/10 border-2 border-[#fee715]/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#fee715]/20 group-hover:border-[#fee715] transition-all duration-300">
                <Cloud className="w-10 h-10 text-[#fee715]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 group-hover:text-[#fee715] transition-colors">DevOps</h3>
              <p className="text-gray-400 leading-relaxed">
                Cloud infrastructure and deployment automation. Proficient with AWS, Docker, Kubernetes, and CI/CD
                pipelines.
              </p>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gray-800/50 border-gray-700 text-center p-8 hover:border-[#fee715] transition-all duration-300 hover:shadow-lg hover:shadow-[#fee715]/10 group">
              <div className="w-20 h-20 bg-[#fee715]/10 border-2 border-[#fee715]/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#fee715]/20 group-hover:border-[#fee715] transition-all duration-300">
                <div className="w-10 h-10 bg-[#fee715] rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-[#101820] rounded-sm"></div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 group-hover:text-[#fee715] transition-colors">
                iOS App Development
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Native iOS development with Swift and SwiftUI. Experience building scalable mobile applications for the
                App Store.
              </p>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 text-center p-8 hover:border-[#fee715] transition-all duration-300 hover:shadow-lg hover:shadow-[#fee715]/10 group">
              <div className="w-20 h-20 bg-[#fee715]/10 border-2 border-[#fee715]/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#fee715]/20 group-hover:border-[#fee715] transition-all duration-300">
                <Smartphone className="w-10 h-10 text-[#fee715]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 group-hover:text-[#fee715] transition-colors">
                Android App Development
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Android development with Kotlin and Jetpack Compose. Building performant mobile experiences for Google
                Play Store.
              </p>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-[#fee715] hover:bg-[#fee715]/90 text-[#101820] font-semibold px-8 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-[#fee715]/30">
              Get In Touch →
            </Button>
          </div>
        </div>
      </section> */}
    </div>
  )
}
