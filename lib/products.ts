// Sample catalog. Replace with your real products (or fetch from your API / database).
// `image` is optional: put files in /public/products and use e.g. "/products/earbuds.jpg".

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  comparePrice?: number;
  badge?: string;
  tags: ("new" | "best")[];
  description: string;
  colors: string[];
  specs: { label: string; value: string }[];
  image?: string;
};

export const SITE_NAME = "Floréva";
export const DELIVERY_FEE = 100;

export const categories = [
  "Electronics",
  "Audio",
  "Home & Kitchen",
  "Fashion",
  "Watches",
  "Tools & DIY",
  "Beauty & Care",
  "Gifts & Toys",
] as const;

const baseDescription =
  "[Write two lines here about what this product does and why a customer would want it.]";

const baseSpecs = [
  { label: "Brand", value: "[Brand]" },
  { label: "Model", value: "[Model]" },
  { label: "Warranty", value: "[Warranty period]" },
];

export const products: Product[] = [
  { slug: "wireless-earbuds", name: "Wireless earbuds", category: "Audio", price: 1200, comparePrice: 1500, badge: "New", tags: ["new", "best"], description: baseDescription, colors: ["Black", "White", "Blue"], specs: [...baseSpecs, { label: "Battery", value: "[Battery life]" }] },
  { slug: "bluetooth-speaker", name: "Bluetooth speaker", category: "Audio", price: 1800, tags: ["best"], description: baseDescription, colors: ["Black", "Red"], specs: baseSpecs },
  { slug: "smart-watch", name: "Smart watch", category: "Watches", price: 2500, comparePrice: 3000, badge: "Best seller", tags: ["best"], description: baseDescription, colors: ["Black", "Silver"], specs: baseSpecs },
  { slug: "fitness-band", name: "Fitness band", category: "Watches", price: 1500, tags: ["new"], description: baseDescription, colors: ["Black", "Blue"], specs: baseSpecs },
  { slug: "led-desk-lamp", name: "LED desk lamp", category: "Home & Kitchen", price: 900, badge: "New", tags: ["new"], description: baseDescription, colors: ["White", "Black"], specs: baseSpecs },
  { slug: "portable-blender", name: "Portable blender", category: "Home & Kitchen", price: 1400, badge: "Best seller", tags: ["best"], description: baseDescription, colors: ["White", "Pink"], specs: baseSpecs },
  { slug: "electric-kettle", name: "Electric kettle", category: "Home & Kitchen", price: 1600, tags: ["best"], description: baseDescription, colors: ["Silver"], specs: baseSpecs },
  { slug: "phone-stand", name: "Phone stand", category: "Electronics", price: 350, tags: ["new"], description: baseDescription, colors: ["Black", "White"], specs: baseSpecs },
  { slug: "mini-projector", name: "Mini projector", category: "Electronics", price: 6500, badge: "New", tags: ["new", "best"], description: baseDescription, colors: ["White"], specs: baseSpecs },
  { slug: "power-bank", name: "Power bank", category: "Electronics", price: 1300, tags: ["best"], description: baseDescription, colors: ["Black", "White"], specs: baseSpecs },
  { slug: "travel-backpack", name: "Travel backpack", category: "Fashion", price: 1900, tags: ["best"], description: baseDescription, colors: ["Black", "Gray", "Navy"], specs: baseSpecs },
  { slug: "cordless-screwdriver", name: "Cordless screwdriver", category: "Tools & DIY", price: 1700, tags: ["best"], description: baseDescription, colors: ["Orange"], specs: baseSpecs },
  { slug: "gift-craft-set", name: "Gift & craft set", category: "Gifts & Toys", price: 850, badge: "New", tags: ["new"], description: baseDescription, colors: ["Multicolor"], specs: baseSpecs },
  { slug: "pink-dried-bouquet", name: "Pink dried flower bouquet", category: "Gifts & Toys", price: 850, comparePrice: 1100, badge: "New", tags: ["new", "best"], description: "Preserved real flowers in soft pink tones, arranged by hand and packed in a gift box. Keeps its colour for months with no watering.", colors: ["Pink", "White"], specs: [{ label: "Type", value: "Preserved natural flowers" }, { label: "Size", value: "Approx. 30 cm" }, { label: "Care", value: "Keep dry, out of direct sun" }], image: "https://images.pexels.com/photos/15574985/pexels-photo-15574985/free-photo-of-a-bouquet-of-dried-flowers.jpeg" },
  { slug: "dried-babys-breath-box", name: "Dried baby's breath gift box", category: "Gifts & Toys", price: 650, badge: "New", tags: ["new"], description: "Delicate pink dried baby's breath presented in a kraft gift box. A ready-to-give present for birthdays, anniversaries and thank-you gifts.", colors: ["Pink"], specs: [{ label: "Type", value: "Dried gypsophila" }, { label: "Packaging", value: "Kraft gift box" }, { label: "Care", value: "Keep dry, avoid direct sun" }], image: "https://images.pexels.com/photos/15575099/pexels-photo-15575099/free-photo-of-dry-flower-bouquet-against-pink-background.jpeg" },
  { slug: "mixed-dried-bunch", name: "Mixed dried flower bunch", category: "Gifts & Toys", price: 750, tags: ["new"], description: "Hand-tied bunch of mixed dried flowers with pink accents and eucalyptus leaves. Works for home decor, weddings and gifts alike.", colors: ["Pink", "Green"], specs: [{ label: "Type", value: "Mixed dried flowers" }, { label: "Stems", value: "Approx. 25 stems" }, { label: "Care", value: "Keep dry, out of direct sun" }], image: "https://images.pexels.com/photos/15574991/pexels-photo-15574991/free-photo-of-beautiful-a-bouquet-of-dried-flowers.jpeg" },
  { slug: "dried-wedding-bouquet", name: "Dried wedding bouquet", category: "Gifts & Toys", price: 1100, badge: "New", tags: ["new", "best"], description: "Elegant close-up bouquet of dried white roses and preserved blooms, made for weddings, engagements and keepsake gifts.", colors: ["White"], specs: [{ label: "Type", value: "Dried rose bouquet" }, { label: "Best for", value: "Weddings & keepsakes" }, { label: "Care", value: "Keep dry, out of direct sun" }], image: "https://images.pexels.com/photos/40788233/pexels-photo-40788233/free-photo-of-elegant-dried-flower-wedding-bouquet-close-up.jpeg" },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
