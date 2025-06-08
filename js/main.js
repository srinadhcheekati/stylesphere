function getLoggedInUser() {
  return localStorage.getItem('loggedInUser');
}

if (document.getElementById('services-list')) {
  if (!getLoggedInUser()) {
    alert('Please login first.');
    window.location.href = 'index.html';
  }

  const body = document.body;
  const selectedGender = localStorage.getItem('selectedGender');
  body.classList.add(selectedGender); // Apply gender-based background

  const servicesListEl = document.getElementById('services-list');
  const serviceSelectEl = document.getElementById('selected-service');
  const bookingDateEl = document.getElementById('booking-date');
  const bookingTimeEl = document.getElementById('booking-time');
  const bookBtn = document.getElementById('book-btn');
  const bookingMessage = document.getElementById('booking-message');

  const today = new Date().toISOString().split('T')[0];
  bookingDateEl.setAttribute('min', today);

  const servicesData = {
    male: [
      { name: 'Haircut', price: '₹300', description: 'Classic men\'s haircut', image: 'male_haircut.jpg' },
      { name: 'Beard Trim', price: '₹150', description: 'Shaping and trimming', image: 'beard_trim.jpg' },
      { name: 'Facial', price: '₹400', description: 'Refreshing facial treatment', image: 'facial_male.jpg' },
      { name: 'Head Massage', price: '₹200', description: 'Relaxing scalp massage', image: 'head_massage.jpg' }
    ],
    female: [
      { name: 'Haircut', price: '₹500', description: 'Women\'s haircut and styling', image: 'female_haircut.jpg' },
      { name: 'Manicure', price: '₹350', description: 'Nail shaping and polish', image: 'manicure.jpg' },
      { name: 'Pedicure', price: '₹400', description: 'Foot care and nail polish', image: 'pedicure.jpg' },
      { name: 'Bridal Makeup', price: '₹3000', description: 'Complete bridal package', image: 'bridal.jpg' },
      { name: 'Facial', price: '₹600', description: 'Deep cleansing facial', image: 'facial_female.jpg' }
    ]
  };

  function renderServices() {
    servicesListEl.innerHTML = '';
    serviceSelectEl.innerHTML = '';

    const services = servicesData[selectedGender] || [];

    if (services.length === 0) {
      servicesListEl.textContent = 'No services available.';
      return;
    }

    services.forEach(service => {
      const div = document.createElement('div');
      div.className = 'service-item';

      div.innerHTML = `
        <div class="card">
          <img src="images/${service.image}" alt="${service.name}">
          <div class="card-info">
            <h3>${service.name} - ${service.price}</h3>
            <p>${service.description}</p>
          </div>
        </div>
      `;
      servicesListEl.appendChild(div);

      // Populate select dropdown
      const option = document.createElement('option');
      option.value = service.name;
      option.textContent = `${service.name} - ${service.price}`;
      serviceSelectEl.appendChild(option);
    });
  }

  renderServices();

  bookBtn.addEventListener('click', () => {
    const service = serviceSelectEl.value;
    const date = bookingDateEl.value;
    const time = bookingTimeEl.value;

    if (!service || !date || !time) {
      bookingMessage.style.color = 'red';
      bookingMessage.textContent = 'Please select a service, date, and time.';
      return;
    }

    const bookingInfo = {
      user: getLoggedInUser(),
      gender: selectedGender,
      service,
      date,
      time,
      timestamp: new Date().toISOString()
    };

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(bookingInfo);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    bookingMessage.style.color = 'green';
    bookingMessage.textContent = `Booking confirmed for ${service} on ${date} at ${time}. Thank you!`;
  });
}
