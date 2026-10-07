import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProduct } from '../data/products'
import { useShop } from '../context/ShopContext'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { wishlist } = useShop()
  const items = wishlist.map((id) => getProduct(id)).filter(Boolean)

  useEffect(() => {
    document.title = 'Wishlist · Fleurora'
  }, [])

  return (
    <div className="w-full px-3 py-8 sm:px-4 lg:px-5">
      <h1 className="font-display text-5xl text-forest">Wishlist</h1>
      <p className="mt-2 text-ink/65">{items.length} saved</p>
      {items.length === 0 ? (
        <div className="mt-8 bg-paper p-8">
          <p className="font-display text-3xl text-forest">Nothing saved yet.</p>
          <p className="mt-2 text-ink/70">Tap the heart on a bouquet to keep it here.</p>
          <Link to="/shop" className="btn btn-dark mt-6">
            Browse flowers
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 xl:grid-cols-4">
          {items.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}
