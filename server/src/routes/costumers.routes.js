import express from "express";
import { addCostumer, getCostumers, insert500Costumers } from "../controllers/costumers.controller.js";

const router = express.Router();

router.get('/', getCostumers)
router.post('/', addCostumer)

/*
Desactivar la ruta de inserción para que no se sature la base de datos, ya que al ser llamado el end point insertara 500 datos en la tabla
router.get("/insert", insert500Costumers);
*/

export default router