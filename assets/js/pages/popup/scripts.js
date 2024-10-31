const slider = document.getElementById('slider');
const colorToggle = document.getElementById('colorToggle');
const markers = document.querySelectorAll('.marker');
const sliderImage = document.getElementById('sliderImage');
const poemDisplay = document.getElementById('poemDisplay');

// Posições dos marcadores
const markerPositions = Array.from(markers).map(marker => {
    return parseInt(marker.style.left);
});

// Cores correspondentes a cada posição (estação do ano)
const gradients = [
    '#87CEFA', // Inverno (azul claro)
    '#FFDEAD', // Outono (bege)
    '#98FB98', // Primavera (verde claro)
    '#000000'  // Verão (amarelo)
];

// Imagens correspondentes a cada posição
const images = [
    'C:/Users/Usuario/Desktop/test/inverno.png', 
    'C:/Users/Usuario/Desktop/test/outono.png', 
    'C:/Users/Usuario/Desktop/test/primavera.png', 
    'C:/Users/Usuario/Desktop/test/verão.png'
];

// Poemas correspondentes a cada estação
const poems = [
    "Manhãs pálidas e tardes escuras...",
    "Uma árvore florida fica despida no outono...",
    "O cinza se tornou azul...",
    "Verão quente, alegria e cor..."
];

let isDragging = false;
let clickCount = 0;
let clickTimeout;

// Função para salvar a estação escolhida no localStorage
function selecionarOpcao(index) {
    const corEscolhida = gradients[index];
    localStorage.setItem('corSelecionada', corEscolhida); // Salva a cor selecionada
}

// Função para mudar a cor de fundo, imagem e poema do slider
function changeBackgroundColorAndImage(position) {
    const index = markerPositions.indexOf(position);
    if (index !== -1) {
        const selectedColor = gradients[index];
        const selectedPoem = poems[index];
        const selectedTitle = poemTitles[index];

        document.body.style.background = selectedColor;
        sliderImage.src = images[index];
        poemDisplay.innerText = selectedPoem;

        // Salva a cor, título e poema selecionado no localStorage
        localStorage.setItem('corSelecionada', selectedColor);
        localStorage.setItem('tituloPoemaSelecionado', selectedTitle);
        localStorage.setItem('poemaSelecionado', selectedPoem);
    }
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
    changeBackgroundColorAndImage(closestMarker); // Muda a cor e imagem ao grudar no marcador
    localStorage.setItem('sliderPosition', closestMarker); // Salva a posição no localStorage
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

// Mover o slider ao arrastar
slider.addEventListener('mousedown', (e) => {
    clickCount++;

    if (clickCount > 1) {
        e.preventDefault();
        clearTimeout(clickTimeout);
        clickCount = 0;
        return;
    }

    clickTimeout = setTimeout(() => {
        clickCount = 0;
    }, 300);

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

// Previne o comportamento padrão do botão direito
slider.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Inicializa a posição do slider e aplica a cor correspondente
function initSliderPosition() {
    const savedPosition = localStorage.getItem('sliderPosition');

    if (savedPosition) {
        moveSliderToClosestMarker(parseInt(savedPosition));
    } else {
        const initialPosition = markerPositions[0];
        slider.style.left = (initialPosition - slider.offsetWidth / 2) + 'px';
        changeBackgroundColorAndImage(initialPosition);
    }
}

// Inicializa a posição do slider ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    initSliderPosition();
});
