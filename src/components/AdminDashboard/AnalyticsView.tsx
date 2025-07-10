import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Car, DollarSign } from 'lucide-react';

const AnalyticsView: React.FC = () => {
  const [timeRange, setTimeRange] = useState('week');

  const revenueData = [
    { period: 'Lun', revenue: 1200, trips: 45 },
    { period: 'Mar', revenue: 1800, trips: 67 },
    { period: 'Mié', revenue: 1500, trips: 56 },
    { period: 'Jue', revenue: 2200, trips: 89 },
    { period: 'Vie', revenue: 2800, trips: 112 },
    { period: 'Sáb', revenue: 3200, trips: 125 },
    { period: 'Dom', revenue: 2100, trips: 78 }
  ];

  const vehicleTypeData = [
    { name: 'Sedán', value: 45, color: '#3b82f6' },
    { name: 'SUV', value: 32, color: '#10b981' },
    { name: 'Premium', value: 18, color: '#8b5cf6' },
    { name: 'Económico', value: 67, color: '#f59e0b' }
  ];

  const hourlyData = [
    { hour: '00:00', trips: 8 },
    { hour: '03:00', trips: 5 },
    { hour: '06:00', trips: 15 },
    { hour: '09:00', trips: 35 },
    { hour: '12:00', trips: 45 },
    { hour: '15:00', trips: 38 },
    { hour: '18:00', trips: 52 },
    { hour: '21:00', trips: 28 }
  ];

  const stats = [
    { title: 'Ingresos Totales', value: 'S/45,230', icon: DollarSign, change: '+12.5%', color: 'text-green-600' },
    { title: 'Viajes Completados', value: '1,234', icon: Car, change: '+8.2%', color: 'text-blue-600' },
    { title: 'Usuarios Activos', value: '567', icon: Users, change: '+15.3%', color: 'text-purple-600' },
    { title: 'Calificación Promedio', value: '4.8', icon: TrendingUp, change: '+0.3', color: 'text-yellow-600' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Analíticas</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">Esta semana</option>
          <option value="month">Este mes</option>
          <option value="year">Este año</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.color} flex items-center mt-1`}>
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {stat.change}
                </p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <stat.icon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ingresos por Día</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip formatter={(value) => [`S/${value}`, 'Ingresos']} />
              <Bar dataKey="revenue" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Viajes por Tipo de Vehículo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={vehicleTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {vehicleTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Viajes por Hora</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="trips" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendencia de Viajes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="trips" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rendimiento de Conductores</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Tiempo promedio de respuesta</span>
              <span className="text-sm font-medium">2.5 min</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Tasa de aceptación</span>
              <span className="text-sm font-medium">92%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Tiempo promedio de viaje</span>
              <span className="text-sm font-medium">18 min</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Tasa de cancelación</span>
              <span className="text-sm font-medium">3.2%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Satisfacción del Cliente</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Calificación promedio</span>
              <span className="text-sm font-medium">4.8/5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Usuarios que repiten</span>
              <span className="text-sm font-medium">76%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Quejas resueltas</span>
              <span className="text-sm font-medium">98%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Tiempo de soporte</span>
              <span className="text-sm font-medium">45 seg</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Métricas de Negocio</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Ingreso promedio por viaje</span>
              <span className="text-sm font-medium">S/32.50</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Comisión por viaje</span>
              <span className="text-sm font-medium">S/6.50</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Viajes pico por hora</span>
              <span className="text-sm font-medium">52</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Ocupación promedio</span>
              <span className="text-sm font-medium">68%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;