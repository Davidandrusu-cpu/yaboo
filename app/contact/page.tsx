"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MapPin, Phone, Mail, Clock, Send, Check, Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Inapoi la produse
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Contacteaza-ne
              </h1>
              <p className="text-muted-foreground text-lg">
                Ai intrebari despre produsele noastre? Suntem aici sa te ajutam.
                Echipa Yaboo iti raspunde in cel mai scurt timp.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Adresa</h3>
                  <p className="text-muted-foreground">
                    Yaboo SRL<br />
                    Bucuresti, Romania
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Telefon</h3>
                  <p className="text-muted-foreground">
                    +40 721 234 567<br />
                    Luni - Vineri, 9:00 - 18:00
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <p className="text-muted-foreground">
                    contact@yaboo.ro<br />
                    comenzi@yaboo.ro
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Program</h3>
                  <p className="text-muted-foreground">
                    Luni - Vineri: 9:00 - 18:00<br />
                    Sambata: 10:00 - 14:00
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Urmareste-ne</h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent transition-colors group">
                  <Instagram className="w-6 h-6 text-secondary-foreground group-hover:text-accent-foreground" />
                </a>
                <a href="#" className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent transition-colors group">
                  <Facebook className="w-6 h-6 text-secondary-foreground group-hover:text-accent-foreground" />
                </a>
              </div>
            </div>

            {/* Yaboo Logo */}
            <div className="relative h-40 bg-secondary rounded-xl overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Yaboo%21%20alb%20%281%29-5fzTBUY5P9JTlGEH3Gz5yyxkb6VWkO.png"
                alt="Yaboo! Logo"
                fill
                className="object-contain p-6"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-secondary text-secondary-foreground rounded-xl p-8">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-accent-foreground" />
                </div>
                <h2 className="text-2xl font-bold">Mesaj trimis!</h2>
                <p className="text-secondary-foreground/70">
                  Multumim ca ne-ai contactat. Iti vom raspunde in cel mai scurt timp.
                </p>
                <Button 
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({ name: "", email: "", subject: "", message: "" })
                  }}
                  variant="outline"
                  className="mt-4 border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10"
                >
                  Trimite alt mesaj
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6">Trimite-ne un mesaj</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-secondary-foreground">Nume complet</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ion Popescu"
                      className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-secondary-foreground">Adresa de email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ion@exemplu.com"
                      className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-secondary-foreground">Subiect</Label>
                    <Input
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Cu ce te putem ajuta?"
                      className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-secondary-foreground">Mesaj</Label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Spune-ne mai multe despre intrebarea ta..."
                      className="w-full rounded-md bg-secondary-foreground/10 border border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Trimite mesajul
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
