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
          <AvatarImage src="/professional-developer-headshot.png" alt="Daniel Lopez" />
          <AvatarFallback>DL</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
          Contact intro goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat sodales massa
          vitae ornare. Quisque ac ipsum quam.
        </p>
      </section>

      {/* Contact Form */}
      <section className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center mb-8">Contact Form</h2>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      placeholder="Name"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#fee715] focus:ring-[#fee715]"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#fee715] focus:ring-[#fee715]"
                    />
                  </div>
                </div>

                <div>
                  <Textarea
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
