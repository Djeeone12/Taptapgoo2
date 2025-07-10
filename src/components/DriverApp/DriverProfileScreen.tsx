import React, { useState } from 'react';
import { User, Phone, Mail, Star, Car, Edit2, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DriverProfileScreen: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    vehicleId: user?.vehicleId || ''
  });

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="p-4 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
        <p className="text-gray-600">Gestiona tu información como conductor</p>
      </div>

      <div className="card mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">
              {user?.name?.charAt(0)}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>{user?.rating}</span>
              <span>•</span>
              <span>Conductor verificado</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-gray-500" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{user?.email}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-gray-500" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Teléfono</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{user?.phone}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Car className="h-5 w-5 text-gray-500" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Placa del Vehículo</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.vehicleId}
                  onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{user?.vehicleId}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Guardar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Edit2 className="h-4 w-4" />
              <span>Editar Perfil</span>
            </button>
          )}
        </div>
      </div>

      <div className="card mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Información del Vehículo</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Tipo</span>
            <span className="font-medium text-gray-900">
              {user?.vehicleType?.charAt(0).toUpperCase() + user?.vehicleType?.slice(1)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Modelo</span>
            <span className="font-medium text-gray-900">Toyota Corolla</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Año</span>
            <span className="font-medium text-gray-900">2022</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Estado</span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
              <Shield className="h-3 w-3 mr-1" />
              Verificado
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-3">Estadísticas</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">125</div>
              <div className="text-sm text-gray-600">Viajes completados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">S/3,250</div>
              <div className="text-sm text-gray-600">Ganancia total</div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-3">Documentación</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Licencia de conducir</span>
              <span className="text-green-600 text-sm">✓ Verificada</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">SOAT</span>
              <span className="text-green-600 text-sm">✓ Vigente</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Revisión técnica</span>
              <span className="text-green-600 text-sm">✓ Vigente</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
        >
          <LogOut className="h-5 w-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default DriverProfileScreen;