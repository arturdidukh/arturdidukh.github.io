import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import CarCard from './CarCard';
import Home from './Home';
import About from './About';
import Booking from './Booking';

function App() {
  const [count, setCount] = useState(0);

  const cars = [
    { id: 1, name: "Skoda Octavia", img: "https://www.actualidadmotor.com/wp-content/uploads/2022/02/Skoda-Octavia-2024-Portada.jpg", trans: "Автомат", price: "1200 грн", count: 3 },
    { id: 2, name: "Renault Megane", img: "https://img.chceauto.pl/renault/megane/renault-megane-hatchback-5-drzwiowy-4389-47999_v2.jpg", trans: "Механіка", price: "900 грн", count: 5 },
    { id: 3, name: "Hyundai Tucson", img: "https://www.topgear.com/sites/default/files/2024/12/hyundai-tucson-ultimate-17.jpg", trans: "Автомат", price: "1600 грн", count: 2 },
    { id: 4, name: "Volkswagen Golf 7", img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1200&auto=format&fit=crop", trans: "Автомат", price: "1100 грн", count: 3 },
    { id: 5, name: "BMW X5", img: "https://motormatch.com/uploads/p90331850-highres-the-bmw-x5-m50d.jpg", trans: "Автомат", price: "4200 грн", count: 1 },
    { id: 6, name: "Ford Fusion Hybrid", img: "https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/images/12q4/477954/2013-ford-fusion-hybrid-road-test-review-car-and-driver-photo-486622-s-original.jpg", trans: "Варіатор", price: "1400 грн", count: 5 }
  ];

  return (
    <Router>
      <div className="main-wrapper">
        <header>
          <div className="logo">Auto<span>Svit</span> (Обрано: {count})</div>
          <nav>
            <ul className="nav-links">
              <li><Link to="/">Автомобілі</Link></li>
              <li><Link to="/booking">Бронювання</Link></li>
              <li><Link to="/about">Про нас</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home cars={cars} onAdd={() => setCount(count + 1)} />} />
            <Route path="/booking" element={<Booking count={count} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer>
          <div className="container">
            <p>&copy; 2026 AutoSvit Львів.  вул. Кульпарківська 121  |  380 98 359 77 87</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App