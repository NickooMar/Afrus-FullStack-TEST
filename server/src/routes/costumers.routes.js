import express from "express";
import { addCostumer, getCostumers, insert500Costumers, getCostumer, getCountCostumers } from "../controllers/costumers.controller.js";

const router = express.Router();

router.get('/', getCostumers)
router.get('/count', getCountCostumers)
router.post('/', addCostumer)
router.post('/find-one', getCostumer)

/*
Desactivar la ruta de inserción para que no se sature la base de datos, ya que al ser llamado el end point insertara 500 datos en la tabla
    router.get("/insert", insert500Costumers);  
*/

export default router