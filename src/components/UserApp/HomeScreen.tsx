import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, MapPin, Clock, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getAvailableVehicles, getUserTrips } = useData();

  const availableVehicles = getAvailableVehicles();
  const recentTrips = getUserTrips(user?.id || '').slice(0, 3);

  const vehicleTypes = [
    { id: 'economy', name: 'Económico', icon: '🚗', price: 'S/2.0/km' },
    { id: 'sedan', name: 'Sedán', icon: '🚙', price: 'S/2.5/km' },
    { id: 'suv', name: 'SUV', icon: '🚐', price: 'S/3.5/km' },
    { id: 'premium', name: 'Premium', icon: '🏎️', price: 'S/5.0/km' }
  ];

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hola, {user?.name?.split(' ')[0]}</h1>
          <p className="text-gray-600">¿A dónde vamos hoy?</p>
        </div>
        <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">
            {user?.name?.charAt(0)}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <button
          onClick={() => navigate('/user/book')}
          className="w-full bg-blue-500 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
        >
          <MapPin className="h-5 w-5" />
          <span>Reservar Viaje</span>
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tipos de Vehículos</h2>
        <div className="grid grid-cols-2 gap-4">
          {vehicleTypes.map((type) => (
            <div key={type.id} className="card hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="text-3xl mb-2">{type.icon}</div>
                <h3 className="font-medium text-gray-900">{type.name}</h3>
                <p className="text-sm text-gray-600">{type.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Vehículos Disponibles</h2>
        <div className="space-y-3">
          {availableVehicles.slice(0, 3).map((vehicle) => (
            <div key={vehicle.id} className="card flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Car className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{vehicle.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{vehicle.rating}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">S/{vehicle.pricePerKm}/km</p>
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {recentTrips.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Viajes Recientes</h2>
          <div className="space-y-3">
            {recentTrips.map((trip) => (
              <div key={trip.id} className="card">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{trip.origin}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {trip.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">S/{trip.price.toFixed(2)}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      trip.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {trip.status === 'completed' ? 'Completado' : 'En proceso'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;