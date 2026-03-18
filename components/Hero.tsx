'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

const stats = [
  { num: '100', suffix: '%', label: 'Custom Built' },
  { num: '4',   suffix: '+', label: 'Core Services' },
  { num: '24',  suffix: '/7', label: 'Support Ready' },
]

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    // Staggered fade-up for children
    const children = el.querySelectorAll('.hero-anim')
    children.forEach((child, i) => {
      const el = child as HTMLElement
      el.style.animation = `fadeUp 0.7s ${i * 0.12}s ease both`
    })
  }, [])

  return (
    <section
      id="home"
      className="hero-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 5% 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Three.js canvas */}
      <HeroCanvas />

      {/* Animated grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(56,189,248,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Gradient orbs */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'rgba(37,99,235,.15)',
          filter: 'blur(80px)',
          top: '-100px',
          right: '-150px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(14,165,233,.10)',
          filter: 'blur(80px)',
          bottom: '-100px',
          left: '10%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}
      >
        {/* Badge */}
        <div
          className="hero-anim"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(37,99,235,.15)',
            border: '1px solid rgba(37,99,235,.3)',
            color: '#38bdf8',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '6px 14px',
            borderRadius: '20px',
            marginBottom: '24px',
          }}
        >
          <span
            style={{
              fontSize: '8px',
              color: '#4ade80',
              animation: 'pulse 2s infinite',
            }}
          >
            ●
          </span>
          Zambia&apos;s Technology Partner
        </div>

        {/* Heading */}
        <h1
          className="hero-anim font-syne"
          style={{
            fontSize: 'clamp(40px, 6vw, 76px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#f8fafc',
          }}
        >
          We Build{' '}
          <span className="gradient-text">Smart Tech</span>
          <br />
          for Smart Businesses
        </h1>

        {/* Sub */}
        <p
          className="hero-anim hero-sub-text"
          style={{
            marginTop: '20px',
            fontSize: '18px',
            lineHeight: 1.7,
            color: '#94a3b8',
            maxWidth: '560px',
          }}
        >
          From bespoke software to WhatsApp automation and Point of Sale —
          Silver House Technology powers your business growth with
          precision-built digital solutions.
        </p>

        {/* Buttons */}
        <div
          className="hero-anim hero-buttons"
          style={{
            marginTop: '36px',
            display: 'flex',
            gap: '14px',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#services"
            style={{
              padding: '14px 32px',
              borderRadius: '8px',
              background: '#2563eb',
              color: '#fff',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              boxShadow: '0 4px 18px rgba(37,99,235,.35)',
              transition: 'background 0.2s, transform 0.2s',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#1d4ed8'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#2563eb'
              el.style.transform = 'translateY(0)'
            }}
          >
            Explore Services
          </a>
          <a
            href="#contact"
            style={{
              padding: '14px 32px',
              borderRadius: '8px',
              border: '1px solid rgba(56,189,248,.25)',
              color: '#e2e8f0',
              fontWeight: 500,
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = '#38bdf8'
              el.style.color = '#38bdf8'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(56,189,248,.25)'
              el.style.color = '#e2e8f0'
            }}
          >
            Talk to Us →
          </a>
        </div>

        {/* Stats */}
        <div
          className="hero-anim hero-stats-row"
          style={{
            marginTop: '56px',
            display: 'flex',
            gap: '40px',
            flexWrap: 'wrap',
          }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div
                className="font-syne hero-stat-num"
                style={{
                  fontSize: '32px',
                  fontWeight: 800,
                  color: '#f8fafc',
                  lineHeight: 1,
                }}
              >
                {s.num}
                <span style={{ color: '#38bdf8' }}>{s.suffix}</span>
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: '#94a3b8',
                  marginTop: '4px',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          animation: 'float 2s ease-in-out infinite',
        }}
      >
        <div
          style={{
            width: '1px',
            height: '40px',
            background:
              'linear-gradient(180deg, transparent, rgba(56,189,248,0.6))',
          }}
        />
        <span
          style={{
            fontSize: '10px',
            color: '#94a3b8',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          scroll
        </span>
      </div>
    </section>
  )
}
