# Hoja de ruta: landing y CRM de Devom

_Actualizado el 22 de noviembre de 2026 · Repo: `devomchile/landing-page`_

## Resumen

En unas 4 semanas, devom.cl queda con la landing nueva en Angular 22 y Node 26, y WordPress (en el cPanel actual) pasa a ser el backend: guarda cada contacto, lleva el seguimiento de clientes con un CRM y maneja el blog. El backend propio en NestJS queda como fase futura, para cuando WordPress se quede corto.

Hoy el repo es una sola app Angular 19 (standalone, Tailwind 4, Angular Material) desplegada en Netlify con Node 22. El formulario envía a Contact Form 7 en `backoffice.devom.cl`, y cada prospecto llega solo como un correo.

## Urgente antes de todo

El token de la API de WordPress (`tokenWPApi`) está en `src/environments/*.ts`, en el historial de Git desde el commit `342ef80` y dentro del JavaScript público de devom.cl.

- [ ] Revocar esa contraseña de aplicación en WordPress (Usuarios › Perfil › Contraseñas de aplicación).
- [ ] Sacar el token del front: el endpoint de feedback de Contact Form 7 y la API de posts no lo necesitan.
- [ ] Borrar `public/Advanced_IP_Scanner_2.5.4594.1.exe`.
- [ ] Cambiar el WhatsApp de ejemplo (`56912345678`) por el real.

Detalles menores: README por defecto (con un `test` suelto), sin pruebas (`skipTests: true`) y "Paquete Iniciom" en Planes.

## Cómo queda

| Pieza | Dónde | Qué hace |
| --- | --- | --- |
| Landing (Angular 22) | Netlify | Web pública, blog y formulario |
| WordPress | cPanel actual (`backoffice.devom.cl`) | Guarda contactos, CRM y blog |

La landing lee los posts desde `/wp-json/wp/v2/posts` y envía el formulario al endpoint de Contact Form 7. Ninguno necesita token: nada secreto vive en el front. Sin backend propio, el monorepo no hace falta por ahora.

## Captar y seguir clientes en WordPress

- **Flamingo** (gratis, de los creadores de Contact Form 7): guarda cada envío dentro de WordPress.
- **FluentCRM** (versión gratis): contactos con etiquetas, etapas (Nuevo, Contactado, Propuesta enviada, Negociación, Ganado, Perdido), notas e historial. Confirmar si la conexión automática con Contact Form 7 viene en la versión gratis o en la Pro.
- **Aviso inmediato:** el correo de Contact Form 7 por cada mensaje; revisar que no caiga en spam.
- **Origen:** campos ocultos con los parámetros UTM.
- **Rutina:** revisar FluentCRM una vez al día, partiendo por Nuevo y por los contactos sin actividad.

### Blog

Se escribe en WordPress con el editor de bloques (incluye bloque de HTML personalizado). La landing muestra `/blog` y `/blog/:slug` leyendo la API de WordPress, prerenderizados con Angular SSR para SEO.

### Mantener WordPress seguro

- Actualizaciones automáticas de WordPress y plugins.
- Wordfence y respaldos semanales con UpdraftPlus.
- Desactivar lo que no se usa: temas extra, comentarios y XML-RPC.

## Fases

| Fase | Cuándo | Qué se hace | Listo cuando |
| --- | --- | --- | --- |
| 0 · Seguridad | Hoy | Revocar token y sacarlo del front, borrar el .exe, WhatsApp real | El token viejo ya no funciona |
| 1 · Actualizar y landing nueva | Semanas 1 y 2 | Angular 22 y Node 26; diseño nuevo (partículas, glassmorphism, modo día) en componentes Angular | La landing nueva está en Netlify y el formulario envía |
| 2 · WordPress como CRM | Semana 3 | Flamingo, FluentCRM, UTM, seguridad y respaldos | Un mensaje de prueba aparece como contacto en FluentCRM |
| 3 · Blog y portafolio | Semana 4 | `/blog` desde WordPress con SSR; portafolio (Redom, Gerab, Gescamp360) administrable desde WordPress | Un post publicado se ve en devom.cl/blog |
| Futuro · Backend propio | Cuando WordPress se quede corto | Monorepo Nx, API NestJS en AWS Lightsail y panel CRM propio | Se decide más adelante |

Cada fase va en su propia rama y PR contra `develop`, y pasa a `master` al cerrarse.

### Actualizar Angular y Node (fase 1)

Angular 19 → **22.3** (estable más nueva, 18 nov 2026). Node 22 → **26 LTS** (soporte activo hasta oct 2027).

1. Fijar Node 26: `.nvmrc` con `26`, `"engines": { "node": ">=26" }` en `package.json` y `NODE_VERSION = "26"` en `netlify.toml`.
2. Subir una versión mayor a la vez, un commit por salto: `ng update @angular/core@20 @angular/cli@20 @angular/material@20 @angular/cdk@20`, compilar y probar; luego 21 y 22.
3. Revisar control de flujo (`@if`, `@for`), inputs con signals y la configuración de zone.js.
4. Pasar las pruebas de Karma a Vitest.
5. Confirmar en [angular.dev/reference/versions](https://angular.dev/reference/versions) la compatibilidad con Node 26 y TypeScript.
6. Control: `ng build` sin errores, la landing igual en Netlify y el formulario enviando.

## Costos

Nada nuevo que contratar: Netlify (0 USD) y el cPanel que ya pagas. Los plugins tienen versión gratis. AWS queda para la fase futura.

## Decisiones

Tomadas el 22 de noviembre de 2026:

- WordPress sigue como backend (contactos, CRM y blog); NestJS queda para después.
- La landing nueva (partículas y glassmorphism) reemplaza a la actual.
- Cada fase va como PR en `devomchile/landing-page`, con el sitio en Netlify.

Pendiente:

- [ ] Conectar GitHub en claude.ai para que Claude pueda abrir los PR.

Fuentes de versiones: [endoflife.date/angular](https://endoflife.date/angular), [endoflife.date/nodejs](https://endoflife.date/nodejs), [Node.js releases](https://nodejs.org/en/about/previous-releases).
