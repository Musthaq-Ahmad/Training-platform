Users expect apps to start reliably on slow or flaky network connections, or even offline. They expect the content they've most recently interacted with, such as media tracks or tickets and itineraries, to be available and usable. When a request isn't possible, they expect the app to tell them instead of silently failing or crashing. And they want all of this to happen quickly. As you can see in [Milliseconds make millions](https://web.dev/case-studies/milliseconds-make-millions), even a 0.1 second improvement in load times can improve conversion by up to 10%. Service workers are the tool that lets your Progressive Web App (PWA) live up to your users' expectations.

![A service worker as a middleware proxy, running device-side, between your PWA and servers, which includes both your own servers and cross-domain servers.](/src/content/assets/js/a-service-worker-a-middl-982e684894b75.png)

A service worker acts as middleware between your PWA and the servers it interacts with.

When an app requests a resource covered by the service worker's scope, the service worker intercepts the request and acts as a network proxy, even if the user is offline. It can then decide if it should serve the resource from the cache using the Cache Storage API, serve it from the network as if there were no active service worker, or create it from a local algorithm. This lets you provide a high-quality experience like that of a platform app, even when your app is offline.

## Register a service worker

Before a service worker takes control of your page, it must be registered for your PWA. That means the first time a user opens your PWA, all its network requests go directly to your server because the service worker doesn't have control of your pages yet.

After checking whether the browser supports the Service Worker API, your PWA can register a service worker. After it loads, the service worker sets itself up between your PWA and the network, intercepting requests and serving the corresponding responses.

```
if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register("/serviceworker.js");
}
```

### Verify whether a service worker is registered

To verify whether a service worker is registered, use developer tools in your favorite browser.

In Firefox and Chromium-based browsers (Microsoft Edge, Google Chrome, or Samsung Internet):

1.  Open developer tools, then click the **Application** tab.
2.  In the left pane, select **Service Workers**.
3.  Check that the service worker's script URL appears with the status "Activated". (For more information, see [Lifecycle](#lifecycle)). On Firefox, the status can be "Running" or "Stopped".

In Safari:

1.  Click **Develop** > **Service Workers**.
2.  Check this menu for an entry with the current origin. Clicking that entry opens an inspector over the service worker's context.

![Service worker developer tools on Chrome, Firefox and Safari.](/src/content/assets/js/service-worker-developer-5ebe49234dc0f.png)

Service worker developer tools on Chrome, Firefox and Safari.

### Scope

The folder your service worker sits in determines its scope. A service worker that lives at `example.com/my-pwa/sw.js` can control any navigation at or under the _my-pwa_ path, such as `example.com/my-pwa/demos/`. Service workers can control only items (pages, workers, collectively "clients") in their scope. This scope applies to browser tabs and PWA windows.

Only _one_ service worker is allowed per scope. When a service worker is active and running, only one instance is typically available no matter how many clients (PWA windows or browser tabs) are in memory.

Safari has more complex scope management, known as partitions, affecting how scopes work with cross-domain iframes. To learn more about WebKit's implementation, refer to [their blog post](https://webkit.org/blog/8090/workers-at-your-service/).

## Lifecycle

Service workers have a lifecycle that dictates how they're installed, separately from your PWA installation.

The service worker lifecycle starts with registering the service worker. The browser then tries to download and parse the service worker file. If parsing succeeds, the service worker's `install` event is fired. The `install` event only fires once.

Service worker installation happens silently, without requiring user permission, even if the user doesn't install the PWA. The Service Worker API is available even on platforms that don't support PWA installation, such as Safari and Firefox on desktop devices.

After the installation, the service worker needs to be activated before it can control its clients, including your PWA. When the service worker is ready to control its clients, the `activate` event fires. However, by default, an activated service worker can't manage the page that registered it until the next time you navigate to that page by reloading the page or reopening the PWA.

You can listen for events in the service worker's global scope using the `self` object:

serviceworker.js

```
// This code executes in its own worker or thread
self.addEventListener("install", event => {
   console.log("Service worker installed");
});
self.addEventListener("activate", event => {
   console.log("Service worker activated");
});
```

### Update a service worker

Service workers get updated when the browser detects that the service worker controlling the client and the new version of the service worker file from the server are byte-different.

After a successful installation, the new service worker waits to activate until the old service worker no longer controls any clients. This state is called "waiting", and it's how the browser ensures that only one version of your service worker is running at a time.

Refreshing a page or reopening the PWA won't make the new service worker take control. The user must close or navigate away from all tabs and windows using the current service worker and then navigate back to give the new service worker control. For more information, see [The service worker lifecycle](https://web.dev/articles/service-worker-lifecycle).

## Service worker lifespan

An installed and registered service worker can manage all network request within its scope. It runs on its own thread, with activation and termination controlled by the browser, which lets it work even before your PWA is open or after it closes. Service workers run on their own thread, but in-memory state might not persist between runs of a service worker, so make sure anything you want to reuse for each run is available either in IndexedDB or some other persistent storage.

If it's not already running, a service worker starts whenever a network request is sent in its scope, or when it receives a triggering event like a periodic background sync or a push message.

Service workers are terminated if they've been idle for a few seconds, or if they've been busy for too long. Timings for this vary between browsers. If a service worker has been terminated and an event occurs that would start it up, it restarts.

## Capabilities

A registered and active service worker uses a thread with a completely different execution lifecycle from your PWA's main thread. However, by default, the service worker file itself has no behavior. It won't cache or serve any resources; these are things your code needs to do. You'll find out how in the following chapters.

Service worker's capabilities aren't just for proxy or serving HTTP requests. Other features are available on top of it for other purposes, such as background code execution, web push notifications, and process payments. We'll discuss these additions in [Capabilities](https://web.dev/learn/pwa/capabilities).

## Resources

- [Service Worker API (MDN)](https://developer.mozilla.org/docs/Web/API/Service_Worker_API)
- [Service Worker mindset](https://web.dev/articles/service-worker-mindset)
- [WebKit Workers at your service](https://webkit.org/blog/8090/workers-at-your-service/)
- [ES Modules in Service Workers](https://web.dev/articles/es-modules-in-sw)
- [Service worker lifecycle](https://web.dev/articles/service-worker-lifecycle)

---

Die Cache-Speicherung ist ein leistungsstarkes Tool. Dadurch sind Ihre Apps weniger von den Netzwerkbedingungen abhängig. Durch die richtige Verwendung von Caches können Sie Ihre Web-App offline verfügbar machen und Ihre Assets unter allen Netzwerkbedingungen so schnell wie möglich bereitstellen. Wie unter [Assets und Daten](https://web.dev/learn/pwa/assets-and-data?hl=de) beschrieben, können Sie die beste Strategie zum Zwischenspeichern der erforderlichen Assets festlegen. Zum Verwalten des Caches, mit dem Ihr Service Worker interagiert, verwenden Sie die [Cache Storage API](https://developer.mozilla.org/docs/Web/API/CacheStorage).

Die Cache Storage API ist in verschiedenen Kontexten verfügbar:

- Der Fensterkontext (der Hauptthread Ihrer PWA).
- Der Service Worker.
- Alle anderen Mitarbeiter, die Sie beschäftigen.

Ein Vorteil der Verwaltung Ihres Caches mit Service Workern besteht darin, dass sein Lebenszyklus nicht an das Fenster gebunden ist. Das bedeutet, dass Sie den Hauptthread nicht blockieren. Beachten Sie, dass für die Verwendung der Cache Storage API die meisten dieser Kontexte über eine TLS-Verbindung erfolgen müssen.

## Was im Cache gespeichert werden soll

Die erste Frage, die Sie sich zum Caching stellen, ist wahrscheinlich, was gecacht werden soll. Es gibt keine Universallösung für diese Frage. Sie können jedoch mit allen Mindestressourcen beginnen, die zum Rendern der Benutzeroberfläche erforderlich sind.

Dazu gehören:

- Der HTML-Code der Hauptseite (die start\_url Ihrer App).
- CSS-Stylesheets, die für die Hauptbenutzeroberfläche benötigt werden.
- In der Benutzeroberfläche verwendete Bilder
- JavaScript-Dateien, die zum Rendern der Benutzeroberfläche erforderlich sind.
- Daten wie eine JSON-Datei, die zum Rendern einer einfachen Darstellung erforderlich sind.
- Webfonts
- In einer mehrseitigen Anwendung andere HTML-Dokumente, die schnell oder offline bereitgestellt werden sollen.

### Für den Offlinezugriff verfügbar

Die Offline-Funktionalität ist zwar eine der Anforderungen für eine progressive Web-App, aber nicht jede PWA muss eine vollständige Offline-Funktionalität bieten, z. B. Cloud-Gaming-Lösungen oder Krypto-Assets-Apps. Daher ist es in Ordnung, eine einfache Benutzeroberfläche anzubieten, die Nutzer durch diese Situationen führt.

Ihre PWA sollte keine Fehlermeldung des Browsers rendern, die besagt, dass die Web-Rendering-Engine die Seite nicht laden konnte. Verwenden Sie stattdessen Ihren Service Worker, um Ihre eigenen Mitteilungen anzuzeigen und so einen allgemeinen und verwirrenden Browserfehler zu vermeiden.

Je nach den Anforderungen Ihrer PWA können Sie viele verschiedene Caching-Strategien verwenden. Daher ist es wichtig, die Cachenutzung so zu gestalten, dass sie eine schnelle und zuverlässige Nutzung ermöglicht. Wenn beispielsweise alle Assets Ihrer App schnell heruntergeladen werden, nicht viel Speicherplatz benötigen und nicht bei jeder Anfrage aktualisiert werden müssen, ist das Caching aller Assets eine sinnvolle Strategie. Wenn Sie hingegen Ressourcen haben, die die neueste Version sein müssen, sollten Sie in Erwägung ziehen, diese Assets überhaupt nicht zu cachen.

## API verwenden

Mit der Cache Storage API können Sie eine Reihe von Caches in Ihrem Ursprung definieren, die jeweils durch einen von Ihnen definierten Stringnamen identifiziert werden. Auf die API wird über das `caches`\-Objekt zugegriffen. Mit der Methode `open` kann ein Cache erstellt oder ein bereits erstellter Cache geöffnet werden. Die Methode „open“ gibt ein Promise für das Cache-Objekt zurück.

```
caches.open("pwa-assets")
.then(cache => {
  // you can download and store, delete or update resources with cache arguments
});
```

### Assets herunterladen und speichern

Verwenden Sie die Methoden `add` oder `addAll`, um den Browser aufzufordern, die Assets herunterzuladen und zu speichern. Mit der Methode `add` wird eine Anfrage gestellt und eine HTTP-Antwort gespeichert. Mit `addAll` wird eine Gruppe von HTTP-Antworten als Transaktion auf Grundlage eines Arrays von Anfragen oder URLs gespeichert.

```
caches.open("pwa-assets")
.then(cache => {
  cache.add("styles.css"); // it stores only one resource
  cache.addAll(["styles.css", "app.js"]); // it stores two resources
});
```

Über die Cache-Speicherschnittstelle wird die gesamte Antwort gespeichert, einschließlich aller Header und des Texts. Sie können sie also später mit einer HTTP-Anfrage oder einer URL als Schlüssel abrufen. Wie das funktioniert, erfahren Sie [im Kapitel zum Bereitstellen](https://web.dev/learn/pwa/serving?hl=de).

### Wann sollte gecacht werden?

In Ihrer PWA entscheiden Sie, wann Dateien im Cache gespeichert werden sollen. Eine Möglichkeit besteht darin, beim Installieren des Service Workers so viele Assets wie möglich zu speichern. Das ist aber in der Regel nicht die beste Idee. Das Zwischenspeichern unnötiger Ressourcen verschwendet Bandbreite und Speicherplatz und kann dazu führen, dass Ihre App unbeabsichtigt veraltete Ressourcen bereitstellt.

Sie müssen nicht alle Assets auf einmal im Cache speichern. Sie können Assets während des Lebenszyklus Ihrer PWA mehrmals im Cache speichern, z. B.:

- Bei der Installation des Service Workers.
- Nach dem ersten Laden der Seite.
- Wenn der Nutzer einen Abschnitt oder eine Route aufruft.
- Wenn das Netzwerk im Leerlauf ist.

Sie können das Caching neuer Dateien im Hauptthread oder im Service Worker-Kontext anfordern.

### Assets in einem Service Worker im Cache speichern

Eines der häufigsten Szenarien ist das Zwischenspeichern einer Mindestanzahl von Assets bei der Installation des Service Workers. Dazu können Sie die Cache-Speicherschnittstelle innerhalb des `install`\-Ereignisses im Service Worker verwenden.

Da der Service Worker-Thread jederzeit beendet werden kann, können Sie den Browser anweisen, auf das `addAll`\-Promise zu warten, um die Wahrscheinlichkeit zu erhöhen, dass alle Assets gespeichert werden und die App konsistent bleibt. Im folgenden Beispiel wird gezeigt, wie das mit der Methode `waitUntil` des Ereignisarguments, das im Service Worker-Ereignis-Listener empfangen wird, funktioniert.

```
const urlsToCache = ["/", "app.js", "styles.css", "logo.svg"];
self.addEventListener("install", event => {
   event.waitUntil(
      caches.open("pwa-assets")
      .then(cache => {
         return cache.addAll(urlsToCache);
      });
   );
});
```

Die [`waitUntil()`\-Methode](https://developer.mozilla.org/docs/Web/API/ExtendableEvent/waitUntil) empfängt ein Promise und fordert den Browser auf, zu warten, bis die Aufgabe im Promise abgeschlossen ist (erfüllt oder fehlgeschlagen), bevor der Service Worker-Prozess beendet wird. Möglicherweise müssen Sie Promises verketten und die `add()`\- oder `addAll()`\-Aufrufe zurückgeben, damit ein einzelnes Ergebnis an die `waitUntil()`\-Methode übergeben wird.

Sie können Promises auch mit der async/await-Syntax verarbeiten. In diesem Fall müssen Sie eine asynchrone Funktion erstellen, die `await` aufrufen kann und die nach dem Aufruf ein Promise für `waitUntil()` zurückgibt, wie im folgenden Beispiel:

```
const urlsToCache = ["/", "app.js", "styles.css", "logo.svg"];
self.addEventListener("install", (event) => {
   let cacheUrls = async () => {
      const cache = await caches.open("pwa-assets");
      return cache.addAll(urlsToCache);
   };
   event.waitUntil(cacheUrls());
});
```

### Domainübergreifende Anfragen und undurchsichtige Antworten

Ihre PWA kann Assets von Ihrem Ursprung und von domänenübergreifenden Quellen wie Inhalten von Drittanbieter-CDNs herunterladen und im Cache speichern. Bei einer domainübergreifenden App ähnelt die Cache-Interaktion sehr stark der bei Anfragen mit demselben Ursprung. Die Anfrage wird ausgeführt und eine Kopie der Antwort wird in Ihrem Cache gespeichert. Wie bei anderen im Cache gespeicherten Assets kann es nur im Ursprung Ihrer App verwendet werden.

Das Asset wird als [undurchsichtige Antwort](https://fetch.spec.whatwg.org/#concept-filtered-response-opaque) gespeichert. Das bedeutet, dass Ihr Code den Inhalt oder die Header dieser Antwort nicht sehen oder ändern kann. Außerdem wird die tatsächliche Größe von intransparenten Antworten in der Storage API nicht offengelegt, was sich auf Kontingente auswirkt. Einige Browser geben große Größen an, z. B. 7 MB, unabhängig davon, ob die Datei nur 1 KB groß ist.

### Assets aktualisieren und löschen

Sie können Assets mit `cache.put(request, response)` aktualisieren und mit `delete(request)` löschen.

Weitere Informationen finden Sie in der [Dokumentation zum Cache-Objekt](https://developer.mozilla.org/docs/Web/API/Cache).

## Cache-Speicher debuggen

Viele Browser bieten die Möglichkeit, den Inhalt des Cache-Speichers auf dem Tab „Anwendung“ der Entwicklertools zu debuggen. Dort sehen Sie den Inhalt jedes Caches im aktuellen Ursprung. Weitere Informationen zu diesen Tools finden Sie im [Kapitel „Tools und Debugging“](https://web.dev/learn/pwa/tools-and-debug?hl=de).

![Cache Storage-Inhalte mit den Chrome-Entwicklertools debuggen](/src/content/assets/js/chrome-devtools-debugging-865b4a170f79c.png)

## Ressourcen

- [Cache Storage auf MDN](https://developer.mozilla.org/docs/Web/API/CacheStorage)
- [Die Cache API: Eine Kurzanleitung](https://web.dev/articles/cache-api-quick-guide?hl=de)
- [The Offline Cookbook](https://web.dev/articles/offline-cookbook?hl=de)
- [Caching – ein Überblick: Caches prüfen, leeren und deaktivieren](https://developer.chrome.com/blog/devtools-tips-36?hl=de)

---

[Skip to main content](#main-content)

## Web app manifest

The web app manifest is a file you create that tells the browser how you want your web content to display as an app in the operating system. The manifest can include basic information such as the app's name, icon, and theme color; advanced preferences, such as desired orientation and app shortcuts; and catalog metadata, such as screenshots.

Each PWA should include a single manifest per application, typically hosted in the root folder, and linked on all HTML pages your PWA can be installed from. Its official extension is `.webmanifest`, so you could name your manifest something like `app.webmanifest`.

## Adding a web app manifest to your PWA

To create a web app manifest, first make a text file with a JSON object that contains at least a `name` field with a string value:

app.webmanifest:

```
{
   "name": "My First Application"
}
```

But creating the file is not enough, the browser needs to know it exists, too.

### Linking to your manifest

To make the browser aware of your web app manifest, you need to link it to your PWA using a `<link>` HTML element and the `rel` attribute set to `manifest` on all of your PWA's HTML pages. This is similar to how you link a CSS stylesheet to a document.

index.html:

```
<html lang="en">
  <title>This is my first PWA</title>
  <link rel="manifest" href="/app.webmanifest">
```

### Debugging the manifest

To ensure the manifest is set up correctly, you can use Inspector in Firefox and DevTools in every Chromium-based browser.

### For Chromium browsers

In DevTools

1.  In the left pane, under **Application**, select **Manifest**.
2.  Check the fields of the manifest as parsed by the browser.

### For Firefox

1.  Open the Inspector.
2.  Go to the Application tab.
3.  Select the Manifest option in the left panel.
4.  Check the fields of the manifest as parsed by the browser.

## Designing your PWA experience

With your PWA now connected to its manifest, it's time to fill out the rest of the fields to define the experience for your users.

### Basic fields

The first set of fields represents the core information about your PWA. They are used to build the installed PWA's icon and window and determine how it starts up. They are:

`name`

Full name of your PWA. It will appear along with the icon in the operating system's home screen, launcher, dock, or menu.

`short_name`

Optional, a shorter name of your PWA, used when there is not enough room to display the full value of the `name` field. Keep it under 12 characters to minimize the possibility of truncation.

`icons`

Array of icon objects with `src`, `type`, `sizes`, and optional `purpose` fields, describing what images should represent the PWA.

`start_url`

The URL the PWA should load when the user starts it from the installed icon. An absolute path is recommended, so if your PWA's home page is the root of your site, you could set this to ‘/' to open it when your app starts. If you don't provide a start URL, the browser can use the URL the PWA was installed from as a start. It can be a deep link, such as the details of a product instead of your home screen.

`display`

One of `fullscreen`, `standalone`, `minimal-ui`, or `browser`, describing how the OS should draw the PWA window. You can read more about the different display modes in the [App Design chapter](https://web.dev/learn/pwa/app-design#display_modes). [Most](https://almanac.httparchive.org/en/2021/pwa#top-manifest-display-values) use cases implement `standalone`.

`id`

A string that uniquely identifies this PWA against others that may be hosted on the same origin. If it's not set, the `start_url` will be used as a fallback value. Keep in mind that by changing the `start_url` in the future (such as when changing a query string value) you may be removing the browser's ability to detect that a PWA is already installed.

#### Icons

Your PWA's icon is its visual identity across your users' devices when installed, so it's important to define at least one. Because the `icons` property is a collection of icon objects, you can define several icons in different formats to provide the best icon experience for your users. Each browser will pick one or more icons based on its needs and the operating system it's installed on, the icons closer to the specifications needed.

If you need to pick only one icon size, it should be 512 by 512 pixels. However, providing more sizes is recommended including 192 by 192, 384 by 384, and 1024 by 1024 pixel-sized images, too.

```
"icons": [
   {
      "src": "icons/512.png",
      "type": "image/png",
      "sizes": "512x512"
   },
   {
      "src": "icons/1024.png",
      "type": "image/png",
      "sizes": "1024x1024"
   }
]
```

If you don't provide an icon or the icons are not in the recommended sizes, on some platforms you won't pass [installation criteria](https://web.dev/learn/pwa/installation#installation_criteria). On other platforms, the icon will be automatically generated, for instance from a screenshot of the PWA or by using a generic icon.

##### Maskable icons

Some operating systems, such as Android, adapt icons to different sizes and shapes. For example, on Android 12, different manufacturers or settings can change the shape of icons from circles to squares to rounded-corner squares. To support these kinds of adaptive icons, you can provide a maskable icon using the `purpose` field.

To do so, provide a square image file that has its main icon contained within a “safe zone”, a circle centered in the icon with a radius of 40 percent of the width of the icon. (See the image below.) Devices that support maskable icons will mask your icon as needed.

![The safe area marked as a 40 percent radius centered circle within the square icon](/src/content/assets/js/the-safe-area-marked-a-4-06cd30afb47b2.png)

Here's an example of a maskable icon rendered in a number of commonly used shapes:

In the following image, if you use the icon at the left as a maskable icon, you will end up with poor results on devices when a shape mask is applied.

![An icon that is not suitable for a maskable icon.](/src/content/assets/js/an-icon-is-suitable-a-554e022a4bec.png)

This image could be made usable with more padding.

![The icon with more padding is suitable for masks.](/src/content/assets/js/the-icon-more-padding-is-9057ce1028452.png)

Maskable icons should be 512 by 512 at least. With one created, you can add it to your `icons` collection to improve the experience for supported devices:

```
"icons": [
   {
      "src": "/icons/512.png",
      "type": "image/png",
      "sizes": "512x512"
   },
   {
      "src": "/icons/1024.png",
      "type": "image/png",
      "sizes": "1024x1024"
   },
   {
      "src": "/icons/512-maskable.png",
      "type": "image/png",
      "sizes": "512x512",
      "purpose": "maskable"
   },
]
```

In most cases, if your maskable icon isn't displaying well, you can improve it by adding more padding. [Maskable.app](https://maskable.app/) is a free online tool to test and create a maskable version of your icon.

If your icon serves general and maskable purposes, you can set the `purpose` field to `"any maskable"`. Refer to the [MDN Web App Manifest documentation](https://developer.mozilla.org/docs/Web/Manifest/icons#purpose) for details.

### Recommended fields

The next set of fields to include are ones that will improve your user's experience, even though they're not required for installability.

`theme_color`

Default color for the application, sometimes affecting how the OS displays the site (for instance, the window and title bar color on desktop, or the status bar color on mobile devices). This color can be overridden by the HTML `theme-color` `<meta>` element.

`background_color`

Placeholder color to display in the application's background before its stylesheet is loaded. Safari on iOS and iPadOS and most desktop browsers currently ignore this field.

`scope`

Changes the navigation scope of the PWA, allowing you to define what is and isn't displayed within the installed app's window. For example, if you link to a page outside of the scope, it will be rendered in an in-app browser instead of within your PWA window. This will not, however, change the scope of your service worker.

The next image shows how the `theme_color` field is used for the title bar on a desktop device when you install a PWA.

![The same PWA installed on desktop with a different theme color.](/src/content/assets/js/the-same-pwa-installed-d-584337198daf1.png)

When defining colors in the manifest, such as within `theme_color` and `background_color`, you should use CSS named colors, such as `salmon` or `orange`, RGB colors such as `#FF5500`, or color functions without transparency such as `rgb()` or `hsl()`. Check the [App design chapter](https://web.dev/learn/pwa/app-design#theming_your_app) for more information.

#### Splash screens

On some devices, a static image is rendered while your PWA is being loaded to provide immediate feedback to the user.

Android uses the `theme_color`, `background_color`, and `icon` values to generate the splash screen.

When you install a PWA on Android, the device will generate a splash screen with the information that comes from your manifest as seen in the following diagram.

![A PWA on Android splash screen taking different values from the manifest.](/src/content/assets/js/a-pwa-android-splash-scr-fb6e3edede13e.png)

Safari on iOS and iPadOS, on the other hand, doesn't use the web app manifest to generate splash screens. Instead, they use an image linked from a proprietary `<link>` element similar to how they handle icons. Check the [Enhancement chapter](https://web.dev/learn/pwa/enhancements) for more details.

### Extended fields

The next set of fields offers additional information about your PWA. They are all optional.

`lang`

A language tag specifying the primary language of the manifest's values, such as `en` for English, `pt-BR` for Brazilian Portuguese, or `in` for Hindi.

`dir`

The direction to display direction-capable manifest fields (such as `name`, `short_name`, and `description`). Valid values are `auto`, `ltr` (left-to-right), and `rtl` (right-to-left).

`orientation`

Desired orientation for the app once installed. A game may set this to request a landscape-only orientation. [Several values](https://developer.mozilla.org/docs/Web/Manifest/orientation#values) are accepted, but if included it's typically `portrait` or `landscape` explicitly.

### Promotional fields

The fourth set of fields lets you provide promotional information about your PWA, for instance, in install flows, listings, and search results.

`description`

An explanation of what the PWA does.

`screenshots`

Array of screenshot objects with `src`, `type`, and `sizes` (similar to the `icons` object) intended to showcase the PWA. There are no size restrictions.

`categories`

Array of categories the PWA should belong to be used as hints for listings, optionally from the list of [known categories](https://www.w3.org/TR/manifest-app-info/#categories-member). These values are typically lowercase.

`iarc_rating_id`

The International Age Rating Coalition certification code for the PWA, if you have one. It is intended to be used to determine which ages your PWA is appropriate for.

You can see these promotional fields in action today. On Android, for example, if your PWA is installable and you provide values for at least the `description` and `screenshots` fields, the installation dialog experience transforms from a simple "Add to the home screen" info bar, to a richer installation dialog similar to the one from an app store.

On Android, you can get a nicer installation UI if you provide values for the promotional fields, as you can see in the next video

### Capabilities Fields

Finally, there are a number of fields related to different capabilities that your PWA can use in supported browsers, such as the `shortcuts`, `share_target`, `display_override` fields as we cover in the [Capabilities chapter](https://web.dev/learn/pwa/capabilities). There are also fields, like `related_apps` and `prefer_related_apps` (see the [Detection chapter](https://web.dev/learn/pwa/detection) for more information), to connect your PWA to installed apps, often from an app store.

Many new fields may appear in the future while browsers add more capabilities to Progressive Web Apps.

## Resources

- [Add a Web App Manifest](https://web.dev/articles/add-manifest)
- [Adaptive icon support in PWAs with maskable icons](https://web.dev/articles/maskable-icon)
- [Richer PWA installation UI](https://developer.chrome.com/blog/richer-pwa-installation)
- [MDN: Web App Manifest](https://developer.mozilla.org/docs/Web/Manifest)

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-12-09 UTC.
