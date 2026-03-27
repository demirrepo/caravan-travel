'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

type Price = { vehicle: string; capacity: string; price: string; discount_from_price?: string }
type Transfer = { id: string; route: string; duration: string; distance: string; is_active: boolean; transfer_prices: Price[] }

const emptyTransfer = { route: '', duration: '', distance: '' }
const defaultPrices = [
  { vehicle: 'Sedan', capacity: '1–3', price: '', discount_from_price: '' },
  { vehicle: 'SUV', capacity: '1–4', price: '', discount_from_price: '' },
  { vehicle: 'Minivan', capacity: '1–6', price: '', discount_from_price: '' },
]

export default function AdminTransfers() {
  const [transfers, setTransfers] = useState<Transfer[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyTransfer)
  const [prices, setPrices] = useState<Price[]>(defaultPrices)
  const [editingId, setEditingId] = useState<string | null>(null)

  async function fetch() {
    // Removed the problematic .order() here as discussed!
    const { data } = await supabase.from('transfers').select('*, transfer_prices(*)')
    setTransfers(data || [])
    setLoading(false)
  }

  useEffect(() => { fetch() }, [])

  async function handleSave() {
    if (!form.route) return alert('Route is required')

    // Helper function to format the prices array before saving
    const formatPrices = (transferId: string) => {
      return prices
        .filter(p => p.price) // Only keep rows where a price was entered
        .map(p => {
          // Auto-format main price
          let formattedPrice = p.price.trim();
          if (!formattedPrice.startsWith('$')) {
            formattedPrice = '$' + formattedPrice;
          }

          // Auto-format discount price
          let formattedDiscount = p.discount_from_price ? p.discount_from_price.trim() : '';
          if (formattedDiscount && !formattedDiscount.startsWith('$')) {
            formattedDiscount = '$' + formattedDiscount;
          }

          return {
            vehicle: p.vehicle,
            capacity: p.capacity,
            price: formattedPrice,
            discount_from_price: formattedDiscount,
            transfer_id: transferId
          };
        });
    };

    if (editingId) {
      // 1. Update the main transfer details
      await supabase.from('transfers').update(form).eq('id', editingId)

      // 2. Clear old prices and insert the newly formatted ones
      await supabase.from('transfer_prices').delete().eq('transfer_id', editingId)
      const priceRows = formatPrices(editingId);

      if (priceRows.length > 0) {
        await supabase.from('transfer_prices').insert(priceRows)
      }

    } else {
      // 1. Insert new transfer
      const { data } = await supabase.from('transfers').insert([{ ...form, is_active: true }]).select()

      // 2. Insert the formatted prices linked to the new transfer ID
      if (data && data[0]) {
        const priceRows = formatPrices(data[0].id);
        if (priceRows.length > 0) {
          await supabase.from('transfer_prices').insert(priceRows)
        }
      }
    }

    resetForm()
    fetch()
  }

  function handleEdit(t: Transfer) {
    setForm({ route: t.route, duration: t.duration, distance: t.distance })
    if (t.transfer_prices && t.transfer_prices.length > 0) {
      setPrices(t.transfer_prices.map(p => ({ vehicle: p.vehicle, capacity: p.capacity, price: p.price, discount_from_price: p.discount_from_price || '' })))
    } else {
      setPrices([{ vehicle: '', capacity: '', price: '', discount_from_price: '' }])
    }
    setEditingId(t.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this transfer?')) return
    await supabase.from('transfers').delete().eq('id', id)
    fetch()
  }

  function resetForm() {
    setForm(emptyTransfer)
    setPrices(defaultPrices)
    setEditingId(null)
    setShowForm(false)
  }

  const inputStyle: React.CSSProperties = {
    padding: '12px 14px', borderRadius: 10,
    border: '1px solid var(--line)', fontSize: '.95rem',
    outline: 'none', width: '100%'
  }

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>
      {/* Added mobile-col class */}
      <div className="mobile-col" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: 32 }}>
        <div style={{ width: '100%' }}>
          <Link href="/admin" style={{ color: 'var(--muted)', fontWeight: 700 }}>← Dashboard</Link>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: 4 }}>Manage Transfers</h1>
        </div>
        <button onClick={() => showForm ? resetForm() : setShowForm(true)} style={{
          padding: '12px 24px', borderRadius: 999, border: 'none',
          background: 'var(--green)', color: 'white', fontWeight: 800, cursor: 'pointer',
          whiteSpace: 'nowrap'
        }}>{showForm ? 'Cancel' : '+ Add Transfer'}</button>
      </div>

      {showForm && (
        <div style={{
          background: 'white', borderRadius: 24, padding: '28px 20px',
          border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 28
        }}>
          <h2 style={{ fontWeight: 800, marginBottom: 18 }}>
            {editingId ? 'Edit Transfer Route' : 'New Transfer Route'}
          </h2>
          <div style={{ display: 'grid', gap: 12 }}>
            <input placeholder="Route (e.g. Khiva ↔ Urgench Airport)" value={form.route}
              onChange={e => setForm({ ...form, route: e.target.value })} style={inputStyle} />
            {/* Applied responsive grid 2 */}
            <div className="responsive-grid-2">
              <input placeholder="Duration (e.g. 50 min)" value={form.duration}
                onChange={e => setForm({ ...form, duration: e.target.value })} style={inputStyle} />
              <input placeholder="Distance (e.g. 34 km)" value={form.distance}
                onChange={e => setForm({ ...form, distance: e.target.value })} style={inputStyle} />
            </div>

            <p style={{ fontWeight: 700, marginTop: 8 }}>Vehicle Prices</p>
            {prices.map((p, i) => (
              <div key={i} style={{
                padding: '12px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.05)', background: '#fafafa'
              }}>
                {/* Applied responsive grid 4, wrapped in a styled container for clarity on mobile */}
                <div className="responsive-grid-4">
                  <input placeholder="Vehicle" value={p.vehicle}
                    onChange={e => { const n = [...prices]; n[i].vehicle = e.target.value; setPrices(n) }} style={inputStyle} />
                  <input placeholder="Capacity" value={p.capacity}
                    onChange={e => { const n = [...prices]; n[i].capacity = e.target.value; setPrices(n) }} style={inputStyle} />
                  <input placeholder="Old Price" value={p.discount_from_price || ''}
                    onChange={e => { const n = [...prices]; n[i].discount_from_price = e.target.value; setPrices(n) }} style={inputStyle} />
                  <input placeholder="Current Price" value={p.price}
                    onChange={e => { const n = [...prices]; n[i].price = e.target.value; setPrices(n) }} style={inputStyle} />
                </div>
              </div>
            ))}
            <button onClick={() => setPrices([...prices, { vehicle: '', capacity: '', price: '', discount_from_price: '' }])}
              style={{
                padding: '10px', borderRadius: 10, border: '1px dashed var(--line)',
                background: 'transparent', cursor: 'pointer', fontWeight: 700, color: 'var(--muted)'
              }}>+ Add vehicle row</button>
          </div>
          <button onClick={handleSave} style={{
            marginTop: 16, padding: '14px 32px', borderRadius: 999,
            border: 'none', background: 'var(--green)', color: 'white',
            fontWeight: 800, cursor: 'pointer', width: '100%'
          }}>{editingId ? 'Update Transfer' : 'Save Transfer'}</button>
        </div>
      )}

      {loading ? <p>Loading...</p> : (
        <div style={{ display: 'grid', gap: 14 }}>
          {transfers.length === 0 && <p style={{ color: 'var(--muted)' }}>No transfers yet.</p>}
          {transfers.map(t => (
            <div key={t.id} className="mobile-col" style={{
              background: 'white', borderRadius: 20, padding: '20px 24px',
              border: '1px solid var(--line)', boxShadow: 'var(--shadow)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16
            }}>
              <div style={{ width: '100%' }}>
                <p style={{ fontWeight: 800 }}>{t.route}</p>
                <p style={{ color: 'var(--muted)', fontSize: '.9rem', marginTop: 4 }}>{t.duration} • {t.distance} • {t.transfer_prices?.length} vehicle types</p>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button onClick={() => handleEdit(t)} style={{
                  padding: '8px 18px', borderRadius: 999, border: 'none',
                  background: '#3b82f6', color: 'white', fontWeight: 700, cursor: 'pointer', flex: 1
                }}>Edit</button>

                <button onClick={() => handleDelete(t.id)} style={{
                  padding: '8px 18px', borderRadius: 999, border: 'none',
                  background: '#ef4444', color: 'white', fontWeight: 700, cursor: 'pointer', flex: 1
                }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}