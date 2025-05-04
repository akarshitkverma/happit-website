document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for emoji elements
    initializeEmojiAnimations();
    
    // Set up form submission handler
    setupFormHandler();
    
    // Add smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Add scroll animation effects
    setupScrollAnimations();
});

/**
 * Initialize staggered animations for emoji elements
 */
function initializeEmojiAnimations() {
    const emojis = document.querySelectorAll('.emoji');
    emojis.forEach((emoji, index) => {
        // Stagger the animations
        emoji.style.animationDelay = (index * 0.2) + 's';
    });
}

/**
 * Set up the contact form submission handler
 */
function setupFormHandler() {
    const inquiryForm = document.getElementById('inquiryForm');
    
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send this data to a server
            // For GitHub Pages hosting, you might want to use a service like Formspree
            
            // Get form data
            const formData = new FormData(this);
            const formValues = {};
            
            // Convert FormData to regular object
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Log form data to console (for development purposes)
            console.log('Form submission:', formValues);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon. 🎉');
            
            // Reset the form
            this.reset();
        });
    }
}

/**
 * Set up smooth scrolling for navigation links
 */
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a, .footer-links a');
    
    navLinks.forEach(link => {
        // Check if the link has a hash
        if (link.hash) {
            link.addEventListener('click', function(e) {
                // Get the target element
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                // Only prevent default if the target exists on this page
                if (targetElement) {
                    e.preventDefault();
                    
                    // Scroll smoothly to the target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for header
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
}

/**
 * Add scroll-triggered animations to elements
 */
function setupScrollAnimations() {
    // Get all elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.product-card, .category-card, .testimonial-card');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add class when element is visible
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when at least 10% of the element is visible
    });
    
    // Observe each element
    animatedElements.forEach(element => {
        // Add a base class for animations
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

/**
 * Toggle mobile navigation menu (for responsive design)
 */
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

/**
 * Validates the contact form
 * @param {HTMLFormElement} form - The form element to validate
 * @returns {boolean} Whether the form is valid
 */
function validateContactForm(form) {
    let isValid = true;
    
    // Get form fields
    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const messageInput = form.querySelector('#message');
    
    // Reset previous error states
    const errorElements = form.querySelectorAll('.error-message');
    errorElements.forEach(element => element.remove());
    
    // Validate name
    if (!nameInput.value.trim()) {
        showError(nameInput, 'Please enter your name');
        isValid = false;
    }
    
    // Validate email
    if (!emailInput.value.trim()) {
        showError(emailInput, 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!messageInput.value.trim()) {
        showError(messageInput, 'Please enter your message');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Show error message for a form field
 * @param {HTMLElement} input - The input field with an error
 * @param {string} message - The error message to display
 */
function showError(input, message) {
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '5px';
    
    // Insert error message after the input
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
    
    // Add error styling to input
    input.style.borderColor = 'red';
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} Whether the email is valid
 */
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Add to favorites functionality (for future use)
 * @param {number} productId - The ID of the product to favorite
 */
function addToFavorites(productId) {
    // Get existing favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('happitFavorites')) || [];
    
    // Check if product is already in favorites
    if (!favorites.includes(productId)) {
        // Add product to favorites
        favorites.push(productId);
        
        // Save updated favorites to localStorage
        localStorage.setItem('happitFavorites', JSON.stringify(favorites));
        
        // Show confirmation message
        alert('Product added to favorites!');
    } else {
        alert('This product is already in your favorites!');
    }
}