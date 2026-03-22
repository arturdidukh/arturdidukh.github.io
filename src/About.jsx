// src/About.jsx
function About() {
  return (
    <section className="container">
      <h2 className="section-title">Про AutoSvit</h2>
      <div className="about-content" style={{maxWidth: '800px', margin: '0 auto'}}>
        <p><strong>AutoSvit</strong> — це провідна платформа для оренди автомобілів у Львові. Ми працюємо з 2026 року, надаючи найкращий сервіс та технічно справні авто.</p>
        <div className="contact-info" style={{marginTop: '20px', borderTop: '1px solid #ddd', paddingTop: '10px'}}>
          <p>📍 м. Львів, вул. Кульпарківська 121</p>
          <p>📞 +380 98 359 77 87</p>
        </div>
      </div>
    </section>
  );
}

export default About;