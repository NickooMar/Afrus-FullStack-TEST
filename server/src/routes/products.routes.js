import express from "express";

import {
  getProducts,
  insert500Products,
  addProduct,
  deleteProduct,
  getCountProducts,
  getProduct,
} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/count", getCountProducts);
router.post("/", addProduct);
router.post("/find-one", getProduct);
router.delete("/", deleteProduct);

/* 
Desactivar la ruta de inserción para que no se sature la base de datos, ya que al ser llamado el end point insertara 500 datos en la tabla
 router.get("/insert", insert500Products); 
*/

export default router;
