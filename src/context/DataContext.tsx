import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Vehicle {
  id: string;
  type: 'sedan' | 'suv' | 'premium' | 'economy';
  name: string;
  pricePerKm: number;
  available: boolean;
  driverId?: string;
  location: { lat: number; lng: number };
  rating: number;
}

interface Trip {
  id: string;
  userId: string;
  driverId?: string;
  vehicleId: string;
  origin: string;
  destination: string;
  originCoords: { lat: number; lng: number };
  destinationCoords: { lat: number; lng: number };
  scheduledTime: Date;
  status: 'pending' | 'accepted' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  confirmationCode?: string;
  price: number;
  distance: number;
  duration: number;
  createdAt: Date;
  completedAt?: Date;
  rating?: number;
  driverRating?: number;
}

interface DataContextType {
  vehicles: Vehicle[];
  trips: Trip[];
  createTrip: (tripData: Omit<Trip, 'id' | 'createdAt' | 'status'>) => Trip;
  updateTrip: (tripId: string, updates: Partial<Trip>) => void;
  getAvailableVehicles: (type?: string) => Vehicle[];
  getUserTrips: (userId: string) => Trip[];
  getDriverTrips: (driverId: string) => Trip[];
  getPendingTrips: (vehicleType?: string) => Trip[];
  confirmTrip: (tripId: string, code: string) => boolean;
  generateConfirmationCode: () => string;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vehicles] = useState<Vehicle[]>([
    {
      id: '1',
      type: 'sedan',
      name: 'Toyota Corolla',
      pricePerKm: 2.5,
      available: true,
      location: { lat: -12.0464, lng: -77.0428 },
      rating: 4.7
    },
    {
      id: '2',
      type: 'suv',
      name: 'Honda CR-V',
      pricePerKm: 3.5,
      available: true,
      location: { lat: -12.0554, lng: -77.0365 },
      rating: 4.8
    },
    {
      id: '3',
      type: 'premium',
      name: 'BMW Serie 3',
      pricePerKm: 5.0,
      available: true,
      location: { lat: -12.0404, lng: -77.0489 },
      rating: 4.9
    },
    {
      id: '4',
      type: 'economy',
      name: 'Nissan Versa',
      pricePerKm: 2.0,
      available: true,
      location: { lat: -12.0634, lng: -77.0328 },
      rating: 4.5
    }
  ]);

  const [trips, setTrips] = useState<Trip[]>([]);

  const generateConfirmationCode = () => {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const createTrip = (tripData: Omit<Trip, 'id' | 'createdAt' | 'status'>): Trip => {
    const newTrip: Trip = {
      ...tripData,
      id: `trip-${Date.now()}`,
      status: 'pending',
      createdAt: new Date(),
      confirmationCode: generateConfirmationCode()
    };
    setTrips(prev => [...prev, newTrip]);
    return newTrip;
  };

  const updateTrip = (tripId: string, updates: Partial<Trip>) => {
    setTrips(prev => prev.map(trip => 
      trip.id === tripId ? { ...trip, ...updates } : trip
    ));
  };

  const getAvailableVehicles = (type?: string) => {
    return vehicles.filter(vehicle => 
      vehicle.available && (!type || vehicle.type === type)
    );
  };

  const getUserTrips = (userId: string) => {
    return trips.filter(trip => trip.userId === userId).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  };

  const getDriverTrips = (driverId: string) => {
    return trips.filter(trip => trip.driverId === driverId).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  };

  const getPendingTrips = (vehicleType?: string) => {
    return trips.filter(trip => {
      if (trip.status !== 'pending') return false;
      if (!vehicleType) return true;
      const vehicle = vehicles.find(v => v.id === trip.vehicleId);
      return vehicle?.type === vehicleType;
    });
  };

  const confirmTrip = (tripId: string, code: string) => {
    const trip = trips.find(t => t.id === tripId);
    if (trip && trip.confirmationCode === code) {
      updateTrip(tripId, { status: 'confirmed' });
      return true;
    }
    return false;
  };

  return (
    <DataContext.Provider value={{
      vehicles,
      trips,
      createTrip,
      updateTrip,
      getAvailableVehicles,
      getUserTrips,
      getDriverTrips,
      getPendingTrips,
      confirmTrip,
      generateConfirmationCode
    }}>
      {children}
    </DataContext.Provider>
  );
};