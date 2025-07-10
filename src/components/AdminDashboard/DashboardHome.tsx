import React from 'react';
import { Car, Users, Navigation, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const DashboardHome: React.FC = () => {
  const stats = [
    { label: 'Viajes Activos', value: '24', icon: Navigation, color: 'bg-blue-500' },
    { label: 'Conductores Online', value: '156', icon: Car, color: 'bg-green-500' },
    { label: 'Usuarios Conectados', value: '89', icon: Users, color: 'bg-purple-500' },
    { label: 'Ingresos Hoy', value: 'S/12,450', icon: DollarSign, color: 'bg-yellow-500' }
  ];

  const revenueData = [
    { time: '00:00', revenue: 1200 },
    { time: '04:00', revenue: 800 },
    { time: '08:00', revenue: 2400 },
    { time: '12:00', revenue: 3200 },
    { time: '16:00', revenue: 2800 },
    { time: '20:00', revenue: 3600 },
    { time: '24:00', revenue: 2200 }
  ];

  const vehicleData = [
    { type: 'Sedán', trips: 45, revenue: 4500 },
    { type: 'SUV', trips: 32, revenue: 5600 },
    { type: 'Premium', trips: 18, revenue: 4200 },
    { type: 'Económico', trips: 67, revenue: 3800 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ingresos por Hora</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip formatter={(value) => [`S/${value}`, 'Ingresos']} />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Viajes por Tipo de Vehículo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vehicleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="trips" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Viajes Recientes</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Navigation className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Viaje #{1000 + i}</p>
                    <p className="text-sm text-gray-600">Miraflores → San Isidro</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">S/25.00</p>
                  <p className="text-sm text-gray-600">Completado</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conductores Activos</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Car className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Carlos Mendoza</p>
                    <p className="text-sm text-gray-600">Toyota Corolla • ABC-123</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600">En línea</span>
                  </div>
                  <p className="text-sm text-gray-600">★ 4.8</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;