class ApiException extends Error {
    constructor(message, status = 500, details = null) {
        super(message);
        this.name = 'ApiException';
        this.status = status;
        this.details = details;
    }
}

function handleApiError(error, defaultMessage = "An unexpected error occurred.") {
    console.error("API Error details:", error);
    
    let message = defaultMessage;
    if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
    } else if (error.message) {
        message = error.message;
    }
    
    // Global alert for now, could be enhanced to use toast notifications
    alert(`Error: ${message}`);
    throw new ApiException(message, error.response?.status, error);
}

