import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getLatestVehicles } from '../api/vehicles.js'
import { HorizontalVehicleSkeleton } from '../components/ui/LoadingSkeleton.jsx'
import PageTransition from '../components/ui/PageTransition.jsx'
import StateNotice from '../components/ui/StateNotice.jsx'
import VehicleCard from '../components/ui/VehicleCard.jsx'
import heroImage from '../assets/generated/vyom-hero.png'
import modificationStudioImage from '../assets/generated/modification-studio.png'
import {
  expansionMarkets,
  headquarters,
  modificationPreview,
} from '../lib/constants.js'
import { getGeneratedVehicleImage, getShowroomImage } from '../lib/generatedVisuals.js'
import { fetchVehiclePhoto } from '../lib/images.js'

function HomePage() {
  const [featuredVehicles, setFeaturedVehicles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadFeaturedVehicles() {
      setIsLoading(true)
      setError('')

      try {
        const vehicles = await getLatestVehicles(4)
        const vehiclesWithImages = await Promise.all(
          vehicles.map(async (vehicle) => {
            const generatedImage = getGeneratedVehicleImage(vehicle)
            if (generatedImage) {
              return { ...vehicle, imageUrl: generatedImage, visualSource: 'generated' }
            }

            try {
              const imageUrl = await fetchVehiclePhoto(vehicle.image_query, {
                category: vehicle.category,
              })
              return { ...vehicle, imageUrl, visualSource: 'pexels' }
            } catch {
              return { ...vehicle, imageUrl: null, visualSource: 'fallback' }
            }
          }),
        )

        if (isActive) {
          setFeaturedVehicles(vehiclesWithImages)
        }
      } catch (loadError) {
        if (isActive) {
          setError(
            loadError.message ||
              'Unable to fetch featured vehicles at the moment. Please try again.',
          )
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadFeaturedVehicles()

    return () => {
      isActive = false
    }
  }, [])

  return (
    <PageTransition>
      <section className="relative min-h-[88vh] overflow-hidden">
        <img
          src={heroImage}
          alt="Luxury performance vehicle"
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.92)_0%,rgba(10,10,10,0.62)_45%,rgba(10,10,10,0.25)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[var(--color-bg)]" />
        <div className="hero-motion-lines" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <div className="relative z-10 luxury-container flex min-h-[88vh] flex-col items-start justify-center py-24">
          <motion.p
            className="section-kicker mb-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            India&apos;s Premier Luxury Marketplace
          </motion.p>
          <motion.h1
            className="brand-logo text-5xl leading-none text-[var(--color-text)] sm:text-7xl"
            initial={{ opacity: 0, y: 26, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.08em' }}
            transition={{ duration: 0.8 }}
          >
            <span className="hero-word">VYOM</span>{' '}
            <span className="hero-word hero-word-delay">Veloce</span>
          </motion.h1>
          <motion.p
            className="subheading-font mt-6 max-w-3xl text-2xl font-semibold text-[var(--color-gold)] sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            Born in India. Built for the World.
          </motion.p>
          <motion.p
            className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-text)]/80 sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Experience curated luxury cars and motorcycles, bespoke performance
            modifications, and concierge-grade buying support from India&apos;s
            most aspirational vehicle house.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <Link to="/collection" className="luxury-button">
              Explore Collection
            </Link>
            <Link to="/modifications" className="outline-button">
              Book a Modification
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="luxury-container py-20">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Featured Vehicles</p>
            <h2 className="section-title">Latest Arrivals</h2>
          </div>
          <Link to="/collection" className="outline-button w-fit text-xs">
            View Full Collection
          </Link>
        </div>

        {isLoading ? <HorizontalVehicleSkeleton count={4} /> : null}

        {!isLoading && error ? (
          <StateNotice
            title="Collection loading issue"
            description={error}
            variant="error"
          />
        ) : null}

        {!isLoading && !error && featuredVehicles.length === 0 ? (
          <StateNotice
            title="No featured vehicles yet"
            description="Our curated launch collection is being prepared. Check back shortly."
          />
        ) : null}

        {!isLoading && !error && featuredVehicles.length > 0 ? (
          <div className="luxury-scroll flex gap-6 overflow-x-auto pb-4">
            {featuredVehicles.map((vehicle) => (
              <div key={vehicle.id} className="min-w-[290px] flex-1">
                <VehicleCard vehicle={vehicle} imageUrl={vehicle.imageUrl} compact />
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <section className="luxury-container grid gap-14 py-20 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <p className="section-kicker">Brand Story</p>
          <h2 className="section-title">Indian Heritage. Global Luxury Vision.</h2>
          <p className="section-description">
            VYOM Veloce was founded with a singular mission: to showcase
            India&apos;s refined automotive taste on a global stage. We blend
            world-class engineering sensibilities with Indian craftsmanship,
            creating experiences that celebrate speed, artistry, and identity.
          </p>
          <p className="section-description">
            Beyond transactions, we deliver an ecosystem: curated acquisition,
            high-precision modifications, and a premium listing channel for
            owners who expect white-glove support.
          </p>
        </div>
        <div className="premium-panel p-8">
          <p className="section-kicker">Business Model</p>
          <div className="mt-5 space-y-5 text-sm leading-relaxed text-[var(--color-muted)]">
            <p>
              <span className="text-[var(--color-gold)]">Vehicle Sales:</span>{' '}
              Purchase curated premium vehicles directly.
            </p>
            <p>
              <span className="text-[var(--color-gold)]">Listing Fees:</span>{' '}
              Sellers partner with VYOM and pay listing charges.
            </p>
            <p>
              <span className="text-[var(--color-gold)]">Modifications:</span>{' '}
              Bespoke transformation services for Indian and international
              platforms.
            </p>
          </div>
        </div>
      </section>

      <section className="luxury-container py-20">
        <p className="section-kicker">Headquarters</p>
        <h2 className="section-title mb-10">Presence Across India</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {headquarters.map((office) => (
            <motion.article
              key={office.city}
              whileHover={{ y: -5 }}
              className="glow-card group overflow-hidden rounded-3xl"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={getShowroomImage(office.city)}
                  alt={`${office.city} VYOM Veloce showroom`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="subheading-font text-3xl text-[var(--color-text)]">
                  {office.city}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                  {office.address}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="luxury-container py-20">
        <p className="section-kicker">Coming Soon</p>
        <h2 className="section-title mb-10">International Expansion</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {expansionMarkets.map((market) => (
            <div
              key={market.name}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/70 px-5 py-4"
            >
              <p className="subheading-font text-2xl text-[var(--color-gold)]">
                {market.flag} {market.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="luxury-container py-20">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Modification Studio</p>
            <h2 className="section-title">Transformation Preview</h2>
          </div>
          <Link to="/modifications" className="outline-button w-fit text-xs">
            See All Packages
          </Link>
        </div>
        <div className="mb-8 overflow-hidden rounded-3xl border border-[var(--color-border)]">
          <img
            src={modificationStudioImage}
            alt="VYOM Veloce bespoke modification studio"
            loading="lazy"
            className="h-[280px] w-full object-cover sm:h-[360px]"
          />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {modificationPreview.map((item) => (
            <motion.article
              key={item.title}
              whileHover={{ y: -4 }}
              className="glow-card rounded-3xl p-6"
            >
              <h3 className="subheading-font text-2xl text-[var(--color-gold)]">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}

export default HomePage
