import { pool } from "../db/dbConnection.js";

const getTransactions = async () => {
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT transacciones.ID_Transaccion, transacciones.Fecha_Compra, eventos_comprador.ID_Evento, transacciones.Precio_Pagado, compradores.Nombre, compradores.Apellidos, compradores.ID_Comprador FROM transacciones, compradores, eventos_comprador WHERE transacciones.ID_Comprador = compradores.ID_Comprador AND eventos_comprador.ID_Comprador = compradores.ID_Comprador GROUP BY compradores.ID_Comprador"
      );
    return result;
  } catch (error) {
    throw Error("Error Getting transactions");
  }
};

const addBuys = async (totalFinalTransaction, order) => {

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
      return [resultTransaction];
    } catch (error) {
      throw Error("Error adding a new buy");
    }
  });
};

export default { getTransactions, addBuys };
