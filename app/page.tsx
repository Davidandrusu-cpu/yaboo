"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Zap, Truck, Shield, Timer, Gift, Mail, Check, X, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductWidget } from "@/components/product-widget"
import { getAllProducts, getBundleProduct } from "@/lib/products"

function CountdownTimer({ size = "normal" }: { size?: "normal" | "small" }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const isSmall = size === "small"

  return (
    <div className="flex items-center gap-2">
      <Timer className={`text-accent ${isSmall ? "w-3 h-3" : "w-5 h-5"}`} />
      <div className="flex items-center gap-1">
        <div className={`bg-secondary text-secondary-foreground rounded font-mono font-bold ${isSmall ? "px-1.5 py-0.5 text-xs" : "px-3 py-2 text-lg"}`}>
          {String(timeLeft.hours).padStart(2, "0")}
        </div>
        <span className={`text-accent font-bold ${isSmall ? "text-xs" : "text-lg"}`}>:</span>
        <div className={`bg-secondary text-secondary-foreground rounded font-mono font-bold ${isSmall ? "px-1.5 py-0.5 text-xs" : "px-3 py-2 text-lg"}`}>
          {String(timeLeft.minutes).padStart(2, "0")}
        </div>
        <span className={`text-accent font-bold ${isSmall ? "text-xs" : "text-lg"}`}>:</span>
        <div className={`bg-secondary text-secondary-foreground rounded font-mono font-bold ${isSmall ? "px-1.5 py-0.5 text-xs" : "px-3 py-2 text-lg"}`}>
          {String(timeLeft.seconds).padStart(2, "0")}
        </div>
      </div>
    </div>
  )
}

function NewsletterWidget() {
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch("https://hook.eu1.make.com/skwjip3h4cwqxrpscj7cdn1m4w9vh2w2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: formData.name, email: formData.email, type: "newsletter" }),
    })
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="bg-accent/10 border-2 border-accent rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
          <Gift className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Multumim!</h3>
        <p className="text-muted-foreground">
          Vei primi codul de reducere <span className="font-bold text-accent">YABOO10</span> pe email in cateva momente.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-muted to-muted/50 rounded-2xl p-8 md:p-12 border border-border">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-6">
          <Mail className="w-7 h-7 text-accent" />
        </div>
        
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Primesti <span className="text-accent">10% reducere</span> la prima comanda!
        </h3>
        
        <p className="text-muted-foreground mb-6">
          Inscrie-te la newsletter si primesti un cod de reducere exclusiv. Fii primul care afla despre ofertele noastre speciale. 
          <span className="font-semibold text-foreground"> Se cumuleaza cu alte promotii!</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="text"
              placeholder="Numele tau"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="flex-1 bg-background border-border h-12"
            />
            <Input
              type="email"
              placeholder="Adresa de email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="flex-1 bg-background border-border h-12"
            />
          </div>
          <Button 
            type="submit" 
            size="lg"
            className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-8"
          >
            Vreau reducerea de 10%
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-muted-foreground text-xs">
            Prin inscrierea la newsletter, accepti sa primesti emailuri promotionale de la Yaboo. Te poti dezabona oricand.
          </p>
        </form>
      </div>
    </div>
  )
}

