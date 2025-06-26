// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            
            // Trap focus in mobile menu when open
            if (!isExpanded) {
                const firstLink = mobileMenu.querySelector('a');
                firstLink?.focus();
            }
        });
    }
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', function() {
            document.getElementById('mobile-menu').classList.add('hidden');
            document.getElementById('menu-btn').setAttribute('aria-expanded', 'false');
        });
    });
    
    // Highlight current page in navigation
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('text-blue-600', 'font-medium');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('text-blue-600', 'font-medium');
            link.removeAttribute('aria-current');
        }
    });
    
    // Form Validation
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get all required fields
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('border-red-500');
                    isValid = false;
                } else {
                    field.classList.remove('border-red-500');
                }
            });
            
            // Validate email format if email field exists
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
                emailField.classList.add('border-red-500');
                isValid = false;
            }
            
            if (isValid) {
                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.disabled = true;
                    const originalText = submitButton.textContent;
                    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
                    
                    // Simulate form submission
                    setTimeout(() => {
                        alert('Thank you for your message! We will contact you soon.');
                        form.reset();
                        submitButton.disabled = false;
                        submitButton.textContent = originalText;
                    }, 1500);
                }
            } else {
                form.querySelector('[required].border-red-500')?.focus();
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // Add shadow to navbar on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 10) {
            nav?.classList.add('shadow-lg');
        } else {
            nav?.classList.remove('shadow-lg');
        }
    });
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('loading');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            if (!img.complete) {
                imageObserver.observe(img);
            }
        });
    }
});
