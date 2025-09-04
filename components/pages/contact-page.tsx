import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactPage() {
  return (
    <div className="min-h-screen bg-[#101820] text-white">
      {/* Header */}
      <section className="text-center py-16 px-4">
        <Avatar className="w-24 h-24 mx-auto mb-6">
          <AvatarImage src="/assets/images/chouaib-pro.jpeg" alt="Chouaeb Rahal" />
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
          I’m always open to new opportunities, collaborations, or any questions you may have. Feel free to reach out to me via email or through my social media channels, and I’ll get back to you as soon as possible.
           Let’s connect and create something amazing together!
        </p>
      </section>

      {/* Contact Form */}
      <section className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center mb-8">Contact Form</h2>

              <form
                className="space-y-6"
                onSubmit={e => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const name = (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
                  const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
                  const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";
                  const mailto = `mailto:chouaebrahal@gmail.com?subject=Contact from ${encodeURIComponent(name)} (${encodeURIComponent(email)})&body=${encodeURIComponent(message)}`;
                  window.location.href = mailto;
                }}
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Name"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#fee715] focus:ring-[#fee715]"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#fee715] focus:ring-[#fee715]"
                    />
                  </div>
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Enter your message"
                    rows={8}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#fee715] focus:ring-[#fee715] resize-none"
                  />
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    className="bg-gray-700 hover:bg-[#fee715] hover:text-[#101820] text-white px-12 py-3 rounded-full transition-all duration-200 w-full md:w-auto"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
