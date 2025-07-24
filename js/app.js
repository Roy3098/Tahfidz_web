// Main application JavaScript for Tahfidz Tracker

// Global variables
let currentUser = null;
let currentPage = 'dashboard';
let currentAbsensiGroupFilter = 'all';
let currentGenderFilter = 'all';
let currentGroupFilter = 'all';
let masterData = {};

// Quran Data: Complete database for Juz, Surah, Ayah counts
const quranData = {
    1: {
        name: "Juz 1",
        surahs: {
            1: { name: "Al-Fatihah", ayahs: 7 },
            2: { name: "Al-Baqarah", ayahs: 141 }
        }
    },
    2: {
        name: "Juz 2",
        surahs: {
            2: { name: "Al-Baqarah", ayahs: 252 }
        }
    },
    3: {
        name: "Juz 3",
        surahs: {
            2: { name: "Al-Baqarah", ayahs: 286 },
            3: { name: "Ali 'Imran", ayahs: 92 }
        }
    },
    4: {
        name: "Juz 4",
        surahs: {
            3: { name: "Ali 'Imran", ayahs: 200 },
            4: { name: "An-Nisa", ayahs: 23 }
        }
    },
    5: {
        name: "Juz 5",
        surahs: {
            4: { name: "An-Nisa", ayahs: 147 }
        }
    },
    6: {
        name: "Juz 6",
        surahs: {
            4: { name: "An-Nisa", ayahs: 176 },
            5: { name: "Al-Ma'idah", ayahs: 82 }
        }
    },
    7: {
        name: "Juz 7",
        surahs: {
            5: { name: "Al-Ma'idah", ayahs: 120 },
            6: { name: "Al-An'am", ayahs: 110 }
        }
    },
    8: {
        name: "Juz 8",
        surahs: {
            6: { name: "Al-An'am", ayahs: 165 },
            7: { name: "Al-A'raf", ayahs: 87 }
        }
    },
    9: {
        name: "Juz 9",
        surahs: {
            7: { name: "Al-A'raf", ayahs: 206 },
            8: { name: "Al-Anfal", ayahs: 40 }
        }
    },
    10: {
        name: "Juz 10",
        surahs: {
            8: { name: "Al-Anfal", ayahs: 75 },
            9: { name: "At-Taubah", ayahs: 93 }
        }
    },
    11: {
        name: "Juz 11",
        surahs: {
            9: { name: "At-Taubah", ayahs: 129 },
            10: { name: "Yunus", ayahs: 109 },
            11: { name: "Hud", ayahs: 5 }
        }
    },
    12: {
        name: "Juz 12",
        surahs: {
            11: { name: "Hud", ayahs: 123 },
            12: { name: "Yusuf", ayahs: 52 }
        }
    },
    13: {
        name: "Juz 13",
        surahs: {
            12: { name: "Yusuf", ayahs: 111 },
            13: { name: "Ar-Ra'd", ayahs: 43 },
            14: { name: "Ibrahim", ayahs: 52 }
        }
    },
    14: {
        name: "Juz 14",
        surahs: {
            15: { name: "Al-Hijr", ayahs: 99 },
            16: { name: "An-Nahl", ayahs: 128 }
        }
    },
    15: {
        name: "Juz 15",
        surahs: {
            17: { name: "Al-Isra", ayahs: 111 },
            18: { name: "Al-Kahf", ayahs: 74 }
        }
    },
    16: {
        name: "Juz 16",
        surahs: {
            18: { name: "Al-Kahf", ayahs: 110 },
            19: { name: "Maryam", ayahs: 98 },
            20: { name: "Taha", ayahs: 135 }
        }
    },
    17: {
        name: "Juz 17",
        surahs: {
            21: { name: "Al-Anbiya", ayahs: 112 },
            22: { name: "Al-Hajj", ayahs: 78 }
        }
    },
    18: {
        name: "Juz 18",
        surahs: {
            23: { name: "Al-Mu'minun", ayahs: 118 },
            24: { name: "An-Nur", ayahs: 64 },
            25: { name: "Al-Furqan", ayahs: 20 }
        }
    },
    19: {
        name: "Juz 19",
        surahs: {
            25: { name: "Al-Furqan", ayahs: 77 },
            26: { name: "Ash-Shu'ara", ayahs: 227 },
            27: { name: "An-Naml", ayahs: 55 }
        }
    },
    20: {
        name: "Juz 20",
        surahs: {
            27: { name: "An-Naml", ayahs: 93 },
            28: { name: "Al-Qasas", ayahs: 88 },
            29: { name: "Al-Ankabut", ayahs: 45 }
        }
    },
    21: {
        name: "Juz 21",
        surahs: {
            29: { name: "Al-Ankabut", ayahs: 69 },
            30: { name: "Ar-Rum", ayahs: 60 },
            31: { name: "Luqman", ayahs: 34 },
            32: { name: "As-Sajdah", ayahs: 30 },
            33: { name: "Al-Ahzab", ayahs: 30 }
        }
    },
    22: {
        name: "Juz 22",
        surahs: {
            33: { name: "Al-Ahzab", ayahs: 73 },
            34: { name: "Saba", ayahs: 54 },
            35: { name: "Fatir", ayahs: 45 },
            36: { name: "Ya-Sin", ayahs: 21 }
        }
    },
    23: {
        name: "Juz 23",
        surahs: {
            36: { name: "Ya-Sin", ayahs: 83 },
            37: { name: "As-Saffat", ayahs: 182 },
            38: { name: "Sad", ayahs: 88 },
            39: { name: "Az-Zumar", ayahs: 31 }
        }
    },
    24: {
        name: "Juz 24",
        surahs: {
            39: { name: "Az-Zumar", ayahs: 75 },
            40: { name: "Ghafir", ayahs: 85 },
            41: { name: "Fussilat", ayahs: 46 }
        }
    },
    25: {
        name: "Juz 25",
        surahs: {
            41: { name: "Fussilat", ayahs: 54 },
            42: { name: "Ash-Shura", ayahs: 53 },
            43: { name: "Az-Zukhruf", ayahs: 89 },
            44: { name: "Ad-Dukhan", ayahs: 59 },
            45: { name: "Al-Jathiyah", ayahs: 37 }
        }
    },
    26: {
        name: "Juz 26",
        surahs: {
            46: { name: "Al-Ahqaf", ayahs: 35 },
            47: { name: "Muhammad", ayahs: 38 },
            48: { name: "Al-Fath", ayahs: 29 },
            49: { name: "Al-Hujurat", ayahs: 18 },
            50: { name: "Qaf", ayahs: 45 },
            51: { name: "Adh-Dhariyat", ayahs: 60 }
        }
    },
    27: {
        name: "Juz 27",
        surahs: {
            52: { name: "At-Tur", ayahs: 49 },
            53: { name: "An-Najm", ayahs: 62 },
            54: { name: "Al-Qamar", ayahs: 55 },
            55: { name: "Ar-Rahman", ayahs: 78 },
            56: { name: "Al-Waqi'ah", ayahs: 96 },
            57: { name: "Al-Hadid", ayahs: 29 }
        }
    },
    28: {
        name: "Juz 28",
        surahs: {
            58: { name: "Al-Mujadilah", ayahs: 22 },
            59: { name: "Al-Hashr", ayahs: 24 },
            60: { name: "Al-Mumtahanah", ayahs: 13 },
            61: { name: "As-Saff", ayahs: 14 },
            62: { name: "Al-Jumu'ah", ayahs: 11 },
            63: { name: "Al-Munafiqun", ayahs: 11 },
            64: { name: "At-Taghabun", ayahs: 18 },
            65: { name: "At-Talaq", ayahs: 12 },
            66: { name: "At-Tahrim", ayahs: 12 }
        }
    },
    29: {
        name: "Juz 29",
        surahs: {
            67: { name: "Al-Mulk", ayahs: 30 },
            68: { name: "Al-Qalam", ayahs: 52 },
            69: { name: "Al-Haqqah", ayahs: 52 },
            70: { name: "Al-Ma'arij", ayahs: 44 },
            71: { name: "Nuh", ayahs: 28 },
            72: { name: "Al-Jinn", ayahs: 28 },
            73: { name: "Al-Muzzammil", ayahs: 20 },
            74: { name: "Al-Muddaththir", ayahs: 56 },
            75: { name: "Al-Qiyamah", ayahs: 40 },
            76: { name: "Al-Insan", ayahs: 31 },
            77: { name: "Al-Mursalat", ayahs: 50 }
        }
    },
    30: {
        name: "Juz 30",
        surahs: {
            78: { name: "An-Naba", ayahs: 40 },
            79: { name: "An-Nazi'at", ayahs: 46 },
            80: { name: "Abasa", ayahs: 42 },
            81: { name: "At-Takwir", ayahs: 29 },
            82: { name: "Al-Infitar", ayahs: 19 },
            83: { name: "Al-Mutaffifin", ayahs: 36 },
            84: { name: "Al-Inshiqaq", ayahs: 25 },
            85: { name: "Al-Buruj", ayahs: 22 },
            86: { name: "At-Tariq", ayahs: 17 },
            87: { name: "Al-A'la", ayahs: 19 },
            88: { name: "Al-Ghashiyah", ayahs: 26 },
            89: { name: "Al-Fajr", ayahs: 30 },
            90: { name: "Al-Balad", ayahs: 20 },
            91: { name: "Ash-Shams", ayahs: 15 },
            92: { name: "Al-Layl", ayahs: 21 },
            93: { name: "Ad-Duha", ayahs: 11 },
            94: { name: "Ash-Sharh", ayahs: 8 },
            95: { name: "At-Tin", ayahs: 8 },
            96: { name: "Al-Alaq", ayahs: 19 },
            97: { name: "Al-Qadr", ayahs: 5 },
            98: { name: "Al-Bayyinah", ayahs: 8 },
            99: { name: "Az-Zalzalah", ayahs: 8 },
            100: { name: "Al-Adiyat", ayahs: 11 },
            101: { name: "Al-Qari'ah", ayahs: 11 },
            102: { name: "At-Takathur", ayahs: 8 },
            103: { name: "Al-Asr", ayahs: 3 },
            104: { name: "Al-Humazah", ayahs: 9 },
            105: { name: "Al-Fil", ayahs: 5 },
            106: { name: "Quraish", ayahs: 4 },
            107: { name: "Al-Ma'un", ayahs: 7 },
            108: { name: "Al-Kawthar", ayahs: 3 },
            109: { name: "Al-Kafirun", ayahs: 6 },
            110: { name: "An-Nasr", ayahs: 3 },
            111: { name: "Al-Masad", ayahs: 5 },
            112: { name: "Al-Ikhlas", ayahs: 4 },
            113: { name: "Al-Falaq", ayahs: 5 },
            114: { name: "An-Nas", ayahs: 6 }
        }
    }
};

