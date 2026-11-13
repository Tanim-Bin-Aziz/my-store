import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_NAME } from "@/lib/products";

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  description: "Quality products imported from China, delivered across Bangladesh.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans text-sm leading-normal">
        <CartProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
