<?php
session_start();
require_once '../config/database.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user'])) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getStudents($pdo);
        break;
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        createStudent($pdo, $input);
        break;
    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        updateStudent($pdo, $input);
        break;
    case 'DELETE':
        $input = json_decode(file_get_contents('php://input'), true);
        deleteStudent($pdo, $input);
        break;
    default:
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}

function getStudents($pdo) {
    try {
        $stmt = $pdo->query("
            SELECT s.*, 
                   c.name as class_name, 
                   g.name as group_name, 
                   t.name as target_name, 
                   t.juz_count as target_juz_count,
                   p.name as parent_name,
                   p.phone as parent_phone
            FROM students s
            LEFT JOIN classes c ON s.class_id = c.id
            LEFT JOIN groups g ON s.group_id = g.id
            LEFT JOIN targets t ON s.target_id = t.id
            LEFT JOIN parents p ON s.parent_id = p.id
            ORDER BY s.name
        ");
        $students = $stmt->fetchAll();
        
        echo json_encode(['success' => true, 'data' => $students]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}

function createStudent($pdo, $input) {
    try {
        $stmt = $pdo->prepare("
            INSERT INTO students (name, gender, class_id, group_id, target_id, parent_id, current_juz, current_ayat, progress) 
            VALUES (?, ?, ?, ?, ?, ?, 0, 'Belum ada hafalan', 0)
        ");
        
        $stmt->execute([
            $input['name'],
            $input['gender'],
            $input['class_id'] ?: null,
            $input['group_id'] ?: null,
            $input['target_id'] ?: null,
            $input['parent_id'] ?: null
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Student created successfully']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}

function updateStudent($pdo, $input) {
    try {
        $stmt = $pdo->prepare("
            UPDATE students 
            SET name = ?, gender = ?, class_id = ?, group_id = ?, target_id = ?, parent_id = ?
            WHERE id = ?
        ");
        
        $stmt->execute([
            $input['name'],
            $input['gender'],
            $input['class_id'] ?: null,
            $input['group_id'] ?: null,
            $input['target_id'] ?: null,
            $input['parent_id'] ?: null,
            $input['id']
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Student updated successfully']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}

function deleteStudent($pdo, $input) {
    try {
        $stmt = $pdo->prepare("DELETE FROM students WHERE id = ?");
        $stmt->execute([$input['id']]);
        
        echo json_encode(['success' => true, 'message' => 'Student deleted successfully']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}
?>