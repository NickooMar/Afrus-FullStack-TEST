import { pool } from "../db/dbConnection.js";


// Agregar Compra
// INSERT INTO transacciones (Precio_Pagado, Impuesto, Impuesto_Monto, ID_Comprador, ID_Producto) VALUES (?, ?, ?, ?, ?)


export const addBuys = async (req, res) => {
    const { idComprador, idProducto, precioPagado, impuesto, impuestoMonto } = req.body;

    try {
        if(!idComprador || !idProducto || !precioPagado || !impuesto || !impuestoMonto || typeof idComprador !== "number" || typeof idProducto !== "number" || typeof precioPagado !== "number" || typeof impuestoMonto !== "number") throw new Error("Proporcionar los datos correctos")
        
        const [resultTransaction] = await pool
          .promise()
          .query(
            "INSERT INTO transacciones (ID_Comprador, ID_Producto, Precio_Pagado, Impuesto, Impuesto_Monto) VALUES (?, ?, ?, ?, ?)",
            [idComprador, idProducto, precioPagado, impuesto, impuestoMonto]
          );

            // Crear evento de compra
            await pool
              .promise()
              .query(
                "INSERT INTO eventos_comprador (Compra, ID_Comprador) VALUES (?, ?)",
                [resultTransaction.insertId, idComprador]
              );

        res.status(200).json({ message: "Inserted Successfully" });
        

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }


}






export const insert500transactions = async(req, res) => {

  /* IMPORTANTE: POR CUESTIONES DE ESPACIO Y SATURACIÓN (DEBIDO A LA LIMITACIÓN DE MI COMPUTADORA) SOLO SE PUEDEN INGRESAR PRODUCTOS POR TANDAS DE 500 EN 500 - EN CASO DE SER MAYOR LA BASE DE DATOS RETORNA UN ERROR */

    // Obtener cantidad de Productos y Compradores 
    const [resultOfProducts] = await pool.promise().query("SELECT COUNT(productos.ID_Producto) as ID_Producto FROM productos")
    const [resultOfCostumers] = await pool.promise().query("SELECT COUNT(compradores.ID_Comprador) as ID_Comprador FROM compradores")
    
    // Definir los valores al azar que seran agregados
    const countOfProducts = parseInt(Object.values(resultOfProducts[0]))
    const countOfCostumers = parseInt(Object.values(resultOfCostumers[0]))
    const PrecioPagado = [2400, 300, 500, 200, 1500, 900, 7000, 4000, 18000] 
    const Impuesto = ['IVA', 'Monotributo', 'Impuesto a las ganancias', 'Impuesto de Sellado']
    const ImpuestoMonto = [250, 300, 150, 175, 245, 500, 400]

    const iteracionesInsercion = 500

    // Iteración para obtener cada fila de forma diferente pero que el producto y el comprador este relacionado con un campo existente en las tablas correspondientes
    for(var i = 0; i < iteracionesInsercion; i++){
        const randomProducto = Math.floor(Math.random() * countOfProducts)
        const randomComprador = Math.floor(Math.random() * countOfCostumers)
        const randomPrecio = Math.floor(Math.random() * PrecioPagado.length)
        const randomImpuesto = Math.floor(Math.random() * Impuesto.length)
        const randomImpuestoMonto = Math.floor(Math.random() * ImpuestoMonto.length)
        
        // Ejecutar la consulta el numero de veces que se indica en el ciclo for y hacer la validación de errores con catch
        try {
            await pool.promise().query("INSERT INTO transacciones (Precio_Pagado, Impuesto, Impuesto_Monto, ID_Comprador, ID_Producto) VALUES (?, ?, ?, ?, ?)", [PrecioPagado[randomPrecio], Impuesto[randomImpuesto], ImpuestoMonto[randomImpuestoMonto], randomComprador, randomProducto])
        } catch (error) {
            console.log(error)
        }
    }
    res.send("ok");
}