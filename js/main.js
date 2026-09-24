



let moviesData = [];
let currentUser = null;
let currentCarouselIndex = 0;
let carouselInterval;

async function initApp() {
    currentUser = await checkAuth();
    setupLanguage();
    moviesData = await getAllMovies() || [];
    
    setupCarousel();
    renderTrailers(moviesData);
    
    renderUpcoming(moviesData.filter(m => m.status === 'upcoming'));
    applyFilters(); 
    
    if (currentUser) {
        renderUserSections();
    }
}

const carouselTrack = document.getElementById('carouselTrack');
const carouselContainer = document.getElementById('carouselContainer');
const prevSlideBtn = document.getElementById('prevSlideBtn');
const nextSlideBtn = document.getElementById('nextSlideBtn');

function setupCarousel() {
    if (!carouselTrack) return;
    if (moviesData.length === 0) return;
    
    carouselTrack.innerHTML = '';
    moviesData.forEach((movie, index) => {
        const img = document.createElement('img');
        img.src = movie.poster;
        img.alt = movie.title;
        img.onclick = () => {
            window.location.href = `movie.html?id=${movie.id}`;
        };
        carouselTrack.appendChild(img);
    });

    updateCarousel();
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 2500); 
}

function updateCarousel() {
    if (!carouselTrack) return;
    if (moviesData.length === 0) return;
    
    carouselTrack.style.transform = `translateX(-${currentCarouselIndex * 100}%)`;
    if (carouselContainer) {
        carouselContainer.style.backgroundImage = `url(${moviesData[currentCarouselIndex].poster})`;
    }
}

function nextSlide() {
    if (moviesData.length === 0) return;
    currentCarouselIndex = (currentCarouselIndex + 1) % moviesData.length;
    updateCarousel();
}

function prevSlide() {
    if (moviesData.length === 0) return;
    currentCarouselIndex = (currentCarouselIndex - 1 + moviesData.length) % moviesData.length;
    updateCarousel();
}

if (nextSlideBtn) nextSlideBtn.addEventListener('click', () => {
    nextSlide();
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 2500);
});

if (prevSlideBtn) prevSlideBtn.addEventListener('click', () => {
    prevSlide();
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 2500);
});

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    
    const isFav = currentUser && currentUser.favorites && currentUser.favorites.includes(movie.id);
    
    card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
        <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${movie.id}">
            <i class="fas fa-heart"></i>
        </button>
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <div class="movie-meta">
                <span>${movie.releaseYear}</span>
                <span>${movie.duration || '2h 10m'}</span>
                <span><i class="fas fa-star" style="color: #e50914;"></i> ${movie.rating || 'N/A'}</span>
            </div>
            <p class="movie-desc">${(movie.description || '').substring(0, 80)}...</p>
        </div>
    `;
    card.addEventListener('click', (e) => {
        if(e.target.closest('.fav-btn')) return; // handled separately
        window.location.href = `movie.html?id=${movie.id}`;
    });
    
    const favBtn = card.querySelector('.fav-btn');
    favBtn.addEventListener('click', (e) => toggleFavourite(e, movie.id));
    
    return card;
}

function renderUpcoming(movies) {
    const upcomingCardsContainer = document.getElementById('upcomingCardsContainer');
    if (upcomingCardsContainer) {
        upcomingCardsContainer.innerHTML = '';
        movies.forEach(movie => upcomingCardsContainer.appendChild(createMovieCard(movie)));
    }
}

function renderWebseries(movies) {
    const webseriesCardsContainer = document.getElementById('webseriesCardsContainer');
    if (webseriesCardsContainer) {
        webseriesCardsContainer.innerHTML = '';
        movies.forEach(movie => webseriesCardsContainer.appendChild(createMovieCard(movie)));
        const section = document.getElementById('webseriesSection');
        if (section) section.style.display = movies.length ? 'block' : 'none';
    }
}

function renderShorts(movies) {
    const shortsCardsContainer = document.getElementById('shortsCardsContainer');
    if (shortsCardsContainer) {
        shortsCardsContainer.innerHTML = '';
        movies.forEach(movie => shortsCardsContainer.appendChild(createMovieCard(movie)));
        const section = document.getElementById('shortsSection');
        if (section) section.style.display = movies.length ? 'block' : 'none';
    }
}

function renderCartoons(movies) {
    const cartoonsCardsContainer = document.getElementById('cartoonsCardsContainer');
    if (cartoonsCardsContainer) {
        cartoonsCardsContainer.innerHTML = '';
        movies.forEach(movie => cartoonsCardsContainer.appendChild(createMovieCard(movie)));
        const section = document.getElementById('cartoonsSection');
        if (section) section.style.display = movies.length ? 'block' : 'none';
    }
}

function renderExplore(movies) {
    const movieCardsContainer = document.getElementById('movieCardsContainer');
    if (movieCardsContainer) {
        movieCardsContainer.innerHTML = '';
        const exploreList = movies.filter(m => m.type === 'movie');
        exploreList.forEach(movie => movieCardsContainer.appendChild(createMovieCard(movie)));
        movieCardsContainer.style.display = exploreList.length ? 'grid' : 'none';
        const title = movieCardsContainer.previousElementSibling;
        if (title && title.tagName === 'H2') title.style.display = exploreList.length ? 'block' : 'none';
    }
}

function renderTrailers(movies) {
    const sideTrailersList = document.getElementById('sideTrailersList');
    if (sideTrailersList) sideTrailersList.innerHTML = '';
    const sideMovies = movies.slice(0, 5);
    sideMovies.forEach(movie => {
        const item = document.createElement('div');
        item.classList.add('side-trailer-item');
        item.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <div class="side-trailer-info">
                <div style="font-size: 14px; font-weight: bold;">${movie.title}</div>
                <div style="font-size: 12px; color: #aaa;">Trailer</div>
            </div>
        `;
        item.addEventListener('click', () => {
            window.location.href = `movie.html?id=${movie.id}`;
        });
        if (sideTrailersList) sideTrailersList.appendChild(item);
    });
}

