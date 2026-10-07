import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { money } from '../data/products'
import { useShop } from '../context/ShopContext'

const methods = [
  { id: 'card', label: 'Card' },
  { id: 'upi', label: 'UPI' },
  { id: 'cod', label: 'Cash on delivery' },
]

export default function Checkout() {
  const { cart, user, subtotal, discount, shipping, total, clearCart } = useShop()
  const navigate = useNavigate()
  const [method, setMethod] = useState('card')
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = 'Checkout · Fleurora'
  }, [])

  if (cart.length === 0) {
    return (
      <div className="px-4 py-20 text-center">
        <p className="font-display text-4xl text-forest">Your cart is empty.</p>
        <Link to="/shop" className="btn btn-dark mt-6">
          Find flowers
        </Link>
      </div>
    )
  }

  const place = (event) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    if (!data.name || !data.phone || !data.address || !data.city || !data.pin) {
      setError('Add every delivery detail so the courier can find the door.')
      return
    }
    const order = {
      id: `FLR-${Date.now().toString().slice(-6)}`,
      ...data,
      method,
      items: cart.map((item) => ({
        name: item.product.name,
        qty: item.qty,
        line: item.line,
      })),
      total,
    }
    clearCart()
    navigate('/order-confirmation', { state: order })
  }

  return (
    <div className="w-full px-3 py-8 sm:px-5 lg:px-6">
      <h1 className="font-display text-5xl text-forest">Checkout</h1>
      {!user && (
        <p className="mt-3 text-sm text-ink/70">
          Checking out as a guest.{' '}
          <Link to="/login" className="text-rose">
            Sign in
          </Link>{' '}
          if you already have an account.
        </p>
      )}
      <form onSubmit={place} className="mt-8 grid w-full gap-6 lg:grid-cols-[1.3fr_0.8fr]">
        <div className="flex flex-col gap-4 bg-paper p-5 sm:p-7">
          <h2 className="font-display text-3xl text-forest">Delivery</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input className="field sm:col-span-2" name="name" defaultValue={user?.name || ''} placeholder="Full name" required />
            <input className="field" name="email" type="email" defaultValue={user?.email || ''} placeholder="Email" required />
            <input className="field" name="phone" placeholder="Phone" required />
            <input className="field sm:col-span-2" name="address" placeholder="Street address" required />
            <input className="field" name="city" placeholder="City" required />
            <input className="field" name="pin" placeholder="PIN code" required />
          </div>
          <label className="text-sm text-ink/70">
            Card message
            <textarea name="note" rows="3" className="field mt-2" placeholder="A line for the person opening the door" />
          </label>
          <div>
            <p className="text-sm text-ink/70">Payment</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {methods.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMethod(item.id)}
                  className={`border px-3 py-3 text-sm transition ${
                    method === item.id ? 'border-forest bg-forest text-cream' : 'border-forest/15 bg-cream'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          {error && <p className="text-sm text-rose">{error}</p>}
          <button type="submit" className="btn btn-dark mt-2">
            Place order · {money(total)}
          </button>
        </div>
        <aside className="h-fit bg-sand p-5 sm:p-6">
          <h2 className="font-display text-3xl text-forest">Order</h2>
          <ul className="mt-4 space-y-3">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <img src={item.product.image} alt="" className="h-16 w-14 object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{item.product.name}</p>
                  <p className="text-sm text-ink/55">Qty {item.qty}</p>
                </div>
                <p>{money(item.line)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-forest/10 pt-4 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Discount</dt><dd>{discount ? `−${money(discount)}` : money(0)}</dd></div>
            <div className="flex justify-between"><dt>Delivery</dt><dd>{shipping === 0 ? 'Free' : money(shipping)}</dd></div>
            <div className="flex justify-between pt-2 font-display text-2xl"><dt>Total</dt><dd>{money(total)}</dd></div>
          </dl>
        </aside>
      </form>
    </div>
  )
}
