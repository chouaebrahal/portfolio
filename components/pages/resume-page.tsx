import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, Globe, User, Briefcase, Wrench, Users, Code, GraduationCap, Languages } from "lucide-react"
import Link from "next/link"

export function ResumePage() {
  return (
    <div className="min-h-screen bg-[#101820] text-white">
      {/* Header */}
      <section className="text-center py-16 px-4">
        <Avatar className="w-24 h-24 mx-auto mb-6">
          <AvatarImage src="/choauib-pro.jpeg" alt="Rahal Chouaeb" />
          <AvatarFallback>DL</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold mb-2 tracking-wider">Rahal Chouaeb</h1>
        <p className="text-[#fee715] text-lg font-medium mb-8 tracking-wide">Junior Network Administrator</p>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>+213 7 96 09 56 23</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>chouaebrahal@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span><Link href="https://chouaebrahal.vercel.app">chouaebrahal.vercel.app</Link></span>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Me */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-[#fee715]" />
                  <h2 className="text-xl font-bold">ABOUT ME</h2>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Master’s graduate in Networking and Distributed Systems with solid academic knowledge
                   in network design, configuration, and security. Familiar with CCNA-level concepts including routing, switching, VLANs, and network troubleshooting,
                    supported by hands-on Packet Tracer projects. Skilled in Windows Server administration following the MCSA track, covering Active Directory, DNS, DHCP, and Group Policy. Motivated to start a career as a Network Administrator, eager to apply my training in practical environments and continue growing my technical expertise through real-world experience.
                </p>
              </CardContent>
            </Card>

            {/* Work Experience */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Briefcase className="w-5 h-5 text-[#fee715]" />
                  <h2 className="text-xl font-bold">Projects</h2>
                </div>

                <div className="space-y-8">
                  {/* Google Experience */}
                  <div className="relative">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-[#fee715] rounded-full"></div>
                          <span className="text-sm text-gray-400">2025 - Cisco Packet tracer</span>
                        </div>
                        <h3 className="text-lg font-semibold">University Network Project</h3>
                      </div>
                      
                    </div>
                    <ul className="text-gray-400 text-sm space-y-2 ml-4">
                      <li>
                        • Designed and configured a network topology for a university with two campuses and four faculties. Implemented VLANs for each department, configured routing using RIP v2 and static routing for external servers. Deployed a router-based DHCP server, a web server, and an email server. Configured switches and routers to ensure end-to-end connectivity, network segmentation, and security across administrative offices,
                         faculties, and student labs.
                      </li>
                      
                    </ul>
                  </div>

                  {/* Meta Experience */}
                  <div className="relative">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <span className="text-sm text-gray-400">2025 - Cisco Packet tracer</span>
                        </div>
                        <h3 className="text-lg font-semibold">Hotel Network Project</h3>
                      </div>
                     
                    </div>
                    <ul className="text-gray-400 text-sm space-y-2 ml-4">
                      <li>
                        • Designed and implemented a three-floor hotel network including multiple departments (reception, logistics, finance, HR, marketing, IT, administration). Configured VLANs for each department, interconnected three routers via serial DCE links, and implemented OSPF routing. Deployed a DHCP server for dynamic IP allocation, enabled SSH for secure remote administration, and configured port security on switches. The architecture ensured reliable connectivity, efficient segmentation, and enhanced network security.
                      </li>
                     
                    </ul>
                  </div>

                 
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Wrench className="w-5 h-5 text-[#fee715]" />
                  <h2 className="text-lg font-bold">Skills</h2>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Networking: TCP/IP, Routing, Switching, VLANs, ACLs
                    </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-[0.5px]">
                      <div className="bg-[#fee715] h-[0.5px] rounded-full w-[100%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Tools: Cisco Packet Tracer
</span>
                    </div>
                   <div className="w-full bg-gray-700 rounded-full h-[0.5px]">
                      <div className="bg-[#fee715] h-[0.5px] rounded-full w-[100%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">systems: Windows Server (AD, DNS, DHCP, GPO)
                    </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-[0.5px]">
                      <div className="bg-[#fee715] h-[0.5px] rounded-full w-[100%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Protocols: NTP, DHCP, DNS, SNMP...
                    </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-[0.5px]">
                      <div className="bg-[#fee715] h-[0.5px] rounded-full w-[100%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Security: Network Access Control, Firewalls 
                    </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Soft Skills */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-[#fee715]" />
                  <h2 className="text-lg font-bold">SOFT SKILLS</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-700 text-sm rounded-full">Teamwork</span>
                  <span className="px-3 py-1 bg-gray-700 text-sm rounded-full">Fast Learner</span>
                  <span className="px-3 py-1 bg-gray-700 text-sm rounded-full">Problem-Solving</span>
                  <span className="px-3 py-1 bg-gray-700 text-sm rounded-full">disciplined</span>
                </div>
              </CardContent>
            </Card>

           

            {/* Education */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-5 h-5 text-[#fee715]" />
                  <h2 className="text-lg font-bold">EDUCATION</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Master’s Degree in Networking and Distributed Systems</h4>
                    <p className="text-gray-400 text-sm">Ferhat Abbas University</p>
                    <p className="text-gray-400 text-xs">2022 - 2024</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Bachelor’s Degree in Computer Systems</h4>
                    <p className="text-gray-400 text-sm">Ferhat Abbas University</p>
                    <p className="text-gray-400 text-xs">2019 - 2022</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Languages className="w-5 h-5 text-[#fee715]" />
                  <h2 className="text-lg font-bold">LANGUAGES</h2>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Arabic</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-[#fee715] h-2 rounded-full w-[95%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">English</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-[#fee715] h-2 rounded-full w-[80%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">French</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-[#fee715] h-2 rounded-full w-[70%]"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
