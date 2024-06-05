<?php
include("conexion/bd.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");



// Obtener el ID enviado por GET y sanitizarlo
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

echo "id enviado $id";

// Verificar que se haya proporcionado el ID
if ($id !== null) {
    // Obtener los datos enviados por POST
    $data = json_decode(file_get_contents("php://input"), true);

    // Verificar que se hayan recibido los datos necesarios
    if (isset($data['servicio'], $data['precio'])) {
        // Sanitizar los datos
        $servicio = $conexion->real_escape_string($data['servicio']);
        $precio = $conexion->real_escape_string($data['precio']);

        // Consulta SQL para actualizar el registro con el ID proporcionado
        $query = "UPDATE `lista_servicios` SET 
            `servicio` = '$servicio', 
            `precio` = '$precio'
            WHERE `Id` = $id";

        // Ejecutar la consulta
        if ($conexion->query($query) === TRUE) {
            echo json_encode(array("message" => "Registro actualizado exitosamente"));

        } else {
            echo json_encode(array("error" => "Error al actualizar el registro: " . $conexion->error));
        }
    } else {
        echo json_encode(array("error" => "No se proporcionaron los datos necesarios para actualizar el registro"));
    }
} else {
    echo json_encode(array("error" => "No se proporcionó el ID necesario para actualizar el registro"));
}

// Cerrar la conexión
$conexion->close();
?>