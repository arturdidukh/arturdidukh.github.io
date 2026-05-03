import { useState, useEffect } from 'react';

function Booking({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setOrders([]);

    if (user && user.email) {
      fetch(`http://localhost:5000/api/bookings?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          setOrders(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email]);

  if (!user) return <div className="container" style={{padding: '50px', textAlign: 'center'}}>Будь ласка, увійдіть.</div>;

  return (
    <section className="container">
      <h2 className="section-title">Ваші особисті бронювання</h2>
      
      {loading ? <p style={{textAlign: 'center'}}>Завантаження...</p> : (
        <div className="orders-list">
          {orders.length > 0 ? (
            <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '20px'}}>
              <thead>
                <tr style={{background: '#333', color: 'white'}}>
                  <th style={{padding: '10px', border: '1px solid #ddd'}}>Фото</th>
                  <th style={{padding: '10px', border: '1px solid #ddd'}}>Автомобіль</th>
                  <th style={{padding: '10px', border: '1px solid #ddd'}}>Дата</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} style={{textAlign: 'center'}}>
                    <td style={{padding: '10px', border: '1px solid #ddd'}}>
                      {/* ВИВІД КАРТИНКИ */}
                      <img 
                        src={order.img} 
                        alt={order.car} 
                        style={{width: '100px', height: '60px', objectFit: 'cover', borderRadius: '5px'}} 
                      />
                    </td>
                    <td style={{padding: '10px', border: '1px solid #ddd', fontWeight: 'bold'}}>
                      {order.car}
                    </td>
                    <td style={{padding: '10px', border: '1px solid #ddd'}}>
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{textAlign: 'center', marginTop: '30px'}}>У вас ще немає замовлень.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default Booking;