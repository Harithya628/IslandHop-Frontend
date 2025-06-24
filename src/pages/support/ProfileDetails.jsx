import React from 'react';
import './ProfileDetails.css';
import profilePic from '../../assets/islandHopIcon.png';

const ProfileDetails = () => {
  // In a real app, these would come from user context or API
  const user = {
    name: 'Alex Support',
    email: 'alex.support@islandhop.com',
    role: 'Support Agent',
    joined: 'January 2024',
    avatar: profilePic,
    phone: '+94 77 123 4567',
    location: 'Colombo, Sri Lanka',
    bio: 'Dedicated support agent with 3+ years of experience helping travelers. Passionate about customer satisfaction and problem-solving.',
    skills: ['Customer Support', 'Ticket Management', 'Crisis Handling', 'Multilingual', 'Refund Processing'],
    languages: ['English', 'Sinhala', 'Tamil'],
    lastActive: '2 minutes ago',
  };

  return (
    <div className="profile-details-page full-width-profile">
      <div className="profile-details-card wide">
        <div className="profile-details-header">
          <img src={user.avatar} alt="Profile" className="profile-details-avatar large" />
          <div className="profile-details-header-info">
            <h2 className="profile-details-name large">{user.name}</h2>
            <p className="profile-details-role large">{user.role}</p>
            <div className="profile-details-contact-row">
              <span className="profile-details-email">{user.email}</span>
              <span className="profile-details-divider">|</span>
              <span className="profile-details-phone">{user.phone}</span>
              <span className="profile-details-divider">|</span>
              <span className="profile-details-location">{user.location}</span>
            </div>
            <div className="profile-details-meta-row">
              <span className="profile-details-joined">Joined: {user.joined}</span>
              <span className="profile-details-divider">|</span>
              <span className="profile-details-lastactive">Last Active: {user.lastActive}</span>
            </div>
          </div>
        </div>
        <div className="profile-details-flex-row">
          <div className="profile-details-section">
            <h3>Skills</h3>
            <ul className="profile-details-skills">
              {user.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="profile-details-section">
            <h3>Languages</h3>
            <ul className="profile-details-languages">
              {user.languages.map((lang) => (
                <li key={lang}>{lang}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
