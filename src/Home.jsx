import { useState } from 'react';
import CarCard from './CarCard';

function Home({ cars, onAdd, user }) {
  const [transFilter, setTransFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState(false);

  const filteredCars = cars.filter(car => {
    const matchTrans = transFilter === 'All' || car.trans === transFilter;
    
    const carPrice = parseInt(car.price);
    const matchPrice = priceFilter === 'All' 
      ? true 
      : priceFilter === 'low' ? carPrice <= 1200 : carPrice > 1200;

    const matchStock = !stockFilter || car.availableCount > 2;

    return matchTrans && matchPrice && matchStock;
  });

  return (
    <section className="container">
      <h1 className="section-title">Наш автопарк</h1>
      
      {user && (
        <p style={{ textAlign: 'center', color: '#2ecc71', fontWeight: 'bold', marginBottom: '20px' }}>
          Ви увійшли як: {user.email}. Бронювання доступне!
        </p>
      )}
      
      <div className="filter-section" style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '15px', color: '#333' }}>Фільтрація авто</h3>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          <div>
            <label style={{ fontWeight: 'bold' }}>Трансмісія: </label>
            <select className="btn" style={{ padding: '5px' }} onChange={(e) => setTransFilter(e.target.value)}>
              <option value="All">Усі</option>
              <option value="Автомат">Автомат</option>
              <option value="Механіка">Механіка</option>
              <option value="Варіатор">Варіатор</option>
            </select>
          </div>

          <div>
            <label style={{ fontWeight: 'bold' }}>Ціна: </label>
            <select className="btn" style={{ padding: '5px' }} onChange={(e) => setPriceFilter(e.target.value)}>
              <option value="All">Будь-яка</option>
              <option value="low">До 1200 грн</option>
              <option value="high">Понад 1200 грн</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontWeight: 'bold' }}> Багато в наявності (2+): </label>
            <input 
              type="checkbox" 
              checked={stockFilter} 
              onChange={() => setStockFilter(!stockFilter)} 
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>

      <div className="cars-grid">
        {filteredCars.length > 0 ? (
          filteredCars.map(car => (
            <CarCard key={car.id} car={car} onAdd={onAdd} user={user} />
          ))
        ) : (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', fontSize: '1.2rem', marginTop: '20px' }}>
            Авто за такими критеріями не знайдено.
          </p>
        )}
      </div>
    </section>
  );
}

export default Home;