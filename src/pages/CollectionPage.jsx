import { useEffect, useMemo, useState } from 'react'
import { getVehicles } from '../api/vehicles.ts'
import FormField from '../components/ui/FormField.jsx'
import { VehicleGridSkeleton } from '../components/ui/LoadingSkeleton.jsx'
import PageTransition from '../components/ui/PageTransition.jsx'
import StateNotice from '../components/ui/StateNotice.jsx'
import VehicleCard from '../components/ui/VehicleCard.jsx'
import { priceRangeOptions } from '../lib/constants.js'
import { getGeneratedVehicleImage } from '../lib/generatedVisuals.js'
import { fetchVehiclePhoto } from '../lib/images.js'

function matchesPriceRange(price, selectedRange) {
  if (selectedRange === 'all') {
    return true
  }
  if (selectedRange === 'under-2000000') {
    return price <= 2_000_000
  }
  if (selectedRange === '2000000-5000000') {
    return price > 2_000_000 && price <= 5_000_000
  }
  if (selectedRange === '5000000-10000000') {
    return price > 5_000_000 && price <= 10_000_000
  }
  if (selectedRange === 'above-10000000') {
    return price > 10_000_000
  }
  return true
}

function CollectionPage() {
  const [vehicles, setVehicles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [brandFilter, setBrandFilter] = useState('all')
  const [originFilter, setOriginFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')

  function clearFilters() {
    setSearchTerm('')
    setCategoryFilter('all')
    setBrandFilter('all')
    setOriginFilter('all')
    setPriceFilter('all')
  }

  useEffect(() => {
    let isActive = true

    async function loadVehicles() {
      setIsLoading(true)
      setError('')

      try {
        const data = await getVehicles()

        const enriched = await Promise.all(
          data.map(
            (vehicle, index) =>
              new Promise((resolve) => {
                setTimeout(async () => {
                  const generatedImage = getGeneratedVehicleImage(vehicle)
                  if (generatedImage) {
                    resolve({
                      ...vehicle,
                      imageUrl: generatedImage,
                      visualSource: 'generated',
                    })
                    return
                  }

                  try {
                    const imageUrl = await fetchVehiclePhoto(vehicle.image_query, {
                      category: vehicle.category,
                    })
                    resolve({ ...vehicle, imageUrl, visualSource: 'pexels' })
                  } catch {
                    resolve({ ...vehicle, imageUrl: null, visualSource: 'fallback' })
                  }
                }, index * 150)
              }),
          ),
        )

        if (isActive) {
          setVehicles(enriched)
        }
      } catch (loadError) {
        if (isActive) {
          setError(
            loadError.message ||
              'Collection is currently unavailable. Please refresh shortly.',
          )
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadVehicles()

    return () => {
      isActive = false
    }
  }, [])

  const brandOptions = useMemo(() => {
    const uniqueBrands = new Set(vehicles.map((vehicle) => vehicle.brand))
    return ['all', ...uniqueBrands]
  }, [vehicles])

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const titleMatch = vehicle.title
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase())
      const categoryMatch =
        categoryFilter === 'all' || vehicle.category === categoryFilter
      const brandMatch = brandFilter === 'all' || vehicle.brand === brandFilter
      const originMatch =
        originFilter === 'all' || vehicle.origin === originFilter
      const priceMatch = matchesPriceRange(Number(vehicle.price), priceFilter)

      return (
        titleMatch && categoryMatch && brandMatch && originMatch && priceMatch
      )
    })
  }, [
    vehicles,
    searchTerm,
    categoryFilter,
    brandFilter,
    originFilter,
    priceFilter,
  ])

  return (
    <PageTransition className="pb-20 pt-10">
      <section className="luxury-container">
        <p className="section-kicker">Collection</p>
        <h1 className="section-title mt-2">Curated Cinematic Gallery</h1>
        <p className="section-description mt-4">
          Discover VYOM-owned studio visuals for live inventory across cars and
          motorcycles. Filter by segment, provenance, and budget to find your
          perfect machine.
        </p>

        <div className="premium-panel mt-10 grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-5">
          <FormField
            id="collection-search"
            label="Search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by title"
            containerClassName="xl:col-span-2"
          />

          <FormField
            id="collection-category"
            label="Category"
            as="select"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
          </FormField>

          <FormField
            id="collection-brand"
            label="Brand"
            as="select"
            value={brandFilter}
            onChange={(event) => setBrandFilter(event.target.value)}
          >
            {brandOptions.map((brand) => (
              <option key={brand} value={brand}>
                {brand === 'all' ? 'All Brands' : brand}
              </option>
            ))}
          </FormField>

          <FormField
            id="collection-origin"
            label="Origin"
            as="select"
            value={originFilter}
            onChange={(event) => setOriginFilter(event.target.value)}
          >
            <option value="all">All Origins</option>
            <option value="indian">Indian</option>
            <option value="international">International</option>
          </FormField>

          <FormField
            id="collection-price"
            label="Budget"
            as="select"
            value={priceFilter}
            onChange={(event) => setPriceFilter(event.target.value)}
            containerClassName="md:col-span-2 xl:col-span-1"
          >
            {priceRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FormField>
        </div>

        <div className="mt-10">
          {isLoading ? <VehicleGridSkeleton count={6} /> : null}

          {!isLoading && error ? (
            <StateNotice
              title="Unable to load collection"
              description={error}
              variant="error"
            />
          ) : null}

          {!isLoading && !error && filteredVehicles.length === 0 ? (
            <StateNotice
              title="No vehicles match your filters"
              description="Adjust your search or filter criteria to explore more vehicles."
              action={
                <button type="button" onClick={clearFilters} className="luxury-button text-xs">
                  Clear Filters
                </button>
              }
            />
          ) : null}

          {!isLoading && !error && filteredVehicles.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  imageUrl={vehicle.imageUrl}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </PageTransition>
  )
}

export default CollectionPage
