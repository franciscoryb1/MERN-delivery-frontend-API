# MERN Delivery Frontend

Frontend web para una plataforma de delivery de comida a domicilio, desarrollado como **proyecto personal basado en un curso práctico de desarrollo full‑stack con MERN**.

La aplicación permite a los usuarios explorar restaurantes, buscar por ciudad, gestionar su perfil, realizar pedidos y completar pagos de forma segura, integrándose con un backend independiente.

> **Repositorio backend:** [https://github.com/franciscoryb1/MERN-delivery-backend-API](https://github.com/franciscoryb1/MERN-delivery-backend-API)

---

## Descripción del proyecto

Este frontend ofrece una experiencia moderna, responsive y orientada al usuario para el flujo completo de pedidos de comida:

* Registro e inicio de sesión mediante **Auth0**.
* Búsqueda de restaurantes por ciudad.
* Visualización de menús y detalles de restaurantes.
* Creación de órdenes y seguimiento de estado.
* Checkout y confirmación de pago con Stripe (a través del backend).
* Panel de restaurante para administración de órdenes y menú.

---

## Tecnologías utilizadas

* **React 18** + **TypeScript**
* **Vite** (bundler y entorno de desarrollo)
* **React Router** (ruteo de vistas)
* **React Query** (gestión de estado remoto y cacheo)
* **Tailwind CSS** + **shadcn/ui** (UI y estilos)
* **Auth0** (autenticación)

---

## Requisitos previos

* Node.js 18 o superior
* Backend en ejecución (ver repositorio backend)
* Cuenta configurada en Auth0

---

## Configuración del entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_API_BASE_URL=http://localhost:7000
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_CALLBACK_URL=http://localhost:5173/callback
VITE_AUTH0_AUDIENCE=your-audience
```

Ajustar `VITE_API_BASE_URL` según el host y puerto donde se ejecute el backend.

---

## Instalación y ejecución

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar el entorno de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en:

```
http://localhost:5173
```

---

## Scripts disponibles

* `npm run dev` — inicia el entorno de desarrollo.
* `npm run build` — compila la aplicación para producción.
* `npm run preview` — previsualiza el build localmente.
* `npm run lint` — ejecuta el linter del proyecto.

---

## Estructura general

```
src/
  api/            # Consumo de endpoints del backend
  auth/           # Configuración de Auth0
  components/     # Componentes reutilizables
  forms/          # Formularios y validaciones
  pages/          # Vistas principales
```

---

## Estado del proyecto

Proyecto personal **finalizado hasta su primera etapa funcional**, con las funcionalidades principales ya implementadas:

* Navegación completa
* Autenticación
* Búsqueda y visualización de restaurantes
* Flujo de pedidos
* Panel de gestión para restaurantes

---

## Backend relacionado

El backend de esta aplicación se encuentra disponible en:

[https://github.com/franciscoryb1/MERN-delivery-backend-API](https://github.com/franciscoryb1/MERN-delivery-backend-API)
