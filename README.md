# China Import Store

Next.js 15 (App Router) + TypeScript + Tailwind CSS 3, with shadcn-style UI components
(`components/ui/*`). No extra setup needed.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
```

Production check: `npm run build && npm start`

## Pages

| Route                | File                          |
| -------------------- | ----------------------------- |
| `/`                  | `app/page.tsx`                |
| `/products`          | `app/products/page.tsx`       |
| `/products/[slug]`   | `app/products/[slug]/page.tsx`|
| `/cart` (+ checkout) | `app/cart/page.tsx`           |

## Things to change first

1. **Store name, delivery fee, products:** `lib/products.ts` (`SITE_NAME`, `DELIVERY_FEE`, `products`).
2. **Product photos:** put images in `public/products/` and set `image: "/products/xyz.jpg"` on a product.
3. **Brand color:** `--brand` in `app/globals.css` (one value re-themes the whole site).
4. **Placeholders in `[brackets]`:** phone, email, address, return days, free-delivery amount.
5. **Real orders:** `app/cart/page.tsx` has a `TODO` in `handleSubmit`. Send the order to your API there.
   bKash / card payment needs a real payment gateway integration.

## Structure

```
app/            routes (layout, home, products, product detail, cart)
components/     header, footer, product card, cart provider, ...
components/ui/  button, input, badge (shadcn style, built on class-variance-authority)
lib/            products data, helpers
```

Cart is kept in React context and saved in `localStorage`.
