import React, { useState } from 'react';
import { X } from 'lucide-react';
import './CreateTripModal.css';

const CreateTripModal = ({ onClose, onSubmit }) => {
  const [tripName, setTripName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tripName.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSubmit(tripName.trim());
    setIsLoading(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="create-trip-modal">
        <div className="modal-header">
          <h2>Create a new trip</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="tripName">Trip name</label>
            <input
              id="tripName"
              type="text"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              placeholder="e.g., Sri Lanka Adventure, Backpacking Europe..."
              maxLength={50}
              autoFocus
            />
            <div className="char-count">
              {tripName.length}/50
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={!tripName.trim() || isLoading}
            >
              {isLoading ? 'Creating...' : 'Continue'}
            </button>
          </div>
        </form>

        <div className="modal-footer">
          <p>You can always change the trip name later</p>
        </div>
      </div>
    </div>
  );
};

export default CreateTripModal;
