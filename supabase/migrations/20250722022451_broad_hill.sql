-- Database Schema for Tahfidz Tracker
CREATE DATABASE IF NOT EXISTS tahfidz_tracker CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tahfidz_tracker;

-- Users table (for admin/teachers)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'teacher') DEFAULT 'teacher',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Parents table
CREATE TABLE parents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Classes table
CREATE TABLE classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    level ENUM('SD', 'SMP', 'SMA') NOT NULL,
    teacher VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Groups table
CREATE TABLE groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    teacher VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Targets table
CREATE TABLE targets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    juz_count INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sessions table
CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Students table
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    gender ENUM('santriwan', 'santriwati') NOT NULL,
    class_id INT,
    group_id INT,
    target_id INT,
    parent_id INT,
    current_juz INT DEFAULT 0,
    current_ayat TEXT,
    progress INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE SET NULL,
    FOREIGN KEY (target_id) REFERENCES targets(id) ON DELETE SET NULL,
    FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE SET NULL
);

-- Memorization records table
CREATE TABLE memorizations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    juz INT NOT NULL,
    surah VARCHAR(100) NOT NULL,
    surah_id INT NOT NULL,
    ayat_start INT NOT NULL,
    ayat_end INT NOT NULL,
    type ENUM('Hafalan Baru', 'Muroja\'ah', 'Perbaikan') NOT NULL,
    quality ENUM('Sangat Baik', 'Baik', 'Cukup', 'Perlu Perbaikan') NOT NULL,
    notes TEXT,
    recorded_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (recorded_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Attendance records table
CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    session_id INT NOT NULL,
    date DATE NOT NULL,
    status ENUM('hadir', 'tidak', 'belum-setor') NOT NULL,
    time_status ENUM('tepat-waktu', 'terlambat', 'N/A') DEFAULT 'N/A',
    memorization_id INT NULL,
    recorded_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (memorization_id) REFERENCES memorizations(id) ON DELETE SET NULL,
    FOREIGN KEY (recorded_by) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY unique_student_session_date (student_id, session_id, date)
);

-- Insert default data
INSERT INTO users (username, password, name, role) VALUES 
('AsatidzBr', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Ustadz Ahmad', 'admin');

INSERT INTO classes (name, level, teacher) VALUES 
('1', 'SD', 'Ustadzah Aisyah'),
('2', 'SD', 'Ustadz Muhammad'),
('3', 'SD', 'Ustadzah Khadijah'),
('4', 'SD', 'Ustadz Ahmad'),
('5', 'SD', 'Ustadzah Fatimah'),
('6', 'SD', 'Ustadz Yusuf');

INSERT INTO groups (name, teacher) VALUES 
('A', 'Ustadz Ahmad'),
('B', 'Ustadzah Fatimah'),
('C', 'Ustadzah Khadijah'),
('D', 'Ustadz Ibrahim'),
('E', 'Ustadzah Maryam');

INSERT INTO targets (name, juz_count) VALUES 
('30 Juz (Hafidz/Hafidzah)', 30),
('20 Juz', 20),
('15 Juz', 15),
('10 Juz', 10),
('5 Juz', 5);

INSERT INTO sessions (name, start_time, end_time, status) VALUES 
('Sesi Pagi', '08:00:00', '10:00:00', 'active'),
('Sesi Sore', '15:00:00', '17:00:00', 'active'),
('Sesi Weekend', '09:00:00', '11:00:00', 'inactive');

-- Insert sample parents
INSERT INTO parents (name, email, password, phone) VALUES 
('Bapak Ahmad', 'ahmad@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '081234567890'),
('Ibu Fatimah', 'fatimah@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '081234567891'),
('Bapak Rizki', 'rizki@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '081234567892');

-- Insert sample students
INSERT INTO students (name, gender, class_id, group_id, target_id, parent_id, current_juz, current_ayat, progress) VALUES 
('Ahmad Fauzi', 'santriwan', 5, 1, 2, 1, 15, 'Juz 15 - Al-Isra ayat 111', 75),
('Muhammad Rizki', 'santriwan', 3, 1, 3, 3, 8, 'Juz 8 - Al-Anfal ayat 40', 53),
('Yusuf Abdullah', 'santriwan', 2, 2, 4, NULL, 6, 'Juz 6 - An-Nisa ayat 147', 60),
('Fatimah Zahra', 'santriwati', 4, 3, 2, 2, 12, 'Juz 12 - Yusuf ayat 53', 60),
('Aisyah Siddiq', 'santriwati', 4, 3, 3, NULL, 10, 'Juz 10 - At-Taubah ayat 93', 67),
('Khadijah Husna', 'santriwati', 3, 4, 4, NULL, 7, 'Juz 7 - Al-Maidah ayat 82', 70);