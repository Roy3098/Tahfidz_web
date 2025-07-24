<?php
session_start();
require_once '../config/database.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user'])) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

try {
    $data = [];
    
    // Get active students count
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM students");
    $data['active_students_count'] = $stmt->fetch()['count'];
    
    // Get top memorizer
    $stmt = $pdo->query("
        SELECT s.*, t.juz_count, c.name as class_name, g.name as group_name
        FROM students s
        LEFT JOIN targets t ON s.target_id = t.id
        LEFT JOIN classes c ON s.class_id = c.id
        LEFT JOIN groups g ON s.group_id = g.id
        ORDER BY s.current_juz DESC, s.progress DESC
        LIMIT 1
    ");
    $data['top_memorizer'] = $stmt->fetch();
    
    // Get recent activities (last 5 attendance records with memorizations)
    $stmt = $pdo->query("
        SELECT a.*, s.name as student_name, g.name as group_name, ses.name as session_name,
               m.juz, m.surah, m.ayat_start, m.ayat_end, m.type, m.quality
        FROM attendance a
        JOIN students s ON a.student_id = s.id
        JOIN groups g ON s.group_id = g.id
        JOIN sessions ses ON a.session_id = ses.id
        LEFT JOIN memorizations m ON a.memorization_id = m.id
        ORDER BY a.created_at DESC
        LIMIT 5
    ");
    $data['recent_activities'] = $stmt->fetchAll();
    
    // Get fastest progress student (most juz gained in last week)
    $stmt = $pdo->query("
        SELECT s.name, COUNT(m.id) as new_juz_count
        FROM students s
        JOIN memorizations m ON s.id = m.student_id
        WHERE m.created_at >= DATE_SUB(NOW(), INTERVAL 1 WEEK)
        GROUP BY s.id, s.name
        ORDER BY new_juz_count DESC
        LIMIT 1
    ");
    $data['fastest_progress'] = $stmt->fetch();
    
    // Get most diligent student (best attendance this month)
    $stmt = $pdo->query("
        SELECT s.name, 
               COUNT(a.id) as total_attendance,
               SUM(CASE WHEN a.status = 'hadir' THEN 1 ELSE 0 END) as present_count,
               ROUND((SUM(CASE WHEN a.status = 'hadir' THEN 1 ELSE 0 END) / COUNT(a.id)) * 100) as attendance_percentage
        FROM students s
        LEFT JOIN attendance a ON s.id = a.student_id AND a.date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
        GROUP BY s.id, s.name
        HAVING total_attendance > 0
        ORDER BY attendance_percentage DESC, present_count DESC
        LIMIT 1
    ");
    $data['most_diligent'] = $stmt->fetch();
    
    echo json_encode(['success' => true, 'data' => $data]);
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>