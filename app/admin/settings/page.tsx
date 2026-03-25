'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function AdminSettings() {
    const [form, setForm] = useState({ whatsapp_number: '', email: '', address: '', footer_text: '' })
    const [id, setId] = useState('')
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        supabase.from('site_settings').select('*').single().then(({ data }) => {
            if (data) { setForm(data); setId(data.id) }
        })
    }, [])

    async function handleSave() {
        await supabase.from('site_settings').update(form).eq('id', id)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    const inputStyle: React.CSSProperties = {
        padding: '12px 14px', borderRadius: 10,
        border: '1px solid var(--line)', fontSize: '.95rem',
        outline: 'none', width: '100%'
    }

    return (
        <main style={{ maxWidth: 600, margin: '0 auto', padding: '60px 24px' }}>
            <Link href="/admin" style={{ color: 'var(--muted)', fontWeight: 700 }}>← Dashboard</Link>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '8px 0 32px' }}>Settings</h1>

            <div style={{
                background: 'white', borderRadius: 24, padding: 28,
                border: '1px solid var(--line)', boxShadow: 'var(--shadow)'
            }}>
                <div style={{ display: 'grid', gap: 14 }}>
                    {[
                        { key: 'whatsapp_number', label: 'WhatsApp Number', placeholder: '998995448223' },
                        { key: 'email', label: 'Email', placeholder: 'your@email.com' },
                        { key: 'address', label: 'Address', placeholder: 'Zhargarlar 22, Khiva' },
                        { key: 'footer_text', label: 'Footer Text', placeholder: '© 2026 Karavan Travel' },
                    ].map(({ key, label, placeholder }) => (
                        <div key={key}>
                            <label style={{ display: 'block', fontWeight: 700, marginBottom: 6 }}>{label}</label>
                            <input placeholder={placeholder} value={form[key as keyof typeof form]}
                                onChange={e => setForm({ ...form, [key]: e.target.value })}
                                style={inputStyle} />
                        </div>
                    ))}
                </div>
                <button onClick={handleSave} style={{
                    marginTop: 20, padding: '14px 32px', borderRadius: 999,
                    border: 'none', background: 'var(--green)', color: 'white',
                    fontWeight: 800, cursor: 'pointer', width: '100%'
                }}>{saved ? '✓ Saved!' : 'Save Changes'}</button>
            </div>
        </main>
    )
}