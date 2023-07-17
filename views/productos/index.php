<?php include_once '../../includes/header.php' ?>
<?php include_once '../../includes/navbar.php' ?>
<div class="container">
    <h1 class="text-center">Formulario de productos</h1>
    <div class="row justify-content-center mb-3">
        <form class="col-lg-8 border bg-light p-3">
            <input type="hidden" name="producto_id" id="producto_id">
            <div class="row">
                <div class="col">
                    <div class="alert" role="alert" id="alert">
                        A simple dark alert—check it out!
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <label for="producto_nombre">Nombre del producto</label>
                    <input type="text" name="producto_nombre" id="producto_nombre" class="form-control">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <label for="producto_precio">Precio del producto</label>
                    <input type="number" step="0.01" min="0" name="producto_precio" id="producto_precio" class="form-control">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-lg-3">
                    <button type="submit" class="btn btn-primary w-100">Guardar</button>
                </div>
                <div class="col-lg-3">
                    <button type="button" id="btnBuscar" class="btn btn-info w-100">Buscar</button>
                </div>
                <div class="col-lg-3">
                    <button type="button" id="btnModificar" class="btn btn-warning w-100">Modificar</button>
                </div>
            </div>
        </form>
    </div>
    <h2 class="text-center">Listado de productos</h2>
    <div class="row justify-content-center">
        <div class="col-lg-8 table-responsive">
            <table class="table table-bordered table-hover" id="tablaProductos">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Modificar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="5">No hay productos disponibles</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<script src="/crudJS/src/js/funciones.js"></script>
<script src="/crudJS/src/js/productos/index.js"></script>
<?php include_once '../../includes/footer.php' ?>