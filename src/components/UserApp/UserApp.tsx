import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserNavigation from './UserNavigation';
import HomeScreen from './HomeScreen';
import BookingScreen from './BookingScreen';
import TrackingScreen from './TrackingScreen';
import HistoryScreen from './HistoryScreen';
import ProfileScreen from './ProfileScreen';

const UserApp: React.FC = () => {
  const [currentTrip, setCurrentTrip] = useState<any>(null);

  return (
    <div className="mobile-container">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/book" element={<BookingScreen setCurrentTrip={setCurrentTrip} />} />
        <Route path="/track" element={<TrackingScreen currentTrip={currentTrip} />} />
        <Route path="/history" element={<HistoryScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
      <UserNavigation />
    </div>
  );
};

export default UserApp;