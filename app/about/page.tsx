import Navbar from '@/components/Navbar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Us | Caravan Trips Khiva',
    description: 'Learn about Caravan Trips, your trusted local travel experts for authentic tours and transfers across Uzbekistan and the ancient Silk Road.',
}

export default function AboutPage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#fdfbf7', color: '#1a1a1a' }}>
            <Navbar />

            {/* Container: Added clamp() to top/bottom padding so it shrinks on mobile */}
            <div className="container" style={{
                paddingTop: 'clamp(90px, 10vw, 120px)',
                paddingBottom: 'clamp(50px, 8vw, 80px)',
                maxWidth: '800px',
                margin: '0 auto',
                paddingLeft: 'clamp(16px, 5vw, 24px)', // Added safe side padding for mobile
                paddingRight: 'clamp(16px, 5vw, 24px)'
            }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 60px)' }}>
                    <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 800, marginBottom: '24px', color: '#111', lineHeight: 1.1 }}>
                        🌍 About Caravan Trips
                    </h1>
                    <p style={{ fontSize: 'clamp(1.05rem, 3vw, 1.2rem)', lineHeight: '1.8', color: '#555' }}>
                        At Caravan Trips, we specialize in creating unforgettable journeys across Uzbekistan and the heart of Central Asia. Inspired by the ancient Silk Road, our mission is to connect travelers with the region’s rich history, vibrant culture, and authentic local experiences.
                    </p>
                </div>

                {/* Who We Are */}
                <section style={{ marginBottom: 'clamp(30px, 6vw, 40px)' }}>
                    <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '16px', color: '#222', borderBottom: '2px solid rgba(193,145,59,.15)', paddingBottom: '8px' }}>
                        ✨ Who We Are
                    </h2>
                    <p style={{ fontSize: 'clamp(1rem, 3vw, 1.1rem)', lineHeight: '1.8', color: '#333', marginBottom: '16px' }}>
                        We are a locally based team passionate about showing the real beauty of cities like Samarkand, Bukhara, and Khiva — not just as destinations, but as living stories shaped over centuries. Caravan Trips was founded by young, motivated travel professionals who understand what modern travelers expect:
                    </p>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        {/* Made badges slightly smaller on mobile */}
                        <span style={{ background: 'rgba(193,145,59,.1)', padding: 'clamp(6px, 2vw, 8px) clamp(12px, 3vw, 16px)', borderRadius: '8px', fontWeight: 600, color: '#b8860b', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>✔️ Comfort</span>
                        <span style={{ background: 'rgba(193,145,59,.1)', padding: 'clamp(6px, 2vw, 8px) clamp(12px, 3vw, 16px)', borderRadius: '8px', fontWeight: 600, color: '#b8860b', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>✔️ Authenticity</span>
                        <span style={{ background: 'rgba(193,145,59,.1)', padding: 'clamp(6px, 2vw, 8px) clamp(12px, 3vw, 16px)', borderRadius: '8px', fontWeight: 600, color: '#b8860b', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>✔️ Reliability</span>
                    </div>
                    <p style={{ fontSize: 'clamp(1rem, 3vw, 1.1rem)', lineHeight: '1.8', color: '#333' }}>
                        We combine local knowledge with international standards to ensure every guest feels safe, informed, and inspired throughout their journey.
                    </p>
                </section>

                {/* Why Choose Us - Grid Layout */}
                <section style={{ marginBottom: 'clamp(30px, 6vw, 40px)' }}>
                    <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '24px', color: '#222', borderBottom: '2px solid rgba(193,145,59,.15)', paddingBottom: '8px' }}>
                        🤝 Why Travelers Choose Us
                    </h2>
                    {/* Changed minmax from 300px to 250px so it fits better on narrow phone screens */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>

                        <div style={{ background: 'white', padding: 'clamp(16px, 4vw, 24px)', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid rgba(193,145,59,.1)' }}>
                            <h3 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.2rem)', marginBottom: '8px', color: '#111' }}>📍 Local Expertise</h3>
                            <p style={{ color: '#555', lineHeight: '1.6', fontSize: 'clamp(0.95rem, 2vw, 1rem)' }}>We are based in Uzbekistan and know every destination personally — from famous landmarks to hidden gems.</p>
                        </div>

                        <div style={{ background: 'white', padding: 'clamp(16px, 4vw, 24px)', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid rgba(193,145,59,.1)' }}>
                            <h3 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.2rem)', marginBottom: '8px', color: '#111' }}>🎯 Personalized Service</h3>
                            <p style={{ color: '#555', lineHeight: '1.6', fontSize: 'clamp(0.95rem, 2vw, 1rem)' }}>Every traveler is different. We tailor each itinerary to match your interests, time, and budget.</p>
                        </div>

                        <div style={{ background: 'white', padding: 'clamp(16px, 4vw, 24px)', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid rgba(193,145,59,.1)' }}>
                            <h3 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.2rem)', marginBottom: '8px', color: '#111' }}>⚡ Fast Communication</h3>
                            <p style={{ color: '#555', lineHeight: '1.6', fontSize: 'clamp(0.95rem, 2vw, 1rem)' }}>We respond quickly via WhatsApp, email, and phone — because your time matters.</p>
                        </div>

                        <div style={{ background: 'white', padding: 'clamp(16px, 4vw, 24px)', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid rgba(193,145,59,.1)' }}>
                            <h3 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.2rem)', marginBottom: '8px', color: '#111' }}>🛡️ Trusted Partners</h3>
                            <p style={{ color: '#555', lineHeight: '1.6', fontSize: 'clamp(0.95rem, 2vw, 1rem)' }}>We work with carefully selected hotels, guides, and drivers to guarantee quality service.</p>
                        </div>

                    </div>
                </section>

                {/* Experience & Mission */}
                <section style={{ marginBottom: 'clamp(40px, 8vw, 60px)' }}>
                    <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '16px', color: '#222', borderBottom: '2px solid rgba(193,145,59,.15)', paddingBottom: '8px' }}>
                        🏜️ Our Experience & 🌟 Mission
                    </h2>
                    <p style={{ fontSize: 'clamp(1rem, 3vw, 1.1rem)', lineHeight: '1.8', color: '#333', marginBottom: '16px' }}>
                        Our team has experience organizing cultural tours, city excursions, and desert adventures across Uzbekistan, including routes connecting Tashkent, Samarkand, Bukhara, and Khiva. From short city breaks to full Silk Road journeys, we focus on delivering smooth, well-organized, and memorable travel experiences.
                    </p>
                    <div style={{ background: 'var(--gold, #d4af37)', padding: 'clamp(16px, 4vw, 24px)', borderRadius: '16px', color: 'black' }}>
                        <p style={{ fontSize: 'clamp(1.05rem, 3vw, 1.2rem)', fontWeight: 600, fontStyle: 'italic', margin: 0, lineHeight: 1.6 }}>
                            "To make your trip to Uzbekistan easy, enjoyable, and unforgettable. We believe travel should be more than just sightseeing — it should be a meaningful experience that stays with you for a lifetime."
                        </p>
                    </div>
                </section>

                {/* Call to Action */}
                <div style={{ textAlign: 'center', background: 'white', padding: 'clamp(24px, 6vw, 40px) clamp(16px, 4vw, 40px)', borderRadius: '24px', boxShadow: '0 12px 30px rgba(0,0,0,0.04)', border: '1px solid rgba(193,145,59,.2)' }}>
                    <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '16px', color: '#111' }}>📲 Let’s Plan Your Journey</h2>
                    <p style={{ fontSize: 'clamp(1rem, 3vw, 1.1rem)', color: '#555', marginBottom: '24px' }}>
                        Whether you are traveling solo, with friends, or in a group, we are here to help you explore Central Asia with confidence.
                    </p>
                    <a
                        href="https://wa.me/998993806860" // UPDATE THIS WITH CLIENTS REAL NUMBER
                        target="_blank"
                        style={{
                            display: 'inline-flex', justifyContent: 'center', alignItems: 'center',
                            padding: '16px clamp(20px, 5vw, 32px)', borderRadius: '999px',
                            background: 'var(--green, #25D366)', color: 'white',
                            fontWeight: 800, textDecoration: 'none', fontSize: 'clamp(1.05rem, 3vw, 1.2rem)',
                            boxShadow: '0 8px 20px rgba(37, 211, 102, 0.2)',
                            width: '100%', // Makes the button take up full width on very small screens
                            maxWidth: '350px' // But stops it from getting too wide
                        }}
                    >
                        Contact Us on WhatsApp
                    </a>
                </div>

            </div>
        </main>
    )
}