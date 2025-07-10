import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import DashboardHome from './DashboardHome';
import TripsManager from './TripsManager';
import UsersManager from './UsersManager';
import DriversManager from './DriversManager';
import VehiclesManager from './VehiclesManager';
import AnalyticsView from './AnalyticsView';
import LiveMap from './LiveMap';

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/trips" element={<TripsManager />} />
            <Route path="/users" element={<UsersManager />} />
            <Route path="/drivers" element={<DriversManager />} />
            <Route path="/vehicles" element={<VehiclesManager />} />
            <Route path="/analytics" element={<AnalyticsView />} />
            <Route path="/map" element={<LiveMap />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;