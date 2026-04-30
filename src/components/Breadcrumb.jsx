import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

export default function Breadcrumb({ items = [] }) {
  // items: [{label, to}]
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.label,
      "item": `${window.location.origin}${item.to || ''}`
    }))
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 text-sm mb-6">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <FiChevronRight size={14} style={{ color: 'var(--text-secondary)' }} />}
            {item.to && i < items.length - 1 ? (
              <Link
                to={item.to}
                className="font-semibold hover:opacity-70 transition-opacity"
                style={{ color: 'var(--primary)' }}
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  )
}
