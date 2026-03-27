'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

type Tour = {
    id: string
    title: string
    slug: string // Added
    description: string // Added
    price: string
    discount_from_price?: string
    duration: string
    distance: string
    sightseeing: string
    driving: string
    whatsapp_number: string
    whatsapp_message: string
    is_active: boolean
}

const empty = {
    title: '', slug: '', description: '', price: '', discount_from_price: '',
    duration: '', distance: '', sightseeing: '', driving: '',
    whatsapp_number: '', whatsapp_message: ''
}

export default function AdminTours() {
    const [tours, setTours] = useState<Tour[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState(empty)
    const [editingId, setEditingId] = useState<string | null>(null)

    async function fetch() {
        const { data } = await supabase.from('tours').select('*').order('created_at', { ascending: false })
        setTours(data || [])
        setLoading(false)
    }

    useEffect(() => { fetch() }, [])

    async function handleSave() {
        if (!form.title || !form.price || !form.slug) return alert('Title, Price, and URL Slug are required')

        // 1. Auto-format the main price
        let formattedPrice = form.price.trim();
        if (!formattedPrice.startsWith('$')) {
            formattedPrice = '$' + formattedPrice;
        }

        // 2. Auto-format the discount price (if it exists)
        let formattedDiscount = form.discount_from_price ? form.discount_from_price.trim() : '';
        if (formattedDiscount && !formattedDiscount.startsWith('$')) {
            formattedDiscount = '$' + formattedDiscount;
        }

        // 3. Create the final object to save
        const dataToSave = {
            ...form,
            price: formattedPrice,
            discount_from_price: formattedDiscount
        }

        // 4. Send it to Supabase
        if (editingId) {
            await supabase.from('tours').update(dataToSave).eq('id', editingId)
        } else {
            await supabase.from('tours').insert([{ ...dataToSave, is_active: true }])
        }

        resetForm()
        fetch()
    }

    function handleEdit(tour: Tour) {
        setForm({
            title: tour.title,
            slug: tour.slug || '',
            description: tour.description || '',
            price: tour.price,
            discount_from_price: tour.discount_from_price || '',
            duration: tour.duration,
            distance: tour.distance,
            sightseeing: tour.sightseeing,
            driving: tour.driving,
            whatsapp_number: tour.whatsapp_number,
            whatsapp_message: tour.whatsapp_message
        })
        setEditingId(tour.id)
        setShowForm(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete this tour?')) return
        await supabase.from('tours').delete().eq('id', id)
        fetch()
    }

    async function handleToggle(id: string, current: boolean) {
        await supabase.from('tours').update({ is_active: !current }).eq('id', id)
        fetch()
    }

    function resetForm() {
        setForm(empty)
        setEditingId(null)
        setShowForm(false)
    }

    const inputStyle: React.CSSProperties = {
        padding: '12px 14px', borderRadius: 10,
        border: '1px solid var(--line)', fontSize: '.95rem',
        outline: 'none', width: '100%'
    }

    // This automatically creates a slug when you type a title
    const handleTitleChange = (title: string) => {
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        setForm({ ...form, title, slug });
    }

    return (
        <main style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                    <Link href="/admin" style={{ color: 'var(--muted)', fontWeight: 700 }}>← Dashboard</Link>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: 4 }}>Manage Tours</h1>
                </div>
                <button onClick={() => showForm ? resetForm() : setShowForm(true)} style={{
                    padding: '12px 24px', borderRadius: 999, border: 'none',
                    background: 'var(--green)', color: 'white', fontWeight: 800, cursor: 'pointer'
                }}>{showForm ? 'Cancel' : '+ Add Tour'}</button>
            </div>

            {showForm && (
                <div style={{
                    background: 'white', borderRadius: 24, padding: 28,
                    border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 28
                }}>
                    <h2 style={{ fontWeight: 800, marginBottom: 18 }}>
                        {editingId ? 'Edit Tour' : 'New Tour'}
                    </h2>

                    {/* The Input Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <input
                            placeholder="Tour title *"
                            value={form.title}
                            onChange={e => handleTitleChange(e.target.value)}
                            style={inputStyle}
                        />
                        <input
                            placeholder="URL Slug (e.g. my-tour) *"
                            value={form.slug}
                            onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                            style={inputStyle}
                        />
                        {[
                            { key: 'price', placeholder: 'Current Price (e.g. from $49) *' },
                            { key: 'discount_from_price', placeholder: 'Old Price (e.g. $69) (Optional)' },
                            { key: 'duration', placeholder: 'Duration (e.g. 6–7 hours)' },
                            { key: 'distance', placeholder: 'Distance (e.g. 225 km)' },
                            { key: 'sightseeing', placeholder: 'Sightseeing time' },
                            { key: 'driving', placeholder: 'Driving time' },
                            { key: 'whatsapp_number', placeholder: 'WhatsApp number (e.g. 998995448223)' },
                            { key: 'whatsapp_message', placeholder: 'WhatsApp message (optional)' },
                        ].map(({ key, placeholder }) => (
                            <input key={key} placeholder={placeholder}
                                value={form[key as keyof typeof form]}
                                onChange={e => setForm({ ...form, [key]: e.target.value })}
                                style={inputStyle} />
                        ))}
                    </div>

                    {/* The New Description Text Box */}
                    <textarea
                        placeholder="Write the full tour description and itinerary here..."
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                        style={{ ...inputStyle, marginTop: 12, minHeight: 150, resize: 'vertical', fontFamily: 'inherit' }}
                    />

                    <button onClick={handleSave} style={{
                        marginTop: 16, padding: '14px 32px', borderRadius: 999,
                        border: 'none', background: 'var(--green)', color: 'white',
                        fontWeight: 800, cursor: 'pointer', width: '100%'
                    }}>{editingId ? 'Update Tour' : 'Save Tour'}</button>
                </div>
            )}

            {loading ? <p>Loading...</p> : (
                <div style={{ display: 'grid', gap: 14 }}>
                    {tours.length === 0 && <p style={{ color: 'var(--muted)' }}>No tours yet. Add your first one!</p>}
                    {tours.map(tour => (
                        <div key={tour.id} style={{
                            background: 'white', borderRadius: 20, padding: '20px 24px',
                            border: '1px solid var(--line)', boxShadow: 'var(--shadow)',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16
                        }}>
                            <div>
                                <p style={{ fontWeight: 800, fontSize: '1.05rem' }}>{tour.title}</p>
                                <p style={{ color: 'var(--muted)', fontSize: '.9rem' }}>
                                    {tour.discount_from_price && <s style={{ marginRight: 6 }}>{tour.discount_from_price}</s>}
                                    {tour.price} • {tour.duration}
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: 10 }}>
                                <button onClick={() => handleToggle(tour.id, tour.is_active)} style={{
                                    padding: '8px 18px', borderRadius: 999, border: 'none',
                                    background: tour.is_active ? '#22c55e' : '#9ca3af',
                                    color: 'white', fontWeight: 700, cursor: 'pointer'
                                }}>{tour.is_active ? 'Active' : 'Hidden'}</button>

                                <button onClick={() => handleEdit(tour)} style={{
                                    padding: '8px 18px', borderRadius: 999, border: 'none',
                                    background: '#3b82f6', color: 'white', fontWeight: 700, cursor: 'pointer'
                                }}>Edit</button>

                                <button onClick={() => handleDelete(tour.id)} style={{
                                    padding: '8px 18px', borderRadius: 999, border: 'none',
                                    background: '#ef4444', color: 'white', fontWeight: 700, cursor: 'pointer'
                                }}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}