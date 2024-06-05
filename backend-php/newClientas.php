<?php
include 'conexion/bd.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Manejar solicitudes preflight de CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Verificar si la solicitud es de tipo POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recuperar datos del cuerpo de la solicitud JSON
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['nombre']) && isset($data['servicio']) && isset($data['precio'])) {
        $nombre = $data['nombre']; 
        $servicio = $data['servicio']; 
        $precio = $data['precio'];

        // Insertar el cliente en la base de datos
        $sql = "INSERT INTO clientas (fecha, nombre, servicio, precio) VALUES (NOW(), ?, ?, ?)";

        $statement = $conexion->prepare($sql);
        
        // Verificar si la preparación de la consulta tuvo éxito
        if ($statement) {
            // Enlazar parámetros y ejecutar la consulta
            $statement->bind_param("sss", $nombre, $servicio, $precio);
            if ($statement->execute()) {
                // Éxito al guardar los datos
                echo json_encode(array('message' => 'Cliente agregado exitosamente'));
            } else {
                // Error al ejecutar la consulta
                echo json_encode(array('error' => 'Error al agregar el cliente: ' . $statement->error));
            }
        } else {
            // Error en la preparación de la consulta
            echo json_encode(array('error' => 'Error al preparar la consulta: ' . $conexion->error));
        }

        // Cerrar la declaración
        $statement->close();
    } else {
        // Datos no válidos
        echo json_encode(array('error' => 'Datos no válidos'));
    }
} else {
    // Método de solicitud no válido
    echo json_encode(array('error' => 'Método de solicitud no válido'));
}

// Cerrar conexión
$conexion->close();
?>
