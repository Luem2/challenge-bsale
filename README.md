<div align="center">
    <a href="https://www.bsale.cl/">
        <img src="./src/assets/bsale-logo.png" alt="Logo Bsale" width="200" height="200">
    </a>
</div>

<h1 align="center"> Challenge Bsale Andes Airlines</h1>

<!-- TABLE OF CONTENTS -->

## Tabla de contenidos

-   [Tabla de contenidos](#tabla-de-contenidos)
-   [Descripcion del proyecto y uso](#descripcion-del-proyecto-y-uso)
-   [Imagen de condiciones al implementar el check-in](#imagen-de-condiciones-al-implementar-el-check-in)
-   [Como llegue a la solución](#como-llegue-a-la-solución)
-   [Como ejecutar el proyecto localmente](#como-ejecutar-el-proyecto-localmente)
-   [URL Producción](#url-producción)
-   [Mencion final](#mencion-final)
-   [Contacto](#contacto)

---

## Descripcion del proyecto y uso

El proyecto consiste en implementar para una aerolinea un sistema de CHECK-IN, en el cual se busca asignar y registrar de forma automática, los pasajeros de cada uno de los vuelos.
Se implementó una simple REST-API, hecha con `Javascript` con el framework `Express`, en donde se consume información de una base de datos `MySQL`, con el ORM `Prisma` para obtener toda la información sobre los aviones, los vuelos programados, cada uno de sus pasajeros y demás. En resumen, se debe registrar formalmente aquellos pasajeros que ya poseen `tarjeta de embarque`, es decir, sus pasajes y, asignarle a aquellos que compraron su pasaje, pero no tienen un asiento designado. Realizar esta asignación, tiene sus condiciones, que lo grafica la siguiente imagen.

## Imagen de condiciones al implementar el check-in

<img src="./src/assets/condiciones-checkin.png" >

## Como llegué a la solución

Sabía que el gran desafío, iba a estar en la asignación de asientos, sobre todo en donde las compras, contenian múltiples `boarding passes` y/o contenian menores de edad. Razonando un tiempo, decidí dividir el problema en pequeñas partes, para poder abordarlo de la mejor manera. Es por eso, que prototipe el avión, en clases de Javascript. El corazón de cómo llegué a la solución, se encuentra en estas clases, las cuales tienen sus respectivas propiedades y sus métodos, los cuales explico a continuación:

<img src="./src/assets/plano-avion1.png" >

## Clases Implementadas:

-   Clase `AIRPLANE`:

En esta clase, recibo los `boardingPass` en crudo desde la base de datos y el id del avión. Creo las 3 clases y le asigno a cada una de ellas, los pasajes que le corresponden. Al finalizar todo el procesamiento de datos (de las otras clases), contiene un método en que captura la respuesta final, con todos los pasajeros procesados correctamente, para la respuesta del endpoint.

-   Clase `CLASS`:

En esta instancia, cada clase tiene sus propios pasajes. Esta clase las sigue procesando y divide los `boardingPasses` entre los que tienen asiento asignado y los que no. También los agrupa por compra `purchaseId` y ordena de tal forma, que se procesen primero, dandole prioridad a aquellas que poseen mayor cantidad de pasajes comprados.
Creo que la clave de la asignación, proviene de este agrupamiento, ya que al principio el avión tendrá más asientos y al procesar primero estos, es mucho mas fácil encontrar asientos disponibles y cumplir las condiciones impuestas en el desafío. Esta es la clase que mas métodos y lógica tiene de todas.

-   Clase `SECTION`:

Cada una de estas clases, contiene según el avión, una sectorización. El avion con id 1, tiene 2 sectores por cada clase, mientras que el avion con id 2 tiene 3 sectores. Esta clase contiene la propiedad `seats` en donde estará la matriz de asientos. Contiene métodos para obtener, cuantos asientos tiene disponible, obtener filas con 2 asientos disponibles para cumplir la condicion del menor de edad y para la búsqueda del asiento disponible.

-   Clase `SEAT`:

Por último, el asiento, en donde tendrá las coordenadas en donde se encuentra y la información del pasajero

> Dato de color: Decidí, hacer comentarios breves en forma de documentación, por encima de los métodos de las clases y no implementar por ejemplo JSDoc, solo por preferencia y gusto, ya que esta útlima se me hace muy verboso.

## Como ejecutar el proyecto localmente

1. **Clonar el repositorio**

```sh
git clone https://github.com/luem2/challenge-bsale.git
```

2. **Crear el archivo `.env`** en la raíz del proyecto. Y llenarla con las siguientes variables de entorno:

```sh
DATABASE_URL = mysql://bsale_test:bsale_test@mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com:3306/airline
PORT = 3000
```

La primera variable, es la que usa el ORM Prisma para poder conectarse a la base de datos MySQL y poder obtener la información sobre los vuelos.
La segunda, es el puerto en la que va a correr el servidor de Express.

3. **Entrar a la raíz del proyecto** `challenge-bsale` (a la misma altura del archivo `package.json`) e instalar las dependencias necesarias, con el package manager preferido, en este caso pongo de ejemplo pnpm, podria usar yarn tambien.

```sh
pnpm install
```

4. **Correr el proyecto**:

> **Opción 1:** <br />
> En el `Modo Desarrollo` correr el siguiente comando:

```sh
pnpm dev
```

> **Opción 2** <br />
> En el `Modo Producción` correr el siguiente comando:

```sh
pnpm start
```

5. **Ejecutar el endpoint**:

-   Base URL: [http://localhost:3000/](http://localhost:3000/) </br>
-   Endpoint: `/flights/:id/passengers`

## URL Producción

-   Base URL: [https://challenge-bsale-production-ff3b.up.railway.app/](https://challenge-bsale-production-ff3b.up.railway.app/) </br>
-   Endpoint: `/flights/:id/passengers`

## Mencion final

Realmente disfruté mucho de hacer este challenge, todo el proceso... desde codear, hasta realizar el README y el despliegue del mismo. Fue desafiante y divertido. Quiero agradecer a BSale antes que nada, por la oportunidad y por este desafío.

## Contacto

-   Linkedin: [https://linkedin.com/in/lucianopinol](https://linkedin.com/in/lucianopinol)
-   Telegram: [@Luem02](https://t.me/luem02)
-   Email: lucianoepinol@gmail.com
