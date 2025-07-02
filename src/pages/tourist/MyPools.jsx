import React from 'react';
import OngoingPoolMap from '../../components/OngoingPoolMap';

const MyPools = () => (
  <div>
    <div className="pools-marketplace-controls">
      <input
        className="pools-searchbar"
        type="text"
        placeholder="Search by destination, owner, or name..."
      />
      <select className="pools-filter">
        <option value="">All Destinations</option>
        <option value="kandy">Kandy</option>
        <option value="ella">Ella</option>
        <option value="colombo">Colombo</option>
      </select>
      <select className="pools-filter">
        <option value="">All Seats</option>
        <option value="1">1 seat</option>
        <option value="2">2 seats</option>
        <option value="3">3+ seats</option>
      </select>
      <button className="pools-btn pools-create-btn pools-create-btn-filled" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.25rem', lineHeight: 1 }}>+</span>
        Create New
      </button>
    </div>
    {/* Ongoing Pool wide card - moved to top */}
    <div style={{ marginTop: '2.5rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div className="pool-ongoing-wide-card" style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', background: '#f3fcf6', border: '2px solid #27ae60', borderRadius: 22, boxShadow: '0 4px 24px rgba(39,174,96,0.10)', maxWidth: 900, minWidth: 340, width: '80vw', overflow: 'hidden', minHeight: 220 }}>
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="Ongoing Pool" style={{ width: 320, minWidth: 220, height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        <div style={{ padding: '2rem 2.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, gap: '0.7rem' }}>
          <div style={{ fontWeight: 800, color: '#27ae60', fontSize: '1.45rem', marginBottom: 2 }}>Ongoing: Highlands Adventure</div>
          <div style={{ color: '#4a5a6a', fontSize: '1.08rem' }}><b>Destinations:</b> Kandy, Nuwara Eliya, Ella</div>
          <div style={{ color: '#223040', fontSize: '1.05rem' }}><b>Date:</b> 2025-07-15</div>
          <div style={{ color: '#223040', fontSize: '1.05rem' }}><b>Status:</b> <span style={{ color: '#27ae60', fontWeight: 700 }}>Ongoing</span></div>
          <div style={{ color: '#223040', fontSize: '1.05rem' }}><b>Participants:</b> 4/6</div>
          <div style={{ color: '#223040', fontSize: '1.05rem' }}><b>Owner:</b> John Doe</div>
          {/* Itinerary Timeline */}
          <div style={{ marginTop: '1.2rem', width: '100%' }}>
            <div style={{ fontWeight: 700, color: '#223040', fontSize: '1.08rem', marginBottom: 8 }}>Itinerary</div>
            <div className="itinerary-timeline" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0 }}>
              {["Kandy", "Nuwara Eliya", "Ella"].map((dest, idx, arr) => (
                <React.Fragment key={dest}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 90 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#27ae60', border: '3px solid #fff', boxShadow: '0 0 0 2px #27ae60', marginBottom: 4 }}></div>
                    <span style={{ fontSize: '1.01rem', color: '#223040', fontWeight: 600 }}>{dest}</span>
                  </div>
                  {idx < arr.length - 1 && (
                    <div style={{ flex: 1, height: 4, background: 'linear-gradient(90deg, #27ae60 60%, #e3e8ee 100%)', minWidth: 40, maxWidth: 80, margin: '0 2px', borderRadius: 2 }}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          {/* Map for itinerary */}
          <OngoingPoolMap />
        </div>
      </div>
    </div>
    {/* Upcoming Pools */}
    <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h2 style={{ fontFamily: 'Outfit, sans-serif', color: '#223040', fontSize: '1.45rem', fontWeight: 800, marginBottom: '1rem', alignSelf: 'flex-start', marginLeft: '6vw', textAlign: 'left' }}>Upcoming Pools</h2>
      <div className="pools-upcoming-list" style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingLeft: '6vw' }}>
        <style>{`
          .pools-upcoming-list::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {[{
          id: 201,
          name: 'Central Highlands Trek',
          destinations: 'Nuwara Eliya, Ella',
          date: '2025-08-15',
          status: 'Upcoming',
          img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
        }, {
          id: 202,
          name: 'West Coast Adventure',
          destinations: 'Negombo, Chilaw',
          date: '2025-09-02',
          status: 'Upcoming',
          img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        }, {
          id: 203,
          name: 'Rainforest Expedition',
          destinations: 'Sinharaja',
          date: '2025-09-20',
          status: 'Upcoming',
          img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80',
        }, {
          id: 204,
          name: 'Cultural Fest',
          destinations: 'Kandy',
          date: '2025-10-05',
          status: 'Upcoming',
          img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
        }].map((upcoming) => (
          <div key={upcoming.id} className="pool-upcoming-card" style={{ background: '#fff', border: '1.5px solid #e3e8ee', borderRadius: 18, boxShadow: '0 2px 12px rgba(31,169,255,0.06)', padding: 0, marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 340, minWidth: 280, width: '100%', overflow: 'hidden' }}>
            <img src={upcoming.img} alt={upcoming.name} style={{ width: '100%', height: 160, objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            <div style={{ padding: '1.1rem 1.3rem', width: '100%', display: 'flex', flexDirection: 'column', gap: '0.3rem', alignItems: 'flex-start' }}>
              <div style={{ fontWeight: 700, color: '#1fa9ff', fontSize: '1.1rem', marginBottom: 2 }}>{upcoming.name}</div>
              <div style={{ color: '#4a5a6a', fontSize: '1rem' }}>Destinations: {upcoming.destinations}</div>
              <div style={{ color: '#223040', fontSize: '0.98rem' }}>Date: {upcoming.date}</div>
              <div style={{ color: '#ffb300', fontWeight: 600, fontSize: '0.98rem' }}>Status: {upcoming.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* Pool History section */}
    <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h2 style={{ fontFamily: 'Outfit, sans-serif', color: '#223040', fontSize: '1.45rem', fontWeight: 800, marginBottom: '1rem', alignSelf: 'flex-start', marginLeft: '6vw', textAlign: 'left' }}>Pool History</h2>
      <div className="pools-history-list" style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingLeft: '6vw' }}>
        <style>{`
          .pools-history-list::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {[{
          id: 101,
          name: 'Sigiriya Adventure',
          destinations: 'Sigiriya, Dambulla',
          date: '2024-12-10',
          status: 'Completed',
          img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        }, {
          id: 102,
          name: 'South Coast Roadtrip',
          destinations: 'Galle, Matara, Tangalle',
          date: '2025-01-22',
          status: 'Completed',
          img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80',
        }, {
          id: 103,
          name: 'Hill Country Trek',
          destinations: 'Kandy, Nuwara Eliya',
          date: '2025-03-05',
          status: 'Cancelled',
          img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80',
        }, {
          id: 104,
          name: 'Northern Explorer',
          destinations: 'Jaffna, Mannar',
          date: '2025-04-12',
          status: 'Completed',
          img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
        }, {
          id: 105,
          name: 'Wildlife Safari',
          destinations: 'Yala, Udawalawe',
          date: '2025-05-18',
          status: 'Completed',
          img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80',
        }, {
          id: 106,
          name: 'East Coast Beaches',
          destinations: 'Trincomalee, Arugam Bay',
          date: '2025-06-10',
          status: 'Completed',
          img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
        }, {
          id: 107,
          name: 'Cultural Triangle',
          destinations: 'Anuradhapura, Polonnaruwa, Sigiriya',
          date: '2025-07-01',
          status: 'Completed',
          img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80',
        }].map((history) => (
          <div key={history.id} className="pool-history-card" style={{ background: '#fff', border: '1.5px solid #e3e8ee', borderRadius: 18, boxShadow: '0 2px 12px rgba(31,169,255,0.06)', padding: 0, marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 340, minWidth: 280, width: '100%', overflow: 'hidden' }}>
            <img src={history.img} alt={history.name} style={{ width: '100%', height: 160, objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            <div style={{ padding: '1.1rem 1.3rem', width: '100%', display: 'flex', flexDirection: 'column', gap: '0.3rem', alignItems: 'flex-start' }}>
              <div style={{ fontWeight: 700, color: '#1fa9ff', fontSize: '1.1rem', marginBottom: 2 }}>{history.name}</div>
              <div style={{ color: '#4a5a6a', fontSize: '1rem' }}>Destinations: {history.destinations}</div>
              <div style={{ color: '#223040', fontSize: '0.98rem' }}>Date: {history.date}</div>
              <div style={{ color: history.status === 'Completed' ? '#1fa9ff' : '#d11f1f', fontWeight: 600, fontSize: '0.98rem' }}>Status: {history.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default MyPools;