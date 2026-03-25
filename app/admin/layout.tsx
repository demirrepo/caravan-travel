'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, usePathname } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [isAuthorized, setIsAuthorized] = useState(false)

    useEffect(() => {
        // 1. If the user is already on the login page, let them see it!
        if (pathname === '/admin/login') {
            setIsAuthorized(true)
            return
        }

        // 2. For all other /admin pages, check if they have a VIP pass (session)
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                // Kick them to your specific login page
                router.push('/admin/login')
            } else {
                // Let them in
                setIsAuthorized(true)
            }
        })
    }, [router, pathname])

    // Show a loading screen while we verify their session
    if (!isAuthorized) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
                <p style={{ fontWeight: 700, color: 'var(--muted)' }}>Verifying access...</p>
            </div>
        )
    }

    // Render the admin pages normally
    return <section className="admin-wrapper">{children}</section>
}