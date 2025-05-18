/**
 * main.js - Main JavaScript functionality for Happit Website
 * Contains initialization and orchestrates other JS modules
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    setupMobileMenu();
    
    // Set up smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Add scroll animation effects
    setupScrollAnimations();
});

/**
 * Mobile menu and other fixes
 * Addresses issues with mobile responsiveness and other functionality
 */

// Add this to your main.js file or replace the existing setupMobileMenu function

/**
 * Set up mobile menu toggle functionality with improved handling
 */
function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    
    if (menuBtn && navLinks) {
        // Add initial class to ensure proper styling before JS loads
        if (window.innerWidth <= 960) {
            navLinks.classList.add('mobile-nav');
        }
        
        // Toggle menu when button is clicked
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Add overlay when menu is open
            if (navLinks.classList.contains('active')) {
                // Create overlay if it doesn't exist
                if (!document.querySelector('.mobile-nav-overlay')) {
                    const overlay = document.createElement('div');
                    overlay.className = 'mobile-nav-overlay';
                    document.body.appendChild(overlay);
                    
                    // Add click event to close menu when overlay is clicked
                    overlay.addEventListener('click', function() {
                        navLinks.classList.remove('active');
                        overlay.remove();
                    });
                }
            } else {
                // Remove overlay when menu is closed
                const overlay = document.querySelector('.mobile-nav-overlay');
                if (overlay) overlay.remove();
            }
        });
        
        // Close menu when a link is clicked
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                
                // Remove overlay when a link is clicked
                const overlay = document.querySelector('.mobile-nav-overlay');
                if (overlay) overlay.remove();
            });
        });
        
        // Handle resize events
        window.addEventListener('resize', function() {
            if (window.innerWidth > 960) {
                navLinks.classList.remove('mobile-nav', 'active');
                
                // Remove overlay if present
                const overlay = document.querySelector('.mobile-nav-overlay');
                if (overlay) overlay.remove();
            } else {
                navLinks.classList.add('mobile-nav');
            }
        });
    }
    
    // Add styles for overlay and improved mobile menu
    const style = document.createElement('style');
    style.textContent = `
        .mobile-nav-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 99;
        }
        
        .mobile-nav {
            display: none;
        }
        
        .mobile-nav.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            z-index: 100;
            animation: slideDown 0.3s ease-out;
        }
        
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .mobile-nav.active a {
            padding: 15px;
            border-bottom: 1px solid #eee;
        }
        
        .mobile-nav.active a:last-child {
            border-bottom: none;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Fix horizontal scrolling on mobile devices
 * This prevents the entire page from being scrollable horizontally
 */
function fixHorizontalScrolling() {
    const style = document.createElement('style');
    style.textContent = `
        body {
            overflow-x: hidden;
            width: 100%;
            position: relative;
        }
        
        section {
            max-width: 100vw;
            overflow-x: hidden;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Optimize images and lazy loading
 * Adds lazy loading to improve page performance
 */
function setupLazyLoading() {
    // Add lazy loading to all images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Only apply to images that don't already have loading attribute
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
}

// Add these functions to your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    fixHorizontalScrolling();
    setupLazyLoading();
    // No need to call setupMobileMenu here as it's already called in your main script
});

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
            // Add the visible class when the element is in view
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll', 'visible');
                // Unobserve after animating to save resources
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });
    
    // Apply the animation-ready class and observe each element
    animatedElements.forEach((element, index) => {
        // Add staggered delay based on index
        element.style.transitionDelay = `${index * 0.1}s`;
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}


/**
 * animations.js - Animation functionality for Happit Website
 * Contains code for bubbles, emojis, and other interactive animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize random animations for emoji elements
    setupEmojiInteractions();
    
    // Create floating bubbles throughout the page
    createBubbles();
});

/**
 * Setup emoji hover interactions with random animations
 */
function setupEmojiInteractions() {
    const emojis = document.querySelectorAll('.emoji');
    
    // Remove any existing animation classes
    emojis.forEach(emoji => {
        emoji.style.animation = 'none';
    });
    
    // Apply hover effects
    emojis.forEach(emoji => {
        emoji.addEventListener('mouseover', function() {
            // Random selection of effect
            const effects = ['pulse'];
            const randomEffect = effects[Math.floor(Math.random() * effects.length)];
            
            // Apply the random effect
            this.style.animation = `${randomEffect} 1s ease`;
        });
        
        emoji.addEventListener('mouseout', function() {
            // Remove animation after it completes
            this.addEventListener('animationend', function() {
                this.style.animation = 'none';
            }, {once: true});
        });
    });
}

/**
 * Create floating bubbles throughout the page
 */
function createBubbles() {
    const bubbleContainer = document.getElementById('bubbleContainer');
    
    if (!bubbleContainer) return;
    
    // Create 20 bubbles with random properties
    for (let i = 0; i < 20; i++) {
        createBubble(bubbleContainer);
    }
    
    // Continuously create new bubbles at intervals
    setInterval(() => {
        createBubble(bubbleContainer);
    }, 3000);
}

/**
 * Create an individual bubble with random properties
 * @param {HTMLElement} container - The container to append the bubble to
 */
function createBubble(container) {
    const bubble = document.createElement('div');
    const size = Math.random() * 30 + 10; // Random size between 10px and 40px
    
    // Set bubble style
    bubble.style.position = 'absolute';
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.borderRadius = '50%';
    bubble.style.bottom = '0';
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.backgroundColor = getRandomColor();
    bubble.style.opacity = '0.3';
    bubble.style.zIndex = '1';
    
    // Set animation
    bubble.style.animation = `float ${Math.random() * 5 + 5}s linear forwards`;
    
    // Add to container
    container.appendChild(bubble);
    
    // Remove bubble after animation completes
    setTimeout(() => {
        bubble.remove();
    }, 10000);
}

/**
 * Get a random color in the orange theme palette
 * @return {string} - Random color in rgba format
 */
function getRandomColor() {
    const colors = [
        'rgba(255, 122, 89, 0.5)',  // Primary
        'rgba(255, 154, 130, 0.5)', // Secondary
        'rgba(255, 223, 215, 0.5)', // Accent
        'rgba(255, 200, 180, 0.5)'  // Another shade
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
}


/**
 * form-handler.js - Form handling functionality for Happit Website
 * Contains code for form validation and submission
 */

document.addEventListener('DOMContentLoaded', function() {
    // Set up form submission handler
    setupFormHandler();
});

/**
 * Set up the contact form submission handler
 */
function setupFormHandler() {
    const inquiryForm = document.getElementById('inquiryForm');
    
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm(this)) {
                return;
            }
            
            // Get form data
            const formData = new FormData(this);
            const formValues = {};
            
            // Convert FormData to regular object
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            
            // Show success message
            alert('Thanks for reaching out! We\'re excited to connect with you and will get back to you shortly! 🎉');
            
            // Reset the form
            this.reset();
        });
    }
}

/**
 * Validate the form fields
 * @param {HTMLFormElement} form - The form to validate
 * @return {boolean} - Whether the form is valid
 */
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    // Remove any existing error messages
    const existingErrors = form.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Check each required field
    requiredFields.forEach(field => {
        // Remove any previous error styling
        field.classList.remove('error');
        
        if (!field.value.trim()) {
            // Field is empty
            isValid = false;
            
            // Add error styling
            field.classList.add('error');
            
            // Add error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'This field is required';
            errorMessage.style.color = 'red';
            errorMessage.style.fontSize = '0.8rem';
            errorMessage.style.marginTop = '5px';
            
            field.parentNode.appendChild(errorMessage);
        } else if (field.type === 'email' && !validateEmail(field.value)) {
            // Invalid email
            isValid = false;
            
            // Add error styling
            field.classList.add('error');
            
            // Add error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Please enter a valid email address';
            errorMessage.style.color = 'red';
            errorMessage.style.fontSize = '0.8rem';
            errorMessage.style.marginTop = '5px';
            
            field.parentNode.appendChild(errorMessage);
        }
    });
    
    return isValid;
}

/**
 * Validate an email address
 * @param {string} email - The email to validate
 * @return {boolean} - Whether the email is valid
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


/**
 * Horizontal scrolling functionality
 * Adds scrolling for categories and products sections
 */

document.addEventListener('DOMContentLoaded', function() {
    // Convert categories and products to horizontal scrollable sections
    setupHorizontalScrolling('#categories .categories', 'category-card');
    setupHorizontalScrolling('#products .products', 'product-card');
});

/**
 * Sets up horizontal scrolling for a container
 * @param {string} containerSelector - CSS selector for the container
 * @param {string} itemClass - Class name of the items to be scrolled
 */
