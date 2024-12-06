document.addEventListener('DOMContentLoaded', () => {
    // Modal elements
    const loginModal = document.getElementById('loginModal');
    const registrationModal = document.getElementById('registrationModal');
    const loginBtn = document.getElementById('loginBtn');
    const skipLoginBtn = document.getElementById('skipLoginBtn');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const studentLoginBtn = document.getElementById('studentLoginBtn');
    const loginForm = document.getElementById('loginForm');
    const showRegisterForm = document.getElementById('showRegisterForm');
    const closeBtns = document.querySelectorAll('.close');
    const registerBtns = document.querySelectorAll('.register-btn');

    // Event Listeners
    loginBtn.addEventListener('click', () => loginModal.style.display = 'block');
    skipLoginBtn.addEventListener('click', () => window.location.href = '#events-section');

    adminLoginBtn.addEventListener('click', () => {
        document.querySelector('.login-options').style.display = 'none';
        loginForm.classList.remove('hidden');
    });

    studentLoginBtn.addEventListener('click', () => {
        document.querySelector('.login-options').style.display = 'none';
        loginForm.classList.remove('hidden');
    });

    showRegisterForm.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        registrationModal.style.display = 'block';
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            loginModal.style.display = 'none';
            registrationModal.style.display = 'none';
        });
    });

    registerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            registrationModal.style.display = 'block';
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) loginModal.style.display = 'none';
        if (e.target === registrationModal) registrationModal.style.display = 'none';
    });

    // Handle form submissions
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            });
            if (response.ok) {
                window.location.href = '/dashboard';
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    });

    document.getElementById('registrationForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                alert('Registration successful!');
                registrationModal.style.display = 'none';
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    });
});