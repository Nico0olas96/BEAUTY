<?php
    // Datos de conexión
    $servername = "localhost"; // Cambia esto por el nombre del servidor de tu base de datos
    $username = "root"; // Cambia esto por tu nombre de usuario de MySQL
    $password = ""; // Cambia esto por tu contraseña de MySQL
    $dbname = "beauty"; // Cambia esto por el nombre de tu base de datos

    // Crear conexión
    try{
        
        $conexion = new mysqli($servername, $username, $password, $dbname);


    }catch(Exception $error){
        echo $error -> getMessage();
    }

?>