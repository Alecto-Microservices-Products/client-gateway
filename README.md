## Client Gateway
Es el proyecto principal en donde recibira todas las peticiones de los clientes para poder enviarlos a nuestros microservicios


## Dev

1. Clonar el repositorio `git clone`
2. Instlaar dependencias `npm install`
3. Crear un archivo `.env` basado en el `.env.template`
4. Tener levantados los microservicios que se van a consumir
5. Levantar el proyecto con `npm run start:dev`


## Nats

```
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats

```
