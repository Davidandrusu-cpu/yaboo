import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="block">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Yaboo%21%20alb%20%281%29-5fzTBUY5P9JTlGEH3Gz5yyxkb6VWkO.png"
                alt="Yaboo! Logo"
                width={100}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-secondary-foreground/80 text-sm">
              Biltong autentic, preparat dupa retete traditionale sud-africane. Proteina pura, gust exceptional.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Linkuri rapide</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-secondary-foreground/80 hover:text-accent transition-colors text-sm">
                Acasa
              </Link>
              <Link href="/product/classic" className="text-secondary-foreground/80 hover:text-accent transition-colors text-sm">
                Yaboo! Classic
              </Link>
              <Link href="/product/chilli" className="text-secondary-foreground/80 hover:text-accent transition-colors text-sm">
                Yaboo! Chilli
              </Link>
              <Link href="/product/usturoi" className="text-secondary-foreground/80 hover:text-accent transition-colors text-sm">
                Yaboo! Usturoi
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-secondary-foreground/80 text-sm">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Bucuresti, Romania</span>
              </div>
              <div className="flex items-center gap-2 text-secondary-foreground/80 text-sm">
                <Phone className="w-4 h-4 text-accent" />
                <span>+40 721 234 567</span>
              </div>
              <div className="flex items-center gap-2 text-secondary-foreground/80 text-sm">
                <Mail className="w-4 h-4 text-accent" />
                <span>contact@yaboo.ro</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Urmareste-ne</h3>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors group">
                <Instagram className="w-5 h-5 text-secondary-foreground group-hover:text-accent-foreground" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors group">
                <Facebook className="w-5 h-5 text-secondary-foreground group-hover:text-accent-foreground" />
              </a>
            </div>
            <p className="text-secondary-foreground/60 text-xs">
              Livrare in toata Romania<br />
              Plata ramburs sau card
            </p>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-secondary-foreground/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Yaboo SRL. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  )
}
