# Store

A small product browsing app made with React, TypeScript, Vite, Tailwind CSS, Axios, and React Router.

## Run it

```sh
npm install
npm run dev
```

Open the local address printed by Vite. `npm run typecheck` checks TypeScript, `npm run lint` checks the source files, `npm run build` type-checks and creates production files in `dist/`, and `npm run preview` serves that build locally.

## How it works

- `src/App.tsx` defines the routes and shared header/footer. `/` redirects to `/products`, `/products` shows the catalog, and `/products/:id` shows one product.
- `src/pages/Products.tsx` owns listing state, pagination, and its direct Axios request. `src/pages/ProductDetails.tsx` reads the ID from the URL and loads that product with Axios.
- `src/components/` contains the header, product grid and cards, page controls, and footer.
- `src/types.ts` defines the product and API response shapes used by the app.
- Products come from [DummyJSON](https://dummyjson.com/products). The list asks for eight products per request. The offset is `(page - 1) * 8`, so page 1 starts at 0 and page 2 starts at 8. The API's `total` value determines how many pages are available. Details use `/products/{id}`.
- A loading message, a retryable error, and an empty result each have their own display. Changing pages cancels the earlier request so an old response cannot replace the selected page.

Tailwind is enabled by the Vite plugin in `vite.config.ts` and imported in `src/index.css`.

When deploying to a static host, configure it to serve `index.html` for application paths such as `/products/5`; this lets direct visits and page refreshes reach the client router.