// Initialize app on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    updateCurrentDate();
    loadMasterData();
    setupEventListeners();
});

// API Helper functions
async function apiRequest(url, options = {}) {
    try {
        showLoading();
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        const data = await response.json();
        hideLoading();
        
        if (!data.success) {
            throw new Error(data.message || 'API request failed');
        }
        
        return data;
    } catch (error) {
        hideLoading();
        showNotification(error.message, 'error');
        throw error;
    }
}

// Loading functions
function showLoading() {
    // You can add a global loading indicator here
    document.body.style.cursor = 'wait';
}

function hideLoading() {
    document.body.style.cursor = 'default';
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Authentication functions
async function loginAdmin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    if (!username || !password) {
        showNotification('Username dan password harus diisi', 'error');
        return;
    }
    
    try {
        const data = await apiRequest('api/auth.php', {
            method: 'POST',
            body: JSON.stringify({
                action: 'login_admin',
                username,
                password
            })
        });
        
        currentUser = data.user;
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        document.getElementById('userInfo').textContent = `Admin - ${currentUser.name}`;
        document.getElementById('kelolaBtn').classList.remove('hidden');
        document.getElementById('addHafalanBtn').classList.remove('hidden');
        
        // Show admin-specific elements
        document.getElementById('adminAbsensi').classList.remove('hidden');
        document.getElementById('allAttendanceHistory').classList.remove('hidden');
        document.getElementById('parentAbsensi').classList.add('hidden');
        
        showPage('dashboard', document.querySelector('.nav-btn'));
        showNotification('Login berhasil!', 'success');
    } catch (error) {
        // Error already handled in apiRequest
    }
}

async function loginParent() {
    const email = document.querySelector('#parentLoginForm input[type="email"]').value;
    const password = document.querySelector('#parentLoginForm input[type="password"]').value;
    
    if (!email || !password) {
        showNotification('Email dan password harus diisi', 'error');
        return;
    }
    
    try {
        const data = await apiRequest('api/auth.php', {
            method: 'POST',
            body: JSON.stringify({
                action: 'login_parent',
                email,
                password
            })
        });
        
        currentUser = data.user;
        document.getElementById('parentLoginForm').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        document.getElementById('userInfo').textContent = `Orang Tua - ${currentUser.name}`;
        document.getElementById('kelolaBtn').classList.add('hidden');
        document.getElementById('addHafalanBtn').classList.add('hidden');
        
        // Show parent-specific elements
        document.getElementById('adminAbsensi').classList.add('hidden');
        document.getElementById('attendanceList').classList.add('hidden');
        document.getElementById('allAttendanceHistory').classList.add('hidden');
        document.getElementById('parentAbsensi').classList.remove('hidden');
        
        showPage('dashboard', document.querySelector('.nav-btn'));
        showNotification('Login berhasil!', 'success');
    } catch (error) {
        // Error already handled in apiRequest
    }
}

async function registerParent() {
    const name = document.querySelector('#registerForm input[type="text"]').value;
    const email = document.querySelector('#registerForm input[type="email"]').value;
    const password = document.querySelector('#registerForm input[type="password"]').value;
    const studentSelect = document.querySelector('#registerForm select');
    const student_id = studentSelect.value;
    
    if (!name || !email || !password) {
        showNotification('Semua field harus diisi', 'error');
        return;
    }
    
    try {
        await apiRequest('api/auth.php', {
            method: 'POST',
            body: JSON.stringify({
                action: 'register_parent',
                name,
                email,
                password,
                student_id
            })
        });
        
        showNotification('Pendaftaran berhasil! Silakan login.', 'success');
        showParentLogin();
    } catch (error) {
        // Error already handled in apiRequest
    }
}

async function logout() {
    try {
        await apiRequest('api/auth.php', {
            method: 'POST',
            body: JSON.stringify({ action: 'logout' })
        });
        
        currentUser = null;
        document.getElementById('mainApp').classList.add('hidden');
        document.getElementById('loginScreen').classList.remove('hidden');
        document.getElementById('adminLoginForm').classList.add('hidden');
        document.getElementById('parentLoginForm').classList.add('hidden');
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('loginOptions').classList.remove('hidden');
        
        showPage('dashboard', document.querySelector('.nav-btn'));
        showNotification('Logout berhasil', 'success');
    } catch (error) {
        // Error already handled in apiRequest
    }
}

// Navigation functions
function showAdminLogin() {
    document.getElementById('loginOptions').classList.add('hidden');
    document.getElementById('adminLoginForm').classList.remove('hidden');
}

function showParentLogin() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('parentLoginForm').classList.remove('hidden');
}

function backToLoginOptions() {
    document.getElementById('adminLoginForm').classList.add('hidden');
    document.getElementById('parentLoginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginOptions').classList.remove('hidden');
}

function showRegister() {
    document.getElementById('parentLoginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
    loadStudentsForRegistration();
}

function backToLogin() {
    document.getElementById('parentLoginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('loginOptions').classList.remove('hidden');
}

// Load students for parent registration
async function loadStudentsForRegistration() {
    try {
        const data = await apiRequest('api/students.php');
        const select = document.querySelector('#registerForm select');
        select.innerHTML = '<option value="">Pilih santri...</option>';
        
        data.data.forEach(student => {
            if (!student.parent_id) { // Only show students without parents
                const option = document.createElement('option');
                option.value = student.id;
                option.textContent = student.name;
                select.appendChild(option);
            }
        });
    } catch (error) {
        // Error already handled in apiRequest
    }
}

// Master data management
async function loadMasterData() {
    try {
        const data = await apiRequest('api/master-data.php?type=all');
        masterData = data.data;
        populateDropdowns();
    } catch (error) {
        console.error('Failed to load master data:', error);
    }
}

function populateDropdowns() {
    // Populate class dropdowns
    const classSelects = document.querySelectorAll('#addSantriKelas, #editKelas');
    classSelects.forEach(select => {
        if (select) {
            select.innerHTML = '<option value="">Pilih kelas...</option>';
            masterData.classes?.forEach(cls => {
                const option = document.createElement('option');
                option.value = cls.id;
                option.textContent = `Kelas ${cls.name}`;
                select.appendChild(option);
            });
        }
    });
    
    // Populate group dropdowns
    const groupSelects = document.querySelectorAll('#addSantriKelompok, #editKelompok, #groupFilterHafalan, #groupFilterAbsensi');
    groupSelects.forEach(select => {
        if (select) {
            if (select.id.includes('Filter')) {
                select.innerHTML = '<option value="all">Semua Kelompok</option>';
            } else {
                select.innerHTML = '<option value="">Pilih kelompok...</option>';
            }
            
            masterData.groups?.forEach(group => {
                const option = document.createElement('option');
                option.value = group.id;
                option.textContent = `Kelompok ${group.name}`;
                select.appendChild(option);
            });
        }
    });
    
    // Populate target dropdowns
    const targetSelects = document.querySelectorAll('#addSantriTarget, #editTarget');
    targetSelects.forEach(select => {
        if (select) {
            select.innerHTML = '<option value="">Pilih target...</option>';
            masterData.targets?.forEach(target => {
                const option = document.createElement('option');
                option.value = target.id;
                option.textContent = target.name;
                select.appendChild(option);
            });
        }
    });
}

// Page navigation
function showPage(page, clickedButton) {
    // Hide all main content pages
    document.querySelectorAll('#dashboard, #hafalan, #absensi, #kelolaData, #addHafalanForm').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Show the selected page
    document.getElementById(page).classList.remove('hidden');
    
    // Update navigation button styles
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-green-600', 'text-blue-600', 'text-purple-600', 'text-orange-600');
        btn.classList.add('text-gray-600');
        
        const iconDiv = btn.querySelector('div');
        iconDiv.classList.remove('bg-green-100', 'bg-blue-100', 'bg-purple-100', 'bg-orange-100');
        iconDiv.classList.add('bg-gray-100');
        
        const indicator = btn.querySelector('.absolute');
        if (indicator) indicator.style.display = 'none';
    });
    
    // Set active button style
    const iconDiv = clickedButton.querySelector('div');
    const indicator = clickedButton.querySelector('.absolute');
    
    if (page === 'dashboard') {
        clickedButton.classList.remove('text-gray-600');
        clickedButton.classList.add('text-green-600');
        iconDiv.classList.remove('bg-gray-100');
        iconDiv.classList.add('bg-green-100');
        if (indicator) indicator.style.display = 'block';
    } else if (page === 'hafalan') {
        clickedButton.classList.remove('text-gray-600');
        clickedButton.classList.add('text-blue-600');
        iconDiv.classList.remove('bg-gray-100');
        iconDiv.classList.add('bg-blue-100');
    } else if (page === 'absensi') {
        clickedButton.classList.remove('text-gray-600');
        clickedButton.classList.add('text-purple-600');
        iconDiv.classList.remove('bg-gray-100');
        iconDiv.classList.add('bg-purple-100');
    } else if (page === 'kelolaData') {
        clickedButton.classList.remove('text-gray-600');
        clickedButton.classList.add('text-orange-600');
        iconDiv.classList.remove('bg-gray-100');
        iconDiv.classList.add('bg-orange-100');
    }
    
    currentPage = page;
    
    // Page-specific initializations
    if (page === 'dashboard') {
        updateDashboard();
    } else if (page === 'hafalan') {
        loadStudents();
        populateJuzSelect('juzSelect');
    } else if (page === 'absensi') {
        initializeAbsensiPage();
    } else if (page === 'kelolaData') {
        // Kelola data initializations handled by showDataForm
    }
}

