import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { money } from '../data/products'

export default function OrderSuccess() {
  const { state } = useLocation()

  useEffect(() => {
    document.title = 'Order placed · Fleurora'
  }, [])

  if (!state?.id) {
    return (
      <div className="px-4 py-20 text-center">
        <p className="font-display text-4xl text-forest">No order to show.</p>
        <Link to="/shop" className="btn btn-dark mt-6">
          Return to the shop
        </Link>
      </div>
    )
  }

  return (
    <div className="grid w-full lg:grid-cols-2">
      <div className="relative min-h-72">
        <img src="/flowers/atelier.jpg" alt="Garden path in bloom" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="px-5 py-12 sm:px-12">
        <p className="text-xs uppercase tracking-[0.24em] text-rose">Order {state.id}</p>
        <h1 className="mt-3 font-display text-5xl text-forest">It is on its way to being tied.</h1>
        <p className="mt-4 max-w-md text-ink/75">
          We will deliver to {state.address}, {state.city} {state.pin}. A note goes with the flowers
          {state.note ? `: “${state.note}”` : '.'}
        </p>
        <ul className="mt-6 space-y-2 text-sm">
          {state.items.map((item) => (
            <li key={item.name} className="flex justify-between border-b border-forest/10 py-2">
              <span>
                {item.name} × {item.qty}
              </span>
              <span>{money(item.line)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-display text-3xl">Total {money(state.total)}</p>
        <p className="mt-2 text-sm capitalize text-ink/60">Payment: {state.method}</p>
        <Link to="/shop" className="btn btn-dark mt-8">
          Keep browsing
        </Link>
      </div>
    </div>
  )
}
