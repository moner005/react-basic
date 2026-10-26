import { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '../components/Pagination.tsx'
import ProductGrid from '../components/ProductGrid.tsx'
import type { Product, ProductResponse } from '../types.ts'

const PAGE_SIZE = 8

function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)
  const totalPages = Math.ceil(total / PAGE_SIZE)

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    async function loadProducts() {
      setLoading(true)
      setError('')
      setProducts([])

      try {
        const skip = (page - 1) * PAGE_SIZE
        const response = await axios.get<ProductResponse>(
          'https://dummyjson.com/products',
          { params: { limit: PAGE_SIZE, skip }, signal: controller.signal },
        )

        if (active) {
          setProducts(Array.isArray(response.data.products) ? response.data.products : [])
          setTotal(Number(response.data.total) || 0)
        }
      } catch (requestError) {
        if (active && !axios.isCancel(requestError)) {
          const message = axios.isAxiosError(requestError) || requestError instanceof Error
            ? requestError.message
            : 'Something went wrong while loading products.'
          setError(message)
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    loadProducts()

    return () => {
      active = false
      controller.abort()
    }
  }, [page, retryCount])

  function choosePage(nextPage: number) {
    if (nextPage >= 1 && nextPage <= totalPages && nextPage !== page) {
      setLoading(true)
      setError('')
      setProducts([])
      setPage(nextPage)
    }
  }

  return (
    <section id="products" className="scroll-mt-8 bg-[#fbfaf7]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-8 flex flex-col gap-3 border-b border-[#e6e0d7] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="font-serif text-4xl tracking-[-0.03em] sm:text-5xl">Products</h1>
          {!loading && !error && total > 0 && (
            <p className="text-sm text-[#746d65]">{total} things worth a look</p>
          )}
        </div>

        <div aria-live="polite" aria-busy={loading}>
          {loading && (
            <p className="py-16 text-center text-[#746d65]" role="status">Finding good things…</p>
          )}

          {!loading && error && (
            <div className="mx-auto max-w-xl py-12 text-center" role="alert">
              <h2 className="font-serif text-2xl">We couldn’t load the collection</h2>
              <p className="mt-3 text-[#746d65]">{error}</p>
              <button
                className="mt-6 rounded-full border border-[#7b263a] px-5 py-2.5 text-sm font-semibold text-[#7b263a] transition hover:bg-[#7b263a] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b263a]"
                type="button"
                onClick={() => setRetryCount((count) => count + 1)}
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <p className="py-16 text-center text-[#746d65]" role="status">Nothing in the collection just yet.</p>
          )}

          {!loading && !error && products.length > 0 && <ProductGrid products={products} />}
        </div>

        {!error && totalPages > 1 && (loading || products.length > 0) && (
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={choosePage} />
        )}
      </div>
    </section>
  )
}

export default Products
