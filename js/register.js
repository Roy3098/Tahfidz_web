// Register page JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    loadStudentOptions();
});

// Load student options for parent registration
async function loadStudentOptions() {
    try {
        const response = await fetch('api/get-students-for-registration.php');
        const data = await response.json();
        
        if (data.success) {
            const select = document.getElementById('registerStudent');
            select.innerHTML = '<option value="" class="text-gray-800">Pilih santri...</option>';
            
            data.students.forEach(student => {
                const option = document.createElement('option');
                option.value = student.id;
                option.textContent = student.name;
                option.className = 'text-gray-800';
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading students:', error);
    }
}

// Handle registration form submission
document.getElementById('registerFormElement').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const spinner = submitButton.querySelector('.spinner');
    
    // Get form data
    const formData = new FormData(this);
    const password = formData.get('password');
    const passwordConfirm = formData.get('password_confirm');
    
    // Validate password confirmation
    if (password !== passwordConfirm) {
        showNotification('Password dan konfirmasi password tidak cocok!', 'error');
        return;
    }
    
    // Show loading state
    buttonText.textContent = 'Mendaftar...';
    spinner.classList.remove('hidden');
    submitButton.disabled = true;
    
    try {
        const response = await fetch('api/auth.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'register_parent',
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                student_id: formData.get('student_id'),
                password: password
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Pendaftaran berhasil! Mengalihkan ke halaman login...', 'success');
            setTimeout(() => {
                window.location.href = 'login.php';
            }, 2000);
        } else {
            showNotification(data.message || 'Pendaftaran gagal. Silakan coba lagi.', 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
    } finally {
        // Reset button state
        buttonText.textContent = 'Daftar';
        spinner.classList.add('hidden');
        submitButton.disabled = false;
    }
});

// Handle teacher/admin registration form submission
const teacherForm = document.getElementById('registerTeacherFormElement');
if (teacherForm) {
    teacherForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const submitButton = this.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('.button-text');
        const spinner = submitButton.querySelector('.spinner');

        // Get form data
        const formData = new FormData(this);
        const password = formData.get('password');
        const passwordConfirm = formData.get('password_confirm');

        // Validate password confirmation
        if (password !== passwordConfirm) {
            showNotification('Password dan konfirmasi password tidak cocok!', 'error');
            return;
        }

        // Show loading state
        buttonText.textContent = 'Mendaftar...';
        spinner.classList.remove('hidden');
        submitButton.disabled = true;

        try {
            const response = await fetch('api/auth.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'register_teacher',
                    username: formData.get('username'),
                    name: formData.get('name'),
                    password: password,
                    role: formData.get('role')
                })
            });

            const data = await response.json();

            if (data.success) {
                showNotification('Pendaftaran guru/admin berhasil! Mengalihkan ke halaman login...', 'success');
                setTimeout(() => {
                    window.location.href = 'login.php';
                }, 2000);
            } else {
                showNotification(data.message || 'Pendaftaran gagal. Silakan coba lagi.', 'error');
            }
        } catch (error) {
            console.error('Registration error:', error);
            showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
        } finally {
            // Reset button state
            buttonText.textContent = 'Daftar';
            spinner.classList.add('hidden');
            submitButton.disabled = false;
        }
    });
}

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