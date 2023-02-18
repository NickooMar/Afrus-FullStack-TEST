import express from "express";

import {
  getProducts,
  addProduct,
  deleteProduct,
  getCountProducts,
  getProduct,
  getFilteredProducts,
  // insert500Products,
} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/count", getCountProducts);
router.post("/filtered", getFilteredProducts);
router.post("/", addProduct);
router.post("/find-one", getProduct);
router.delete("/", deleteProduct);

/* 
Desactivar la ruta de inserción para que no se sature la base de datos, ya que al ser llamado el end point insertara 500 datos en la tabla
  router.get("/insert", insert500Products); 
*/

export default router;
