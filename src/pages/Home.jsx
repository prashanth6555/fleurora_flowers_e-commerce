import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { categories, products } from '../data/products'
import ProductCard from '../components/ProductCard'

const notes = [
  { title: 'Cut this morning', copy: 'Stems leave the atelier the day they are arranged.' },
  { title: 'Wrapped to travel', copy: 'Water packs and sturdy boxes so nothing arrives tired.' },
  { title: 'A real person ties it', copy: 'No assembly line. Each bouquet is composed by hand.' },
]

const quotes = [
  {
    quote: 'It looked like someone had walked through a garden and come back with the best of it.',
    name: 'Amelia R.',
  },
  {
    quote: 'The tulips opened over three days. I kept moving the jar to follow the light.',
    name: 'Jonah P.',
  },
  {
    quote: 'I ordered for a dinner and the table felt finished before anyone sat down.',
    name: 'Priya S.',
  },
]

const faqs = [
  {
    q: 'How fresh are the flowers?',
    a: 'Bouquets are tied the morning they leave. Seasonal stems are cut when they are ready, not stored for weeks.',
  },
  {
    q: 'Do you deliver the same day?',
    a: 'Orders placed before 1 p.m. go out the same afternoon inside the city. Later orders leave the next morning.',
  },
  {
    q: 'Can I add a note?',
    a: 'Yes. The checkout form has a card message. We write it by hand on thick paper.',
  },
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0)
  const featured = products.filter((product) => product.featured).slice(0, 4)
  const featuredIds = new Set(featured.map((product) => product.id))
  const loved = products.filter((product) => product.bestseller && !featuredIds.has(product.id)).slice(0, 4)

  useEffect(() => {
    document.title = 'Fleurora · Flowers, composed with care'
  }, [])

  return (
    <div className="w-full">
      <section className="grid min-h-[calc(100svh-7.2rem)] w-full lg:grid-cols-2">
        <div className="relative flex flex-col justify-center bg-cream px-5 py-14 sm:px-8 lg:px-12 xl:px-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.32em] text-rose"
          >
            The city atelier
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-4 max-w-xl font-display text-5xl leading-[0.95] text-forest sm:text-6xl xl:text-7xl"
          >
            Flowers, composed like a letter.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-5 max-w-md text-base leading-relaxed text-ink/75 sm:text-lg"
          >
            Roses, tulips, peonies, and whatever the week is growing. Hand-tied, wrapped, and sent while the petals are still deciding to open.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link to="/shop" className="btn btn-dark">
              Shop the collection
            </Link>
            <a href="#categories" className="btn btn-line">
              Browse categories
            </a>
          </motion.div>
          <div className="mt-10 grid w-full grid-cols-3 gap-3 border-t border-forest/10 pt-6">
            {[
              ['4.9', 'Average rating'],
              ['18', 'Designs in season'],
              ['$75', 'Free delivery from'],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-display text-2xl text-forest sm:text-3xl">{value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ink/50">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[52vh] overflow-hidden lg:min-h-full">
          {Array.from({ length: 6 }).map((_, index) => (
            <span
              key={index}
              className="petal"
              style={{
                left: `${10 + index * 14}%`,
                animationDuration: `${12 + index}s`,
                animationDelay: `${index * 1.1}s`,
                background: index % 2 ? '#fff' : '#f3d4d6',
              }}
            />
          ))}
          <img
            src="/flowers/bouquet-pink.jpg"
            alt="Peach and ivory garden bouquet"
            className="kenburns absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/70 to-transparent p-6 text-cream">
            <p className="text-xs uppercase tracking-[0.24em]">Now tying</p>
            <p className="mt-1 font-display text-3xl">Garden Romance</p>
          </div>
        </div>
      </section>

      <section className="grid w-full border-y border-forest/10 bg-paper sm:grid-cols-3">
        {notes.map((note) => (
          <div key={note.title} className="border-forest/10 px-5 py-6 sm:px-6 sm:[&:not(:last-child)]:border-r">
            <p className="font-display text-2xl text-forest">{note.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{note.copy}</p>
          </div>
        ))}
      </section>

      <section id="categories" className="w-full scroll-mt-28">
        <div className="flex items-end justify-between px-4 py-8 sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-rose">Categories</p>
            <h2 className="mt-2 font-display text-4xl text-forest sm:text-5xl">Choose a mood</h2>
          </div>
          <Link to="/shop" className="hidden text-sm uppercase tracking-[0.16em] text-forest sm:inline">
            View all
          </Link>
        </div>
        <div className="grid w-full grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={`/shop?category=${encodeURIComponent(category.name)}`}
              className="group relative min-h-64 overflow-hidden sm:min-h-80"
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 p-4 text-cream sm:p-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-cream/80">0{index + 1}</p>
                <p className="font-display text-3xl sm:text-4xl">{category.name}</p>
                <p className="mt-1 text-sm text-cream/80">{category.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="w-full py-14">
        <div className="mb-6 flex items-end justify-between px-4 sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-rose">This week</p>
            <h2 className="mt-2 font-display text-4xl text-forest sm:text-5xl">Featured stems</h2>
          </div>
          <Link to="/shop" className="text-sm uppercase tracking-[0.16em]">
            Shop
          </Link>
        </div>
        <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      <section className="relative min-h-[70vh] w-full overflow-hidden">
        <img src="/flowers/meadow.jpg" alt="Flower shop arranged on the pavement" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-forest/55" />
        <div className="relative flex min-h-[70vh] w-full items-end px-5 py-12 sm:px-10 lg:px-16">
          <div className="max-w-xl text-cream">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">The atelier</p>
            <h2 className="mt-3 font-display text-4xl leading-tight sm:text-6xl">
              A shop that still smells like cut stems.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream/85">
              Buckets on the pavement, chalk prices, and arrangements that change with the market. Order online and it is the same hands that wrap the paper.
            </p>
            <Link to="/shop?category=Seasonal" className="btn btn-rose mt-6">
              Shop seasonal
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full bg-sand py-14">
        <div className="mb-6 px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.28em] text-rose">Most loved</p>
          <h2 className="mt-2 font-display text-4xl text-forest sm:text-5xl">Bestsellers</h2>
        </div>
        <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {loved.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      <section className="grid w-full lg:grid-cols-3">
        {quotes.map((item) => (
          <blockquote key={item.name} className="border-forest/10 bg-paper px-6 py-10 lg:border-r lg:last:border-r-0">
            <p className="font-display text-2xl leading-snug text-forest">“{item.quote}”</p>
            <footer className="mt-6 text-xs uppercase tracking-[0.2em] text-ink/50">{item.name}</footer>
          </blockquote>
        ))}
      </section>

      <section className="grid w-full grid-cols-2 md:grid-cols-4">
        {['/flowers/atelier.jpg', '/flowers/lavender.jpg', '/flowers/white.jpg', '/flowers/field.jpg'].map((src) => (
          <div key={src} className="aspect-square overflow-hidden">
            <img src={src} alt="" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
          </div>
        ))}
      </section>

      <section className="grid w-full lg:grid-cols-2">
        <div className="bg-blush px-5 py-12 sm:px-10">
          <p className="text-xs uppercase tracking-[0.28em] text-rose">Questions</p>
          <h2 className="mt-2 font-display text-4xl text-forest">Before you order</h2>
          <div className="mt-6">
            {faqs.map((item, index) => (
              <button
                key={item.q}
                type="button"
                onClick={() => setOpenFaq(index)}
                className="w-full border-t border-forest/15 py-4 text-left"
              >
                <span className="flex items-center justify-between gap-4 font-medium">
                  {item.q}
                  <span className="text-rose">{openFaq === index ? '−' : '+'}</span>
                </span>
                <span
                  className={`block overflow-hidden text-sm leading-relaxed text-ink/70 transition-all ${
                    openFaq === index ? 'mt-2 max-h-32 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {item.a}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="relative min-h-80">
          <img src="/flowers/bouquet-shop.jpg" alt="Pastel bouquet in a ribboned vase" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </section>
    </div>
  )
}
