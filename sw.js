// Nombre de la caché
const CACHE_NAME = 'mi-argentina-v1';

// Archivos esenciales para cachear
const ASSETS = [
  './',
  'index.html',
  'detalle.html',
  'dni-digital.html',
  'mis-documentos.html',
  'pin.html',
  'tramites.html',
  'manifest.json',
  'datos1.js',
  'main.js',
  'mis-documentos.js',
  'pin.js',
  'dni-digital.js',
  'detalle.css',
  'dni-digital.css',
  'mis-documentos.css',
  'pin.css',
  'tramites.css',
  'index.css',
  'imgs/logo-192x192.png',
  'imgs/logo-512x512.png',
  'apple-touch-icon.png',
  'icons/favicon.ico'
];

// Instalación: cachea recursos estáticos
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
    ))
    .then(() => self.clients.claim())
  ));
});

// Estrategia: Cache First, luego red
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then((cachedRes) => cachedRes || fetch(e.request))
  );
});