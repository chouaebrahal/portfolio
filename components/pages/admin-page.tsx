"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, Save, X, LogOut, User } from "lucide-react"
import type { Project, PersonalInfo } from "@/lib/data"

interface AdminPageProps {
  onLogout: () => void
}

export function AdminPage({ onLogout }: AdminPageProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isAddingProject, setIsAddingProject] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fetch data on component mount
  useEffect(() => {
    fetchProjects()
    fetchPersonalInfo()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      const data = await response.json()
      setProjects(data.projects)
    } catch (error) {
      console.error("Failed to fetch projects:", error)
    }
  }

  const fetchPersonalInfo = async () => {
    try {
      const response = await fetch("/api/personal-info")
      const data = await response.json()
      setPersonalInfo(data.personalInfo)
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch personal info:", error)
      setLoading(false)
    }
  }

  const handleSaveProject = async (project: Partial<Project>) => {
    try {
      const url = editingProject ? `/api/projects/${editingProject.id}` : "/api/projects"
      const method = editingProject ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      })

      if (response.ok) {
        await fetchProjects()
        setEditingProject(null)
        setIsAddingProject(false)
      }
    } catch (error) {
      console.error("Failed to save project:", error)
    }
  }

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      const response = await fetch(`/api/projects/${id}`, { method: "DELETE" })
      if (response.ok) {
        await fetchProjects()
      }
    } catch (error) {
      console.error("Failed to delete project:", error)
    }
  }

  const handleSavePersonalInfo = async (info: Partial<PersonalInfo>) => {
    try {
      const response = await fetch("/api/personal-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      })

      if (response.ok) {
        await fetchPersonalInfo()
      }
    } catch (error) {
      console.error("Failed to save personal info:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#101820] text-white flex items-center justify-center">
        <div className="text-[#fee715] text-lg">Loading admin dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#101820] text-white">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#fee715] rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-[#101820]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#fee715]">Admin Dashboard</h1>
              <p className="text-gray-400">Welcome back, Chouaib</p>
            </div>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 border border-gray-700">
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-[#fee715] data-[state=active]:text-[#101820] data-[state=active]:shadow-lg transition-all duration-200"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="personal"
              className="data-[state=active]:bg-[#fee715] data-[state=active]:text-[#101820] data-[state=active]:shadow-lg transition-all duration-200"
            >
              Personal Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">Manage Projects</h2>
              <Button
                onClick={() => setIsAddingProject(true)}
                className="bg-[#fee715] text-[#101820] hover:bg-[#fee715]/90 font-semibold shadow-lg hover:shadow-[#fee715]/20 transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            {(isAddingProject || editingProject) && (
              <ProjectForm
                project={editingProject}
                onSave={handleSaveProject}
                onCancel={() => {
                  setEditingProject(null)
                  setIsAddingProject(false)
                }}
              />
            )}

            <div className="grid gap-4">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-gray-800/50 border-gray-700 hover:border-[#fee715]/30 transition-all duration-200"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                        <p className="text-gray-400 mb-3">{project.shortDescription}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.techStack.map((tech, index) => (
                            <Badge key={index} className="bg-[#fee715] text-[#101820] font-medium">
                              {tech.name}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500">
                          {project.category} • {project.year}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingProject(project)}
                          className="border-gray-600 hover:border-[#fee715] hover:text-[#fee715] transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteProject(project.id)}
                          className="border-red-600 text-red-400 hover:border-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="personal" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Personal Information</h2>
            {personalInfo && <PersonalInfoForm personalInfo={personalInfo} onSave={handleSavePersonalInfo} />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ProjectForm({
  project,
  onSave,
  onCancel,
}: {
  project: Project | null
  onSave: (project: Partial<Project>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    shortDescription: project?.shortDescription || "",
    fullDescription: project?.fullDescription || "",
    category: project?.category || "",
    year: project?.year || new Date().getFullYear().toString(),
    status: project?.status || "completed",
    image: project?.image || "",
    techStack: project?.techStack || [],
    features: project?.features || [],
    links: project?.links || { github: "", live: "", caseStudy: "" },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700 shadow-xl">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-[#fee715] text-xl">{project ? "Edit Project" : "Add New Project"}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-white">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-gray-700/50 border-gray-600 text-white focus:border-[#fee715] focus:ring-[#fee715]"
                required
              />
            </div>
            <div>
              <Label htmlFor="category" className="text-white">
                Category
              </Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="bg-gray-700/50 border-gray-600 text-white focus:border-[#fee715] focus:ring-[#fee715]"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="shortDescription" className="text-white">
              Short Description
            </Label>
            <Textarea
              id="shortDescription"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="bg-gray-700/50 border-gray-600 text-white focus:border-[#fee715] focus:ring-[#fee715]"
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="fullDescription" className="text-white">
              Full Description
            </Label>
            <Textarea
              id="fullDescription"
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              className="bg-gray-700/50 border-gray-600 text-white focus:border-[#fee715] focus:ring-[#fee715]"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="year" className="text-white">
                Year
              </Label>
              <Input
                id="year"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="bg-gray-700/50 border-gray-600 text-white focus:border-[#fee715] focus:ring-[#fee715]"
                required
              />
            </div>
            <div>
              <Label htmlFor="status" className="text-white">
                Status
              </Label>
              <Input
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="bg-gray-700/50 border-gray-600 text-white focus:border-[#fee715] focus:ring-[#fee715]"
                required
              />
            </div>
            <div>
              <Label htmlFor="image" className="text-white">
                Image URL (e.g., /assets/images/project.png)
              </Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="bg-gray-700/50 border-gray-600 text-white focus:border-[#fee715] focus:ring-[#fee715]"
                placeholder="/assets/images/project.png"
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-gray-600 bg-transparent hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#fee715] text-[#101820] hover:bg-[#fee715]/90 font-semibold shadow-lg hover:shadow-[#fee715]/20 transition-all duration-200"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Project
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function PersonalInfoForm({
  personalInfo,
  onSave,
}: {
  personalInfo: PersonalInfo
  onSave: (info: Partial<PersonalInfo>) => void
}) {
  const [formData, setFormData] = useState({
    name: personalInfo.name,
    title: personalInfo.title,
    bio: personalInfo.bio,
    about: personalInfo.about,
    contact: personalInfo.contact,
    profileImage: personalInfo.profileImage || "/assets/images/chouaib.png",
    cvUrl: personalInfo.cvUrl || "/assets/cv/chouaib-cv.pdf",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700 shadow-xl">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-[#fee715] text-xl">Edit Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-white">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-gray-700/50 border-gray-600 text-white focus:border-[#fee715] focus:ring-[#fee715]"
                required
              />
            </div>
            <div>
              <Label htmlFor="title" className="text-white">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-gray-700/50 border-gray-600 text-white focus:border-[#fee715] focus:ring-[#fee715]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="profileImage" className="text-white">
                Profile Image URL
              </Label>
              <Input
                id="profileImage"
                value={formData.profileImage}
                onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                className="bg-gray-700/50 border-gray-600 text-white focus:border-[#fee715] focus:ring-[#fee715]"
                placeholder="/assets/images/chouaib.png"
              />
            </div>
            <div>
              <Label htmlFor="cvUrl" className="text-white">
                CV File URL
              </Label>
              <Input
                id="cvUrl"
                value={formData.cvUrl}
                onChange={(e) => setFormData({ ...formData, cvUrl: e.target.value })}
                className="bg-gray-700/50 border-gray-600 text-white focus:border-[#fee715] focus:ring-[#fee715]"
                placeholder="/assets/cv/chouaib-cv.pdf"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio" className="text-white">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="bg-gray-700/50 border-gray-600 text-white focus:border-[#fee715] focus:ring-[#fee715]"
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="about" className="text-white">
              About
            </Label>
            <Textarea
              id="about"
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              className="bg-gray-700/50 border-gray-600 text-white focus:border-[#fee715] focus:ring-[#fee715]"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="phone" className="text-white">
                Phone
              </Label>
              <Input
                id="phone"
                value={formData.contact.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, phone: e.target.value },
                  })
                }
                className="bg-gray-700/50 border-gray-600 text-white focus:border-[#fee715] focus:ring-[#fee715]"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.contact.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, email: e.target.value },
                  })
                }
                className="bg-gray-700/50 border-gray-600 text-white focus:border-[#fee715] focus:ring-[#fee715]"
              />
            </div>
            <div>
              <Label htmlFor="website" className="text-white">
                Website
              </Label>
              <Input
                id="website"
                value={formData.contact.website}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, website: e.target.value },
                  })
                }
                className="bg-gray-700/50 border-gray-600 text-white focus:border-[#fee715] focus:ring-[#fee715]"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-[#fee715] text-[#101820] hover:bg-[#fee715]/90 font-semibold shadow-lg hover:shadow-[#fee715]/20 transition-all duration-200"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
