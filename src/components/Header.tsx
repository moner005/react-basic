function Header() {
  return (
    <header className="border-b border-[#e6e0d7] bg-[#f7f5f0]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a className="font-serif text-4xl font-semibold tracking-[-0.04em] text-[#29231f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b263a] sm:text-5xl" href="#home">
          Store
        </a>
        <nav aria-label="Main navigation" className="flex items-center gap-6 text-sm font-medium text-[#5c554e] sm:gap-8">
          <a className="transition hover:text-[#7b263a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b263a]" href="#products">Products</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
