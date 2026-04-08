// components/Hero.tsx
export default function Hero({ tours, waNumber }: { tours: any[], waNumber: string }) {
    return (
        <section id="home" style={{
            position: 'relative', minHeight: '92vh',
            display: 'flex', alignItems: 'center',
            overflow: 'hidden', color: 'white',
            background: `linear-gradient(90deg, rgba(24,18,14,.82) 0%, rgba(24,18,14,.52) 42%, rgba(24,18,14,.18) 100%),
        url('/khiva.jpg') center/cover no-repeat`
        }}>
            <div className="container responsive-grid-2" style={{
                position: 'relative', zIndex: 1,
                alignItems: 'center', padding: '56px 0 70px',
                gap: 32
            }}>
                <div>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '10px 16px', borderRadius: 999,
                        background: 'rgba(255,255,255,.12)',
                        border: '1px solid rgba(255,255,255,.14)',
                        fontWeight: 700, marginBottom: 18
                    }}>UNESCO-listed Ichan Kala • Khiva, Uzbekistan</div>

                    <h1 style={{
                        fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
                        lineHeight: 1.02, letterSpacing: '-0.04em',
                        marginBottom: 16, maxWidth: 760
                    }}>Discover ancient Khiva with premium tours and transfers</h1>

                    <p style={{ fontSize: '1.08rem', color: 'rgba(255,255,255,.88)', maxWidth: 650 }}>
                        Explore fortress routes, desert adventures, comfortable private transfers,
                        two-day yurt camp tours, and guided walks inside the legendary old city of Khiva.
                    </p>

                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 28 }}>
                        <a href={`https://wa.me/${waNumber}?text=Hello I want to book a tour`}
                            target="_blank"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 10,
                                minHeight: 52, padding: '0 22px', borderRadius: 999,
                                fontWeight: 800, background: 'var(--green)', color: 'white',
                                boxShadow: '0 12px 28px rgba(31,166,74,.24)'
                            }}>Book on WhatsApp</a>
                        <a href="#featured" style={{
                            display: 'inline-flex', alignItems: 'center', gap: 10,
                            minHeight: 52, padding: '0 22px', borderRadius: 999,
                            fontWeight: 800, color: 'white',
                            background: 'rgba(255,255,255,.08)',
                            border: '1px solid rgba(255,255,255,.32)'
                        }}>Explore Services</a>
                    </div>
                </div>

                <div className="mobile-center" style={{
                    marginLeft: 'auto',
                    maxWidth: 430, width: '100%',
                    background: 'rgba(255,255,255,.12)',
                    border: '1px solid rgba(255,255,255,.18)',
                    borderRadius: 28, padding: 22,
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 20px 50px rgba(0,0,0,.18)'
                }}>
                    <h3 style={{ fontSize: '1.45rem', marginBottom: 8 }}>Most popular services</h3>
                    <p style={{ fontSize: '.97rem', color: 'rgba(255,255,255,.84)', marginBottom: 16 }}>
                        Book any tour or transfer directly via WhatsApp.
                    </p>
                    <div style={{ display: 'grid', gap: 12 }}>
                        {tours && tours.slice(0, 6).map(tour => (
                            <div key={tour.id} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14,
                                background: 'rgba(255,255,255,.08)',
                                border: '1px solid rgba(255,255,255,.10)',
                                borderRadius: 18, padding: '14px 16px'
                            }}>
                                <strong>{tour.title}</strong>
                                <div style={{ textAlign: 'right' }}>
                                    {tour.discount_from_price && (
                                        <s style={{ color: 'rgba(255,255,255,.6)', fontSize: '0.85em', marginRight: '6px' }}>
                                            {tour.discount_from_price}
                                        </s>
                                    )}
                                    <span style={{ color: 'white', fontWeight: 700 }}>{tour.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}