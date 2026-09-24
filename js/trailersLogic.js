


let moviesData = [];

async function initTrailers() {
    setupLanguage();
    moviesData = await getAllMovies() || [];
    
    const sortOption = document.getElementById('sortOption');
    if (sortOption) {
        sortOption.addEventListener('change', applySort);
    }
    
    applySort();
}

function applySort() {
    const sortOption = document.getElementById('sortOption');
    let sorted = [...moviesData];
    const option = sortOption ? sortOption.value : 'recent';
    
    if (option === 'recent') {
        sorted.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    } else if (option === 'ratingDesc') {
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (option === 'ratingAsc') {
        sorted.sort((a, b) => (a.rating || 0) - (b.rating || 0));
    }

    renderAllTrailers(sorted);
}

function renderAllTrailers(movies) {
    const trailersGrid = document.getElementById('trailersGrid');
    if (!trailersGrid) return;
    
    trailersGrid.innerHTML = '';
    movies.forEach(movie => {
        if (!movie.trailer) return;
        
        const card = document.createElement('div');
        card.classList.add('movie-card'); // Reuse styling
        
        const embedUrl = getEmbedUrl(movie.trailer);
        
        card.innerHTML = `
            <div style="position: relative; width: 100%; padding-top: 56.25%;">
                <iframe src="${embedUrl}" 
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                        frameborder="0" allowfullscreen></iframe>
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title} - Trailer</h3>
                <div class="movie-meta">
                    <span>${movie.releaseYear}</span>
                    <span><i class="fas fa-star" style="color: #e50914;"></i> ${movie.rating || 'N/A'}</span>
                </div>
            </div>
        `;
        trailersGrid.appendChild(card);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTrailers);
} else {
    initTrailers();
}



