import React, { useState } from 'react';
import { MapPin, Clock, User, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface RequestsScreenProps {
  setActiveTrip: (trip: any) => void;
}

const RequestsScreen: React.FC<RequestsScreenProps> = ({ setActiveTrip }) => {
  const { user } = useAuth();
  const { getPendingTrips, updateTrip } = useData();
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);

  const pendingTrips = getPendingTrips(user?.vehicleType);

  const handleAccept = (trip: any) => {
    updateTrip(trip.id, { 
      status: 'accepted', 
      driverId: user?.id 
    });
    setActiveTrip(trip);
    setSelectedTrip(null);
  };

  const handleReject = (tripId: string) => {
    updateTrip(tripId, { status: 'cancelled' });
    setSelectedTrip(null);
  };

  return (
    <div className="p-4 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Solicitudes de Viaje</h1>
        <p className="text-gray-600">Nuevas solicitudes para tu vehículo</p>
      </div>

      {pendingTrips.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No hay solicitudes</h2>
          <p className="text-gray-600">Las nuevas solicitudes aparecerán aquí</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingTrips.map((trip) => (
            <div 
              key={trip.id} 
              className={`card cursor-pointer transition-all ${
                selectedTrip === trip.id ? 'border-blue-500 bg-blue-50' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedTrip(selectedTrip === trip.id ? null : trip.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">{trip.origin}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600">{trip.destination}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{trip.distance.toFixed(1)} km</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{trip.duration} min</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900 mb-1">
                    S/{trip.price.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {trip.scheduledTime.toLocaleTimeString()}
                  </div>
                </div>
              </div>

              {selectedTrip === trip.id && (
                <div className="border-t pt-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">Pasajero</p>
                      <p className="text-sm text-gray-600">Usuario verificado</p>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Nota:</strong> El destino se revelará después de que el pasajero proporcione el código de confirmación.
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAccept(trip);
                      }}
                      className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Aceptar</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReject(trip.id);
                      }}
                      className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <XCircle className="h-4 w-4" />
                      <span>Rechazar</span>
                    </button>
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

export default RequestsScreen;