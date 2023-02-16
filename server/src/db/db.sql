/* Creación Database: */
CREATE DATABASE IF NOT EXISTS examen_tecnico_afrus

/* Creación Tablas: */
CREATE TABLE IF NOT EXISTS compradores (ID_Comprador int PRIMARY KEY NOT NULL AUTO_INCREMENT, Nombre varchar(25), Apellidos varchar(40), Tipo_Comprador varchar(25), Fecha_Creacion DATE)

CREATE TABLE IF NOT EXISTS productos (ID_Producto int PRIMARY KEY NOT NULL AUTO_INCREMENT, Nombre varchar(25), Descripcion varchar(80), Precio INT, Cantidad_Stock INT)

CREATE TABLE IF NOT EXISTS transacciones (ID_Transaccion int PRIMARY KEY NOT NULL AUTO_INCREMENT, Precio_Pagado INT, Impuesto varchar(25), Impuesto_Monto INT, Fecha_Compra DATE, ID_Comprador INT, ID_Producto INT, FOREIGN KEY (ID_Comprador) REFERENCES compradores (ID_Comprador), FOREIGN KEY (ID_Producto) REFERENCES productos(ID_Producto))

CREATE TABLE IF NOT EXISTS eventos_comprador (ID_Evento INT PRIMARY KEY NOT NULL AUTO_INCREMENT, Compra INT, Devolución INT, Visita INT, Consulta INT, Actualizacion_Datos INT, Descarga_Datos INT, ID_Comprador INT, FOREIGN KEY (ID_Comprador) REFERENCES compradores (ID_Comprador))
