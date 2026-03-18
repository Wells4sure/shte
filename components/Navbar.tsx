'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#why', label: 'About' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const close = () => setOpen(false)

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5%',
        height: '72px',
        background: scrolled
          ? 'rgba(10,22,40,0.97)'
          : 'rgba(10,22,40,0.82)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(56,189,248,0.13)',
        transition: 'background 0.3s',
      }}
    >
      {/* Logo */}
      <Link href="#home" style={{ textDecoration: 'none' }}>
        <Image
          src="/img/logos/white.png"
          alt="Silver House Technology"
          width={160}
          height={44}
          className="nav-logo-img"
          style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
          priority
        />
      </Link>

      {/* Desktop links */}
      <ul
        style={{
          display: 'flex',
          gap: '36px',
          listStyle: 'none',
          alignItems: 'center',
        }}
        className="nav-desktop"
      >
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              style={{
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
                color: '#cbd5e1',
                letterSpacing: '0.02em',
                transition: 'color 0.25s',
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = '#38bdf8')
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = '#cbd5e1')
              }
            >
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            style={{
              background: '#2563eb',
              color: '#fff',
              padding: '9px 22px',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '13px',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(37,99,235,.35)',
              transition: 'background 0.2s, transform 0.2s',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#1d4ed8'
              el.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#2563eb'
              el.style.transform = 'translateY(0)'
            }}
          >
            Get a Quote
          </a>
        </li>
      </ul>

      {/* Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="nav-hamburger"
        style={{
          display: 'none',
          flexDirection: 'column',
          gap: '5px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: '24px',
              height: '2px',
              background: '#e2e8f0',
              borderRadius: '2px',
              transition: '0.3s',
              transform:
                open && i === 0
                  ? 'rotate(45deg) translate(5px, 5px)'
                  : open && i === 2
                  ? 'rotate(-45deg) translate(5px,-5px)'
                  : open && i === 1
                  ? 'opacity(0) scale(0)'
                  : 'none',
              opacity: open && i === 1 ? 0 : 1,
            }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            position: 'fixed',
            top: '72px',
            left: 0,
            right: 0,
            background: 'rgba(10,22,40,0.99)',
            backdropFilter: 'blur(20px)',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '28px 24px 32px',
            gap: '22px',
            borderBottom: '1px solid rgba(56,189,248,0.13)',
            display: 'flex',
            zIndex: 99,
          }}
          className="nav-mobile"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              style={{
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 500,
                color: '#cbd5e1',
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={close}
            style={{
              background: '#2563eb',
              color: '#fff',
              padding: '10px 28px',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
            }}
          >
            Get a Quote
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
