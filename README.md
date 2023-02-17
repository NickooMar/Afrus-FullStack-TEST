# Afrus-FullStack-TEST

## Método de ejecución

1. Clonar el repositorio en una carpeta ejecutando el comando git clone https://github.com/NickooMar/Afrus-FullStack-TEST.git

2. El repositorio contiene consigo la base de datos específica, por ende, si en su caso (como el mio) utiliza ***xampp*** deberá iniciar el gestor de base de datos y crear la base de datos con el nombre **examen_tecnico_afrus** y dentro de la base de datos importar dicho archivo 

3. Creada la base de datos con la información dentro, para realizar la conexión deberá ingresar a la carpeta ***server*** y crear un archivo .env (Donde se guardan las variables privadas de conexión y demás, por seguridad) y completarlo de la siguiente manera:
![imagen](https://user-images.githubusercontent.com/68347411/219682552-edb2d783-932c-47f1-bea3-5a46e3210b3a.png)

4. Ahora deberá instalar los modulos que hacen que la aplicación funcione, en el servidor y en el cliente:
    > Para instalar los modulos en el servidor
      - En la raiz de la carpeta deberá ejecutar un terminal y escribir lo siguiente:
        ```
        cd server
        ```
        - Posteriormente ingresará a la carpeta del servidor y debera ejecutar:
        ```
        npm install
        ```
        - Comenzará una barra de carga en donde instalará los modulos correspondientes
        
    > Para instalar los modulos en el cliente
      - En la raiz de la carpeta deberá ejecutar un terminal y escribir lo siguiente:
        ```
        cd client
        ```
        - Posteriormente ingresará a la carpeta del cliente y debera ejecutar:
        ```
        npm install
        ```
        - Comenzará una barra de carga en donde instalará los modulos correspondientes

5. Finalmente solo queda por dar inicio al servidor y al cliente:
    > Para inciar el servidor
      - En la raiz de la carpeta deberá ejecutar un terminal y escribir lo siguiente:
        ```
        cd server
        ```
        
        *En caso de ya encontrarse en la carpeta del servidor ejecute lo siguiente*
        
        - Posteriormente ingresará a la carpeta del servidor y debera ejecutar:
        ```
        npm run dev
        ```
        - Comenzará una barra de carga en donde instalará los modulos correspondientes
        
    > Para instalar los modulos en el cliente
      - En la raiz de la carpeta deberá ejecutar un terminal y escribir lo siguiente:
        ```
        cd client
        ```
        
        *En caso de ya encontrarse en la carpeta del cliente ejecute lo siguiente*
        
        - Posteriormente ingresará a la carpeta del cliente y debera ejecutar:
        ```
        npm run dev
        ```
        - Comenzará una barra de carga en donde instalará los modulos correspondientes
        
6. El servidor y el cliente ahora se encuentran en funcionamiento en las siguientes direcciones:


    **Servidor**
      - (http://localhost:4000/)
    
    **Cliente**
      - (http://localhost:5173/)
      
      
      
### En el cliente encontrará todas las funcionalidades propuestas en el enunciado

## SCREENS

- HomeScreen
![imagen](https://user-images.githubusercontent.com/68347411/219689798-6d1061e0-7e89-48f8-9bdb-227ba3c8167b.png)

- Products

    Filtrar Productos
    ![imagen](https://user-images.githubusercontent.com/68347411/219689918-f7c98dda-1a00-49ce-b319-83dfff4eb5b8.png)
    
    Agregar Producto
    ![imagen](https://user-images.githubusercontent.com/68347411/219690022-baee9302-dd9e-4297-9e65-46678d13a711.png)

- Costumers

    Filtrar Compradores
    ![imagen](https://user-images.githubusercontent.com/68347411/219690091-d4d9a347-c926-4758-a9a7-9d40c2f3f084.png)
    
    Agregar Comprador
    ![imagen](https://user-images.githubusercontent.com/68347411/219690146-feb7c310-af22-4b8b-9621-6614efbc072d.png)

    Obtener Compradores y Compras Relacionadas
    ![imagen](https://user-images.githubusercontent.com/68347411/219690242-7ef25a15-3e2b-4bf2-9d10-84d9b3458bd3.png)

- Transactions

    Realizar Compra
    ![imagen](https://user-images.githubusercontent.com/68347411/219690375-d3b64b83-505c-4569-88fe-8ab0042b8725.png)

    Obtener Compras relacionadas con Eventos
    ![imagen](https://user-images.githubusercontent.com/68347411/219690463-e9f5e28d-d1b5-4fb2-8e04-adde09532b72.png)

- Events

    Obtener los eventos relacionados con compradores y transacciones
    ![imagen](https://user-images.githubusercontent.com/68347411/219690626-b36dde75-6020-430b-b360-67d426dc5e6a.png)


**Gracias y saludos**
**Atte. Nicolás Marsili**
