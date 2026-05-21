import { useEffect, useState } from 'react'
import {
  createVehicle,
  deleteVehicle,
  getVehicles,
} from '../api/vehicles.js'
import {
  getListingRequests,
  getModificationRequests,
} from '../api/requests.js'
import { InlineLoadingSkeleton } from '../components/ui/LoadingSkeleton.jsx'
import PageTransition from '../components/ui/PageTransition.jsx'
import StateNotice from '../components/ui/StateNotice.jsx'
import { formatINR } from '../lib/format.js'

const vehicleFormInitial = {
  title: '',
  brand: '',
  category: 'car',
  origin: 'indian',
  engine: '',
  price: '',
  image_query: '',
}

function AdminPage() {
  const [vehicles, setVehicles] = useState([])
  const [modificationRequests, setModificationRequests] = useState([])
  const [listingRequests, setListingRequests] = useState([])
  const [vehicleForm, setVehicleForm] = useState(vehicleFormInitial)
  const [isLoading, setIsLoading] = useState(true)
  const [isSavingVehicle, setIsSavingVehicle] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  async function loadDashboardData() {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const [vehicleData, modificationData, listingData] = await Promise.all([
        getVehicles(),
        getModificationRequests(),
        getListingRequests(),
      ])
      setVehicles(vehicleData)
      setModificationRequests(modificationData)
      setListingRequests(listingData)
    } catch (loadError) {
      setErrorMessage(
        loadError.message ||
          'Unable to load admin data. Check Supabase RLS and credentials.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let isActive = true

    async function loadInitialDashboardData() {
      try {
        const [vehicleData, modificationData, listingData] = await Promise.all([
          getVehicles(),
          getModificationRequests(),
          getListingRequests(),
        ])

        if (!isActive) {
          return
        }

        setVehicles(vehicleData)
        setModificationRequests(modificationData)
        setListingRequests(listingData)
      } catch (loadError) {
        if (isActive) {
          setErrorMessage(
            loadError.message ||
              'Unable to load admin data. Check Supabase RLS and credentials.',
          )
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadInitialDashboardData()

    return () => {
      isActive = false
    }
  }, [])

  async function handleVehicleSubmit(event) {
    event.preventDefault()
    setIsSavingVehicle(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      await createVehicle({
        ...vehicleForm,
        price: Number(vehicleForm.price),
      })
      setSuccessMessage('Vehicle listing added successfully.')
      setVehicleForm(vehicleFormInitial)
      await loadDashboardData()
    } catch (submitError) {
      setErrorMessage(
        submitError.message ||
          'Unable to create listing. Ensure admin RLS policies are configured.',
      )
    } finally {
      setIsSavingVehicle(false)
    }
  }

  async function handleDeleteVehicle(id) {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this vehicle listing?',
    )
    if (!isConfirmed) {
      return
    }

    setErrorMessage('')
    setSuccessMessage('')
    try {
      await deleteVehicle(id)
      setSuccessMessage('Vehicle listing removed.')
      await loadDashboardData()
    } catch (deleteError) {
      setErrorMessage(
        deleteError.message ||
          'Unable to delete listing. Confirm delete policy access in Supabase.',
      )
    }
  }

  return (
    <PageTransition className="py-12">
      <section className="luxury-container space-y-10">
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
          <p className="section-kicker">Admin Dashboard</p>
          <h1 className="section-title mt-2">Operations Console</h1>
          <p className="section-description mt-4">
            Manage vehicle listings, review modification leads, and track listing
            requests from sellers.
          </p>
        </div>

        {errorMessage ? (
          <StateNotice
            title="Admin Operation Error"
            description={errorMessage}
            variant="error"
          />
        ) : null}

        {successMessage ? (
          <StateNotice title="Update Complete" description={successMessage} />
        ) : null}

        <section className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h2 className="subheading-font text-3xl text-[var(--color-gold)]">
            Add Vehicle Listing
          </h2>
          <form onSubmit={handleVehicleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              required
              type="text"
              value={vehicleForm.title}
              onChange={(event) =>
                setVehicleForm((previous) => ({
                  ...previous,
                  title: event.target.value,
                }))
              }
              placeholder="Title"
              className="luxury-input"
            />
            <input
              required
              type="text"
              value={vehicleForm.brand}
              onChange={(event) =>
                setVehicleForm((previous) => ({
                  ...previous,
                  brand: event.target.value,
                }))
              }
              placeholder="Brand"
              className="luxury-input"
            />
            <select
              value={vehicleForm.category}
              onChange={(event) =>
                setVehicleForm((previous) => ({
                  ...previous,
                  category: event.target.value,
                }))
              }
              className="luxury-input"
            >
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
            <select
              value={vehicleForm.origin}
              onChange={(event) =>
                setVehicleForm((previous) => ({
                  ...previous,
                  origin: event.target.value,
                }))
              }
              className="luxury-input"
            >
              <option value="indian">Indian</option>
              <option value="international">International</option>
            </select>
            <input
              type="text"
              value={vehicleForm.engine}
              onChange={(event) =>
                setVehicleForm((previous) => ({
                  ...previous,
                  engine: event.target.value,
                }))
              }
              placeholder="Engine"
              className="luxury-input"
            />
            <input
              required
              type="number"
              min="1"
              value={vehicleForm.price}
              onChange={(event) =>
                setVehicleForm((previous) => ({
                  ...previous,
                  price: event.target.value,
                }))
              }
              placeholder="Price in INR"
              className="luxury-input"
            />
            <input
              required
              type="text"
              value={vehicleForm.image_query}
              onChange={(event) =>
                setVehicleForm((previous) => ({
                  ...previous,
                  image_query: event.target.value,
                }))
              }
              placeholder="Image query for Pexels"
              className="luxury-input md:col-span-2"
            />
            <button
              type="submit"
              disabled={isSavingVehicle}
              className="luxury-button md:col-span-2"
            >
              {isSavingVehicle ? 'Saving Listing...' : 'Add Listing'}
            </button>
          </form>
        </section>

        <section className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h2 className="subheading-font text-3xl text-[var(--color-gold)]">
            Vehicle Listings
          </h2>
          {isLoading ? (
            <div className="mt-5">
              <InlineLoadingSkeleton />
            </div>
          ) : vehicles.length === 0 ? (
            <div className="mt-5">
              <StateNotice
                title="No vehicles available"
                description="Add your first listing using the form above."
              />
            </div>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">
                  <tr>
                    <th className="px-3 py-3">Title</th>
                    <th className="px-3 py-3">Brand</th>
                    <th className="px-3 py-3">Category</th>
                    <th className="px-3 py-3">Price</th>
                    <th className="px-3 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="border-t border-[var(--color-border)]">
                      <td className="px-3 py-3">{vehicle.title}</td>
                      <td className="px-3 py-3">{vehicle.brand}</td>
                      <td className="px-3 py-3 capitalize">{vehicle.category}</td>
                      <td className="px-3 py-3 text-[var(--color-gold)]">
                        {formatINR(vehicle.price)}
                      </td>
                      <td className="px-3 py-3">
                        <button
                          type="button"
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                          className="rounded-full border border-[rgba(255,107,0,0.4)] px-4 py-2 text-xs uppercase tracking-[0.15em] text-[var(--color-saffron)] transition hover:bg-[rgba(255,107,0,0.1)]"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h2 className="subheading-font text-3xl text-[var(--color-gold)]">
            Modification Requests
          </h2>
          {isLoading ? (
            <div className="mt-5">
              <InlineLoadingSkeleton />
            </div>
          ) : modificationRequests.length === 0 ? (
            <div className="mt-5">
              <StateNotice
                title="No requests yet"
                description="Incoming modification requests will appear here."
              />
            </div>
          ) : (
            <div className="mt-5 grid gap-4">
              {modificationRequests.map((request) => (
                <article
                  key={request.id}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4"
                >
                  <p className="subheading-font text-xl text-[var(--color-text)]">
                    {request.name} • {request.vehicle_model}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {request.modification_type} | {request.budget_range}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {request.email} | {request.phone}
                  </p>
                  {request.message ? (
                    <p className="mt-2 text-sm text-[var(--color-muted)]">
                      {request.message}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h2 className="subheading-font text-3xl text-[var(--color-gold)]">
            Listing Requests
          </h2>
          {isLoading ? (
            <div className="mt-5">
              <InlineLoadingSkeleton />
            </div>
          ) : listingRequests.length === 0 ? (
            <div className="mt-5">
              <StateNotice
                title="No listing requests yet"
                description="Seller listing requests will be shown here."
              />
            </div>
          ) : (
            <div className="mt-5 grid gap-4">
              {listingRequests.map((request) => (
                <article
                  key={request.id}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4"
                >
                  <p className="subheading-font text-xl text-[var(--color-text)]">
                    {request.name}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {request.email} | {request.phone}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-gold)]">
                    Asking Price: {formatINR(request.asking_price)}
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">
                    {request.vehicle_details}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </PageTransition>
  )
}

export default AdminPage
