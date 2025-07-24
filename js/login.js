// Login page JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    checkAuthStatus();
});

// Check authentication status
async function checkAuthStatus() {
    try {
        const response = await fetch('api/check-auth.php');
        const data = await response.json();
        
        if (data.success && data.user) {
            // User is already logged in, redirect to dashboard
            window.location.href = 'index.php';
        }
    } catch (error) {
        console.log('Not logged in');
    }
}

// Show admin login form
function showAdminLogin() {
    document.getElementById('loginOptions').classList.add('hidden');
    document.getElementById('adminLoginForm').classList.remove('hidden');
    document.getElementById('parentLoginForm').classList.add('hidden');
}

// Show parent login form
function showParentLogin() {
    document.getElementById('loginOptions').classList.add('hidden');
    document.getElementById('parentLoginForm').classList.remove('hidden');
    document.getElementById('adminLoginForm').classList.add('hidden');
}

// Back to login options
function backToLoginOptions() {
    document.getElementById('adminLoginForm').classList.add('hidden');
    document.getElementById('parentLoginForm').classList.add('hidden');
    document.getElementById('loginOptions').classList.remove('hidden');
}

// Handle admin login form submission
document.getElementById('adminLoginFormElement').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const spinner = submitButton.querySelector('.spinner');
    
    // Show loading state
    buttonText.textContent = 'Memproses...';
    spinner.classList.remove('hidden');
    submitButton.disabled = true;
    
    const formData = new FormData(this);
    formData.append('action', 'login_admin');
    
    try {
        const response = await fetch('api/auth.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'login_admin',
                username: formData.get('username'),
                password: formData.get('password')
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Login berhasil! Mengalihkan ke dashboard...', 'success');
            setTimeout(() => {
                window.location.href = 'index.php';
            }, 1500);
        } else {
            showNotification(data.message || 'Login gagal. Silakan coba lagi.', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
    } finally {
        // Reset button state
        buttonText.textContent = 'Masuk';
        spinner.classList.add('hidden');
        submitButton.disabled = false;
    }
});

// Handle parent login form submission
document.getElementById('parentLoginFormElement').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const spinner = submitButton.querySelector('.spinner');
    
    // Show loading state
    buttonText.textContent = 'Memproses...';
    spinner.classList.remove('hidden');
    submitButton.disabled = true;
    
    const formData = new FormData(this);
    
    try {
        const response = await fetch('api/auth.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'login_parent',
                email: formData.get('email'),
                password: formData.get('password')
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Login berhasil! Mengalihkan ke dashboard...', 'success');
            setTimeout(() => {
                window.location.href = 'index.php';
            }, 1500);
        } else {
            showNotification(data.message || 'Login gagal. Silakan coba lagi.', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
    } finally {
        // Reset button state
        buttonText.textContent = 'Masuk';
        spinner.classList.add('hidden');
        submitButton.disabled = false;
    }
});

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Custom Modal Functions
function showCustomModal(title, message, buttons) {
    const modal = document.getElementById('customModal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').innerHTML = message;
    const modalButtonsDiv = document.getElementById('modalButtons');
    modalButtonsDiv.innerHTML = '';

    if (Array.isArray(buttons)) {
        buttons.forEach(btnConfig => {
            const button = document.createElement('button');
            button.textContent = btnConfig.text;
            button.className = btnConfig.class || 'bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600';
            button.onclick = btnConfig.onClick;
            modalButtonsDiv.appendChild(button);
        });
    } else {
        const okButton = document.createElement('button');
        okButton.textContent = 'OK';
        okButton.className = 'bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 w-full';
        okButton.onclick = () => {
            closeCustomModal();
            if (typeof buttons === 'function') {
                buttons();
            }
        };
        modalButtonsDiv.appendChild(okButton);
    }

    modal.classList.remove('hidden');
}

function closeCustomModal() {
    document.getElementById('customModal').classList.add('hidden');
}