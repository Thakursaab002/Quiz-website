const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const authButtons = document.querySelector('.auth-buttons');

hamburger.addEventListener('click', () => {
    if (!document.querySelector('.mobile-menu')) {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.style.position = 'fixed';
        mobileMenu.style.top = '80px';
        mobileMenu.style.left = '0';
        mobileMenu.style.right = '0';
        mobileMenu.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--light');
        mobileMenu.style.padding = '20px';
        mobileMenu.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        mobileMenu.style.zIndex = '999';
        
        if (body.classList.contains('dark-mode')) {
            mobileMenu.style.backgroundColor = '#1e1e1e';
            mobileMenu.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        }
        const mobileNav = navLinks.cloneNode(true);
        mobileNav.style.flexDirection = 'column';
        mobileNav.querySelectorAll('li').forEach(li => {
            li.style.margin = '15px 0';
        });
        const mobileAuth = authButtons.cloneNode(true);
        mobileAuth.style.flexDirection = 'column';
        mobileAuth.querySelector('.login-btn').style.margin = '0 0 15px 0';
        mobileAuth.querySelector('.signup-btn').style.width = '100%';
        mobileAuth.querySelector('.dark-mode-toggle').style.display = 'none';
        
        mobileMenu.appendChild(mobileNav);
        mobileMenu.appendChild(mobileAuth);
        
        document.body.appendChild(mobileMenu);
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '15px';
        closeButton.style.right = '15px';
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.fontSize = '1.5rem';
        closeButton.style.cursor = 'pointer';
        
        if (body.classList.contains('dark-mode')) {
            closeButton.style.color = 'white';
        }
        
        closeButton.addEventListener('click', () => {
            document.body.removeChild(mobileMenu);
        });
        
        mobileMenu.appendChild(closeButton);
    } else {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
            document.body.removeChild(mobileMenu);
        }
    }
});
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        item.classList.toggle('active');
    });
});
const featureCards = document.querySelectorAll('.feature-card');
function checkScroll() {
    featureCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (cardPosition < screenPosition) {
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }
    });
}
featureCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);