import { CartProvider } from "@/components/cart-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Storefront shell (header, footer, cart). The admin panel has its own layout in app/admin.
export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <SiteHeader />
      {children}
      <SiteFooter />
    </CartProvider>
  );
}
