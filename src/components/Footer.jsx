import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

export default function Footer() {
  const { notify } = useShop()

  const subscribe = (event) => {
    event.preventDefault()
    const email = new FormData(event.currentTarget).get('email')
    if (!email) return
    event.currentTarget.reset()
    notify('You are on the list. First stems, first word.')
  }

  return (
    <footer className="mt-auto w-full bg-forest text-cream">
      <div className="grid w-full gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-4xl">Fleurora</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/75">
            A city atelier for people who want flowers that still look like they were cut in a garden.
          </p>
          <form onSubmit={subscribe} className="mt-6 flex w-full max-w-md">
            <input
              name="email"
              type="email"
              required
              placeholder="Email for seasonal notes"
              className="field min-w-0 flex-1 border-cream/20 bg-white/10 text-cream placeholder:text-cream/50"
            />
            <button type="submit" className="btn btn-rose shrink-0">
              Join
            </button>
          </form>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Shop</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-cream/80">
            <Link to="/shop" className="hover:text-white">All flowers</Link>
            <Link to="/shop?category=Bouquets" className="hover:text-white">Bouquets</Link>
            <Link to="/shop?category=Roses" className="hover:text-white">Roses</Link>
            <Link to="/shop?category=Tulips" className="hover:text-white">Tulips</Link>
            <Link to="/shop?category=Seasonal" className="hover:text-white">Seasonal</Link>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Visit</p>
          <p className="mt-4 text-sm leading-relaxed text-cream/80">
            18 Willow Lane
            <br />
            Atelier open 9–7
            <br />
            hello@fleurora.shop
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Care</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-cream/80">
            <Link to="/cart" className="hover:text-white">Cart</Link>
            <Link to="/wishlist" className="hover:text-white">Wishlist</Link>
            <Link to="/login" className="hover:text-white">Account</Link>
            <Link to="/checkout" className="hover:text-white">Checkout</Link>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2 border-t border-white/10 px-4 py-4 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Fleurora. Flowers for the table, not the warehouse. Photos from Unsplash.</p>
        <p>Free delivery over $75 · Code BLOOM10</p>
      </div>
    </footer>
  )
}
