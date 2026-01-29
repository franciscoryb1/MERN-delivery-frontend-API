# GastroDelivery Backend API

API REST para un sistema de pedidos de comida a domicilio, desarrollada como **proyecto personal basado en un curso práctico de backend full‑stack**. Permite gestionar usuarios, restaurantes, menús y órdenes, e integra servicios externos para pagos, autenticación y almacenamiento de imágenes.

El backend está construido con Node.js y TypeScript, siguiendo una arquitectura modular orientada a servicios y buenas prácticas en el diseño de APIs.

> **Frontend relacionado:** [https://github.com/franciscoryb1/MERN-Frontend](https://github.com/franciscoryb1/MERN-Frontend)

---

## Descripción

El proyecto implementa el flujo completo de una aplicación de delivery moderna:

* Registro y autenticación de usuarios.
* Gestión de restaurantes y menús.
* Búsqueda por ciudad.
* Creación y seguimiento de órdenes.
* Procesamiento de pagos online mediante Stripe.
* Almacenamiento de imágenes en la nube con Cloudinary.

La autenticación se realiza mediante **Auth0** utilizando tokens JWT.

---

## Funcionalidades principales

* Gestión de usuarios (perfil, dirección y autenticación).
* Gestión de restaurantes y menú (alta, edición y consulta).
* Búsqueda de restaurantes por ciudad.
* Creación de órdenes y seguimiento de estados.
* Checkout con Stripe y webhook para confirmación de pagos.
* Subida y administración de imágenes mediante Cloudinary.

---

## Tecnologías utilizadas

* **Node.js** + **Express**
* **TypeScript**
* **MongoDB** + **Mongoose**
* **Auth0** (JWT) para autenticación
* **Stripe** para pagos online
* **Cloudinary** para almacenamiento de imágenes

---

## Requisitos previos

* Node.js 18.12.x o superior
* MongoDB en ejecución (local o remoto)
* Cuenta en Auth0
* Cuenta en Stripe
* Cuenta en Cloudinary

---

## Instalación y ejecución

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar el servidor en modo desarrollo:

```bash
npm run dev
```

El servidor se iniciará en:

```
http://localhost:7000
```

---

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes claves:

```env
MONGODB_CONNECTION_STRING=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
AUTH0_AUDIENCE=
AUT0_ISSUER_BASE_URL=
STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
FRONTEND_URL=
```
---

## Scripts disponibles

* `npm run dev` — inicia el servidor en modo desarrollo con Nodemon y escucha webhooks de Stripe.
* `npm run build` — instala dependencias y compila el proyecto TypeScript.
* `npm start` — ejecuta la aplicación compilada desde el directorio `dist/`.
---

## Endpoints principales

### Salud del servidor

* `GET /health` — estado del servidor.

### Usuarios

* `GET /api/my/user` — obtener usuario autenticado.
* `POST /api/my/user` — crear usuario autenticado.
* `PUT /api/my/user` — actualizar usuario autenticado.

### Restaurantes

* `GET /api/my/restaurant` — obtener restaurante del usuario.
* `POST /api/my/restaurant` — crear restaurante.
* `PUT /api/my/restaurant` — actualizar restaurante.
* `GET /api/my/restaurant/order` — obtener órdenes del restaurante.
* `PATCH /api/my/restaurant/order/:orderId/status` — actualizar estado de una orden.

### Catálogo público

* `GET /api/restaurant/search/:city` — buscar restaurantes por ciudad.
* `GET /api/restaurant/:restaurantId` — obtener restaurante por ID.

### Órdenes y pagos

* `GET /api/order` — obtener órdenes del usuario.
* `POST /api/order/checkout/create-checkout-session` — crear sesión de pago en Stripe.
* `POST /api/order/checkout/webhook` — webhook para confirmación de pagos.

---

## Frontend

Este backend se integra con el siguiente repositorio frontend:

[https://github.com/franciscoryb1/MERN-Frontend](https://github.com/franciscoryb1/MERN-Frontend)

---

## Estado del proyecto
Proyecto personal finalizado hasta su primera etapa funcional, con todas las características principales implementadas (autenticación, gestión de usuarios y restaurantes, órdenes, pagos e integración con servicios externos).
