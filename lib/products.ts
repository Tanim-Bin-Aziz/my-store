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

export const SITE_NAME = "YourStore";
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
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
