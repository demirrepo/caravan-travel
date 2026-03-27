import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import { notFound } from 'next/navigation'

// Keep the revalidate at 60 so it stays lightning fast!
export const revalidate = 60

export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const { data: tour } = await supabase
        .from('tours')
        .select('*')
        .eq('slug', slug)
        .single()

    if (!tour) {
        notFound()
    }

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#fdfbf7', color: '#1a1a1a' }}>
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
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, fontWeight: 800, marginBottom: '16px', color: '#111' }}>
                        {tour.title}
                    </h1>
                    <p style={{ color: '#555', fontSize: '1.1rem', fontWeight: 500 }}>
                        Duration: {tour.duration} {tour.distance && `• Distance: ${tour.distance}`}
                    </p>
                </div>

                {/* Two-Column Layout for Desktop */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>

                    {/* Left: The Description */}
                    <div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', borderBottom: '2px solid rgba(193,145,59,.15)', paddingBottom: '12px', color: '#222' }}>
                            Tour Details & Itinerary
                        </h2>
                        <div style={{
                            fontSize: '1.1rem',
                            lineHeight: '1.8',
                            color: '#333',
                            whiteSpace: 'pre-wrap'
                        }}>
                            {tour.description || "Detailed description coming soon..."}
                        </div>
                    </div>

                    {/* Right: Booking Card */}
                    <div>
                        <div style={{
                            background: 'white',
                            border: '1px solid rgba(193,145,59,.2)',
                            borderRadius: '24px',
                            padding: '32px',
                            position: 'sticky',
                            top: '100px',
                            boxShadow: '0 12px 30px rgba(0,0,0,0.04)'
                        }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', color: '#111' }}>Book This Tour</h3>
                            <p style={{ color: '#555', marginBottom: '24px', lineHeight: '1.5' }}>
                                Contact us directly on WhatsApp to check availability and book your dates.
                            </p>
                            <a
                                href={`https://wa.me/${tour.whatsapp_number}?text=Hello, I am interested in the ${tour.title}`}
                                target="_blank"
                                style={{
                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    padding: '16px 24px', borderRadius: '999px',
                                    background: 'var(--green, #25D366)', color: 'white',
                                    fontWeight: 800, textDecoration: 'none', fontSize: '1.1rem',
                                    boxShadow: '0 8px 20px rgba(37, 211, 102, 0.2)'
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