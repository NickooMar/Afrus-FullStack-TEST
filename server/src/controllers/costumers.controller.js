import { pool } from "../db/dbConnection.js";

// INSERT INTO compradores (Nombre, Apellidos, Tipo_Comprador) VALUES (?, ?, ?)

export const getCostumers = async (req, res) => {
  try {
    const [result] = await pool.promise().query("SELECT * FROM compradores");
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getCountCostumers = async (req, res) => {
  try {
    const [result] = await pool
      .promise()
      .query("SELECT COUNT(ID_Comprador) as cantidadCompradores FROM compradores");
    res.status(200).json(result[0].cantidadCompradores);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

export const getCostumer = async (req, res) => {
  const { id } = req.body;
  try {
    const [result] = await pool
      .promise()
      .query("SELECT * FROM compradores WHERE ID_Comprador = (?)", id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const addCostumer = async (req, res) => {
  const { nombre, apellidos, tipoComprador } = req.body;

  const preventSQLInjection =
    /[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi;

  const nombreValidation = nombre.match(preventSQLInjection);
  const apellidosValidation = apellidos.match(preventSQLInjection);
  const tipoCompradorValidation = tipoComprador.match(preventSQLInjection);

  try {
    if (
      !nombre ||
      !apellidos ||
      !tipoComprador ||
      nombreValidation ||
      apellidosValidation ||
      tipoCompradorValidation
    )
      throw new Error("Proporcionar los datos correctos");

    const [result] = await pool
      .promise()
      .query(
        "INSERT INTO compradores (Nombre, Apellidos, Tipo_Comprador) VALUES (?, ?, ?)",
        [nombre, apellidos, tipoComprador]
      );
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
