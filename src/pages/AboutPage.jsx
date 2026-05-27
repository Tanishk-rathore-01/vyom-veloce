import { motion } from 'framer-motion'
import PageTransition from '../components/ui/PageTransition.jsx'
import { expansionMarkets, headquarters } from '../lib/constants.js'
import { aboutImages, getShowroomImage } from '../lib/generatedVisuals.js'

const teamMembers = [
  {
    name: 'Founder & Vision Lead',
    focus: 'Brand strategy, client experience, and global expansion direction.',
  },
  {
    name: 'Head of Engineering',
    focus: 'Technical curation, mechanical integrity, and upgrade roadmaps.',
  },
  {
    name: 'Performance Director',
    focus: 'Bespoke modification programs, testing standards, and delivery quality.',
  },
]

function AboutPage() {
  return (
    <PageTransition className="py-12">
      <section className="luxury-container space-y-14">
        <div className="grid overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] lg:grid-cols-[1fr_1.05fr]">
          <div className="p-8 sm:p-10">
            <p className="section-kicker">About VYOM Veloce</p>
            <h1 className="section-title mt-2">
              Founded in India, Driven by a Premium Global Vision
            </h1>
            <p className="section-description mt-5">
              VYOM Veloce represents a new expression of automotive luxury from
              India. We curate exceptional machines, reimagine their capabilities
              through precision modifications, and connect enthusiasts to vehicles
              that embody status, speed, and craftsmanship.
            </p>
          </div>
          <img
            src={aboutImages.brandStory}
            alt="VYOM Veloce premium brand lounge"
            className="h-full min-h-[320px] w-full object-cover"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {teamMembers.map((member) => (
            <motion.article
              key={member.name}
              whileHover={{ y: -6 }}
              className="glow-card rounded-3xl p-6"
            >
              <h2 className="subheading-font text-2xl text-[var(--color-gold)]">
                {member.name}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                {member.focus}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="premium-panel p-8">
            <p className="section-kicker">Mission</p>
            <h2 className="subheading-font mt-2 text-3xl text-[var(--color-gold)]">
              Elevate Indian Luxury Mobility to Global Standards
            </h2>
            <p className="section-description mt-5">
              Our mission is to set a new benchmark for premium automotive
              experiences from India, blending heritage, design, engineering, and
              client obsession into every listing and every transformation.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-[var(--color-border)]">
            <img
              src={aboutImages.atelierCraft}
              alt="VYOM atelier craft and material curation"
              className="h-full min-h-[300px] w-full object-cover"
            />
          </div>
        </div>

        <div>
          <p className="section-kicker">Headquarters</p>
          <h2 className="section-title mt-2">Delhi HQ, Bangalore, Ghaziabad</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {headquarters.map((office) => (
              <motion.article
                key={office.city}
                whileHover={{ y: -6 }}
                className="glow-card group overflow-hidden rounded-3xl"
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={getShowroomImage(office.city)}
                    alt={`${office.city} showroom`}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="subheading-font text-2xl text-[var(--color-text)]">
                    {office.city}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                    {office.address}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="grid gap-6 overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] lg:grid-cols-[1.05fr_1fr]">
          <img
            src={aboutImages.heritageVision}
            alt="VYOM global luxury expansion vision"
            className="h-full min-h-[300px] w-full object-cover"
            loading="lazy"
          />
          <div className="p-8">
            <p className="section-kicker">Global Vision</p>
            <h2 className="subheading-font mt-2 text-3xl text-[var(--color-gold)]">
              Built from India for global collectors.
            </h2>
            <p className="section-description mt-5">
              Our expansion roadmap connects Indian taste, craft, and curation
              to the world&apos;s most demanding mobility markets.
            </p>
          </div>
        </div>

        <div className="expansion-showcase">
          <img
            src={aboutImages.internationalExpansion}
            alt="VYOM international showroom expansion vision"
            loading="lazy"
          />
          <div className="expansion-overlay" />
          <div className="expansion-content">
            <p className="section-kicker">Future Expansion</p>
            <h2 className="section-title mt-2">Coming Soon</h2>
            <p className="section-description mt-4">
              VYOM&apos;s global rollout begins as a collector network: curated
              sourcing, concierge delivery, and modification standards carried
              from India into international luxury capitals.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {expansionMarkets.map((market) => (
                <div key={market.name} className="expansion-market-card">
                  <span>{market.flag}</span>
                  <p>{market.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default AboutPage
