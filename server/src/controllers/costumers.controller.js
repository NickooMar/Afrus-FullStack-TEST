import { pool } from "../db/dbConnection.js";
import costumersServices from "../services/costumers.services.js";

export const getCostumers = async (req, res) => {
  try {
    const result = await costumersServices.getCostumers();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTipoComprador = async (req, res) => {
  try {
    const result = await costumersServices.getTipoComprador();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCountCostumers = async (req, res) => {
  try {
    const result = await costumersServices.getCountCostumers();
    return res.status(200).json(result.cantidadCompradores);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCostumer = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id || typeof id !== "number") throw new Error("ID must be provided");
    const result = await costumersServices.getCostumer(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};

export const filterCostumer = async (req, res) => {
  try {
    const { cantidadCompra, propiedadBusquedaCantidad, fechaCompra } =
      req.body.filtroCompra;

    console.log(
      typeof cantidadCompra,
      typeof propiedadBusquedaCantidad,
      typeof fechaCompra
    );
    if (
      !cantidadCompra ||
      !propiedadBusquedaCantidad ||
      !fechaCompra ||
      typeof cantidadCompra !== "number" ||
      typeof propiedadBusquedaCantidad !== "string" ||
      typeof fechaCompra !== "string"
    )
      throw new Error("Check all fields");

    const results = await costumersServices.filterCostumer(fechaCompra);

    var response = [];

    results.map((result) => {
      if (propiedadBusquedaCantidad === "MAYOR") {
        if (result.cantidadCompras > cantidadCompra) {
          response.push({
            cantidadCompras: result.cantidadCompras,
            idComprador: result.ID_Comprador,
            Nombre: result.Nombre,
            Apellidos: result.Apellidos,
            Tipo: result.Tipo_Comprador,
            fechaDeCompra: result.Fecha_Compra,
          });
        }
      } else if (propiedadBusquedaCantidad === "MENOR") {
        if (result.cantidadCompras < cantidadCompra) {
          response.push({
            cantidadCompras: result.cantidadCompras,
            idComprador: result.ID_Comprador,
            Nombre: result.Nombre,
            Apellidos: result.Apellidos,
            Tipo: result.Tipo_Comprador,
            fechaDeCompra: result.Fecha_Compra,
          });
        }
      }
    });

    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listCostumers = async (req, res) => {
  try {
    const result = await costumersServices.listCostumers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addCostumer = async (req, res) => {
  try {
    const { nombreComprador, apellidosComprador, tipoComprador } =
      req.body.nuevoComprador;

    const preventSQLInjection =
      /[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi;

    const nombreValidation = nombreComprador.match(preventSQLInjection);
    const apellidosValidation = apellidosComprador.match(preventSQLInjection);
    const tipoCompradorValidation = tipoComprador.match(preventSQLInjection);

    if (
      !nombreComprador ||
      !apellidosComprador ||
      !tipoComprador ||
      typeof nombreComprador !== "string" ||
      typeof apellidosComprador !== "string" ||
      typeof tipoComprador !== "string" ||
      nombreValidation ||
      apellidosValidation ||
      tipoCompradorValidation
    )
      throw new Error("Proporcionar los datos correctos");

    const result = await costumersServices.addCostumer(
      nombreComprador,
      apellidosComprador,
      tipoComprador
    );

    if (result.affectedRows === 0) throw Error("Something went wrong");
    res.status(200).json({ message: "Inserted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const insert500Costumers = async (req, res) => {
  /* IMPORTANTE: POR CUESTIONES DE ESPACIO Y SATURACIÓN (DEBIDO A LA LIMITACIÓN DE MI COMPUTADORA) SOLO SE PUEDEN INGRESAR PRODUCTOS POR TANDAS DE 500 EN 500 - EN CASO DE SER MAYOR LA BASE DE DATOS RETORNA UN ERROR */

  // Definir los posibles datos al azar que serán insertados
  const NombreComprador = [
    "Mateo",
    "Benjamin",
    "Ciro",
    "Lionel",
    "Diego",
    "Andres",
    "Felipe",
    "Nicolas",
    "Lautaro",
  ];
  const ApellidosComprador = [
    "Fangio",
    "Messi",
    "Lombardo",
    "Perez",
    "Rodriguez",
    "Benitez",
    "Fernandez",
  ];
  const TipoComprador = [
    "Monotributista",
    "Responsable Inscripto",
    "Consumidor Final",
    "Sujeto Exento",
    "Entidad Publica",
  ];

  // Cantidad de inserciones a realizar
  const iteracionesInsercion = 500;

  // Iteración para generar los datos al azar a partir de los arrays definidos anteriormente, luego ingresar esos datos y manejar los errores con el catch
  for (var i = 0; i < iteracionesInsercion; i++) {
    var randomNombre = Math.floor(Math.random() * NombreComprador.length);
    var randomApellido = Math.floor(Math.random() * ApellidosComprador.length);
    var randomTipo = Math.floor(Math.random() * TipoComprador.length);

    try {
      await pool
        .promise()
        .query(
          "INSERT INTO compradores (Nombre, Apellidos, Tipo_Comprador) VALUES (?, ?, ?)",
          [
            NombreComprador[randomNombre],
            ApellidosComprador[randomApellido],
            TipoComprador[randomTipo],
          ]
        );
    } catch (error) {
      console.log(error);
    }
  }

  res.send("Ok");
};
