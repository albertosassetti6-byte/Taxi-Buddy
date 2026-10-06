// ================================
// LIVE DATE AND TIME UPDATE
// ================================
function updateDateTime() {
    const now = new Date();

    // Date options (English format)
    const dateOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    // Time options
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    const dateString = now.toLocaleDateString('en-US', dateOptions);
    const timeString = now.toLocaleTimeString('en-US', timeOptions);

    const dateEl = document.getElementById('date-display');
    const timeEl = document.getElementById('time-display');

    if (dateEl) dateEl.textContent = dateString;
    if (timeEl) timeEl.textContent = timeString;
}

// Update immediately and every second
updateDateTime();
setInterval(updateDateTime, 1000);

// ================================
// NOTIFICATION POPUP
// ================================
const users = ['Luca', 'Giulia', 'Marco', 'Sara', 'Alessandro', 'Francesca', 'Matteo', 'Chiara'];
const locations = [
    'Rome Airport - City Center',
    'Termini Station - Trastevere',
    'Colosseum - Vatican',
    'Fiumicino - Piazza Venezia',
    'Ciampino - Tiburtina Station',
    'Piazza Navona - EUR',
    'St. Peter - Monti'
];
const ratings = ['Excellent service', 'Great service', 'Fantastic service', 'Flawless service'];

function showPopup() {
    const popup = document.getElementById('popup');
    if (!popup) return;

    const user = users[Math.floor(Math.random() * users.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const rating = ratings[Math.floor(Math.random() * ratings.length)];
    const minutesAgo = Math.floor(Math.random() * 10) + 1;

    document.getElementById('popup-user').textContent = user;
    document.getElementById('popup-route').textContent = location;
    document.getElementById('popup-time').textContent = `${minutesAgo} minutes ago`;

    const ratingElement = document.querySelector('.popup-rating');
    if (ratingElement) {
        ratingElement.innerHTML = `${rating} <span class="stars">★★★★★</span>`;
    }

    popup.classList.add('show');

    setTimeout(() => {
        popup.classList.remove('show');
    }, 6000);
}

// First popup after 3 seconds
setTimeout(showPopup, 3000);

// Then every 2 minutes (120000 ms)
setInterval(showPopup, 120000);

// ================================
// SMOOTH SCROLL
// ================================
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================
// SECTION ENTRANCE ANIMATION (Intersection Observer)
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards and sections
document.querySelectorAll('.service-card, .payment-card, .faq-item, .about, .contact').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
