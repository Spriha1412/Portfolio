document.addEventListener('DOMContentLoaded', () => {

    function applyTypewriter(element, text, speed = 70, delay = 0, cursor = true) {
        let i = 0;
        element.innerHTML = ''; 
        element.style.borderRight = cursor ? '0.15em solid orange' : 'none'; 

        setTimeout(() => {
            function typeChar() {
                if (i < text.length) {
                    if (text.charAt(i) === '\n') {
                        element.innerHTML += '<br>';
                        i++;
                    } else {
                        element.innerHTML += text.charAt(i);
                        i++;
                    }
                    setTimeout(typeChar, speed);
                } else {
                    if (cursor) {
                        element.style.borderRight = 'none'; 
                    }
                }
            }
            typeChar();
        }, delay);
    }

    const heroTextElement = document.querySelector('.typewriter-text');
    const phrases = [
        "Hey, I'm Spriha.\nI'm a Frontend Developer.",
        "Hey, I'm Spriha.\nI'm a UI/UX Developer."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 70;
    const deletingSpeed = 40;
    const pauseBeforeDelete = 1500;
    const pauseBeforeType = 500;

    function typeAndDeleteLoop() {
        const currentPhrase = phrases[phraseIndex];
        const fixedPart = currentPhrase.substring(0, currentPhrase.indexOf('\n') + 1);
        const changingPart = currentPhrase.substring(currentPhrase.indexOf('\n') + 1);

        if (!isDeleting) {
            if (charIndex < changingPart.length) {
                heroTextElement.innerHTML = fixedPart.replace(/\n/g, '<br>') + changingPart.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeAndDeleteLoop, typingSpeed);
            } else {
                isDeleting = true;
                heroTextElement.style.borderRight = '0.15em solid orange';
                setTimeout(typeAndDeleteLoop, pauseBeforeDelete);
            }
        } else {
            if (charIndex > 0) {
                heroTextElement.innerHTML = fixedPart.replace(/\n/g, '<br>') + changingPart.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typeAndDeleteLoop, deletingSpeed);
            } else {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                heroTextElement.style.borderRight = '0.15em solid orange';
                setTimeout(typeAndDeleteLoop, pauseBeforeType);
            }
        }
    }

    heroTextElement.innerHTML = phrases[0].substring(0, phrases[0].indexOf('\n') + 1).replace(/\n/g, '<br>');
    charIndex = 0;
    setTimeout(typeAndDeleteLoop, typingSpeed);

    const resumeIcon = document.getElementById('resume-icon');
    const resumeModal = document.getElementById('resume-modal');
    const closeButton = document.querySelector('.modal .close-button');

    if (resumeIcon && resumeModal && closeButton) {
        resumeIcon.addEventListener('click', (e) => {
            e.preventDefault();
            resumeModal.style.display = 'flex';
        });
        closeButton.addEventListener('click', () => {
            resumeModal.style.display = 'none';
        });
        window.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                resumeModal.style.display = 'none';
            }
        });
    }

    const sectionsToObserve = document.querySelectorAll('.section-hidden');
    const h2Headings = document.querySelectorAll('h2[data-text]');
    const aboutParagraphs = document.querySelectorAll('.about-paragraph');

    const generalRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('section-hidden')) {
                    entry.target.classList.add('section-visible');
                    if (entry.target.id === 'about') {
                        aboutParagraphs.forEach((p, index) => {
                            setTimeout(() => {
                                p.classList.add('section-visible');
                            }, index * 200 + 500);
                        });
                    }
                }
                if (entry.target.tagName === 'H2' && entry.target.hasAttribute('data-text')) {
                    const originalText = entry.target.getAttribute('data-text');
                    applyTypewriter(entry.target, originalText, 100);
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    sectionsToObserve.forEach(section => {
        generalRevealObserver.observe(section);
    });

    h2Headings.forEach(heading => {
        generalRevealObserver.observe(heading);
    });

    const techStackSection = document.getElementById('techstack');
    const skillItems = document.querySelectorAll('.skill-item');

    const techStackObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillItems.forEach(item => {
                    const percentage = item.dataset.percentage;
                    const progressBar = item.querySelector('.progress-bar');
                    progressBar.style.width = '0%';
                    requestAnimationFrame(() => {
                        progressBar.style.width = percentage + '%';
                    });
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (techStackSection) {
        techStackObserver.observe(techStackSection);
    }

    const projectsSection = document.getElementById('projects');
    const projectCards = document.querySelectorAll('.project-card');

    const projectObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('show');
                    }, index * 200 + 300);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (projectsSection) {
        projectObserver.observe(projectsSection);
    }

    const bgCircles = document.querySelectorAll('.bg-circle');

    if (bgCircles.length > 0) {
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const strengthX = 0.02;
            const strengthY = 0.02;

            bgCircles.forEach((circle, index) => {
                const moveX = (mouseX - window.innerWidth / 2) * strengthX * (index + 1) * 0.2;
                const moveY = (mouseY - window.innerHeight / 2) * strengthY * (index + 1) * 0.2;
                const currentTransform = getComputedStyle(circle).transform;
                const match = currentTransform.match(/translateZ\(([^)]+)px\)/);
                const translateZ = match ? parseFloat(match[1]) : 0;
                circle.style.transform = `translate(${moveX}px, ${moveY}px) translateZ(${translateZ}px)`;
            });
        });
    }

    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = (targetId === '#home') ? document.body : document.querySelector(targetId);
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: (targetId === '#home' ? 'start' : 'center')
            });
            document.querySelectorAll('nav a').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    const navLinks = document.querySelectorAll('nav a');

    const setActiveNavLink = () => {
        let currentSectionId = 'home';
        const allSections = document.querySelectorAll('section');

        allSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.3) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink();
});
