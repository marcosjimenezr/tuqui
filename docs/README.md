# TUQUI · app web

Todo lo necesario para que tú y tus amigos usen TUQUI cada uno con su cuenta,
en su propio celular, sin que los datos de uno se crucen con los del otro.

No hay que compilar nada. Son archivos estáticos: se suben y ya.

```
index.html            la app
styles.css            los estilos
app.js                vistas + cuentas + datos
config.js             ← lo único que tienes que editar
schema.sql            tablas y seguridad para Supabase
manifest.webmanifest  para que se instale como app
sw.js                 abre rápido y sin conexión (solo el caparazón)
icon-192 / icon-512   el ícono
```

---

## Paso 1 · Supabase (la base de datos y las cuentas)

1. Entra a **supabase.com**, crea una cuenta y un proyecto nuevo. Región: elige
   **East US** o **South America (São Paulo)** — la más cerca de Colombia.
   El plan gratuito sobra para cinco personas probando.
2. En el proyecto: **SQL Editor → New query**. Pega **todo** `schema.sql` y dale **Run**.
   Debe decir *Success*. Eso crea las tablas y, sobre todo, las reglas de aislamiento.
3. **Project Settings → API**. Copia **Project URL** y **anon public**.
4. Abre `config.js` y pega esos dos valores.

> La *anon key* es pública a propósito: viaja al navegador de todos. Lo que protege
> los datos no es esa llave sino las políticas RLS del paso 2.
> La **service_role key nunca** va en estos archivos.

---

## Paso 2 · Los tres modos de entrar

En Supabase: **Authentication → Providers**.

**Correo con enlace mágico** — ya viene activo. No hay que hacer nada.
Es el que te sirve para invitar a tu esposa y a tus amigos sin pedirles cuenta de nada.

**Google**
1. En **Google Cloud Console** → nuevo proyecto → *APIs & Services* → *Credentials*
   → *Create credentials* → **OAuth client ID** → tipo **Web application**.
2. En *Authorized redirect URIs* pega la que Supabase te muestra en el proveedor Google
   (tiene la forma `https://TU-PROYECTO.supabase.co/auth/v1/callback`).
3. Copia *Client ID* y *Client Secret* y pégalos en Supabase → Providers → Google → **Enable**.

**Apple** — solo si vas a publicarla en la App Store algún día. Requiere cuenta de
desarrollador de Apple ($99/año). Mientras tanto, déjalo apagado y **quita el botón de
Apple** borrando el bloque `bApple` de `app.js`; si se queda visible sin estar
configurado, da error al tocarlo.

Por último, en **Authentication → URL Configuration** pon tu dominio de Vercel
(paso 3) en *Site URL* y en *Redirect URLs*. Sin esto el enlace del correo no vuelve
a la app.

---

## Paso 3 · Vercel (publicarla)

Lo más rápido, sin git:

1. Instala Node en tu computador y corre `npx vercel` dentro de esta carpeta.
   Te pide cuenta, y al final te da una URL tipo `tuqui.vercel.app`.

O con GitHub, que es mejor para ir actualizando:

1. Sube esta carpeta a un repositorio.
2. En **vercel.com → Add New → Project**, conéctalo. No configures nada:
   sin *framework*, sin *build command*. Vercel sirve los archivos tal cual.
3. Cada vez que subas un cambio al repositorio, se publica solo.

Cuando tengas la URL, vuelve a Supabase → *URL Configuration* y ponla ahí.

---

## Paso 4 · Que la instalen tus amigos

Les mandas el enlace y les dices:

> Ábrelo en **Safari** (iPhone) o **Chrome** (Android).
> Toca **Compartir → Añadir a pantalla de inicio**.
> Ábrela desde el ícono y entra con tu Google o con tu correo.

Cada uno crea su propio hogar en el primer ingreso. Sus gastos son suyos: tú no los
ves y ellos no ven los tuyos.

Para que alguien entre **a tu hogar** (tu esposa, por ejemplo):
**Ajustes → Configuración → Invitar a alguien**. La app crea un enlace con un
código de un solo uso, que vence a los 14 días.

---

## Cómo queda separada la información

Esto es lo que hace que no se crucen, y conviene que lo revises tú mismo:

- Cada tabla tiene `household_id` y una política que dice *"solo si eres integrante
  de ese hogar"*, resuelta con la función `is_member()`.
- Las políticas se aplican **en Postgres**, no en el navegador. Da igual que alguien
  manipule el cliente o llame la API con su propio token: un `select * from expenses`
  sin ningún filtro solo le devuelve lo suyo.
- `is_member()` es `security definer` con `search_path` fijo. Lo primero evita la
  recursión infinita de RLS al consultar `members` desde la política de `members`;
  lo segundo evita que alguien la secuestre cambiando el `search_path`.
- Crear un hogar es una sola transacción (`crear_hogar`). Si fueran dos pasos, existiría
  un instante con el hogar creado y sin tu fila de integrante, y las políticas te
  dejarían por fuera de tu propio hogar.
- El *service worker* nunca guarda datos: solo `index.html`, `styles.css`, `app.js`
  y los íconos. Nada de Supabase pasa por el caché.

**Para comprobarlo:** crea dos cuentas con dos correos, registra un gasto en cada una,
y en el SQL Editor corre `select * from expenses;` autenticado como cada una.
Cada quien debe ver solo lo suyo. Si ves algo del otro, algo quedó mal.

---

## Lo que falta

- **Traer tu historial de 2026.** Los 270 gastos están en el prototipo de Claude.
  Se pasan con un `insert` masivo cuando tengas el hogar creado.
- **Recuperación de cuenta.** Hoy se entra con Google o con el enlace al correo, así
  que quien controle el correo entra. Para una app de plata, ahí es donde hay que
  poner el siguiente candado — no en el inicio de sesión.
- **Borrar la cuenta y exportar los datos.** Cualquiera que pruebe esto debería poder
  irse con lo suyo. Falta.
- **Apple** queda pendiente hasta que decidas si va a la App Store.
