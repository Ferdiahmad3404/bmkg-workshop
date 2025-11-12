import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Stations from './pages/Stations';
import StationsSimple from './pages/Stations_simple';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="stations" element={<Stations />} />
          <Route path="stations-simple" element={<StationsSimple />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;