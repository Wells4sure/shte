'use client'

import Image from 'next/image'

const serviceLinks = [
  'Bespoke Software',
  'WhatsApp Automation',
  'Bulk SMS',
  'Point of Sale',
]
const companyLinks = [
  { label: 'About Us', href: '#why' },
  { label: 'Our Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]
const contactLinks = [
  { label: 'silverhousetech@gmail.com', href: 'mailto:silverhousetech@gmail.com' },
  { label: '+260 978 999 359', href: 'tel:+260978999359' },
  { label: 'WhatsApp Us', href: 'https://wa.me/260978999359' },
]

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--navy)',
        borderTop: '1px solid rgba(56,189,248,.13)',
        padding: '70px 5% 30px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '50px',
          marginBottom: '50px',
        }}
        className="footer-grid"
      >
        {/* Brand */}
        <div>
          <a href="#home" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <Image
              src="/img/logos/side.png"
              alt="Silver House Technology"
              width={180}
              height={60}
              style={{ height: '52px', width: 'auto', objectFit: 'contain' }}
            />
          </a>
          <p
            style={{
              fontSize: '14px',
              color: '#94a3b8',
              lineHeight: 1.7,
              marginTop: '14px',
              maxWidth: '290px',
            }}
          >
            Empowering Zambian businesses with innovative, bespoke technology
            solutions — from software to automation and beyond.
          </p>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '22px' }}>
            {[
              { label: '💬', href: 'https://wa.me/260978999359', title: 'WhatsApp' },
              { label: '📧', href: 'mailto:silverhousetech@gmail.com', title: 'Email' },
            ].map((s) => (
              <a
                key={s.title}
                href={s.href}
                title={s.title}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(37,99,235,.12)',
                  border: '1px solid rgba(56,189,248,.13)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
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

        {/* Services */}
        <div>
          <h5
            className="font-syne"
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#f8fafc',
              marginBottom: '18px',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
            }}
          >
            Services
          </h5>
          <ul style={{ listStyle: 'none' }}>
            {serviceLinks.map((label) => (
              <li key={label} style={{ marginBottom: '10px' }}>
                <a
                  href="#services"
                  style={{
                    color: '#94a3b8',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = '#38bdf8')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = '#94a3b8')
                  }
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h5
            className="font-syne"
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#f8fafc',
              marginBottom: '18px',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
            }}
          >
            Company
          </h5>
          <ul style={{ listStyle: 'none' }}>
            {companyLinks.map((l) => (
              <li key={l.label} style={{ marginBottom: '10px' }}>
                <a
                  href={l.href}
                  style={{
                    color: '#94a3b8',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = '#38bdf8')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = '#94a3b8')
                  }
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5
            className="font-syne"
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#f8fafc',
              marginBottom: '18px',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
            }}
          >
            Contact
          </h5>
          <ul style={{ listStyle: 'none' }}>
            {contactLinks.map((l) => (
              <li key={l.label} style={{ marginBottom: '10px' }}>
                <a
                  href={l.href}
                  style={{
                    color: '#94a3b8',
                    textDecoration: 'none',
                    fontSize: '13px',
                    transition: 'color 0.2s',
                    wordBreak: 'break-all',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = '#38bdf8')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = '#94a3b8')
                  }
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(56,189,248,.1)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <p style={{ fontSize: '13px', color: '#94a3b8' }}>
          © 2025{' '}
          <span style={{ color: '#38bdf8' }}>
            Silver House Technology Enterprises Limited
          </span>
          . All rights reserved.
        </p>
        <p style={{ fontSize: '13px', color: '#94a3b8' }}>
          Built with ❤️ in Zambia 🇿🇲
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
