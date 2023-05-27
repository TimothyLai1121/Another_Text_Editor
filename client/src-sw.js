const { offlineFallback, warmStrategyCache } = require('workbox-recipes'); // Import modules from 'workbox-recipes' package
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies'); // Import strategies from 'workbox-strategies' package
const { registerRoute } = require('workbox-routing'); // Import 'registerRoute' function from 'workbox-routing' package
const { CacheableResponsePlugin } = require('workbox-cacheable-response'); // Import 'CacheableResponsePlugin' from 'workbox-cacheable-response' package
const { ExpirationPlugin } = require('workbox-expiration'); // Import 'ExpirationPlugin' from 'workbox-expiration' package
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute'); // Import 'precacheAndRoute' from 'workbox-precaching' package

precacheAndRoute(self.__WB_MANIFEST); // Precache and route the assets specified in __WB_MANIFEST using workbox-precaching

const pageCache = new CacheFirst({ // Create a new CacheFirst strategy named 'pageCache'
  cacheName: 'page-cache', // Set the cache name for this strategy
  plugins: [
    new CacheableResponsePlugin({ // Create a new CacheableResponsePlugin
      statuses: [0, 200], // Cache responses with status 0 (opaque) and 200 (successful)
    }),
    new ExpirationPlugin({ // Create a new ExpirationPlugin
      maxAgeSeconds: 30 * 24 * 60 * 60, // Set the maximum age of cached responses to 30 days
    }),
  ],
});

warmStrategyCache({ // Warm the cache with specified URLs using the pageCache strategy
  urls: ['/index.html', '/'], // Specify the URLs to be preloaded and cached
  strategy: pageCache, // Use the pageCache strategy for caching these URLs
});

// TODO: Implement asset caching

registerRoute(({ request }) => request.mode === 'navigate', pageCache); // Register a route for navigation requests and use the pageCache strategy

registerRoute(({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache', // Set the cache name for this strategy
    plugins: [
      new CacheableResponsePlugin({ // Create a new CacheableResponsePlugin
        statuses: [0, 200], // Cache responses with status 0 (opaque) and 200 (successful)
      }),
    ],
  }));