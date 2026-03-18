'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const features = [
  {
    icon: '🎯',
    title: 'Tailored to Your Business',
    desc: 'No two businesses are alike. We learn your operations and build solutions that fit like a glove.',
  },
  {
    icon: '⚡',
    title: 'Fast Deployment',
    desc: 'We move with urgency. From concept to launch, we keep timelines tight without cutting corners.',
  },
  {
    icon: '🔒',
    title: 'Secure & Reliable',
    desc: 'Built with security best practices from day one, so your data and your customers\' data stay safe.',
  },
  {
    icon: '🤝',
    title: 'Ongoing Support',
    desc: 'We stay with you after launch — updates, improvements, and support whenever you need it.',
  },
]

export default function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
      },
      { threshold: 0.1 },
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="why"
      ref={sectionRef}
      style={{ padding: '100px 5%', position: 'relative' }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(37,99,235,.06)',
          filter: 'blur(100px)',
          right: '-100px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="why-flex"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '80px',
          flexWrap: 'wrap',
          position: 'relative',
        }}
      >
        {/* Left – text + image */}
        <div
          className="reveal"
          style={{ flex: '1', minWidth: '280px', maxWidth: '480px' }}
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
            Why Choose Us
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
            Technology that Works<br />For You
          </h2>
          <p
            style={{
              marginTop: '14px',
              fontSize: '17px',
              color: '#94a3b8',
              lineHeight: 1.7,
              marginBottom: '32px',
            }}
          >
            We don&apos;t just write code — we solve business problems. Every
            solution we deliver is crafted with your growth in mind.
          </p>

          {/* Image */}
          <div
            className="why-image-wrap"
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              height: '260px',
              border: '1px solid var(--border)',
            }}
          >
            <Image
              src="/img/meeting.jpg"
              alt="Team meeting"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width:768px) 100vw, 480px"
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(135deg,rgba(37,99,235,.15),transparent)',
              }}
            />
          </div>

          <div style={{ marginTop: '28px' }}>
            <a
              href="#contact"
              style={{
                padding: '13px 30px',
                borderRadius: '8px',
                background: '#2563eb',
                color: '#fff',
                fontWeight: 600,
                fontSize: '15px',
                textDecoration: 'none',
                boxShadow: '0 4px 18px rgba(37,99,235,.3)',
                display: 'inline-block',
                transition: 'background 0.2s, transform 0.2s',
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
              Start a Project
            </a>
          </div>
        </div>

        {/* Right – features */}
        <div
          className="reveal"
          style={{
            flex: '1',
            minWidth: '280px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            transitionDelay: '0.15s',
          }}
        >
          {features.map((f, i) => (
            <div
              key={f.title}
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '20px 22px',
                transition: 'border-color 0.25s, transform 0.25s',
                animation: `fadeUp 0.5s ${i * 0.08 + 0.2}s ease both`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(56,189,248,.3)'
                el.style.transform = 'translateX(4px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--border)'
                el.style.transform = 'translateX(0)'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: 'rgba(37,99,235,.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  flexShrink: 0,
                }}
              >
                {f.icon}
              </div>
              <div>
                <h4
                  className="font-syne"
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#f8fafc',
                    marginBottom: '4px',
                  }}
                >
                  {f.title}
                </h4>
                <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
