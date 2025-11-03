// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// ========== AUTO-CALCULATE WORK DURATION ==========
function calculateDuration(startDate, endDate) {
    const start = new Date(startDate + '-01'); // Add day
    const end = endDate === 'current' ? new Date() : new Date(endDate + '-01');
    
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    let duration = '';
    if (years > 0) {
        duration += years + (years === 1 ? ' tahun' : ' tahun');
    }
    if (months > 0) {
        if (duration) duration += ' ';
        duration += months + (months === 1 ? ' bulan' : ' bulan');
    }
    
    return duration || '< 1 bulan';
}

// Update all timeline dates with duration
document.addEventListener('DOMContentLoaded', () => {
    const timelineDates = document.querySelectorAll('.timeline-date[data-start]');
    
    timelineDates.forEach(element => {
        const startDate = element.getAttribute('data-start');
        const endDate = element.getAttribute('data-end');
        const currentText = element.textContent;
        const duration = calculateDuration(startDate, endDate);
        
        // Add duration to existing text
        element.textContent = `${currentText} (${duration})`;
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Navbar Background on Scroll
const navbar = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = '#ffffff';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe timeline items, skill categories, etc.
document.querySelectorAll('.timeline-item, .skill-category, .stat-box, .education-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link
    const mailtoLink = `mailto:wira.putrawan@professional.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Show success message
    alert('Thank you for reaching out! Your email client will open shortly.');
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form
    contactForm.reset();
    
    // Note: For production, consider integrating with:
    // - EmailJS (https://www.emailjs.com/)
    // - FormSpree (https://formspree.io/)
    // - Custom backend API
});

// Typing Effect for Hero Title (Optional Enhancement)
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//     const text = heroTitle.innerHTML;
//     heroTitle.innerHTML = '';
//     let i = 0;
//     
//     function typeWriter() {
//         if (i < text.length) {
//             heroTitle.innerHTML += text.charAt(i);
//             i++;
//             setTimeout(typeWriter, 50);
//         }
//     }
//     
//     // Uncomment to enable typing effect
//     // setTimeout(typeWriter, 500);
// }

// Add Scroll-to-Top Button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    display: none;
    z-index: 999;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px)';
    scrollTopBtn.style.background = 'var(--secondary-color)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0)';
    scrollTopBtn.style.background = 'var(--primary-color)';
});

// Console message for developers
console.log('%c👋 Hey Developer!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cThanks for visiting my portfolio!', 'color: #6b7280; font-size: 14px;');
console.log('%cInterested in collaborating? Let\'s connect!', 'color: #10b981; font-size: 14px;');
console.log('%c🔗 LinkedIn: linkedin.com/in/wira-putrawan', 'color: #0077b5; font-size: 12px;');
