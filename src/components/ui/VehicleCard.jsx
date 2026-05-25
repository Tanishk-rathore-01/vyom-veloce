import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import fallbackVehicle from '../../assets/generated/fallback-vehicle.png'
import { categoryLabel, firstCharacter, formatINR, originLabel } from '../../lib/format.js'
import LuxuryImage from './LuxuryImage.jsx'

function VehicleCard({ vehicle, imageUrl = null, compact = false }) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="glow-card group overflow-hidden rounded-3xl bg-[var(--color-surface)]"
      data-cursor="interactive"
    >
      <Link to={`/collection/${vehicle.id}`} className="block">
        <div className={`${compact ? 'h-48' : 'h-64'} relative overflow-hidden`}>
          <LuxuryImage
            src={imageUrl}
            fallbackSrc={fallbackVehicle}
            alt={vehicle.title}
            containerClassName="h-full w-full"
            className="transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.75)] via-transparent to-transparent" />
          {!imageUrl ? (
            <div className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-full border border-[rgba(201,168,76,0.28)] bg-black/55">
              <span className="brand-logo text-xl text-[var(--color-gold)]">
                {firstCharacter(vehicle.brand)}
              </span>
            </div>
          ) : null}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 text-[0.68rem] uppercase">
            <span className="rounded-full border border-[var(--color-border)] bg-[rgba(10,10,10,0.72)] px-3 py-1 text-[var(--color-gold)]">
              {categoryLabel(vehicle.category)}
            </span>
            <span className="rounded-full border border-[var(--color-border)] bg-[rgba(10,10,10,0.72)] px-3 py-1 text-[var(--color-saffron)]">
              {originLabel(vehicle.origin)}
            </span>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div className="space-y-1">
            <p className="text-xs uppercase text-[var(--color-muted)]">
              {vehicle.brand}
            </p>
            <h3 className="subheading-font text-2xl leading-tight text-[var(--color-text)]">
              {vehicle.title}
            </h3>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="price-chip">{formatINR(vehicle.price)}</p>
            <span className="text-xs font-semibold uppercase text-[var(--color-gold)] transition group-hover:text-[var(--color-saffron)]">
              View profile
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default VehicleCard
