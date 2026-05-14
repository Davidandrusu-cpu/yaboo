"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { addToCart } from "@/components/navigation"
import type { Product } from "@/lib/products"

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const handleAddToCart = () => {
    addToCart(product, 1)
  }

  return (
    <Button
      size="lg"
      variant="outline"
      onClick={handleAddToCart}
      className="flex-1 border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/90"
    >
      <ShoppingCart className="w-5 h-5 mr-2" />
      Adauga in cos
    </Button>
  )
}
