const About = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">About</h1>
        <p className="text-gray-600">Learn more about BMKG Weather Station Map</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">BMKG Station Map</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          BMKG (Badan Meteorologi, Klimatologi, dan Geofisika) Station Map is a comprehensive 
          platform designed to monitor and manage weather stations across Indonesia. Our system 
          provides real-time weather data, station information, and analytical tools for 
          meteorological research and forecasting.
        </p>
        <p className="text-gray-600 leading-relaxed">
          This application helps meteorologists, researchers, and the public access accurate 
          weather information from various monitoring stations distributed throughout the country.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="text-2xl mr-3">🎯</span>
            Our Mission
          </h3>
          <p className="text-gray-600 leading-relaxed">
            To provide accurate, reliable, and accessible weather information to support 
            public safety, disaster mitigation, and informed decision-making across Indonesia.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="text-2xl mr-3">👁️</span>
            Our Vision
          </h3>
          <p className="text-gray-600 leading-relaxed">
            To be the leading platform for weather monitoring and data management, 
            contributing to a safer and more prepared society against weather-related risks.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 rounded-full p-3 text-2xl">📍</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Station Management</h4>
              <p className="text-sm text-gray-600">
                Comprehensive database of all weather stations with detailed information 
                and real-time status monitoring.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-green-100 rounded-full p-3 text-2xl">🌤️</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Real-time Weather Data</h4>
              <p className="text-sm text-gray-600">
                Access to live weather data including temperature, humidity, wind speed, 
                and precipitation from all stations.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 rounded-full p-3 text-2xl">📊</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Analytics & Reports</h4>
              <p className="text-sm text-gray-600">
                Advanced analytics tools and customizable reports for weather patterns 
                and historical data analysis.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-orange-100 rounded-full p-3 text-2xl">🗺️</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Interactive Map</h4>
              <p className="text-sm text-gray-600">
                Visual representation of all stations on an interactive map with 
                filtering and search capabilities.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg shadow-md p-8 mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
        <div className="space-y-2 text-gray-700">
          <p><strong>Email:</strong> info@bmkg.go.id</p>
          <p><strong>Phone:</strong> +62 21 4246321</p>
          <p><strong>Address:</strong> Jl. Angkasa I No.2, Kemayoran, Jakarta Pusat</p>
        </div>
      </div>
    </div>
  );
};

export default About;
