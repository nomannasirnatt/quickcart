# QuickCart

A small **Next.js (App Router)** sample app whose UI reads everything from a **dummy backend
that ships inside the same project** (Next.js route handlers under `/api`). One repo, one
deploy — nothing external to configure.

- **Framework:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Backend:** in-app route handlers over an in-memory dataset (`src/lib/data.ts`)

## Pages

| Route            | What it shows                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| `/`              | Stats strip + product grid, with search / category filter / sorting (server-rendered from the API) |
| `/products/[id]` | Product detail + "Place order" button that POSTs to the API **from the browser**                   |
| `/orders`        | Orders list read from the API on the server, with a refresh button                                 |

## Dummy backend API

| Method | Endpoint             | Notes                                                              |
| ------ | -------------------- | ------------------------------------------------------------------ |
| GET    | `/api/products`      | Query params: `q`, `category`, `sort=price-asc\|price-desc\|rating` |
| GET    | `/api/products/[id]` | `404` when the id is unknown                                       |
| GET    | `/api/stats`         | Counts + average price for the dashboard cards                     |
| GET    | `/api/orders`        | Orders, newest first                                               |
| POST   | `/api/orders`        | Body `{ "productId": "p-001", "quantity": 2 }`, returns `201`      |

Try it:

```bash
curl "http://localhost:3000/api/products?q=watch&sort=price-asc"
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d "{\"productId\":\"p-001\",\"quantity\":2}"
```

The route handlers add a small artificial delay so the loading skeletons are visible.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Deploy to Vercel

No environment variables are required — server components resolve their own base URL from
the request headers (`x-forwarded-host` / `host`), so local, preview and production all work.

**Option A — Git (recommended)**

```bash
git add -A
git commit -m "QuickCart sample app"
git remote add origin https://github.com/<you>/quickcart.git
git push -u origin main
```

Then on [vercel.com/new](https://vercel.com/new): import the repo → the framework preset is
detected as **Next.js** → **Deploy**. Every later push gets its own preview URL.

**Option B — Vercel CLI**

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

### Optional env var

`NEXT_PUBLIC_SITE_URL` (e.g. `https://quickcart.vercel.app`) overrides the auto-detected base
URL. Leave it unset unless you have a specific reason — see `.env.example`.

## Where to plug in a real backend

Everything the UI needs goes through `src/lib/api.ts` → the route handlers in
`src/app/api/**`. Two ways to make it real:

1. **Keep the routes, swap the storage.** Replace the arrays in `src/lib/data.ts` with your
   database client (Postgres, Prisma, Mongo…). The UI does not change at all.
2. **Point at an external API.** Change the base URL in `src/lib/api.ts` and delete
   `src/app/api/**`.

Orders are stored in a module-level array. On Vercel each serverless instance has its own
memory and instances recycle, so orders are not durable — that is intentional for a demo.

## Project layout

```
src/
├─ app/
│  ├─ (catalogue)/
│  │  ├─ page.tsx                 catalogue at "/" (server component)
│  │  └─ loading.tsx              skeleton, scoped to this group only
│  ├─ api/
│  │  ├─ orders/route.ts          GET + POST orders
│  │  ├─ products/route.ts        GET list (search / filter / sort)
│  │  ├─ products/[id]/route.ts   GET one
│  │  └─ stats/route.ts           GET summary
│  ├─ orders/page.tsx             orders list (server component)
│  ├─ products/[id]/page.tsx      product detail (server component)
│  ├─ layout.tsx, error.tsx, not-found.tsx
│  └─ globals.css
├─ components/                    Header, ProductCard, SearchBar, StatCard,
│                                 AddToCartButton, RefreshButton
└─ lib/
   ├─ api.ts                      base-URL resolution + typed fetch helpers
   ├─ data.ts                     the dummy "database"
   └─ types.ts
```

`(catalogue)` is a route group, so it does not appear in the URL — the page still lives at
`/`. It exists so the loading skeleton is scoped to the catalogue: a `loading.tsx` at the
`app/` root would wrap every route in a Suspense boundary, and the streamed shell would make
`/products/<unknown>` answer `200` instead of a real `404`.
