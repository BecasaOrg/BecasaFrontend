# ASA · Front (athleticsa.com)

Sitio de Athletic Scholarship Agency con el diseño aprobado de **asa-web-fase1**, llevado a Next.js y conectado al backend (BecasaBackend, Laravel).

## Correr en local

```bash
npm install
cp .env.example .env.local   # y completa los valores
npm run dev                  # http://localhost:3000
npm run build                # compila y verifica tipos
```

Requiere Node 20 o superior. Los scripts de `package.json` solo llaman a `next` y `tsc`.
**Si alguna vez ves un script que ejecuta otro archivo (por ejemplo `node api.js && …`) o un archivo de configuración con una línea muy larga, no lo ejecutes: es la firma del malware que infectó estos repositorios.**

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript.
- Estilos con CSS Modules (`*.module.css`) y tokens en `src/styles/global.css`. Sin Tailwind.
- Fuente Barlow (`@fontsource`) como respaldo de Acumin.

## Estructura

| Carpeta / archivo | Qué contiene |
|---|---|
| `src/app/**/page.tsx` | Rutas del sitio (ver tabla). |
| `src/app/actions.ts` | **Único punto de contacto con el backend** (server actions). Guarda la sesión en la cookie httpOnly `auth_token`. |
| `src/app/auth/callback/route.ts` | Regreso del ingreso con Google (`/auth/callback?token=`). |
| `src/middleware.ts` | Protege `/dashboard`. |
| `src/views/` | Páginas del diseño (Home, Landing, CampDetail, Auth, Dashboard…). |
| `src/components/` | Header, Footer, WhatsApp, cookies, `PayModal` (Mercado Pago), `SiteShell`. |
| `src/lib/app.ts` | Sesión del lado del navegador (`useSession`, `auth.refresh()`), navegación (`go`) y relación campamento del sitio ↔ backend. |
| `src/data/becasa.ts`, `src/data/asa.ts` | Contenido (textos, campamentos, precios por periodo, entrenadores, FAQ). |

## Rutas

| Ruta | Página | Backend |
|---|---|---|
| `/` | Inicio | — |
| `/nuestra-historia`, `/servicios` | Contenido | — |
| `/becasa` | Landing BECASA | — |
| `/becasa/[slug]` (`/becasa/bucaramanga`) | Campamento | — |
| `/becasa/crea-tu-perfil` | Crear perfil | `POST /register`, países/departamentos/ciudades |
| `/becasa/login` | Ingresar | `POST /login` |
| `/becasa/registrate?camp=` | Inscripción al campamento | `GET /camps`, `POST /discounts`, `POST /registrations` |
| `/dashboard` (privada) | Tablero | `GET /user`, `GET /registrations`, `POST /user`, `POST /payments/process-card` |
| `/payment/success`, `/pending`, `/failure` | Regreso de Mercado Pago | — |
| `/aviso-legal`, `/privacidad`, `/cookies`, `/pronto` | Legales y "muy pronto" | — |

Las URLs del sitio anterior redirigen a las nuevas (`next.config.ts`): `/becasa/informacion`, `/dashboard/perfil`, `/disciplinas`, `/unete`.

## Cómo se conecta con el backend

- **Sesión:** `login`/`register` reciben el token de Sanctum y lo guardan en la cookie `auth_token` (httpOnly, `secure` en producción). El navegador nunca lo ve ni lo guarda en `localStorage`.
- **Campamentos:** el contenido (textos, fotos, rutas) está en `src/data/becasa.ts`. El `camp_id` del backend se busca por ciudad (`Bucaramanga`), o se fija con `NEXT_PUBLIC_CAMP_IDS=bucaramanga:3`.
- **Inscripción:** se envían los campos que exige `RegistrationController@store`. El `user_id` sale de la sesión en el servidor, nunca del formulario. Los datos de la última inscripción se reutilizan para no volver a pedirlos (salvo el certificado de EPS).
  Mapeos: nivel `Formativo/escolar → principiante`, `Club/liga → intermedio`, `Departamental` y `Selección nacional → avanzado`; género `Femenino → F`, `Masculino → M`, `Prefiero no decir → Other`.
- **Pago:** al inscribirse, el backend crea una preferencia de Mercado Pago y el sitio muestra **Pagar ahora** (checkout de MP). Desde el tablero se paga cada cuota con el **Card Payment Brick** (campos alojados por MP). El valor de la cuota lo calcula el servidor a partir de la inscripción.

## Variables de entorno

| Variable | Uso |
|---|---|
| `API_URL` | URL de la API (por defecto `https://athleticscholarshipagency.com/api`). Solo servidor. |
| `NEXT_PUBLIC_MP_PUBLIC_KEY` | Llave **pública** de Mercado Pago para el Card Payment Brick. |
| `NEXT_PUBLIC_CAMP_IDS` | Opcional. `slug:id` del campamento en el backend, separados por coma. |
| `NEXT_PUBLIC_GA_ID` | Opcional. Google Analytics 4; solo carga si el usuario acepta cookies. |
| `NEXT_PUBLIC_GOOGLE_LOGIN` | `true` para activar "Ingresar con Google" (requiere Socialite configurado en el backend con `FRONTEND_URL`). |
| `NEXT_PUBLIC_API_ORIGIN` | Opcional. Origen del backend para el botón de Google. |

## Pendientes

- Textos legales, ID de Analytics, video de BECASA, más historias y entrenadores de Bucaramanga (ver `docs/`).
- Funciones del tablero sin backend todavía: fases/tareas, cursos, verificación de perfil (en "Pronto") e insignias (por ahora el certificado se envía por WhatsApp).
- "Olvidé mi contraseña" y "Ingresar con Apple": el backend aún no tiene esos endpoints.
- Acumin Variable Concept: cargar el kit de Adobe Fonts cuando esté disponible. El diseño ya la pone primero en `--font-display` y `--font-text`.
