import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { categoryLabel, firstCharacter, formatINR, originLabel } from '../../lib/format.js'

function VehicleCard({ vehicle, imageUrl = null, compact = false }) {
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]"
    >
      <Link to={`/collection/${vehicle.id}`} className="block">
        <div className={`${compact ? 'h-48' : 'h-60'} relative overflow-hidden`}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={vehicle.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="vehicle-fallback-gradient flex h-full w-full items-center justify-center">
              <span className="brand-logo text-5xl text-[var(--color-gold)]">
                {firstCharacter(vehicle.brand)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.75)] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em]">
            <span className="rounded-full border border-[var(--color-border)] bg-[rgba(10,10,10,0.72)] px-3 py-1 text-[var(--color-gold)]">
              {categoryLabel(vehicle.category)}
            </span>
            <span className="rounded-full border border-[var(--color-border)] bg-[rgba(10,10,10,0.72)] px-3 py-1 text-[var(--color-saffron)]">
              {originLabel(vehicle.origin)}
            </span>
          </div>
        </div>

        <div className="space-y-2 p-5">
          <h3 className="subheading-font text-2xl text-[var(--color-text)]">{vehicle.title}</h3>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
            {vehicle.brand}
          </p>
          <p className="text-lg font-medium text-[var(--color-gold)]">{formatINR(vehicle.price)}</p>
        </div>
      </Link>
    </motion.article>
  )
}

export default VehicleCard
