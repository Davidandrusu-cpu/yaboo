import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Check, Star, Gift, Truck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { products, getProductById, getAllProducts } from "@/lib/products"
import { AddToCartButton } from "./add-to-cart-button"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  const otherProducts = getAllProducts().filter((p) => p.id !== product.id)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Inapoi la produse
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-secondary rounded-2xl overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 right-4 bg-secondary-foreground/90 text-secondary px-4 py-2 rounded-full font-bold">
                {product.weight}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-muted-foreground text-sm">(128 recenzii)</span>
            </div>

            {/* Title & Price */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-accent">{product.price} RON</span>
              </div>
            </div>

            {/* Discount Info */}
            <div className="bg-accent/10 border border-accent rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-3">
                <Gift className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-semibold text-foreground">Combina reducerile!</p>
                </div>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-8">
                <li>20% reducere la comenzi peste 100 RON</li>
                <li>10% reducere suplimentara la prima comanda (cu inscrierea la newsletter)</li>
              </ul>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Caracteristici</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ingredients */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Ingrediente</h2>
              <p className="text-muted-foreground">{product.ingredients}</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <AddToCartButton product={product} />
              <Link href={`/checkout?product=${product.id}`} className="flex-1">
                <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Cumpara acum
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <Truck className="w-5 h-5 text-accent mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Livrare rapida</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <Shield className="w-5 h-5 text-accent mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">100% Natural</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <Gift className="w-5 h-5 text-accent mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Cadou perfect</p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t border-border pt-6 mt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Greutate</span>
                  <p className="font-medium text-foreground">{product.weight}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Livrare</span>
                  <p className="font-medium text-foreground">2-3 zile lucratoare</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Termen valabilitate</span>
                  <p className="font-medium text-foreground">6 luni</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Depozitare</span>
                  <p className="font-medium text-foreground">Loc racoros si uscat</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Products */}
        {otherProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-foreground mb-8">Alte produse Yaboo!</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="bg-secondary text-secondary-foreground rounded-xl p-6 hover:ring-2 hover:ring-accent transition-all flex items-center gap-6"
                >
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-secondary-foreground text-lg">{p.name}</h3>
                    <p className="text-secondary-foreground/70 text-sm mb-2 line-clamp-2">{p.description}</p>
                    <span className="text-accent font-bold">{p.price} RON</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
