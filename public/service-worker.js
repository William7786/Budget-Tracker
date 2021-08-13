
const FILES_TO_CACHE = [
    '/',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/index.html',
    '/index.js',
    '/style.css',
    '/db.js',
    './service-worker.js'

]

const STATIC_CACHE = 'static-cache-v1'; 
const RUN_TIME = 'data-cache-v1'; 



self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
          .open(STATIC_CACHE)
          .then(cache => {return cache.addAll(FILES_TO_CACHE);
        }));
          self.skipWaiting()
    
})

self.addEventListener('activate', (event) => {
const current = [STATIC_CACHE, RUN_TIME];
event.waitUntil(
    caches.keys()
    .then((cacheN) => {
        return cacheN.filter((cacheN) => !current.includes(cacheN));
    })


    .then((cachesDelete) => {
        return Promise.all(
          cachesDelete.map((cacheDelete) => {
            return caches.delete(cacheDelete);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then( response => {
        return response || fetch(event.request);
      })
    );
  });