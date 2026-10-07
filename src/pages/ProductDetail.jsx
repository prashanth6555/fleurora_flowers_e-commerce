import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProduct, money, relatedProducts, salePrice } from '../data/products'
import { useShop } from '../context/ShopContext'
import ProductCard from '../components/ProductCard'
import { HeartIcon, QtyStepper, Stars } from '../components/Ui'

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProduct(id)
  const { addToCart, toggleWishlist, wishlist } = useShop()
  const [qty, setQty] = useState(1)
  const [photo, setPhoto] = useState(0)

  useEffect(() => {
    setQty(1)
    setPhoto(0)
    document.title = product ? `${product.name} · Fleurora` : 'Flower · Fleurora'
    window.scrollTo(0, 0)
  }, [id, product])

  if (!product) {
    return (
      <div className="px-4 py-24 text-center">
        <p className="font-display text-4xl text-forest">That stem has left the shop.</p>
        <Link to="/shop" className="btn btn-dark mt-6">
          Back to the shop
        </Link>
      </div>
    )
  }

  const price = salePrice(product)
  const loved = wishlist.includes(product.id)
  const related = relatedProducts(product)

  return (
    <div className="w-full">
      <div className="grid w-full lg:grid-cols-2">
        <div className="bg-sand">
          <div className="aspect-[4/5] w-full overflow-hidden sm:aspect-[5/4] lg:aspect-auto lg:h-[78vh]">
            <img
              src={product.gallery[photo]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3">
            {product.gallery.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setPhoto(index)}
                className={`aspect-square overflow-hidden border-2 ${photo === index ? 'border-forest' : 'border-transparent'}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center px-5 py-10 sm:px-10 lg:px-14">
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="text-xs uppercase tracking-[0.24em] text-rose">
            {product.category}
          </Link>
          <h1 className="mt-3 font-display text-5xl leading-none text-forest sm:text-6xl">{product.name}</h1>
          <div className="mt-4">
            <Stars rating={product.rating} reviews={`${product.reviews} reviews`} />
          </div>
          <div className="mt-6 flex items-end gap-3">
            <p className="font-display text-4xl">{money(price)}</p>
            {product.offer > 0 && (
              <>
                <p className="text-lg text-ink/40 line-through">{money(product.price)}</p>
                <span className="bg-rose px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-white">
                  Save {product.offer}%
                </span>
              </>
            )}
          </div>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/75">{product.description}</p>
          <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <div className="bg-paper p-4">
              <dt className="text-[11px] uppercase tracking-[0.18em] text-moss">Stems</dt>
              <dd className="mt-1">{product.stems}</dd>
            </div>
            <div className="bg-paper p-4">
              <dt className="text-[11px] uppercase tracking-[0.18em] text-moss">Occasion</dt>
              <dd className="mt-1">{product.occasion}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <QtyStepper qty={qty} onChange={(next) => setQty(Math.max(1, Math.min(12, next)))} />
            <button type="button" className="btn btn-dark" onClick={() => addToCart(product.id, qty)}>
              Add to cart · {money(price * qty)}
            </button>
            <button
              type="button"
              className="btn btn-line"
              onClick={() => toggleWishlist(product.id)}
            >
              <HeartIcon filled={loved} />
              {loved ? 'Saved' : 'Wishlist'}
            </button>
          </div>
          <p className="mt-6 text-sm text-ink/60">
            Free delivery over $75. Same-day in the city when you order before 1 p.m.
          </p>
        </div>
      </div>
      <section className="w-full py-12">
        <h2 className="mb-5 px-4 font-display text-4xl text-forest sm:px-6">You may also like</h2>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {related.map((item, index) => (
            <ProductCard key={item.id} product={item} index={index} />
          ))}
        </div>
      </section>
    </div>
  )
}
