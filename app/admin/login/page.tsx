'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleLogin() {
        setLoading(true)
        setError('')
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) { setError('Invalid email or password'); setLoading(false); return }
        router.push('/admin')
    }

    return (
        <main style={{
            minHeight: '100vh', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: 'var(--bg)'
        }}>
            <div style={{
                width: '100%', maxWidth: 420, padding: 40,
                background: 'white', borderRadius: 24,
                boxShadow: 'var(--shadow)', border: '1px solid var(--line)'
            }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 24, color: 'var(--text)' }}>
                    Admin Login
                </h1>
                {error && <p style={{ color: 'red', marginBottom: 16, fontSize: '.9rem' }}>{error}</p>}
                <div style={{ display: 'grid', gap: 12 }}>
                    <input type="email" placeholder="Email" value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{
                            padding: '14px 16px', borderRadius: 12, border: '1px solid var(--line)',
                            fontSize: '1rem', outline: 'none', width: '100%'
                        }} />
                    <input type="password" placeholder="Password" value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{
                            padding: '14px 16px', borderRadius: 12, border: '1px solid var(--line)',
                            fontSize: '1rem', outline: 'none', width: '100%'
                        }} />
                    <button onClick={handleLogin} disabled={loading}
                        style={{
                            padding: '14px', borderRadius: 12, border: 'none',
                            background: 'var(--green)', color: 'white',
                            fontWeight: 800, fontSize: '1rem', cursor: 'pointer'
                        }}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </div>
        </main>
    )
}