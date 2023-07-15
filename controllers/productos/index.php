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
                }
                if($tipo == 2){
                    echo json_encode("modificando");
    
                }
                if($tipo == 3){
                    echo json_encode("eliminando");
    
                }

                if($resultado){
                    echo json_encode([
                        "mensaje" => "Guardado correctamente",
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