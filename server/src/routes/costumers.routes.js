import express from "express";
import {
  addCostumer,
  getCostumers,
  insert500Costumers,
  getCostumer,
  getCountCostumers,
  filterCostumer,
  getTipoComprador,
  listCostumers,
} from "../controllers/costumers.controller.js";

const router = express.Router();

router.get("/", getCostumers);
router.get("/list", listCostumers);
router.get("/count", getCountCostumers);
router.get("/type", getTipoComprador);
router.post("/", addCostumer);
router.post("/find-one", getCostumer);
router.post("/filter", filterCostumer);

/*
Desactivar la ruta de inserción para que no se sature la base de datos, ya que al ser llamado el end point insertara 500 datos en la tabla
    router.get("/insert", insert500Costumers);  
*/

export default router;