function SubscriptionWidget() {
  const [quantities, setQuantities] = useState({
    classic: 1,
    chilli: 1,
    usturoi: 1,
  })
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch("https://hook.eu1.make.com/skwjip3h4cwqxrpscj7cdn1m4w9vh2w2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone, type: "subscription" }),
    })
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="bg-accent/10 border-2 border-accent rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Cerere trimisa!</h3>
        <p className="text-muted-foreground">
          Vei primi oferta personalizata de abonament pe email in maxim 24 de ore.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-secondary text-secondary-foreground rounded-2xl p-8 md:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/20 mb-6">
            <Package className="w-7 h-7 text-accent" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Abonament lunar <span className="text-accent">Yaboo!</span>
          </h3>
          <p className="text-secondary-foreground/80">
            Primeste biltong-ul tau preferat in fiecare luna, direct la usa. Alege cate pachete vrei din fiecare aroma si te contactam cu oferta personalizata.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { key: "classic", name: "Classic", color: "bg-neutral-800" },
              { key: "chilli", name: "Chilli", color: "bg-red-700" },
              { key: "usturoi", name: "Usturoi", color: "bg-indigo-900" },
            ].map((product) => (
              <div key={product.key} className="bg-background/10 rounded-xl p-6">
                <div className={`w-12 h-12 ${product.color} rounded-lg flex items-center justify-center mb-4`}>
                  <span className="text-white font-bold text-lg">{product.name[0]}</span>
                </div>
                <h4 className="font-semibold mb-2">{product.name}</h4>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={quantities[product.key as keyof typeof quantities]}
                    onChange={(e) => setQuantities({ ...quantities, [product.key]: parseInt(e.target.value) })}
                    className="flex-1 accent-accent h-2 bg-background/20 rounded-full appearance-none cursor-pointer"
                  />
                  <span className="text-xl font-bold text-accent w-8 text-center">
                    {quantities[product.key as keyof typeof quantities]}
                  </span>
                </div>
                <p className="text-xs text-secondary-foreground/60 mt-2">pachete/luna</p>
              </div>
            ))}
          </div>

          <div className="border-t border-secondary-foreground/20 pt-8">
            <p className="text-center text-secondary-foreground/80 mb-6">
              Total: <span className="font-bold text-accent">{quantities.classic + quantities.chilli + quantities.usturoi}</span> pachete/luna
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <Input
                type="text"
                placeholder="Numele tau"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50 h-12"
              />
              <Input
                type="email"
                placeholder="Adresa de email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-background/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50 h-12"
              />
              <Input
                type="tel"
                placeholder="Numar de telefon"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-background/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50 h-12"
              />
            </div>
            
            <Button 
              type="submit" 
              size="lg"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
            >
              Vreau oferta de abonament
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function HomePage() {
  const regularProducts = getAllProducts()
  const bundleProduct = getBundleProduct()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-bold">COMBINA REDUCERILE: PANA LA 30% OFF!</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
                Ti-e foame?{" "}
                <span className="text-accent">Yaboo!</span>{" "}
                e aici pentru tine.
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground text-pretty">
                Descopera biltong-ul autentic, preparat dupa retete traditionale sud-africane. 
                Proteina pura, gust exceptional, 100% natural - snack-ul perfect pentru orice moment.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm font-medium text-foreground">High Protein</span>
                </div>
                <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm font-medium text-foreground">100% Natural</span>
                </div>
                <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm font-medium text-foreground">Fara conservanti</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#products">
                  <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full sm:w-auto font-semibold">
                    Vezi produsele
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/checkout">
                  <Button size="lg" variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground w-full sm:w-auto font-semibold">
                    Comanda acum
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/10 rounded-3xl" />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Yaboo%21%20alb%20%281%29-5fzTBUY5P9JTlGEH3Gz5yyxkb6VWkO.png"
                  alt="Yaboo! Logo"
                  fill
                  className="object-contain p-8"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 20% Discount Offer with Timer */}
      <section className="py-6 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-3">
              <Gift className="w-5 h-5 text-accent-foreground" />
              <span className="font-bold text-accent-foreground">20% REDUCERE la comenzi peste 100 RON!</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-accent-foreground/80 text-sm">Oferta expira in:</span>
              <CountdownTimer size="small" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-6 rounded-xl bg-background border border-border">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">High Protein</h3>
                <p className="text-muted-foreground text-sm">Sursa excelenta de proteine naturale</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-xl bg-background border border-border">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Livrare rapida</h3>
                <p className="text-muted-foreground text-sm">In toata Romania, in 24-48h</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-xl bg-background border border-border">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">100% Natural</h3>
                <p className="text-muted-foreground text-sm">Fara conservanti sau aditivi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Biltong Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ce este <span className="text-accent">Biltong</span>-ul?
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed">
                Biltong-ul este un snack traditional din Africa de Sud, preparat din carne de vita uscata si condimentata. 
                Spre deosebire de jerky-ul american, biltong-ul este uscat la aer, nu deshidratat termic, ceea ce ii 
                pastreaza textura frageda si gustul bogat. La Yaboo!, folosim o metoda de productie artizanala: 
                selectam manual cele mai fine bucati de carne, le marinam in otet si condimente naturale timp de 24 de ore, 
                apoi le uscam lent la temperatura controlata timp de 5-7 zile. Rezultatul? Un snack bogat in proteine, 
                fara zahar adaugat si fara conservanti - exact asa cum se facea acum sute de ani.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Produsele noastre
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Alege din gama noastra de biltong preparat traditional. Fiecare aroma, o experienta unica de savurat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {regularProducts.map((product) => (
              <ProductWidget key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Yaboo Section with Bundle */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              De ce Yaboo?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Biltong-ul nostru este preparat cu pasiune, dupa retete autentice sud-africane.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { title: "Reteta traditionala", desc: "Preparat dupa metode autentice sud-africane" },
              { title: "Ingrediente premium", desc: "Doar carne de vita romaneasca selectata" },
              { title: "Fara aditivi", desc: "100% natural, fara conservanti" },
              { title: "Produs local", desc: "Fabricat in Romania cu dragoste" },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 bg-muted rounded-xl border border-border">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-accent">{i + 1}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {bundleProduct && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground">Nu stii ce sa alegi?</h3>
                <p className="text-muted-foreground">Incearca toate aromele cu pachetul nostru special!</p>
              </div>
              <Link href={`/product/${bundleProduct.id}`} className="block group">
                <div className="bg-secondary text-secondary-foreground rounded-2xl overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative aspect-square bg-gradient-to-br from-accent/20 to-transparent p-8 flex items-center justify-center">
                      <Image
                        src={bundleProduct.image}
                        alt={bundleProduct.name}
                        fill
                        className="object-contain p-8"
                      />
                      <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                        PRET PACHET
                      </div>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <h4 className="text-2xl font-bold mb-2">{bundleProduct.name}</h4>
                      <p className="text-secondary-foreground/80 mb-4">{bundleProduct.description}</p>
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-accent" />
                          <span className="text-sm">1x Yaboo! Classic</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-accent" />
                          <span className="text-sm">1x Yaboo! Chilli</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-accent" />
                          <span className="text-sm">1x Yaboo! Usturoi</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl font-bold text-accent">{bundleProduct.price} RON</span>
                        <span className="text-lg text-secondary-foreground/60 line-through">{bundleProduct.originalPrice} RON</span>
                      </div>
                      <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                        Vezi detalii
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Yaboo vs Competition */}
      <section className="py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Yaboo! vs Competitia
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              De ce sa alegi Yaboo! in locul altor snack-uri proteice de pe piata?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-secondary text-secondary-foreground rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Yaboo%21%20alb%20%281%29-5fzTBUY5P9JTlGEH3Gz5yyxkb6VWkO.png"
                  alt="Yaboo!"
                  width={48}
                  height={48}
                  className="object-contain"
                />
                <h3 className="text-2xl font-bold">Yaboo!</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Carne 100% romaneasca, de la furnizori locali",
                  "Uscare naturala la aer, 5-7 zile",
                  "Fara conservanti sau aditivi chimici",
                  "Reteta traditionala sud-africana autentica",
                  "Condimente naturale si proaspete",
                  "Productie artizanala in loturi mici",
                  "Textura frageda si suculenta",
                  "Continut ridicat de proteine (50g+/100g)",
                  "Livrare rapida in toata Romania",
                  "Transparenta totala asupra ingredientelor",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-secondary-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground font-bold">?</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground">Competitia</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Carne importata, origine necunoscuta",
                  "Deshidratare termica rapida",
                  "Conservanti pentru termen lung de valabilitate",
                  "Retete modificate pentru productie de masa",
                  "Arome artificiale si potentiatori de gust",
                  "Productie industriala in fabrici mari",
                  "Textura tare si uscata",
                  "Continut scazut de proteine",
                  "Termene lungi de livrare",
                  "Liste de ingrediente confuze",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Subscription */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SubscriptionWidget />
        </div>
      </section>

      {/* Newsletter Widget - Before Footer */}
      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterWidget />
        </div>
      </section>

      <Footer />
    </div>
  )
}
