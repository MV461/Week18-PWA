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

