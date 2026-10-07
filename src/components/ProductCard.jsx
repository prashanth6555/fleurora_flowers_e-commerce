import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { money, salePrice } from '../data/products'
import { useShop } from '../context/ShopContext'
import { HeartIcon, Stars } from './Ui'

export default function ProductCard({ product, index = 0 }) {
  const { addToCart, toggleWishlist, wishlist } = useShop()
  const [added, setAdded] = useState(false)
  const loved = wishlist.includes(product.id)
  const price = salePrice(product)

  const handleAdd = () => {
    addToCart(product.id)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 900)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3) }}
      className="group flex h-full flex-col bg-paper"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Link to={`/product/${product.id}`} className="block h-full">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          />
        </Link>
        {product.offer > 0 && (
          <span className="absolute left-3 top-3 bg-rose px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-white">
            {product.offer}% off
          </span>
        )}
        {product.bestseller && (
          <span className="absolute bottom-3 left-3 bg-forest/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-cream">
            Bestseller
          </span>
        )}
        <button
          type="button"
          aria-label={loved ? 'Remove from wishlist' : 'Save to wishlist'}
          onClick={() => toggleWishlist(product.id)}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center bg-paper/90 backdrop-blur transition hover:scale-105"
        >
          <HeartIcon filled={loved} />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-3 py-4 sm:px-4">
        <p className="text-[11px] uppercase tracking-[0.22em] text-moss">{product.category}</p>
        <Link
          to={`/product/${product.id}`}
          className="font-display text-xl leading-tight text-ink transition hover:text-rose sm:text-2xl"
        >
          {product.name}
        </Link>
        <Stars rating={product.rating} reviews={product.reviews} />
        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div>
            <p className="text-lg font-medium">{money(price)}</p>
            {product.offer > 0 && (
              <p className="text-sm text-ink/40 line-through">{money(product.price)}</p>
            )}
          </div>
          <button type="button" onClick={handleAdd} className="btn btn-dark px-3 py-2 sm:px-4">
            {added ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </motion.article>
  )
}
