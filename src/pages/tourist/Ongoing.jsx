import React from 'react';
import OngoingPoolMap from '../../components/OngoingPoolMap';

const Ongoing = () => (
  <div style={{ width: '100%', maxWidth: 950, margin: '0 auto', marginTop: '2.5rem', background: '#f3fcf6', border: '2px solid #27ae60', borderRadius: 22, boxShadow: '0 4px 24px rgba(39,174,96,0.10)', padding: '2.5rem 2.5rem 2rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '2.2rem' }}>
    {/* Title and status */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=320&q=80" alt="Ongoing Pool" style={{ width: 180, height: 120, objectFit: 'cover', borderRadius: 16, border: '2px solid #27ae60' }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 800, color: '#27ae60', fontSize: '2rem', marginBottom: 4 }}>Highlands Adventure</div>
        <div style={{ color: '#4a5a6a', fontSize: '1.15rem', marginBottom: 2 }}><b>Destinations:</b> Kandy, Nuwara Eliya, Ella</div>
        <div style={{ color: '#223040', fontSize: '1.08rem', marginBottom: 2 }}><b>Date:</b> 2025-07-15</div>
        <div style={{ color: '#223040', fontSize: '1.08rem', marginBottom: 2 }}><b>Status:</b> <span style={{ color: '#27ae60', fontWeight: 700 }}>Ongoing</span></div>
        <div style={{ color: '#223040', fontSize: '1.08rem', marginBottom: 2 }}><b>Participants:</b> 4/6</div>
        <div style={{ color: '#223040', fontSize: '1.08rem' }}><b>Owner:</b> John Doe</div>
      </div>
    </div>
    {/* Itinerary Timeline */}
    <div>
      <div style={{ fontWeight: 700, color: '#223040', fontSize: '1.15rem', marginBottom: 10 }}>Itinerary</div>
      <div className="itinerary-timeline" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0 }}>
        {["Kandy", "Nuwara Eliya", "Ella"].map((dest, idx, arr) => (
          <React.Fragment key={dest}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 110 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#27ae60', border: '3px solid #fff', boxShadow: '0 0 0 2px #27ae60', marginBottom: 6 }}></div>
              <span style={{ fontSize: '1.08rem', color: '#223040', fontWeight: 600 }}>{dest}</span>
            </div>
            {idx < arr.length - 1 && (
              <div style={{ flex: 1, height: 5, background: 'linear-gradient(90deg, #27ae60 60%, #e3e8ee 100%)', minWidth: 50, maxWidth: 100, margin: '0 4px', borderRadius: 2 }}></div>
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
          { name: 'Ayesha Fernando', role: 'Traveler', img: 'https://randomuser.me/api/portraits/women/46.jpg' }
        ].map((p, i) => (
          <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', background: '#fff', border: '1.5px solid #e3e8ee', borderRadius: 12, padding: '0.7rem 1.2rem', minWidth: 180 }}>
            <img src={p.img} alt={p.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid #27ae60' }} />
            <div>
              <div style={{ fontWeight: 700, color: '#223040', fontSize: '1.08rem' }}>{p.name}</div>
              <div style={{ color: '#27ae60', fontWeight: 600, fontSize: '0.98rem' }}>{p.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* Description/Notes */}
    <div>
      <div style={{ fontWeight: 700, color: '#223040', fontSize: '1.15rem', marginBottom: 10 }}>Notes</div>
      <div style={{ color: '#4a5a6a', fontSize: '1.08rem', background: '#f8fdfb', borderRadius: 10, padding: '1rem 1.2rem', border: '1.5px solid #e3e8ee' }}>
        Please be ready at the pickup point in Kandy by 7:30 AM. Bring your hiking gear and water bottles. Contact the owner for any questions.
      </div>
    </div>
  </div>
);

export default Ongoing;