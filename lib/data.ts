import data from "../data/data.json"

export interface PersonalInfo {
  name: string
  title: string
  bio: string
  profileImage?: string
  cvUrl?: string
  contact: {
    phone: string
    email: string
    website: string
  }
  about: string
  workExperience: WorkExperience[]
  techStack: string[]
  softSkills: string[]
  projects: PersonalProject[]
  education: Education[]
  languages: Language[]
}

export interface WorkExperience {
  id: number
  period: string
  company: string
  position: string
  description: string[]
}

export interface PersonalProject {
  id: number
  title: string
  description: string
}

export interface Education {
  id: number
  degree: string
  institution: string
  period: string
}

export interface Language {
  name: string
  proficiency: number
}

export interface Project {
  id: number
  title: string
  slug: string
  shortDescription: string
  fullDescription: string
  image: string
  images: string[]
  techStack: TechStack[]
  features: string[]
  links: ProjectLinks
  category: string
  status: string
  year: string
}

export interface TechStack {
  name: string
  color: string
}

export interface ProjectLinks {
  caseStudy?: string
  github?: string
  live?: string
  chromeStore?: string
}

export interface Testimonial {
  id: number
  text: string
  author: string
  company: string
}

export interface Client {
  name: string
  logo: string
}

export interface AppData {
  personalInfo: PersonalInfo
  projects: Project[]
  testimonials: Testimonial[]
  clients: Client[]
}

// Export the data with proper typing
export const appData: AppData = data as AppData

// Helper functions
export const getPersonalInfo = (): PersonalInfo => appData.personalInfo

export const getAllProjects = (): Project[] => appData.projects

export const getProjectBySlug = (slug: string): Project | undefined =>
  appData.projects.find((project) => project.slug === slug)

export const getProjectById = (id: number): Project | undefined => appData.projects.find((project) => project.id === id)

export const getTestimonials = (): Testimonial[] => appData.testimonials

export const getClients = (): Client[] => appData.clients

export const getFeaturedProjects = (limit = 3): Project[] => appData.projects.slice(0, limit)
