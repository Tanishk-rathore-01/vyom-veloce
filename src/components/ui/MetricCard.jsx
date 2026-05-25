function buildSparkline(points) {
  if (!points.length) {
    return ''
  }

  const max = Math.max(...points, 1)
  return points
    .map((point, index) => {
      const x = points.length === 1 ? 50 : (index / (points.length - 1)) * 100
      const y = 84 - (point / max) * 64
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

function MetricCard({ label, value, caption, tone = 'gold', points = [] }) {
  const linePoints = buildSparkline(points)

  return (
    <article className={`metric-card metric-card-${tone}`}>
      <div>
        <p className="metric-label">{label}</p>
        <p className="metric-value">{value}</p>
        {caption ? <p className="metric-caption">{caption}</p> : null}
      </div>
      <svg
        viewBox="0 0 100 90"
        role="img"
        aria-label={`${label} current activity shape`}
        className="metric-sparkline"
      >
        <path
          d="M0 84H100"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.16"
          strokeWidth="2"
        />
        {linePoints ? (
          <polyline
            points={linePoints}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          />
        ) : null}
      </svg>
    </article>
  )
}

export default MetricCard
