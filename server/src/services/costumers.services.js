import { pool } from "../db/dbConnection.js";

const getCostumers = async () => {
  try {
    const [result] = await pool.promise().query("SELECT * FROM compradores");
    return result;
  } catch (error) {
    throw Error("Error getting costumers list");
  }
};

const getCountCostumers = async () => {
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT COUNT(ID_Comprador) as cantidadCompradores FROM compradores"
      );
    return result[0];
  } catch (error) {
    throw Error("Error while counting costumers");
  }
};

const getTipoComprador = async () => {
  try {
    const [result] = await pool
      .promise()
      .query("SELECT DISTINCT compradores.Tipo_Comprador FROM compradores");
    return result;
  } catch (error) {
    throw Error("Error while getting costumer type");
  }
};

export const getCostumer = async (id) => {
  try {
    const [result] = await pool
      .promise()
      .query("SELECT * FROM compradores WHERE ID_Comprador = (?)", id);
    return result;
  } catch (error) {
    throw Error("Error getting specific costumer");
  }
};

export const filterCostumer = async (fechaCompra) => {
    try {
        const [results] = await pool
      .promise()
      .query(
        "SELECT COUNT(transacciones.ID_Comprador) as cantidadCompras, compradores.ID_Comprador, compradores.Nombre, compradores.Apellidos, compradores.Tipo_Comprador, compradores.Fecha_Creacion, transacciones.Fecha_Compra FROM compradores, transacciones WHERE compradores.ID_Comprador = transacciones.ID_Comprador AND MONTH(transacciones.Fecha_Compra) = MONTH(?) GROUP BY transacciones.ID_Comprador;",
        [fechaCompra]
      );
      return results
    } catch (error) {
        throw Error("Error filtering costumer")
    }
}

export const listCostumers = async () => {
    try {
        const [result] = await pool
        .promise()
        .query(
          "SELECT * FROM compradores JOIN transacciones ON compradores.ID_Comprador = transacciones.ID_Comprador ORDER BY transacciones.ID_Comprador ASC"
        );
        return result
    } catch (error) {
        throw Error("Error listing all costumers")
    }
}

export const addCostumer = async (nombreComprador, apellidosComprador, tipoComprador) => {
    try {
        const [result] = await pool
      .promise()
      .query(
        "INSERT INTO compradores (Nombre, Apellidos, Tipo_Comprador) VALUES (?, ?, ?)",
        [nombreComprador, apellidosComprador, tipoComprador]
      );
      return result
    } catch (error) {
        throw Error("Error adding a new costumer")
    }
}

export default {
  getCountCostumers,
  getTipoComprador,
  getCostumers,
  getCostumer,
  filterCostumer,
  listCostumers,
  addCostumer
};