function renderUserSections() {
    const watchlistContainer = document.getElementById('watchlistContainer');
    const favoritesContainer = document.getElementById('favoritesContainer');
    
    if (watchlistContainer) watchlistContainer.innerHTML = '';
    if (favoritesContainer) favoritesContainer.innerHTML = '';
    
    const wMovies = moviesData.filter(m => currentUser.watchlist && currentUser.watchlist.includes(m.id));
    const fMovies = moviesData.filter(m => currentUser.favorites && currentUser.favorites.includes(m.id));
    
    if (watchlistContainer) {
        wMovies.forEach(movie => watchlistContainer.appendChild(createMovieCard(movie)));
        if (wMovies.length === 0) watchlistContainer.innerHTML = '<p>No movies in watchlist yet.</p>';
    }
    if (favoritesContainer) {
        fMovies.forEach(movie => favoritesContainer.appendChild(createMovieCard(movie)));
        if (fMovies.length === 0) favoritesContainer.innerHTML = '<p>No favourite movies yet.</p>';
    }
}

function applyFilters(isSearch = false) {
    let filtered = [...moviesData];
    
    const searchInput = document.getElementById('searchInput');
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    if (query) {
        filtered = filtered.filter(m => m.title.toLowerCase().includes(query));
        if (isSearch && document.getElementById('exploreSection')) {
            document.getElementById('exploreSection').scrollIntoView({ behavior: 'smooth' });
        }
    }

    let localSearchQuery = '';
    document.querySelectorAll('.local-search-input').forEach(input => {
        if (input.value) localSearchQuery = input.value.toLowerCase();
    });
    if (localSearchQuery) {
        filtered = filtered.filter(m => m.title.toLowerCase().includes(localSearchQuery));
    }
    
    const sType = document.getElementById('searchType')?.value || 'all';
    if (sType === 'movies') {
        filtered = filtered.filter(m => m.type === 'movie');
    }
    
    const typeFilter = document.getElementById('typeFilter');
    const uiType = typeFilter ? typeFilter.value : '';
    if (uiType) {
        filtered = filtered.filter(m => m.type === uiType);
    }

    const genreFilter = document.getElementById('genreFilter');
    const genre = genreFilter ? genreFilter.value : '';
    if (genre) filtered = filtered.filter(m => m.genre === genre);

    const languageFilter = document.getElementById('languageFilter');
    const language = languageFilter ? languageFilter.value : '';
    if (language) filtered = filtered.filter(m => m.language === language);

    const sortRating = document.getElementById('sortRating');
    const sort = sortRating ? sortRating.value : 'none';
    if (sort === 'desc') filtered.sort((a, b) => b.rating - a.rating);
    else if (sort === 'asc') filtered.sort((a, b) => a.rating - b.rating);

    if (document.getElementById('movieCardsContainer')) renderExplore(filtered);
    if (document.getElementById('webseriesCardsContainer')) renderWebseries(filtered.filter(m => m.type === 'webseries'));
    if (document.getElementById('shortsCardsContainer')) renderShorts(filtered.filter(m => m.type === 'short'));
    if (document.getElementById('cartoonsCardsContainer')) renderCartoons(filtered.filter(m => m.type === 'cartoon'));
}

async function toggleFavourite(event, id) {
    event.stopPropagation();
    if (!currentUser) {
        alert("Please login first.");
        return;
    }

    let fList = currentUser.favorites || [];
    if (fList.includes(id)) {
        fList = fList.filter(mId => mId !== id);
    } else {
        fList.push(id);
    }
    
    currentUser.favorites = fList;
    const updated = await updateUser(currentUser.id, currentUser);
    if (updated) {
        localStorage.setItem('ChalChitra_user', JSON.stringify(currentUser));
        renderUpcoming(moviesData.filter(m => m.status === 'upcoming'));
        renderWebseries(moviesData.filter(m => m.type === 'webseries'));
        applyFilters();
        renderUserSections();
    }
}

// Event listeners for filters
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
if (searchBtn) searchBtn.addEventListener('click', () => applyFilters(true));
if (searchInput) searchInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') applyFilters(true); });

const genreFilter = document.getElementById('genreFilter');
const languageFilter = document.getElementById('languageFilter');
const sortRating = document.getElementById('sortRating');
const typeFilter = document.getElementById('typeFilter');

if (genreFilter) genreFilter.addEventListener('change', () => applyFilters());
if (languageFilter) languageFilter.addEventListener('change', () => applyFilters());
if (sortRating) sortRating.addEventListener('change', () => applyFilters());
if (typeFilter) typeFilter.addEventListener('change', () => applyFilters());

document.querySelectorAll('.local-search-input').forEach(input => {
    input.addEventListener('keyup', () => applyFilters());
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

