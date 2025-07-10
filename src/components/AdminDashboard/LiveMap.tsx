import React, { useState, useEffect } from 'react';
import { MapPin, Car, Users, Navigation, Filter } from 'lucide-react';

const LiveMap: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [vehicles, setVehicles] = useState([
    { id: '1', driver: 'Carlos Mendoza', status: 'available', lat: -12.0464, lng: -77.0428, type: 'sedan' },
    { id: '2', driver: 'Luis Rodríguez', status: 'in_trip', lat: -12.0554, lng: -77.0365, type: 'suv' },
    { id: '3', driver: 'Miguel Torres', status: 'available', lat: -12.0404, lng: -77.0489, type: 'premium' },
    { id: '4', driver: 'Ana García', status: 'in_trip', lat: -12.0634, lng: -77.0328, type: 'economy' }
  ]);

  const [trips, setTrips] = useState([
    { id: '1', from: 'Miraflores', to: 'San Isidro', status: 'in_progress', lat: -12.0464, lng: -77.0428 },
    { id: '2', from: 'Barranco', to: 'Surco', status: 'pending', lat: -12.0554, lng: -77.0365 },
    { id: '3', from: 'La Molina', to: 'San Borja', status: 'in_progress', lat: -12.0404, lng: -77.0489 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prev => prev.map(vehicle => ({
        ...vehicle,
        lat: vehicle.lat + (Math.random() - 0.5) * 0.001,
        lng: vehicle.lng + (Math.random() - 0.5) * 0.001
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filters = [
    { id: 'all', label: 'Todos', count: vehicles.length },
    { id: 'available', label: 'Disponibles', count: vehicles.filter(v => v.status === 'available').length },
    { id: 'in_trip', label: 'En Viaje', count: vehicles.filter(v => v.status === 'in_trip').length },
    { id: 'trips', label: 'Viajes Activos', count: trips.length }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'in_trip': return 'bg-blue-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'in_trip': return 'En Viaje';
      case 'offline': return 'Desconectado';
      default: return status;
    }
  };

  const filteredVehicles = activeFilter === 'all' ? vehicles : 
                          activeFilter === 'trips' ? [] :
                          vehicles.filter(v => v.status === activeFilter);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Mapa en Tiempo Real</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Actualizando en vivo</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeFilter === filter.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Mapa de Lima</h3>
            <div className="map-container h-96 relative rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
                {/* Vehicles */}
                {filteredVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{
                      left: `${50 + (vehicle.lng + 77.0428) * 1000}%`,
                      top: `${50 + (vehicle.lat + 12.0464) * 1000}%`
                    }}
                    title={`${vehicle.driver} - ${getStatusText(vehicle.status)}`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${getStatusColor(vehicle.status)} shadow-lg`}>
                      🚗
                    </div>
                  </div>
                ))}

                {/* Trips */}
                {activeFilter === 'trips' && trips.map((trip) => (
                  <div
                    key={trip.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${50 + (trip.lng + 77.0428) * 1000}%`,
                      top: `${50 + (trip.lat + 12.0464) * 1000}%`
                    }}
                  >
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-pulse">
                      📍
                    </div>
                  </div>
                ))}

                {/* Districts Labels */}
                <div className="absolute top-4 left-4 text-sm font-medium text-gray-700">Miraflores</div>
                <div className="absolute top-4 right-4 text-sm font-medium text-gray-700">San Isidro</div>
                <div className="absolute bottom-4 left-4 text-sm font-medium text-gray-700">Barranco</div>
                <div className="absolute bottom-4 right-4 text-sm font-medium text-gray-700">Surco</div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado Actual</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Conductores disponibles</span>
                </div>
                <span className="text-sm font-medium">{vehicles.filter(v => v.status === 'available').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">En viaje</span>
                </div>
                <span className="text-sm font-medium">{vehicles.filter(v => v.status === 'in_trip').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Viajes activos</span>
                </div>
                <span className="text-sm font-medium">{trips.length}</span>
              </div>
            </div>
          </div>

          {/* Vehicle List */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {activeFilter === 'trips' ? 'Viajes Activos' : 'Conductores'}
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {activeFilter === 'trips' ? (
                trips.map((trip) => (
                  <div key={trip.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Navigation className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{trip.from}</p>
                        <p className="text-xs text-gray-600">→ {trip.to}</p>
                      </div>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {trip.status === 'in_progress' ? 'En curso' : 'Pendiente'}
                    </span>
                  </div>
                ))
              ) : (
                filteredVehicles.map((vehicle) => (
                  <div key={vehicle.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Car className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{vehicle.driver}</p>
                        <p className="text-xs text-gray-600 capitalize">{vehicle.type}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      vehicle.status === 'available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {getStatusText(vehicle.status)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="text-sm">
                  <span className="font-medium">Carlos</span> completó un viaje
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="text-sm">
                  <span className="font-medium">Luis</span> aceptó una solicitud
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="text-sm">
                  Nueva solicitud en <span className="font-medium">Miraflores</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;