// Dashboard functions
async function updateDashboard() {
    try {
        const data = await apiRequest('api/dashboard.php');
        const dashboardData = data.data;
        
        // Update active students count
        document.getElementById('activeStudentsCount').textContent = dashboardData.active_students_count;
        
        // Update top memorizer
        if (dashboardData.top_memorizer) {
            const topMemorizer = dashboardData.top_memorizer;
            document.getElementById('topMemorizerInitials').textContent = topMemorizer.name.substring(0, 2).toUpperCase();
            document.getElementById('topMemorizerName').textContent = topMemorizer.name;
            document.getElementById('topMemorizerProgressText').textContent = `${topMemorizer.current_juz} Juz (${topMemorizer.progress}%)`;
            document.getElementById('topMemorizerProgressBar').style.width = `${topMemorizer.progress}%`;
        }
        
        // Update recent activities
        const recentActivityList = document.getElementById('recentActivityList');
        recentActivityList.innerHTML = '';
        
        if (dashboardData.recent_activities && dashboardData.recent_activities.length > 0) {
            dashboardData.recent_activities.forEach(activity => {
                const activityItem = createActivityItem(activity);
                recentActivityList.insertAdjacentHTML('beforeend', activityItem);
            });
        } else {
            recentActivityList.innerHTML = '<p class="text-center text-gray-500">Belum ada aktivitas terbaru.</p>';
        }
        
    } catch (error) {
        console.error('Failed to update dashboard:', error);
    }
}

function createActivityItem(activity) {
    let activityBgClass = '';
    let activityBorderClass = '';
    let activityIconClass = '';
    let activityGradientClass = '';
    let activityTypeText = '';
    let activityStatusDisplay = '';

    if (activity.status === 'hadir') {
        activityBgClass = 'bg-green-50';
        activityBorderClass = 'border-green-100';
        activityIconClass = 'fas fa-check text-white';
        activityGradientClass = 'gradient-green';
        activityTypeText = 'Kehadiran';
        activityStatusDisplay = 'hadir tahfidz';
    } else if (activity.status === 'tidak') {
        activityBgClass = 'bg-red-50';
        activityBorderClass = 'border-red-100';
        activityIconClass = 'fas fa-times text-white';
        activityGradientClass = 'bg-red-500';
        activityTypeText = 'Tidak Hadir';
        activityStatusDisplay = 'tidak hadir';
    } else if (activity.status === 'belum-setor') {
        activityBgClass = 'bg-yellow-50';
        activityBorderClass = 'border-yellow-100';
        activityIconClass = 'fas fa-hourglass-half text-white';
        activityGradientClass = 'bg-yellow-500';
        activityTypeText = 'Belum Setor';
        activityStatusDisplay = 'belum setor';
    }

    let detailText = activity.juz ? 
        `Hafalan: Juz ${activity.juz} - ${activity.surah} ayat ${activity.ayat_start}-${activity.ayat_end}` : 
        `Sesi ${activity.session_name} - Kelompok ${activity.group_name}`;
    
    if (activity.status === 'hadir' && activity.time_status === 'terlambat') {
        detailText += ' (Terlambat)';
    } else if (activity.status === 'hadir' && activity.time_status === 'tepat-waktu') {
        detailText += ' (Tepat Waktu)';
    }

    const timeAgo = getTimeAgo(activity.created_at);

    return `
        <div class="flex items-center space-x-4 p-4 ${activityBgClass} rounded-2xl ${activityBorderClass} hover-lift">
            <div class="${activityGradientClass} w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg">
                <i class="${activityIconClass}"></i>
            </div>
            <div class="flex-1">
                <p class="font-semibold text-gray-800">${activity.student_name} ${activityStatusDisplay}</p>
                <p class="text-sm text-gray-600">${detailText}</p>
                <div class="flex items-center mt-1">
                    <div class="${activityBgClass} text-${activityBgClass.split('-')[1]}-700 px-2 py-1 rounded-full text-xs font-medium">
                        ${activityTypeText}
                    </div>
                </div>
            </div>
            <div class="text-right">
                <span class="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">${timeAgo}</span>
            </div>
        </div>
    `;
}

function getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " tahun lalu";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " bulan lalu";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " hari lalu";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " jam lalu";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " menit lalu";
    return Math.floor(seconds) + " detik lalu";
}

// Students management
async function loadStudents() {
    try {
        const data = await apiRequest('api/students.php');
        renderStudentList(data.data);
        populateStudentSelects(data.data);
    } catch (error) {
        console.error('Failed to load students:', error);
    }
}

function renderStudentList(students) {
    const studentListDiv = document.getElementById('studentList');
    studentListDiv.innerHTML = '';
    
    students.forEach(student => {
        const studentCard = createStudentCard(student);
        studentListDiv.insertAdjacentHTML('beforeend', studentCard);
    });
    
    applyFilters();
}

