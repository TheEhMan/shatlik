document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------
    // 1. Mobile Menu Toggle (Fixed for Ionicons)
    // --------------------------------------------------------
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            const icon = mobileToggle.querySelector('ion-icon');
            if (icon) {
                // Toggle between menu and close icon names
                if (navLinks.classList.contains('active')) {
                    icon.setAttribute('name', 'close-outline');
                } else {
                    icon.setAttribute('name', 'menu-outline');
                }
            }
        });
    }

    // --------------------------------------------------------
    // 2. Smooth Scroll for Anchor Links
    // --------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });

                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = mobileToggle?.querySelector('ion-icon');
                    if (icon) {
                        icon.setAttribute('name', 'menu-outline');
                    }
                }
            }
        });
    });

    // --------------------------------------------------------
    // 3. Scroll Reveal Animations
    // --------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --------------------------------------------------------
    // 4. Interactive Lightbox for Gallery
    // --------------------------------------------------------
    // Only run if we have gallery items
    const galleryItems = document.querySelectorAll('.gallery-item img');
    if (galleryItems.length > 0) {
        // Create Modal Elements dynamically
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox-modal';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-content" id="lightbox-img">
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.querySelector('.lightbox-close');

        // Open Modal
        galleryItems.forEach(img => {
            img.style.cursor = 'pointer'; // Indicate clickable
            img.addEventListener('click', function () {
                lightbox.style.display = "flex";
                // Use higher  resolution if available, else current src
                // In a real app, you might swap 'w=xxx' params for higher quality
                lightboxImg.src = this.src;
            });
        });

        // Close Modal (X button)
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = "none";
        });

        // Close Modal (Click Outside)
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
            }
        });
    }

    // --------------------------------------------------------
    // 5. Back to Top Button
    // --------------------------------------------------------
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.innerHTML = '<ion-icon name="arrow-up-outline"></ion-icon>';
    backToTopBtn.setAttribute('aria-label', 'Back to Top');
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});
