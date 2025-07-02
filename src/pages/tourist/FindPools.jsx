import React from 'react';

const FindPools = () => (
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
);

export default FindPools;