function createStudentCard(student) {
    const genderColor = student.gender === 'santriwan' ? 'blue' : 'pink';
    const genderIcon = student.gender === 'santriwan' ? 'male' : 'female';
    const genderText = student.gender === 'santriwan' ? 'Santriwan' : 'Santriwati';
    
    let editDeleteButtons = '';
    if (currentUser && currentUser.type === 'admin') {
        editDeleteButtons = `
            <div class="absolute top-4 right-4 flex space-x-2">
                <button onclick="editStudent(${student.id})" class="text-blue-600 hover:text-blue-800 transition-colors">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteStudent(${student.id})" class="text-red-600 hover:text-red-800 transition-colors">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }

    return `
        <div class="student-card bg-white rounded-xl p-4 shadow-sm border border-gray-100 relative" data-gender="${student.gender}" data-group="${student.group_name || ''}" data-name="${student.name}" data-id="${student.id}">
            ${editDeleteButtons}
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                    <div class="bg-${genderColor}-100 w-12 h-12 rounded-full flex items-center justify-center">
                        <span class="font-bold text-${genderColor}-600">${student.name.substring(0,2).toUpperCase()}</span>
                    </div>
                    <div>
                        <h3 class="font-bold text-gray-800">${student.name}</h3>
                        <div class="flex items-center space-x-2 text-sm text-gray-600">
                            <span>Kelompok ${student.group_name || 'N/A'}</span>
                            <span class="bg-${genderColor}-100 text-${genderColor}-700 px-2 py-1 rounded-full text-xs font-medium">
                                <i class="fas fa-${genderIcon} mr-1"></i>${genderText}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="text-right">
                    <p class="font-bold text-green-600">${student.current_juz} Juz</p>
                    <p class="text-sm text-gray-600">${student.progress}%</p>
                </div>
            </div>
            <div class="mb-3">
                <div class="flex justify-between text-sm mb-1">
                    <span>Progress Hafalan</span>
                    <span>${student.current_juz}/${student.target_juz_count || 30} Juz</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-green-500 h-2 rounded-full progress-bar" style="width: ${student.progress}%"></div>
                </div>
            </div>
            <div class="text-sm text-gray-600">
                <p><strong>Terakhir:</strong> ${student.current_ayat || 'Belum ada hafalan'}</p>
                <p><strong>Target:</strong> ${student.target_name || 'Belum ditentukan'}</p>
            </div>
        </div>
    `;
}

function populateStudentSelects(students) {
    const selects = document.querySelectorAll('#santriSelectHafalan');
    selects.forEach(select => {
        if (select) {
            select.innerHTML = '<option value="">Pilih santri...</option>';
            students.forEach(student => {
                const option = document.createElement('option');
                option.value = student.id;
                option.textContent = student.name;
                select.appendChild(option);
            });
        }
    });
}

// Filtering functions
function filterGender(gender, clickedButton) {
    currentGenderFilter = gender;
    applyFilters();
    
    document.querySelectorAll('.gender-filter-btn').forEach(btn => {
        btn.classList.remove('bg-green-600', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
    });
    
    clickedButton.classList.remove('bg-gray-200', 'text-gray-700');
    clickedButton.classList.add('bg-green-600', 'text-white');
}

function filterGroup(group) {
    currentGroupFilter = group;
    applyFilters();
}

function applyFilters() {
    const studentCards = document.querySelectorAll('.student-card');
    
    studentCards.forEach(card => {
        const cardGender = card.getAttribute('data-gender');
        const cardGroup = card.getAttribute('data-group');
        
        const genderMatch = currentGenderFilter === 'all' || cardGender === currentGenderFilter;
        const groupMatch = currentGroupFilter === 'all' || cardGroup.includes(currentGroupFilter);
        
        card.style.display = (genderMatch && groupMatch) ? 'block' : 'none';
    });
}

// Memorization functions
function populateJuzSelect(selectId) {
    const juzSelect = document.getElementById(selectId);
    if (!juzSelect) return;
    
    juzSelect.innerHTML = '<option value="">Pilih Juz...</option>';
    for (let i = 1; i <= 30; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = quranData[i].name;
        juzSelect.appendChild(option);
    }
}

function updateSurah() {
    const juzSelect = document.getElementById('juzSelect');
    const surahSelect = document.getElementById('surahSelect');
    const selectedJuz = juzSelect.value;
    
    surahSelect.innerHTML = '<option value="">Pilih Surah...</option>';
    
    if (selectedJuz && quranData[selectedJuz]) {
        const surahs = quranData[selectedJuz].surahs;
        for (const [id, surah] of Object.entries(surahs)) {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = surah.name;
            surahSelect.appendChild(option);
        }
    }
    updateAyah();
}

function updateAyah() {
    const juzSelect = document.getElementById('juzSelect');
    const surahSelect = document.getElementById('surahSelect');
    const ayatMulai = document.getElementById('ayatMulai');
    const ayatSelesai = document.getElementById('ayatSelesai');
    
    ayatMulai.innerHTML = '<option value="">Pilih ayat...</option>';
    ayatSelesai.innerHTML = '<option value="">Pilih ayat...</option>';
    
    const selectedJuz = juzSelect.value;
    const selectedSurah = surahSelect.value;
    
    if (selectedJuz && selectedSurah && quranData[selectedJuz] && quranData[selectedJuz].surahs[selectedSurah]) {
        const totalAyahs = quranData[selectedJuz].surahs[selectedSurah].ayahs;
        
        for (let i = 1; i <= totalAyahs; i++) {
            const option1 = document.createElement('option');
            option1.value = i;
            option1.textContent = i;
            ayatMulai.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = i;
            option2.textContent = i;
            ayatSelesai.appendChild(option2);
        }
    }
}

function showAddHafalan() {
    document.getElementById('hafalan').classList.add('hidden');
    document.getElementById('addHafalanForm').classList.remove('hidden');
    populateJuzSelect('juzSelect');
    loadStudents();
}

function hideAddHafalan() {
    document.getElementById('addHafalanForm').classList.add('hidden');
    document.getElementById('hafalan').classList.remove('hidden');
}

async function saveHafalan() {
    const studentId = document.getElementById('santriSelectHafalan').value;
    const juz = document.getElementById('juzSelect').value;
    const surahId = document.getElementById('surahSelect').value;
    const ayatMulai = document.getElementById('ayatMulai').value;
    const ayatSelesai = document.getElementById('ayatSelesai').value;
    const jenisHafalan = document.getElementById('jenisHafalan').value;
    const kualitas = document.querySelector('#addHafalanForm select:nth-of-type(5)').value;
    const catatan = document.querySelector('#addHafalanForm textarea').value;

    if (!studentId || !juz || !surahId || !ayatMulai || !ayatSelesai || !jenisHafalan || !kualitas) {
        showNotification('Mohon lengkapi semua field yang diperlukan', 'error');
        return;
    }

    try {
        await apiRequest('api/memorizations.php', {
            method: 'POST',
            body: JSON.stringify({
                student_id: studentId,
                juz: parseInt(juz),
                surah: quranData[juz].surahs[surahId].name,
                surah_id: parseInt(surahId),
                ayat_start: parseInt(ayatMulai),
                ayat_end: parseInt(ayatSelesai),
                type: jenisHafalan,
                quality: kualitas,
                notes: catatan
            })
        });

        showNotification('Hafalan berhasil disimpan!', 'success');
        hideAddHafalan();
        loadStudents();
        updateDashboard();
    } catch (error) {
        // Error already handled in apiRequest
    }
}

// Attendance functions
function initializeAbsensiPage() {
    if (currentUser && currentUser.type === 'admin') {
        document.getElementById('adminAbsensi').classList.remove('hidden');
        document.getElementById('parentAbsensi').classList.add('hidden');
        document.getElementById('allAttendanceHistory').classList.remove('hidden');
        document.getElementById('attendanceList').classList.add('hidden');
        renderSessionButtons();
        loadAttendanceHistory('all');
    } else if (currentUser && currentUser.type === 'parent') {
        document.getElementById('adminAbsensi').classList.add('hidden');
        document.getElementById('attendanceList').classList.add('hidden');
        document.getElementById('allAttendanceHistory').classList.add('hidden');
        document.getElementById('parentAbsensi').classList.remove('hidden');
        document.getElementById('parentChildName').textContent = currentUser.child_name;
        loadAttendanceHistory(currentUser.child_id);
    }
}

function renderSessionButtons() {
    const container = document.getElementById('sessionButtonsContainer');
    if (!container || !masterData.sessions) return;
    
    container.innerHTML = '';
    
    masterData.sessions.forEach((session, index) => {
        const button = document.createElement('button');
        button.textContent = session.name;
        button.onclick = () => selectSession(session.id, session.name, button);
        
        let iconClass = '';
        let bgColorClass = 'bg-gray-100 text-gray-700';
        
        if (session.name.toLowerCase().includes('pagi')) {
            iconClass = 'fas fa-sun mr-2';
            if (index === 0) bgColorClass = 'bg-blue-600 text-white active-session-btn';
        } else if (session.name.toLowerCase().includes('sore')) {
            iconClass = 'fas fa-moon mr-2';
        } else {
            iconClass = 'fas fa-calendar-alt mr-2';
        }
        
        button.className = `session-btn ${bgColorClass} py-3 rounded-lg font-medium hover:bg-opacity-80 transition-colors`;
        button.innerHTML = `<i class="${iconClass}"></i>${session.name}`;
        container.appendChild(button);
    });
}

function selectSession(sessionId, sessionName, clickedButton) {
    document.getElementById('selectedSession').textContent = sessionName;
    document.getElementById('attendanceList').classList.remove('hidden');
    
    // Update session button styles
    document.querySelectorAll('.session-btn').forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white', 'bg-orange-600', 'bg-gray-600', 'active-session-btn');
        btn.classList.add('bg-gray-100', 'text-gray-700');
    });
    
    clickedButton.classList.remove('bg-gray-100', 'text-gray-700');
    if (sessionName.toLowerCase().includes('pagi')) {
        clickedButton.classList.add('bg-blue-600', 'text-white');
    } else if (sessionName.toLowerCase().includes('sore')) {
        clickedButton.classList.add('bg-orange-600', 'text-white');
    } else {
        clickedButton.classList.add('bg-gray-600', 'text-white');
    }
    clickedButton.classList.add('active-session-btn');
    
    // Store selected session ID
    clickedButton.dataset.sessionId = sessionId;
    
    renderAttendanceStudentList();
}

async function renderAttendanceStudentList() {
    try {
        const data = await apiRequest('api/students.php');
        const students = data.data;
        
        const attendanceStudentListDiv = document.getElementById('attendanceStudentList');
        attendanceStudentListDiv.innerHTML = '';
        
        // Filter students by group if filter is applied
        const filteredStudents = students.filter(student => {
            return currentAbsensiGroupFilter === 'all' || student.group_id == currentAbsensiGroupFilter;
        });
        
        // Group students by their group
        const studentsByGroup = filteredStudents.reduce((acc, student) => {
            const groupName = student.group_name || 'N/A';
            if (!acc[groupName]) {
                acc[groupName] = [];
            }
            acc[groupName].push(student);
            return acc;
        }, {});
        
        Object.keys(studentsByGroup).sort().forEach(groupName => {
            const groupHeader = `
                <div class="bg-gray-200 text-gray-800 font-bold px-4 py-2 rounded-lg mt-4 mb-2">
                    Kelompok ${groupName}
                </div>
            `;
            attendanceStudentListDiv.insertAdjacentHTML('beforeend', groupHeader);
            
            studentsByGroup[groupName].forEach(student => {
                const studentBlock = createStudentAttendanceBlock(student);
                attendanceStudentListDiv.insertAdjacentHTML('beforeend', studentBlock);
            });
        });
        
        // Populate Juz dropdowns for all hafalan records
        document.querySelectorAll('.juz-select-absensi').forEach(selectElement => {
            populateJuzSelectForAttendance(selectElement);
        });
        
    } catch (error) {
        console.error('Failed to load students for attendance:', error);
    }
}

function createStudentAttendanceBlock(student) {
    const initials = student.name.substring(0,2).toUpperCase();
    const genderColor = student.gender === 'santriwan' ? 'blue' : 'pink';

    return `
        <div class="p-3 bg-gray-50 rounded-lg" data-name="${student.name}" data-group="${student.group_name}" data-student-id="${student.id}" data-attendance-status="" data-time-status="">
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                    <div class="bg-${genderColor}-100 w-10 h-10 rounded-full flex items-center justify-center">
                        <span class="font-bold text-${genderColor}-600 text-sm">${initials}</span>
                    </div>
                    <div>
                        <p class="font-medium text-gray-800">${student.name}</p>
                        <p class="text-sm text-gray-600">Kelompok ${student.group_name || 'N/A'}</p>
                    </div>
                </div>
                <div class="flex space-x-2">
                    <button onclick="markAttendance(this, 'hadir')" class="attendance-btn bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-700">
                        Hadir
                    </button>
                    <button onclick="markAttendance(this, 'tidak')" class="attendance-btn bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-700">
                        Tidak Hadir
                    </button>
                    <button onclick="markAttendance(this, 'belum-setor')" class="attendance-btn bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-yellow-700">
                        Belum Setor
                    </button>
                </div>
            </div>
            <!-- Time Status Section -->
            <div class="time-status-section hidden mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <h5 class="font-medium text-gray-800 mb-2">Keterangan Waktu</h5>
                <div class="flex space-x-4">
                    <label class="inline-flex items-center">
                        <input type="radio" name="time_status_${student.id}" value="tepat-waktu" class="form-radio text-blue-600" checked onchange="updateTimeStatus(this, '${student.id}')">
                        <span class="ml-2 text-gray-700 text-sm">Tepat Waktu</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="radio" name="time_status_${student.id}" value="terlambat" class="form-radio text-red-600" onchange="updateTimeStatus(this, '${student.id}')">
                        <span class="ml-2 text-gray-700 text-sm">Terlambat</span>
                    </label>
                </div>
            </div>
            <!-- Hafalan Record Section -->
            <div class="hafalan-record hidden mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h5 class="font-medium text-gray-800 mb-2">Pencatatan Hafalan</h5>
                <div class="grid grid-cols-2 gap-2 mb-2">
                    <div>
                        <label class="block text-gray-700 text-xs font-medium mb-1">Juz</label>
                        <select class="juz-select-absensi w-full px-2 py-1 border border-gray-300 rounded text-sm" onchange="updateSurahAbsensi(this)">
                            <option value="">Pilih Juz...</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-700 text-xs font-medium mb-1">Surah</label>
                        <select class="surah-select-absensi w-full px-2 py-1 border border-gray-300 rounded text-sm" onchange="updateAyatAbsensi(this)">
                            <option value="">Pilih Surah...</option>
                        </select>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-2 mb-2">
                    <div>
                        <label class="block text-gray-700 text-xs font-medium mb-1">Ayat Mulai</label>
                        <input type="number" placeholder="Ayat mulai" class="ayat-mulai-absensi w-full px-2 py-1 border border-gray-300 rounded text-sm">
                    </div>
                    <div>
                        <label class="block text-gray-700 text-xs font-medium mb-1">Ayat Selesai</label>
                        <input type="number" placeholder="Ayat selesai" class="ayat-selesai-absensi w-full px-2 py-1 border border-gray-300 rounded text-sm">
                    </div>
                </div>
                <div>
                    <label class="block text-gray-700 text-xs font-medium mb-1">Jenis Hafalan</label>
                    <select class="jenis-hafalan-absensi w-full px-2 py-1 border border-gray-300 rounded text-sm mb-2">
                        <option value="">Pilih jenis hafalan...</option>
                        <option value="Hafalan Baru">Hafalan Baru</option>
                        <option value="Muroja'ah">Muroja'ah</option>
                        <option value="Perbaikan">Perbaikan</option>
                    </select>
                </div>
                <div>
                    <label class="block text-gray-700 text-xs font-medium mb-1">Kualitas Hafalan</label>
                    <select class="kualitas-hafalan-absensi w-full px-2 py-1 border border-gray-300 rounded text-sm mb-2">
                        <option>Sangat Baik</option>
                        <option>Baik</option>
                        <option>Cukup</option>
                        <option>Perlu Perbaikan</option>
                    </select>
                </div>
                <div>
                    <label class="block text-gray-700 text-xs font-medium mb-1">Catatan</label>
                    <textarea placeholder="Catatan..." class="catatan-hafalan-absensi w-full px-2 py-1 border border-gray-300 rounded text-sm" rows="2"></textarea>
                </div>
            </div>
        </div>
    `;
}

// Continue with the rest of the JavaScript functions...
// Attendance functions (continued)
function populateJuzSelectForAttendance(selectElement) {
    selectElement.innerHTML = '<option value="">Pilih Juz...</option>';
    for (let i = 1; i <= 30; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = quranData[i].name;
        selectElement.appendChild(option);
    }
}

function updateSurahAbsensi(juzSelectElement) {
    const hafalanRecordDiv = juzSelectElement.closest('.hafalan-record');
    const surahSelect = hafalanRecordDiv.querySelector('.surah-select-absensi');
    const ayatMulai = hafalanRecordDiv.querySelector('.ayat-mulai-absensi');
    const ayatSelesai = hafalanRecordDiv.querySelector('.ayat-selesai-absensi');

    const selectedJuz = juzSelectElement.value;
    
    surahSelect.innerHTML = '<option value="">Pilih Surah...</option>';
    ayatMulai.value = '';
    ayatSelesai.value = '';
    
    if (selectedJuz && quranData[selectedJuz]) {
        const surahs = quranData[selectedJuz].surahs;
        for (const [id, surah] of Object.entries(surahs)) {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = surah.name;
            surahSelect.appendChild(option);
        }
    }
}

function updateAyatAbsensi(surahSelectElement) {
    const hafalanRecordDiv = surahSelectElement.closest('.hafalan-record');
    const juzSelect = hafalanRecordDiv.querySelector('.juz-select-absensi');
    const ayatMulai = hafalanRecordDiv.querySelector('.ayat-mulai-absensi');
    const ayatSelesai = hafalanRecordDiv.querySelector('.ayat-selesai-absensi');
    
    const selectedJuz = juzSelect.value;
    const selectedSurah = surahSelectElement.value;
    
    ayatMulai.value = '';
    ayatSelesai.value = '';
    
    if (selectedJuz && selectedSurah && quranData[selectedJuz] && quranData[selectedJuz].surahs[selectedSurah]) {
        const totalAyahs = quranData[selectedJuz].surahs[selectedSurah].ayahs;
        ayatMulai.setAttribute('max', totalAyahs);
        ayatSelesai.setAttribute('max', totalAyahs);
    }
}

function markAttendance(button, status) {
    const studentBlock = button.closest('.p-3.bg-gray-50.rounded-lg');
    const buttons = studentBlock.querySelectorAll('.attendance-btn');
    const hafalanRecord = studentBlock.querySelector('.hafalan-record');
    const timeStatusSection = studentBlock.querySelector('.time-status-section');
    
    // Reset button styles
    buttons.forEach(btn => {
        btn.classList.remove('bg-green-700', 'bg-red-700', 'bg-yellow-700');
        if (btn.textContent.includes('Hadir')) {
            btn.classList.add('bg-green-600');
        } else if (btn.textContent.includes('Tidak Hadir')) {
            btn.classList.add('bg-red-600');
        } else if (btn.textContent.includes('Belum Setor')) {
            btn.classList.add('bg-yellow-600');
        }
    });
    
    // Apply selected button style and show/hide sections
    if (status === 'hadir') {
        button.classList.remove('bg-green-600');
        button.classList.add('bg-green-700');
        if (hafalanRecord) hafalanRecord.classList.remove('hidden');
        if (timeStatusSection) {
            timeStatusSection.classList.remove('hidden');
            const defaultRadio = timeStatusSection.querySelector('input[value="tepat-waktu"]');
            if (defaultRadio) {
                defaultRadio.checked = true;
                studentBlock.setAttribute('data-time-status', 'tepat-waktu');
            }
        }
    } else {
        if (status === 'tidak') {
            button.classList.remove('bg-red-600');
            button.classList.add('bg-red-700');
        } else if (status === 'belum-setor') {
            button.classList.remove('bg-yellow-600');
            button.classList.add('bg-yellow-700');
        }
        if (hafalanRecord) hafalanRecord.classList.add('hidden');
        if (timeStatusSection) timeStatusSection.classList.add('hidden');
        studentBlock.setAttribute('data-time-status', 'N/A');
    }
    
    studentBlock.setAttribute('data-attendance-status', status);
}

function updateTimeStatus(radioElement, studentId) {
    const studentBlock = radioElement.closest('.p-3.bg-gray-50.rounded-lg');
    if (studentBlock) {
        studentBlock.setAttribute('data-time-status', radioElement.value);
    }
}

function selectGroupAbsensi(groupId) {
    currentAbsensiGroupFilter = groupId;
    renderAttendanceStudentList();
}

async function saveAttendance() {
    const studentBlocks = document.querySelectorAll('#attendanceStudentList > div[data-student-id]');
    const selectedSessionButton = document.querySelector('.active-session-btn');
    const sessionId = selectedSessionButton?.dataset.sessionId;
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    if (!sessionId) {
        showNotification('Pilih sesi terlebih dahulu', 'error');
        return;
    }
    
    const attendanceRecords = [];
    
    studentBlocks.forEach(studentBlock => {
        const studentId = studentBlock.getAttribute('data-student-id');
        const attendanceStatus = studentBlock.getAttribute('data-attendance-status');
        const timeStatus = studentBlock.getAttribute('data-time-status');
        
        if (!attendanceStatus) return; // Skip if no attendance marked
        
        const record = {
            student_id: studentId,
            session_id: sessionId,
            date: currentDate,
            status: attendanceStatus,
            time_status: timeStatus || 'N/A'
        };
        
        // Add memorization data if present and status is 'hadir'
        if (attendanceStatus === 'hadir') {
            const hafalanRecordDiv = studentBlock.querySelector('.hafalan-record');
            const juz = hafalanRecordDiv.querySelector('.juz-select-absensi').value;
            const surahId = hafalanRecordDiv.querySelector('.surah-select-absensi').value;
            const ayatMulai = hafalanRecordDiv.querySelector('.ayat-mulai-absensi').value;
            const ayatSelesai = hafalanRecordDiv.querySelector('.ayat-selesai-absensi').value;
            const jenisHafalan = hafalanRecordDiv.querySelector('.jenis-hafalan-absensi').value;
            const kualitas = hafalanRecordDiv.querySelector('.kualitas-hafalan-absensi').value;
            const catatan = hafalanRecordDiv.querySelector('.catatan-hafalan-absensi').value;
            
            if (juz && surahId && ayatMulai && ayatSelesai && jenisHafalan && kualitas) {
                record.memorization = {
                    juz: parseInt(juz),
                    surah: quranData[juz].surahs[surahId].name,
                    surah_id: parseInt(surahId),
                    ayat_start: parseInt(ayatMulai),
                    ayat_end: parseInt(ayatSelesai),
                    type: jenisHafalan,
                    quality: kualitas,
                    notes: catatan
                };
            }
        }
        
        attendanceRecords.push(record);
    });
    
    if (attendanceRecords.length === 0) {
        showNotification('Tidak ada data absensi untuk disimpan', 'warning');
        return;
    }
    
    try {
        await apiRequest('api/attendance.php', {
            method: 'POST',
            body: JSON.stringify({ attendance_records: attendanceRecords })
        });
        
        showNotification('Absensi dan hafalan berhasil disimpan!', 'success');
        document.getElementById('attendanceList').classList.add('hidden');
        loadAttendanceHistory('all');
        updateDashboard();
        loadStudents();
    } catch (error) {
        // Error already handled in apiRequest
    }
}

async function loadAttendanceHistory(studentId = 'all') {
    try {
        const url = studentId !== 'all' ? `api/attendance.php?student_id=${studentId}` : 'api/attendance.php';
        const data = await apiRequest(url);
        renderAttendanceHistory(data.data, studentId);
    } catch (error) {
        console.error('Failed to load attendance history:', error);
    }
}

function renderAttendanceHistory(attendanceRecords, studentId) {
    const allHistoryListDiv = document.getElementById('allAttendanceHistoryList');
    const parentHistoryListDiv = document.getElementById('attendanceHistoryList');
    
    if (allHistoryListDiv) allHistoryListDiv.innerHTML = '';
    if (parentHistoryListDiv) parentHistoryListDiv.innerHTML = '';
    
    if (!attendanceRecords || attendanceRecords.length === 0) {
        const noRecordsMessage = '<p class="text-center text-gray-500 py-4">Belum ada riwayat kehadiran.</p>';
        if (studentId === 'all' && allHistoryListDiv) {
            allHistoryListDiv.innerHTML = noRecordsMessage;
        } else if (parentHistoryListDiv) {
            parentHistoryListDiv.innerHTML = noRecordsMessage;
        }
        return;
    }
    
    attendanceRecords.forEach(record => {
        const historyItem = createAttendanceHistoryItem(record);
        if (studentId === 'all' && allHistoryListDiv) {
            allHistoryListDiv.insertAdjacentHTML('beforeend', historyItem);
        } else if (parentHistoryListDiv) {
            parentHistoryListDiv.insertAdjacentHTML('beforeend', historyItem);
        }
    });
}

function createAttendanceHistoryItem(record) {
    let statusClassDiv = '';
    let statusBadgeClass = '';
    let statusText = '';
    let editDeleteButtons = '';

    if (currentUser && currentUser.type === 'admin') {
        editDeleteButtons = `
            <div class="flex items-center space-x-2">
                <button onclick="deleteAttendanceRecord(${record.id})" class="text-red-600 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }

    if (record.status === 'hadir') {
        statusClassDiv = 'bg-green-50 rounded-lg border border-green-200';
        statusBadgeClass = 'bg-green-600 text-white';
        statusText = 'Hadir';
    } else if (record.status === 'tidak') {
        statusClassDiv = 'bg-red-50 rounded-lg border border-red-200';
        statusBadgeClass = 'bg-red-600 text-white';
        statusText = 'Tidak Hadir';
    } else if (record.status === 'belum-setor') {
        statusClassDiv = 'bg-yellow-50 rounded-lg border border-yellow-200';
        statusBadgeClass = 'bg-yellow-600 text-white';
        statusText = 'Belum Setor';
    }
    
    let timeStatusBadge = '';
    if (record.status === 'hadir') {
        if (record.time_status === 'tepat-waktu') {
            timeStatusBadge = '<span class="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-medium ml-2">Tepat Waktu</span>';
        } else if (record.time_status === 'terlambat') {
            timeStatusBadge = '<span class="bg-yellow-500 text-white px-2 py-0.5 rounded-full text-xs font-medium ml-2">Terlambat</span>';
        }
    }

    const hafalanDetails = record.juz ? `
        <p class="text-xs text-gray-500 mt-1">
            Hafalan: Juz ${record.juz} - ${record.surah} ayat ${record.ayat_start}-${record.ayat_end} (${record.type}, Kualitas: ${record.quality})
        </p>
        ${record.notes ? `<p class="text-xs text-gray-500">Catatan: ${record.notes}</p>` : ''}
    ` : '';

    const formattedDate = new Date(record.date).toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });

    return `
        <div class="p-3 ${statusClassDiv}">
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium text-gray-800">${record.student_name} - ${formattedDate}</p>
                    <p class="text-sm text-gray-600">Sesi ${record.session_name} - Kelompok ${record.group_name} ${timeStatusBadge}</p>
                    ${hafalanDetails}
                </div>
                <div class="flex flex-col items-end space-y-2">
                    <span class="${statusBadgeClass} px-3 py-1 rounded-full text-sm font-medium">
                        ${statusText}
                    </span>
                    ${editDeleteButtons}
                </div>
            </div>
        </div>
    `;
}

