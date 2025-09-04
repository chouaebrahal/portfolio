"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getAllProjects, getPersonalInfo } from "@/lib/data"

interface ProjectsPageProps {
  onProjectSelect: (projectId: number) => void
}

export function ProjectsPage({ onProjectSelect }: ProjectsPageProps) {
  const projects = getAllProjects()
  const personalInfo = getPersonalInfo()

  return (
    <div className="min-h-screen bg-[#101820] text-white">
      {/* Header */}
      <section className="text-center py-16 px-4">
        <Avatar className="w-24 h-24 mx-auto mb-6">
          <AvatarImage src="/professional-developer-headshot.png" alt={personalInfo.name} />
          <AvatarFallback>DL</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold mb-4">My Projects</h1>
        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
          Intro about projects goes here. Need help with your project? Book a free session with me to discuss your
          specific project requirements and how I can help you.
        </p>
        <Button className="bg-gray-700 hover:bg-[#fee715] hover:text-[#101820] text-white px-6 py-2 rounded-full transition-all duration-200">
          Start A Conversation →
        </Button>
      </section>

      {/* Projects Grid */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto space-y-12 ">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="bg-gray-800 border-gray-700 pt-0  hover:border-[#fee715] transition-all duration-200 cursor-pointer"
              onClick={() => onProjectSelect(project.id)}
            >
              <CardContent className="p-0 overflow-hidden">
                <div className="flex flex-col ">
                  <div className="w-full mb-3">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-[350px] "
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">{project.shortDescription}</p>
                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-2">Tech Stack:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, techIndex) => (
                          <Badge key={techIndex} className="bg-[#fee715] text-[#101820] hover:bg-yellow-300">
                            {tech.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="link" className="text-[#fee715] p-0 hover:text-yellow-300">
                      View Project Details →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Load More */}
      <section className="py-16 px-4">
        <div className="text-center">
          <Button className="bg-gray-700 hover:bg-[#fee715] hover:text-[#101820] text-white px-8 py-3 rounded-full transition-all duration-200">
            Load More projects
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#fee715]">Need Help With Your Project?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Lead generation intro goes here lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            placerat egestas dui, quis tempor massa pellentesque quis.
          </p>
          <Button className="bg-gray-700 hover:bg-[#fee715] hover:text-[#101820] text-white px-8 py-3 rounded-full transition-all duration-200">
            Get In Touch →
          </Button>
        </div>
      </section>
    </div>
  )
}
