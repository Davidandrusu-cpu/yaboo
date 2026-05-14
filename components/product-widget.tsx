"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/products"
import { addToCart } from "@/components/navigation"

interface ProductWidgetProps {
  product: Product
}

export function ProductWidget({ product }: ProductWidgetProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product, 1)
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-secondary text-secondary-foreground rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group hover:scale-[1.02]">
        {/* Product Image */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-semibold">
            {product.weight}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-accent text-accent" />
            ))}
            <span className="text-secondary-foreground/70 text-sm ml-2">(4.9)</span>
          </div>

          <h3 className="text-xl font-bold text-secondary-foreground">{product.name}</h3>
          
          <p className="text-secondary-foreground/70 text-sm line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-accent">{product.price} RON</span>
          </div>

          <ul className="space-y-2">
            {product.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-secondary-foreground/80">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex gap-3 pt-2">
            <Button 
              onClick={handleAddToCart}
              variant="outline" 
              className="flex-1 border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Adauga
            </Button>
            <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
              Detalii
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