function setupHorizontalScrolling(containerSelector, itemClass) {
    const container = document.querySelector(containerSelector);
    
    if (!container) return;
    
    // Get the original parent element
    const parentElement = container.parentElement;
    
    // Create scroll container
    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'scroll-container';
    
    // Create scroll content wrapper
    const scrollContent = document.createElement('div');
    scrollContent.className = 'scroll-content';
    
    // Move the original items to the scroll content
    while (container.firstChild) {
        scrollContent.appendChild(container.firstChild);
    }
    
    // Create left arrow
    const leftArrow = document.createElement('button');
    leftArrow.className = 'scroll-arrow scroll-arrow-left';
    leftArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
    leftArrow.setAttribute('aria-label', 'Scroll left');
    
    // Create right arrow
    const rightArrow = document.createElement('button');
    rightArrow.className = 'scroll-arrow scroll-arrow-right';
    rightArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
    rightArrow.setAttribute('aria-label', 'Scroll right');
    
    // Add event listeners for arrows
    leftArrow.addEventListener('click', function() {
        scrollContent.scrollBy({
            left: -getScrollAmount(scrollContent, itemClass),
            behavior: 'smooth'
        });
    });
    
    rightArrow.addEventListener('click', function() {
        scrollContent.scrollBy({
            left: getScrollAmount(scrollContent, itemClass),
            behavior: 'smooth'
        });
    });
    
    // Assemble the new structure
    scrollContainer.appendChild(leftArrow);
    scrollContainer.appendChild(scrollContent);
    scrollContainer.appendChild(rightArrow);
    
    // Replace the original container with the new structure
    parentElement.replaceChild(scrollContainer, container);
    
    // Update arrow visibility based on scroll position
    updateArrowVisibility(scrollContent, leftArrow, rightArrow);
    
    // Listen for scroll events to update arrow visibility
    scrollContent.addEventListener('scroll', function() {
        updateArrowVisibility(scrollContent, leftArrow, rightArrow);
    });
    
    // Check arrow visibility on window resize
    window.addEventListener('resize', function() {
        updateArrowVisibility(scrollContent, leftArrow, rightArrow);
    });
}

/**
 * Calculate the amount to scroll based on visible items
 * @param {HTMLElement} container - The scroll container
 * @param {string} itemClass - Class of items in the container
 * @returns {number} - Scroll amount in pixels
 */
function getScrollAmount(container, itemClass) {
    const items = container.getElementsByClassName(itemClass);
    if (items.length === 0) return 0;
    
    // Get the width of a single item including margins and gap
    const itemStyle = window.getComputedStyle(items[0]);
    const itemWidth = items[0].offsetWidth;
    
    // Get the container's visible width
    const containerWidth = container.clientWidth;
    
    // Calculate how many items fit completely in the viewport
    const itemsPerView = Math.floor(containerWidth / itemWidth);
    
    // Scroll by the width of one item, or by the full container width if only one item fits
    return itemsPerView > 1 ? itemWidth : containerWidth;
}

/**
 * Update visibility of scroll arrows based on scroll position
 * @param {HTMLElement} container - The scroll container
 * @param {HTMLElement} leftArrow - Left arrow element
 * @param {HTMLElement} rightArrow - Right arrow element
 */
function updateArrowVisibility(container, leftArrow, rightArrow) {
    // Check if scrolling is possible (content wider than container)
    const isScrollable = container.scrollWidth > container.clientWidth;
    
    if (!isScrollable) {
        // If content fits without scrolling, hide both arrows
        leftArrow.style.display = 'none';
        rightArrow.style.display = 'none';
        return;
    }
    
    // Hide left arrow if at the beginning
    leftArrow.style.display = container.scrollLeft <= 10 ? 'none' : 'flex';
    
    // Hide right arrow if at the end
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    rightArrow.style.display = Math.ceil(container.scrollLeft) >= maxScrollLeft - 10 ? 'none' : 'flex';
}


/**
 * Product links popup functionality
 * Displays a popup with e-commerce links for products
 */

// Add this to your main.js file

document.addEventListener('DOMContentLoaded', function() {
    setupProductLinks();
});

/**
 * Set up product links popup functionality
 */
function setupProductLinks() {
    // Create popup elements
    createPopupElements();
    
    // Replace "Inquire Now" with "Buy Now" and add event listeners
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        // Find the button in this card
        const button = card.querySelector('.btn.btn-secondary');
        const productName = card.querySelector('h3').textContent;
        
        if (button) {
            // Change text to "Buy Now"
            button.textContent = 'Buy Now';
            button.setAttribute('data-product', productName);
            
            // Add click event listener
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showProductLinks(productName, index);
            });
        }
    });
}