async function deleteAttendanceRecord(recordId) {
    if (!confirm('Apakah Anda yakin ingin menghapus data kehadiran ini?')) {
        return;
    }
    
    try {
        await apiRequest('api/attendance.php', {
            method: 'DELETE',
            body: JSON.stringify({ id: recordId })
        });
        
        showNotification('Data kehadiran berhasil dihapus', 'success');
        loadAttendanceHistory('all');
        updateDashboard();
    } catch (error) {
        // Error already handled in apiRequest
    }
}

// Master data management functions
function showDataForm(type, clickedButton) {
    document.getElementById('dataForms').classList.remove('hidden');
    
    // Hide all forms
    document.querySelectorAll('#santriForm, #kelasForm, #kelompokForm, #targetForm, #sesiForm').forEach(form => {
        form.classList.add('hidden');
    });

    // Reset button styles
    document.querySelectorAll('#kelolaData button').forEach(btn => {
        btn.classList.remove('bg-blue-700', 'bg-indigo-700', 'bg-green-700', 'bg-purple-700', 'bg-orange-700');
        if (btn.textContent.includes('Santri')) btn.classList.add('bg-blue-600');
        else if (btn.textContent.includes('Kelas')) btn.classList.add('bg-indigo-600');
        else if (btn.textContent.includes('Kelompok')) btn.classList.add('bg-green-600');
        else if (btn.textContent.includes('Target')) btn.classList.add('bg-purple-600');
        else if (btn.textContent.includes('Sesi')) btn.classList.add('bg-orange-600');
    });

    // Highlight clicked button
    if (clickedButton) {
        clickedButton.classList.add(clickedButton.classList.contains('bg-blue-600') ? 'bg-blue-700' : 
                                    clickedButton.classList.contains('bg-indigo-600') ? 'bg-indigo-700' :
                                    clickedButton.classList.contains('bg-green-600') ? 'bg-green-700' :
                                    clickedButton.classList.contains('bg-purple-600') ? 'bg-purple-700' :
                                    'bg-orange-700');
    }
    
    // Show selected form and load data
    if (type === 'santri') {
        document.getElementById('santriForm').classList.remove('hidden');
        loadStudentsForManagement();
    } else if (type === 'kelas') {
        document.getElementById('kelasForm').classList.remove('hidden');
        loadClassesForManagement();
    } else if (type === 'kelompok') {
        document.getElementById('kelompokForm').classList.remove('hidden');
        loadGroupsForManagement();
    } else if (type === 'target') {
        document.getElementById('targetForm').classList.remove('hidden');
        loadTargetsForManagement();
    } else if (type === 'sesi') {
        document.getElementById('sesiForm').classList.remove('hidden');
        loadSessionsForManagement();
    }
}

