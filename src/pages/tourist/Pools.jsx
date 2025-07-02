import React, { useState } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import OngoingPoolMap from '../../components/OngoingPoolMap';
import '../Page.css';
import './Pools.css';
import FindPools from './FindPools';
import MyPools from './MyPools';
import Confirmed from './Confirmed';
import Ongoing from './Ongoing';

const tabList = [
  { label: 'Find Pools', key: 'find' },
  { label: 'My Pools', key: 'my' },
  { label: 'Confirmed', key: 'confirmed' },
  { label: 'Ongoing', key: 'ongoing' },
];

const Pools = () => {
  const [activeTab, setActiveTab] = useState('find');

  return (
    <div className="pools-page">
      <Navbar />
      <div className="pools-content">
        <h1 className="pools-heading" style={{ marginTop: '8.5rem' }}>Pools</h1>
        <p style={{ marginTop: '1.2rem', color: '#4a5a6a', fontSize: '1.15rem', textAlign: 'center', maxWidth: 600 }}>
          Meet new friends and explore together, find your perfect travel pool!
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          {tabList.map(tab => (
            <button
              key={tab.key}
              className={`pools-btn${activeTab === tab.key ? ' pools-btn-active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Tab content placeholder */}
        <div style={{ marginTop: '2.5rem', minHeight: 120, width: '100%', marginBottom: '3.5rem' }}>
          {activeTab === 'find' && (
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
                {/* No Create New button in Find Pools */}
              </div>
              <div className="pools-marketplace">
                {[{
                  id: 1,
                  img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
                  name: 'Adventure to Ella',
                  owner: 'John Doe',
                  destinations: 'Kandy, Nuwara Eliya, Ella',
                  participants: '3/5',
                }, {
                  id: 2,
                  img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
                  name: 'Beach Escape',
                  owner: 'Jane Smith',
                  destinations: 'Colombo, Galle, Mirissa',
                  participants: '2/4',
                }, {
                  id: 3,
                  img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80',
                  name: 'Cultural Wonders',
                  owner: 'Sam Perera',
                  destinations: 'Anuradhapura, Sigiriya, Polonnaruwa',
                  participants: '5/7',
                }, {
                  id: 4,
                  img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80',
                  name: 'Hill Country Hike',
                  owner: 'Ayesha Fernando',
                  destinations: 'Kandy, Haputale, Ella',
                  participants: '1/5',
                }].map((pool) => (
                  <div className="pool-card-market" key={pool.id}>
                    <img className="pool-card-img" src={pool.img} alt="Pool" />
                    <div className="pool-card-info">
                      <div className="pool-card-title-row">
                        <span className="pool-card-name">{pool.name}</span>
                        <span className="pool-card-owner">by {pool.owner}</span>
                      </div>
                      <div className="pool-card-destinations">Main Destinations: {pool.destinations}</div>
                      <div className="pool-card-participants">Participants: <b>{pool.participants}</b></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pools-pagination">
                <button className="pools-pagination-btn" aria-label="Previous Page">&#8592;</button>
                <button className="pools-pagination-btn pools-pagination-btn-active">1</button>
                <button className="pools-pagination-btn">2</button>
                <button className="pools-pagination-btn">3</button>
                <span className="pools-pagination-ellipsis">...</span>
                <button className="pools-pagination-btn">Next</button>
                <button className="pools-pagination-btn" aria-label="Next Page">&#8594;</button>
              </div>
            </div>
          )}
          {activeTab === 'my' && (
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
                        {/* Timeline steps */}
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
              <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', color: '#223040', fontSize: '1.45rem', fontWeight: 800, marginBottom: '1rem', alignSelf: 'flex-start', marginLeft: '6vw', textAlign: 'left' }}>Upcoming Pools</h2>
                <div className="pools-upcoming-list" style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingLeft: '6vw' }}>
                  {/* Hide scrollbar for Webkit browsers */}
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
                  {/* Hide scrollbar for Webkit browsers */}
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
                    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', // updated
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
                    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', // updated
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
                    img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80', // updated
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
          )}
          {activeTab === 'ongoing' && (
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
          )}
          {activeTab === 'confirmed' && (
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
                    // Only pool members, no guide/driver in payment section
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
          )}
          {activeTab === 'find' && <FindPools />}
          {activeTab === 'my' && <MyPools />}
          {activeTab === 'confirmed' && <Confirmed />}
          {activeTab === 'ongoing' && <Ongoing />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pools;