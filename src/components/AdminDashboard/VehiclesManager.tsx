import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Car, DollarSign } from 'lucide-react';

const VehiclesManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  const mockVehicles = [
    { id: '1', type: 'economy', name: 'Nissan Versa', pricePerKm: 2.0, available: true, capacity: 4 },
    { id: '2', type: 'sedan', name: 'Toyota Corolla', pricePerKm: 2.5, available: true, capacity: 4 },
    { id: '3', type: 'suv', name: 'Honda CR-V', pricePerKm: 3.5, available: true, capacity: 5 },
    { id: '4', type: 'premium', name: 'BMW Serie 3', pricePerKm: 5.0, available: true, capacity: 4 }
  ];

  const [vehicles, setVehicles] = useState(mockVehicles);

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const handleDelete = (vehicleId: string) => {
    if (confirm('¿Estás seguro de eliminar este vehículo?')) {
      setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
    }
  };

  const handleSave = (vehicleData: any) => {
    if (selectedVehicle) {
      setVehicles(vehicles.map(vehicle => vehicle.id === selectedVehicle.id ? { ...vehicle, ...vehicleData } : vehicle));
    } else {
      setVehicles([...vehicles, { ...vehicleData, id: Date.now().toString() }]);
    }
    setShowModal(false);
    setSelectedVehicle(null);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'economy': return 'bg-gray-100 text-gray-800';
      case 'sedan': return 'bg-blue-100 text-blue-800';
      case 'suv': return 'bg-green-100 text-green-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'economy': return 'Económico';
      case 'sedan': return 'Sedán';
      case 'suv': return 'SUV';
      case 'premium': return 'Premium';
      default: return type;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Vehículos</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Nuevo Vehículo</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar vehículos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(vehicle.type)}`}>
                {getTypeName(vehicle.type)}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{vehicle.name}</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Precio por km:</span>
                <span className="font-medium text-gray-900">S/{vehicle.pricePerKm.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Capacidad:</span>
                <span className="font-medium text-gray-900">{vehicle.capacity} personas</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Estado:</span>
                <span className={`font-medium ${vehicle.available ? 'text-green-600' : 'text-red-600'}`}>
                  {vehicle.available ? 'Disponible' : 'No disponible'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-4 border-t">
              <button
                onClick={() => handleEdit(vehicle)}
                className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-1"
              >
                <Edit className="h-4 w-4" />
                <span>Editar</span>
              </button>
              <button
                onClick={() => handleDelete(vehicle.id)}
                className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-1"
              >
                <Trash2 className="h-4 w-4" />
                <span>Eliminar</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedVehicle ? 'Editar Vehículo' : 'Nuevo Vehículo'}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                handleSave({
                  type: formData.get('type'),
                  name: formData.get('name'),
                  pricePerKm: parseFloat(formData.get('pricePerKm') as string),
                  capacity: parseInt(formData.get('capacity') as string),
                  available: formData.get('available') === 'true'
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select
                  name="type"
                  defaultValue={selectedVehicle?.type || 'sedan'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="economy">Económico</option>
                  <option value="sedan">Sedán</option>
                  <option value="suv">SUV</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedVehicle?.name || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio por km (S/)</label>
                <input
                  type="number"
                  name="pricePerKm"
                  step="0.1"
                  defaultValue={selectedVehicle?.pricePerKm || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad</label>
                <input
                  type="number"
                  name="capacity"
                  defaultValue={selectedVehicle?.capacity || '4'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  name="available"
                  defaultValue={selectedVehicle?.available ? 'true' : 'false'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="true">Disponible</option>
                  <option value="false">No disponible</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {selectedVehicle ? 'Actualizar' : 'Crear'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedVehicle(null);
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehiclesManager;