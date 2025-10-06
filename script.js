// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navigation smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Close mobile menu if open
            closeMobileMenu();
        });
    });

    // Mobile Navigation Functions
    function openMobileMenu() {
        const overlay = document.querySelector('.mobile-nav-overlay');
        const menu = document.querySelector('.mobile-nav-menu');
        if (overlay && menu) {
            overlay.style.display = 'block';
            overlay.classList.add('active');
            menu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Use global closeMobileMenu

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', openMobileMenu);
    }

    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', closeMobileMenu);
    }

// CEO Carousel Logic
    const slides = document.querySelectorAll('.ceo-slide');
    const prevBtn = document.querySelector('.ceo-slider-btn.prev');
    const nextBtn = document.querySelector('.ceo-slider-btn.next');
    const ceoDots = document.querySelectorAll('.ceo-slider-dot');
    let current = 0;

    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
        });
        ceoDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === idx);
        });
        if (prevBtn) prevBtn.disabled = idx === 0;
        if (nextBtn) nextBtn.disabled = idx === slides.length - 1;
    }

    if (slides.length > 0) {
        showSlide(current);
        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                if (current > 0) {
                    current--;
                    showSlide(current);
                }
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                if (current < slides.length - 1) {
                    current++;
                    showSlide(current);
                }
            });
        }
        ceoDots.forEach((dot, i) => {
            dot.addEventListener('click', function () {
                current = i;
                showSlide(current);
            });
        });
    }

    // Language switcher functionality
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Testimonials slider functionality
    let currentTestimonial = 1; // Start with middle testimonial active
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    function updateTestimonials() {
        testimonialCards.forEach((card, index) => {
            card.classList.remove('active', 'blur');
            if (index === currentTestimonial) {
                card.classList.add('active');
            } else {
                card.classList.add('blur');
            }
        });
        
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentTestimonial) {
                dot.classList.add('active');
            }
        });
    }
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        updateTestimonials();
    }, 5000);
    
    // Dot click functionality
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            updateTestimonials();
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.strength-card, .testimonial-card, .certification-image, .faq-item');
    animateElements.forEach(el => observer.observe(el));

    // // Header background on scroll
    // const header = document.querySelector('.header');
    // window.addEventListener('scroll', () => {
    //     if (window.scrollY > 100) {
    //         header.style.background = 'rgba(255, 255, 255, 0.95)';
    //     } else {
    //         header.style.background = 'rgba(255, 255, 255, 0.8)';
    //     }
    // });

}); // Close DOMContentLoaded

// Helper function for closing mobile menu (defined globally)
function closeMobileMenu() {
    const overlay = document.querySelector('.mobile-nav-overlay');
    const menu = document.querySelector('.mobile-nav-menu');
    if (overlay && menu) {
        overlay.classList.remove('active');
        menu.classList.remove('active');
        // Wait for transition to complete before hiding overlay
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
        document.body.style.overflow = 'auto';
    }
}

// FAQ toggle functionality
function toggleFAQ(element) {
    const isActive = element.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        element.classList.add('active');
    }
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        closeMobileMenu();
        
        // Close any open FAQ items
        document.querySelectorAll('.faq-item.active').forEach(item => {
            item.classList.remove('active');
        });
    }
});

// Add focus management for accessibility
function manageFocus() {
    const focusableElements = document.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #2563eb';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
}

// Initialize focus management
document.addEventListener('DOMContentLoaded', manageFocus);

// Add print styles support
function addPrintStyles() {
    const printStyles = `
        @media print {
            .header, .footer, .contact-section {
                display: none !important;
            }
            
            body {
                font-size: 12pt;
                line-height: 1.4;
            }
            
            .section-title {
                font-size: 24pt;
                margin-bottom: 20pt;
            }
            
            .strength-card, .testimonial-card {
                break-inside: avoid;
                margin-bottom: 20pt;
            }
        }
    `;
    
    const printStyleSheet = document.createElement('style');
    printStyleSheet.textContent = printStyles;
    document.head.appendChild(printStyleSheet);
}

