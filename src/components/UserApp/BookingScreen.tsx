import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Car, ArrowRight, CreditCard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface BookingScreenProps {
  setCurrentTrip: (trip: any) => void;
}

const BookingScreen: React.FC<BookingScreenProps> = ({ setCurrentTrip }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getAvailableVehicles, createTrip } = useData();

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [step, setStep] = useState(1);

  const availableVehicles = getAvailableVehicles();

  const handleBooking = () => {
    if (!origin || !destination || !selectedVehicle || !scheduledTime) {
      alert('Por favor completa todos los campos');
      return;
    }

    const vehicle = availableVehicles.find(v => v.id === selectedVehicle);
    if (!vehicle) return;

    const distance = Math.random() * 15 + 5; // 5-20 km
    const price = distance * vehicle.pricePerKm;

    const newTrip = createTrip({
      userId: user?.id || '',
      vehicleId: selectedVehicle,
      origin,
      destination,
      originCoords: { lat: -12.0464, lng: -77.0428 },
      destinationCoords: { lat: -12.0554, lng: -77.0365 },
      scheduledTime: new Date(scheduledTime),
      price,
      distance,
      duration: Math.floor(distance * 3) // 3 min per km
    });

    setCurrentTrip(newTrip);
    navigate('/user/track');
  };

  const vehicleIcons = {
    economy: '🚗',
    sedan: '🚙',
    suv: '🚐',
    premium: '🏎️'
  };

  if (step === 1) {
    return (
      <div className="p-4 pb-20">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Reservar Viaje</h1>
          <p className="text-gray-600">Ingresa los detalles de tu viaje</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Punto de Origen
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu ubicación actual"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destino
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="¿A dónde vamos?"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hora Programada
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!origin || !destination || !scheduledTime}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <span>Seleccionar Vehículo</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pb-20">
      <div className="mb-6">
        <button
          onClick={() => setStep(1)}
          className="text-blue-500 hover:text-blue-600 mb-2"
        >
          ← Volver
        </button>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Seleccionar Vehículo</h1>
        <p className="text-gray-600">Elige el tipo de vehículo que prefieres</p>
      </div>

      <div className="mb-6 card">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <MapPin className="h-4 w-4" />
          <span>{origin}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{destination}</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {availableVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => setSelectedVehicle(vehicle.id)}
            className={`card cursor-pointer transition-all ${
              selectedVehicle === vehicle.id
                ? 'border-blue-500 bg-blue-50'
                : 'hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">
                  {vehicleIcons[vehicle.type]}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{vehicle.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>★ {vehicle.rating}</span>
                    <span>•</span>
                    <span>{vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">S/{vehicle.pricePerKm}/km</p>
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <CreditCard className="h-5 w-5 text-gray-600" />
          <h3 className="font-medium text-gray-900">Resumen del Viaje</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Distancia estimada:</span>
            <span className="font-medium">~12 km</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tiempo estimado:</span>
            <span className="font-medium">~25 min</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Precio estimado:</span>
            <span className="font-medium">S/30.00</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleBooking}
        disabled={!selectedVehicle}
        className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Confirmar Reserva
      </button>
    </div>
  );
};

export default BookingScreen;