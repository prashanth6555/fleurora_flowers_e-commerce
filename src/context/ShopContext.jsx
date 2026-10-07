import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getProduct, salePrice } from '../data/products'

const ShopContext = createContext(null)
const CART_KEY = 'fleurora-cart'
const WISH_KEY = 'fleurora-wish'
const USER_KEY = 'fleurora-user'
const USERS_KEY = 'fleurora-users'
const PROMO_KEY = 'fleurora-promo'

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => readJson(CART_KEY, []))
  const [wishlist, setWishlist] = useState(() => readJson(WISH_KEY, []))
  const [user, setUser] = useState(() => readJson(USER_KEY, null))
  const [promo, setPromo] = useState(() => sessionStorage.getItem(PROMO_KEY) || '')
  const [toast, setToast] = useState(null)

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }, [user])

  useEffect(() => {
    sessionStorage.setItem(PROMO_KEY, promo)
  }, [promo])

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(null), 2400)
    return () => clearTimeout(timer)
  }, [toast])

  const notify = (message) => setToast(message)

  const addToCart = (id, qty = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === id)
      if (existing) {
        return current.map((item) =>
          item.id === id ? { ...item, qty: Math.min(item.qty + qty, 12) } : item,
        )
      }
      return [...current, { id, qty: Math.min(qty, 12) }]
    })
    const product = getProduct(id)
    notify(`${product?.name || 'Bouquet'} added to cart`)
  }

  const updateQty = (id, qty) => {
    setCart((current) => {
      if (qty <= 0) return current.filter((item) => item.id !== id)
      return current.map((item) => (item.id === id ? { ...item, qty: Math.min(qty, 12) } : item))
    })
  }

  const removeFromCart = (id) => {
    setCart((current) => current.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
    setPromo('')
  }

  const toggleWishlist = (id) => {
    setWishlist((current) => {
      if (current.includes(id)) {
        notify('Removed from wishlist')
        return current.filter((item) => item !== id)
      }
      notify('Saved to wishlist')
      return [...current, id]
    })
  }

  const applyPromo = (code) => {
    const next = code.trim().toUpperCase()
    if (next === 'BLOOM10') {
      setPromo(next)
      notify('Code BLOOM10 applied — 10% off')
      return true
    }
    setPromo('')
    notify('That code is not active')
    return false
  }

  const signup = ({ name, email, password }) => {
    const users = readJson(USERS_KEY, [])
    if (users.some((entry) => entry.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, message: 'An account with that email already exists.' }
    }
    const nextUser = { name, email, password }
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, nextUser]))
    setUser({ name, email })
    notify(`Welcome, ${name.split(' ')[0]}`)
    return { ok: true }
  }

  const login = ({ email, password }) => {
    const users = readJson(USERS_KEY, [])
    const match = users.find(
      (entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.password === password,
    )
    if (!match) return { ok: false, message: 'Email or password does not match.' }
    setUser({ name: match.name, email: match.email })
    notify(`Welcome back, ${match.name.split(' ')[0]}`)
    return { ok: true }
  }

  const logout = () => {
    setUser(null)
    notify('Signed out')
  }

  const detailedCart = useMemo(
    () =>
      cart
        .map((item) => {
          const product = getProduct(item.id)
          if (!product) return null
          const unit = salePrice(product)
          return { ...item, product, unit, line: unit * item.qty }
        })
        .filter(Boolean),
    [cart],
  )

  const subtotal = detailedCart.reduce((sum, item) => sum + item.line, 0)
  const discount = promo === 'BLOOM10' ? Math.round(subtotal * 0.1) : 0
  const shipping = subtotal - discount >= 75 || subtotal === 0 ? 0 : 8
  const total = Math.max(subtotal - discount + shipping, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  const value = {
    cart: detailedCart,
    cartCount,
    wishlist,
    user,
    promo,
    toast,
    subtotal,
    discount,
    shipping,
    total,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
    applyPromo,
    signup,
    login,
    logout,
    notify,
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const context = useContext(ShopContext)
  if (!context) throw new Error('useShop must be used within ShopProvider')
  return context
}
