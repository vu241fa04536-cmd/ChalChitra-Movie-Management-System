class ValidationException extends Error {
    constructor(message, fields = []) {
        super(message);
        this.name = 'ValidationException';
        this.fields = fields;
    }
}

function handleValidationError(error) {
    console.warn("Validation Error:", error.message, error.fields);
    alert(`Validation Error: ${error.message}`);
}

