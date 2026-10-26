function Footer() {
  return (
    <footer className="border-t border-[#e6e0d7] bg-[#f7f5f0]">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-[#746d65] sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <a className="font-serif text-xl font-semibold tracking-[-0.04em] text-[#29231f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b263a]" href="#home">Store</a>
        <p>© {new Date().getFullYear()} Store</p>
        <nav aria-label="Footer navigation" className="flex gap-5">
          <a className="transition hover:text-[#7b263a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b263a]" href="#products">Products</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
