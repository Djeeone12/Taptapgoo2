import React from 'react';
import { MapPin, Clock, Star, DollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const DriverHistoryScreen: React.FC = () => {
  const { user } = useAuth();
  const { getDriverTrips } = useData();

  const trips = getDriverTrips(user?.id || '');

  const totalEarnings = trips.reduce((sum, trip) => sum + trip.price, 0);
  const averageRating = trips.length > 0 
    ? trips.reduce((sum, trip) => sum + (trip.rating || 0), 0) / trips.length 
    : 0;

  return (
    <div className="p-4 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Historial de Viajes</h1>
        <p className="text-gray-600">Revisa tus viajes completados</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="card text-center">
          <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">S/{totalEarnings.toFixed(2)}</div>
          <div className="text-sm text-gray-600">Ganancia total</div>
        </div>
        <div className="card text-center">
          <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
          <div className="text-sm text-gray-600">Calificación promedio</div>
        </div>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No hay viajes aún</h2>
          <p className="text-gray-600">Tus viajes completados aparecerán aquí</p>
        </div>
      ) : (
        <div className="space-y-4">
          {trips.map((trip) => (
            <div key={trip.id} className="card">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-900">{trip.origin}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-gray-900">{trip.destination}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{trip.createdAt.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>{trip.distance.toFixed(1)} km</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900 mb-1">
                    S/{trip.price.toFixed(2)}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{trip.rating || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Código usado:</span>
                  <span className="font-mono font-bold text-blue-600">
                    {trip.confirmationCode}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverHistoryScreen;