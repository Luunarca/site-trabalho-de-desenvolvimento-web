class MobileNavBar {
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";
        this.handleClick = this.handleClick.bind(this);
    }
    animateLinks() {
        this.navLinks.forEach((link, index) => {
            link.style.animation ?
                (link.style.animation = "") :
                (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
        });
    }
    handleClick() {
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
        this.animateLinks();
    }
    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
    }
    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
        return this;
    }
}

class DarkMode {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.init();
    }
    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle('dark-mode', this.isDarkMode);
        localStorage.setItem('darkMode', this.isDarkMode);
        this.updateButtonText();
    }
    updateButtonText() {
        if (this.themeToggle) {
            this.themeToggle.textContent = this.isDarkMode ?
                'Modo Claro' :
                'Modo Escuro';
        }
    }
    init() {
        document.body.classList.toggle('dark-mode', this.isDarkMode);
        this.updateButtonText();
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }
}

// --- CLASSE DO CARROSSEL COM A ESTRUTURA DE DADOS CORRIGIDA ---
class InstrumentCarousel {
    constructor() {
        // CORREÇÃO: Todos os instrumentos agora usam "categories" como um array [ ]
        this.allInstruments = [{
            name: 'Curimbó',
            image: 'img/Curimbó.jpg',
            description: 'O Curimbó é um tipo de tambor feito de um tronco de árvore escavado. É o instrumento que dá nome e base rítmica ao Carimbó.',
            sound: 'Instrumentos Carimbó/Curimbó_.mp3',
            categories: ['Carimbó']
        }, {
            name: 'Maracá',
            image: 'img/Maraca.jpg',
            description: 'O Maracá é um chocalho feito de cabaça com sementes dentro, essencial para a marcação de ritmo no Carimbó.',
            sound: 'Instrumentos Carimbó/Maraca.mp3',
            categories: ['Carimbó']
        }, {
            name: 'Flauta Doce',
            image: 'img/Flauta Doce.jpeg',
            description: 'Instrumento de sopro com um som doce e melodioso, frequentemente usado em introduções e melodias no Carimbó e outros ritmos.',
            sound: 'Instrumentos Carimbó/Flauta Doce.mp3',
            categories: ['Carimbó']
        }, {
            name: 'Clarinete',
            image: 'img/Clarinete.jpg',
            description: 'Instrumento de sopro de palheta simples, conhecido por seu timbre aveludado e sua agilidade, usado para solos e melodias.',
            sound: 'Instrumentos Carimbó/Clarinete.mp3',
            categories: ['Carimbó']
        }, {
            name: 'Banjo',
            image: 'img/Banjo.png',
            description: 'Adaptado em diversos gêneros paraenses, o banjo adiciona uma sonoridade melódica e contagiante.',
            sound: 'Instrumentos Carimbó/Banjo.mp3',
            categories: ['Carimbó']
        }, {
            name: 'Saxofone',
            image: 'img/Saxofone.jpg',
            description: 'Com seu som potente e expressivo, o saxofone é frequentemente usado para solos marcantes e linhas melódicas no Carimbó e outros ritmos.',
            sound: 'Instrumentos Carimbó/Saxofone.mp3',
            categories: ['Carimbó']
        }, {
            name: 'Flauta Transversal',
            image: 'img/Flauta Transversal.png',
            description: 'Uma flauta sem bico, tocada lateralmente, conhecida por seu som brilhante e ágil, que embeleza as melodias.',
            sound: 'Instrumentos Carimbó/Flauta Transversal 2.mp3',
            categories: ['Carimbó']
        }, {
            name: 'Alfaia',
            image: 'img/Alfaia.jpg',
            description: 'Um tambor grande e grave, tocado com duas baquetas, que forma a base rítmica poderosa do Maracatu, também presente em manifestações do Pará.',
            sound: 'Instrumentos Boi/Alfaia.mp3',
            categories: ['Bumba-meu-Boi']
        }, {
            name: 'Barrica',
            image: 'img/Barrica.jpg',
            description: 'Tambor grave, feito de um pequeno barril de madeira, que ajuda a compor a percussão pesada e marcante do Bumba-meu-Boi.',
            sound: 'Instrumentos Boi/Barrica.mp3',
            categories: ['Bumba-meu-Boi']
        }, {
            name: 'Marabaixo',
            image: 'img/Marabaixo.jpeg',
            description: 'Tambores de madeira e couro que dão nome a uma das mais importantes expressões culturais do Amapá e Pará. Possuem som grave e são tocados com as mãos.',
            sound: 'Instrumentos Boi/Marabaixo.mp3',
            categories: ['Bumba-meu-Boi']
        }, {
            name: 'Reco-Reco',
            image: 'img/Reco Reco.jpg',
            description: 'Instrumento de percussão que produz um som de raspagem, adicionando uma textura rítmica característica e contínua.',
            sound: 'Instrumentos Boi/Reco-Reco.mp3',
            categories: ['Bumba-meu-Boi']
        }, {
            name: 'Tambor-Onça',
            image: 'img/Tambor-Onça.jpg',
            description: 'Uma cuíca grande e grave que imita o esturro da onça. Seu som rouco e característico é uma marca do Bumba-meu-Boi.',
            sound: 'Instrumentos Boi/Tambor-Onça.mp3',
            categories: ['Bumba-meu-Boi']
        }];

        this.instruments = [...this.allInstruments];
        this.favorites = [];
        this.currentCategory = 'all';

        this.instrumentNameEl = document.getElementById('instrument-name');
        this.instrumentImageEl = document.getElementById('instrument-image');
        this.descriptionPanelEl = document.getElementById('description-panel');
        this.cardEl = document.querySelector('.instrument-card');
        this.prevButton = document.getElementById('prev-instrument');
        this.nextButton = document.getElementById('next-instrument');
        this.toggleDescriptionButton = document.getElementById('toggle-description');
        this.playSoundButton = document.getElementById('play-sound');
        this.favoriteButton = document.getElementById('toggle-favorite-btn');
        this.categoryLinks = document.querySelectorAll('.category-link');
        
        this.currentIndex = 0;
        this.audio = null;
        this.isPlaying = false;

        this.init();
    }
    
    loadFavorites() {
        const storedFavorites = localStorage.getItem('instrumentFavorites');
        this.favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    }
    saveFavorites() {
        localStorage.setItem('instrumentFavorites', JSON.stringify(this.favorites));
    }
    toggleFavorite() {
        if (this.instruments.length === 0) return;
        const instrumentName = this.instruments[this.currentIndex].name;
        const favoriteIndex = this.favorites.indexOf(instrumentName);
        if (favoriteIndex > -1) {
            this.favorites.splice(favoriteIndex, 1);
        } else {
            this.favorites.push(instrumentName);
        }
        this.saveFavorites();
        this.updateFavoriteButtonState();
        if (this.currentCategory === 'favorites') {
            this.filterByCategory('favorites');
        }
    }
    updateFavoriteButtonState() {
        if (this.instruments.length === 0) {
            this.favoriteButton.classList.remove('favorited');
            return;
        }
        const instrumentName = this.instruments[this.currentIndex].name;
        const isFavorited = this.favorites.includes(instrumentName);
        this.favoriteButton.classList.toggle('favorited', isFavorited);
        this.favoriteButton.title = isFavorited ? "Remover dos Favoritos" : "Adicionar aos Favoritos";
    }

    filterByCategory(category) {
        this.stopSound();
        this.currentCategory = category;

        if (category === 'all') {
            this.instruments = [...this.allInstruments];
        } else if (category === 'favorites') {
            this.instruments = this.allInstruments.filter(instrument => this.favorites.includes(instrument.name));
        } else {
            // Esta linha agora funcionará corretamente
            this.instruments = this.allInstruments.filter(instrument => instrument.categories.includes(category));
        }
        
        this.currentIndex = 0;
        this.displayInstrument();
        this.updateArrowStates();
    }

