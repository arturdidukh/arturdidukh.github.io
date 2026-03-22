// src/Booking.jsx
function Booking({ count }) {
  return (
    <section className="container">
      <h2 className="section-title">Ваші бронювання</h2>
      <div className="booking-status" style={{textAlign: 'center', padding: '20px'}}>
        {count > 0 ? (
          <p>Ви успішно обрали <strong>{count}</strong> автомобілів для оренди.</p>
        ) : (
          <p>Ваш список бронювань поки що порожній.</p>
        )}
      </div>
    </section>
  );
}

export default Booking;