async function loadStudentsForManagement() {
    try {
        const data = await apiRequest('api/students.php');
        renderExistingStudentsList(data.data);
    } catch (error) {
        console.error('Failed to load students for management:', error);
    }
}

function renderExistingStudentsList(students) {
    const existingSantriListDiv = document.getElementById('existingSantriList');
    existingSantriListDiv.innerHTML = '';
    
    students.forEach(student => {
        const initials = student.name.substring(0,2).toUpperCase();
        const genderColor = student.gender === 'santriwan' ? 'blue' : 'pink';
        const genderText = student.gender === 'santriwan' ? 'Santriwan' : 'Santriwati';
        
        const santriItem = `
            <div class="p-3 bg-gray-50 rounded-lg border border-gray-200" data-id="${student.id}">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center space-x-3">
                        <div class="bg-${genderColor}-100 w-10 h-10 rounded-full flex items-center justify-center">
                            <span class="font-bold text-${genderColor}-600 text-sm">${initials}</span>
                        </div>
                        <div>
                            <h5 class="font-medium text-gray-800">${student.name}</h5>
                            <p class="text-sm text-gray-600">Kelas ${student.class_name || 'N/A'} - Kelompok ${student.group_name || 'N/A'}</p>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="editStudent(${student.id})" class="text-blue-600 hover:text-blue-700">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteStudent(${student.id})" class="text-red-600 hover:text-red-700">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="text-sm text-gray-600">
                    <p><strong>Target:</strong> ${student.target_name || 'Belum ditentukan'}</p>
                    <p><strong>Orang Tua:</strong> ${student.parent_name || 'Belum ada'} ${student.parent_phone ? '- ' + student.parent_phone : ''}</p>
                </div>
            </div>
        `;
        existingSantriListDiv.insertAdjacentHTML('beforeend', santriItem);
    });
}

