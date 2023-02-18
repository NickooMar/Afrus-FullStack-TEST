import { pool } from "../db/dbConnection.js";

const getEvent = async () => {
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT * FROM eventos_comprador, compradores WHERE eventos_comprador.ID_Comprador = compradores.ID_Comprador GROUP BY eventos_comprador.ID_Comprador"
      );
    return result;
  } catch (error) {
    throw Error("Error getting the event");
  }
};

export default { getEvent };
