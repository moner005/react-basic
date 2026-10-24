# Store

A small product browsing app made with React, Vite, and Tailwind CSS.

## Run it

```sh
npm install
npm run dev
```

Open the local address printed by Vite. Use `npm run lint` to check the JSX, `npm run build` to create production files in `dist/`, and `npm run preview` to view that build locally.

## How it works

- `src/App.jsx` keeps the selected page, products, loading state, and request error. It fetches products directly with `fetch` and passes the results to the page components.
- `src/components/` contains the header, product grid and cards, page controls, and footer.
- The product list comes from [DummyJSON](https://dummyjson.com/products). Each request asks for eight products. The offset is `(page - 1) * 8`, so page 1 starts at 0 and page 2 starts at 8. The API's `total` value determines how many pages are available.
- A loading message, a retryable error, and an empty result each have their own display. Changing pages cancels the earlier request so an old response cannot replace the selected page.

Tailwind is enabled by the Vite plugin in `vite.config.js` and imported in `src/index.css`.
