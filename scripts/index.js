document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

async function initApp() {
    // 1. Carregar Seções Dinamicamente
    await loadSections();

    // 2. Inicializar Lógicas (com delay para garantir DOM)
    setTimeout(() => {
        initScrollLogic();
        initStickyNav();
        initLogoClick();
        initMobileMenu();
    }, 100);
}

async function loadSections() {
    const container = document.getElementById('sections-container');
    const sectionsToLoad = [
        { id: 'services', file: './sections/services.html' },
        { id: 'projects', file: './sections/projects.html' },
        { id: 'tools', file: './sections/tools.html' }
    ];

    try {
        for (const section of sectionsToLoad) {
            const response = await fetch(section.file);
            if (!response.ok) throw new Error(`Erro ao carregar ${section.file}`);
            const htmlContent = await response.text();

            const sectionWrapper = document.createElement('div');
            sectionWrapper.innerHTML = htmlContent;
            container.appendChild(sectionWrapper);
        }
    } catch (error) {
        console.error('Erro ao carregar seções:', error);
        container.innerHTML = '<p style="text-align:center; padding: 20px;">Erro ao carregar conteúdo.</p>';
    }
}

/**
 * Lógica do Menu Mobile (Hamburger)
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navOverlay = document.getElementById('mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const icon = menuBtn?.querySelector('i');

    if (!menuBtn || !navOverlay) return;

    // --- Toggle Menu ---
    menuBtn.addEventListener('click', () => {
        const isOpen = navOverlay.classList.contains('open');

        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // --- Fechar menu ao clicar em um link ---
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // --- Fechar menu quando a tela for maior que 768px ---
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // --- Funções auxiliares ---
    function openMobileMenu() {
        navOverlay.classList.add('open');
        icon.classList.remove('ph-list');
        icon.classList.add('ph-x');
    }

    function closeMobileMenu() {
        navOverlay.classList.remove('open');
        icon.classList.remove('ph-x');
        icon.classList.add('ph-list');
    }
}

function initScrollLogic() {
    const headerLogo = document.getElementById('header-logo');
    const mainHeader = document.getElementById('main-header');

    const sectionNav = document.getElementById('section-nav');
    const heroSection = document.getElementById('hero');
    const ctaSection = document.getElementById('cta');

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Logo Principal
        if (heroSection && scrollY > (heroSection.offsetHeight * 0.8)) {
            headerLogo.classList.remove('hidden');
            headerLogo.classList.add('visible');
            mainHeader.style.boxShadow = "var(--shadow)";
        } else {
            headerLogo.classList.remove('visible');
            headerLogo.classList.add('hidden');
            if (scrollY <= 0) mainHeader.style.boxShadow = "none";
        }

        // Header Secundário
        if (heroSection && ctaSection && sectionNav) {
            const heroRect = heroSection.getBoundingClientRect();
            const ctaRect = ctaSection.getBoundingClientRect();

            const isPastHero = heroRect.bottom < 150;
            const isBeforeCTA = ctaRect.top > 200;

            if (isPastHero && isBeforeCTA) {
                sectionNav.classList.remove('hidden-nav');
                sectionNav.classList.add('visible-nav');
            } else {
                sectionNav.classList.remove('visible-nav');
                sectionNav.classList.add('hidden-nav');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

function initLogoClick() {
    const logo = document.getElementById('header-logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function initStickyNav() {
    const navButtons = document.querySelectorAll('.nav-pill');

    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const headerOffset = 130;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = targetSection.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navButtons.forEach(btn => btn.classList.remove('active'));
                const activeBtn = document.querySelector(`.nav-pill[data-target="${entry.target.id}"]`);
                if (activeBtn) activeBtn.classList.add('active');
            }
        });
    }, observerOptions);

    setTimeout(() => {
        const sections = document.querySelectorAll('#sections-container section');
        if (sections.length > 0) {
            sections.forEach(sec => observer.observe(sec));
        }
    }, 500);
}