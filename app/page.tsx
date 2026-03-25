import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: tours } = await supabase
    .from('tours').select('*').eq('is_active', true)

  const { data: transfers } = await supabase
    .from('transfers').select('*, transfer_prices(*)').eq('is_active', true)

  const { data: settings } = await supabase
    .from('site_settings').select('*').single()

  const waNumber = settings?.whatsapp_number || '998995448223'

  return (
    <>
      {/* HEADER */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 1000,
        backdropFilter: 'blur(14px)',
        background: 'rgba(255,250,244,0.84)',
        borderBottom: '1px solid rgba(120,90,45,0.08)'
      }}>
        <div className="container" style={{
          minHeight: 78, display: 'flex',
          alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap'
        }}>
          <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 800, fontSize: '1.15rem' }}>
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
          <nav style={{ display: 'flex', gap: 18, flexWrap: 'wrap', fontWeight: 700, color: '#4e4337' }}>
            <a href="#services">Services</a>
            <a href="#featured">Featured Tours</a>
            <a href="#transfers">Transfers</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
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
          gap: 32 // <-- Added the wide 32px gap back!
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
              <a href="#services" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                minHeight: 52, padding: '0 22px', borderRadius: 999,
                fontWeight: 800, color: 'white',
                background: 'rgba(255,255,255,.08)',
                border: '1px solid rgba(255,255,255,.32)'
              }}>Explore Services</a>
            </div>
          </div>

          <div style={{
            marginLeft: 'auto', // <-- Added this back to push the card to the far right!
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

      {/* SIGHTSEEING HIGHLIGHTS */}
      {/* (This section was already beautifully responsive because of flexWrap: 'wrap'!) */}
      <section id="highlights" style={{ padding: '84px 0', background: 'var(--bg-2)' }}>
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', letterSpacing: '-0.03em', marginBottom: 8, fontWeight: 700 }}>
              Khorezm Highlights
            </h2>
            <p style={{ color: 'var(--muted)', maxWidth: 760 }}>
              Discover the legendary desert fortresses of ancient Khorezm. These majestic ruins offer a glimpse into a civilization that thrived over two millennia ago.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div style={{
              flex: '1 1 500px', minHeight: 500, borderRadius: 24, position: 'relative',
              overflow: 'hidden', boxShadow: 'var(--shadow)',
              background: `url('/ayoz-qala.jpg') center/cover no-repeat`
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 40%, rgba(24,18,14,0.85) 100%)',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 32
              }}>
                <span style={{
                  background: 'var(--gold)', color: 'white', padding: '6px 12px',
                  borderRadius: 8, fontSize: '0.8rem', fontWeight: 800, width: 'fit-content', marginBottom: 12
                }}>Most Popular</span>
                <h3 style={{ color: 'white', fontSize: '2rem', fontWeight: 700, marginBottom: 8 }}>Ayoz Qal'a</h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', maxWidth: 400 }}>
                  A spectacular complex of three mud-brick fortresses offering stunning views of the Kyzylkum Desert.
                </p>
              </div>
            </div>

            <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{
                flex: 1, minHeight: 238, borderRadius: 24, position: 'relative',
                overflow: 'hidden', boxShadow: 'var(--shadow)',
                background: `url('/tuproq-qala.jpg') center/cover no-repeat`
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, transparent 30%, rgba(24,18,14,0.85) 100%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 24
                }}>
                  <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, marginBottom: 4 }}>Tuproq Qal'a</h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem' }}>
                    The ancient royal residence and capital of Khorezm.
                  </p>
                </div>
              </div>

              <div style={{
                flex: 1, minHeight: 238, borderRadius: 24, position: 'relative',
                overflow: 'hidden', boxShadow: 'var(--shadow)',
                background: `url('/qizil-qala.jpg') center/cover no-repeat`
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, transparent 30%, rgba(24,18,14,0.85) 100%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 24
                }}>
                  <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, marginBottom: 4 }}>Qizil Qal'a</h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem' }}>
                    The "Red Fortress," an exceptionally well-preserved defensive garrison.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TOURS */}
      <section id="featured" style={{
        padding: '84px 0', background: 'rgba(255,255,255,.38)',
        borderTop: '1px solid rgba(120,90,45,0.08)',
        borderBottom: '1px solid rgba(120,90,45,0.08)'
      }}>
        <div className="container">
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', letterSpacing: '-0.03em', marginBottom: 8, fontWeight: 600 }}>
              Featured tours
            </h2>
            <p style={{ color: 'var(--muted)', maxWidth: 760 }}>
              Book any tour directly via WhatsApp. All tours are private and customizable.
            </p>
          </div>

          {/* Swapped inline grid for responsive-grid-3 */}
          <div className="responsive-grid-3">
            {tours && tours.map(tour => (
              <article key={tour.id} style={{
                background: 'white', borderRadius: 24, padding: 22,
                boxShadow: 'var(--shadow)', border: '1px solid var(--line)',
                display: 'flex', flexDirection: 'column', gap: 18
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 14 }}>
                  <h3 style={{ fontSize: '1.25rem', lineHeight: 1.35, fontWeight: 550 }}>{tour.title}</h3>
                  <div style={{
                    whiteSpace: 'nowrap', background: 'rgba(31,166,74,.08)',
                    border: '1px solid rgba(31,166,74,.12)',
                    padding: '8px 14px', borderRadius: 999,
                    display: 'flex', alignItems: 'center', gap: '8px'
                  }}>
                    {tour.discount_from_price && (
                      <s style={{ color: 'var(--muted)', fontSize: '0.85em' }}>{tour.discount_from_price}</s>
                    )}
                    <span style={{ color: '#16863b', fontWeight: 800 }}>{tour.price}</span>
                  </div>
                </div>

                {/* Swapped inline grid for responsive-grid-2 inside the cards */}
                <div className="responsive-grid-2" style={{ display: 'grid', gap: 12 }}>
                  {tour.duration && <div style={{ background: '#fcfaf7', border: '1px solid var(--line)', borderRadius: 18, padding: 14 }}>
                    <small style={{ display: 'block', color: 'var(--muted)', marginBottom: 4 }}>Duration</small>
                    <strong>{tour.duration}</strong>
                  </div>}
                  {tour.distance && <div style={{ background: '#fcfaf7', border: '1px solid var(--line)', borderRadius: 18, padding: 14 }}>
                    <small style={{ display: 'block', color: 'var(--muted)', marginBottom: 4 }}>Distance</small>
                    <strong>{tour.distance}</strong>
                  </div>}
                  {tour.sightseeing && <div style={{ background: '#fcfaf7', border: '1px solid var(--line)', borderRadius: 18, padding: 14 }}>
                    <small style={{ display: 'block', color: 'var(--muted)', marginBottom: 4 }}>Sightseeing</small>
                    <strong>{tour.sightseeing}</strong>
                  </div>}
                  {tour.driving && <div style={{ background: '#fcfaf7', border: '1px solid var(--line)', borderRadius: 18, padding: 14 }}>
                    <small style={{ display: 'block', color: 'var(--muted)', marginBottom: 4 }}>Driving</small>
                    <strong>{tour.driving}</strong>
                  </div>}
                </div>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 'auto' }}>
                  <a href={`https://wa.me/${tour.whatsapp_number}?text=${encodeURIComponent(tour.whatsapp_message || `Hello I want to book ${tour.title}`)}`}
                    target="_blank"
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      minHeight: 52, padding: '0 22px', borderRadius: 999, flex: 1,
                      fontWeight: 800, background: 'var(--green)', color: 'white'
                    }}>Book now</a>
                  <a href="#contact" style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    minHeight: 52, padding: '0 22px', borderRadius: 999, flex: 1,
                    fontWeight: 800, background: '#fff7eb', color: 'var(--gold-dark)',
                    border: '1px solid rgba(193,145,59,.16)'
                  }}>Ask details</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSFERS */}
      <section id="transfers" style={{ padding: '84px 0' }}>
        <div className="container">
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', letterSpacing: '-0.03em', marginBottom: 8, fontWeight: 600 }}>
              Private transfers
            </h2>
            <p style={{ color: 'var(--muted)', maxWidth: 760 }}>
              Reliable transfers to airports, train stations, and cities across the region.
            </p>
          </div>

          {/* Swapped inline grid for responsive-grid-3 */}
          <div className="responsive-grid-3">
            {transfers && transfers.map((transfer: any) => (
              <article key={transfer.id} style={{
                background: 'linear-gradient(180deg, #fffefd, #fff8ef)',
                border: '1px solid rgba(193,145,59,.14)',
                borderRadius: 24, padding: 24,
                boxShadow: 'var(--shadow)'
              }}>
                <h3 style={{ fontSize: '1.28rem', lineHeight: 1.35, marginBottom: 14, fontWeight: 550 }}>{transfer.route}</h3>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
                  {transfer.duration && <span style={{
                    padding: '8px 12px', borderRadius: 999,
                    background: 'rgba(193,145,59,.08)',
                    color: 'var(--gold-dark)', fontSize: '.9rem', fontWeight: 700
                  }}>{transfer.duration}</span>}
                  {transfer.distance && <span style={{
                    padding: '8px 12px', borderRadius: 999,
                    background: 'rgba(193,145,59,.08)',
                    color: 'var(--gold-dark)', fontSize: '.9rem', fontWeight: 700
                  }}>{transfer.distance}</span>}
                </div>
                <ul style={{ listStyle: 'none', display: 'grid', gap: 10, marginTop: 18 }}>
                  {transfer.transfer_prices && transfer.transfer_prices.map((p: any) => (
                    <li key={p.id} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
                      padding: '12px 14px', borderRadius: 16,
                      border: '1px solid var(--line)',
                      background: 'rgba(255,255,255,.86)', fontWeight: 700
                    }}>
                      <span>{p.vehicle} ({p.capacity})</span>
                      <div>
                        {p.discount_from_price && (
                          <s style={{ color: 'var(--muted)', fontSize: '0.85em', marginRight: '8px', fontWeight: 'normal' }}>
                            {p.discount_from_price}
                          </s>
                        )}
                        <b style={{ color: '#c91d1d' }}>{p.price}</b>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & LOCATION */}
      <section id="contact" style={{ padding: '84px 0' }}>
        <div className="container responsive-grid-2" style={{ alignItems: 'stretch' }}>
          <div style={{
            borderRadius: 28, padding: 40,
            background: 'white', border: '1px solid var(--line)',
            boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'flex-start',
            gap: 24, minHeight: 380
          }}>
            <div>
              <h3 style={{ fontSize: '2.2rem', marginBottom: 12, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em' }}>
                Ready to book?
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: 400 }}>
                Contact us on WhatsApp and we'll get back to you immediately to arrange your perfect trip.
              </p>
            </div>
            <a href={`https://wa.me/${waNumber}?text=Hello I want to book a tour from your website`}
              target="_blank"
              style={{
                display: 'inline-flex', alignItems: 'center',
                minHeight: 52, padding: '0 28px', borderRadius: 999,
                fontWeight: 800, background: 'var(--green)', color: 'white',
                fontSize: '1.05rem', boxShadow: '0 12px 28px rgba(31,166,74,.24)'
              }}>Contact on WhatsApp</a>
          </div>

          <div style={{
            width: '100%', minHeight: 380, borderRadius: 28, overflow: 'hidden',
            boxShadow: 'var(--shadow)', border: '1px solid var(--line)', background: '#eaeaea',
            display: 'flex'
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.6795794420586!2d60.35960060000001!3d41.381045799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41dfa5899de77379%3A0x34094adfcfaa4acb!2sCaravan%20Hotel!5e0!3m2!1sen!2s!4v1774465345254!5m2!1sen!2s"
              width="100%" height="100%" style={{ border: 0, flexGrow: 1 }}
              allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign: 'center', color: 'var(--muted)', padding: '30px 16px 48px', fontWeight: 600 }}>
        {settings?.footer_text || '© 2026 Caravan Travel • Zhargarlar 22, Khiva'} • {settings?.email}
      </footer>

      {/* WHATSAPP FLOAT */}
      <a href={`https://wa.me/${waNumber}?text=Hello I want to book a tour`}
        target="_blank"
        style={{
          position: 'fixed', right: 18, bottom: 18,
          width: 58, height: 58, borderRadius: '50%',
          display: 'grid', placeItems: 'center',
          background: 'var(--green)', color: 'white',
          boxShadow: '0 12px 28px rgba(31,166,74,.26)',
          fontSize: 28, zIndex: 999
        }}>✆</a>
    </>
  )
}