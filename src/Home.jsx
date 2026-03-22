import { useState } from 'react';
import CarCard from './CarCard';

function Home({ cars, onAdd }) {
  // Створюємо стани для трьох типів фільтрів
  const [transFilter, setTransFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState(false);

  // Логіка фільтрації (Варіант 6, пункт 2)
  const filteredCars = cars.filter(car => {
    const matchTrans = transFilter === 'All' || car.trans === transFilter;
    const matchPrice = priceFilter === 'All' 
      ? true 
      : priceFilter === 'low' ? parseInt(car.price) <= 1200 : parseInt(car.price) > 1200;
    const matchStock = !stockFilter || car.count > 2;

    return matchTrans && matchPrice && matchStock;
  });

  return (
    <section className="container">
      <h1 className="section-title">Наш автопарк</h1>
      
      <div className="filter-section" style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Фільтрація авто</h3>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {/* Фільтр за трансмісією */}
          <div>
            <label>Трансмісія: </label>
            <select className="btn" onChange={(e) => setTransFilter(e.target.value)}>
              <option value="All">Усі</option>
              <option value="Автомат">Автомат</option>
              <option value="Механіка">Механіка</option>
              <option value="Варіатор">Варіатор</option>
            </select>
          </div>

          {/* Фільтр за ціною */}
          <div>
            <label>Ціна: </label>
            <select className="btn" onChange={(e) => setPriceFilter(e.target.value)}>
              <option value="All">Будь-яка</option>
              <option value="low">До 1200 грн</option>
              <option value="high">Понад 1200 грн</option>
            </select>
          </div>

          {/* Фільтр за наявністю */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label> В наявності (2+): </label>
            <input 
              type="checkbox" 
              checked={stockFilter} 
              onChange={() => setStockFilter(!stockFilter)} 
              style={{ width: '20px', height: '20px' }}
            />
          </div>
        </div>
      </div>

      <div className="cars-grid">
        {filteredCars.length > 0 ? (
          filteredCars.map(car => (
            <CarCard key={car.id} car={car} onAdd={onAdd} />
          ))
        ) : (
          <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>Авто за такими критеріями не знайдено.</p>
        )}
      </div>
    </section>
  );
}

export default Home;