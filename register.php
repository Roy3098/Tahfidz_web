<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Akun - Tahfidz Tracker</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
</head>
<body class="bg-gray-50 font-sans">
    <div class="demo-badge">DEMO</div>
    
    <!-- Register Form: For new parents to create an account -->
    <div id="registerForm" class="min-h-screen gradient-purple flex items-center justify-center p-4 relative overflow-hidden">
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
            
            <form id="registerFormElement" class="space-y-4">
                <div class="animate-slideInRight">
                    <label for="registerName" class="block text-white text-opacity-90 font-medium mb-2">Nama Lengkap</label>
                    <input type="text" id="registerName" name="name" class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm" placeholder="Nama lengkap" required>
                </div>
                <div class="animate-slideInRight" style="animation-delay: 0.1s;">
                    <label for="registerEmail" class="block text-white text-opacity-90 font-medium mb-2">Email</label>
                    <input type="email" id="registerEmail" name="email" class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm" placeholder="email@example.com" required>
                </div>
                <div class="animate-slideInRight" style="animation-delay: 0.15s;">
                    <label for="registerPhone" class="block text-white text-opacity-90 font-medium mb-2">No. Telepon</label>
                    <input type="tel" id="registerPhone" name="phone" class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm" placeholder="081234567890">
                </div>
                <div class="animate-slideInRight" style="animation-delay: 0.2s;">
                    <label for="registerStudent" class="block text-white text-opacity-90 font-medium mb-2">Nama Santri</label>
                    <select id="registerStudent" name="student_id" class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white backdrop-blur-sm">
                        <option value="" class="text-gray-800">Pilih santri...</option>
                        <!-- Options will be populated by JavaScript -->
                    </select>
                </div>
                <div class="animate-slideInRight" style="animation-delay: 0.3s;">
                    <label for="registerPassword" class="block text-white text-opacity-90 font-medium mb-2">Password</label>
                    <input type="password" id="registerPassword" name="password" class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm" placeholder="Password" required>
                </div>
                <div class="animate-slideInRight" style="animation-delay: 0.35s;">
                    <label for="registerPasswordConfirm" class="block text-white text-opacity-90 font-medium mb-2">Konfirmasi Password</label>
                    <input type="password" id="registerPasswordConfirm" name="password_confirm" class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm" placeholder="Konfirmasi Password" required>
                </div>
                <button type="submit" class="w-full bg-white bg-opacity-20 backdrop-blur-sm text-white py-4 rounded-2xl font-semibold hover:bg-opacity-30 transition-all duration-300 btn-hover border border-white border-opacity-30">
                    <i class="fas fa-user-plus mr-2"></i>
                    <span class="button-text">Daftar</span>
                    <div class="spinner hidden"></div>
                </button>
                <div class="text-center">
                    <a href="login.php" class="block w-full text-white text-opacity-80 py-2 font-medium hover:text-opacity-100 transition-all duration-300">
                        Sudah punya akun? Login di sini
                    </a>
                </div>
            </form>
        </div>
    </div>

    <!-- Register Form: For new teachers/admins to create an account -->
    <div id="registerTeacherForm" class="min-h-screen gradient-green flex items-center justify-center p-4 relative overflow-hidden">
        <div class="glass rounded-3xl shadow-2xl w-full max-w-md p-8 animate-fadeInUp hover-lift">
            <div class="text-center mb-8">
                <div class="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                    <i class="fas fa-user-tie text-white text-2xl"></i>
                </div>
                <h2 class="text-2xl font-bold text-white">Daftar Akun Guru/Admin</h2>
                <p class="text-white text-opacity-90 mt-2">Buat akun untuk guru atau admin</p>
                <div class="w-12 h-1 bg-white bg-opacity-30 rounded-full mx-auto mt-4"></div>
            </div>
            <form id="registerTeacherFormElement" class="space-y-4">
                <div class="animate-slideInRight">
                    <label for="teacherUsername" class="block text-white text-opacity-90 font-medium mb-2">Username</label>
                    <input type="text" id="teacherUsername" name="username" class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm" placeholder="Username" required>
                </div>
                <div class="animate-slideInRight" style="animation-delay: 0.1s;">
                    <label for="teacherName" class="block text-white text-opacity-90 font-medium mb-2">Nama Lengkap</label>
                    <input type="text" id="teacherName" name="name" class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm" placeholder="Nama lengkap" required>
                </div>
                <div class="animate-slideInRight" style="animation-delay: 0.2s;">
                    <label for="teacherPassword" class="block text-white text-opacity-90 font-medium mb-2">Password</label>
                    <input type="password" id="teacherPassword" name="password" class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm" placeholder="Password" required>
                </div>
                <div class="animate-slideInRight" style="animation-delay: 0.3s;">
                    <label for="teacherPasswordConfirm" class="block text-white text-opacity-90 font-medium mb-2">Konfirmasi Password</label>
                    <input type="password" id="teacherPasswordConfirm" name="password_confirm" class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm" placeholder="Konfirmasi Password" required>
                </div>
                <div class="animate-slideInRight" style="animation-delay: 0.4s;">
                    <label for="teacherRole" class="block text-white text-opacity-90 font-medium mb-2">Role</label>
                    <select id="teacherRole" name="role" class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent text-white backdrop-blur-sm">
                        <option value="teacher" selected>Guru</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" class="w-full bg-white bg-opacity-20 backdrop-blur-sm text-white py-4 rounded-2xl font-semibold hover:bg-opacity-30 transition-all duration-300 btn-hover border border-white border-opacity-30">
                    <i class="fas fa-user-plus mr-2"></i>
                    <span class="button-text">Daftar</span>
                    <div class="spinner hidden"></div>
                </button>
                <div class="text-center">
                    <a href="login.php" class="block w-full text-white text-opacity-80 py-2 font-medium hover:text-opacity-100 transition-all duration-300">
                        Sudah punya akun? Login di sini
                    </a>
                </div>
            </form>
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

    <script src="js/register.js"></script>
</body>
</html>