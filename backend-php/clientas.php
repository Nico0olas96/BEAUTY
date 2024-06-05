<?php
// Incluir el archivo bd.php que contiene la conexión a la base de datos
include 'conexion/bd.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');


// Consulta SQL para obtener los datos de la tabla 'mesasexamenes'
$sql = "SELECT * FROM `clientas`";

$result = $conexion->query($sql);

if ($result->num_rows > 0) {
    // Convertir los datos en un array asociativo
    $data = array();
    while($row = $result->fetch_assoc()) {
        // Aquí puedes realizar cualquier manipulación adicional de los datos si es necesario
        
        // Añadir cada fila al array de datos
        $data[] = $row;
    }
    
    // Devolver los datos en formato JSON

    header('Content-Type: application/json');
    echo json_encode($data);

} else {
    echo "No se encontraron registros";
}

// Cerrar la conexión (si es necesario)
$conexion->close();
?>