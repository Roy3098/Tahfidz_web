<?php
require_once '../config/database.php';

header('Content-Type: application/json');

try {
    // Get students who don't have a parent assigned yet
    $stmt = $pdo->query("
        SELECT id, name 
        FROM students 
        WHERE parent_id IS NULL 
        ORDER BY name
    ");
    $students = $stmt->fetchAll();
    
    echo json_encode([
        'success' => true,
        'students' => $students
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>