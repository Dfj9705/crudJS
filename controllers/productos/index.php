<?php
    include_once '../../models/Producto.php';
    header("Content-type:application/json; charset=utf-8");


    $metodo = $_SERVER['REQUEST_METHOD'];
    $tipo = $_REQUEST['tipo'];
    try {
        
        switch ($metodo) {
            case 'POST':
                $producto = new Producto($_POST);
                if($tipo ==  1){
                    $resultado = $producto->guardar();
                    $mensaje = "Guardado correctamente";
                }
                if($tipo == 2){
                    $resultado = $producto->modificar();
                    $mensaje = "Modificado correctamente";
    
                }
                if($tipo == 3){
                    $resultado = $producto->eliminar();
                    $mensaje = "Eliminado correctamente";
    
                }

                if($resultado){
                    echo json_encode([
                        "mensaje" => $mensaje,
                        "codigo" => 1,
                    ]);
    
                }else{
                    echo json_encode([
                        "mensaje" => "Ocurrió un error",
                        "codigo" => 0,
                    ]);
                }
                break;
            case 'GET':
                $producto = new Producto($_GET);
                $productos = $producto->buscar();
                echo json_encode($productos);
                break;
            default:
                // http_response_code(405);
                echo json_encode([
                    "mensaje" => "Método no permitido",
                    "codigo" => 9,
                ]); 
                break;
        }
    } catch (Exception $e) {
        echo json_encode([
            "detalle" => $e->getMessage(),
            "mensaje" => "Error de ejecución",
            "codigo" => 0,
        ]); 
    }
    
    exit;