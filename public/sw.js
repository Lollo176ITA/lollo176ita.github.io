// Kill-switch: il sito non usa piu' un service worker.
// I browser che avevano registrato la versione precedente scaricano questo file,
// svuotano le cache, si deregistrano e ricaricano le pagine aperte dalla rete.

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach((client) => client.navigate(client.url));
  })());
});
