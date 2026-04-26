import { useState } from 'react';
import { auth } from './firebase'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleAction = async (type) => {
  const cleanEmail = email.trim();

  try {
    if (type === 'reg') {
      const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
      console.log("Зареєстровано:", userCredential.user);
      alert("Реєстрація успішна!");
    } else {
      const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
      console.log("Увійшов:", userCredential.user);
      alert("Ви увійшли в систему!");
    }
  } catch (error) {
    console.error("Детальна помилка:", error.code, error.message);
    
    if (error.code === 'auth/invalid-email') alert("Неправильний формат пошти");
    else if (error.code === 'auth/user-not-found') alert("Користувача не знайдено. Спочатку натисніть Реєстрація");
    else if (error.code === 'auth/wrong-password') alert("Невірний пароль");
    else alert("Помилка від Firebase: " + error.code);
  }
};

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Вхід до AutoSvit</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={{display:'block', margin:'10px auto', padding:'10px'}} />
      <input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} style={{display:'block', margin:'10px auto', padding:'10px'}} />
      <button className="btn" onClick={() => handleAction('login')}>Увійти</button>
      <button className="btn" onClick={() => handleAction('reg')} style={{marginLeft: '10px', background: '#555'}}>Реєстрація</button>
    </div>
  );
}

export default Auth;