async function saveSantri() {
    const nama = document.getElementById('addSantriName').value;
    const classId = document.getElementById('addSantriKelas').value;
    const gender = document.getElementById('addSantriGender').value;
    const groupId = document.getElementById('addSantriKelompok').value;
    const targetId = document.getElementById('addSantriTarget').value;
    const parentName = document.getElementById('addSantriParent').value;
    const parentPhone = document.getElementById('addSantriPhone').value;
    
    if (!nama || !gender) {
        showNotification('Nama dan jenis kelamin harus diisi', 'error');
        return;
    }

    try {
        // Create parent first if parent info provided
        let parentId = null;
        if (parentName && parentPhone) {
            const tempEmail = `${parentName.toLowerCase().replace(/\s+/g, '')}@temp.com`;
            const tempPassword = 'temp123';
            
            await apiRequest('api/auth.php', {
                method: 'POST',
                body: JSON.stringify({
                    action: 'register_parent',
                    name: parentName,
                    email: tempEmail,
                    password: tempPassword
                })
            });
            
            // Get the created parent ID (in a real app, you'd return it from the registration)
            // For now, we'll handle this in the backend
        }

        await apiRequest('api/students.php', {
            method: 'POST',
            body: JSON.stringify({
                name: nama,
                gender: gender,
                class_id: classId || null,
                group_id: groupId || null,
                target_id: targetId || null,
                parent_id: parentId
            })
        });

        // Clear form
        document.getElementById('addSantriName').value = '';
        document.getElementById('addSantriKelas').selectedIndex = 0;
        document.getElementById('addSantriGender').selectedIndex = 0;
        document.getElementById('addSantriKelompok').selectedIndex = 0;
        document.getElementById('addSantriTarget').selectedIndex = 0;
        document.getElementById('addSantriParent').value = '';
        document.getElementById('addSantriPhone').value = '';

        showNotification('Data santri berhasil disimpan!', 'success');
        loadStudentsForManagement();
        loadStudents(); // Refresh students list on hafalan page
        updateDashboard();
    } catch (error) {
        // Error already handled in apiRequest
    }
}

async function editStudent(studentId) {
    try {
        const data = await apiRequest('api/students.php');
        const student = data.data.find(s => s.id == studentId);
        
        if (!student) {
            showNotification('Student not found', 'error');
            return;
        }
        
        showCustomModal('Edit Data Santri', `
            <form id="editStudentForm" class="space-y-4 text-left">
                <div>
                    <label class="block text-gray-700 font-medium mb-2">Nama Lengkap</label>
                    <input type="text" id="editStudentName" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" value="${student.name}">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-gray-700 font-medium mb-2">Kelas</label>
                        <select id="editStudentKelas" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                            <option value="">Pilih kelas...</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-700 font-medium mb-2">Jenis Kelamin</label>
                        <select id="editStudentGender" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                            <option value="">Pilih jenis kelamin...</option>
                            <option value="santriwan">Santriwan</option>
                            <option value="santriwati">Santriwati</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="block text-gray-700 font-medium mb-2">Kelompok Tahfidz</label>
                    <select id="editStudentKelompok" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                        <option value="">Pilih kelompok...</option>
                    </select>
                </div>
                <div>
                    <label class="block text-gray-700 font-medium mb-2">Target Hafalan</label>
                    <select id="editStudentTarget" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                        <option value="">Pilih target...</option>
                    </select>
                </div>
            </form>
        `, [
            { text: 'Batal', onClick: closeCustomModal, class: 'bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 flex-1' },
            { text: 'Simpan', onClick: () => updateStudent(studentId), class: 'bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 flex-1' }
        ]);

        // Populate dropdowns and set values
        populateEditStudentDropdowns();
        document.getElementById('editStudentKelas').value = student.class_id || '';
        document.getElementById('editStudentGender').value = student.gender;
        document.getElementById('editStudentKelompok').value = student.group_id || '';
        document.getElementById('editStudentTarget').value = student.target_id || '';
    } catch (error) {
        console.error('Failed to edit student:', error);
    }
}

function populateEditStudentDropdowns() {
    // Populate class dropdown
    const kelasSelect = document.getElementById('editStudentKelas');
    if (kelasSelect && masterData.classes) {
        masterData.classes.forEach(cls => {
            const option = document.createElement('option');
            option.value = cls.id;
            option.textContent = `Kelas ${cls.name}`;
            kelasSelect.appendChild(option);
        });
    }
    
    // Populate group dropdown
    const kelompokSelect = document.getElementById('editStudentKelompok');
    if (kelompokSelect && masterData.groups) {
        masterData.groups.forEach(group => {
            const option = document.createElement('option');
            option.value = group.id;
            option.textContent = `Kelompok ${group.name}`;
            kelompokSelect.appendChild(option);
        });
    }
    
    // Populate target dropdown
    const targetSelect = document.getElementById('editStudentTarget');
    if (targetSelect && masterData.targets) {
        masterData.targets.forEach(target => {
            const option = document.createElement('option');
            option.value = target.id;
            option.textContent = target.name;
            targetSelect.appendChild(option);
        });
    }
}

async function updateStudent(studentId) {
    const name = document.getElementById('editStudentName').value;
    const classId = document.getElementById('editStudentKelas').value;
    const gender = document.getElementById('editStudentGender').value;
    const groupId = document.getElementById('editStudentKelompok').value;
    const targetId = document.getElementById('editStudentTarget').value;
    
    if (!name || !gender) {
        showNotification('Nama dan jenis kelamin harus diisi', 'error');
        return;
    }

    try {
        await apiRequest('api/students.php', {
            method: 'PUT',
            body: JSON.stringify({
                id: studentId,
                name: name,
                gender: gender,
                class_id: classId || null,
                group_id: groupId || null,
                target_id: targetId || null,
                parent_id: null // Handle parent updates separately if needed
            })
        });

        closeCustomModal();
        showNotification('Data santri berhasil diperbarui!', 'success');
        loadStudentsForManagement();
        loadStudents(); // Refresh students list on hafalan page
        updateDashboard();
    } catch (error) {
        // Error already handled in apiRequest
    }
}

async function deleteStudent(studentId) {
    if (!confirm('Apakah Anda yakin ingin menghapus data santri ini?\n\nData hafalan dan absensi santri ini juga akan terhapus.')) {
        return;
    }

    try {
        await apiRequest('api/students.php', {
            method: 'DELETE',
            body: JSON.stringify({ id: studentId })
        });

        showNotification('Data santri berhasil dihapus!', 'success');
        loadStudentsForManagement();
        loadStudents(); // Refresh students list on hafalan page
        loadAttendanceHistory('all'); // Refresh attendance history
        updateDashboard();
    } catch (error) {
        // Error already handled in apiRequest
    }
}

// Classes management
async function loadClassesForManagement() {
    try {
        const data = await apiRequest('api/master-data.php?type=classes');
        renderExistingClassesList(data.data);
    } catch (error) {
        console.error('Failed to load classes for management:', error);
    }
}

function renderExistingClassesList(classes) {
    const existingKelasListDiv = document.getElementById('existingKelasList');
    existingKelasListDiv.innerHTML = '';
    
    classes.forEach(cls => {
        let badgeColor = 'bg-green-100 text-green-700';
        if (cls.level === 'SMP') badgeColor = 'bg-blue-100 text-blue-700';
        else if (cls.level === 'SMA') badgeColor = 'bg-purple-100 text-purple-700';

        const kelasItem = `
            <div class="p-3 bg-gray-50 rounded-lg border border-gray-200" data-id="${cls.id}">
                <div class="flex items-center justify-between mb-2">
                    <h5 class="font-medium text-gray-800">Kelas ${cls.name}</h5>
                    <div class="flex space-x-2">
                        <span class="${badgeColor} px-2 py-1 rounded-full text-xs font-medium">${cls.level}</span>
                        <button onclick="editClass(${cls.id})" class="text-blue-600 hover:text-blue-700">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteClass(${cls.id})" class="text-red-600 hover:text-red-700">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="text-sm text-gray-600">
                    <p><strong>Wali Kelas:</strong> ${cls.teacher}</p>
                    <p><strong>Santri:</strong> ${cls.student_count || 0} orang</p>
                </div>
            </div>
        `;
        existingKelasListDiv.insertAdjacentHTML('beforeend', kelasItem);
    });
}

async function saveKelas() {
    const namaKelas = document.getElementById('addKelasName').value;
    const tingkat = document.getElementById('addKelasTingkat').value;
    const waliKelas = document.getElementById('addKelasTeacher').value;
    
    if (!namaKelas || !tingkat || !waliKelas) {
        showNotification('Semua field harus diisi', 'error');
        return;
    }

    try {
        await apiRequest('api/master-data.php', {
            method: 'POST',
            body: JSON.stringify({
                type: 'class',
                name: namaKelas,
                level: tingkat,
                teacher: waliKelas
            })
        });

        // Clear form
        document.getElementById('addKelasName').value = '';
        document.getElementById('addKelasTingkat').selectedIndex = 0;
        document.getElementById('addKelasTeacher').value = '';

        showNotification('Kelas baru berhasil ditambahkan!', 'success');
        loadClassesForManagement();
        loadMasterData(); // Refresh master data for dropdowns
    } catch (error) {
        // Error already handled in apiRequest
    }
}

