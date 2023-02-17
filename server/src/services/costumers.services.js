import { pool } from "../db/dbConnection.js";

const getCountCostumers = async () => {
    try {
        const [result] = await pool
      .promise()
      .query(
        "SELECT COUNT(ID_Comprador) as cantidadCompradores FROM compradores"
      );
        return result[0];
    } catch (error) {
        throw Error('Error while counting costumers')
    }
}


export default { getCountCostumers }