
const FILES_TO_CACHE = [
    '/',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/index.html',
    '/index.js',
    '/style.css',
    '/db.js'

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