// Groups management
async function loadGroupsForManagement() {
    try {
        const data = await apiRequest('api/master-data.php?type=groups');
        renderExistingGroupsList(data.data);
    } catch (error) {
        console.error('Failed to load groups for management:', error);
    }
}

function renderExistingGroupsList(groups) {
    const existingKelompokListDiv = document.getElementById('existingKelompokList');
    existingKelompokListDiv.innerHTML = '';
    
    groups.forEach(group => {
        const kelompokItem = `
            <div class="p-3 bg-gray-50 rounded-lg border border-gray-200" data-id="${group.id}">
                <div class="flex items-center justify-between mb-2">
                    <h5 class="font-medium text-gray-800">Kelompok ${group.name}</h5>
                    <div class="flex space-x-2">
                        <button onclick="editGroup(${group.id})" class="text-blue-600 hover:text-blue-700">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteGroup(${group.id})" class="text-red-600 hover:text-red-700">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="text-sm text-gray-600">
                    <p><strong>Pengajar:</strong> ${group.teacher}</p>
                    <p><strong>Santri:</strong> ${group.student_count || 0} orang</p>
                </div>
            </div>
        `;
        existingKelompokListDiv.insertAdjacentHTML('beforeend', kelompokItem);
    });
}

async function saveKelompok() {
    const namaKelompok = document.getElementById('addKelompokName').value;
    const pengajar = document.getElementById('addKelompokTeacher').value;
    
    if (!namaKelompok || !pengajar) {
        showNotification('Semua field harus diisi', 'error');
        return;
    }

    try {
        await apiRequest('api/master-data.php', {
            method: 'POST',
            body: JSON.stringify({
                type: 'group',
                name: namaKelompok,
                teacher: pengajar
            })
        });

        // Clear form
        document.getElementById('addKelompokName').value = '';
        document.getElementById('addKelompokTeacher').value = '';

        showNotification('Kelompok baru berhasil ditambahkan!', 'success');
        loadGroupsForManagement();
        loadMasterData(); // Refresh master data for dropdowns
    } catch (error) {
        // Error already handled in apiRequest
    }
}

// Targets management
async function loadTargetsForManagement() {
    try {
        const data = await apiRequest('api/master-data.php?type=targets');
        renderExistingTargetsList(data.data);
    } catch (error) {
        console.error('Failed to load targets for management:', error);
    }
}

function renderExistingTargetsList(targets) {
    const existingTargetListDiv = document.getElementById('existingTargetList');
    existingTargetListDiv.innerHTML = '';
    
    targets.forEach(target => {
        const targetItem = `
            <div class="p-3 bg-gray-50 rounded-lg border border-gray-200" data-id="${target.id}">
                <div class="flex items-center justify-between mb-2">
                    <h5 class="font-medium text-gray-800">${target.name}</h5>
                    <div class="flex space-x-2">
                        <button onclick="editTarget(${target.id})" class="text-blue-600 hover:text-blue-700">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteTarget(${target.id})" class="text-red-600 hover:text-red-700">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="text-sm text-gray-600">
                    <p><strong>Jumlah Juz:</strong> ${target.juz_count}</p>
                    <p><strong>Santri:</strong> ${target.student_count || 0} orang</p>
                </div>
            </div>
        `;
        existingTargetListDiv.insertAdjacentHTML('beforeend', targetItem);
    });
}

async function saveTarget() {
    const namaTarget = document.getElementById('addTargetName').value;
    const jumlahJuz = document.getElementById('addTargetJuz').value;
    
    if (!namaTarget || !jumlahJuz) {
        showNotification('Semua field harus diisi', 'error');
        return;
    }

    try {
        await apiRequest('api/master-data.php', {
            method: 'POST',
            body: JSON.stringify({
                type: 'target',
                name: namaTarget,
                juz_count: parseInt(jumlahJuz)
            })
        });

        // Clear form
        document.getElementById('addTargetName').value = '';
        document.getElementById('addTargetJuz').value = '';

        showNotification('Target baru berhasil ditambahkan!', 'success');
        loadTargetsForManagement();
        loadMasterData(); // Refresh master data for dropdowns
    } catch (error) {
        // Error already handled in apiRequest
    }
}

// Sessions management
async function loadSessionsForManagement() {
    try {
        const data = await apiRequest('api/master-data.php?type=sessions');
        renderExistingSessionsList(data.data);
    } catch (error) {
        console.error('Failed to load sessions for management:', error);
    }
}

function renderExistingSessionsList(sessions) {
    const existingSesiListDiv = document.getElementById('existingSesiList');
    existingSesiListDiv.innerHTML = '';
    
    sessions.forEach(session => {
        let statusColor = 'bg-blue-100 text-blue-700';
        if (session.status === 'inactive') statusColor = 'bg-gray-100 text-gray-700';
        else if (session.name.toLowerCase().includes('sore')) statusColor = 'bg-orange-100 text-orange-700';

        const sesiItem = `
            <div class="p-3 bg-gray-50 rounded-lg border border-gray-200" data-id="${session.id}">
                <div class="flex items-center justify-between mb-2">
                    <h5 class="font-medium text-gray-800">${session.name}</h5>
                    <div class="flex items-center space-x-2">
                        <span class="${statusColor} px-2 py-1 rounded-full text-xs font-medium">${session.status === 'active' ? 'Aktif' : 'Nonaktif'}</span>
                        <button onclick="editSession(${session.id})" class="text-blue-600 hover:text-blue-700">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteSession(${session.id})" class="text-red-600 hover:text-red-700">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="text-sm text-gray-600">
                    <p><strong>Waktu:</strong> ${session.start_time}-${session.end_time}</p>
                    <p><strong>Santri Terdaftar:</strong> ${session.student_count || 0} santri</p>
                </div>
            </div>
        `;
        existingSesiListDiv.insertAdjacentHTML('beforeend', sesiItem);
    });
}

async function saveSesi() {
    const namaSesi = document.getElementById('addSesiName').value;
    const jamMulai = document.getElementById('addSesiStart').value;
    const jamSelesai = document.getElementById('addSesiEnd').value;
    
    if (!namaSesi || !jamMulai || !jamSelesai) {
        showNotification('Semua field harus diisi', 'error');
        return;
    }

    try {
        await apiRequest('api/master-data.php', {
            method: 'POST',
            body: JSON.stringify({
                type: 'session',
                name: namaSesi,
                start_time: jamMulai,
                end_time: jamSelesai,
                status: 'active'
            })
        });

        // Clear form
        document.getElementById('addSesiName').value = '';
        document.getElementById('addSesiStart').value = '';
        document.getElementById('addSesiEnd').value = '';

        showNotification('Sesi baru berhasil ditambahkan!', 'success');
        loadSessionsForManagement();
        loadMasterData(); // Refresh master data for dropdowns
    } catch (error) {
        // Error already handled in apiRequest
    }
}

// Custom Modal System
function showCustomModal(title, content, buttons) {
    const modal = document.getElementById('customModal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').innerHTML = content;
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

// Utility functions
function updateCurrentDate() {
    const today = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        currentDateElement.textContent = today.toLocaleDateString('id-ID', options);
    }
}

function setupEventListeners() {
    // Add any global event listeners here
    document.addEventListener('keydown', function(e) {
        // Close modal on ESC key
        if (e.key === 'Escape') {
            closeCustomModal();
        }
    });
    
    // Close modal when clicking outside
    document.getElementById('customModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeCustomModal();
        }
    });
}

// Make functions available globally for onclick handlers
window.loginAdmin = loginAdmin;
window.loginAsParent = loginParent;
window.registerParent = registerParent;
window.logout = logout;
window.showAdminLogin = showAdminLogin;
window.showParentLogin = showParentLogin;
window.backToLoginOptions = backToLoginOptions;
window.showRegister = showRegister;
window.backToLogin = backToLogin;
window.showPage = showPage;
window.showAddHafalan = showAddHafalan;
window.hideAddHafalan = hideAddHafalan;
window.updateSurah = updateSurah;
window.updateAyah = updateAyah;
window.saveHafalan = saveHafalan;
window.filterGender = filterGender;
window.filterGroup = filterGroup;
window.selectSession = selectSession;
window.selectGroupAbsensi = selectGroupAbsensi;
window.markAttendance = markAttendance;
window.updateTimeStatus = updateTimeStatus;
window.saveAttendance = saveAttendance;
window.updateSurahAbsensi = updateSurahAbsensi;
window.updateAyatAbsensi = updateAyatAbsensi;
window.deleteAttendanceRecord = deleteAttendanceRecord;
window.showDataForm = showDataForm;
window.saveSantri = saveSantri;
window.editStudent = editStudent;
window.deleteStudent = deleteStudent;
window.saveKelas = saveKelas;
window.editClass = editClass;
window.deleteClass = deleteClass;
window.saveKelompok = saveKelompok;
window.editGroup = editGroup;
window.deleteGroup = deleteGroup;
window.saveTarget = saveTarget;
window.editTarget = editTarget;
window.deleteTarget = deleteTarget;
window.saveSesi = saveSesi;
window.editSession = editSession;
window.deleteSession = deleteSession;
window.closeCustomModal = closeCustomModal;