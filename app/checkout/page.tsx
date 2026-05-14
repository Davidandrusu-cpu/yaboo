"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, CreditCard, Check, Truck, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navigation, getCartItems, updateQuantity, removeFromCart, addToCart } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { products, getProductById, type Product } from "@/lib/products"

interface CartItem {
  product: Product
  quantity: number
}

function CheckoutForm() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("product")
  
  const [cart, setCart] = useState<CartItem[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  })

  useEffect(() => {
    // If coming from product page with a specific product
    if (productId) {
      const product = getProductById(productId)
      if (product) {
        const existingCart = getCartItems()
        const existingItem = existingCart.find(item => item.product.id === productId)
        if (!existingItem) {
          addToCart(product, 1)
        }
      }
    }
    setCart([...getCartItems()])
  }, [productId])

  // Listen for cart updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCart([...getCartItems()])
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const shipping = subtotal > 100 ? 0 : 15
  const total = subtotal + shipping

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto">
            <Check className="w-10 h-10 text-accent-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Comanda confirmata!</h1>
          <p className="text-muted-foreground">
            Multumim pentru comanda ta. Vei primi un email de confirmare la{" "}
            <span className="text-foreground font-medium">{formData.email}</span>
          </p>
          <div className="bg-secondary text-secondary-foreground rounded-xl p-6 text-left">
            <h2 className="font-semibold mb-4">Detalii comanda</h2>
            <div className="space-y-2 text-sm">
              <p><span className="text-secondary-foreground/70">Nume:</span> {formData.firstName} {formData.lastName}</p>
              <p><span className="text-secondary-foreground/70">Adresa:</span> {formData.address}, {formData.city}</p>
              <p><span className="text-secondary-foreground/70">Produse:</span> {cart.length}</p>
              <p className="text-lg font-bold text-accent mt-4">Total: {total} RON</p>
            </div>
          </div>
          <Link href="/">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Inapoi la magazin
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Inapoi la produse
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Finalizeaza comanda</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Cart Items */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Cosul tau</h2>
                
                {cart.length === 0 ? (
                  <div className="bg-muted rounded-xl p-8 text-center">
                    <p className="text-muted-foreground mb-4">Cosul tau este gol</p>
                    <Link href="/">
                      <Button variant="outline">Adauga produse</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-4 p-4 bg-muted rounded-xl">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground">{item.product.name}</h3>
                          <p className="text-muted-foreground text-sm">{item.product.weight}</p>
                          <p className="text-accent font-bold">{item.product.price} RON</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 hover:bg-background rounded-lg transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 hover:bg-background rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-2 hover:bg-background rounded-lg transition-colors text-destructive ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Add more products */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                      {products.filter(p => !cart.find(c => c.product.id === p.id)).map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => {
                            addToCart(product, 1)
                            setCart([...getCartItems()])
                          }}
                          className="p-4 rounded-xl border border-border hover:border-accent transition-all text-left"
                        >
                          <div className="relative w-full h-20 rounded-lg overflow-hidden mb-3">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="font-semibold text-foreground text-sm">{product.name}</h3>
                          <p className="text-accent font-bold text-sm">{product.price} RON</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Date personale</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prenume</Label>
                    <Input
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Ion"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nume</Label>
                    <Input
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Popescu"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ion@exemplu.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0712 345 678"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Adresa de livrare</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresa</Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Str. Exemplu, Nr. 10, Bl. A, Sc. 1, Ap. 5"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Oras</Label>
                      <Input
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Bucuresti"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Cod postal</Label>
                      <Input
                        id="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        placeholder="010101"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={cart.length === 0}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Finalizeaza comanda - {total} RON
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-secondary text-secondary-foreground rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Sumar comanda</h2>
              
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-start gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-secondary-foreground text-sm">{item.product.name}</h3>
                        <p className="text-secondary-foreground/70 text-sm">x{item.quantity}</p>
                      </div>
                      <p className="font-semibold text-accent">{item.product.price * item.quantity} RON</p>
                    </div>
                  ))}

                  <div className="border-t border-secondary-foreground/20 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary-foreground/70">Subtotal</span>
                      <span>{subtotal} RON</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary-foreground/70 flex items-center gap-1">
                        <Truck className="w-4 h-4" />
                        Livrare
                      </span>
                      <span>{shipping === 0 ? "Gratuit" : `${shipping} RON`}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-secondary-foreground/50">
                        Livrare gratuita pentru comenzi peste 100 RON
                      </p>
                    )}
                  </div>

                  <div className="border-t border-secondary-foreground/20 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-accent">{total} RON</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-secondary-foreground/70 text-center py-8">
                  Adauga produse in cos
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
      }>
        <CheckoutForm />
      </Suspense>
    </div>
  )
}
