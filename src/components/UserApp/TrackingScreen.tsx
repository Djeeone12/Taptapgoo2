import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, MapPin, Clock, User, Copy } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface TrackingScreenProps {
  currentTrip: any;
}

const TrackingScreen: React.FC<TrackingScreenProps> = ({ currentTrip }) => {
  const { updateTrip } = useData();
  const [driverLocation, setDriverLocation] = useState({ lat: -12.0464, lng: -77.0428 });
  const [eta, setEta] = useState(8);

  useEffect(() => {
    if (!currentTrip) return;

    const interval = setInterval(() => {
      setDriverLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));
      setEta(prev => Math.max(1, prev - 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [currentTrip]);

  const copyCode = () => {
    if (currentTrip?.confirmationCode) {
      navigator.clipboard.writeText(currentTrip.confirmationCode);
      alert('Código copiado al portapapeles');
    }
  };

  if (!currentTrip) {
    return (
      <div className="p-4 pb-20">
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No hay viajes activos</h2>
          <p className="text-gray-600">Reserva un viaje para ver el seguimiento en tiempo real</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="map-container h-64 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
          <div className="vehicle-icon" style={{ top: '40%', left: '45%' }}>
            🚗
          </div>
          <div className="map-marker" style={{ top: '60%', left: '70%' }}></div>
          <div className="route-line" style={{ 
            top: '50%', 
            left: '45%', 
            width: '100px',
            transform: 'rotate(45deg)' 
          }}></div>
        </div>
        <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Conductor en camino</span>
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{eta} min</div>
            <div className="text-xs text-gray-600">ETA</div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Código de Confirmación</h3>
            <span className={`px-2 py-1 rounded-full text-xs ${
              currentTrip.status === 'confirmed' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {currentTrip.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}
            </span>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-blue-600 tracking-wider">
                {currentTrip.confirmationCode}
              </div>
              <button
                onClick={copyCode}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Proporciona este código al conductor para iniciar el viaje
          </p>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Carlos Mendoza</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>★ 4.8</span>
                <span>•</span>
                <span>Toyota Corolla</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Llamar</span>
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Mensaje</span>
            </button>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-3">Detalles del Viaje</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Origen</p>
                <p className="text-sm text-gray-600">{currentTrip.origin}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Destino</p>
                <p className="text-sm text-gray-600">{currentTrip.destination}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Hora Programada</p>
                <p className="text-sm text-gray-600">
                  {currentTrip.scheduledTime.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Precio Total</span>
            <span className="text-2xl font-bold text-gray-900">
              S/{currentTrip.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingScreen;