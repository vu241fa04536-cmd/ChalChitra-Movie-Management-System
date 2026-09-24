


let isLoginMode = true;

document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('authForm');
    const toggleAuthMode = document.getElementById('toggleAuthMode');
    
    if (authForm) {
        authForm.addEventListener('submit', handleAuthSubmit);
    }
    
    if (toggleAuthMode) {
        toggleAuthMode.addEventListener('click', toggleMode);
    }
});

function toggleMode(e) {
    e.preventDefault();
    isLoginMode = !isLoginMode;
    document.getElementById('authTitle').textContent = isLoginMode ? 'Sign In' : 'Sign Up';
    document.getElementById('authBtn').textContent = isLoginMode ? 'Sign In' : 'Sign Up';
    document.getElementById('authToggleText').textContent = isLoginMode ? "Don't have an account?" : 'Already have an account?';
    document.getElementById('toggleAuthMode').textContent = isLoginMode ? 'Sign Up' : 'Sign In';
    document.getElementById('authMessage').textContent = '';
}

async function handleAuthSubmit(e) {
    e.preventDefault();
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    const msg = document.getElementById('authMessage');
    
    if (!u || !p) {
        handleValidationError(new Error("Please enter username and password"));
        msg.textContent = "Please enter username and password.";
        return;
    }

    try {
        if (isLoginMode) {
            const users = await loginUser(u, p);
            if (users && users.length > 0) {
                localStorage.setItem('ChalChitra_user', JSON.stringify(users[0]));
                window.location.href = 'index.html';
            } else {
                msg.textContent = 'Invalid credentials';
            }
        } else {
            const newUser = await registerUser(u, p);
            if (newUser) {
                localStorage.setItem('ChalChitra_user', JSON.stringify(newUser));
                window.location.href = 'index.html';
            }
        }
    } catch (e) {
        msg.textContent = e.message || 'An error occurred';
    }
}

