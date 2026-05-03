import React from 'react';

function CarCard({ car, onAdd, user }) {
  return (
    <article className="car-card">
      <img src={car.img} alt={car.name} />
      <div className="car-info">
        <h3>{car.name}</h3>
        <ul>
          <li><strong>Трансмісія:</strong> {car.trans}</li>
          <li><strong>Ціна/доба:</strong> {car.price}</li>
          <li><strong>В наявності:</strong> {car.availableCount} од.</li>
        </ul>

        {user ? (
          <button className="btn" onClick={() => onAdd(car)}>
            ЗАМОВИТИ
          </button>
        ) : (
          <p style={{ 
            color: '#e74c3c', 
            fontWeight: 'bold', 
            fontSize: '0.9rem',
            marginTop: '10px',
            border: '1px solid #e74c3c',
            padding: '5px',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            Увійдіть, щоб забронювати
          </p>
        )}
      </div>
    </article>
  );
}

export default CarCard;