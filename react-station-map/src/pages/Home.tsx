const Home = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to BMKG Weather Station Map</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Stations</h3>
            <span className="text-3xl">📍</span>
          </div>
          <p className="text-3xl font-bold text-blue-600">125</p>
          <p className="text-sm text-gray-500 mt-2">Active weather stations</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Weather Data</h3>
            <span className="text-3xl">🌤️</span>
          </div>
          <p className="text-3xl font-bold text-green-600">98%</p>
          <p className="text-sm text-gray-500 mt-2">Data availability</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Reports</h3>
            <span className="text-3xl">📊</span>
          </div>
          <p className="text-3xl font-bold text-purple-600">1,543</p>
          <p className="text-sm text-gray-500 mt-2">Total reports today</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 pb-3 border-b">
              <span className="text-blue-500">🔵</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">New station added</p>
                <p className="text-xs text-gray-500">Jakarta Selatan - 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 pb-3 border-b">
              <span className="text-green-500">🟢</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Weather data updated</p>
                <p className="text-xs text-gray-500">All stations - 5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-yellow-500">🟡</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Maintenance scheduled</p>
                <p className="text-xs text-gray-500">Station #45 - Tomorrow</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors duration-200">
              Add Station
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-colors duration-200">
              View Map
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg transition-colors duration-200">
              Generate Report
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg transition-colors duration-200">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
