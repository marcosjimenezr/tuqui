// TUQUI · service worker mínimo.
// Solo cachea el caparazón para que la app abra rápido e instale como PWA.
// Los datos NUNCA se cachean: van siempre contra Supabase, con la sesión del usuario.
const CACHE = 'tuqui-v3';
const SHELL = ['./', './index.html', './styles.css', './app.js', './config.js',
               './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(
    ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET') return;                 // nada de escrituras
  if (u.origin !== location.origin) return;               // nada de Supabase ni fuentes
  e.respondWith(
    fetch(e.request).then(r => {                          // red primero: siempre la última versión
      const copia = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copia));
      return r;
    }).catch(() => caches.match(e.request))               // sin red: el caparazón guardado
  );
});

// --- avisos en el celular -------------------------------------------------
// El servidor manda solo texto ya armado; aqui no se decide nada.
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {} } catch (_) {}
  e.waitUntil(self.registration.showNotification(d.t || 'TUQUI', {
    body: d.b || '', icon: './icon-192.png', badge: './icon-192.png',
    tag: d.g || 'tuqui', data: { u: d.u || './' }
  }));
});
// Al tocar el aviso: si la app ya esta abierta se trae al frente, si no se abre.
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const destino = (e.notification.data && e.notification.data.u) || './';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true })
    .then(ls => {
      for (const c of ls) if ('focus' in c) return c.focus();
      return self.clients.openWindow(destino);
    }));
});
