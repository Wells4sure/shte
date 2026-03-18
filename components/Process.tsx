'use client'

import { useEffect, useRef } from 'react'

const steps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We listen deeply to understand your business, goals, and challenges.',
    icon: '🔍',
  },
  {
    num: '02',
    title: 'Design & Plan',
    desc: 'We map out the solution architecture and user experience in detail.',
    icon: '🎨',
  },
  {
    num: '03',
    title: 'Build',
    desc: 'Our team develops your solution with quality and speed, keeping you informed.',
    icon: '⚙️',
  },
  {
    num: '04',
    title: 'Launch & Support',
    desc: 'We deploy, train your team, and provide continuous post-launch support.',
    icon: '🚀',
  },
]

export default function Process() {
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
      id="process"
      ref={sectionRef}
      style={{
        padding: '100px 5%',
        background: 'var(--navy-mid)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(56,189,248,.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      <div
        className="reveal"
        style={{ textAlign: 'center', marginBottom: '70px', position: 'relative' }}
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
          How We Work
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
          Our Simple Process
        </h2>
        <p
          style={{
            marginTop: '14px',
            fontSize: '17px',
            color: '#94a3b8',
            maxWidth: '460px',
            lineHeight: 1.7,
            margin: '14px auto 0',
          }}
        >
          A clear, transparent journey from your first call to a live product.
        </p>
      </div>

      {/* Steps */}
      <div
        className="reveal process-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0',
          position: 'relative',
          transitionDelay: '0.1s',
        }}
      >
        {/* Connecting line */}
        <div
          style={{
            position: 'absolute',
            top: '36px',
            left: '12%',
            right: '12%',
            height: '1px',
            background:
              'linear-gradient(90deg, transparent, rgba(56,189,248,.3), rgba(56,189,248,.3), transparent)',
            pointerEvents: 'none',
          }}
          className="process-line"
        />

        {steps.map((step, i) => (
          <div
            key={step.num}
            style={{
              textAlign: 'center',
              padding: '0 20px 0',
              position: 'relative',
            }}
          >
            {/* Number circle */}
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                margin: '0 auto 24px',
                background: 'linear-gradient(135deg,#2563eb,#0ea5e9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1,
                boxShadow: '0 0 40px rgba(37,99,235,.45), 0 0 80px rgba(37,99,235,.15)',
                animation: `float 3s ${i * 0.3}s ease-in-out infinite`,
              }}
            >
              <span
                className="font-syne"
                style={{
                  fontWeight: 800,
                  fontSize: '22px',
                  color: '#fff',
                }}
              >
                {step.num}
              </span>
            </div>

            {/* Icon badge */}
            <div
              style={{
                fontSize: '28px',
                marginBottom: '14px',
              }}
            >
              {step.icon}
            </div>

            <h4
              className="font-syne"
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#f8fafc',
                marginBottom: '10px',
              }}
            >
              {step.title}
            </h4>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.7 }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-line { display: none; }
        }
      `}</style>
    </section>
  )
}
