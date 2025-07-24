<?php
session_start();
require_once '../config/database.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user']) || $_SESSION['user']['type'] !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);
$type = $input['type'] ?? $_GET['type'] ?? '';

switch ($method) {
    case 'GET':
        getMasterData($pdo, $type);
        break;
    case 'POST':
        createMasterData($pdo, $type, $input);
        break;
    case 'PUT':
        updateMasterData($pdo, $type, $input);
        break;
    case 'DELETE':
        deleteMasterData($pdo, $type, $input);
        break;
    default:
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}

function getMasterData($pdo, $type) {
    try {
        switch ($type) {
            case 'classes':
                $stmt = $pdo->query("SELECT c.*, COUNT(s.id) as student_count FROM classes c LEFT JOIN students s ON c.id = s.class_id GROUP BY c.id ORDER BY c.name");
                break;
            case 'groups':
                $stmt = $pdo->query("SELECT g.*, COUNT(s.id) as student_count FROM groups g LEFT JOIN students s ON g.id = s.group_id GROUP BY g.id ORDER BY g.name");
                break;
            case 'targets':
                $stmt = $pdo->query("SELECT t.*, COUNT(s.id) as student_count FROM targets t LEFT JOIN students s ON t.id = s.target_id GROUP BY t.id ORDER BY t.juz_count DESC");
                break;
            case 'sessions':
                $stmt = $pdo->query("SELECT s.*, COUNT(DISTINCT a.student_id) as student_count FROM sessions s LEFT JOIN attendance a ON s.id = a.session_id GROUP BY s.id ORDER BY s.start_time");
                break;
            case 'all':
                $data = [];
                $data['classes'] = $pdo->query("SELECT * FROM classes ORDER BY name")->fetchAll();
                $data['groups'] = $pdo->query("SELECT * FROM groups ORDER BY name")->fetchAll();
                $data['targets'] = $pdo->query("SELECT * FROM targets ORDER BY juz_count DESC")->fetchAll();
                $data['sessions'] = $pdo->query("SELECT * FROM sessions ORDER BY start_time")->fetchAll();
                $data['parents'] = $pdo->query("SELECT id, name, email FROM parents ORDER BY name")->fetchAll();
                echo json_encode(['success' => true, 'data' => $data]);
                return;
            default:
                echo json_encode(['success' => false, 'message' => 'Invalid type']);
                return;
        }
        
        $data = $stmt->fetchAll();
        echo json_encode(['success' => true, 'data' => $data]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}

function createMasterData($pdo, $type, $input) {
    try {
        switch ($type) {
            case 'class':
                $stmt = $pdo->prepare("INSERT INTO classes (name, level, teacher) VALUES (?, ?, ?)");
                $stmt->execute([$input['name'], $input['level'], $input['teacher']]);
                break;
            case 'group':
                $stmt = $pdo->prepare("INSERT INTO groups (name, teacher) VALUES (?, ?)");
                $stmt->execute([$input['name'], $input['teacher']]);
                break;
            case 'target':
                $stmt = $pdo->prepare("INSERT INTO targets (name, juz_count) VALUES (?, ?)");
                $stmt->execute([$input['name'], $input['juz_count']]);
                break;
            case 'session':
                $stmt = $pdo->prepare("INSERT INTO sessions (name, start_time, end_time, status) VALUES (?, ?, ?, ?)");
                $stmt->execute([$input['name'], $input['start_time'], $input['end_time'], $input['status'] ?? 'active']);
                break;
            default:
                echo json_encode(['success' => false, 'message' => 'Invalid type']);
                return;
        }
        
        echo json_encode(['success' => true, 'message' => ucfirst($type) . ' created successfully']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}

function updateMasterData($pdo, $type, $input) {
    try {
        switch ($type) {
            case 'class':
                $stmt = $pdo->prepare("UPDATE classes SET name = ?, level = ?, teacher = ? WHERE id = ?");
                $stmt->execute([$input['name'], $input['level'], $input['teacher'], $input['id']]);
                break;
            case 'group':
                $stmt = $pdo->prepare("UPDATE groups SET name = ?, teacher = ? WHERE id = ?");
                $stmt->execute([$input['name'], $input['teacher'], $input['id']]);
                break;
            case 'target':
                $stmt = $pdo->prepare("UPDATE targets SET name = ?, juz_count = ? WHERE id = ?");
                $stmt->execute([$input['name'], $input['juz_count'], $input['id']]);
                break;
            case 'session':
                $stmt = $pdo->prepare("UPDATE sessions SET name = ?, start_time = ?, end_time = ?, status = ? WHERE id = ?");
                $stmt->execute([$input['name'], $input['start_time'], $input['end_time'], $input['status'], $input['id']]);
                break;
            default:
                echo json_encode(['success' => false, 'message' => 'Invalid type']);
                return;
        }
        
        echo json_encode(['success' => true, 'message' => ucfirst($type) . ' updated successfully']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}

function deleteMasterData($pdo, $type, $input) {
    try {
        switch ($type) {
            case 'class':
                $stmt = $pdo->prepare("DELETE FROM classes WHERE id = ?");
                break;
            case 'group':
                $stmt = $pdo->prepare("DELETE FROM groups WHERE id = ?");
                break;
            case 'target':
                $stmt = $pdo->prepare("DELETE FROM targets WHERE id = ?");
                break;
            case 'session':
                $stmt = $pdo->prepare("DELETE FROM sessions WHERE id = ?");
                break;
            default:
                echo json_encode(['success' => false, 'message' => 'Invalid type']);
                return;
        }
        
        $stmt->execute([$input['id']]);
        echo json_encode(['success' => true, 'message' => ucfirst($type) . ' deleted successfully']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}
?>