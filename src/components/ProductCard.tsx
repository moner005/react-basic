import { Link } from 'react-router'
import type { Product } from '../types.ts'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const image = product.thumbnail || product.images?.[0]
  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price)

  return (
    <Link className="group block min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b263a]" to={`/products/${product.id}`}>
      <article>
        <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#eee9e0] p-4 sm:p-5">
          {image && (
            <img
              className="size-full object-contain"
              src={image}
              alt={product.title}
              loading="lazy"
            />
          )}
        </div>
        <div className="pt-4">
          <h3 className="min-h-12 font-medium leading-6 text-[#29231f]">{product.title}</h3>
          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#7b263a]">{price}</p>
            <p aria-label={`Rated ${Number(product.rating).toFixed(1)} out of 5`} className="text-sm text-[#746d65]">
              ★ {Number(product.rating).toFixed(1)}
            </p>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default ProductCard
