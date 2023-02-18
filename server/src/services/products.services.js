import { pool } from "../db/dbConnection.js";

const getProducts = async () => {
  try {
    const [result] = await pool.promise().query("SELECT * FROM productos");
    return result;
  } catch (error) {
    throw Error("Error getting products");
  }
};

const getProduct = async (id) => {
  try {
    const [result] = await pool
      .promise()
      .query("SELECT * FROM productos WHERE ID_Producto = (?)", id);
    return result;
  } catch (error) {
    throw Error("Error getting the specific product");
  }
};

const getCountProducts = async () => {
  try {
    const [resultCount] = await pool
      .promise()
      .query("SELECT MAX(ID_Producto) as cantidadProductos FROM productos");
    return resultCount[0];
  } catch (error) {
    throw Error("Error getting the total count of products");
  }
};

const getFilteredProducts = {
  priceGTquantityGT: async (precioProducto, cantidadProducto) => {
    try {
      const [result] = await pool
        .promise()
        .query(
          "SELECT * FROM productos WHERE productos.Precio >= (?) AND productos.Cantidad_Stock >= (?)",
          [precioProducto, cantidadProducto]
        );
      return result;
    } catch (error) {
      throw Error("Error in the query");
    }
  },
  priceGTquantityLT: async (precioProducto, cantidadProducto) => {
    try {
      const [result] = await pool
        .promise()
        .query(
          "SELECT * FROM productos WHERE productos.Precio >= (?) AND productos.Cantidad_Stock <= (?)",
          [precioProducto, cantidadProducto]
        );
      return result;
    } catch (error) {
      throw Error("Error in the query");
    }
  },
  priceLTquantityGT: async (precioProducto, cantidadProducto) => {
    try {
      const [result] = await pool
        .promise()
        .query(
          "SELECT * FROM productos WHERE productos.Precio <= (?) AND productos.Cantidad_Stock >= (?)",
          [precioProducto, cantidadProducto]
        );
      return result;
    } catch (error) {
      throw Error("Error in the query");
    }
  },
  priceLTquantityLT: async (precioProducto, cantidadProducto) => {
    try {
      const [result] = await pool
        .promise()
        .query(
          "SELECT * FROM productos WHERE productos.Precio <= (?) AND productos.Cantidad_Stock <= (?)",
          [precioProducto, cantidadProducto]
        );
      return result;
    } catch (error) {
      throw Error("Error in the query");
    }
  },
};

const addProduct = async (
  nombreProducto,
  descripcionProducto,
  precioProducto,
  cantidadProducto
) => {
  try {
    const [result] = await pool
      .promise()
      .query(
        "INSERT INTO productos (Nombre, Descripcion, Precio, Cantidad_Stock) VALUES (?, ?, ?, ?)",
        [nombreProducto, descripcionProducto, precioProducto, cantidadProducto]
      );
    return result;
  } catch (error) {
    throw Error("Error adding a new product");
  }
};

const deleteProduct = async (id) => {
  try {
    const [result] = await pool
      .promise()
      .query("DELETE FROM productos WHERE ID_Producto = ?", id);
    return result;
  } catch (error) {
    throw Error("Error deleting product");
  }
};

export default {
  getProducts,
  getProduct,
  getCountProducts,
  getFilteredProducts,
  addProduct,
  deleteProduct,
};