/**
 * Create popup elements for product links
 */
function createPopupElements() {
    // Create popup container if it doesn't exist
    if (!document.getElementById('product-links-popup')) {
        const popupContainer = document.createElement('div');
        popupContainer.id = 'product-links-popup';
        popupContainer.className = 'popup-container';
        popupContainer.style.display = 'none';
        
        const popupContent = document.createElement('div');
        popupContent.className = 'popup-content';
        
        const closeButton = document.createElement('button');
        closeButton.className = 'popup-close';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', hideProductLinks);
        
        const popupHeader = document.createElement('div');
        popupHeader.className = 'popup-header';
        popupHeader.innerHTML = '<h3>Buy Now</h3>';
        
        const popupBody = document.createElement('div');
        popupBody.className = 'popup-body';
        popupBody.id = 'popup-links-container';
        
        // Append elements
        popupHeader.appendChild(closeButton);
        popupContent.appendChild(popupHeader);
        popupContent.appendChild(popupBody);
        popupContainer.appendChild(popupContent);
        
        // Add overlay click to close
        popupContainer.addEventListener('click', function(e) {
            if (e.target === popupContainer) {
                hideProductLinks();
            }
        });
        
        // Add to document body
        document.body.appendChild(popupContainer);
        
        // Add CSS for popup
        addPopupStyles();
    }
}

/**
 * Show product links popup
 * @param {string} productName - The name of the product
 * @param {number} productIndex - The index of the product
 */
function showProductLinks(productName, productIndex) {
    // Define the e-commerce links for each product
    // In a real implementation, you'd likely load these from a database or config file
    const productLinks = {
        // Product data structure - add your actual products and links here
        'Snuggle Buddy Bear': {
            amazon: 'https://www.amazon.in/s?k=teddy+bear',
            flipkart: 'https://www.flipkart.com/search?q=teddy%20bear'
        },
        'ColorTwist Puzzle': {
            amazon: 'https://www.amazon.in/s?k=puzzle+cube',
            flipkart: 'https://www.flipkart.com/search?q=puzzle%20cube'
        },
        'Mindful Momentum': {
            amazon: 'https://www.amazon.in/s?k=desk+toy',
            flipkart: 'https://www.flipkart.com/search?q=desk%20toy'
        },
        'Dream Chaser Unicorn': {
            amazon: 'https://www.amazon.in/s?k=unicorn+plush',
            flipkart: 'https://www.flipkart.com/search?q=unicorn%20plush'
        },
        'Imagination Builders': {
            amazon: 'https://www.amazon.in/s?k=wooden+blocks',
            flipkart: 'https://www.flipkart.com/search?q=wooden%20blocks'
        },
        'Little Scientist Lab': {
            amazon: 'https://www.amazon.in/s?k=science+kit+for+kids',
            flipkart: 'https://www.flipkart.com/search?q=science%20kit%20for%20kids'
        }
    };
    
    // Get the links container
    const linksContainer = document.getElementById('popup-links-container');
    
    // Clear previous content
    linksContainer.innerHTML = '';
    
    // Add product name
    const productHeader = document.createElement('h4');
    productHeader.textContent = productName;
    linksContainer.appendChild(productHeader);
    
    // Get links for this product or use default search links
    const links = productLinks[productName] || {
        amazon: `https://www.amazon.in/s?k=${encodeURIComponent(productName)}`,
        flipkart: `https://www.flipkart.com/search?q=${encodeURIComponent(productName)}`
    };
    
    // Create links
    const amazonLink = document.createElement('a');
    amazonLink.href = links.amazon;
    amazonLink.target = '_blank';
    amazonLink.className = 'ecommerce-link amazon-link';
    amazonLink.innerHTML = '<img src="https://cdnlogo.com/logos/a/77/amazon-dark.svg" alt="Amazon"> Buy on Amazon';
    
    const flipkartLink = document.createElement('a');
    flipkartLink.href = links.flipkart;
    flipkartLink.target = '_blank';
    flipkartLink.className = 'ecommerce-link flipkart-link';
    flipkartLink.innerHTML = '<img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_plus-055f80.svg" alt="Flipkart"> Buy on Flipkart';
    
    // Append links to container
    linksContainer.appendChild(amazonLink);
    linksContainer.appendChild(flipkartLink);
    
    // Show the popup
    const popup = document.getElementById('product-links-popup');
    popup.style.display = 'flex';
}

