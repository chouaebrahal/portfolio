"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Github, Chrome } from "lucide-react"
import type { Project } from "@/lib/data"

interface ProjectDetailPageProps {
  project: Project
  onBack: () => void
}

export function ProjectDetailPage({ project, onBack }: ProjectDetailPageProps) {
  return (
    <div className="min-h-screen bg-[#101820] text-white">
      {/* Header */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-[#fee715] hover:text-yellow-300 hover:bg-gray-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>

          <div className="text-center mb-8">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarImage src="/professional-developer-headshot.png" alt="Daniel Lopez" />
              <AvatarFallback>DL</AvatarFallback>
            </Avatar>
            <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
            <p className="text-gray-400 text-lg">
              {project.category} • {project.year}
            </p>
          </div>
        </div>
      </section>

      {/* Project Images */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          
              <div className="aspect-video w-full bg-gray-800 rounded-lg overflow-hidden ">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={`${project.title}`}
                  className="w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>
            

        </div>
      </section>

      {/* Project Details */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-800 border-gray-700 mb-6">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-[#fee715]">Project Overview</h2>
                  <p className="text-gray-300 leading-relaxed mb-6">{project.fullDescription}</p>

                  <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-[#fee715] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tech Stack */}
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-[#fee715]">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, index) => (
                      <Badge
                        key={index}
                        className="bg-[#fee715] text-[#101820] hover:bg-yellow-300"
                        style={{ backgroundColor: tech.color, color: "#101820" }}
                      >
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Project Links */}
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-[#fee715]">Project Links</h3>
                  <div className="space-y-3">
                    {project.links.live && (
                      <Button
                        variant="outline"
                        className="w-full justify-start border-gray-600 hover:border-[#fee715] hover:bg-[#fee715] hover:text-[#101820] bg-transparent"
                        asChild
                      >
                        <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Live Demo
                        </a>
                      </Button>
                    )}

                    {project.links.github && (
                      <Button
                        variant="outline"
                        className="w-full justify-start border-gray-600 hover:border-[#fee715] hover:bg-[#fee715] hover:text-[#101820] bg-transparent"
                        asChild
                      >
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          View on GitHub
                        </a>
                      </Button>
                    )}

                    {project.links.chromeStore && (
                      <Button
                        variant="outline"
                        className="w-full justify-start border-gray-600 hover:border-[#fee715] hover:bg-[#fee715] hover:text-[#101820] bg-transparent"
                        asChild
                      >
                        <a href={project.links.chromeStore} target="_blank" rel="noopener noreferrer">
                          <Chrome className="w-4 h-4 mr-2" />
                          Chrome Web Store
                        </a>
                      </Button>
                    )}

                    {project.links.caseStudy && (
                      <Button
                        variant="outline"
                        className="w-full justify-start border-gray-600 hover:border-[#fee715] hover:bg-[#fee715] hover:text-[#101820] bg-transparent"
                        asChild
                      >
                        <a href={project.links.caseStudy} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Case Study
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Project Info */}
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-[#fee715]">Project Info</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400 text-sm">Category</span>
                      <p className="text-white">{project.category}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Year</span>
                      <p className="text-white">{project.year}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Status</span>
                      <p className="text-white capitalize">{project.status}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      
      {project?.images && project.images.length > 0 ?
        <section className="py-16 px-4 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#fee715]">Other Images?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            I'd love to help you bring your project ideas to life. Let's discuss how we can work together to create
            something amazing.
          </p>
          <div className="flex flex-col gap-5 mb-8">
            {project?.images?.map((image, index) => (
              <div key={index} className="aspect-video w-full bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          <Button className="bg-gray-700 hover:bg-[#fee715] hover:text-[#101820] text-white px-8 py-3 rounded-full transition-all duration-200">
            Get In Touch →
          </Button>
        </div>
      </section>
      : null
    }
{/* CTA Section */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#fee715]">Interested in Similar Work?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            I'd love to help you bring your project ideas to life. Let's discuss how we can work together to create
            something amazing.
          </p>
          <Button className="bg-gray-700 hover:bg-[#fee715] hover:text-[#101820] text-white px-8 py-3 rounded-full transition-all duration-200">
            Get In Touch →
          </Button>
        </div>
      </section>
    </div>
  )
}
