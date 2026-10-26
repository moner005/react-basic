# Store

A small product browsing app made with React, TypeScript, Vite, and Tailwind CSS.

## Run it

```sh
npm install
npm run dev
```

Open the local address printed by Vite. `npm run typecheck` checks TypeScript, `npm run lint` checks the source files, `npm run build` type-checks and creates production files in `dist/`, and `npm run preview` serves that build locally.

## How it works

- `src/App.tsx` keeps the selected page, products, loading state, and request error. It fetches products directly with `fetch` and passes the results to the page components.
- `src/components/` contains the header, product grid and cards, page controls, and footer.
- `src/types.ts` defines the product and API response shapes used by the app.
- The product list comes from [DummyJSON](https://dummyjson.com/products). Each request asks for eight products. The offset is `(page - 1) * 8`, so page 1 starts at 0 and page 2 starts at 8. The API's `total` value determines how many pages are available.
- A loading message, a retryable error, and an empty result each have their own display. Changing pages cancels the earlier request so an old response cannot replace the selected page.

Tailwind is enabled by the Vite plugin in `vite.config.ts` and imported in `src/index.css`.
