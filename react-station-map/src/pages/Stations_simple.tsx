import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Interface sederhana untuk data stasiun
interface StationData {
  code: string;
  name: string;
  lat: number;
  lon: number;
  status: string;
  location: string;
  province: string;
}

// Data hardcoded untuk stasiun (sederhana)
const hardcodedStations: StationData[] = [
  {
    code: 'JAK',
    name: 'Jakarta',
    lat: -6.2088,
    lon: 106.8456,
    status: 'active',
    location: 'Jakarta Pusat',
    province: 'DKI Jakarta'
  },
  {
    code: 'BDG',
    name: 'Bandung',
    lat: -6.9175,
    lon: 107.6191,
    status: 'active',
    location: 'Bandung',
    province: 'Jawa Barat'
  },
  {
    code: 'SBY',
    name: 'Surabaya',
    lat: -7.2575,
    lon: 112.7521,
    status: 'inactive',
    location: 'Surabaya',
    province: 'Jawa Timur'
  },
  {
    code: 'DPS',
    name: 'Denpasar',
    lat: -8.6705,
    lon: 115.2126,
    status: 'active',
    location: 'Denpasar',
    province: 'Bali'
  },
  {
    code: 'MDN',
    name: 'Medan',
    lat: 3.5952,
    lon: 98.6722,
    status: 'maintenance',
    location: 'Medan',
    province: 'Sumatera Utara'
  }
];

const StationsSimple = () => {
  // State untuk menyimpan data stasiun
  const [stations, setStations] = useState<StationData[]>([]);

  // State untuk loading
  const [loading, setLoading] = useState(true);

  // useEffect untuk "memuat" data (simulasi loading)
  useEffect(() => {
    // Simulasi loading selama 1 detik
    const timer = setTimeout(() => {
      setStations(hardcodedStations);
      setLoading(false);
    }, 1000);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  // Fungsi untuk mendapatkan warna status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'inactive':
        return 'text-red-600 bg-red-100';
      case 'maintenance':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Fungsi untuk mendapatkan icon status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return '🟢';
      case 'inactive':
        return '🔴';
      case 'maintenance':
        return '🟡';
      default:
        return '⚪';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading stations data...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Weather Stations (Simple)</h1>
        <p className="text-gray-600">Simple version with hardcoded data for learning purposes</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Stations</p>
              <p className="text-2xl font-bold text-blue-600">{stations.length}</p>
            </div>
            <span className="text-3xl">📍</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Stations</p>
              <p className="text-2xl font-bold text-green-600">
                {stations.filter(s => s.status === 'active').length}
              </p>
            </div>
            <span className="text-3xl">🟢</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inactive Stations</p>
              <p className="text-2xl font-bold text-red-600">
                {stations.filter(s => s.status === 'inactive').length}
              </p>
            </div>
            <span className="text-3xl">🔴</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Maintenance</p>
              <p className="text-2xl font-bold text-yellow-600">
                {stations.filter(s => s.status === 'maintenance').length}
              </p>
            </div>
            <span className="text-3xl">🟡</span>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Station Locations</h2>
        <div className="h-96 rounded-lg overflow-hidden">
          <MapContainer
            center={[-2.5, 118]} // Center of Indonesia
            zoom={5}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {stations.map((station) => (
              <Marker
                key={station.code}
                position={[station.lat, station.lon]}
              />
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Stations Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Stations List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Station
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coordinates
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stations.map((station) => (
                <tr
                  key={station.code}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{station.name}</div>
                      <div className="text-sm text-gray-500">{station.code}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(station.status)}`}>
                      {getStatusIcon(station.status)} {station.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div>{station.location}</div>
                      <div className="text-xs">{station.province}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {station.lat.toFixed(4)}, {station.lon.toFixed(4)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StationsSimple;