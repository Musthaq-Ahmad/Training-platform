import type { ContentTopic } from '../../../types';

export const mdnServiceWorkersTopics = {
  'mdn-service-workers': {
    id: 'mdn-service-workers',
    heading: 'The premise of service workers',
    blocks: [
      {
        type: 'paragraph',
        text: "One overriding problem that web users have suffered with for years is loss of connectivity. The best web app in the world will provide a terrible user experience if you can't download it. There have been various attempts to create technologies to solve this problem, and some of the issues have been solved. But the overriding problem is that there wasn't a good overall control mechanism for asset caching and custom network requests.",
      },
      {
        type: 'paragraph',
        text: 'Service workers fix these issues. Using a service worker you can set an app up to use cached assets first, thus providing a default experience even when offline, before then getting more data from the network (commonly known as "offline first"). This is already available with native apps, which is one of the main reasons native apps are often chosen over web apps.',
      },
      {
        type: 'paragraph',
        text: 'A service worker functions like a proxy server, allowing you to modify requests and responses replacing them with items from its own cache.',
      },
      {
        type: 'paragraph',
        text: "Service workers are enabled by default in all modern browsers. To run code using service workers, you'll need to serve your code via HTTPS — Service workers are restricted to running across HTTPS for security reasons. A server supporting HTTPS is necessary. To host experiments, you can use a service such as GitHub, Netlify, Vercel, etc. In order to facilitate local development, localhost is considered a secure origin by browsers as well.",
      },
      {
        type: 'paragraph',
        text: 'With service workers, the following steps are generally observed for initial installation and for replacing an existing service worker. The diagrams show an example that populates versioned caches during installation and removes old caches during activation.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Initial installation',
      },
      {
        type: 'paragraph',
        text: 'In this example, two pages are already open before the first service worker is registered. One of the pages calls serviceWorkerContainer.register(), which initiates the process.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'The service worker code is fetched and then registered. If successful, the service worker is executed in a ServiceWorkerGlobalScope; this is basically a special kind of worker context, running off the main script execution thread, with no DOM access. The service worker is now ready to process events.',
          'Installation takes place. An install event is always the first one sent to a service worker (this can be used to start the process of populating an IndexedDB, and caching site assets). During this step, the application is preparing to make everything available for use offline.',
          'When installation completes successfully, the service worker is considered installed.',
          'Because this is the first service worker, it receives an activate event without waiting for open pages to close. The activate handler can finish setting up the service worker.',
          'After activation, the service worker will control pages opened within its scope. Existing documents will have to be reloaded to actually be controlled, because a document starts life with or without a service worker and maintains that for its lifetime. To override this default behavior and adopt open pages, a service worker can call clients.claim().',
        ],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Replacing an existing service worker',
      },
      {
        type: 'paragraph',
        text: 'This independent example starts with one open client controlled by version 1. It illustrates the default waiting behavior when replacing an existing service worker.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Whenever a new version of a service worker is fetched, this cycle happens again. The previous version remains active and continues to control its clients.',
          'Installation takes place for the new version. Its install handler can populate a new cache while the old version continues to use its existing cache.',
          'When installation completes successfully, the new version waits while the old version is still controlling clients. The new version is not yet active.',
          "Once all pages controlled by the old version of the service worker have closed and the old version has finished handling pending events, it's safe to retire the old version, and the newly installed service worker receives an activate event. The primary use of activate is to clean up resources used in previous versions of the service worker, such as the old cache in this example. The new service worker can call skipWaiting() to ask to be activated without waiting for open pages to be closed. It then takes over the pages controlled by the old version.",
          "After activation, newly opened pages within the registration's scope are controlled by the new version.",
        ],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Service worker events',
      },
      {
        type: 'paragraph',
        text: 'Here is a summary of the available service worker events:',
      },
      {
        type: 'list',
        ordered: false,
        items: ['install', 'activate', 'message', 'Functional events * fetch * sync * push'],
      },
      {
        type: 'paragraph',
        text: "To demonstrate just the very basics of registering and installing a service worker, we have created a demo called simple service worker, which is a simple Star Wars Lego image gallery. It uses a promise-powered function to read image data from a JSON object and load the images using fetch(), before displaying the images in a line down the page. We've kept things static for now. It also registers, installs, and activates a service worker.",
      },
      {
        type: 'paragraph',
        text: 'You can see the source code on GitHub, and the simple service worker running live.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Registering your worker',
      },
      {
        type: 'paragraph',
        text: "The first block of code in our app's JavaScript file — app.js — is as follows. This is our entry point into using service workers.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const registerServiceWorker = async () => {\n  if ("serviceWorker" in navigator) {\n    try {\n      const registration = await navigator.serviceWorker.register("/sw.js", {\n        scope: "/",\n      });\n      if (registration.installing) {\n        console.log("Service worker installing");\n      } else if (registration.waiting) {\n        console.log("Service worker installed");\n      } else if (registration.active) {\n        console.log("Service worker active");\n      }\n    } catch (error) {\n      console.error(`Registration failed with ${error}`);\n    }\n  }\n};\n\n// …\n\nregisterServiceWorker();',
        },
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'The if-block performs a feature detection test to make sure service workers are supported before trying to register one.',
          "Next, we use the ServiceWorkerContainer.register() function to register the service worker for this site. The service worker code is in a JavaScript file residing inside our app (note this is the file's URL relative to the origin, not the JS file that references it.)",
          "The scope parameter is optional, and can be used to specify the subset of your content that you want the service worker to control. In this case, we have specified '/', which means all content under the app's origin. If you leave it out, it will default to this value anyway, but we specified it here for illustration purposes.",
        ],
      },
      {
        type: 'paragraph',
        text: 'This registers a service worker, which runs in a worker context, and therefore has no DOM access.',
      },
      {
        type: 'paragraph',
        text: "A single service worker can control many pages. Each time a page within your scope is loaded, the service worker is installed against that page and operates on it. Bear in mind therefore that you need to be careful with global variables in the service worker script: each page doesn't get its own unique worker.",
      },
      {
        type: 'paragraph',
        text: "Note: One great thing about service workers is that if you use feature detection like we've shown above, browsers that don't support service workers can just use your app online in the normal expected fashion.",
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Why is my service worker failing to register?',
      },
      {
        type: 'paragraph',
        text: 'A service worker fails to register for one of the following reasons:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'You are not running your application in a secure context (over HTTPS).',
          "The path of the service worker file is incorrect. The path must be relative to the origin, not an app's root directory. In our example, the worker is at https://bncb2v.csb.app/sw.js, and the app's root is https://bncb2v.csb.app/, so the service worker must be specified as /sw.js.",
          'The path to your service worker points to a service worker of a different origin to your app.',
          'The service worker registration contains a scope option broader than permitted by the worker path. The default scope for a service worker is the directory where the worker is located. In other words, if the script sw.js is located in /js/sw.js, it can only control URLs in (or nested within) the /js/ path by default. The scope for a service worker can be broadened (or narrowed) with the Service-Worker-Allowed header.',
          'Browser-specific settings are enabled, such as blocking all cookies, private browsing mode, automatic cookie deletion on close, etc. See serviceWorker.register() browser compatibility for more information.',
        ],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Install and activate: populating your cache',
      },
      {
        type: 'paragraph',
        text: 'After your service worker is registered, the browser will attempt to install then activate the service worker for your page/site.',
      },
      {
        type: 'paragraph',
        text: "The install event is the first event that is fired on service worker installation or update. It is emitted just once, immediately after registration is successfully completed, and is generally used to populate your browser's offline caching capabilities with the assets you need to run your app offline. To do this, we use Service Worker's storage API — cache — a global object on the service worker that allows us to store assets delivered by responses, and keyed by their requests. This API works in a similar way to the browser's standard cache, but it is specific to your domain. The contents of the cache are kept until you clear them.",
      },
      {
        type: 'paragraph',
        text: "Here's how our service worker handles the install event:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const addResourcesToCache = async (resources) => {\n  const cache = await caches.open("v1");\n  await cache.addAll(resources);\n};\n\nself.addEventListener("install", (event) => {\n  event.waitUntil(\n    addResourcesToCache([\n      "/",\n      "/index.html",\n      "/style.css",\n      "/app.js",\n      "/image-list.js",\n      "/star-wars-logo.jpg",\n      "/gallery/bountyHunters.jpg",\n      "/gallery/myLittleVader.jpg",\n      "/gallery/snowTroopers.jpg",\n    ]),\n  );\n});',
        },
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Here we add an install event listener to the service worker (hence self), and then chain an ExtendableEvent.waitUntil() method onto the event — this ensures that the service worker will not install until the code inside waitUntil() has successfully occurred.',
          "Inside addResourcesToCache() we use the caches.open() method to create a new cache called v1, which will be version 1 of our site resources cache. Then we call a function addAll() on the created cache, which for its parameter takes an array of URLs to all the resources you want to cache. The URLs are relative to the worker's location.",
          "If the promise is rejected, the installation fails, and the worker won't do anything. This is OK, as you can fix your code and then try again the next time registration occurs.",
          "After a successful installation, the service worker activates. This doesn't have much of a distinct use the first time your service worker is installed/activated, but it means more when the service worker is updated (see the Updating your service worker section later on.)",
        ],
      },
      {
        type: 'paragraph',
        text: 'Note: The Web Storage API (localStorage) works in a similar way to service worker cache, but it is synchronous, so not allowed in service workers.',
      },
      {
        type: 'paragraph',
        text: 'Note: IndexedDB can be used inside a service worker for data storage if you require it.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Custom responses to requests',
      },
      {
        type: 'paragraph',
        text: "Now you've got your site assets cached, you need to tell service workers to do something with the cached content. This is done with the fetch event.",
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'A fetch event fires every time any resource controlled by a service worker is fetched, which includes the documents inside the specified scope, and any resources referenced in those documents (for example if index.html makes a cross-origin request to embed an image, that still goes through its service worker.)',
          'You can attach a fetch event listener to the service worker, then call the respondWith() method on the event to hijack our HTTP responses and update them with your own content. js self.addEventListener("fetch", (event) =&gt; { event.respondWith(/* custom content goes here */); });',
          'We could start by responding with the resource whose URL matches that of the network request, in each case: js self.addEventListener("fetch", (event) =&gt; { event.respondWith(caches.match(event.request)); }); caches.match(event.request) allows us to match each resource requested from the network with the equivalent resource available in the cache, if there is a matching one available. The matching is done via URL and various headers, just like with normal HTTP requests.',
        ],
      },
      {
        type: 'paragraph',
        text: "So caches.match(event.request) is great when there is a match in the service worker cache, but what about cases when there isn't a match? If we didn't provide any kind of failure handling, our promise would resolve with undefined and we wouldn't get anything returned.",
      },
      {
        type: 'paragraph',
        text: 'After testing the response from the cache, we can fall back on a regular network request:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const cacheFirst = async (request) => {\n  const responseFromCache = await caches.match(request);\n  if (responseFromCache) {\n    return responseFromCache;\n  }\n  return fetch(request);\n};\n\nself.addEventListener("fetch", (event) => {\n  event.respondWith(cacheFirst(event.request));\n});',
        },
      },
      {
        type: 'paragraph',
        text: "If the resources aren't in the cache, they are requested from the network.",
      },
      {
        type: 'paragraph',
        text: 'Using a more elaborate strategy, we could not only request the resource from the network, but also save it into the cache so that later requests for that resource could be retrieved offline too. This would mean that if extra images were added to the Star Wars gallery, our app could automatically grab them and cache them. The following snippet implements such a strategy:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const putInCache = async (request, response) => {\n  const cache = await caches.open("v1");\n  await cache.put(request, response);\n};\n\nconst cacheFirst = async (request, event) => {\n  const responseFromCache = await caches.match(request);\n  if (responseFromCache) {\n    return responseFromCache;\n  }\n  const responseFromNetwork = await fetch(request);\n  event.waitUntil(putInCache(request, responseFromNetwork.clone()));\n  return responseFromNetwork;\n};\n\nself.addEventListener("fetch", (event) => {\n  event.respondWith(cacheFirst(event.request, event));\n});',
        },
      },
      {
        type: 'paragraph',
        text: "If the request URL is not available in the cache, we request the resource from the network request with await fetch(request). After that, we put a clone of the response into the cache. The putInCache() function uses caches.open('v1') and cache.put() to add the resource to the cache. The original response is returned to the browser to be given to the page that called it.",
      },
      {
        type: 'paragraph',
        text: 'Cloning the response is necessary because request and response streams can only be read once. In order to return the response to the browser and put it in the cache we have to clone it. So the original gets returned to the browser and the clone gets sent to the cache. They are each read once.',
      },
      {
        type: 'paragraph',
        text: "What might look a bit weird is that the promise returned by putInCache() is not awaited. The reason is that we don't want to wait until the response clone has been added to the cache before returning a response. However, we do need to call event.waitUntil() on the promise, to make sure the service worker doesn't terminate before the cache is populated.",
      },
      {
        type: 'paragraph',
        text: "The only trouble we have now is that if the request doesn't match anything in the cache, and the network is not available, our request will still fail. Let's provide a default fallback so that whatever happens, the user will at least get something:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const putInCache = async (request, response) => {\n  const cache = await caches.open("v1");\n  await cache.put(request, response);\n};\n\nconst cacheFirst = async ({ request, fallbackUrl, event }) => {\n  // First try to get the resource from the cache\n  const responseFromCache = await caches.match(request);\n  if (responseFromCache) {\n    return responseFromCache;\n  }\n\n  // Next try to get the resource from the network\n  try {\n    const responseFromNetwork = await fetch(request);\n    // response may be used only once\n    // we need to save clone to put one copy in cache\n    // and serve second one\n    event.waitUntil(putInCache(request, responseFromNetwork.clone()));\n    return responseFromNetwork;\n  } catch (error) {\n    const fallbackResponse = await caches.match(fallbackUrl);\n    if (fallbackResponse) {\n      return fallbackResponse;\n    }\n    // when even the fallback response is not available,\n    // there is nothing we can do, but we must always\n    // return a Response object\n    return new Response("Network error happened", {\n      status: 408,\n      headers: { "Content-Type": "text/plain" },\n    });\n  }\n};\n\nself.addEventListener("fetch", (event) => {\n  event.respondWith(\n    cacheFirst({\n      request: event.request,\n      fallbackUrl: "/gallery/myLittleVader.jpg",\n      event,\n    }),\n  );\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'We have opted for this fallback image because the only updates that are likely to fail are new images, as everything else is depended on for installation in the install event listener we saw earlier.',
      },
      {
        type: 'paragraph',
        text: 'If enabled, the navigation preload feature starts downloading resources as soon as the fetch request is made, and in parallel with service worker activation. This ensures that download starts immediately on navigation to a page, rather than having to wait until the service worker is activated. That delay happens relatively rarely, but is unavoidable when it does happen, and may be significant.',
      },
      {
        type: 'paragraph',
        text: 'First the feature must be enabled during service worker activation, using registration.navigationPreload.enable():',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'self.addEventListener("activate", (event) => {\n  event.waitUntil(self.registration?.navigationPreload.enable());\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'Then use event.preloadResponse to wait for the preloaded resource to finish downloading in the fetch event handler.',
      },
      {
        type: 'paragraph',
        text: "Continuing the example from the previous sections, we insert the code to wait for the preloaded resource after the cache check, and before fetching from the network if that doesn't succeed.",
      },
      {
        type: 'paragraph',
        text: 'The new process is:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Check cache',
          'Wait on event.preloadResponse, which is passed as preloadResponsePromise to the cacheFirst() function. Cache the result if it returns.',
          'If neither of these are defined then we go to the network.',
        ],
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const addResourcesToCache = async (resources) => {\n  const cache = await caches.open("v1");\n  await cache.addAll(resources);\n};\n\nconst putInCache = async (request, response) => {\n  const cache = await caches.open("v1");\n  await cache.put(request, response);\n};\n\nconst cacheFirst = async ({\n  request,\n  preloadResponsePromise,\n  fallbackUrl,\n  event,\n}) => {\n  // First try to get the resource from the cache\n  const responseFromCache = await caches.match(request);\n  if (responseFromCache) {\n    // Keep the navigation preload request alive even if we do not use its response.\n    event.waitUntil(preloadResponsePromise.catch(() => undefined));\n    return responseFromCache;\n  }\n\n  // Next try to use (and cache) the preloaded response, if it\'s there\n  const preloadResponse = await preloadResponsePromise;\n  if (preloadResponse) {\n    console.info("using preload response", preloadResponse);\n    event.waitUntil(putInCache(request, preloadResponse.clone()));\n    return preloadResponse;\n  }\n\n  // Next try to get the resource from the network\n  try {\n    const responseFromNetwork = await fetch(request);\n    // response may be used only once\n    // we need to save clone to put one copy in cache\n    // and serve second one\n    event.waitUntil(putInCache(request, responseFromNetwork.clone()));\n    return responseFromNetwork;\n  } catch (error) {\n    const fallbackResponse = await caches.match(fallbackUrl);\n    if (fallbackResponse) {\n      return fallbackResponse;\n    }\n    // when even the fallback response is not available,\n    // there is nothing we can do, but we must always\n    // return a Response object\n    return new Response("Network error happened", {\n      status: 408,\n      headers: { "Content-Type": "text/plain" },\n    });\n  }\n};\n\n// Enable navigation preload\nconst enableNavigationPreload = async () => {\n  if (self.registration.navigationPreload) {\n    await self.registration.navigationPreload.enable();\n  }\n};\n\nself.addEventListener("activate", (event) => {\n  event.waitUntil(enableNavigationPreload());\n});\n\nself.addEventListener("install", (event) => {\n  event.waitUntil(\n    addResourcesToCache([\n      "/",\n      "/index.html",\n      "/style.css",\n      "/app.js",\n      "/image-list.js",\n      "/star-wars-logo.jpg",\n      "/gallery/bountyHunters.jpg",\n      "/gallery/myLittleVader.jpg",\n      "/gallery/snowTroopers.jpg",\n    ]),\n  );\n});\n\nself.addEventListener("fetch", (event) => {\n  event.respondWith(\n    cacheFirst({\n      request: event.request,\n      preloadResponsePromise: event.preloadResponse,\n      fallbackUrl: "/gallery/myLittleVader.jpg",\n      event,\n    }),\n  );\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'Note that in this example we download and cache the same data for the resource whether it is downloaded "normally" or preloaded. You can instead choose to download and cache a different resource on preload. For more information see NavigationPreloadManager &gt; Custom responses.',
      },
      {
        type: 'paragraph',
        text: 'If your service worker has previously been installed, but then a new version of the worker is available on refresh or page load, the new version is installed in the background, but not yet activated. It is only activated when there are no longer any pages loaded that are still using the old service worker. As soon as there are no more such pages still loaded, the new service worker activates.',
      },
      {
        type: 'paragraph',
        text: 'Note: It is possible to bypass this by using Clients.claim().',
      },
      {
        type: 'paragraph',
        text: "You'll want to update your install event listener in the new service worker to something like this (notice the new version number):",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const addResourcesToCache = async (resources) => {\n  const cache = await caches.open("v2");\n  await cache.addAll(resources);\n};\n\nself.addEventListener("install", (event) => {\n  event.waitUntil(\n    addResourcesToCache([\n      "/",\n      "/index.html",\n      "/style.css",\n      "/app.js",\n      "/image-list.js",\n\n      // …\n\n      // include other new resources for the new version…\n    ]),\n  );\n});',
        },
      },
      {
        type: 'paragraph',
        text: "While the service worker is being installed, the previous version is still responsible for fetches. The new version is installing in the background. We are calling the new cache v2, so the previous v1 cache isn't disturbed.",
      },
      {
        type: 'paragraph',
        text: 'When no pages are using the previous version, the new worker activates and becomes responsible for fetches.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Deleting old caches',
      },
      {
        type: 'paragraph',
        text: "As we saw in the last section, when you update a service worker to a new version, you'll create a new cache in its install event handler. While there are open pages that are controlled by the previous version of the worker, you need to keep both caches, because the previous version needs its version of the cache. You can use the activate event to remove data from the previous caches.",
      },
      {
        type: 'paragraph',
        text: 'Promises passed into waitUntil() will block other events until completion, so you can rest assured that your clean-up operation will have completed by the time you get your first fetch event on the new service worker.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const deleteCache = async (key) => {\n  await caches.delete(key);\n};\n\nconst deleteOldCaches = async () => {\n  const cacheKeepList = ["v2"];\n  const keyList = await caches.keys();\n  const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));\n  await Promise.all(cachesToDelete.map(deleteCache));\n};\n\nself.addEventListener("activate", (event) => {\n  event.waitUntil(deleteOldCaches());\n});',
        },
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Chrome',
          'Firefox * The "Forget about this site" button, available in Firefox\'s toolbar customization options, can be used to clear service workers and their caches.',
          'Edge',
        ],
      },
      {
        type: 'list',
        ordered: false,
        items: ['Promises', 'Using web workers', 'Service-Worker-Allowed HTTP header'],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