/**
 * Hide product links popup
 */
function hideProductLinks() {
    const popup = document.getElementById('product-links-popup');
    popup.style.display = 'none';
}

/**
 * Add CSS styles for the popup
 */
function addPopupStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .popup-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .popup-content {
            background-color: white;
            border-radius: 20px;
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            position: relative;
            animation: popupFadeIn 0.3s ease-out;
        }
        
        @keyframes popupFadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .popup-header {
            padding: 20px;
            border-bottom: 1px solid #eee;
            position: relative;
        }
        
        .popup-header h3 {
            margin: 0;
            color: var(--primary);
            text-align: center;
        }
        
        .popup-close {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 24px;
            background: none;
            border: none;
            cursor: pointer;
            color: #999;
            transition: color 0.3s;
        }
        
        .popup-close:hover {
            color: var(--primary);
        }
        
        .popup-body {
            padding: 20px;
        }
        
        .popup-body h4 {
            margin-top: 0;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .ecommerce-link {
            display: flex;
            align-items: center;
            padding: 15px;
            margin: 10px 0;
            border-radius: 10px;
            text-decoration: none;
            color: white;
            font-weight: bold;
            transition: transform 0.3s;
        }
        
        .ecommerce-link:hover {
            transform: translateY(-3px);
        }
        
        .ecommerce-link img {
            height: 20px;
            margin-right: 10px;
            filter: brightness(0) invert(1);
        }
        
        .amazon-link {
            background-color: #232F3E;
        }
        
        .flipkart-link {
            background-color: #2874F0;
        }
    `;
    
    document.head.appendChild(style);
}


/**
 * Form submission handler using FormSpree for GitHub Pages
 * Allows form submissions to be sent to your email
 */

// Add this to your main.js file

document.addEventListener('DOMContentLoaded', function() {
    // Set up form submission handler with Formspree
    setupFormHandlerWithFormspree();
});

/**
 * Set up the contact form submission handler with Formspree
 */
function setupFormHandlerWithFormspree() {
    const inquiryForm = document.getElementById('inquiryForm');
    
    if (inquiryForm) {
        // Set the form action to Formspree
        inquiryForm.setAttribute('action', 'https://formspree.io/f/akarshit999@gmail.com');
        inquiryForm.setAttribute('method', 'POST');
        
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm(this)) {
                return;
            }
            
            // Get form data
            const formData = new FormData(this);
            
            // Set loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Send data to Formspree
            fetch(this.action, {
                method: this.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Show success message
                showFormMessage('Thanks for reaching out! We\'re excited to connect with you and will get back to you shortly! 🎉', 'success');
                
                // Reset the form
                inquiryForm.reset();
            })
            .catch(error => {
                // Show error message
                showFormMessage('Oops! There was a problem sending your message. Please try again or email us directly.', 'error');
                console.error('Error:', error);
            })
            .finally(() => {
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            });
        });
    }
}

/**
 * Display a message after form submission
 * @param {string} message - The message to display
 * @param {string} type - The type of message ('success' or 'error')
 */
function showFormMessage(message, type) {
    const messageContainer = document.querySelector('.form-message');
    
    // Create message container if it doesn't exist
    if (!messageContainer) {
        const container = document.createElement('div');
        container.className = `form-message ${type}`;
        container.innerHTML = message;
        
        // Add to the form
        const form = document.getElementById('inquiryForm');
        form.parentNode.insertBefore(container, form.nextSibling);
        
        // Add styles for the message
        const style = document.createElement('style');
        style.textContent = `
            .form-message {
                padding: 15px;
                border-radius: 10px;
                margin-top: 20px;
                animation: fadeIn 0.5s;
            }
            
            .form-message.success {
                background-color: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            
            .form-message.error {
                background-color: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    } else {
        // Update existing message
        messageContainer.className = `form-message ${type}`;
        messageContainer.innerHTML = message;
    }
    
    // Auto-remove the message after 5 seconds
    setTimeout(() => {
        const messageContainer = document.querySelector('.form-message');
        if (messageContainer) {
            messageContainer.style.animation = 'fadeOut 0.5s forwards';
            
            // Remove after animation completes
            setTimeout(() => {
                if (messageContainer.parentNode) {
                    messageContainer.parentNode.removeChild(messageContainer);
                }
            }, 500);
        }
    }, 5000);
}

// Add this style for fade-out animation
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
});