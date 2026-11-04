// Minimal service worker. It makes the app installable and is where push
// notifications will be handled later. It does not cache anything, so you
// always get the newest version of the app.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()))
self.addEventListener('fetch', () => {})