// Initialize print styles
document.addEventListener('DOMContentLoaded', addPrintStyles);

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    
    // Get form data
    const formData = {
        companyName: form.companyName.value.trim(),
        yourName: form.yourName.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        subject: form.subject.value,
        message: form.message.value.trim()
    };
    
    // Validate required fields
    if (!formData.companyName || !formData.yourName || !formData.email || !formData.subject || !formData.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate email format
    if (!isValidEmail(formData.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // Send email using Vercel serverless function
        await sendEmailWithVercel(null, formData);
        
        // Show success message
        showNotification('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        
    } catch (error) {
        console.error('Error sending email:', error);
        showNotification('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
    } finally {
        // Reset button state
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
}

function formatEmailContent(formData) {
    const subjectText = getSubjectText(formData.subject);
    const subject = `Contact Form: ${subjectText} - ${formData.companyName}`;
    
    const body = `
Dear VOYAGER Inc. Team,

You have received a new contact form submission from your website.

CONTACT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Company Name: ${formData.companyName}
Contact Person: ${formData.yourName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Subject: ${subjectText}

MESSAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This message was sent from the VOYAGER Inc. website contact form.
Timestamp: ${new Date().toLocaleString()}

Best regards,
VOYAGER Inc. Website Contact System
    `.trim();
    
    return { subject, body };
}

function getSubjectText(subjectValue) {
    const subjects = {
        'general': 'General Inquiry',
        'services': 'Services Information',
        'partnership': 'Partnership Opportunity',
        'support': 'Technical Support'
    };
    return subjects[subjectValue] || 'General Inquiry';
}

async function sendEmailWithVercel(emailContent, formData) {
    // Send to Vercel serverless function
    const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            companyName: formData.companyName,
            yourName: formData.yourName,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message
        })
    });

    // Check if response is JSON before parsing
    const contentType = response.headers.get('content-type');
    let result;
    
    if (contentType && contentType.includes('application/json')) {
        result = await response.json();
    } else {
        // If not JSON, get text and create error object
        const errorText = await response.text();
        console.error('Non-JSON response:', errorText);
        result = {
            success: false,
            message: `Server error: ${response.status} ${response.statusText}`
        };
    }

    if (!response.ok) {
        throw new Error(result.message || 'Failed to send email');
    }

    return result;
}

/*
 * ALTERNATIVE: EmailJS Integration (More Professional Solution)
 * 
 * To upgrade to a more professional email sending solution:
 * 1. Sign up at https://www.emailjs.com/
 * 2. Set up your email service (Gmail, Outlook, etc.)
 * 3. Create an email template
 * 4. Replace sendEmailWithMailto function with this:
 * 
 * async function sendEmailWithEmailJS(emailContent, formData) {
 *     const serviceID = 'your_service_id';
 *     const templateID = 'your_template_id';
 *     const publicKey = 'your_public_key';
 *     
 *     const templateParams = {
 *         from_name: formData.yourName,
 *         from_email: formData.email,
 *         company_name: formData.companyName,
 *         phone: formData.phone,
 *         subject: getSubjectText(formData.subject),
 *         message: formData.message,
 *         to_email: 'kagami08092004@gmail.com'
 *     };
 *     
 *     return emailjs.send(serviceID, templateID, templateParams, publicKey);
 * }
 * 
 * And add this to your HTML head:
 * <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
 * <script>emailjs.init('your_public_key');</script>
 */

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles to notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        line-height: 1.4;
        animation: slideInRight 0.3s ease-out;
        ${getNotificationStyles(type)}
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification && notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': '✓',
        'error': '⚠',
        'info': 'ℹ',
        'warning': '⚠'
    };
    return icons[type] || icons.info;
}

function getNotificationStyles(type) {
    const styles = {
        'success': 'background: #10b981; color: white;',
        'error': 'background: #ef4444; color: white;',
        'info': 'background: #3b82f6; color: white;',
        'warning': 'background: #f59e0b; color: white;'
    };
    return styles[type] || styles.info;
}

// Add notification animations
function addNotificationStyles() {
    const notificationStyles = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-icon {
            font-weight: bold;
            font-size: 16px;
        }
        
        .notification-message {
            flex: 1;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: inherit;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            line-height: 1;
            opacity: 0.8;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = notificationStyles;
    document.head.appendChild(styleSheet);
}

// Initialize notification styles
document.addEventListener('DOMContentLoaded', addNotificationStyles);