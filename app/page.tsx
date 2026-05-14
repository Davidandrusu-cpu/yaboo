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
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
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
        {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((unit, idx) => (
          <div key={idx} className="flex items-center gap-1">
            <div className={`bg-secondary text-secondary-foreground rounded font-mono font-bold ${isSmall ? "px-1.5 py-0.5 text-xs" : "px-3 py-2 text-lg"}`}>
              {String(unit).padStart(2, "0")}
            </div>
            {idx < 2 && <span className={`text-accent font-bold ${isSmall ? "text-xs" : "text-lg"}`}>:</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

function NewsletterWidget() {
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch("https://hook.eu1.make.com/skwjip3h4cwqxrpscj7cdn1m4w9vh2w2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...formData, 
          type: "newsletter_signup",
          source: "homepage_bottom"
        }),
      })
      setIsSubmitted(true)
    } catch (error) {
      console.error("Make.com Error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-accent/10 border-2 border-accent rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-300">
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
          Inscrie-te la newsletter si primesti un cod de reducere exclusiv. 
          <span className="font-semibold text-foreground"> Se cumuleaza cu alte promotii!</span>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Numele tau"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="flex-1 bg-background h-12"
            />
            <Input
              type="email"
              placeholder="Adresa de email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="flex-1 bg-background h-12"
            />
          </div>
          <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-8">
            {loading ? "Se trimite..." : "Vreau reducerea de 10%"}
            {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </form>
      </div>
    </div>
  )
}

function SubscriptionWidget() {
  const [quantities, setQuantities] = useState({ classic: 1, chilli: 1, usturoi: 1 })
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch("https://hook.eu1.make.com/skwjip3h4cwqxrpscj7cdn1m4w9vh2w2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "subscription_request",
          customer: formData,
          preferences: quantities,
          total_packs: quantities.classic + quantities.chilli + quantities.usturoi
        }),
      })
      setIsSubmitted(true)
    } catch (error) {
      console.error("Make.com Error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (isSubmitted) {
      <div className="bg-accent/10 border-2 border-accent rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Cerere trimisa!</h3>
        <p className="text-muted-foreground">Vei primi oferta personalizata pe email in maxim 24 de ore.</p>
      </div>
  }

  return (
    <div className="bg-secondary text-secondary-foreground rounded-2xl p-8 md:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/20 mb-6">
            <Package className="w-7 h-7 text-accent" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Abonament lunar <span className="text-accent">Yaboo!</span></h3>
          <p className="text-secondary-foreground/80">Alege cate pachete vrei din fiecare aroma si te contactam cu oferta personalizata.</p>
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
                    type="range" min="0" max="10"
                    value={quantities[product.key as keyof typeof quantities]}
                    onChange={(e) => setQuantities({ ...quantities, [product.key]: parseInt(e.target.value) })}
                    className="flex-1 accent-accent h-2 bg-background/20 rounded-full appearance-none cursor-pointer"
                  />
                  <span className="text-xl font-bold text-accent w-8 text-center">{quantities[product.key as keyof typeof quantities]}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-secondary-foreground/20 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <Input placeholder="Nume" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-background/10 border-secondary-foreground/20" />
              <Input type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-background/10 border-secondary-foreground/20" />
              <Input type="tel" placeholder="Telefon" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="bg-background/10 border-secondary-foreground/20" />
            </div>
            <Button type="submit" size="lg" disabled={loading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
              {loading ? "Se trimite..." : "Vreau oferta de abonament"}
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
      <section className="relative bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-bold uppercase">Combina reducerile: pana la 30% OFF!</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                Ti-e foame? <span className="text-accent">Yaboo!</span> e aici pentru tine.
              </h1>
              <p className="text-lg text-muted-foreground">Biltong autentic, preparat dupa retete sud-africane. Proteina pura, 100% natural.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#products"><Button size="lg" className="bg-secondary text-secondary-foreground w-full sm:w-auto font-semibold">Vezi produsele <ArrowRight className="ml-2 w-5 h-5" /></Button></Link>
                <Link href="/checkout"><Button size="lg" variant="outline" className="border-2 border-secondary text-secondary w-full sm:w-auto font-semibold">Comanda acum</Button></Link>
              </div>
            </div>
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/10 rounded-3xl" />
              <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Yaboo%21%20alb%20%281%29-5fzTBUY5P9JTlGEH3Gz5yyxkb6VWkO.png" alt="Yaboo! Logo" fill className="object-contain p-8" priority />
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-accent">
        <div className="max-w-7xl mx-auto px-4 text-center flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-3 font-bold text-accent-foreground"><Gift /> 20% REDUCERE la comenzi peste 100 RON!</div>
          <CountdownTimer size="small" />
        </div>
      </section>

      <section id="products" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Produsele noastre</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {regularProducts.map((p) => <ProductWidget key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4"><SubscriptionWidget /></div>
      </section>

      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-4"><NewsletterWidget /></div>
      </section>
      <Footer />
    </div>
  )
}
