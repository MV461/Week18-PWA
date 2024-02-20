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

self.addEventListener('fetch', (e) => {
    e.respondWith(
        // check if the cache has the file
        caches.match(e.request)
        .then((r) => {

            console.log('[Service Worker] Fetching resource: ' + e.request.url);

            // 'r' is the matching file if it exists in the cache
            return r || fetch(e.request)
            .then((response) => {
                return caches.open(cacheName)
                .then((cache) => {
                    cache.put(e.request, response.clone);
                    return response;
                })
            });
        })
    );
});

