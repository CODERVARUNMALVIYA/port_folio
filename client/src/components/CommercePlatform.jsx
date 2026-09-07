import React, { useMemo, useState } from 'react'
import './commerce-platform.css'

const products = [
  { id: 1, name: 'Aster Desk Lamp', category: 'Workspace', price: 84, stock: 24, rating: 4.8, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700&q=80' },
  { id: 2, name: 'Everyday Carry Pack', category: 'Accessories', price: 128, stock: 8, rating: 4.9, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80' },
  { id: 3, name: 'Arc Ceramic Set', category: 'Home', price: 56, stock: 31, rating: 4.7, image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=700&q=80' },
  { id: 4, name: 'Studio Headphones', category: 'Tech', price: 219, stock: 12, rating: 4.9, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80' },
  { id: 5, name: 'Linen Weekender', category: 'Accessories', price: 146, stock: 5, rating: 4.6, image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=700&q=80' },
  { id: 6, name: 'Mori Lounge Chair', category: 'Home', price: 489, stock: 4, rating: 4.8, image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=700&q=80' }
]

const categories = ['All products', 'Workspace', 'Accessories', 'Home', 'Tech']
const money = (value) => `$${value.toFixed(2)}`

export default function CommercePlatform() {
  const [category, setCategory] = useState('All products')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === 'All products' || product.category === category
    return matchesCategory && product.name.toLowerCase().includes(query.toLowerCase())
  }), [category, query])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const addToCart = (product) => {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id)
      return found ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }]
    })
    setNotice(`${product.name} added to cart`)
    setTimeout(() => setNotice(''), 1800)
  }

  const updateQuantity = (id, change) => setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + change } : item).filter((item) => item.quantity > 0))

  return (
    <div className="commerce-app">
      <header className="commerce-header"><a href="/" className="commerce-logo"><span>V</span> VAREL</a><nav><a href="#catalog">Catalog</a><a href="#story">Our story</a><a href="#journal">Journal</a></nav><div className="commerce-tools"><button aria-label="Search" onClick={() => document.querySelector('.commerce-search input')?.focus()}>⌕</button><button className="cart-button" onClick={() => setCartOpen(true)} aria-label="Open shopping cart">Bag <b>{cartCount}</b></button></div></header>
      <main>
        <section className="commerce-hero"><div><p className="commerce-kicker">THE AUTUMN EDIT / 2026</p><h1>Objects with<br /><em>a point of view.</em></h1><p className="commerce-hero-copy">Considered goods for a more intentional everyday. Designed quietly, made to last.</p><a className="commerce-hero-link" href="#catalog">Explore the collection <span>↗</span></a></div><div className="hero-image"><img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=85" alt="Warm modern workspace" /><div className="hero-caption">01 / 04 <span>New work, better living</span></div></div></section>
        <section className="commerce-content" id="catalog"><div className="commerce-section-head"><div><p className="commerce-kicker">CURATED COLLECTION</p><h2>Made for the everyday</h2></div><div className="commerce-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the collection" /></div></div><div className="commerce-categories">{categories.map((item) => <button className={category === item ? 'active' : ''} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="product-grid">{filteredProducts.map((product) => <article className="product-card" key={product.id}><div className="product-image"><img src={product.image} alt={product.name} /><button className="heart-button" aria-label={`Save ${product.name}`}>♡</button><span className="stock-label">{product.stock < 10 ? 'Low stock' : 'In stock'}</span></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.category}</p></div><strong>{money(product.price)}</strong></div><div className="product-meta"><span>★ {product.rating}</span><button onClick={() => addToCart(product)}>Add to bag <span>＋</span></button></div></article>)}</div>{!filteredProducts.length && <div className="commerce-empty">No pieces found. Try a different search.</div>}</section>
        <section className="commerce-proof" id="story"><div><p className="commerce-kicker">A SMALLER, BETTER SYSTEM</p><h2>Good design earns<br /><em>its place.</em></h2></div><p>We work with independent makers and responsible materials to create useful objects that feel good to live with. No excess, no noise, just the things worth keeping.</p><a href="#catalog">Read our approach ↗</a></section>
      </main>
      <footer className="commerce-footer"><span>VAREL / 2026</span><span>Quietly considered goods</span><a href="/">Back to Varun's portfolio ↗</a></footer>
      {notice && <div className="commerce-toast">✓ {notice}</div>}
      {cartOpen && <div className="cart-overlay" onMouseDown={(event) => event.target === event.currentTarget && setCartOpen(false)}><aside className="cart-drawer"><div className="cart-heading"><div><p className="commerce-kicker">YOUR SELECTION</p><h2>Your bag <span>{cartCount}</span></h2></div><button onClick={() => setCartOpen(false)}>×</button></div>{cart.length ? <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div><h3>{item.name}</h3><p>{money(item.price)}</p><div className="quantity"><button onClick={() => updateQuantity(item.id, -1)}>−</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)}>＋</button></div></div></div>)}</div><div className="cart-total"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><button className="checkout-button" onClick={() => setNotice('Checkout is ready for your payment integration')}>Continue to checkout <span>↗</span></button></> : <div className="empty-cart"><span>○</span><p>Your bag is waiting.</p><button onClick={() => setCartOpen(false)}>Continue browsing</button></div>}</aside></div>}
    </div>
  )
}
