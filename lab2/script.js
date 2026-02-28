const carCards = document.querySelectorAll('.car-card');

for (let i = 0; i < carCards.length; i++) {
    carCards[i].style.opacity = "0";
    carCards[i].style.transition = "all 0.5s ease";
    
    setTimeout(() => {
        carCards[i].style.opacity = "1";
    }, i * 150);

    carCards[i].addEventListener('mouseenter', function() {
        const priceText = this.querySelector('ul li:nth-child(2)').innerText;
        const price = parseInt(priceText.replace(/\D/g, ""));

        if (price > 1500) {
            this.style.boxShadow = "0 10px 20px rgba(255, 0, 0, 0.3)";
        } else {
            this.style.boxShadow = "0 10px 20px rgba(255, 204, 0, 0.4)";
        }
    });

    carCards[i].addEventListener('mouseleave', function() {
        this.style.boxShadow = "0 5px 15px rgba(0,0,0,0.05)";
    });
}

const orderButtons = document.querySelectorAll('.order-btn');

orderButtons.forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = "scale(0.9)";
        setTimeout(() => this.style.transform = "scale(1)", 100);

        if (!this.classList.contains('active-order')) {
            this.innerText = "У кошику";
            this.classList.add('active-order');
        } else {
            this.innerText = "Замовити";
            this.classList.remove('active-order');
        }
    });
});

const toggleBtn = document.getElementById('toggle-form-btn');
const bookingSection = document.getElementById('booking-section');

bookingSection.style.display = "none";

toggleBtn.addEventListener('click', function() {
    if (bookingSection.style.display === "none") {
        bookingSection.style.display = "block";
        bookingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        bookingSection.style.display = "none";
    }
});

const form = document.getElementById('car-order-form');
const resultBlock = document.getElementById('confirmation-result');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('client-name').value;
    const start = document.getElementById('rent-start').value;
    const end = document.getElementById('rent-end').value;

    if (name.length < 2) {
        alert("Будь ласка, введіть коректне ім'я");
    } else if (!start || !end) {
        alert("Будь ласка, оберіть дати оренди");
    } else {
        resultBlock.innerHTML = `Дякуємо, ${name}! Ваше замовлення прийнято на період з ${start} по ${end}.`;
        resultBlock.style.display = "block";
        form.reset();
    }
});

let count = 0;
const allCars = document.querySelectorAll('.car-card h3');
console.log("--- Звіт по автопарку ---");
while (count < allCars.length) {
    console.log(`Авто №${count + 1}: ${allCars[count].innerText}`);
    count++;
}