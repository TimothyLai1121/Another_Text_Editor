const { warmStrategyCache } = require('workbox-recipes'); // offLineFallBack grey boxes
// removing offline fallback because of the error: Uncaught (in promise) TypeError: Failed to execute 'fetch' on 'ServiceWorkerGlobalScope': 'only-if-cached' can be set only with 'same-origin' mode
const { StaleWhileRevalidate, CacheFirst } = require('workbox-strategies'); // adding StaleWhileRevalidate and CacheFirst strategies to the service worker
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination), // https://developers.google.com/web/tools/workbox/modules/workbox-routing#how_to_register_a_route
  new StaleWhileRevalidate({ // StaleWhileRevalidate is a strategy that returns cached response if available, otherwise fetches from network and caches the response
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({ // CacheableResponsePlugin is a plugin that allows you to configure which responses are cacheable
        statuses: [0, 200],
      }),
    ],
  })
);

