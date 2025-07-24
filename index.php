<?php
session_start();

$user = isset($_SESSION['user']) ? $_SESSION['user'] : null;
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tahfidz Tracker</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body class="bg-gray-50 font-sans">
    
    <!-- Login Screen: Initial view for users to choose login type -->
    <div id="loginScreen" class="min-h-screen gradient-green flex items-center justify-center p-4 relative overflow-hidden">
        <!-- Background decorative elements for visual flair -->
        <div class="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full float"></div>
        <div class="absolute top-32 right-16 w-16 h-16 bg-white bg-opacity-10 rounded-full float" style="animation-delay: 1s;"></div>
        <div class="absolute bottom-20 left-20 w-12 h-12 bg-white bg-opacity-10 rounded-full float" style="animation-delay: 2s;"></div>
        <div class="absolute bottom-32 right-32 w-24 h-24 bg-white bg-opacity-10 rounded-full float" style="animation-delay: 0.5s;"></div>
        
        <div class="glass rounded-3xl shadow-2xl w-full max-w-md p-8 animate-fadeInUp hover-lift">
            <div class="text-center mb-8">
                <div class="bg-white bg-opacity-20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
                    <i class="fas fa-quran text-white text-4xl"></i>
                </div>
                <h1 class="text-3xl font-bold text-white mb-2">Tahfidz Tracker</h1>
                <p class="text-white text-opacity-90">Sistem Pencatatan Hafalan Al-Quran</p>
                <div class="w-16 h-1 bg-white bg-opacity-30 rounded-full mx-auto mt-4"></div>
            </div>
            
            <div id="loginOptions" class="space-y-4">
                <button onclick="showAdminLogin()" class="w-full bg-white bg-opacity-20 backdrop-blur-sm text-white py-4 rounded-2xl font-semibold hover:bg-opacity-30 transition-all duration-300 btn-hover border border-white border-opacity-30">
                    <i class="fas fa-user-shield mr-3 text-lg"></i>
                    Login sebagai Guru/Admin
                </button>
                <button onclick="showParentLogin()" class="w-full bg-white bg-opacity-20 backdrop-blur-sm text-white py-4 rounded-2xl font-semibold hover:bg-opacity-30 transition-all duration-300 btn-hover border border-white border-opacity-30">
                    <i class="fas fa-user mr-3 text-lg"></i>
                    Login sebagai Orang Tua
                </button>
            </div>

            <!-- Admin Login Form -->
            <div id="adminLoginForm" class="hidden space-y-4 mt-6">
                <h2 class="text-xl font-bold text-white text-center">Login Guru/Admin</h2>
                <div>
                    <label for="adminUsername" class="block text-white text-opacity-90 font-medium mb-2">Username</label>
                    <input type="text" id="adminUsername" class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm" placeholder="Username">
                </div>
                <div>
                    <label for="adminPassword" class="block text-white text-opacity-90 font-medium mb-2">Password</label>
                    <input type="password" id="adminPassword" class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm" placeholder="Password">
                </div>
                <button onclick="loginAdmin()" class="w-full bg-white bg-opacity-20 backdrop-blur-sm text-white py-4 rounded-2xl font-semibold hover:bg-opacity-30 transition-all duration-300 btn-hover border border-white border-opacity-30">
                    <i class="fas fa-sign-in-alt mr-2"></i>
                    Masuk
                </button>
                <div class="text-center">
                    <button type="button" onclick="backToLoginOptions()" class="block w-full text-white text-opacity-60 py-2 font-medium hover:text-opacity-90 transition-all duration-300">
                        <i class="fas fa-arrow-left mr-2"></i>
                        Kembali
                    </button>
                </div>
                <div class="text-center mt-2">
                    <a href="register.php#registerTeacherForm" class="block w-full text-white text-opacity-80 py-2 font-medium hover:text-opacity-100 transition-all duration-300">
                        Belum punya akun? Daftar Akun Guru/Admin
                    </a>
                </div>
            </div>
            
            <div class="text-center mt-8">
                <p class="text-white text-opacity-70 text-sm">
                    <i class="fas fa-heart text-red-300 mr-1"></i>
                    Dibuat dengan penuh berkah
                </p>
            </div>
        </div>
    </div>

    <!-- Parent Login Form: For parents to log in and track their child's progress -->
    <div id="parentLoginForm" class="hidden min-h-screen gradient-blue flex items-center justify-center p-4 relative overflow-hidden">
        <!-- Background decorative elements -->
        <div class="absolute top-16 left-8 w-16 h-16 bg-white bg-opacity-10 rounded-full float"></div>
        <div class="absolute top-40 right-12 w-20 h-20 bg-white bg-opacity-10 rounded-full float" style="animation-delay: 1.5s;"></div>
        <div class="absolute bottom-24 left-16 w-14 h-14 bg-white bg-opacity-10 rounded-full float" style="animation-delay: 0.8s;"></div>
        
        <div class="glass rounded-3xl shadow-2xl w-full max-w-md p-8 animate-fadeInUp hover-lift">
            <div class="text-center mb-8">
                <div class="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                    <i class="fas fa-user text-white text-2xl"></i>
                </div>
                <h2 class="text-2xl font-bold text-white">Login Orang Tua</h2>
                <p class="text-white text-opacity-90 mt-2">Masuk untuk melihat perkembangan santri</p>
                <div class="w-12 h-1 bg-white bg-opacity-30 rounded-full mx-auto mt-4"></div>
            </div>
            
            <form class="space-y-5">
                <div class="animate-slideInRight">
                    <label class="block text-white text-opacity-90 font-medium mb-2">Email</label>
                    <input type="email" class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm" placeholder="email@example.com">
                </div>
                <div class="animate-slideInRight" style="animation-delay: 0.1s;">
                    <label class="block text-white text-opacity-90 font-medium mb-2">Password</label>
                    <input type="password" class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm" placeholder="Password">
                </div>
                <button type="button" onclick="loginAsParent()" class="w-full bg-white bg-opacity-20 backdrop-blur-sm text-white py-4 rounded-2xl font-semibold hover:bg-opacity-30 transition-all duration-300 btn-hover border border-white border-opacity-30">
                    <i class="fas fa-sign-in-alt mr-2"></i>
                    Masuk
                </button>
                <div class="text-center space-y-2">
                    <button type="button" onclick="showRegister()" class="block w-full text-white text-opacity-80 py-2 font-medium hover:text-opacity-100 transition-all duration-300">
                        Belum punya akun? Daftar di sini
                    </button>
                    <button type="button" onclick="backToLogin()" class="block w-full text-white text-opacity-60 py-2 font-medium hover:text-opacity-90 transition-all duration-300">
                        <i class="fas fa-arrow-left mr-2"></i>
                        Kembali
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Register Form: For new parents to create an account -->
    <div id="registerForm" class="hidden min-h-screen gradient-purple flex items-center justify-center p-4 relative overflow-hidden">
        <!-- Background decorative elements -->
        <div class="absolute top-12 left-12 w-18 h-18 bg-white bg-opacity-10 rounded-full float"></div>
        <div class="absolute top-36 right-8 w-22 h-22 bg-white bg-opacity-10 rounded-full float" style="animation-delay: 2s;"></div>
        <div class="absolute bottom-28 left-24 w-16 h-16 bg-white bg-opacity-10 rounded-full float" style="animation-delay: 1.2s;"></div>
        
        <div class="glass rounded-3xl shadow-2xl w-full max-w-md p-8 animate-fadeInUp hover-lift">
            <div class="text-center mb-8">
                <div class="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                    <i class="fas fa-user-plus text-white text-2xl"></i>
                </div>
                <h2 class="text-2xl font-bold text-white">Daftar Akun Orang Tua</h2>
                <p class="text-white text-opacity-90 mt-2">Buat akun untuk memantau santri</p>
                <div class="w-12 h-1 bg-white bg-opacity-30 rounded-full mx-auto mt-4"></div>
            </div>
            
            <form class="space-y-4">
                <div class="animate-slideInRight">
                    <label class="block text-white text-opacity-90 font-medium mb-2">Nama Lengkap</label>
                    <input type="text" class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white bg-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm" placeholder="Nama lengkap">
                </div>
                <div class="animate-slideInRight" style="animation-delay: 0.1s;">
                    <label class="block text-white text-opacity-90 font-medium mb-2">Email</label>
                    <input type="email" class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm" placeholder="email@example.com">
                </div>
                <div class="animate-slideInRight" style="animation-delay: 0.2s;">
                    <label class="block text-white text-opacity-90 font-medium mb-2">Nama Santri</label>
                    <select class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white bg-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white backdrop-blur-sm">
                        <option class="text-gray-800" value="">Pilih santri...</option>
                    </select>
                </div>
                <div class="animate-slideInRight" style="animation-delay: 0.3s;">
                    <label class="block text-white text-opacity-90 font-medium mb-2">Password</label>
                    <input type="password" class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm" placeholder="Password">
                </div>
                <button type="button" onclick="registerParent()" class="w-full bg-white bg-opacity-20 backdrop-blur-sm text-white py-4 rounded-2xl font-semibold hover:bg-opacity-30 transition-all duration-300 btn-hover border border-white border-opacity-30">
                    <i class="fas fa-user-plus mr-2"></i>
                    Daftar
                </button>
                <div class="text-center">
                    <button type="button" onclick="showParentLogin()" class="block w-full text-white text-opacity-80 py-2 font-medium hover:text-opacity-100 transition-all duration-300">
                        Sudah punya akun? Login di sini
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Main App: The core application interface -->
    <div id="mainApp" class="hidden min-h-screen bg-gray-50">
        <!-- Header: Top navigation and user info -->
        <header class="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
            <div class="px-4 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="gradient-green w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg">
                            <i class="fas fa-quran text-white text-xl"></i>
                        </div>
                        <div>
                            <h1 class="text-xl font-bold text-gray-800">Tahfidz Tracker</h1>
                            <p class="text-sm text-gray-600" id="userInfo">
                                <?php 
                                if ($user['type'] === 'admin') {
                                    echo $user['role'] === 'admin' ? 'Admin' : 'Guru';
                                    echo ' - ' . htmlspecialchars($user['name']);
                                } else {
                                    echo 'Orang Tua - ' . htmlspecialchars($user['name']);
                                    if (isset($user['child_name'])) {
                                        echo ' (Wali ' . htmlspecialchars($user['child_name']) . ')';
                                    }
                                }
                                ?>
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="relative">
                            <div class="gradient-green w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg hover-lift cursor-pointer">
                                <i class="fas fa-user text-white"></i>
                            </div>
                        </div>
                        <a href="api/logout.php" class="text-red-500 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition-all duration-300">
                            <i class="fas fa-sign-out-alt text-lg"></i>
                        </a>
                    </div>
                </div>
            </div>
        </header>

        <!-- Content Area: Main display for different sections of the app -->
        <main class="pb-20">
            <!-- Dashboard: Overview of key statistics and recent activities -->
            <div id="dashboard" class="p-4 space-y-6 animate-fadeInUp">
                <div class="gradient-green rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                    <!-- Background decorative elements -->
                    <div class="absolute top-4 right-4 w-16 h-16 bg-white bg-opacity-10 rounded-full float"></div>
                    <div class="absolute bottom-4 left-4 w-12 h-12 bg-white bg-opacity-10 rounded-full float" style="animation-delay: 1s;"></div>
                    
                    <div class="relative z-10">
                        <div class="flex items-center space-x-3 mb-4">
                            <div class="bg-white bg-opacity-20 w-16 h-16 rounded-2xl flex items-center justify-center">
                                <i class="fas fa-mosque text-white text-2xl"></i>
                            </div>
                            <div>
                                <h2 class="text-2xl font-bold">Assalamu'alaikum</h2>
                                <p class="text-white text-opacity-90">Selamat datang kembali</p>
                            </div>
                        </div>
                        <p class="text-white text-opacity-90 text-lg leading-relaxed">
                            <i class="fas fa-quote-left mr-2"></i>
                            Semoga Allah mudahkan dalam menghafal Al-Quran
                            <i class="fas fa-quote-right ml-2"></i>
                        </p>
                        <div class="mt-4 flex items-center space-x-4">
                            <div class="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                                <span class="text-sm font-medium">
                                    <i class="fas fa-calendar-day mr-2"></i>
                                    Hari ini
                                </span>
                            </div>
                            <div class="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                                <span class="text-sm font-medium">
                                    <i class="fas fa-users mr-2"></i>
                                    <span id="activeStudentsCount">0</span> Santri Aktif
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Stats Cards: Displaying key performance indicators -->
                <div class="grid grid-cols-1 gap-4">
                    <div id="topMemorizerCard" class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover-lift card-hover animate-slideInRight">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-bold text-gray-800 text-lg">Santri Hafalan Terbanyak</h3>
                            <div class="gradient-orange w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg">
                                <i class="fas fa-trophy text-white text-xl"></i>
                            </div>
                        </div>
                        <div class="flex items-center space-x-4">
                            <div id="topMemorizerInitials" class="bg-gradient-to-br from-yellow-400 to-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                                <span class="font-bold text-white text-lg">--</span>
                            </div>
                            <div class="flex-1">
                                <p id="topMemorizerName" class="font-bold text-gray-800 text-lg">Nama Santri</p>
                                <p id="topMemorizerProgressText" class="text-gray-600 mb-2">0 Juz (0%)</p>
                                <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <div id="topMemorizerProgressBar" class="gradient-orange h-3 rounded-full progress-bar" style="width: 0%"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover-lift card-hover animate-slideInRight" style="animation-delay: 0.1s;">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-bold text-gray-800 text-lg">Perkembangan Tercepat</h3>
                            <div class="gradient-blue w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg">
                                <i class="fas fa-rocket text-white text-xl"></i>
                            </div>
                        </div>
                        <div class="flex items-center space-x-4">
                            <div class="bg-gradient-to-br from-blue-400 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                                <span class="font-bold text-white text-lg">FZ</span>
                            </div>
                            <div class="flex-1">
                                <p class="font-bold text-gray-800 text-lg">Fatimah Zahra</p>
                                <p class="text-gray-600 mb-2">+2 Juz minggu ini</p>
                                <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <div class="gradient-blue h-3 rounded-full progress-bar" style="width: 40%"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover-lift card-hover animate-slideInRight" style="animation-delay: 0.2s;">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-bold text-gray-800 text-lg">Santri Paling Rajin</h3>
                            <div class="gradient-green w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg">
                                <i class="fas fa-medal text-white text-xl"></i>
                            </div>
                        </div>
                        <div class="flex items-center space-x-4">
                            <div class="bg-gradient-to-br from-green-400 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                                <span class="font-bold text-white text-lg">MR</span>
                            </div>
                            <div class="flex-1">
                                <p class="font-bold text-gray-800 text-lg">Muhammad Rizki</p>
                                <p class="text-gray-600 mb-2">100% kehadiran bulan ini</p>
                                <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <div class="gradient-green h-3 rounded-full progress-bar" style="width: 100%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity: Log of recent actions and achievements -->
                <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover-lift card-hover animate-fadeInUp" style="animation-delay: 0.3s;">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="font-bold text-gray-800 text-lg">Aktivitas Terbaru</h3>
                        <div class="gradient-purple w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg">
                            <i class="fas fa-history text-white"></i>
                        </div>
                    </div>
                    <div id="recentActivityList" class="space-y-4">
                        <!-- Recent activity will be dynamically rendered here -->
                    </div>
                </div>
            </div>

            <!-- Hafalan Page: Displays student memorization data with filters -->
            <div id="hafalan" class="hidden p-4 space-y-4">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-bold text-gray-800">Data Hafalan</h2>
                    <button id="addHafalanBtn" onclick="showAddHafalan()" class="hidden bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700">
                        <i class="fas fa-plus mr-2"></i>Tambah
                    </button>
                </div>

                <!-- Filter Tabs: For filtering students by gender and group -->
                <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div class="flex space-x-2 mb-4">
                        <button onclick="filterGender('all', this)" class="gender-filter-btn bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm">
                            Semua
                        </button>
                        <button onclick="filterGender('santriwan', this)" class="gender-filter-btn bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm">
                            <i class="fas fa-male mr-1"></i>Santriwan
                        </button>
                        <button onclick="filterGender('santriwati', this)" class="gender-filter-btn bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm">
                            <i class="fas fa-female mr-1"></i>Santriwati
                        </button>
                    </div>
                    
                    <div class="mb-4">
                        <label for="groupFilterHafalan" class="block text-gray-700 font-medium mb-2 text-sm">Filter Kelompok:</label>
                        <select id="groupFilterHafalan" onchange="filterGroup(this.value)" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            <!-- Options populated by JS -->
                        </select>
                    </div>
                </div>

                <!-- Student List: Dynamically populated list of students and their memorization progress -->
                <div id="studentList" class="space-y-3">
                    <!-- Student Cards will be dynamically managed by JS -->
                </div>
            </div>

            <!-- Add Hafalan Form: For recording new memorization progress -->
            <div id="addHafalanForm" class="hidden p-4 space-y-4">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-bold text-gray-800">Tambah Hafalan</h2>
                    <button onclick="hideAddHafalan()" class="text-gray-600 hover:text-gray-800">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <form class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-4">
                    <div>
                        <label class="block text-gray-700 font-medium mb-2">Santri</label>
                        <select id="santriSelectHafalan" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500">
                            <option value="">Pilih santri...</option>
                            <!-- Options will be populated by JavaScript -->
                        </select>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-700 font-medium mb-2">Juz</label>
                            <select id="juzSelect" onchange="updateSurah()" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500">
                                <option value="">Pilih Juz...</option>
                                <!-- Options will be populated by JavaScript from quranData -->
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-700 font-medium mb-2">Surah</label>
                            <select id="surahSelect" onchange="updateAyah()" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500">
                                <option value="">Pilih Surah...</option>
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-700 font-medium mb-2">Ayat Mulai</label>
                            <select id="ayatMulai" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500">
                                <option value="">Pilih ayat...</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-700 font-medium mb-2">Ayat Selesai</label>
                            <select id="ayatSelesai" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500">
                                <option value="">Pilih ayat...</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-gray-700 font-medium mb-2">Jenis Hafalan</label>
                        <select id="jenisHafalan" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500">
                            <option value="">Pilih jenis hafalan...</option>
                            <option value="Hafalan Baru">Hafalan Baru</option>
                            <option value="Muroja'ah">Muroja'ah</option>
                            <option value="Perbaikan">Perbaikan</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-gray-700 font-medium mb-2">Kualitas Hafalan</label>
                        <select class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500">
                            <option>Sangat Baik</option>
                            <option>Baik</option>
                            <option>Cukup</option>
                            <option>Perlu Perbaikan</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-gray-700 font-medium mb-2">Catatan</label>
                        <textarea class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500" rows="3" placeholder="Catatan tambahan..."></textarea>
                    </div>

                    <button type="button" onclick="saveHafalan()" class="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700">
                        Simpan Hafalan
                    </button>
                </form>
            </div>

            <!-- Absensi Page: For recording and viewing attendance -->
            <div id="absensi" class="hidden p-4 space-y-4">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-bold text-gray-800">Absensi Tahfidz</h2>
                    <div class="text-sm text-gray-600">
                        <i class="fas fa-calendar mr-1"></i>
                        <span id="currentDate"></span>
                    </div>
                </div>

                <!-- Admin View: Session Selection and Attendance Marking -->
                <div id="adminAbsensi" class="hidden">
                    <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
                        <h3 class="font-semibold text-gray-800 mb-3">Pilih Sesi</h3>
                        <div id="sessionButtonsContainer" class="grid grid-cols-2 gap-3">
                            <!-- Session buttons will be dynamically rendered here -->
                        </div>
                    </div>

                    <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
                        <h3 class="font-semibold text-gray-800 mb-4">Filter Kelompok</h3>
                        <select id="groupFilterAbsensi" onchange="selectGroupAbsensi(this.value)" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            <!-- Options populated by JS -->
                        </select>
                    </div>

                    <div id="attendanceList" class="hidden space-y-3 mt-4">
                        <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <h3 class="font-semibold text-gray-800 mb-4">Absensi Sesi <span id="selectedSession"></span></h3>
                            <div id="attendanceStudentList" class="space-y-3">
                                <!-- Student attendance items will be populated here by JS, grouped by group -->
                            </div>
                            
                            <button onclick="saveAttendance()" class="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700">
                                Simpan Absensi & Hafalan
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Parent View: Displays attendance history for the logged-in parent's child -->
                <div id="parentAbsensi" class="hidden space-y-3">
                    <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <h3 class="font-semibold text-gray-800 mb-4">Riwayat Kehadiran <span id="parentChildName"></span></h3>
                        <div id="attendanceHistoryList" class="space-y-3">
                            <!-- Attendance history will be dynamically rendered here -->
                        </div>
                    </div>
                </div>

                <!-- Admin/All Attendance History View -->
                <div id="allAttendanceHistory" class="hidden space-y-3 mt-4">
                    <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <h3 class="font-semibold text-gray-800 mb-4">Riwayat Kehadiran Semua Santri</h3>
                        <div id="allAttendanceHistoryList" class="space-y-3">
                            <!-- All attendance history will be dynamically rendered here -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- Kelola Data Page: For managing various data entities like students, classes, groups, etc. -->
            <div id="kelolaData" class="hidden p-4 space-y-4">
                <h2 class="text-xl font-bold text-gray-800">Kelola Data</h2>
                
                <div class="grid grid-cols-2 gap-4">
                    <button onclick="showDataForm('santri', this)" class="bg-blue-600 text-white p-4 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                        <i class="fas fa-user-plus text-2xl mb-2"></i>
                        <p>Tambah Santri</p>
                    </button>
                    <button onclick="showDataForm('kelas', this)" class="bg-indigo-600 text-white p-4 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
                        <i class="fas fa-chalkboard text-2xl mb-2"></i>
                        <p>Kelola Kelas</p>
                    </button>
                    <button onclick="showDataForm('kelompok', this)" class="bg-green-600 text-white p-4 rounded-xl font-medium hover:bg-green-700 transition-colors">
                        <i class="fas fa-users text-2xl mb-2"></i>
                        <p>Kelompok Tahfidz</p>
                    </button>
                    <button onclick="showDataForm('target', this)" class="bg-purple-600 text-white p-4 rounded-xl font-medium hover:bg-purple-700 transition-colors">
                        <i class="fas fa-bullseye text-2xl mb-2"></i>
                        <p>Target Tahfidz</p>
                    </button>
                    <button onclick="showDataForm('sesi', this)" class="bg-orange-600 text-white p-4 rounded-xl font-medium hover:bg-orange-700 transition-colors">
                        <i class="fas fa-clock text-2xl mb-2"></i>
                        <p>Sesi Tahfidz</p>
                    </button>
                </div>

                <!-- Data Forms: Hidden forms for adding/editing different data types -->
                <div id="dataForms" class="hidden space-y-4">
                    <!-- Add Student Form -->
                    <div id="santriForm" class="hidden bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <h3 class="font-semibold text-gray-800 mb-4">Tambah Santri Baru</h3>
                        <form class="space-y-4">
                            <div>
                                <label class="block text-gray-700 font-medium mb-2">Nama Lengkap</label>
                                <input type="text" id="addSantriName" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="Nama lengkap santri">
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-gray-700 font-medium mb-2">Kelas</label>
                                    <select id="addSantriKelas" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                                        <option value="">Pilih kelas...</option>
                                        <!-- Options will be populated by JavaScript -->
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-gray-700 font-medium mb-2">Jenis Kelamin</label>
                                    <select id="addSantriGender" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                                        <option value="">Pilih jenis kelamin...</option>
                                        <option value="santriwan">Santriwan (Laki-laki)</option>
                                        <option value="santriwati">Santriwati (Perempuan)</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label class="block text-gray-700 font-medium mb-2">Kelompok Tahfidz</label>
                                <select id="addSantriKelompok" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                                    <option value="">Pilih kelompok...</option>
                                    <!-- Options will be populated by JavaScript -->
                                </select>
                            </div>
                            <div>
                                <label class="block text-gray-700 font-medium mb-2">Target Hafalan</label>
                                <select id="addSantriTarget" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                                    <option value="">Pilih target...</option>
                                    <!-- Options will be populated by JavaScript -->
                                </select>
                            </div>
                            <div>
                                <label class="block text-gray-700 font-medium mb-2">Nama Orang Tua/Wali</label>
                                <input type="text" id="addSantriParent" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="Nama orang tua/wali">
                            </div>
                            <div>
                                <label class="block text-gray-700 font-medium mb-2">No. Telepon Orang Tua</label>
                                <input type="tel" id="addSantriPhone" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="08xxxxxxxxxx">
                            </div>
                            <button type="button" onclick="saveSantri()" class="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700">
                                Simpan Santri
                            </button>
                        </form>

                        <!-- Existing Students List -->
                        <div class="mt-6 pt-6 border-t border-gray-200">
                            <h4 class="font-medium text-gray-800 mb-3">Daftar Santri</h4>
                            <div id="existingSantriList" class="space-y-3">
                                <!-- Existing student data will be populated by JavaScript -->
                            </div>
                        </div>
                    </div>

                    <!-- Kelas Form -->
                    <div id="kelasForm" class="hidden bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <h3 class="font-semibold text-gray-800 mb-4">Kelola Kelas</h3>
                        
                        <!-- Add New Class -->
                        <div class="mb-6 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                            <h4 class="font-medium text-gray-800 mb-3">Tambah Kelas Baru</h4>
                            <form class="space-y-3">
                                <div>
                                    <label class="block text-gray-700 font-medium mb-2">Nama Kelas</label>
                                    <input type="text" id="addKelasName" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Contoh: Kelas 7">
                                </div>
                                <div>
                                    <label class="block text-gray-700 font-medium mb-2">Tingkat</label>
                                    <select id="addKelasTingkat" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                                        <option value="">Pilih tingkat...</option>
                                        <option value="SD">SD (Sekolah Dasar)</option>
                                        <option value="SMP">SMP (Sekolah Menengah Pertama)</option>
                                        <option value="SMA">SMA (Sekolah Menengah Atas)</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-gray-700 font-medium mb-2">Wali Kelas</label>
                                    <input type="text" id="addKelasTeacher" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Nama wali kelas">
                                </div>
                                <button type="button" onclick="saveKelas()" class="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700">
                                    Tambah Kelas
                                </button>
                            </form>
                        </div>

                        <!-- Existing Classes -->
                        <div>
                            <h4 class="font-medium text-gray-800 mb-3">Kelas yang Ada</h4>
                            <div id="existingKelasList" class="space-y-3">
                                <!-- Existing class data will be populated by JavaScript -->
                            </div>
                        </div>
                    </div>

                    <!-- Kelompok Form -->
                    <div id="kelompokForm" class="hidden bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <h3 class="font-semibold text-gray-800 mb-4">Kelola Kelompok Tahfidz</h3>
                        
                        <!-- Add New Group -->
                        <div class="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
                            <h4 class="font-medium text-gray-800 mb-3">Tambah Kelompok Baru</h4>
                            <form class="space-y-3">
                                <div>
                                    <label class="block text-gray-700 font-medium mb-2">Nama Kelompok</label>
                                    <input type="text" id="addKelompokName" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="Contoh: Kelompok F">
                                </div>
                                <div>
                                    <label class="block text-gray-700 font-medium mb-2">Ustadz/Ustadzah</label>
                                    <input type="text" id="addKelompokTeacher" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="Nama pengajar">
                                </div>
                                <button type="button" onclick="saveKelompok()" class="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700">
                                    Tambah Kelompok
                                </button>
                            </form>
                        </div>

                        <!-- Existing Groups -->
                        <div>
                            <h4 class="font-medium text-gray-800 mb-3">Kelompok yang Ada</h4>
                            <div id="existingKelompokList" class="space-y-3">
                                <!-- Existing group data will be populated by JavaScript -->
                            </div>
                        </div>
                    </div>

                    <!-- Target Form -->
                    <div id="targetForm" class="hidden bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <h3 class="font-semibold text-gray-800 mb-4">Kelola Target Tahfidz</h3>
                        
                        <!-- Add New Target -->
                        <div class="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
                            <h4 class="font-medium text-gray-800 mb-3">Tambah Target Baru</h4>
                            <form class="space-y-3">
                                <div>
                                    <label class="block text-gray-700 font-medium mb-2">Nama Target</label>
                                    <input type="text" id="addTargetName" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Contoh: 25 Juz">
                                </div>
                                <div>
                                    <label class="block text-gray-700 font-medium mb-2">Jumlah Juz</label>
                                    <input type="number" id="addTargetJuz" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="25">
                                </div>
                                <button type="button" onclick="saveTarget()" class="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700">
                                    Tambah Target
                                </button>
                            </form>
                        </div>

                        <!-- Existing Targets -->
                        <div>
                            <h4 class="font-medium text-gray-800 mb-3">Target yang Ada</h4>
                            <div id="existingTargetList" class="space-y-3">
                                <!-- Existing target data will be populated by JavaScript -->
                            </div>
                        </div>
                    </div>

                    <!-- Sesi Form -->
                    <div id="sesiForm" class="hidden bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <h3 class="font-semibold text-gray-800 mb-4">Kelola Sesi Tahfidz</h3>
                        
                        <!-- Add New Session -->
                        <div class="mb-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
                            <h4 class="font-medium text-gray-800 mb-3">Tambah Sesi Baru</h4>
                            <form class="space-y-3">
                                <div>
                                    <label class="block text-gray-700 font-medium mb-2">Nama Sesi</label>
                                    <input type="text" id="addSesiName" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="Contoh: Sesi Malam">
                                </div>
                                <div class="grid grid-cols-2 gap-3">
                                    <div>
                                        <label class="block text-gray-700 font-medium mb-2">Jam Mulai</label>
                                        <input type="time" id="addSesiStart" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                                    </div>
                                    <div>
                                        <label class="block text-gray-700 font-medium mb-2">Jam Selesai</label>
                                        <input type="time" id="addSesiEnd" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                                    </div>
                                </div>
                                <button type="button" onclick="saveSesi()" class="w-full bg-orange-600 text-white py-2 rounded-lg font-medium hover:bg-orange-700">
                                    Tambah Sesi
                                </button>
                            </form>
                        </div>

                        <!-- Existing Sessions -->
                        <div>
                            <h4 class="font-medium text-gray-800 mb-3">Sesi yang Ada</h4>
                            <div id="existingSesiList" class="space-y-3">
                                <!-- Existing session data will be populated by JavaScript -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Bottom Navigation: For navigating between main sections of the app -->
        <nav class="fixed bottom-0 left-0 right-0 bg-white backdrop-blur-sm bg-opacity-95 border-t border-gray-100 px-4 py-3 shadow-2xl">
            <div class="flex justify-around">
                <button onclick="showPage('dashboard', this)" class="nav-btn flex flex-col items-center py-3 px-4 text-green-600 relative transition-all duration-300">
                    <div class="bg-green-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-1 shadow-lg">
                        <i class="fas fa-home text-xl"></i>
                    </div>
                    <span class="text-xs font-semibold">Dashboard</span>
                    <div class="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full"></div>
                </button>
                <button onclick="showPage('hafalan', this)" class="nav-btn flex flex-col items-center py-3 px-4 text-gray-600 relative transition-all duration-300 hover:text-blue-600">
                    <div class="bg-gray-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-1 shadow-lg hover:bg-blue-100 transition-colors">
                        <i class="fas fa-book-quran text-xl"></i>
                    </div>
                    <span class="text-xs font-semibold">Hafalan</span>
                </button>
                <button onclick="showPage('absensi', this)" class="nav-btn flex flex-col items-center py-3 px-4 text-gray-600 relative transition-all duration-300 hover:text-purple-600">
                    <div class="bg-gray-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-1 shadow-lg hover:bg-purple-100 transition-colors">
                        <i class="fas fa-calendar-check text-xl"></i>
                    </div>
                    <span class="text-xs font-semibold">Absensi</span>
                </button>
        // Initialize user data from PHP session  
        const currentUser = <?php echo json_encode($user); ?>;
                    <div class="bg-gray-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-1 shadow-lg hover:bg-orange-100 transition-colors">
                        <i class="fas fa-cog text-xl"></i>
                    </div>
            </div>
        </nav>
    </div>
    <!-- Scripts -->
    <script src="js/app.js"></script>
</body>
</html>