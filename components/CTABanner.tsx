'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
      },
      { threshold: 0.15 },
    )
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ padding: '0 5% 80px' }} className="cta-wrap">
      <div
        className="reveal cta-box"
        style={{
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(135deg,#162d5a 0%,#1a4abf 55%,#0ea5e9 100%)',
          padding: '70px 60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '40px',
          flexWrap: 'wrap',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            right: '-80px',
            top: '-80px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,.05)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '40px',
            bottom: '-120px',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,.04)',
            pointerEvents: 'none',
          }}
        />

        {/* Image background accent */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            borderRadius: '20px',
          }}
        >
          <Image
            src="/img/happy-client.jpg"
            alt="Happy client"
            fill
            style={{ objectFit: 'cover', opacity: 0.08 }}
            sizes="100vw"
          />
        </div>

        {/* Text */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2
            className="font-syne"
            style={{
              fontSize: 'clamp(22px,3vw,38px)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.2,
            }}
          >
            Ready to transform your business<br />with technology?
          </h2>
          <p
            style={{
              marginTop: '12px',
              fontSize: '16px',
              color: 'rgba(255,255,255,.78)',
              maxWidth: '460px',
              lineHeight: 1.6,
            }}
          >
            Let&apos;s talk about what Silver House Technology can build for you
            — no obligation, just a conversation.
          </p>
        </div>

        {/* CTA */}
        <a
          href="#contact"
          style={{
            flexShrink: 0,
            background: '#fff',
            color: '#2563eb',
            fontWeight: 700,
            fontSize: '15px',
            padding: '15px 34px',
            borderRadius: '8px',
            textDecoration: 'none',
            boxShadow: '0 6px 25px rgba(0,0,0,.2)',
            position: 'relative',
            zIndex: 1,
            transition: 'transform 0.2s, box-shadow 0.2s',
            display: 'inline-block',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.transform = 'translateY(-2px)'
            el.style.boxShadow = '0 10px 35px rgba(0,0,0,.3)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.transform = 'translateY(0)'
            el.style.boxShadow = '0 6px 25px rgba(0,0,0,.2)'
          }}
        >
          Get a Free Quote →
        </a>
      </div>
    </div>
  )
}
