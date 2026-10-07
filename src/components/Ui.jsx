export function Stars({ rating, reviews }) {
  return (
    <div className="flex items-center gap-1 text-gold" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 ${star <= Math.round(rating) ? 'fill-current' : 'fill-current opacity-25'}`}
          aria-hidden="true"
        >
          <path d="M10 1.6 12.5 7l5.8.6-4.4 3.9 1.3 5.6L10 14.2 4.8 17.1l1.3-5.6L1.7 7.6 7.5 7 10 1.6Z" />
        </svg>
      ))}
      <span className="ml-1 text-xs tracking-wide text-ink/55">
        {rating.toFixed(1)}
        {reviews ? ` · ${reviews}` : ''}
      </span>
    </div>
  )
}

export function QtyStepper({ qty, onChange }) {
  return (
    <div className="inline-flex items-center border border-forest/15 bg-paper">
      <button
        type="button"
        aria-label="Decrease quantity"
        className="h-10 w-10 text-lg transition hover:bg-sand"
        onClick={() => onChange(qty - 1)}
      >
        −
      </button>
      <span className="w-8 text-center text-sm">{qty}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        className="h-10 w-10 text-lg transition hover:bg-sand"
        onClick={() => onChange(qty + 1)}
      >
        +
      </button>
    </div>
  )
}

export function HeartIcon({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 transition ${filled ? 'fill-rose text-rose' : 'fill-none text-forest'}`}
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M12 20s-7-4.4-7-9.1C5 8 6.8 6.4 9 6.4c1.3 0 2.4.6 3 1.6.6-1 1.7-1.6 3-1.6 2.2 0 4 1.6 4 4.5C19 15.6 12 20 12 20Z" />
    </svg>
  )
}