    updateArrowStates() {
        const isDisabled = this.instruments.length <= 1;
        this.prevButton.disabled = isDisabled;
        this.nextButton.disabled = isDisabled;
    }
    
    displayInstrument() {
        this.descriptionPanelEl.classList.remove('visible');
        if (this.instruments.length === 0) {
            this.cardEl.style.display = 'block';
            this.instrumentNameEl.textContent = 'Nenhum Instrumento';
            this.instrumentImageEl.src = '';
            this.instrumentImageEl.alt = 'Nenhum instrumento encontrado.';
            this.descriptionPanelEl.textContent = this.currentCategory === 'favorites' ?
                'Você ainda não marcou nenhum instrumento como favorito. Clique no coração ❤ dos seus instrumentos preferidos!' :
                'Não há instrumentos nesta categoria.';
            this.toggleDescriptionButton.disabled = true;
            this.playSoundButton.disabled = true;
            this.favoriteButton.style.display = 'none';
            return;
        }
        
        this.cardEl.style.display = 'block';
        this.toggleDescriptionButton.disabled = false;
        this.playSoundButton.disabled = false;
        this.favoriteButton.style.display = 'flex';

        const instrument = this.instruments[this.currentIndex];
        this.instrumentNameEl.textContent = instrument.name;
        this.instrumentImageEl.src = instrument.image;
        this.instrumentImageEl.alt = `Imagem de um ${instrument.name}`;
        this.descriptionPanelEl.textContent = instrument.description;
        this.updateFavoriteButtonState();
    }
    
    nextInstrument() {
        if (this.instruments.length <= 1) return;
        this.stopSound();
        this.currentIndex = (this.currentIndex + 1) % this.instruments.length;
        this.displayInstrument();
    }
    prevInstrument() {
        if (this.instruments.length <= 1) return;
        this.stopSound();
        this.currentIndex = (this.currentIndex - 1 + this.instruments.length) % this.instruments.length;
        this.displayInstrument();
    }

    toggleDescription() { this.descriptionPanelEl.classList.toggle('visible'); }

    // Simulei as funções de som para evitar erros caso não estejam definidas
    stopSound() { if (this.audio && this.isPlaying) { this.audio.pause(); this.audio.currentTime = 0; } this.isPlaying = false; if (this.playSoundButton) { this.playSoundButton.textContent = 'Ouvir o Som'; } }
    toggleSound() { if (this.isPlaying) { this.stopSound(); } else { if (this.instruments.length === 0) return; const instrument = this.instruments[this.currentIndex]; this.audio = new Audio(instrument.sound); this.audio.play().then(() => { this.isPlaying = true; this.playSoundButton.textContent = 'Parar Som'; }).catch(error => { console.error("Erro ao tocar o áudio:", error); }); this.audio.addEventListener('ended', () => this.stopSound()); } }

    init() {
        if (!this.instrumentNameEl) {
            return;
        }
        this.loadFavorites();
        this.categoryLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const category = link.dataset.category;
                this.filterByCategory(category);
                if (this.navList && this.navList.classList.contains('active')) {
                    this.mobileMenu.click();
                }
            });
        });
        this.displayInstrument();
        this.updateArrowStates();
        this.nextButton.addEventListener('click', () => this.nextInstrument());
        this.prevButton.addEventListener('click', () => this.prevInstrument());
        this.toggleDescriptionButton.addEventListener('click', () => this.toggleDescription());
        this.playSoundButton.addEventListener('click', () => this.toggleSound());
        this.favoriteButton.addEventListener('click', () => this.toggleFavorite());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const mobileNavBar = new MobileNavBar(".mobile-menu", ".nav-list", ".nav-list li");
    const instrumentCarousel = new InstrumentCarousel();
    instrumentCarousel.mobileMenu = mobileNavBar.mobileMenu;
    instrumentCarousel.navList = mobileNavBar.navList;
    mobileNavBar.init();
    const darkMode = new DarkMode();
});