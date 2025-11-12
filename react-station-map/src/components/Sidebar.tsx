import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/stations', label: 'Stations', icon: '📍' },
    { path: '/stations-simple', label: 'Stations Simple', icon: '🎓' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/weather', label: 'Weather', icon: '🌤️' },
    { path: '/reports', label: 'Reports', icon: '📊' },
  ];

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Menu</h2>
        <div className="h-1 w-12 bg-blue-500"></div>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-700'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 pt-8 border-t border-gray-700">
        <div className="text-sm text-gray-400">
          <p className="mb-2">Weather Station</p>
          <p className="text-xs">Version 1.0.0</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
