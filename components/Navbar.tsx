'use client'

import { useState } from 'react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    // This ensures the menu closes automatically when a user clicks a link!
    const closeMenu = () => setIsOpen(false)

    return (
        <header style={{
            position: 'sticky', top: 0, zIndex: 1000,
            backdropFilter: 'blur(14px)',
            background: 'rgba(255,250,244,0.84)',
            borderBottom: '1px solid rgba(120,90,45,0.08)'
        }}>
            <div className="container" style={{
                minHeight: 78, display: 'flex',
                alignItems: 'center', justifyContent: 'space-between', gap: 24
            }}>
                {/* LOGO */}
                <a href="#home" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 800, fontSize: '1.15rem' }}>
                    <div style={{
                        width: 46, height: 46, borderRadius: 14,
                        background: 'linear-gradient(135deg, var(--gold), #e8be65)',
                        color: 'white', display: 'grid', placeItems: 'center', fontSize: 22
                    }}>✦</div>
                    <div>
                        Caravan Travel
                        <small style={{ display: 'block', fontSize: '.82rem', color: 'var(--muted)', fontWeight: 600 }}>
                            Tours, Transfers & Historical Adventures
                        </small>
                    </div>
                </a>

                {/* HAMBURGER BUTTON (Only visible on mobile) */}
                <button
                    className="hamburger-btn"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ background: 'none', border: 'none', fontSize: 26, cursor: 'pointer', color: 'var(--text)' }}
                >
                    {isOpen ? '✕' : '☰'}
                </button>

                {/* NAV LINKS */}
                <nav className={`nav-menu ${isOpen ? 'open' : ''}`} style={{ fontWeight: 700, color: '#4e4337' }}>
                    <a href="#highlights" onClick={closeMenu}>Services</a>
                    <a href="#featured" onClick={closeMenu}>Featured Tours</a>
                    <a href="#transfers" onClick={closeMenu}>Transfers</a>
                    <a href="#contact" onClick={closeMenu}>Contact</a>
                </nav>
            </div>
        </header>
    )
}