const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const ORDERS_FILE = path.join(__dirname, "orders.json");

let carsAvailability = {
  skoda_oct: 3,
  renault_meg: 5,
  hyundai_tuc: 2,
  vw_golf: 3,
  bmw_x5: 1,
  ford_fusion: 5
};

if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
}

app.get("/api/cars/availability", (req, res) => {
  res.json(carsAvailability);
});

app.get("/api/bookings", (req, res) => {
  try {
    const userEmail = req.query.email;
    const data = fs.readFileSync(ORDERS_FILE, "utf-8");
    let orders = JSON.parse(data);
    if (userEmail) {
      orders = orders.filter(order => order.user === userEmail);
    } else {
      orders = []; 
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Помилка сервера" });
  }
});

app.post("/api/bookings", (req, res) => {
  try {
    const { userEmail, carName, carId, carImg } = req.body; 

    if (!carsAvailability[carId] || carsAvailability[carId] <= 0) {
      return res.status(400).json({ message: `Вибачте, ${carName} закінчилися.` });
    }

    const fileData = fs.readFileSync(ORDERS_FILE, "utf-8");
    const orders = JSON.parse(fileData);
    
    carsAvailability[carId] -= 1;

    const newOrder = {
      id: Date.now(),
      user: userEmail, 
      car: carName,
      img: carImg, 
      date: new Date().toLocaleString("uk-UA"),
      status: "Підтверджено"
    };

    orders.push(newOrder);
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
    res.status(200).json({ success: true, message: "Бронювання успішне!" });
  } catch (err) {
    res.status(500).json({ error: "Помилка запису" });
  }
});

app.listen(5000, () => console.log("Сервер працює на порті 5000"));