



let currentUser = null;
let movieId = null;
let currentMovie = null;

async function initMovie() {
    currentUser = await checkAuth();
    setupLanguage();
    
    const params = new URLSearchParams(window.location.search);
    movieId = params.get('id');
    
    if (movieId) {
        currentMovie = await getMovieById(movieId);
        if (currentMovie) renderMovieDetails(currentMovie);
        else document.getElementById('movieContainer').innerHTML = '<p>Movie not found.</p>';
    }
}

function renderMovieDetails(movie) {
    const section = document.getElementById('movieContainer');
    if (!section) return;
    
    const isFav = currentUser && currentUser.favorites && currentUser.favorites.includes(movie.id);
    const isWatch = currentUser && currentUser.watchlist && currentUser.watchlist.includes(movie.id);
    
    let watchBtns = '';
    if (movie.watchLinks) {
        if (movie.watchLinks.youtube) watchBtns += `<a href="${movie.watchLinks.youtube}" target="_blank" class="btn" style="background:#e50914;"><i class="fab fa-youtube"></i> YouTube</a>`;
        if (movie.watchLinks.netflix) watchBtns += `<a href="${movie.watchLinks.netflix}" target="_blank" class="btn" style="background:#e50914;"><i class="fas fa-play"></i> Netflix</a>`;
        if (movie.watchLinks.hotstar) watchBtns += `<a href="${movie.watchLinks.hotstar}" target="_blank" class="btn" style="background:#032541;"><i class="fas fa-star"></i> Hotstar</a>`;
    }

    const embedUrl = getEmbedUrl(movie.trailer);

    section.innerHTML = `
        <div class="movie-detail-container">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-detail-poster">
            <div class="movie-detail-info">
                <h1>${movie.title}</h1>
                <div class="movie-meta">
                    <span>${movie.releaseYear}</span>
                    <span>${movie.duration || 'N/A'}</span>
                    <span><i class="fas fa-star" style="color: #e50914;"></i> ${movie.rating || 'N/A'}</span>
                    <span>${movie.genre}</span>
                </div>
                <p style="margin: 20px 0; font-size: 16px; line-height: 1.6;">${movie.description}</p>
                
                <div style="display: flex; gap: 15px; margin-bottom: 20px;">
                    <button class="btn" id="watchTrailerBtn">Watch Trailer</button>
                    <button class="btn" id="watchlistBtn" style="background: ${isWatch ? '#e50914' : '#333'}">${isWatch ? 'Remove from Watchlist' : 'Add to Watchlist'}</button>
                    <button class="btn" id="favBtnDetails" style="background: ${isFav ? '#e50914' : '#333'}"><i class="fas fa-heart"></i> ${isFav ? 'Favorited' : 'Add to Favorites'}</button>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    ${watchBtns}
                </div>
            </div>
        </div>
        
        <div class="trailer-container" id="trailerContainer" style="display: none; margin-top: 40px;">
            <h2>Trailer</h2>
            <iframe id="trailerFrame" width="100%" height="500" src="" frameborder="0" allowfullscreen></iframe>
        </div>
    `;

    document.getElementById('watchTrailerBtn').addEventListener('click', () => {
        const t = document.getElementById('trailerContainer');
        t.style.display = 'block';
        document.getElementById('trailerFrame').src = embedUrl;
        t.scrollIntoView({behavior: 'smooth'});
    });
    
    document.getElementById('watchlistBtn').addEventListener('click', () => toggleDetailsWatchlist(movie.id));
    document.getElementById('favBtnDetails').addEventListener('click', () => toggleDetailsFav(movie.id));
}

async function toggleDetailsFav(id) {
    if (!currentUser) return alert("Please login first.");
    let fList = currentUser.favorites || [];
    if (fList.includes(id)) fList = fList.filter(mId => mId !== id);
    else fList.push(id);
    
    currentUser.favorites = fList;
    if (await updateUser(currentUser.id, currentUser)) {
        localStorage.setItem('ChalChitra_user', JSON.stringify(currentUser));
        renderMovieDetails(currentMovie);
    }
}

async function toggleDetailsWatchlist(id) {
    if (!currentUser) return alert("Please login first.");
    let wList = currentUser.watchlist || [];
    if (wList.includes(id)) wList = wList.filter(mId => mId !== id);
    else wList.push(id);
    
    currentUser.watchlist = wList;
    if (await updateUser(currentUser.id, currentUser)) {
        localStorage.setItem('ChalChitra_user', JSON.stringify(currentUser));
        renderMovieDetails(currentMovie);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMovie);
} else {
    initMovie();
}


