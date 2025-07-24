<?php
session_start();
require_once '../config/database.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

if ($method === 'POST') {
    $action = $input['action'] ?? '';
    
    switch ($action) {
        case 'login_admin':
            loginAdmin($pdo, $input);
            break;
        case 'login_parent':
            loginParent($pdo, $input);
            break;
        case 'register_parent':
            registerParent($pdo, $input);
            break;
        case 'register_teacher':
            registerTeacher($pdo, $input);
            break;
        case 'logout':
            logout();
            break;
        default:
            echo json_encode(['success' => false, 'message' => 'Invalid action']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Only POST method allowed']);
}

function loginAdmin($pdo, $input) {
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';
    
    if (empty($username) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Username dan password harus diisi']);
        return;
    }
    
    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();
        
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user'] = [
                'id' => $user['id'],
                'name' => $user['name'],
                'role' => $user['role'],
                'type' => 'admin'
            ];
            echo json_encode(['success' => true, 'user' => $_SESSION['user']]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Username atau password salah']);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}

function loginParent($pdo, $input) {
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';
    
    if (empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Email dan password harus diisi']);
        return;
    }
    
    try {
        $stmt = $pdo->prepare("SELECT p.*, s.name as child_name, s.id as child_id 
                               FROM parents p 
                               LEFT JOIN students s ON p.id = s.parent_id 
                               WHERE p.email = ?");
        $stmt->execute([$email]);
        $parent = $stmt->fetch();
        
        if ($parent && password_verify($password, $parent['password'])) {
            $_SESSION['user'] = [
                'id' => $parent['id'],
                'name' => $parent['name'],
                'type' => 'parent',
                'child_id' => $parent['child_id'],
                'child_name' => $parent['child_name']
            ];
            echo json_encode(['success' => true, 'user' => $_SESSION['user']]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Email atau password salah']);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}

function registerParent($pdo, $input) {
    $name = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $password = $input['password'] ?? '';
    $student_id = $input['student_id'] ?? '';
    
    if (empty($name) || empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Semua field harus diisi']);
        return;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Format email tidak valid']);
        return;
    }
    
    try {
        // Check if email already exists
        $stmt = $pdo->prepare("SELECT id FROM parents WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            echo json_encode(['success' => false, 'message' => 'Email sudah terdaftar']);
            return;
        }
        
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        
        $pdo->beginTransaction();
        
        // Insert parent
        $stmt = $pdo->prepare("INSERT INTO parents (name, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$name, $email, $hashedPassword]);
        $parentId = $pdo->lastInsertId();
        
        // Update student's parent_id if student_id is provided
        if (!empty($student_id)) {
            $stmt = $pdo->prepare("UPDATE students SET parent_id = ? WHERE id = ?");
            $stmt->execute([$parentId, $student_id]);
        }
        
        $pdo->commit();
        
        echo json_encode(['success' => true, 'message' => 'Pendaftaran berhasil']);
    } catch (Exception $e) {
        $pdo->rollback();
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}

function registerTeacher($pdo, $input) {
    $username = trim($input['username'] ?? '');
    $name = trim($input['name'] ?? '');
    $password = $input['password'] ?? '';
    $role = $input['role'] ?? 'teacher';

    if (empty($username) || empty($name) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Semua field harus diisi']);
        return;
    }

    if (!preg_match('/^[a-zA-Z0-9_.-]+$/', $username)) {
        echo json_encode(['success' => false, 'message' => 'Username hanya boleh huruf, angka, titik, underscore, atau strip']);
        return;
    }

    try {
        // Check if username already exists
        $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->execute([$username]);
        if ($stmt->fetch()) {
            echo json_encode(['success' => false, 'message' => 'Username sudah terdaftar']);
            return;
        }

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $pdo->prepare("INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, ?)");
        $stmt->execute([$username, $hashedPassword, $name, $role]);

        echo json_encode(['success' => true, 'message' => 'Pendaftaran guru/admin berhasil']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}

function logout() {
    session_destroy();
    echo json_encode(['success' => true, 'message' => 'Logout berhasil']);
}
?>