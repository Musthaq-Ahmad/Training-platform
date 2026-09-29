import type { ContentTopic } from '../../../types';

export const webdevPwaTopics = {
  'webdev-pwa': {
    id: 'webdev-pwa',
    heading: 'Register a service worker',
    blocks: [
      {
        type: 'paragraph',
        text: "Before a service worker takes control of your page, it must be registered for your PWA. That means the first time a user opens your PWA, all its network requests go directly to your server because the service worker doesn't have control of your pages yet.",
      },
      {
        type: 'paragraph',
        text: 'After checking whether the browser supports the Service Worker API, your PWA can register a service worker. After it loads, the service worker sets itself up between your PWA and the network, intercepting requests and serving the corresponding responses.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'if (\'serviceWorker\' in navigator) {\n   navigator.serviceWorker.register("/serviceworker.js");\n}',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Verify whether a service worker is registered',
      },
      {
        type: 'paragraph',
        text: 'To verify whether a service worker is registered, use developer tools in your favorite browser.',
      },
      {
        type: 'paragraph',
        text: 'In Firefox and Chromium-based browsers (Microsoft Edge, Google Chrome, or Samsung Internet):',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'Open developer tools, then click the Application tab.',
          'In the left pane, select Service Workers.',
          'Check that the service worker\'s script URL appears with the status "Activated". (For more information, see Lifecycle). On Firefox, the status can be "Running" or "Stopped".',
        ],
      },
      {
        type: 'paragraph',
        text: 'In Safari:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'Click Develop &gt; Service Workers.',
          "Check this menu for an entry with the current origin. Clicking that entry opens an inspector over the service worker's context.",
        ],
      },
      {
        type: 'image',
        src: '/src/content/assets/js/service-worker-developer-5ebe49234dc0f.png',
        alt: 'Service worker developer tools on Chrome, Firefox and Safari.',
      },
      {
        type: 'paragraph',
        text: 'Service worker developer tools on Chrome, Firefox and Safari.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Scope',
      },
      {
        type: 'paragraph',
        text: 'The folder your service worker sits in determines its scope. A service worker that lives at example.com/my-pwa/sw.js can control any navigation at or under the my-pwa path, such as example.com/my-pwa/demos/. Service workers can control only items (pages, workers, collectively "clients") in their scope. This scope applies to browser tabs and PWA windows.',
      },
      {
        type: 'paragraph',
        text: 'Only one service worker is allowed per scope. When a service worker is active and running, only one instance is typically available no matter how many clients (PWA windows or browser tabs) are in memory.',
      },
      {
        type: 'paragraph',
        text: "Safari has more complex scope management, known as partitions, affecting how scopes work with cross-domain iframes. To learn more about WebKit's implementation, refer to their blog post.",
      },
      {
        type: 'paragraph',
        text: "Service workers have a lifecycle that dictates how they're installed, separately from your PWA installation.",
      },
      {
        type: 'paragraph',
        text: "The service worker lifecycle starts with registering the service worker. The browser then tries to download and parse the service worker file. If parsing succeeds, the service worker's install event is fired. The install event only fires once.",
      },
      {
        type: 'paragraph',
        text: "Service worker installation happens silently, without requiring user permission, even if the user doesn't install the PWA. The Service Worker API is available even on platforms that don't support PWA installation, such as Safari and Firefox on desktop devices.",
      },
      {
        type: 'paragraph',
        text: "After the installation, the service worker needs to be activated before it can control its clients, including your PWA. When the service worker is ready to control its clients, the activate event fires. However, by default, an activated service worker can't manage the page that registered it until the next time you navigate to that page by reloading the page or reopening the PWA.",
      },
      {
        type: 'paragraph',
        text: "You can listen for events in the service worker's global scope using the self object:",
      },
      {
        type: 'paragraph',
        text: 'serviceworker.js',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// This code executes in its own worker or thread\nself.addEventListener("install", event => {\n   console.log("Service worker installed");\n});\nself.addEventListener("activate", event => {\n   console.log("Service worker activated");\n});',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Update a service worker',
      },
      {
        type: 'paragraph',
        text: 'Service workers get updated when the browser detects that the service worker controlling the client and the new version of the service worker file from the server are byte-different.',
      },
      {
        type: 'paragraph',
        text: 'After a successful installation, the new service worker waits to activate until the old service worker no longer controls any clients. This state is called "waiting", and it\'s how the browser ensures that only one version of your service worker is running at a time.',
      },
      {
        type: 'paragraph',
        text: "Refreshing a page or reopening the PWA won't make the new service worker take control. The user must close or navigate away from all tabs and windows using the current service worker and then navigate back to give the new service worker control. For more information, see The service worker lifecycle.",
      },
      {
        type: 'paragraph',
        text: 'An installed and registered service worker can manage all network request within its scope. It runs on its own thread, with activation and termination controlled by the browser, which lets it work even before your PWA is open or after it closes. Service workers run on their own thread, but in-memory state might not persist between runs of a service worker, so make sure anything you want to reuse for each run is available either in IndexedDB or some other persistent storage.',
      },
      {
        type: 'paragraph',
        text: "If it's not already running, a service worker starts whenever a network request is sent in its scope, or when it receives a triggering event like a periodic background sync or a push message.",
      },
      {
        type: 'paragraph',
        text: "Service workers are terminated if they've been idle for a few seconds, or if they've been busy for too long. Timings for this vary between browsers. If a service worker has been terminated and an event occurs that would start it up, it restarts.",
      },
      {
        type: 'paragraph',
        text: "A registered and active service worker uses a thread with a completely different execution lifecycle from your PWA's main thread. However, by default, the service worker file itself has no behavior. It won't cache or serve any resources; these are things your code needs to do. You'll find out how in the following chapters.",
      },
      {
        type: 'paragraph',
        text: "Service worker's capabilities aren't just for proxy or serving HTTP requests. Other features are available on top of it for other purposes, such as background code execution, web push notifications, and process payments. We'll discuss these additions in Capabilities.",
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Service Worker API (MDN)',
          'Service Worker mindset',
          'WebKit Workers at your service',
          'ES Modules in Service Workers',
          'Service worker lifecycle',
        ],
      },
      {
        type: 'paragraph',
        text: 'Die Cache-Speicherung ist ein leistungsstarkes Tool. Dadurch sind Ihre Apps weniger von den Netzwerkbedingungen abhängig. Durch die richtige Verwendung von Caches können Sie Ihre Web-App offline verfügbar machen und Ihre Assets unter allen Netzwerkbedingungen so schnell wie möglich bereitstellen. Wie unter Assets und Daten beschrieben, können Sie die beste Strategie zum Zwischenspeichern der erforderlichen Assets festlegen. Zum Verwalten des Caches, mit dem Ihr Service Worker interagiert, verwenden Sie die Cache Storage API.',
      },
      {
        type: 'paragraph',
        text: 'Die Cache Storage API ist in verschiedenen Kontexten verfügbar:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Der Fensterkontext (der Hauptthread Ihrer PWA).',
          'Der Service Worker.',
          'Alle anderen Mitarbeiter, die Sie beschäftigen.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Ein Vorteil der Verwaltung Ihres Caches mit Service Workern besteht darin, dass sein Lebenszyklus nicht an das Fenster gebunden ist. Das bedeutet, dass Sie den Hauptthread nicht blockieren. Beachten Sie, dass für die Verwendung der Cache Storage API die meisten dieser Kontexte über eine TLS-Verbindung erfolgen müssen.',
      },
      {
        type: 'paragraph',
        text: 'Die erste Frage, die Sie sich zum Caching stellen, ist wahrscheinlich, was gecacht werden soll. Es gibt keine Universallösung für diese Frage. Sie können jedoch mit allen Mindestressourcen beginnen, die zum Rendern der Benutzeroberfläche erforderlich sind.',
      },
      {
        type: 'paragraph',
        text: 'Dazu gehören:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Der HTML-Code der Hauptseite (die start_url Ihrer App).',
          'CSS-Stylesheets, die für die Hauptbenutzeroberfläche benötigt werden.',
          'In der Benutzeroberfläche verwendete Bilder',
          'JavaScript-Dateien, die zum Rendern der Benutzeroberfläche erforderlich sind.',
          'Daten wie eine JSON-Datei, die zum Rendern einer einfachen Darstellung erforderlich sind.',
          'Webfonts',
          'In einer mehrseitigen Anwendung andere HTML-Dokumente, die schnell oder offline bereitgestellt werden sollen.',
        ],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Für den Offlinezugriff verfügbar',
      },
      {
        type: 'paragraph',
        text: 'Die Offline-Funktionalität ist zwar eine der Anforderungen für eine progressive Web-App, aber nicht jede PWA muss eine vollständige Offline-Funktionalität bieten, z. B. Cloud-Gaming-Lösungen oder Krypto-Assets-Apps. Daher ist es in Ordnung, eine einfache Benutzeroberfläche anzubieten, die Nutzer durch diese Situationen führt.',
      },
      {
        type: 'paragraph',
        text: 'Ihre PWA sollte keine Fehlermeldung des Browsers rendern, die besagt, dass die Web-Rendering-Engine die Seite nicht laden konnte. Verwenden Sie stattdessen Ihren Service Worker, um Ihre eigenen Mitteilungen anzuzeigen und so einen allgemeinen und verwirrenden Browserfehler zu vermeiden.',
      },
      {
        type: 'paragraph',
        text: 'Je nach den Anforderungen Ihrer PWA können Sie viele verschiedene Caching-Strategien verwenden. Daher ist es wichtig, die Cachenutzung so zu gestalten, dass sie eine schnelle und zuverlässige Nutzung ermöglicht. Wenn beispielsweise alle Assets Ihrer App schnell heruntergeladen werden, nicht viel Speicherplatz benötigen und nicht bei jeder Anfrage aktualisiert werden müssen, ist das Caching aller Assets eine sinnvolle Strategie. Wenn Sie hingegen Ressourcen haben, die die neueste Version sein müssen, sollten Sie in Erwägung ziehen, diese Assets überhaupt nicht zu cachen.',
      },
      {
        type: 'paragraph',
        text: 'Mit der Cache Storage API können Sie eine Reihe von Caches in Ihrem Ursprung definieren, die jeweils durch einen von Ihnen definierten Stringnamen identifiziert werden. Auf die API wird über das caches-Objekt zugegriffen. Mit der Methode open kann ein Cache erstellt oder ein bereits erstellter Cache geöffnet werden. Die Methode „open“ gibt ein Promise für das Cache-Objekt zurück.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'caches.open("pwa-assets")\n.then(cache => {\n  // you can download and store, delete or update resources with cache arguments\n});',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Assets herunterladen und speichern',
      },
      {
        type: 'paragraph',
        text: 'Verwenden Sie die Methoden add oder addAll, um den Browser aufzufordern, die Assets herunterzuladen und zu speichern. Mit der Methode add wird eine Anfrage gestellt und eine HTTP-Antwort gespeichert. Mit addAll wird eine Gruppe von HTTP-Antworten als Transaktion auf Grundlage eines Arrays von Anfragen oder URLs gespeichert.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'caches.open("pwa-assets")\n.then(cache => {\n  cache.add("styles.css"); // it stores only one resource\n  cache.addAll(["styles.css", "app.js"]); // it stores two resources\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'Über die Cache-Speicherschnittstelle wird die gesamte Antwort gespeichert, einschließlich aller Header und des Texts. Sie können sie also später mit einer HTTP-Anfrage oder einer URL als Schlüssel abrufen. Wie das funktioniert, erfahren Sie im Kapitel zum Bereitstellen.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Wann sollte gecacht werden?',
      },
      {
        type: 'paragraph',
        text: 'In Ihrer PWA entscheiden Sie, wann Dateien im Cache gespeichert werden sollen. Eine Möglichkeit besteht darin, beim Installieren des Service Workers so viele Assets wie möglich zu speichern. Das ist aber in der Regel nicht die beste Idee. Das Zwischenspeichern unnötiger Ressourcen verschwendet Bandbreite und Speicherplatz und kann dazu führen, dass Ihre App unbeabsichtigt veraltete Ressourcen bereitstellt.',
      },
      {
        type: 'paragraph',
        text: 'Sie müssen nicht alle Assets auf einmal im Cache speichern. Sie können Assets während des Lebenszyklus Ihrer PWA mehrmals im Cache speichern, z. B.:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Bei der Installation des Service Workers.',
          'Nach dem ersten Laden der Seite.',
          'Wenn der Nutzer einen Abschnitt oder eine Route aufruft.',
          'Wenn das Netzwerk im Leerlauf ist.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Sie können das Caching neuer Dateien im Hauptthread oder im Service Worker-Kontext anfordern.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Assets in einem Service Worker im Cache speichern',
      },
      {
        type: 'paragraph',
        text: 'Eines der häufigsten Szenarien ist das Zwischenspeichern einer Mindestanzahl von Assets bei der Installation des Service Workers. Dazu können Sie die Cache-Speicherschnittstelle innerhalb des install-Ereignisses im Service Worker verwenden.',
      },
      {
        type: 'paragraph',
        text: 'Da der Service Worker-Thread jederzeit beendet werden kann, können Sie den Browser anweisen, auf das addAll-Promise zu warten, um die Wahrscheinlichkeit zu erhöhen, dass alle Assets gespeichert werden und die App konsistent bleibt. Im folgenden Beispiel wird gezeigt, wie das mit der Methode waitUntil des Ereignisarguments, das im Service Worker-Ereignis-Listener empfangen wird, funktioniert.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const urlsToCache = ["/", "app.js", "styles.css", "logo.svg"];\nself.addEventListener("install", event => {\n   event.waitUntil(\n      caches.open("pwa-assets")\n      .then(cache => {\n         return cache.addAll(urlsToCache);\n      });\n   );\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'Die waitUntil()-Methode empfängt ein Promise und fordert den Browser auf, zu warten, bis die Aufgabe im Promise abgeschlossen ist (erfüllt oder fehlgeschlagen), bevor der Service Worker-Prozess beendet wird. Möglicherweise müssen Sie Promises verketten und die add()- oder addAll()-Aufrufe zurückgeben, damit ein einzelnes Ergebnis an die waitUntil()-Methode übergeben wird.',
      },
      {
        type: 'paragraph',
        text: 'Sie können Promises auch mit der async/await-Syntax verarbeiten. In diesem Fall müssen Sie eine asynchrone Funktion erstellen, die await aufrufen kann und die nach dem Aufruf ein Promise für waitUntil() zurückgibt, wie im folgenden Beispiel:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const urlsToCache = ["/", "app.js", "styles.css", "logo.svg"];\nself.addEventListener("install", (event) => {\n   let cacheUrls = async () => {\n      const cache = await caches.open("pwa-assets");\n      return cache.addAll(urlsToCache);\n   };\n   event.waitUntil(cacheUrls());\n});',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Domainübergreifende Anfragen und undurchsichtige Antworten',
      },
      {
        type: 'paragraph',
        text: 'Ihre PWA kann Assets von Ihrem Ursprung und von domänenübergreifenden Quellen wie Inhalten von Drittanbieter-CDNs herunterladen und im Cache speichern. Bei einer domainübergreifenden App ähnelt die Cache-Interaktion sehr stark der bei Anfragen mit demselben Ursprung. Die Anfrage wird ausgeführt und eine Kopie der Antwort wird in Ihrem Cache gespeichert. Wie bei anderen im Cache gespeicherten Assets kann es nur im Ursprung Ihrer App verwendet werden.',
      },
      {
        type: 'paragraph',
        text: 'Das Asset wird als undurchsichtige Antwort gespeichert. Das bedeutet, dass Ihr Code den Inhalt oder die Header dieser Antwort nicht sehen oder ändern kann. Außerdem wird die tatsächliche Größe von intransparenten Antworten in der Storage API nicht offengelegt, was sich auf Kontingente auswirkt. Einige Browser geben große Größen an, z. B. 7 MB, unabhängig davon, ob die Datei nur 1 KB groß ist.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Assets aktualisieren und löschen',
      },
      {
        type: 'paragraph',
        text: 'Sie können Assets mit cache.put(request, response) aktualisieren und mit delete(request) löschen.',
      },
      {
        type: 'paragraph',
        text: 'Weitere Informationen finden Sie in der Dokumentation zum Cache-Objekt.',
      },
      {
        type: 'paragraph',
        text: 'Viele Browser bieten die Möglichkeit, den Inhalt des Cache-Speichers auf dem Tab „Anwendung“ der Entwicklertools zu debuggen. Dort sehen Sie den Inhalt jedes Caches im aktuellen Ursprung. Weitere Informationen zu diesen Tools finden Sie im Kapitel „Tools und Debugging“.',
      },
      {
        type: 'image',
        src: '/src/content/assets/js/chrome-devtools-debugging-865b4a170f79c.png',
        alt: 'Cache Storage-Inhalte mit den Chrome-Entwicklertools debuggen',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Cache Storage auf MDN',
          'Die Cache API: Eine Kurzanleitung',
          'The Offline Cookbook',
          'Caching – ein Überblick: Caches prüfen, leeren und deaktivieren',
        ],
      },
      {
        type: 'paragraph',
        text: 'Skip to main content',
      },
      {
        type: 'paragraph',
        text: "The web app manifest is a file you create that tells the browser how you want your web content to display as an app in the operating system. The manifest can include basic information such as the app's name, icon, and theme color; advanced preferences, such as desired orientation and app shortcuts; and catalog metadata, such as screenshots.",
      },
      {
        type: 'paragraph',
        text: 'Each PWA should include a single manifest per application, typically hosted in the root folder, and linked on all HTML pages your PWA can be installed from. Its official extension is .webmanifest, so you could name your manifest something like app.webmanifest.',
      },
      {
        type: 'paragraph',
        text: 'To create a web app manifest, first make a text file with a JSON object that contains at least a name field with a string value:',
      },
      {
        type: 'paragraph',
        text: 'app.webmanifest:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '{\n   "name": "My First Application"\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'But creating the file is not enough, the browser needs to know it exists, too.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Linking to your manifest',
      },
      {
        type: 'paragraph',
        text: "To make the browser aware of your web app manifest, you need to link it to your PWA using a <link> HTML element and the rel attribute set to manifest on all of your PWA's HTML pages. This is similar to how you link a CSS stylesheet to a document.",
      },
      {
        type: 'paragraph',
        text: 'index.html:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<html lang="en">\n  <title>This is my first PWA</title>\n  <link rel="manifest" href="/app.webmanifest">',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Debugging the manifest',
      },
      {
        type: 'paragraph',
        text: 'To ensure the manifest is set up correctly, you can use Inspector in Firefox and DevTools in every Chromium-based browser.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'For Chromium browsers',
      },
      {
        type: 'paragraph',
        text: 'In DevTools',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'In the left pane, under Application, select Manifest.',
          'Check the fields of the manifest as parsed by the browser.',
        ],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'For Firefox',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'Open the Inspector.',
          'Go to the Application tab.',
          'Select the Manifest option in the left panel.',
          'Check the fields of the manifest as parsed by the browser.',
        ],
      },
      {
        type: 'paragraph',
        text: "With your PWA now connected to its manifest, it's time to fill out the rest of the fields to define the experience for your users.",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Basic fields',
      },
      {
        type: 'paragraph',
        text: "The first set of fields represents the core information about your PWA. They are used to build the installed PWA's icon and window and determine how it starts up. They are:",
      },
      {
        type: 'paragraph',
        text: 'name',
      },
      {
        type: 'paragraph',
        text: "Full name of your PWA. It will appear along with the icon in the operating system's home screen, launcher, dock, or menu.",
      },
      {
        type: 'paragraph',
        text: 'short_name',
      },
      {
        type: 'paragraph',
        text: 'Optional, a shorter name of your PWA, used when there is not enough room to display the full value of the name field. Keep it under 12 characters to minimize the possibility of truncation.',
      },
      {
        type: 'paragraph',
        text: 'icons',
      },
      {
        type: 'paragraph',
        text: 'Array of icon objects with src, type, sizes, and optional purpose fields, describing what images should represent the PWA.',
      },
      {
        type: 'paragraph',
        text: 'start_url',
      },
      {
        type: 'paragraph',
        text: "The URL the PWA should load when the user starts it from the installed icon. An absolute path is recommended, so if your PWA's home page is the root of your site, you could set this to ‘/' to open it when your app starts. If you don't provide a start URL, the browser can use the URL the PWA was installed from as a start. It can be a deep link, such as the details of a product instead of your home screen.",
      },
      {
        type: 'paragraph',
        text: 'display',
      },
      {
        type: 'paragraph',
        text: 'One of fullscreen, standalone, minimal-ui, or browser, describing how the OS should draw the PWA window. You can read more about the different display modes in the App Design chapter. Most use cases implement standalone.',
      },
      {
        type: 'paragraph',
        text: 'id',
      },
      {
        type: 'paragraph',
        text: "A string that uniquely identifies this PWA against others that may be hosted on the same origin. If it's not set, the start_url will be used as a fallback value. Keep in mind that by changing the start_url in the future (such as when changing a query string value) you may be removing the browser's ability to detect that a PWA is already installed.",
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Icons',
      },
      {
        type: 'paragraph',
        text: "Your PWA's icon is its visual identity across your users' devices when installed, so it's important to define at least one. Because the icons property is a collection of icon objects, you can define several icons in different formats to provide the best icon experience for your users. Each browser will pick one or more icons based on its needs and the operating system it's installed on, the icons closer to the specifications needed.",
      },
      {
        type: 'paragraph',
        text: 'If you need to pick only one icon size, it should be 512 by 512 pixels. However, providing more sizes is recommended including 192 by 192, 384 by 384, and 1024 by 1024 pixel-sized images, too.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '"icons": [\n   {\n      "src": "icons/512.png",\n      "type": "image/png",\n      "sizes": "512x512"\n   },\n   {\n      "src": "icons/1024.png",\n      "type": "image/png",\n      "sizes": "1024x1024"\n   }\n]',
        },
      },
      {
        type: 'paragraph',
        text: "If you don't provide an icon or the icons are not in the recommended sizes, on some platforms you won't pass installation criteria. On other platforms, the icon will be automatically generated, for instance from a screenshot of the PWA or by using a generic icon.",
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Maskable icons',
      },
      {
        type: 'paragraph',
        text: 'Some operating systems, such as Android, adapt icons to different sizes and shapes. For example, on Android 12, different manufacturers or settings can change the shape of icons from circles to squares to rounded-corner squares. To support these kinds of adaptive icons, you can provide a maskable icon using the purpose field.',
      },
      {
        type: 'paragraph',
        text: 'To do so, provide a square image file that has its main icon contained within a “safe zone”, a circle centered in the icon with a radius of 40 percent of the width of the icon. (See the image below.) Devices that support maskable icons will mask your icon as needed.',
      },
      {
        type: 'image',
        src: '/src/content/assets/js/the-safe-area-marked-a-4-06cd30afb47b2.png',
        alt: 'The safe area marked as a 40 percent radius centered circle within the square icon',
      },
      {
        type: 'paragraph',
        text: "Here's an example of a maskable icon rendered in a number of commonly used shapes:",
      },
      {
        type: 'paragraph',
        text: 'In the following image, if you use the icon at the left as a maskable icon, you will end up with poor results on devices when a shape mask is applied.',
      },
      {
        type: 'image',
        src: '/src/content/assets/js/an-icon-is-suitable-a-554e022a4bec.png',
        alt: 'An icon that is not suitable for a maskable icon.',
      },
      {
        type: 'paragraph',
        text: 'This image could be made usable with more padding.',
      },
      {
        type: 'image',
        src: '/src/content/assets/js/the-icon-more-padding-is-9057ce1028452.png',
        alt: 'The icon with more padding is suitable for masks.',
      },
      {
        type: 'paragraph',
        text: 'Maskable icons should be 512 by 512 at least. With one created, you can add it to your icons collection to improve the experience for supported devices:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '"icons": [\n   {\n      "src": "/icons/512.png",\n      "type": "image/png",\n      "sizes": "512x512"\n   },\n   {\n      "src": "/icons/1024.png",\n      "type": "image/png",\n      "sizes": "1024x1024"\n   },\n   {\n      "src": "/icons/512-maskable.png",\n      "type": "image/png",\n      "sizes": "512x512",\n      "purpose": "maskable"\n   },\n]',
        },
      },
      {
        type: 'paragraph',
        text: "In most cases, if your maskable icon isn't displaying well, you can improve it by adding more padding. Maskable.app is a free online tool to test and create a maskable version of your icon.",
      },
      {
        type: 'paragraph',
        text: 'If your icon serves general and maskable purposes, you can set the purpose field to "any maskable". Refer to the MDN Web App Manifest documentation for details.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Recommended fields',
      },
      {
        type: 'paragraph',
        text: "The next set of fields to include are ones that will improve your user's experience, even though they're not required for installability.",
      },
      {
        type: 'paragraph',
        text: 'theme_color',
      },
      {
        type: 'paragraph',
        text: 'Default color for the application, sometimes affecting how the OS displays the site (for instance, the window and title bar color on desktop, or the status bar color on mobile devices). This color can be overridden by the HTML theme-color <meta> element.',
      },
      {
        type: 'paragraph',
        text: 'background_color',
      },
      {
        type: 'paragraph',
        text: "Placeholder color to display in the application's background before its stylesheet is loaded. Safari on iOS and iPadOS and most desktop browsers currently ignore this field.",
      },
      {
        type: 'paragraph',
        text: 'scope',
      },
      {
        type: 'paragraph',
        text: "Changes the navigation scope of the PWA, allowing you to define what is and isn't displayed within the installed app's window. For example, if you link to a page outside of the scope, it will be rendered in an in-app browser instead of within your PWA window. This will not, however, change the scope of your service worker.",
      },
      {
        type: 'paragraph',
        text: 'The next image shows how the theme_color field is used for the title bar on a desktop device when you install a PWA.',
      },
      {
        type: 'image',
        src: '/src/content/assets/js/the-same-pwa-installed-d-584337198daf1.png',
        alt: 'The same PWA installed on desktop with a different theme color.',
      },
      {
        type: 'paragraph',
        text: 'When defining colors in the manifest, such as within theme_color and background_color, you should use CSS named colors, such as salmon or orange, RGB colors such as #FF5500, or color functions without transparency such as rgb() or hsl(). Check the App design chapter for more information.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Splash screens',
      },
      {
        type: 'paragraph',
        text: 'On some devices, a static image is rendered while your PWA is being loaded to provide immediate feedback to the user.',
      },
      {
        type: 'paragraph',
        text: 'Android uses the theme_color, background_color, and icon values to generate the splash screen.',
      },
      {
        type: 'paragraph',
        text: 'When you install a PWA on Android, the device will generate a splash screen with the information that comes from your manifest as seen in the following diagram.',
      },
      {
        type: 'image',
        src: '/src/content/assets/js/a-pwa-android-splash-scr-fb6e3edede13e.png',
        alt: 'A PWA on Android splash screen taking different values from the manifest.',
      },
      {
        type: 'paragraph',
        text: "Safari on iOS and iPadOS, on the other hand, doesn't use the web app manifest to generate splash screens. Instead, they use an image linked from a proprietary <link> element similar to how they handle icons. Check the Enhancement chapter for more details.",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Extended fields',
      },
      {
        type: 'paragraph',
        text: 'The next set of fields offers additional information about your PWA. They are all optional.',
      },
      {
        type: 'paragraph',
        text: 'lang',
      },
      {
        type: 'paragraph',
        text: "A language tag specifying the primary language of the manifest's values, such as en for English, pt-BR for Brazilian Portuguese, or in for Hindi.",
      },
      {
        type: 'paragraph',
        text: 'dir',
      },
      {
        type: 'paragraph',
        text: 'The direction to display direction-capable manifest fields (such as name, short_name, and description). Valid values are auto, ltr (left-to-right), and rtl (right-to-left).',
      },
      {
        type: 'paragraph',
        text: 'orientation',
      },
      {
        type: 'paragraph',
        text: "Desired orientation for the app once installed. A game may set this to request a landscape-only orientation. Several values are accepted, but if included it's typically portrait or landscape explicitly.",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Promotional fields',
      },
      {
        type: 'paragraph',
        text: 'The fourth set of fields lets you provide promotional information about your PWA, for instance, in install flows, listings, and search results.',
      },
      {
        type: 'paragraph',
        text: 'description',
      },
      {
        type: 'paragraph',
        text: 'An explanation of what the PWA does.',
      },
      {
        type: 'paragraph',
        text: 'screenshots',
      },
      {
        type: 'paragraph',
        text: 'Array of screenshot objects with src, type, and sizes (similar to the icons object) intended to showcase the PWA. There are no size restrictions.',
      },
      {
        type: 'paragraph',
        text: 'categories',
      },
      {
        type: 'paragraph',
        text: 'Array of categories the PWA should belong to be used as hints for listings, optionally from the list of known categories. These values are typically lowercase.',
      },
      {
        type: 'paragraph',
        text: 'iarc_rating_id',
      },
      {
        type: 'paragraph',
        text: 'The International Age Rating Coalition certification code for the PWA, if you have one. It is intended to be used to determine which ages your PWA is appropriate for.',
      },
      {
        type: 'paragraph',
        text: 'You can see these promotional fields in action today. On Android, for example, if your PWA is installable and you provide values for at least the description and screenshots fields, the installation dialog experience transforms from a simple "Add to the home screen" info bar, to a richer installation dialog similar to the one from an app store.',
      },
      {
        type: 'paragraph',
        text: 'On Android, you can get a nicer installation UI if you provide values for the promotional fields, as you can see in the next video',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Capabilities Fields',
      },
      {
        type: 'paragraph',
        text: 'Finally, there are a number of fields related to different capabilities that your PWA can use in supported browsers, such as the shortcuts, share_target, display_override fields as we cover in the Capabilities chapter. There are also fields, like related_apps and prefer_related_apps (see the Detection chapter for more information), to connect your PWA to installed apps, often from an app store.',
      },
      {
        type: 'paragraph',
        text: 'Many new fields may appear in the future while browsers add more capabilities to Progressive Web Apps.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Add a Web App Manifest',
          'Adaptive icon support in PWAs with maskable icons',
          'Richer PWA installation UI',
          'MDN: Web App Manifest',
        ],
      },
      {
        type: 'paragraph',
        text: 'Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.',
      },
      {
        type: 'paragraph',
        text: 'Last updated 2024-12-09 UTC.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
