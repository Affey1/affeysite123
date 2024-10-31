// Selecionando elementos do DOM
const slider = document.getElementById('slider');
const colorToggle = document.getElementById('colorToggle');
const markers = document.querySelectorAll('.marker');
const sliderImage = document.getElementById('sliderImage');
const poemaContainer = document.getElementById('poema-container');

const markerPositions = Array.from(markers).map(marker => parseInt(marker.style.left));

const gradients = [
    '#87CEFA', // Inverno (azul claro)
    '#FFDEAD', // Outono (bege)
    '#98FB98', // Primavera (verde claro)
    '#e6ff66'  // Verão (amarelo)
];

const images = [
    'assets/images/pages/popup/inverno.png',
    'assets/images/pages/popup/outono.png',
    'assets/images/pages/popup/primavera.png',
    'assets/images/pages/popup/verão.png'
];

// Definindo os poemas para cada estação
const poemas = {
    inverno: "Poema do Inverno: O frio que envolve e encanta...",
    primavera: "Poema da Primavera: Flores que nascem e renascem...",
    verao: "Poema do Verão: Sol radiante e dias longos...",
    outono: "Poema do Outono: Folhas caindo e ventos suaves..."
};

let isDragging = false;

// Função para mudar o fundo e a imagem
function changeBackgroundColorAndImage(position) {
    const index = markerPositions.indexOf(position);
    if (index !== -1) {
        const selectedColor = gradients[index];
        document.documentElement.style.setProperty('--body-color', selectedColor); // Altera a variável CSS
        document.body.style.background = selectedColor; // Altera o fundo como fallback
        document.querySelector('.nav-list').style.background = selectedColor;
        sliderImage.src = images[index];

        const themes = ['inverno', 'outono', 'primavera', 'verao'];
        const selectedTheme = themes[index];
        mostrarPoema(selectedTheme);

        // Salva a cor e o tema selecionados no localStorage
        localStorage.setItem('corSelecionada', selectedColor);
        localStorage.setItem('temaSelecionado', selectedTheme);
    }
}

// Função para mostrar o poema na página
function mostrarPoema(tema) {
    const poema = poemas[tema];
    poemaContainer.textContent = poema;

    // Salva o poema no localStorage
    localStorage.setItem('poemaSelecionado', poema);
}

// Função para mover o slider para o marcador mais próximo
function moveSliderToClosestMarker(newLeft) {
    const sliderWidth = slider.offsetWidth;
    let closestMarker = markerPositions[0];

    markerPositions.forEach(position => {
        if (Math.abs(newLeft + sliderWidth / 2 - position) < Math.abs(newLeft + sliderWidth / 2 - closestMarker)) {
            closestMarker = position;
        }
    });

    slider.style.left = (closestMarker - sliderWidth / 2) + 'px';
    changeBackgroundColorAndImage(closestMarker);
}

// Função para arrastar o slider
function dragSlider(e) {
    const toggleRect = colorToggle.getBoundingClientRect();
    const sliderWidth = slider.offsetWidth;
    const maxLeft = toggleRect.width - sliderWidth;

    let newLeft = e.clientX - toggleRect.left - sliderWidth / 2;
    if (newLeft < 0) newLeft = 0;
    if (newLeft > maxLeft) newLeft = maxLeft;

    slider.style.left = newLeft + 'px';
}

// Evento para mouse down
slider.addEventListener('mousedown', (e) => {
    isDragging = true;

    const mouseMoveHandler = (e) => {
        if (isDragging) {
            dragSlider(e);
        }
    };

    const mouseUpHandler = (e) => {
        isDragging = false;
        moveSliderToClosestMarker(slider.offsetLeft);
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
});

// Inicializa a posição do slider
document.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem('corSelecionada');
    const savedPoem = localStorage.getItem('poemaSelecionado');
    const savedTheme = localStorage.getItem('temaSelecionado');

    if (savedColor) {
        document.documentElement.style.setProperty('--body-color', savedColor); // Aplica a cor na variável
        document.body.style.background = savedColor; // Fallback
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

// Função para redirecionar e salvar a cor, o tema e o poema selecionados
function redirectToSite() {
    const rootStyle = getComputedStyle(document.body);
    const currentColor = rootStyle.getPropertyValue('--body-color') || document.body.style.backgroundColor;
    const poemaAtual = localStorage.getItem('poemaSelecionado') || ''; // Certifique-se de que o poema está salvo

    // Salva a cor e o tema no localStorage antes de redirecionar
    localStorage.setItem('corSelecionada', currentColor);
    const temaAtual = localStorage.getItem('temaSelecionado'); // Obtém o tema atual do localStorage
    localStorage.setItem('temaSelecionado', temaAtual); // Confirma o tema antes de redirecionar
    localStorage.setItem('poemaSelecionado', poemaAtual);

    window.location.href = 'file:///C:/Users/Usuario/Downloads/Test-main/Test-main/index1.html'; // Redireciona para a página
}
