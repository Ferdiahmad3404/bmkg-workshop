import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">BMKG Station Map</h1>
          </div>
          <nav className="flex space-x-6">
            <Link 
              to="/" 
              className="hover:text-blue-200 transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              to="/stations" 
              className="hover:text-blue-200 transition-colors duration-200"
            >
              Stations
            </Link>
            <Link 
              to="/stations-simple" 
              className="hover:text-blue-200 transition-colors duration-200"
            >
              Stations Simple
            </Link>
            <Link 
              to="/about" 
              className="hover:text-blue-200 transition-colors duration-200"
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
