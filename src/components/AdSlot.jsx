export default function AdSlot({ code, position = 'banner' }) {
  if (!code) {
    return (
      <div className="ad-slot my-4">
        <span className="text-xs" style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>
          Advertisement
        </span>
      </div>
    )
  }

  return (
    <div
      className="ad-slot my-4"
      dangerouslySetInnerHTML={{ __html: code }}
      aria-label={`Advertisement - ${position}`}
    />
  )
}
