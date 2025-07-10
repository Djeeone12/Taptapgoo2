import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, DollarSign, Clock, Star, Play, Pause } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const DriverHomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getPendingTrips, getDriverTrips } = useData();
  const [isOnline, setIsOnline] = useState(true);

  const pendingTrips = getPendingTrips(user?.vehicleType);
  const driverTrips = getDriverTrips(user?.id || '');
  const todayTrips = driverTrips.filter(trip => {
    const today = new Date();
    const tripDate = new Date(trip.createdAt);
    return tripDate.toDateString() === today.toDateString();
  });

  const todayEarnings = todayTrips.reduce((sum, trip) => sum + trip.price, 0);

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hola, {user?.name?.split(' ')[0]}</h1>
          <p className="text-gray-600">Estado: {isOnline ? 'En línea' : 'Desconectado'}</p>
        </div>
        <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">
            {user?.name?.charAt(0)}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <button
          onClick={() => setIsOnline(!isOnline)}
          className={`w-full py-4 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
            isOnline
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {isOnline ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          <span>{isOnline ? 'Desconectarse' : 'Conectarse'}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="card text-center">
          <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">S/{todayEarnings.toFixed(2)}</div>
          <div className="text-sm text-gray-600">Ganancia hoy</div>
        </div>
        <div className="card text-center">
          <Car className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{todayTrips.length}</div>
          <div className="text-sm text-gray-600">Viajes hoy</div>
        </div>
      </div>

      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Mi Vehículo</h2>
          <span className="text-sm text-green-600 font-medium">Disponible</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center">
            <Car className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Toyota Corolla</h3>
            <p className="text-sm text-gray-600">Placa: {user?.vehicleId}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>{user?.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Solicitudes Pendientes</h2>
          <button
            onClick={() => navigate('/driver/requests')}
            className="text-blue-500 text-sm hover:text-blue-600"
          >
            Ver todas
          </button>
        </div>
        {pendingTrips.length === 0 ? (
          <div className="card text-center py-8">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No hay solicitudes pendientes</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingTrips.slice(0, 3).map((trip) => (
              <div key={trip.id} className="card">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">{trip.origin}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{trip.destination}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      S/{trip.price.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {trip.distance.toFixed(1)} km
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-xl font-bold text-gray-900">4.8</div>
          <div className="text-sm text-gray-600">Calificación</div>
        </div>
        <div className="card text-center">
          <div className="text-xl font-bold text-gray-900">125</div>
          <div className="text-sm text-gray-600">Viajes total</div>
        </div>
        <div className="card text-center">
          <div className="text-xl font-bold text-gray-900">98%</div>
          <div className="text-sm text-gray-600">Aceptación</div>
        </div>
      </div>
    </div>
  );
};

export default DriverHomeScreen;