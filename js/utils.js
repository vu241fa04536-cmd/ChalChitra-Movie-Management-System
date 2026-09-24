

function getEmbedUrl(url) {
    if (!url) return '';
    if (url.includes('youtube.com/embed/')) return url;
    if (url.includes('youtube.com/watch?v=')) {
        return `https://www.youtube.com/embed/${url.split('v=')[1].split('&')[0]}`;
    }
    if (url.includes('youtu.be/')) {
        return `https://www.youtube.com/embed/${url.split('youtu.be/')[1].split('?')[0]}`;
    }
    if (url.includes('youtube.com/shorts/')) {
        return `https://www.youtube.com/embed/${url.split('shorts/')[1].split('?')[0]}`;
    }
    return url;
}

const translations = {
    en: {
        menu: "Menu", movies: "Movies", trailers: "Trailers", webseries: "Webseries",
        signin: "Sign in", upNext: "Up Next", browseTrailer: "Browse Trailer >",
        myWatchlist: "My Watchlist", favMovies: "Favourite Movies",
        upcomingMovies: "Upcoming Movies", filters: "Filters", genre: "Genre:",
        language: "Language:", sort: "Sort", rating: "Rating:", exploreMovies: "Explore Movies",
        shortMovies: "Short Movies", cartoons: "Cartoons", yourInterest: "Your Interest:",
        search: "Search:"
    },
    hi: {
        menu: "मेनू", movies: "फिल्में", trailers: "ट्रेलर", webseries: "वेब सीरीज",
        signin: "साइन इन", upNext: "अगला", browseTrailer: "ट्रेलर ब्राउज़ करें >",
        myWatchlist: "मेरी वॉचलिस्ट", favMovies: "पसंदीदा फिल्में",
        upcomingMovies: "आने वाली फिल्में", filters: "फिल्टर", genre: "शैली:",
        language: "भाषा:", sort: "क्रमबद्ध करें", rating: "रेटिंग:", exploreMovies: "फिल्में खोजें",
        shortMovies: "लघु फिल्में", cartoons: "कार्टून", yourInterest: "आपकी रुचि:",
        search: "खोजें:"
    },
    te: {
        menu: "మెనూ", movies: "సినిమాలు", trailers: "ట్రైలర్స్", webseries: "వెబ్ సిరీస్",
        signin: "సైన్ ఇన్", upNext: "తర్వాత", browseTrailer: "ట్రైలర్ బ్రౌజ్ చేయండి >",
        myWatchlist: "నా వాచ్‌లిస్ట్", favMovies: "ఇష్టమైన సినిమాలు",
        upcomingMovies: "రాబోయే సినిమాలు", filters: "ఫిల్టర్లు", genre: "శైలి:",
        language: "భాష:", sort: "క్రమబద్ధీకరించు", rating: "రేటింగ్:", exploreMovies: "సినిమాలను అన్వేషించండి",
        shortMovies: "లఘు చిత్రాలు", cartoons: "కార్టూన్లు", yourInterest: "మీ ఆసక్తి:",
        search: "వెతుకు:"
    }
};


function setupLanguage() {
    const langMenu = document.getElementById('langMenu');
    const currentLangEl = document.getElementById('currentLang');
    
    if (langMenu && currentLangEl) {
        langMenu.addEventListener('click', (e) => {
            if(e.target.dataset.lang) {
                const langCode = e.target.dataset.lang;
                currentLangEl.textContent = langCode.toUpperCase();
                applyTranslations(langCode);
            }
        });
    }
}

function applyTranslations(lang) {
    const dict = translations[lang];
    if(!dict) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });
}

async function checkAuth() {
    const signInNav = document.getElementById('signInNav');
    const userSections = document.getElementById('userSections');
    let currentUser = null;

    const userStr = localStorage.getItem('ChalChitra_user');
    if (userStr) {
        try {
            currentUser = JSON.parse(userStr);
            if (!currentUser || typeof currentUser !== 'object') throw new Error("Legacy string");
            
            // Sync with backend
            const userRes = await getUserById(currentUser.id);
            if (userRes) {
                currentUser = userRes;
                localStorage.setItem('ChalChitra_user', JSON.stringify(currentUser));
            }
            
            if (signInNav) {
                signInNav.textContent = `Hi, ${currentUser.username} (Logout)`;
                signInNav.onclick = () => {
                    localStorage.removeItem('ChalChitra_user');
                    window.location.reload();
                };
            }
            if(userSections) userSections.style.display = 'block';
        } catch (e) {
            localStorage.removeItem('ChalChitra_user');
            currentUser = null;
            if (signInNav) {
                signInNav.textContent = 'Sign in';
                signInNav.onclick = () => window.location.href = 'login.html';
            }
        }
    }
    return currentUser;
}

