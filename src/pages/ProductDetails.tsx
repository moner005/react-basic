import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router'
import type { Product } from '../types.ts'

function ProductDetails() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const productId = Number(id)
    setProduct(null)
    setError('')
    setNotFound(false)

    if (!Number.isSafeInteger(productId) || productId <= 0) {
      setLoading(false)
      setNotFound(true)
      return
    }

    const controller = new AbortController()
    let active = true

    async function loadProduct() {
      setLoading(true)
      try {
        const response = await axios.get<Product>(
          `https://dummyjson.com/products/${productId}`,
          { signal: controller.signal },
        )
        if (active) setProduct(response.data)
      } catch (requestError) {
        if (active && !axios.isCancel(requestError)) {
          if (axios.isAxiosError(requestError) && requestError.response?.status === 404) {
            setNotFound(true)
          } else {
            const message = axios.isAxiosError(requestError) || requestError instanceof Error
              ? requestError.message
              : 'Something went wrong while loading this product.'
            setError(message)
          }
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    loadProduct()

    return () => {
      active = false
      controller.abort()
    }
  }, [id, retryCount])

  const backLink = (
    <Link className="inline-flex rounded-full border border-[#7b263a] px-5 py-2.5 text-sm font-semibold text-[#7b263a] transition hover:bg-[#7b263a] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b263a]" to="/products">
      Back to products
    </Link>
  )

  return (
    <section className="min-h-[60vh] bg-[#fbfaf7]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        {loading && <p className="py-16 text-center text-[#746d65]" role="status">Finding this product…</p>}

        {!loading && notFound && (
          <div className="mx-auto max-w-xl py-16 text-center">
            <h1 className="font-serif text-4xl tracking-[-0.03em]">Product not found</h1>
            <p className="mt-3 text-[#746d65]">We couldn’t find a product with that ID.</p>
            <div className="mt-7">{backLink}</div>
          </div>
        )}

        {!loading && error && (
          <div className="mx-auto max-w-xl py-16 text-center" role="alert">
            <h1 className="font-serif text-4xl tracking-[-0.03em]">We couldn’t load this product</h1>
            <p className="mt-3 text-[#746d65]">{error}</p>
            <button
              className="mt-7 rounded-full border border-[#7b263a] px-5 py-2.5 text-sm font-semibold text-[#7b263a] transition hover:bg-[#7b263a] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b263a]"
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
            >
              Try again
            </button>
            <div className="mt-4">{backLink}</div>
          </div>
        )}

        {!loading && !error && !notFound && product && (
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div className="flex aspect-square items-center justify-center bg-[#eee9e0] p-6 sm:p-10">
              <img className="size-full object-contain" src={product.thumbnail || product.images?.[0]} alt={product.title} />
            </div>
            <div className="py-2 sm:py-6">
              <Link className="mb-8 inline-flex text-sm font-medium text-[#7b263a] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b263a]" to="/products">
                ← Back to products
              </Link>
              <h1 className="font-serif text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">{product.title}</h1>
              <div className="mt-5 flex items-center gap-5">
                <p className="text-lg font-semibold text-[#7b263a]">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
                </p>
                <p aria-label={`Rated ${Number(product.rating).toFixed(1)} out of 5`} className="text-sm text-[#746d65]">
                  ★ {Number(product.rating).toFixed(1)}
                </p>
              </div>
              <p className="mt-7 max-w-xl text-base leading-7 text-[#746d65]">{product.description}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductDetails
