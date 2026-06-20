import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase.ts'
import { AuthContext } from './AuthContextStore.js'

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    async function loadSession() {
      if (!supabase) {
        setIsLoading(false)
        return
      }

      const { data, error } = await supabase.auth.getSession()
      if (!error && isActive) {
        setSession(data.session ?? null)
      }
      if (isActive) {
        setIsLoading(false)
      }
    }

    loadSession()

    if (!supabase) {
      return () => {
        isActive = false
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (isActive) {
        setSession(nextSession ?? null)
      }
    })

    return () => {
      isActive = false
      subscription.unsubscribe()
    }
  }, [])

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      isLoading,
      signIn: async (email, password) => {
        if (!supabase) {
          return { data: null, error: new Error('Supabase is not configured.') }
        }
        return supabase.auth.signInWithPassword({ email, password })
      },
      signUp: async (email, password) => {
        if (!supabase) {
          return { data: null, error: new Error('Supabase is not configured.') }
        }
        return supabase.auth.signUp({ email, password })
      },
      signOut: async () => {
        if (!supabase) {
          return { error: null }
        }
        return supabase.auth.signOut()
      },
    }),
    [isLoading, session],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
