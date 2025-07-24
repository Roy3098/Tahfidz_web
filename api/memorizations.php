<?php
session_start();
require_once '../config/database.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user']) || $_SESSION['user']['type'] !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getMemorizations($pdo);
        break;
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        createMemorization($pdo, $input);
        break;
    case 'DELETE':
        $input = json_decode(file_get_contents('php://input'), true);
        deleteMemorization($pdo, $input);
        break;
    default:
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}

function getMemorizations($pdo) {
    try {
        $stmt = $pdo->query("
            SELECT m.*, s.name as student_name, u.name as recorded_by_name
            FROM memorizations m
            JOIN students s ON m.student_id = s.id
            LEFT JOIN users u ON m.recorded_by = u.id
            ORDER BY m.created_at DESC
        ");
        $memorizations = $stmt->fetchAll();
        
        echo json_encode(['success' => true, 'data' => $memorizations]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}

function createMemorization($pdo, $input) {
    try {
        $pdo->beginTransaction();
        
        // Insert memorization record
        $stmt = $pdo->prepare("
            INSERT INTO memorizations (student_id, juz, surah, surah_id, ayat_start, ayat_end, type, quality, notes, recorded_by) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $input['student_id'],
            $input['juz'],
            $input['surah'],
            $input['surah_id'],
            $input['ayat_start'],
            $input['ayat_end'],
            $input['type'],
            $input['quality'],
            $input['notes'] ?? null,
            $_SESSION['user']['id']
        ]);
        
        $memorization_id = $pdo->lastInsertId();
        
        // Update student's current progress
        $current_ayat_text = "Juz {$input['juz']} - {$input['surah']} ayat {$input['ayat_end']}";
        
        // Get target juz count for progress calculation
        $stmt = $pdo->prepare("
            SELECT t.juz_count 
            FROM students s 
            JOIN targets t ON s.target_id = t.id 
            WHERE s.id = ?
        ");
        $stmt->execute([$input['student_id']]);
        $target = $stmt->fetch();
        $target_juz_count = $target['juz_count'] ?? 30;
        
        $progress = min(100, round(($input['juz'] / $target_juz_count) * 100));
        
        $stmt = $pdo->prepare("
            UPDATE students 
            SET current_juz = ?, current_ayat = ?, progress = ?
            WHERE id = ?
        ");
        $stmt->execute([$input['juz'], $current_ayat_text, $progress, $input['student_id']]);
        
        $pdo->commit();
        
        echo json_encode(['success' => true, 'message' => 'Memorization recorded successfully', 'id' => $memorization_id]);
    } catch (Exception $e) {
        $pdo->rollback();
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}

function deleteMemorization($pdo, $input) {
    try {
        $stmt = $pdo->prepare("DELETE FROM memorizations WHERE id = ?");
        $stmt->execute([$input['id']]);
        
        echo json_encode(['success' => true, 'message' => 'Memorization deleted successfully']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}
?>