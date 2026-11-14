# Floréva

Next.js 15 (App Router) + TypeScript + Tailwind CSS 3, with Supabase Auth and shadcn-style UI
components (`components/ui/*`).

## Run

```bash
npm install
cp .env.example .env.local   # then fill in the Supabase values
npm run dev                  # http://localhost:3000
```

Production check: `npm run build && npm start`

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. **Project Settings → API**: copy the project URL and the **publishable key** into `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
   ```

   Add the same two variables to your host (e.g. Vercel → Settings → Environment Variables).
3. Run `supabase/migrations/0001_profiles.sql` in the SQL editor. It creates `profiles` with RLS,
   the `is_admin()` helper, a trigger that blocks role self-promotion, and a trigger that creates
   a profile row on signup.
4. Sign up once at `/signup`, then grant yourself admin:

   ```sql
   update public.profiles set role = 'admin' where email = 'you@example.com';
   ```

Email confirmation is on by default. For local testing either click the emailed link (handled by
`/auth/callback`) or turn off **Authentication → Providers → Email → Confirm email**.

## Auth

| Area                  | Access                                                         |
| --------------------- | -------------------------------------------------------------- |
| `/`, `/products`, `/cart` | Public                                                     |
| `/login`, `/signup`   | Public (signed-in users are redirected to `/account`)          |
| `/account`            | Any signed-in user                                             |
| `/admin`              | `profiles.role = 'admin'` only (everyone else gets a 404)      |

Protection is layered: `middleware.ts` refreshes the session and bounces anonymous users from
`/admin` and `/account`; `app/admin/layout.tsx` re-checks the role server-side; the real boundary
is Postgres RLS. Authorization always uses the server-validated `supabase.auth.getUser()`
(`lib/auth`), never client state.

## Pages

| Route                | File                                |
| -------------------- | ----------------------------------- |
| `/`                  | `app/(store)/page.tsx`              |
| `/products`          | `app/(store)/products/page.tsx`     |
| `/products/[slug]`   | `app/(store)/products/[slug]/page.tsx` |
| `/cart` (+ checkout) | `app/(store)/cart/page.tsx`         |
| `/account`           | `app/(store)/account/page.tsx`      |
| `/login`, `/signup`  | `app/login`, `app/signup`           |
| `/admin/*`           | `app/admin/*`                       |

## Things to change first

1. **Store name, delivery fee, products:** `lib/products.ts` (`SITE_NAME`, `DELIVERY_FEE`, `products`).
2. **Product photos:** put images in `public/` and set `image: "/xyz.jpg"` on a product.
3. **Brand color:** `--brand` in `app/globals.css` (one value re-themes the whole site).
4. **Placeholders in `[brackets]`:** phone, email, address, return days, free-delivery amount.
5. **Real orders:** `app/(store)/cart/page.tsx` has a `TODO` in `handleSubmit`. Send the order to
   your API there. bKash / card payment needs a real payment gateway.
6. **Admin data is still sample data:** `lib/admin-data.ts`. Move orders/products into Supabase and
   add `admin`-only RLS policies (see the pattern at the bottom of the migration).

## Structure

```
app/                    routes ((store) group = storefront, admin/, login, signup, auth/callback)
components/             header, footer, product card, cart provider, ...
components/ui/          button, input, badge (shadcn style, built on class-variance-authority)
components/auth/        sign-out button
lib/                    products data, helpers
lib/auth/               session helpers and server actions
lib/supabase/           browser/server clients + middleware session helper
middleware.ts           session refresh + /admin, /account protection
supabase/migrations/    SQL to run in Supabase
```

Cart is kept in React context and saved in `localStorage`.
