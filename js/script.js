// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        // Add this inside your existing DOMContentLoaded event listener
    function typeEffect(element, text, speed) {
    let i = 0;
    element.innerHTML = '';
    const timer = setInterval(() => {
        if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        } else {
        clearInterval(timer);
        }
    }, speed);
    }

    // Call it on the hero text
    const heroText = document.querySelector('.hero p');
    if (heroText) {
    const originalText = heroText.textContent;
    heroText.textContent = '';
    setTimeout(() => {
        typeEffect(heroText, originalText, 50);
    }, 1000);
    }
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // Sticky Navigation
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
        }
    });
    
    // Typing Effect
    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        // Update the roles array with more developer titles
        const roles = ['Web Developer', 'Frontend Developer', 'Software Engineer', 'Programmer', 'Coder', 'Full Stack Developer']; // Customize your roles
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 150; // Delay between character typing
        
        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 100; // Faster when deleting
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 150; // Normal speed when typing
            }
            
            if (!isDeleting && charIndex === currentRole.length) {
                // Pause at the end of typing
                isDeleting = true;
                typingDelay = 1500; // Wait before deleting
            } else if (isDeleting && charIndex === 0) {
                // Move to next role after deleting
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingDelay = 500; // Pause before typing next role
            }
            
            setTimeout(type, typingDelay);
        }
        
        // Start the typing effect
        setTimeout(type, 1000);
    }
    
    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                // Show/hide projects based on category
                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === cardCategory) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Skill Bar Animation
    function animateSkillBars() {
        const skillLevels = document.querySelectorAll('.skill-level');
        
        skillLevels.forEach(level => {
            const width = level.style.width;
            level.style.width = '0';
            
            setTimeout(() => {
                level.style.width = width;
            }, 100);
        });
    }
    
    // Animate skill bars when skills section comes into view
    const skillsSection = document.querySelector('.skills');
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(skillsSection);
    }
    
    // Form Submission (you'll need a backend service to actually send emails)
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a backend
            // This is just a simple example showing form validation
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === '') {
                alert('Please fill out all fields');
                return;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Reset form (in actual implementation, you'd send data to backend first)
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});