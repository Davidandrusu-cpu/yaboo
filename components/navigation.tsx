"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { products, type Product } from "@/lib/products"

interface CartItem {
  product: Product
  quantity: number
}

// Simple cart state - in production, use a proper state management solution
let cartItems: CartItem[] = []
let cartListeners: (() => void)[] = []

export function addToCart(product: Product, quantity: number = 1) {
  const existingItem = cartItems.find(item => item.product.id === product.id)
  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cartItems.push({ product, quantity })
  }
  cartListeners.forEach(listener => listener())
}

export function removeFromCart(productId: string) {
  cartItems = cartItems.filter(item => item.product.id !== productId)
  cartListeners.forEach(listener => listener())
}

export function updateQuantity(productId: string, quantity: number) {
  const item = cartItems.find(item => item.product.id === productId)
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      item.quantity = quantity
      cartListeners.forEach(listener => listener())
    }
  }
}

export function getCartItems(): CartItem[] {
  return cartItems
}

export function getCartTotal(): number {
  return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0)
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const updateCart = () => setCart([...cartItems])
    cartListeners.push(updateCart)
    return () => {
      cartListeners = cartListeners.filter(l => l !== updateCart)
    }
  }, [])

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Yaboo%21%20alb%20%281%29-5fzTBUY5P9JTlGEH3Gz5yyxkb6VWkO.png"
              alt="Yaboo! Logo"
              width={120}
              height={60}
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-foreground hover:text-accent transition-colors font-medium">
              Acasa
            </Link>
            <Link href="/contact" className="text-foreground hover:text-accent transition-colors font-medium">
              Contact
            </Link>
            
            {/* Cart Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2 text-foreground hover:text-accent transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Cart Dropdown Menu */}
              {isCartOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-background border border-border rounded-xl shadow-xl z-50">
                  <div className="p-4">
                    <h3 className="font-bold text-foreground mb-4">Cosul tau</h3>
                    
                    {cart.length === 0 ? (
                      <p className="text-muted-foreground text-sm py-4 text-center">
                        Cosul este gol
                      </p>
                    ) : (
                      <>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {cart.map((item) => (
                            <div key={item.product.id} className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                              <Image
                                src={item.product.image}
                                alt={item.product.name}
                                width={48}
                                height={48}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground text-sm truncate">{item.product.name}</p>
                                <p className="text-accent font-bold text-sm">{item.product.price} RON</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="p-1 hover:bg-background rounded"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-6 text-center text-sm">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="p-1 hover:bg-background rounded"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="p-1 hover:bg-background rounded text-destructive"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t border-border mt-4 pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-medium text-foreground">Total:</span>
                            <span className="font-bold text-accent text-lg">{totalPrice} RON</span>
                          </div>
                          <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                              Finalizeaza comanda
                            </Button>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link href="/checkout">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Comanda acum
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            {/* Mobile Cart */}
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2 text-foreground"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Cart Dropdown */}
        {isCartOpen && (
          <div className="md:hidden pb-4">
            <div className="bg-muted rounded-xl p-4">
              <h3 className="font-bold text-foreground mb-4">Cosul tau</h3>
              
              {cart.length === 0 ? (
                <p className="text-muted-foreground text-sm py-4 text-center">
                  Cosul este gol
                </p>
              ) : (
                <>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3 p-2 bg-background rounded-lg">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">{item.product.name}</p>
                          <p className="text-accent font-bold text-sm">{item.product.price} RON x {item.quantity}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-border mt-4 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium text-foreground">Total:</span>
                      <span className="font-bold text-accent text-lg">{totalPrice} RON</span>
                    </div>
                    <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        Finalizeaza comanda
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link 
                href="/" 
                className="text-foreground hover:text-accent transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Acasa
              </Link>
              <Link 
                href="/contact" 
                className="text-foreground hover:text-accent transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link href="/checkout" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Comanda acum
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
