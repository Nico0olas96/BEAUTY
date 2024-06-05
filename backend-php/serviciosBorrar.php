<?php
include("conexion/bd.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");


// Verificar si se recibió el parámetro 'id' en la URL
if(isset($_GET['id'])) {
    // Obtener el ID del registro a eliminar
    $id = $_GET['id'];
    
    // Consulta SQL para eliminar el registro con el ID proporcionado
    $query = "DELETE FROM `lista_servicios` WHERE `lista_servicios`.`Id` = $id";

    // Ejecutar la consulta
    if($conexion->query($query) === TRUE) {
        echo "Registro eliminado exitosamente";
    } else {
        echo "Error al eliminar el registro: " . $conexion->error;
    }
} else {
    echo "No se proporcionó el ID del registro a eliminar";
}

// Cerrar la conexión
$conexion->close();

?>
