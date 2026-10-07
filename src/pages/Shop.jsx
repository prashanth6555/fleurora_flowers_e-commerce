import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { categories, products, salePrice } from '../data/products'
import ProductCard from '../components/ProductCard'

const sorts = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'rating', label: 'Top rated' },
  { id: 'name', label: 'Name' },
]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') || ''
  const category = params.get('category') || 'All'
  const sort = params.get('sort') || 'featured'

  useEffect(() => {
    document.title = 'Shop · Fleurora'
  }, [])

  const update = (key, value) => {
    const next = new URLSearchParams(params)
    if (!value || value === 'All' || value === 'featured') next.delete(key)
    else next.set(key, value)
    setParams(next)
  }

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase()
    let list = products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category
      const haystack = `${product.name} ${product.category} ${product.stems} ${product.occasion} ${product.description}`.toLowerCase()
      return matchesCategory && (!term || haystack.includes(term))
    })
    list = [...list].sort((a, b) => {
      if (sort === 'price-asc') return salePrice(a) - salePrice(b)
      if (sort === 'price-desc') return salePrice(b) - salePrice(a)
      if (sort === 'rating') return b.rating - a.rating
      if (sort === 'name') return a.name.localeCompare(b.name)
      return Number(b.featured) - Number(a.featured) || b.rating - a.rating
    })
    return list
  }, [query, category, sort])

  return (
    <div className="w-full">
      <div className="w-full bg-forest px-4 py-10 text-cream sm:px-6">
        <p className="text-xs uppercase tracking-[0.28em] text-gold">The collection</p>
        <h1 className="mt-2 font-display text-5xl">Shop flowers</h1>
        <p className="mt-3 max-w-xl text-cream/75">
          {visible.length} arrangement{visible.length === 1 ? '' : 's'}
          {query ? ` for “${query}”` : ''}
          {category !== 'All' ? ` in ${category}` : ''}.
        </p>
      </div>
      <div className="flex w-full flex-col gap-3 border-b border-forest/10 bg-cream px-3 py-4 sm:px-4 lg:flex-row lg:items-center lg:px-5">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {['All', ...categories.map((item) => item.name)].map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => update('category', name)}
              className={`shrink-0 px-4 py-2 text-xs uppercase tracking-[0.16em] transition ${
                category === name ? 'bg-forest text-cream' : 'bg-paper text-forest hover:bg-sand'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="ml-auto flex w-full items-center gap-2 lg:w-auto">
          <label className="sr-only" htmlFor="sort">
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(event) => update('sort', event.target.value)}
            className="field w-full py-2.5 text-sm lg:w-56"
          >
            {sorts.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          {(query || category !== 'All' || sort !== 'featured') && (
            <button type="button" className="btn btn-line py-2.5" onClick={() => setParams({})}>
              Clear
            </button>
          )}
        </div>
      </div>
      {visible.length === 0 ? (
        <div className="px-4 py-24 text-center">
          <p className="font-display text-4xl text-forest">Nothing in bloom for that search.</p>
          <button type="button" className="btn btn-dark mt-6" onClick={() => setParams({})}>
            See everything
          </button>
        </div>
      ) : (
        <div className="grid w-full grid-cols-2 gap-2 py-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {visible.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}
