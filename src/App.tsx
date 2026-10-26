import { useEffect } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router'
import Footer from './components/Footer.tsx'
import Header from './components/Header.tsx'
import ProductDetails from './pages/ProductDetails.tsx'
import Products from './pages/Products.tsx'

function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#29231f]">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="*" element={
            <section className="min-h-[60vh] bg-[#fbfaf7] px-5 py-20 text-center">
              <h1 className="font-serif text-4xl tracking-[-0.03em]">Page not found</h1>
              <p className="mt-3 text-[#746d65]">That page isn’t part of the collection.</p>
              <Link className="mt-7 inline-flex rounded-full border border-[#7b263a] px-5 py-2.5 text-sm font-semibold text-[#7b263a] transition hover:bg-[#7b263a] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b263a]" to="/products">
                Back to products
              </Link>
            </section>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
