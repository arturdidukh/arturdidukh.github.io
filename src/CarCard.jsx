// src/CarCard.jsx
function CarCard({ car, onAdd }) {
  return (
    <article className="car-card">
      <img src={car.img} alt={car.name} />
      <div className="car-info">
        <h3>{car.name}</h3>
        <ul>
          <li><strong>Трансмісія:</strong> {car.trans}</li>
          <li><strong>Ціна/доба:</strong> {car.price}</li>
          <li><strong>В наявності:</strong> {car.count} од.</li>
        </ul>
        {/* Додано onClick={onAdd} */}
        <button className="btn" onClick={onAdd}>
          ЗАМОВИТИ
        </button>
      </div>
    </article>
  );
}

export default CarCard;