document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const iconElement = toggleBtn.querySelector('i');

    // 1. Verificar preferência salva no LocalStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        htmlElement.setAttribute('data-theme', 'dark');
        updateIcon(true);
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        updateIcon(false);
    }

    // 2. Evento de Clique
    toggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        // Atualiza atributo HTML (O CSS index.css fará o resto)
        htmlElement.setAttribute('data-theme', newTheme);
        
        // Salva preferência
        localStorage.setItem('theme', newTheme);

        // Atualiza ícone
        updateIcon(newTheme === 'dark');
    });

    function updateIcon(isDark) {
        // Remove classes antigas
        iconElement.classList.remove('ph-moon', 'ph-sun');
        
        if (isDark) {
            // Se está escuro, mostra o sol (para mudar para claro)
            iconElement.classList.add('ph-sun');
        } else {
            // Se está claro, mostra a lua
            iconElement.classList.add('ph-moon');
        }
    }
});