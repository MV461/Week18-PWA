let cacheName = "petstore-v1";
let cacheFiles = [
    "images/catFood.jpg",
    "images/catHouse.jpg",
    "images/catLaser.jpg",
    "images/catLitter.jpg",
    "images/catYarn.jpg",
    "images/icon-store-512.png",
    "index.html",
    "products.js",
    "week7.css",
    "week7.webmanifest"
];


self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                console.log('[Service Worker] Caching all the files');
                return cache.addAll(cacheFiles);
            })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            // Download the file if it is not in the cache,
            return r || fetch(e.request).then(function (response) {
                // add the new file to cache
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});

