import React from 'react';
import OngoingPoolMap from '../../components/OngoingPoolMap';

const Confirmed = () => (
  <div style={{ width: '100%', maxWidth: 950, margin: '0 auto', marginTop: '2.5rem', background: '#f7faff', border: '2px solid #1fa9ff', borderRadius: 22, boxShadow: '0 4px 24px rgba(31,169,255,0.10)', padding: '2.5rem 2.5rem 2rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '2.2rem' }}>
    {/* Title and status */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=320&q=80" alt="Confirmed Pool" style={{ width: 180, height: 120, objectFit: 'cover', borderRadius: 16, border: '2px solid #1fa9ff' }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 800, color: '#1fa9ff', fontSize: '2rem', marginBottom: 4 }}>Highlands Adventure (Confirmed)</div>
        <div style={{ color: '#4a5a6a', fontSize: '1.15rem', marginBottom: 2 }}><b>Destinations:</b> Kandy, Nuwara Eliya, Ella</div>
        <div style={{ color: '#223040', fontSize: '1.08rem', marginBottom: 2 }}><b>Date:</b> 2025-07-15</div>
        <div style={{ color: '#223040', fontSize: '1.08rem', marginBottom: 2 }}><b>Status:</b> <span style={{ color: '#1fa9ff', fontWeight: 700 }}>Confirmed</span></div>
        <div style={{ color: '#223040', fontSize: '1.08rem', marginBottom: 2 }}><b>Participants:</b> 6/6</div>
        <div style={{ color: '#223040', fontSize: '1.08rem', marginBottom: 2 }}><b>Guide:</b> Michael Guide</div>
        <div style={{ color: '#223040', fontSize: '1.08rem' }}><b>Driver:</b> Priyantha Driver</div>
      </div>
    </div>
    {/* Payment Status */}
    <div>
      <div style={{ fontWeight: 700, color: '#223040', fontSize: '1.15rem', marginBottom: 10 }}>Payment Status</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
        {/* Only show pool members, not guide/driver. Add progress bars. */}
        {[
          { name: 'John Doe', amount: 20000, paid: 20000, status: 'Paid', method: 'Credit Card' },
          { name: 'Jane Smith', amount: 20000, paid: 15000, status: 'Partial', method: 'Credit Card' },
          { name: 'Sam Perera', amount: 20000, paid: 20000, status: 'Paid', method: 'Bank Transfer' },
          { name: 'Ayesha Fernando', amount: 20000, paid: 5000, status: 'Partial', method: 'Credit Card' }
        ].map((p, i) => {
          const percent = Math.round((p.paid / p.amount) * 100);
          return (
            <div key={p.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', background: '#fff', border: '1.5px solid #e3e8ee', borderRadius: 8, padding: '0.7rem 1.2rem', minWidth: 260, marginBottom: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <span style={{ fontWeight: 700, color: '#223040', minWidth: 120 }}>{p.name}</span>
                <span style={{ color: '#223040', fontSize: '1.08rem', minWidth: 90 }}><b>Amount:</b> Rs. {p.amount.toLocaleString()}</span>
                <span style={{ color: p.status === 'Paid' ? '#1fa9ff' : '#ffb300', fontWeight: 700, fontSize: '1.08rem', background: p.status === 'Paid' ? '#e6f6fd' : '#fffbe6', borderRadius: 8, padding: '0.3rem 0.9rem', border: p.status === 'Paid' ? '1.5px solid #b3e6ff' : '1.5px solid #ffe6a1' }}>{p.status === 'Paid' ? 'Paid' : 'Partial'}</span>
                <span style={{ color: '#223040', fontSize: '1.08rem', minWidth: 90 }}><b>Method:</b> {p.method}</span>
              </div>
              <div style={{ width: '100%', background: '#e3e8ee', borderRadius: 6, height: 10, marginTop: 2, position: 'relative' }}>
                <div style={{ width: `${percent}%`, background: percent === 100 ? '#1fa9ff' : '#ffb300', height: '100%', borderRadius: 6, transition: 'width 0.4s' }}></div>
                <span style={{ position: 'absolute', right: 10, top: -18, fontSize: '0.95rem', color: '#223040', fontWeight: 600 }}>{percent}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    {/* Itinerary Timeline */}
    <div>
      <div style={{ fontWeight: 700, color: '#223040', fontSize: '1.15rem', marginBottom: 10 }}>Itinerary</div>
      <div className="itinerary-timeline" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0 }}>
        {["Kandy", "Nuwara Eliya", "Ella"].map((dest, idx, arr) => (
          <React.Fragment key={dest}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 110 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#1fa9ff', border: '3px solid #fff', boxShadow: '0 0 0 2px #1fa9ff', marginBottom: 6 }}></div>
              <span style={{ fontSize: '1.08rem', color: '#223040', fontWeight: 600 }}>{dest}</span>
            </div>
            {idx < arr.length - 1 && (
              <div style={{ flex: 1, height: 5, background: 'linear-gradient(90deg, #1fa9ff 60%, #e3e8ee 100%)', minWidth: 50, maxWidth: 100, margin: '0 4px', borderRadius: 2 }}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
    {/* Map */}
    <div>
      <div style={{ fontWeight: 700, color: '#223040', fontSize: '1.15rem', marginBottom: 10 }}>Route Map</div>
      <OngoingPoolMap />
    </div>
    {/* Participants */}
    <div>
      <div style={{ fontWeight: 700, color: '#223040', fontSize: '1.15rem', marginBottom: 10 }}>Participants</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
        {[{ name: 'John Doe', role: 'Owner', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
          { name: 'Jane Smith', role: 'Traveler', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
          { name: 'Sam Perera', role: 'Traveler', img: 'https://randomuser.me/api/portraits/men/45.jpg' },
          { name: 'Ayesha Fernando', role: 'Traveler', img: 'https://randomuser.me/api/portraits/women/46.jpg' },
          { name: 'Michael Guide', role: 'Guide', img: 'https://randomuser.me/api/portraits/men/47.jpg' },
          { name: 'Priyantha Driver', role: 'Driver', img: 'https://randomuser.me/api/portraits/men/48.jpg' }
        ].map((p, i) => (
          <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', background: '#fff', border: '1.5px solid #e3e8ee', borderRadius: 12, padding: '0.7rem 1.2rem', minWidth: 180 }}>
            <img src={p.img} alt={p.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: p.role === 'Guide' ? '2px solid #ffb300' : p.role === 'Driver' ? '2px solid #d11f1f' : '2px solid #1fa9ff' }} />
            <div>
              <div style={{ fontWeight: 700, color: '#223040', fontSize: '1.08rem' }}>{p.name}</div>
              <div style={{ color: p.role === 'Guide' ? '#ffb300' : p.role === 'Driver' ? '#d11f1f' : '#1fa9ff', fontWeight: 600, fontSize: '0.98rem' }}>{p.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* Description/Notes */}
    <div>
      <div style={{ fontWeight: 700, color: '#223040', fontSize: '1.15rem', marginBottom: 10 }}>Notes</div>
      <div style={{ color: '#4a5a6a', fontSize: '1.08rem', background: '#fafdff', borderRadius: 10, padding: '1rem 1.2rem', border: '1.5px solid #e3e8ee' }}>
        All participants, please check your emails for the final itinerary and pickup times. Payment has been received for all travelers. Contact the guide or driver for any last-minute questions.
      </div>
    </div>
  </div>
);

export default Confirmed;