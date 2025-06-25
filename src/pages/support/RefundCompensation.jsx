import React, { useState } from 'react';
import './RefundCompensation.css';

const mockTickets = [
  {
    id: 'BK-20250621-0012',
    complaint: 'Driver did not arrive at pickup location. Tourist waited for 30 minutes and had to book another ride.',
    user: {
      name: 'Ayesha Fernando',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      email: 'ayesha.fernando@email.com',
      phone: '+94 77 123 4567',
    },
    date: '2025-06-21',
    status: 'pending',
    amount: 'LKR 2,500.00',
  },
  {
    id: 'BK-20250618-0045',
    complaint: 'Vehicle was not as described. No AC and not clean.',
    user: {
      name: 'Ruwan Silva',
      avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
      email: 'ruwan.silva@email.com',
      phone: '+94 76 987 6543',
    },
    date: '2025-06-18',
    status: 'pending',
    amount: 'LKR 1,200.00',
  },
];

const RefundCompensation = () => {
  const [selectedBooking, setSelectedBooking] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);

  const ticket = mockTickets.find((t) => t.id === selectedBooking);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setProcessed(false);
    setTimeout(() => {
      setProcessing(false);
      setProcessed(true);
    }, 1800);
  };

  return (
    <div className="page">
      <div className="refund-container">
        <div className="refund-header">
          <h1>Refund / Compensation</h1>
          <p>
            Initiate refund or compensation for valid complaints. Select a booking, review the complaint, and submit eligibility.
          </p>
        </div>

        <form className="refund-form" onSubmit={handleSubmit}>
          {/* Booking Selection */}
          <div className="form-group">
            <label htmlFor="booking-id" className="form-label">
              Booking ID
            </label>
            <select
              id="booking-id"
              className="form-select"
              value={selectedBooking}
              onChange={(e) => {
                setSelectedBooking(e.target.value);
                setEligibility('');
                setProcessing(false);
                setProcessed(false);
              }}
              required
            >
              <option value="">Select booking...</option>
              {mockTickets.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.id} ({t.user.name})
                </option>
              ))}
            </select>
          </div>

          {/* Complaint Summary */}
          {ticket && (
            <div className="complaint-summary">
              <div className="complaint-user">
                <img src={ticket.user.avatar} alt={ticket.user.name} className="complaint-avatar" />
                <div>
                  <div className="complaint-user-name">{ticket.user.name}</div>
                  <div className="complaint-user-email">{ticket.user.email}</div>
                  <div className="complaint-user-phone">{ticket.user.phone}</div>
                </div>
              </div>
              <div className="complaint-details">
                <div>
                  <span className="complaint-label">Complaint:</span>
                  <span className="complaint-text">{ticket.complaint}</span>
                </div>
                <div>
                  <span className="complaint-label">Booking Date:</span>
                  <span className="complaint-text">{ticket.date}</span>
                </div>
                <div>
                  <span className="complaint-label">Amount:</span>
                  <span className="complaint-text">{ticket.amount}</span>
                </div>
              </div>
            </div>
          )}

          {/* Eligibility */}
          {ticket && (
            <div className="form-group eligibility-group">
              <label className="form-label">Eligibility</label>
              <div className="eligibility-options">
                <label className={`eligibility-radio ${eligibility === 'eligible' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="eligibility"
                    value="eligible"
                    checked={eligibility === 'eligible'}
                    onChange={() => setEligibility('eligible')}
                    required
                  />
                  Eligible
                </label>
                <label className={`eligibility-radio ${eligibility === 'not_eligible' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="eligibility"
                    value="not_eligible"
                    checked={eligibility === 'not_eligible'}
                    onChange={() => setEligibility('not_eligible')}
                  />
                  Not Eligible
                </label>
              </div>
            </div>
          )}

          {/* Submit */}
          {ticket && (
            <div className="form-actions">
              <button
                type="submit"
                className="btn-refund"
                disabled={!eligibility || processing || processed}
              >
                {processing ? 'Processing...' : processed ? 'Submitted' : 'Submit Request'}
              </button>
            </div>
          )}

          {/* Status */}
          {processing && (
            <div className="refund-status processing">
              <span className="loader" /> Processing refund/compensation request...
            </div>
          )}
          {processed && (
            <div className="refund-status success">
              <svg width="20" height="20" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
              Request submitted to admin/payment system. User will be notified.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RefundCompensation;