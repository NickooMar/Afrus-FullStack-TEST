import { pool } from "../db/dbConnection.js";

export const getEvent = async (req, res) => {
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT * FROM eventos_comprador, compradores WHERE eventos_comprador.ID_Comprador = compradores.ID_Comprador GROUP BY eventos_comprador.ID_Comprador"
      );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: error.message });
  }
};
