import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { auth, db } from './firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 

import './App.css';
import Auth from './Auth';
import Home from './Home';
import About from './About';
import Booking from './Booking';

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleOrder = async (carName) => {
    if (!user) {
      alert("Будь ласка, спочатку увійдіть у систему!");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userEmail: user.email,
        carName: carName,
        createdAt: serverTimestamp()
      });

      setCount(prev => prev + 1);
      
      alert(`Успішно! ${carName} додано до ваших замовлень.`);
    } catch (error) {
      console.error("Помилка бази даних:", error);
      alert("Сталася помилка при збереженні замовлення.");
    }
  };

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
                    <button onClick={() => auth.signOut()} style={{background: 'red', color: 'white', border: 'none', cursor: 'pointer', padding: '5px 10px', borderRadius: '4px', marginLeft: '10px'}}>
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
            <Route path="/booking" element={<Booking count={count} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer>
          <div className="container">
            <p>&copy; 2026 AutoSvit Львів. вул. Кульпарківська 121 | +380 98 359 77 87</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;