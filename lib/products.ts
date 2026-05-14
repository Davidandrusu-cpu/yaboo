export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice: number
  weight: string
  features: string[]
  image: string
  ingredients: string
  isBundle?: boolean
  bundleContents?: string[]
}

export const products: Product[] = [
  {
    id: "classic",
    name: "Yaboo! Classic",
    description: "Pentru acele momente cand ramai fara mancare in frigider si nu ai nici un chef sa gatesti. Biltong autentic cu gust clasic.",
    price: 23,
    originalPrice: 23,
    weight: "50g",
    features: [
      "High protein",
      "No preservatives",
      "Gluten free",
      "Keto friendly",
      "Traditional recipe",
      "Made in Romania"
    ],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-11%20at%2014.50.23-PWovo3d3u6nbjVDlk9HKeRgOm9PxPy.jpeg",
    ingredients: "Beef, salt, coriander, pepper, vinegar"
  },
  {
    id: "chilli",
    name: "Yaboo! Chilli",
    description: "Pentru acele momente cand ti se face foame pe drum spre casa, dar esti bara la bara. Biltong picant pentru cei indrazneti.",
    price: 23,
    originalPrice: 23,
    weight: "50g",
    features: [
      "High protein",
      "No preservatives",
      "Gluten free",
      "Spicy kick",
      "Traditional recipe",
      "Made in Romania"
    ],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-11%20at%2014.50.23%20%282%29-mawH3SbpTVSJPL08WyLFLUxWcr7NgD.jpeg",
    ingredients: "Beef, salt, coriander, chilli, pepper, vinegar"
  },
  {
    id: "usturoi",
    name: "Yaboo! Usturoi",
    description: "Pentru acele momente cand ti se face foame la sprit si inca nu s-au facut micii. Biltong aromat cu usturoi.",
    price: 23,
    originalPrice: 23,
    weight: "50g",
    features: [
      "High protein",
      "No preservatives",
      "Gluten free",
      "Garlic flavor",
      "Traditional recipe",
      "Made in Romania"
    ],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-11%20at%2014.50.23%20%281%29-QQlnJsH8SMVspXNZRKTaeSyrY8VTvD.jpeg",
    ingredients: "Beef, salt, coriander, garlic, pepper, vinegar"
  },
  {
    id: "pachet-degustare",
    name: "Pachetul de Degustare",
    description: "Descopera toate aromele Yaboo! Un pachet complet cu cate un produs din fiecare aroma - Classic, Chilli si Usturoi.",
    price: 65,
    originalPrice: 81,
    weight: "150g (3x50g)",
    features: [
      "3 arome diferite",
      "Pret avantajos",
      "Cadou perfect",
      "Descopera-ti favoritul"
    ],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Yaboo%21%20alb%20%281%29-5fzTBUY5P9JTlGEH3Gz5yyxkb6VWkO.png",
    ingredients: "1x Classic, 1x Chilli, 1x Usturoi",
    isBundle: true,
    bundleContents: ["classic", "chilli", "usturoi"]
  }
]

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getAllProducts(): Product[] {
  return products.filter(p => !p.isBundle)
}

export function getBundleProduct(): Product | undefined {
  return products.find(p => p.isBundle)
}
