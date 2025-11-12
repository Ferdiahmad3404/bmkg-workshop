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

interface StationProperties {
  ipaddr: string;
  net: string;
  sta: string;
  locid: string;
  time: string;
  ch1: string;
  ch2: string;
  ch3: string;
  ch4: string;
  ch5: string;
  ch6: string;
  timech1: string;
  timech2: string;
  timech3: string;
  timech4: string;
  timech5: string;
  timech6: string;
  location: string;
  provin: string;
  country: string;
  merkdgtz: string;
  merkbb: string;
  merkac: string;
  uptbmkg: string;
  latency1: string;
  latency2: string;
  latency3: string;
  latency4: string;
  latency5: string;
  latency6: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
}

interface StationGeometry {
  type: string;
  coordinates: [string, string, number]; // [longitude, latitude, elevation]
}

interface StationFeature {
  type: string;
  properties: StationProperties;
  geometry: StationGeometry;
}

interface ApiResponse {
  type: string;
  features: StationFeature[];
}

interface StationData {
  code: string;
  name: string;
  lat: number;
  lon: number;
  status: string;
  last_update: string;
  location: string;
  province: string;
  network: string;
  ipaddr: string;
  latency: string;
  channels: {
    ch1: { name: string; time: string; color: string; latency: string };
    ch2: { name: string; time: string; color: string; latency: string };
    ch3: { name: string; time: string; color: string; latency: string };
    ch4: { name: string; time: string; color: string; latency: string };
    ch5: { name: string; time: string; color: string; latency: string };
    ch6: { name: string; time: string; color: string; latency: string };
  };
}

const Stations = () => {
  const [stations, setStations] = useState<StationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function for safe date formatting
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      return date.toLocaleString();
    } catch {
      return 'Invalid Date';
    }
  };

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/bmkg/sismon-slmon2/data/slmon.all.laststatus.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ApiResponse = await response.json();

        // Map GeoJSON features to our StationData format
        const mappedStations: StationData[] = data.features.map((feature) => {
          const props = feature.properties;
          const coords = feature.geometry.coordinates;

          // Determine status based on channel colors
          const colors = [props.color1, props.color2, props.color3, props.color4, props.color5, props.color6];
          const hasGrey = colors.some(color => color === 'grey');
          const hasRed = colors.some(color => color === 'red');
          const hasYellow = colors.some(color => color === 'yellow');

          let status = 'active';
          if (hasRed) status = 'offline';
          else if (hasYellow) status = 'maintenance';
          else if (hasGrey) status = 'inactive';

          // Get the most recent channel time as last_update
          const channelTimes = [
            props.timech1 && !isNaN(Date.parse(props.timech1)) ? new Date(props.timech1) : null,
            props.timech2 && !isNaN(Date.parse(props.timech2)) ? new Date(props.timech2) : null,
            props.timech3 && !isNaN(Date.parse(props.timech3)) ? new Date(props.timech3) : null,
            props.timech4 && !isNaN(Date.parse(props.timech4)) ? new Date(props.timech4) : null,
            props.timech5 && !isNaN(Date.parse(props.timech5)) ? new Date(props.timech5) : null,
            props.timech6 && !isNaN(Date.parse(props.timech6)) ? new Date(props.timech6) : null,
          ].filter(time => time !== null) as Date[];

          // Use the latest valid time, or fallback to current time if no valid times
          const latestTime = channelTimes.length > 0
            ? new Date(Math.max(...channelTimes.map(t => t.getTime())))
            : new Date(); // fallback to current time

          return {
            code: props.sta,
            name: props.location.split(',')[0] || props.sta, // Use first part of location or station code
            lat: parseFloat(coords[1]), // latitude is second coordinate
            lon: parseFloat(coords[0]), // longitude is first coordinate
            status,
            last_update: latestTime.toISOString(),
            location: props.location,
            province: props.provin,
            network: props.net,
            ipaddr: props.ipaddr,
            latency: props.latency1, // Use first channel latency as representative
            channels: {
              ch1: { name: props.ch1, time: props.timech1, color: props.color1, latency: props.latency1 },
              ch2: { name: props.ch2, time: props.timech2, color: props.color2, latency: props.latency2 },
              ch3: { name: props.ch3, time: props.timech3, color: props.color3, latency: props.latency3 },
              ch4: { name: props.ch4, time: props.timech4, color: props.color4, latency: props.latency4 },
              ch5: { name: props.ch5, time: props.timech5, color: props.color5, latency: props.latency5 },
              ch6: { name: props.ch6, time: props.timech6, color: props.color6, latency: props.latency6 },
            }
          };
        });

        setStations(mappedStations);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stations data');
        console.error('Error fetching stations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'online':
        return 'text-green-600 bg-green-100';
      case 'inactive':
      case 'offline':
        return 'text-red-600 bg-red-100';
      case 'maintenance':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'online':
        return '🟢';
      case 'inactive':
      case 'offline':
        return '🔴';
      case 'maintenance':
        return '🟡';
      default:
        return '⚪';
    }
  };

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

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <span className="text-red-500 text-xl mr-3">⚠️</span>
          <div>
            <h3 className="text-red-800 font-semibold">Error Loading Data</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Weather Stations</h1>
        <p className="text-gray-600">Real-time monitoring of BMKG weather stations across Indonesia</p>
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
                {stations.filter(s => s.status === 'inactive' || s.status === 'offline').length}
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
                  Network
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Latency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Update
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {station.network}
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
                    {station.latency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(station.last_update)}
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

export default Stations;