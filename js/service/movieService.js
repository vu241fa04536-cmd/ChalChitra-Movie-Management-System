


async function getAllMovies() {
    try {
        const response = await axios.get(MOVIE_API_URL);
        return response.data;
    } catch (error) {
        handleApiError(error, "Failed to fetch movies.");
    }
}

async function getMovieById(id) {
    try {
        const response = await axios.get(`${MOVIE_API_URL}/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error, "Failed to fetch movie details.");
    }
}

async function addMovie(movieData) {
    try {
        const response = await axios.post(MOVIE_API_URL, movieData);
        return response.data;
    } catch (error) {
        handleApiError(error, "Failed to add movie.");
    }
}

async function updateMovie(id, movieData) {
    try {
        const response = await axios.put(`${MOVIE_API_URL}/${id}`, movieData);
        return response.data;
    } catch (error) {
        handleApiError(error, "Failed to update movie.");
    }
}

async function deleteMovie(id) {
    try {
        await axios.delete(`${MOVIE_API_URL}/${id}`);
        return true;
    } catch (error) {
        handleApiError(error, "Failed to delete movie.");
    }
}

