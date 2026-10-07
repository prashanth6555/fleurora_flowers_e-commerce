import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

export function Login() {
  const { login, user } = useShop()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = 'Sign in · Fleurora'
    if (user) navigate('/shop')
  }, [user, navigate])

  const submit = (event) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    const result = login(data)
    if (!result.ok) setError(result.message)
    else navigate('/shop')
  }

  return (
    <AuthShell
      image="/flowers/bouquet-shop.jpg"
      title="Welcome back"
      copy="Sign in to check out faster and keep your saved stems."
    >
      <form onSubmit={submit} className="mt-8 flex flex-col gap-3">
        <input className="field" name="email" type="email" required placeholder="Email" />
        <input className="field" name="password" type="password" required minLength={6} placeholder="Password" />
        {error && <p className="text-sm text-rose">{error}</p>}
        <button type="submit" className="btn btn-dark mt-2">
          Sign in
        </button>
      </form>
      <p className="mt-6 text-sm text-ink/70">
        New here?{' '}
        <Link to="/signup" className="text-rose">
          Create an account
        </Link>
      </p>
    </AuthShell>
  )
}

export function Signup() {
  const { signup, user } = useShop()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = 'Create account · Fleurora'
    if (user) navigate('/shop')
  }, [user, navigate])

  const submit = (event) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    if (data.password !== data.confirm) {
      setError('Passwords do not match.')
      return
    }
    const result = signup(data)
    if (!result.ok) setError(result.message)
    else navigate('/shop')
  }

  return (
    <AuthShell
      image="/flowers/blossom.jpg"
      title="Join Fleurora"
      copy="Save favourites and return to the arrangements you almost ordered."
    >
      <form onSubmit={submit} className="mt-8 flex flex-col gap-3">
        <input className="field" name="name" required placeholder="Full name" />
        <input className="field" name="email" type="email" required placeholder="Email" />
        <input className="field" name="password" type="password" required minLength={6} placeholder="Password" />
        <input className="field" name="confirm" type="password" required minLength={6} placeholder="Confirm password" />
        {error && <p className="text-sm text-rose">{error}</p>}
        <button type="submit" className="btn btn-dark mt-2">
          Create account
        </button>
      </form>
      <p className="mt-6 text-sm text-ink/70">
        Already have an account?{' '}
        <Link to="/login" className="text-rose">
          Sign in
        </Link>
      </p>
    </AuthShell>
  )
}

function AuthShell({ image, title, copy, children }) {
  return (
    <div className="grid min-h-[calc(100svh-7.2rem)] w-full lg:grid-cols-2">
      <div className="relative hidden min-h-full lg:block">
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="flex items-center px-5 py-12 sm:px-12">
        <div className="w-full max-w-md">
          <h1 className="font-display text-5xl text-forest">{title}</h1>
          <p className="mt-3 text-ink/70">{copy}</p>
          {children}
        </div>
      </div>
    </div>
  )
}
