'use client'

import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const cards = [
    { href: '/admin/tours', icon: '🏛️', title: 'Tours', desc: 'Add, edit, or remove tours' },
    { href: '/admin/transfers', icon: '🚗', title: 'Transfers', desc: 'Manage transfer routes and prices' },
    { href: '/admin/settings', icon: '⚙️', title: 'Settings', desc: 'Update WhatsApp, email, address' },
]

export default function AdminDashboard() {
    const router = useRouter()

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    return (
        <main style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8 }}>Admin Dashboard</h1>
            <p style={{ color: 'var(--muted)', marginBottom: 40 }}>Manage your website content from here.</p>

            <div className="responsive-grid-3">
                {cards.map(card => (
                    <Link key={card.href} href={card.href} style={{
                        display: 'block', padding: 28, borderRadius: 24,
                        background: 'white', border: '1px solid var(--line)',
                        boxShadow: 'var(--shadow)', textDecoration: 'none', color: 'inherit'
                    }}>
                        <div style={{ fontSize: 36, marginBottom: 12 }}>{card.icon}</div>
                        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 6 }}>{card.title}</h2>
                        <p style={{ color: 'var(--muted)', fontSize: '.95rem' }}>{card.desc}</p>
                    </Link>
                ))}
            </div>

            <div style={{ marginTop: 40, display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/" style={{
                    display: 'inline-block', padding: '12px 24px', borderRadius: 999,
                    background: 'var(--bg)', border: '1px solid var(--line)',
                    fontWeight: 700, color: 'var(--text)'
                }}>← View Website</Link>

                <button onClick={handleLogout} style={{
                    padding: '12px 24px', borderRadius: 999, border: 'none',
                    background: '#ef4444', color: 'white', fontWeight: 700, cursor: 'pointer'
                }}>
                    Log Out
                </button>
            </div>
        </main>
    )
}