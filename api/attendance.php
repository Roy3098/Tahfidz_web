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
        getAttendance($pdo);
        break;
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        createAttendance($pdo, $input);
        break;
    case 'DELETE':
        $input = json_decode(file_get_contents('php://input'), true);
        deleteAttendance($pdo, $input);
        break;
    default:
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}

function getAttendance($pdo) {
    $student_id = $_GET['student_id'] ?? null;
    
    try {
        $sql = "
            SELECT a.*, s.name as student_name, g.name as group_name, ses.name as session_name,
                   m.juz, m.surah, m.ayat_start, m.ayat_end, m.type, m.quality, m.notes
            FROM attendance a
            JOIN students s ON a.student_id = s.id
            JOIN groups g ON s.group_id = g.id
            JOIN sessions ses ON a.session_id = ses.id
            LEFT JOIN memorizations m ON a.memorization_id = m.id
        ";
        
        if ($student_id && $_SESSION['user']['type'] === 'parent') {
            $sql .= " WHERE s.id = ? AND s.parent_id = ?";
            $stmt = $pdo->prepare($sql . " ORDER BY a.date DESC");
            $stmt->execute([$student_id, $_SESSION['user']['id']]);
        } else {
            $stmt = $pdo->prepare($sql . " ORDER BY a.date DESC");
            $stmt->execute();
        }
        
        $attendance = $stmt->fetchAll();
        
        echo json_encode(['success' => true, 'data' => $attendance]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}

function createAttendance($pdo, $input) {
    if ($_SESSION['user']['type'] !== 'admin') {
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        return;
    }
    
    try {
        $pdo->beginTransaction();
        
        $attendance_records = $input['attendance_records'] ?? [];
        
        foreach ($attendance_records as $record) {
            $memorization_id = null;
            
            // If attendance is 'hadir' and memorization data exists
            if ($record['status'] === 'hadir' && isset($record['memorization'])) {
                $mem = $record['memorization'];
                
                // Create memorization record first
                $stmt = $pdo->prepare("
                    INSERT INTO memorizations (student_id, juz, surah, surah_id, ayat_start, ayat_end, type, quality, notes, recorded_by) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ");
                
                $stmt->execute([
                    $record['student_id'],
                    $mem['juz'],
                    $mem['surah'],
                    $mem['surah_id'],
                    $mem['ayat_start'],
                    $mem['ayat_end'],
                    $mem['type'],
                    $mem['quality'],
                    $mem['notes'] ?? null,
                    $_SESSION['user']['id']
                ]);
                
                $memorization_id = $pdo->lastInsertId();
                
                // Update student's progress
                $current_ayat_text = "Juz {$mem['juz']} - {$mem['surah']} ayat {$mem['ayat_end']}";
                
                $stmt = $pdo->prepare("
                    SELECT t.juz_count 
                    FROM students s 
                    JOIN targets t ON s.target_id = t.id 
                    WHERE s.id = ?
                ");
                $stmt->execute([$record['student_id']]);
                $target = $stmt->fetch();
                $target_juz_count = $target['juz_count'] ?? 30;
                
                $progress = min(100, round(($mem['juz'] / $target_juz_count) * 100));
                
                $stmt = $pdo->prepare("
                    UPDATE students 
                    SET current_juz = ?, current_ayat = ?, progress = ?
                    WHERE id = ?
                ");
                $stmt->execute([$mem['juz'], $current_ayat_text, $progress, $record['student_id']]);
            }
            
            // Insert or update attendance record
            $stmt = $pdo->prepare("
                INSERT INTO attendance (student_id, session_id, date, status, time_status, memorization_id, recorded_by) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE 
                status = VALUES(status), 
                time_status = VALUES(time_status), 
                memorization_id = VALUES(memorization_id),
                recorded_by = VALUES(recorded_by)
            ");
            
            $stmt->execute([
                $record['student_id'],
                $record['session_id'],
                $record['date'],
                $record['status'],
                $record['time_status'] ?? 'N/A',
                $memorization_id,
                $_SESSION['user']['id']
            ]);
        }
        
        $pdo->commit();
        
        echo json_encode(['success' => true, 'message' => 'Attendance recorded successfully']);
    } catch (Exception $e) {
        $pdo->rollback();
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}

function deleteAttendance($pdo, $input) {
    if ($_SESSION['user']['type'] !== 'admin') {
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        return;
    }
    
    try {
        $stmt = $pdo->prepare("DELETE FROM attendance WHERE id = ?");
        $stmt->execute([$input['id']]);
        
        echo json_encode(['success' => true, 'message' => 'Attendance deleted successfully']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}
?>