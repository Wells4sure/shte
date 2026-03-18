'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const services = [
  {
    icon: '💻',
    title: 'Bespoke Software Development',
    desc: 'Custom-built web and desktop applications designed from the ground up to match your specific workflows, processes, and business goals.',
    image: '/img/code.jpg',
    tag: 'Software',
  },
  {
    icon: '💬',
    title: 'WhatsApp Business Automation',
    desc: 'Automate customer interactions, order confirmations, and notifications using WhatsApp Business API — reach customers where they already are.',
    image: '/img/messaging-man.jpg',
    tag: 'Automation',
  },
  {
    icon: '📱',
    title: 'Bulk SMS Solutions',
    desc: 'Reliable, high-volume SMS broadcasting for marketing campaigns, alerts, reminders, and customer engagement at scale.',
    image: '/img/sms-man.jpg',
    tag: 'SMS',
  },
  {
    icon: '🖥️',
    title: 'Point of Sale Systems',
    desc: 'Modern, intuitive POS solutions for retail and hospitality — manage sales, inventory, and reporting all from one powerful platform.',
    image: '/img/pos.jpg',
    tag: 'POS',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 },
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        padding: '100px 5%',
        background: 'var(--navy-mid)',
        position: 'relative',
      }}
    >
      {/* Section header */}
      <div
        className="reveal"
        style={{ textAlign: 'center', marginBottom: '60px' }}
      >
        <div
          style={{
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#38bdf8',
            marginBottom: '12px',
          }}
        >
          What We Do
        </div>
        <h2
          className="font-syne"
          style={{
            fontSize: 'clamp(28px,3.5vw,48px)',
            fontWeight: 800,
            color: '#f8fafc',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          Our Core Services
        </h2>
        <p
          style={{
            marginTop: '14px',
            fontSize: '17px',
            color: '#94a3b8',
            maxWidth: '560px',
            lineHeight: 1.7,
            margin: '14px auto 0',
          }}
        >
          We deliver technology solutions tailored to your exact business needs
          — no cookie-cutter products, just powerful results.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}
      >
        {services.map((s, i) => (
          <div
            key={s.title}
            className="reveal"
            style={{
              transitionDelay: `${i * 0.1}s`,
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              overflow: 'hidden',
              transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = 'translateY(-6px)'
              el.style.borderColor = 'rgba(56,189,248,.3)'
              el.style.boxShadow = '0 20px 60px rgba(0,0,0,.3)'
              const line = el.querySelector('.card-line') as HTMLElement
              if (line) line.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = 'translateY(0)'
              el.style.borderColor = 'var(--border)'
              el.style.boxShadow = 'none'
              const line = el.querySelector('.card-line') as HTMLElement
              if (line) line.style.opacity = '0'
            }}
          >
            {/* Top accent line */}
            <div
              className="card-line"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg,#2563eb,#38bdf8)',
                opacity: 0,
                transition: 'opacity 0.3s',
              }}
            />

            {/* Image */}
            {s.image && (
              <div
                className="service-card-image"
                style={{
                  width: '100%',
                  height: '180px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width:768px) 100vw, 50vw"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg,transparent 30%,rgba(10,22,40,0.8) 100%)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(37,99,235,.7)',
                    color: '#e2e8f0',
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '20px',
                    letterSpacing: '0.05em',
                  }}
                >
                  {s.tag}
                </span>
              </div>
            )}

            {/* Card body */}
            <div style={{ padding: s.image ? '24px 28px 28px' : '32px 28px' }}>
              {!s.image && (
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    background: 'rgba(37,99,235,.15)',
                    border: '1px solid rgba(37,99,235,.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    marginBottom: '20px',
                  }}
                >
                  {s.icon}
                </div>
              )}
              <h3
                className="font-syne"
                style={{
                  fontSize: '19px',
                  fontWeight: 700,
                  color: '#f8fafc',
                  marginBottom: '10px',
                }}
              >
                {s.title}
              </h3>
              <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: 1.7 }}>
                {s.desc}
              </p>
              <div
                style={{
                  marginTop: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#38bdf8',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Learn more →
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
