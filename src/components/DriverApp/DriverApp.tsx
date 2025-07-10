import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import DriverNavigation from './DriverNavigation';
import DriverHomeScreen from './DriverHomeScreen';
import RequestsScreen from './RequestsScreen';
import ActiveTripScreen from './ActiveTripScreen';
import DriverHistoryScreen from './DriverHistoryScreen';
import DriverProfileScreen from './DriverProfileScreen';

const DriverApp: React.FC = () => {
  const [activeTrip, setActiveTrip] = useState<any>(null);

  return (
    <div className="mobile-container">
      <Routes>
        <Route path="/" element={<DriverHomeScreen />} />
        <Route path="/requests" element={<RequestsScreen setActiveTrip={setActiveTrip} />} />
        <Route path="/active" element={<ActiveTripScreen activeTrip={activeTrip} />} />
        <Route path="/history" element={<DriverHistoryScreen />} />
        <Route path="/profile" element={<DriverProfileScreen />} />
      </Routes>
      <DriverNavigation />
    </div>
  );
};

export default DriverApp;