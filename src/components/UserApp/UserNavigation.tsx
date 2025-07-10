import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, MapPin, Clock, User } from 'lucide-react';

const UserNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: 'home', label: 'Inicio', icon: Home, path: '/user' },
    { id: 'book', label: 'Reservar', icon: Search, path: '/user/book' },
    { id: 'track', label: 'Seguir', icon: MapPin, path: '/user/track' },
    { id: 'history', label: 'Historial', icon: Clock, path: '/user/history' },
    { id: 'profile', label: 'Perfil', icon: User, path: '/user/profile' }
  ];

  const currentTab = tabs.find(tab => location.pathname === tab.path)?.id || 'home';

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 max-w-sm mx-auto">
      <div className="flex justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              currentTab === tab.id
                ? 'text-blue-500 bg-blue-50'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <tab.icon className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserNavigation;