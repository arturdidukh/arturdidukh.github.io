import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { auth } from './firebase'; 
import { onAuthStateChanged } from 'firebase/auth';


import './App.css';
import Auth from './Auth';
import Home from './Home';
import About from './About';
import Booking from './Booking';

function App() {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('orderCount');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  const [user, setUser] = useState(null);
  const [serverAvailability, setServerAvailability] = useState({});

  useEffect(() => {
    localStorage.setItem('orderCount', count.toString());
  }, [count]);

  const fetchAvailability = () => {
    fetch("http://localhost:5000/api/cars/availability")
      .then(res => res.json())
      .then(data => setServerAvailability(data))
      .catch(err => console.error("Помилка залишків:", err));
  };

  useEffect(() => {
    fetchAvailability();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setCount(0);
        localStorage.removeItem('orderCount');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleOrder = async (car) => {
    if (!user) {
      alert("Будь ласка, спочатку увійдіть у систему!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user.email,
          carId: car.id,
          carName: car.name,
          carImg: car.img 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCount(prev => prev + 1);
        alert(data.message);
        fetchAvailability();
      } else {
        alert(data.message || "Помилка бронювання");
      }
    } catch (error) {
      alert("Сервер не відповідає.");
    }
  };

  const cars = [
    { id: "skoda_oct", name: "Skoda Octavia", img: "https://www.actualidadmotor.com/wp-content/uploads/2022/02/Skoda-Octavia-2024-Portada.jpg", trans: "Автомат", price: "1200 грн", availableCount: serverAvailability.skoda_oct ?? 0 },
    { id: "renault_meg", name: "Renault Megane", img: "https://img.chceauto.pl/renault/megane/renault-megane-hatchback-5-drzwiowy-4389-47999_v2.jpg", trans: "Механіка", price: "900 грн", availableCount: serverAvailability.renault_meg ?? 0 },
    { id: "hyundai_tuc", name: "Hyundai Tucson", img: "https://www.topgear.com/sites/default/files/2024/12/hyundai-tucson-ultimate-17.jpg", trans: "Автомат", price: "1600 грн", availableCount: serverAvailability.hyundai_tuc ?? 0 },
    { id: "vw_golf", name: "Volkswagen Golf 7", img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1200&auto=format&fit=crop", trans: "Автомат", price: "1100 грн", availableCount: serverAvailability.vw_golf ?? 0 },
    { id: "bmw_x5", name: "BMW X5", img: "https://motormatch.com/uploads/p90331850-highres-the-bmw-x5-m50d.jpg", trans: "Автомат", price: "4200 грн", availableCount: serverAvailability.bmw_x5 ?? 0 },
    { id: "ford_fusion", name: "Ford Fusion Hybrid", img: "https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/images/12q4/477954/2013-ford-fusion-hybrid-road-test-review-car-and-driver-photo-486622-s-original.jpg", trans: "Варіатор", price: "1400 грн", availableCount: serverAvailability.ford_fusion ?? 0 }
  ];

  return (
    <Router>
      <div className="main-wrapper">
        <header>
          <div className="logo">
            Auto<span>Svit</span> {user && `(Обрано: ${count})`}
          </div>
          <nav>
            <ul className="nav-links">
              <li><Link to="/">Автомобілі</Link></li>
              <li><Link to="/booking">Бронювання</Link></li>
              <li><Link to="/about">Про нас</Link></li>

              {!user ? (
                <li><Link to="/auth" style={{color: 'yellow', fontWeight: 'bold'}}>УВІЙТИ</Link></li>
              ) : (
                <>
                  <li style={{color: '#ccc', fontSize: '12px'}}>{user.email}</li>
                  <li>
                    <button 
                      onClick={() => auth.signOut()} 
                      style={{
                        background: '#e74c3c', 
                        color: 'white', 
                        border: 'none', 
                        cursor: 'pointer', 
                        padding: '8px 15px', 
                        borderRadius: '4px', 
                        marginLeft: '10px',
                        fontWeight: 'bold'
                      }}>
                      ВИЙТИ
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Home cars={cars} onAdd={handleOrder} user={user} />} />
            <Route path="/booking" element={<Booking user={user} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer style={{ background: '#222', color: '#fff', padding: '20px 0', marginTop: '40px', textAlign: 'center' }}>
          <div className="container">
            <p>&copy; 2026 AutoSvit Львів. вул. Кульпарківська 121 | +380 98 359 77 87</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;