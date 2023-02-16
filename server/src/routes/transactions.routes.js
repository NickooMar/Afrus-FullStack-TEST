import express from "express";
import { insert500transactions, addBuys } from "../controllers/transactions.controller.js";

const router = express.Router();

router.post("/", addBuys);


/*
Desactivar la ruta de inserción para que no se sature la base de datos, ya que al ser llamado el end point insertara 500 datos en la tabla
router.get("/insert", insert500transactions);
*/

export default router