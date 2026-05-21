import PageTransition from '../components/ui/PageTransition.jsx'
import { expansionMarkets, headquarters } from '../lib/constants.js'

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
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 sm:p-10">
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

        <div className="grid gap-6 md:grid-cols-3">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
            >
              <h2 className="subheading-font text-2xl text-[var(--color-gold)]">
                {member.name}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                {member.focus}
              </p>
            </article>
          ))}
        </div>

        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
          <p className="section-kicker">Mission</p>
          <h2 className="subheading-font mt-2 text-3xl text-[var(--color-gold)]">
            Elevate Indian Luxury Mobility to Global Standards
          </h2>
          <p className="section-description mt-5">
            Our mission is to set a new benchmark for premium automotive
            experiences from India—blending heritage, design, engineering, and
            client obsession into every listing and every transformation.
          </p>
        </div>

        <div>
          <p className="section-kicker">Headquarters</p>
          <h2 className="section-title mt-2">Delhi HQ, Bangalore, Ghaziabad</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {headquarters.map((office) => (
              <article
                key={office.city}
                className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
              >
                <h3 className="subheading-font text-2xl text-[var(--color-text)]">
                  {office.city}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                  {office.address}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="pb-8">
          <p className="section-kicker">Future Expansion</p>
          <h2 className="section-title mt-2">Coming Soon</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </section>
    </PageTransition>
  )
}

export default AboutPage
