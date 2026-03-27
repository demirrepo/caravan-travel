import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import { notFound } from 'next/navigation'

// This prevents Next.js from aggressively caching the page, ensuring fresh data
export const revalidate = 0

export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) {
    // 1. Unwrap the params promise (Required for Next.js 15+)
    const { slug } = await params;

    // 2. Fetch the specific tour using the unwrapped slug
    const { data: tour } = await supabase
        .from('tours')
        .select('*')
        .eq('slug', slug)
        .single()

    // 3. If the tour doesn't exist, show a 404 page
    if (!tour) {
        notFound()
    }

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#18120e', color: 'white' }}>
            <Navbar />

            <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
                {/* Header Section */}
                <div style={{ marginBottom: '40px' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        background: 'var(--gold, #d4af37)',
                        color: 'black',
                        fontWeight: 800,
                        borderRadius: '8px',
                        marginBottom: '16px'
                    }}>
                        {tour.price}
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, fontWeight: 800, marginBottom: '16px' }}>
                        {tour.title}
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}>
                        Duration: {tour.duration} {tour.distance && `• Distance: ${tour.distance}`}
                    </p>
                </div>

                {/* Two-Column Layout for Desktop */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>

                    {/* Left: The Description */}
                    <div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
                            Tour Details & Itinerary
                        </h2>
                        <div style={{
                            fontSize: '1.1rem',
                            lineHeight: '1.8',
                            color: 'rgba(255,255,255,0.85)',
                            whiteSpace: 'pre-wrap' // This makes sure paragraph breaks from the admin panel actually show up!
                        }}>
                            {tour.description || "Detailed description coming soon..."}
                        </div>
                    </div>

                    {/* Right: Booking Card */}
                    <div>
                        <div style={{
                            background: 'rgba(255,255,255,.05)',
                            border: '1px solid rgba(255,255,255,.1)',
                            borderRadius: '24px',
                            padding: '32px',
                            position: 'sticky',
                            top: '100px'
                        }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Book This Tour</h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px', lineHeight: '1.5' }}>
                                Contact us directly on WhatsApp to check availability and book your dates.
                            </p>
                            <a
                                href={`https://wa.me/${tour.whatsapp_number}?text=Hello, I am interested in the ${tour.title}`}
                                target="_blank"
                                style={{
                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    padding: '16px 24px', borderRadius: '999px',
                                    background: 'var(--green, #25D366)', color: 'white',
                                    fontWeight: 800, textDecoration: 'none', fontSize: '1.1rem'
                                }}
                            >
                                Message on WhatsApp
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}