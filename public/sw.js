// TUQUI · service worker mínimo.
// Solo cachea el caparazón para que la app abra rápido e instale como PWA.
// Los datos NUNCA se cachean: van siempre contra Supabase, con la sesión del usuario.
const CACHE = 'tuqui-v2';
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
