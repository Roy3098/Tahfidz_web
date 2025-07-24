<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Tahfidz Tracker</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
</head>
<body class="bg-gray-50 font-sans">
    <div class="demo-badge">DEMO</div>
    
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
                <form id="adminLoginFormElement" class="space-y-4">
                    <div>
                        <label for="adminUsername" class="block text-white text-opacity-90 font-medium mb-2">Username</label>
                        <input type="text" id="adminUsername" name="username" class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm" placeholder="Username" required>
                    </div>
                    <div>
                        <label for="adminPassword" class="block text-white text-opacity-90 font-medium mb-2">Password</label>
                        <input type="password" id="adminPassword" name="password" class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm" placeholder="Password" required>
                    </div>
                    <button type="submit" class="w-full bg-white bg-opacity-20 backdrop-blur-sm text-white py-4 rounded-2xl font-semibold hover:bg-opacity-30 transition-all duration-300 btn-hover border border-white border-opacity-30">
                        <i class="fas fa-sign-in-alt mr-2"></i>
                        <span class="button-text">Masuk</span>
                        <div class="spinner hidden"></div>
                    </button>
                </form>
                <div class="text-center">
                    <button type="button" onclick="backToLoginOptions()" class="block w-full text-white text-opacity-60 py-2 font-medium hover:text-opacity-90 transition-all duration-300">
                        <i class="fas fa-arrow-left mr-2"></i>
                        Kembali
                    </button>
                </div>
            </div>

            <!-- Parent Login Form -->
            <div id="parentLoginForm" class="hidden space-y-4 mt-6">
                <h2 class="text-xl font-bold text-white text-center">Login Orang Tua</h2>
                <form id="parentLoginFormElement" class="space-y-4">
                    <div>
                        <label for="parentEmail" class="block text-white text-opacity-90 font-medium mb-2">Email</label>
                        <input type="email" id="parentEmail" name="email" class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm" placeholder="email@example.com" required>
                    </div>
                    <div>
                        <label for="parentPassword" class="block text-white text-opacity-90 font-medium mb-2">Password</label>
                        <input type="password" id="parentPassword" name="password" class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm" placeholder="Password" required>
                    </div>
                    <button type="submit" class="w-full bg-white bg-opacity-20 backdrop-blur-sm text-white py-4 rounded-2xl font-semibold hover:bg-opacity-30 transition-all duration-300 btn-hover border border-white border-opacity-30">
                        <i class="fas fa-sign-in-alt mr-2"></i>
                        <span class="button-text">Masuk</span>
                        <div class="spinner hidden"></div>
                    </button>
                </form>
                <div class="text-center space-y-2">
                    <a href="register.php" class="block w-full text-white text-opacity-80 py-2 font-medium hover:text-opacity-100 transition-all duration-300">
                        Belum punya akun? Daftar di sini
                    </a>
                    <button type="button" onclick="backToLoginOptions()" class="block w-full text-white text-opacity-60 py-2 font-medium hover:text-opacity-90 transition-all duration-300">
                        <i class="fas fa-arrow-left mr-2"></i>
                        Kembali
                    </button>
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

    <!-- Custom Modal for Alerts/Confirmations -->
    <div id="customModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
        <div class="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl text-center">
            <h3 id="modalTitle" class="text-xl font-bold text-gray-800 mb-4"></h3>
            <p id="modalMessage" class="text-gray-700 mb-6"></p>
            <div id="modalButtons" class="flex justify-center space-x-4">
                <!-- Buttons will be dynamically added -->
            </div>
        </div>
    </div>

    <!-- Notification -->
    <div id="notification" class="notification"></div>

    <script src="js/login.js"></script>
</body>
</html>