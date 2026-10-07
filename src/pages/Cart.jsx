import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { money } from '../data/products'
import { useShop } from '../context/ShopContext'
import { QtyStepper } from '../components/Ui'

export default function Cart() {
  const { cart, updateQty, removeFromCart, subtotal, discount, shipping, total, promo, applyPromo } = useShop()
  const [code, setCode] = useState(promo)

  useEffect(() => {
    document.title = 'Cart · Fleurora'
  }, [])

  return (
    <div className="w-full px-3 py-8 sm:px-5 lg:px-6">
      <h1 className="font-display text-5xl text-forest">Your cart</h1>
      {cart.length === 0 ? (
        <div className="mt-10 grid gap-6 bg-paper p-8 sm:grid-cols-[180px_1fr] sm:items-center">
          <img src="/flowers/rose-soft.jpg" alt="" className="h-44 w-full object-cover" />
          <div>
            <p className="font-display text-3xl text-forest">The cart is empty.</p>
            <p className="mt-2 text-ink/70">Start with a bouquet, or a single stem if the week calls for something smaller.</p>
            <Link to="/shop" className="btn btn-dark mt-6">
              Shop flowers
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid w-full gap-6 lg:grid-cols-[1.5fr_0.8fr]">
          <div className="flex flex-col gap-3">
            {cart.map((item) => (
              <article key={item.id} className="grid grid-cols-[104px_1fr] gap-4 bg-paper p-3 sm:grid-cols-[140px_1fr] sm:p-4">
                <Link to={`/product/${item.product.id}`} className="aspect-[4/5] overflow-hidden bg-sand">
                  <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-moss">{item.product.category}</p>
                      <Link to={`/product/${item.product.id}`} className="font-display text-2xl text-forest">
                        {item.product.name}
                      </Link>
                    </div>
                    <p className="text-lg">{money(item.line)}</p>
                  </div>
                  <p className="mt-1 text-sm text-ink/55">{money(item.unit)} each</p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                    <QtyStepper qty={item.qty} onChange={(next) => updateQty(item.id, next)} />
                    <button type="button" className="text-sm text-rose" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <aside className="h-fit bg-forest p-6 text-cream">
            <h2 className="font-display text-3xl">Summary</h2>
            <form
              className="mt-5 flex"
              onSubmit={(event) => {
                event.preventDefault()
                applyPromo(code)
              }}
            >
              <input
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Promo code"
                className="field border-white/20 bg-white/10 text-cream placeholder:text-cream/50"
              />
              <button type="submit" className="btn btn-rose shrink-0">
                Apply
              </button>
            </form>
            <p className="mt-2 text-xs text-cream/60">Try BLOOM10 for 10% off.</p>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{money(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Discount</dt>
                <dd>{discount ? `−${money(discount)}` : money(0)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Delivery</dt>
                <dd>{shipping === 0 ? 'Free' : money(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-white/15 pt-3 font-display text-2xl">
                <dt>Total</dt>
                <dd>{money(total)}</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-cream/65">
              {subtotal - discount >= 75
                ? 'You have complimentary delivery.'
                : `Add ${money(75 - (subtotal - discount))} more for free delivery.`}
            </p>
            <Link to="/checkout" className="btn btn-rose mt-6 w-full">
              Checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  )
}
