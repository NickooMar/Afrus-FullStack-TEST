import { pool } from "../db/dbConnection.js";
import productsServices from "../services/products.services.js";

export const getProducts = async (req, res) => {
  try {
    const result = await productsServices.getProducts();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id || typeof id !== "number") throw new Error("ID must be provided");
    const result = await productsServices.getProduct(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCountProducts = async (req, res) => {
  try {
    const resultCount = await productsServices.getCountProducts();
    return res.status(200).json(resultCount.cantidadProductos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getFilteredProducts = async (req, res) => {
  const {
    precioProducto,
    cantidadProducto,
    propiedadBusquedaPrecio,
    propiedadBusquedaCantidad,
  } = req.body.filtroProducto;

  try {
    if (
      propiedadBusquedaPrecio === "MAYOR" &&
      propiedadBusquedaCantidad === "MAYOR"
    ) {
      const result =
        await productsServices.getFilteredProducts.priceGTquantityGT(
          Number(precioProducto),
          Number(cantidadProducto)
        );
      return res.status(200).json({ result });
    } else if (
      propiedadBusquedaPrecio === "MENOR" &&
      propiedadBusquedaCantidad === "MENOR"
    ) {
      const result =
        await productsServices.getFilteredProducts.priceLTquantityLT(
          Number(precioProducto),
          Number(cantidadProducto)
        );
      return res.status(200).json({ result });
    } else if (
      propiedadBusquedaPrecio === "MENOR" &&
      propiedadBusquedaCantidad === "MAYOR"
    ) {
      const result =
        await productsServices.getFilteredProducts.priceLTquantityGT(
          Number(precioProducto),
          Number(cantidadProducto)
        );
      return res.status(200).json({ result });
    } else if (
      propiedadBusquedaPrecio === "MAYOR" &&
      propiedadBusquedaCantidad === "MENOR"
    ) {
      const result =
        await productsServices.getFilteredProducts.priceGTquantityLT(
          Number(precioProducto),
          Number(cantidadProducto)
        );
      return res.status(200).json({ result });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const {
      nombreProducto,
      descripcionProducto,
      precioProducto,
      cantidadProducto,
    } = req.body.nuevoProducto;

    if (
      !nombreProducto ||
      !descripcionProducto ||
      !precioProducto ||
      !cantidadProducto ||
      typeof nombreProducto !== "string" ||
      typeof descripcionProducto !== "string" ||
      typeof precioProducto !== "string" ||
      typeof cantidadProducto !== "string"
    )
      throw new Error("Proporcionar los datos correctos");

    await productsServices.addProduct(
      nombreProducto,
      descripcionProducto,
      precioProducto,
      cantidadProducto
    );
    return res.status(200).json({ message: "Inserted Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id || typeof id !== "number")
      throw new Error("Debe proporcionar un ID");

    const result = await productsServices.deleteProduct(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(200).json("Deleted Successfully");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Insertar 500 productos random
// export const insert500Products = async (req, res) => {
//   /* IMPORTANTE: POR CUESTIONES DE ESPACIO Y SATURACI??N (DEBIDO A LA LIMITACI??N DE MI COMPUTADORA) SOLO SE PUEDEN INGRESAR PRODUCTOS POR TANDAS DE 500 EN 500 - EN CASO DE SER MAYOR LA BASE DE DATOS RETORNA UN ERROR */

//   // Definir los posibles datos al azar que ser??n insertados
//   const NombresProductos = [
//     "Monitor RGB 144Hz",
//     "Teclado RGB HyperX",
//     "Mouse Wireless",
//     "Gabinete RGB",
//     "DJ Controller",
//     "Ergonomic Chair",
//     "GTX 1090 RGB",
//     "Cooler Sentey",
//     "Gigabyte Ultradurable",
//     "Joystick PS4",
//   ];
//   const DescripcionProductos = [
//     "Ultima Generaci??n en electronica",
//     "El mejor confort",
//     "La cuspide de la evoluci??n",
//     "Nuevo lanzamiento",
//     "Maximo rendimiento",
//     "Eficiencia pura",
//   ];
//   const PreciosProductos = [2400, 300, 500, 200, 1500, 900, 7000, 4000, 18000];
//   const CantidadStock = [20, 25, 30, 12, 18, 24, 50, 100, 22, 14];

//   // Cantidad de inserciones a realizar
//   const iteracionesInsercion = 500;

//   // Iteraci??n para generar los datos al azar a partir de los arrays definidos anteriormente, luego ingresar esos datos y manejar los errores con el catch
//   for (var i = 0; i < iteracionesInsercion; i++) {
//     var randomNombre = Math.floor(Math.random() * NombresProductos.length);
//     var randomDescripcion = Math.floor(
//       Math.random() * DescripcionProductos.length
//     );
//     var randomPrecios = Math.floor(Math.random() * PreciosProductos.length);
//     var randomCantidad = Math.floor(Math.random() * CantidadStock.length);

//     try {
//       await pool
//         .promise()
//         .query(
//           "INSERT INTO productos (Nombre, Descripcion, Precio, Cantidad_Stock) VALUES (?, ?, ?, ?)",
//           [
//             NombresProductos[randomNombre],
//             DescripcionProductos[randomDescripcion],
//             PreciosProductos[randomPrecios],
//             CantidadStock[randomCantidad],
//           ]
//         );
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   res.send("Ok");
// };
