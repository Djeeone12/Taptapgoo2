import React from 'react';
import { MapPin, Clock, Star, Car } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const HistoryScreen: React.FC = () => {
  const { user } = useAuth();
  const { getUserTrips } = useData();

  const trips = getUserTrips(user?.id || '');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'in_progress':
        return 'En Progreso';
      case 'cancelled':
        return 'Cancelado';
      case 'pending':
        return 'Pendiente';
      case 'accepted':
        return 'Aceptado';
      default:
        return status;
    }
  };

  return (
    <div className="p-4 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Historial de Viajes</h1>
        <p className="text-gray-600">Revisa tus viajes anteriores y califica conductores</p>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-12">
          <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No hay viajes aún</h2>
          <p className="text-gray-600">Tus viajes aparecerán aquí una vez que realices tu primera reserva</p>
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
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{trip.createdAt.toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{trip.distance.toFixed(1)} km</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 mb-1">
                    S/{trip.price.toFixed(2)}
                  </p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(trip.status)}`}>
                    {getStatusText(trip.status)}
                  </span>
                </div>
              </div>

              {trip.status === 'completed' && (
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Calificar conductor:</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 cursor-pointer ${
                              star <= (trip.driverRating || 0)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <button className="text-blue-500 text-sm hover:text-blue-600">
                      Volver a reservar
                    </button>
                  </div>
                </div>
              )}

              {trip.confirmationCode && (
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Código de confirmación:</span>
                    <span className="text-sm font-mono font-bold text-blue-600">
                      {trip.confirmationCode}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryScreen;