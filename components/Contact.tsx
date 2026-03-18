'use client'

import { useEffect, useRef, useState } from 'react'

const contactItems = [
  {
    icon: '📧',
    label: 'Email us at',
    value: 'silverhousetech@gmail.com',
    href: 'mailto:silverhousetech@gmail.com',
  },
  {
    icon: '📞',
    label: 'Call or WhatsApp',
    value: '+260 978 999 359',
    href: 'tel:+260978999359',
  },
  {
    icon: '📍',
    label: 'Based in',
    value: 'Zambia 🇿🇲',
    href: null,
  },
]

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const form = e.target as HTMLFormElement
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Send failed')
      setSent(true)
      form.reset()
      setTimeout(() => setSent(false), 6000)
    } catch {
      setError('Something went wrong. Please try emailing us directly.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(10,22,40,.6)',
    border: '1px solid rgba(56,189,248,.13)',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#f8fafc',
    fontFamily: 'inherit',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    width: '100%',
  }

  const focusBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    ((e.target as HTMLElement).style.borderColor = '#0ea5e9')
  const blurBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    ((e.target as HTMLElement).style.borderColor = 'rgba(56,189,248,.13)')

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ padding: '100px 5%', background: 'var(--navy-mid)', position: 'relative' }}
    >
      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'rgba(37,99,235,.05)',
          filter: 'blur(120px)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
        }}
      />

      <div className="reveal" style={{ marginBottom: '56px', position: 'relative' }}>
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
          Get In Touch
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
          Let&apos;s Build Something<br />Great Together
        </h2>
        <p
          style={{
            marginTop: '14px',
            fontSize: '17px',
            color: '#94a3b8',
            maxWidth: '480px',
            lineHeight: 1.7,
          }}
        >
          Drop us a message and we&apos;ll get back to you swiftly.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          position: 'relative',
        }}
        className="contact-grid"
      >
        {/* Info */}
        <div className="reveal">
          <h3
            className="font-syne"
            style={{ fontSize: '24px', fontWeight: 800, color: '#f8fafc', marginBottom: '14px' }}
          >
            Contact Information
          </h3>
          <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: 1.7, marginBottom: '32px' }}>
            We&apos;re a Zambia-based technology company ready to serve businesses across the region.
            Reach out through any channel below.
          </p>

          {contactItems.map((item) => (
            <div
              key={item.label}
              style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '10px',
                  background: 'rgba(37,99,235,.15)',
                  border: '1px solid rgba(37,99,235,.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div>
                <small style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '2px' }}>
                  {item.label}
                </small>
                {item.href ? (
                  <a
                    href={item.href}
                    style={{ color: '#e2e8f0', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#38bdf8')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#e2e8f0')}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span style={{ fontSize: '15px', color: '#e2e8f0' }}>{item.value}</span>
                )}
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            {[
              { label: '💬', href: 'https://wa.me/260978999359', title: 'WhatsApp' },
              { label: '📧', href: 'mailto:silverhousetech@gmail.com', title: 'Email' },
            ].map((s) => (
              <a
                key={s.title}
                href={s.href}
                title={s.title}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(37,99,235,.12)',
                  border: '1px solid rgba(56,189,248,.13)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  textDecoration: 'none',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(37,99,235,.28)'
                  el.style.borderColor = '#0ea5e9'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(37,99,235,.12)'
                  el.style.borderColor = 'rgba(56,189,248,.13)'
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="reveal" style={{ transitionDelay: '0.15s' }}>
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {/* Name + Email row */}
            <div
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}
              className="form-row"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#cbd5e1' }}>
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="John Banda"
                  required
                  style={inputStyle}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#cbd5e1' }}>
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  style={inputStyle}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
              </div>
            </div>

            {/* Subject — free text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 500, color: '#cbd5e1' }}>
                Subject
              </label>
              <input
                name="subject"
                type="text"
                placeholder="e.g. I need a POS system for my shop"
                required
                style={inputStyle}
                onFocus={focusBorder}
                onBlur={blurBorder}
              />
            </div>

            {/* Message */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 500, color: '#cbd5e1' }}>
                Message
              </label>
              <textarea
                name="message"
                placeholder="Tell us about your project or business needs…"
                required
                rows={5}
                style={{ ...inputStyle, resize: 'none' }}
                onFocus={(e) => ((e.target as HTMLElement).style.borderColor = '#0ea5e9')}
                onBlur={(e) => ((e.target as HTMLElement).style.borderColor = 'rgba(56,189,248,.13)')}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '14px 32px',
                borderRadius: '8px',
                background: loading ? 'rgba(37,99,235,.5)' : '#2563eb',
                color: '#fff',
                fontWeight: 600,
                fontSize: '15px',
                border: 'none',
                cursor: loading ? 'wait' : 'pointer',
                boxShadow: '0 4px 18px rgba(37,99,235,.3)',
                transition: 'background 0.2s, transform 0.2s',
                alignSelf: 'flex-start',
                fontFamily: 'inherit',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#1d4ed8'
                  el.style.transform = 'translateY(-1px)'
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = loading ? 'rgba(37,99,235,.5)' : '#2563eb'
                el.style.transform = 'translateY(0)'
              }}
            >
              {loading ? 'Sending…' : 'Send Message →'}
            </button>

            {sent && (
              <p style={{ color: '#4ade80', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                ✓ Message sent! We&apos;ll be in touch shortly.
              </p>
            )}
            {error && (
              <p style={{ color: '#f87171', fontSize: '14px' }}>{error}</p>
            )}
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 500px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
