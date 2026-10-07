import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useShop } from '../context/ShopContext'

function linkActive(to, location) {
  const [path, search] = to.split('?')
  if (location.pathname !== path) return false
  const category = new URLSearchParams(location.search).get('category')
  if (!search) return path !== '/shop' || !category
  return category === new URLSearchParams(search).get('category')
}

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/shop?category=Bouquets', label: 'Bouquets' },
  { to: '/shop?category=Roses', label: 'Roses' },
  { to: '/shop?category=Seasonal', label: 'Seasonal' },
]

function Mark() {
  return (
    <span className="grid h-9 w-9 place-items-center rounded-full bg-blush text-rose">
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <circle cx="12" cy="11" r="2.2" fill="#c4a36a" />
        <circle cx="12" cy="6.2" r="2.4" fill="#a84556" />
        <circle cx="16.4" cy="9" r="2.4" fill="#f4efe8" />
        <circle cx="14.8" cy="13.6" r="2.4" fill="#f3d4d6" />
        <circle cx="9.2" cy="13.6" r="2.4" fill="#a84556" />
        <circle cx="7.6" cy="9" r="2.4" fill="#f3d4d6" />
      </svg>
    </span>
  )
}

export default function Navbar() {
  const { cartCount, wishlist, user, logout } = useShop()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.search])

  const search = (event) => {
    event.preventDefault()
    const term = query.trim()
    navigate(term ? `/shop?q=${encodeURIComponent(term)}` : '/shop')
  }

  return (
    <div className="sticky top-0 z-40 w-full">
      <div className="overflow-hidden bg-forest text-cream">
        <div className="marquee-track flex w-max gap-10 py-2 text-[11px] uppercase tracking-[0.28em]">
          {Array.from({ length: 2 }).map((_, copy) => (
            <div key={copy} className="flex gap-10 pr-10">
              {[
                'Hand-tied this morning',
                'Free delivery over $75',
                'Use code BLOOM10',
                'Same-day stems in the city',
                'Rated 4.9 by regulars',
              ].map((item) => (
                <span key={`${copy}-${item}`}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <header className="w-full border-b border-forest/10 bg-cream/95 backdrop-blur-md">
        <div className="flex w-full items-center gap-3 px-3 py-3 sm:px-4 lg:px-5">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center border border-forest/15 lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="flex w-4 flex-col gap-1">
              <span className="h-px bg-forest" />
              <span className="h-px bg-forest" />
              <span className="h-px bg-forest" />
            </span>
          </button>
          <Link to="/" className="flex items-center gap-2">
            <Mark />
            <span className="font-display text-2xl tracking-tight text-forest">Fleurora</span>
          </Link>
          <nav className="ml-6 hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                aria-current={linkActive(link.to, location) ? 'page' : undefined}
                className={`text-sm tracking-wide transition hover:text-rose ${
                  linkActive(link.to, location) ? 'text-rose' : 'text-ink/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <form onSubmit={search} className="ml-auto hidden min-w-0 flex-1 md:block lg:max-w-xs lg:flex-none">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search roses, tulips, peonies"
              aria-label="Search flowers"
              className="field py-2.5 text-sm"
            />
          </form>
          <div className="ml-auto flex items-center gap-1 sm:gap-2 md:ml-2">
            {user ? (
              <button type="button" onClick={logout} className="hidden px-2 text-sm sm:block">
                {user.name.split(' ')[0]} · Out
              </button>
            ) : (
              <Link to="/login" className="hidden px-2 text-sm sm:block">
                Sign in
              </Link>
            )}
            <Link to="/wishlist" className="relative grid h-10 w-10 place-items-center" aria-label="Wishlist">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 20s-7-4.4-7-9.1C5 8 6.8 6.4 9 6.4c1.3 0 2.4.6 3 1.6.6-1 1.7-1.6 3-1.6 2.2 0 4 1.6 4 4.5C19 15.6 12 20 12 20Z" />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center bg-rose px-1 text-[10px] text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative grid h-10 w-10 place-items-center" aria-label="Cart">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 7h15l-1.5 9h-12L5 4H2" />
                <circle cx="9" cy="20" r="1.2" fill="currentColor" />
                <circle cx="18" cy="20" r="1.2" fill="currentColor" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center bg-forest px-1 text-[10px] text-cream">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-forest/10 bg-cream lg:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-4">
                <form onSubmit={search} className="mb-2">
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search flowers"
                    aria-label="Search flowers"
                    className="field"
                  />
                </form>
                {links.map((link) => (
                  <Link key={link.label} to={link.to} className="py-2 text-lg font-display">
                    {link.label}
                  </Link>
                ))}
                {user ? (
                  <button type="button" onClick={logout} className="py-2 text-left font-display text-lg">
                    Sign out
                  </button>
                ) : (
                  <Link to="/login" className="py-2 font-display text-lg">
                    Sign in
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  )
}
