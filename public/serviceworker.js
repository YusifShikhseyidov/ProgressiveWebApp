const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// Install serviceworker
self.addEventListener('install', (event) =>{
    event.waitUntil(
        caches.open(CACHE_NAME).then(
            cache => {
                console.log("Opened cache: ")
                return cache.addAll(urlsToCache);
            }
        )
    )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then(
        async () => {
            try {
                return await fetch(event.request);
            } catch {
                return await caches.match('offline.html');
            }
        }
    ))
});

// Activate the serviceworker
self.addEventListener('activate', (event) =>{
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then(cacheNames => Promise.all(
            cacheNames.map(cacheName=> {
                if(!cacheWhiteList.includes(cacheName)){
                    return caches.delete(cacheName)
                }
            })
        ))
    )
});