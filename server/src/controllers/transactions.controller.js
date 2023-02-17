import { pool } from "../db/dbConnection.js";

export const getTransactions = async (req, res) => {
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT transacciones.ID_Transaccion, transacciones.Fecha_Compra, eventos_comprador.ID_Evento, transacciones.Precio_Pagado, compradores.Nombre, compradores.Apellidos, compradores.ID_Comprador FROM transacciones, compradores, eventos_comprador WHERE transacciones.ID_Comprador = compradores.ID_Comprador AND eventos_comprador.ID_Comprador = compradores.ID_Comprador GROUP BY compradores.ID_Comprador"
      );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const addBuys = async (req, res) => {
  const totalFinalTransaction = req.body.totalFinalTransaction;
  const { order } = req.body;

  try {
    // if(!idComprador || !idProducto || !precioPagado || !impuesto || !impuestoMonto || typeof idComprador !== "number" || typeof idProducto !== "number" || typeof precioPagado !== "number" || typeof impuestoMonto !== "number") throw new Error("Proporcionar los datos correctos")

    const [resultTransaction] = await pool
      .promise()
      .query(
        "INSERT INTO transacciones (Precio_Pagado, ID_Comprador) VALUES (?, ?)",
        [totalFinalTransaction, order[0].idComprador]
      );

    order.map(async (item) => {
      try {
        await pool
          .promise()
          .query(
            "INSERT INTO transacciones_productos (Cantidad, Impuesto, Impuesto_Monto, ID_Producto, ID_Transaccion) VALUES (?, ?, ?, ?, ?)",
            [
              item.cantidad,
              item.impuesto,
              item.montoImpuesto,
              item.ID_Producto,
              resultTransaction.insertId,
            ]
          );
        // Crear evento de compra
        await pool
          .promise()
          .query(
            "INSERT INTO eventos_comprador (Compra, ID_Comprador) VALUES (?, ?)",
            [resultTransaction.insertId, order[0].idComprador]
          );
        res.status(200).json({ message: "Inserted Successfully" });
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const insert500transactions = async (req, res) => {
  /* IMPORTANTE: POR CUESTIONES DE ESPACIO Y SATURACIÓN (DEBIDO A LA LIMITACIÓN DE MI COMPUTADORA) SOLO SE PUEDEN INGRESAR PRODUCTOS POR TANDAS DE 500 EN 500 - EN CASO DE SER MAYOR LA BASE DE DATOS RETORNA UN ERROR */

  // Obtener cantidad de Productos y Compradores
  const [resultOfProducts] = await pool
    .promise()
    .query("SELECT COUNT(productos.ID_Producto) as ID_Producto FROM productos");
  const [resultOfCostumers] = await pool
    .promise()
    .query(
      "SELECT COUNT(compradores.ID_Comprador) as ID_Comprador FROM compradores"
    );

  // Definir los valores al azar que seran agregados
  const countOfProducts = parseInt(Object.values(resultOfProducts[0]));
  const countOfCostumers = parseInt(Object.values(resultOfCostumers[0]));
  const PrecioPagado = [2400, 300, 500, 200, 1500, 900, 7000, 4000, 18000];
  const Impuesto = [
    "IVA",
    "Monotributo",
    "Impuesto a las ganancias",
    "Impuesto de Sellado",
  ];
  const ImpuestoMonto = [250, 300, 150, 175, 245, 500, 400];
  const cantidad = [10, 12, 24, 15, 18, 20, 5, 8, 6];

  const iteracionesInsercion = 500;

  // Iteración para obtener cada fila de forma diferente pero que el producto y el comprador este relacionado con un campo existente en las tablas correspondientes
  for (var i = 0; i < iteracionesInsercion; i++) {
    const randomProducto = Math.floor(Math.random() * countOfProducts + 1);
    const randomComprador = Math.floor(Math.random() * countOfCostumers + 1);
    const randomPrecio = Math.floor(Math.random() * PrecioPagado.length);
    const randomImpuesto = Math.floor(Math.random() * Impuesto.length);
    const randomImpuestoMonto = Math.floor(
      Math.random() * ImpuestoMonto.length
    );
    const randomCantidad = Math.floor(Math.random() * cantidad.length);

    // Ejecutar la consulta el numero de veces que se indica en el ciclo for y hacer la validación de errores con catch
    try {
      const [resultBuy] = await pool
        .promise()
        .query(
          "INSERT INTO transacciones (Precio_Pagado, ID_Comprador) VALUES (?, ?)",
          [PrecioPagado[randomPrecio], randomComprador]
        );

      await pool
        .promise()
        .query(
          "INSERT INTO transacciones_productos (Cantidad, Impuesto, Impuesto_Monto, ID_Producto, ID_Transaccion) VALUES (?, ?, ?, ?, ?)",
          [
            cantidad[randomCantidad],
            Impuesto[randomImpuesto],
            ImpuestoMonto[randomImpuestoMonto],
            randomProducto,
            resultBuy.insertId,
          ]
        );
    } catch (error) {
      console.log(error);
    }
  }
  res.send("ok");
};
