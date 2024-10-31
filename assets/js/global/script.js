const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

// Ativa ou desativa a classe 'active' na navegação ao clicar no hambúrguer
hamburger.addEventListener("click", () => nav.classList.toggle("active"));

document.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem('corSelecionada');
    const savedPoem = localStorage.getItem('poemaSelecionado');
    const savedTheme = localStorage.getItem('temaSelecionado');

    if (savedColor) {
        // Aplica a cor armazenada no body e na variável CSS
        document.documentElement.style.setProperty('--body-color', savedColor);
        document.body.style.background = savedColor; // Altera o fundo como fallback
        document.querySelector('.nav-list').style.background = savedColor; // Aplica na nav
    } 

    // Exibe o poema salvo se existir
    if (savedPoem) {
        poemaContainer.innerText = savedPoem;
    }

    // Se um tema foi salvo, pode ser usado para ajustar o slider
    if (savedTheme) {
        const themeIndex = ['inverno', 'outono', 'primavera', 'verao'].indexOf(savedTheme);
        if (themeIndex !== -1) {
            moveSliderToClosestMarker(markerPositions[themeIndex]);
        }
    }
});
''
