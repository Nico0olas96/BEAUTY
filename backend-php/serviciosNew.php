<?php
include("conexion/bd.php");

header("Access-Control-Allow-Origin: *");

// Verificar si se ha recibido la información del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $servicio = $_POST["servicio"];
    $precio = $_POST["precio"];

    // Preparar la consulta SQL para insertar un nuevo servicio
    $sql = "INSERT INTO lista_servicios (servicio, precio) VALUES (?, ?)";
    
    // Preparar la sentencia
    $stmt = $conexion->prepare($sql);
    
    // Vincular los parámetros
    $stmt->bind_param("ss", $servicio, $precio);
    
    // Ejecutar la sentencia
    if ($stmt->execute()) {
        // Si la inserción fue exitosa
        echo json_encode(array("status" => "success"));
    } else {
        // Si ocurrió un error durante la inserción
        echo json_encode(array("status" => "error", "message" => "Error al insertar el servicio"));
    }
    
    // Cerrar la sentencia
    $stmt->close();
}

// Cerrar la conexión
$conexion->close();
?>
