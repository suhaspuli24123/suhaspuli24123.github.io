document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
    
    // Contact form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real implementation, you would send this data to a server
            // For demonstration, just log the data and show a success message
            console.log({ name, email, subject, message });
            
            // Show success message
            const formGroups = contactForm.querySelectorAll('.form-group');
            formGroups.forEach(group => group.style.display = 'none');
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.style.display = 'none';
            
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = `
                <i class="fas fa-check-circle" style="color: var(--success-color); font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out, ${name}. I'll get back to you soon!</p>
            `;
            successMsg.style.textAlign = 'center';
            successMsg.style.padding = '2rem';
            
            contactForm.appendChild(successMsg);
            
            // Reset form after 5 seconds
            setTimeout(() => {
                contactForm.reset();
                successMsg.remove();
                formGroups.forEach(group => group.style.display = '');
                submitBtn.style.display = '';
            }, 5000);
        });
    }
    
    // Header scroll behavior
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
        
        // Activate nav links based on scroll position
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);

            if (navLink) {
                 if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });
});
