import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Key, Navigation, Phone, MessageCircle, CheckCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface ActiveTripScreenProps {
  activeTrip: any;
}

const ActiveTripScreen: React.FC<ActiveTripScreenProps> = ({ activeTrip }) => {
  const navigate = useNavigate();
  const { updateTrip, confirmTrip } = useData();
  const [confirmationCode, setConfirmationCode] = useState('');
  const [showDestination, setShowDestination] = useState(false);

  const handleConfirmCode = () => {
    if (confirmTrip(activeTrip.id, confirmationCode)) {
      updateTrip(activeTrip.id, { status: 'confirmed' });
      setShowDestination(true);
      alert('Código confirmado correctamente');
    } else {
      alert('Código incorrecto');
    }
  };

  const handleStartTrip = () => {
    updateTrip(activeTrip.id, { status: 'in_progress' });
    navigate('/driver/navigation');
  };

  if (!activeTrip) {
    return (
      <div className="p-4 pb-20">
        <div className="text-center py-12">
          <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No hay viaje activo</h2>
          <p className="text-gray-600">Acepta una solicitud para comenzar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="map-container h-64 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
          <div className="vehicle-icon" style={{ top: '50%', left: '50%' }}>
            🚗
          </div>
          <div className="map-marker" style={{ top: '30%', left: '60%' }}></div>
        </div>
        <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Viaje activo</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {!showDestination ? (
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Validar Código de Confirmación</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código del pasajero
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value.toUpperCase())}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ingresa el código"
                    maxLength={6}
                  />
                  <button
                    onClick={handleConfirmCode}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  >
                    Validar
                  </button>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  Solicita al pasajero que te proporcione el código de confirmación de 6 dígitos antes de iniciar el viaje.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="flex items-center space-x-2 mb-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h3 className="font-semibold text-gray-900">Código Confirmado</h3>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800">
                ✓ Código validado correctamente. Ahora puedes ver el destino e iniciar el viaje.
              </p>
            </div>
          </div>
        )}

        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-3">Detalles del Viaje</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Origen</p>
                <p className="text-sm text-gray-600">{activeTrip.origin}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Destino</p>
                <p className="text-sm text-gray-600">
                  {showDestination ? activeTrip.destination : 'Oculto hasta confirmar código'}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Distancia</p>
                <p className="text-sm text-gray-600">{activeTrip.distance.toFixed(1)} km</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-3">Información del Pasajero</h3>
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium">JP</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Juan Pérez</p>
              <p className="text-sm text-gray-600">★ 4.5 • +51 999 888 777</p>
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
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Ganancia del viaje</span>
            <span className="text-2xl font-bold text-gray-900">
              S/{activeTrip.price.toFixed(2)}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            {activeTrip.distance.toFixed(1)} km • ~{activeTrip.duration} min
          </div>
        </div>

        {showDestination && (
          <button
            onClick={handleStartTrip}
            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Navigation className="h-5 w-5" />
            <span>Iniciar Viaje</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ActiveTripScreen;