const CACHE_NAME = 'robotica_mineracaoV2';
const ASSETS = [
    './',
    './index.html',
    './viewer.html',
    './styles.css',
    './app.js',
    './viewer.js',
    './viewer.css',
    './manifest.json',
    'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
            .catch(() => {
                return fetch(event.request);
            })
    );
});