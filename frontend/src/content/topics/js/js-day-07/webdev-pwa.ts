import type { ContentTopic } from '../../../types';

export const webdevPwaTopics = {
  'webdev-pwa': {
    id: 'webdev-pwa',
    heading: '서비스 워커 등록',
    blocks: [
      {
        type: 'paragraph',
        text: '서비스 워커가 페이지를 제어하려면 먼저 PWA에 등록해야 합니다. 즉, 사용자가 PWA를 처음 열면 서비스 워커가 아직 페이지를 제어하지 않으므로 모든 네트워크 요청이 서버로 직접 전송됩니다.',
      },
      {
        type: 'paragraph',
        text: '브라우저가 Service Worker API를 지원하는지 확인한 후 PWA는 서비스 워커를 등록할 수 있습니다. 서비스 워커가 로드되면 PWA와 네트워크 사이에 설정되어 요청을 가로채고 해당 응답을 제공합니다.',
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
        text: '서비스 워커가 등록되었는지 확인',
      },
      {
        type: 'paragraph',
        text: '서비스 워커가 등록되었는지 확인하려면 즐겨 사용하는 브라우저의 개발자 도구를 사용하세요.',
      },
      {
        type: 'paragraph',
        text: 'Firefox 및 Chromium 기반 브라우저 (Microsoft Edge, Chrome 또는 Samsung 인터넷)의 경우:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          '개발자 도구를 열고 애플리케이션 탭을 클릭합니다.',
          '왼쪽 창에서 서비스 워커를 선택합니다.',
          "서비스 워커의 스크립트 URL이 'Activated'(활성화됨) 상태로 표시되는지 확인합니다. 자세한 내용은 수명 주기를 참고하세요. Firefox에서는 상태가 'Running' 또는 'Stopped'일 수 있습니다.",
        ],
      },
      {
        type: 'paragraph',
        text: 'Safari:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          '개발 &gt; 서비스 워커를 클릭합니다.',
          '이 메뉴에서 현재 출처가 있는 항목을 확인합니다. 이 항목을 클릭하면 서비스 워커 컨텍스트에 대한 검사기가 열립니다.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Chrome, Firefox, Safari의 서비스 워커 개발자 도구',
      },
      {
        type: 'subheading',
        level: 3,
        text: '범위',
      },
      {
        type: 'paragraph',
        text: "서비스 워커가 있는 폴더에 따라 범위가 결정됩니다. example.com/my-pwa/sw.js에 있는 서비스 워커는 example.com/my-pwa/demos/과 같이 my-pwa 경로 또는 그 아래의 모든 탐색을 제어할 수 있습니다. 서비스 워커는 범위 내의 항목 (페이지, 워커, 총칭하여 '클라이언트')만 제어할 수 있습니다. 이 범위는 브라우저 탭과 PWA 창에 적용됩니다.",
      },
      {
        type: 'paragraph',
        text: '범위당 서비스 워커는 _하나_만 허용됩니다. 서비스 워커가 활성 상태이고 실행 중인 경우 메모리에 있는 클라이언트(PWA 창 또는 브라우저 탭)의 수와 관계없이 일반적으로 하나의 인스턴스만 사용할 수 있습니다.',
      },
      {
        type: 'paragraph',
        text: 'Safari에는 파티션이라고 하는 더 복잡한 범위 관리가 있어 범위가 교차 도메인 iframe과 작동하는 방식에 영향을 미칩니다. WebKit 구현에 대해 자세히 알아보려면 블로그 게시물을 참고하세요.',
      },
      {
        type: 'paragraph',
        text: '서비스 워커에는 PWA 설치와 별도로 설치 방법을 지정하는 수명 주기가 있습니다.',
      },
      {
        type: 'paragraph',
        text: '서비스 워커 수명 주기는 서비스 워커를 등록하는 것으로 시작됩니다. 그러면 브라우저가 서비스 워커 파일을 다운로드하고 파싱하려고 시도합니다. 파싱에 성공하면 서비스 워커의 install 이벤트가 발생합니다. install 이벤트는 한 번만 실행됩니다.',
      },
      {
        type: 'paragraph',
        text: '서비스 워커 설치는 사용자가 PWA를 설치하지 않더라도 사용자 권한을 요구하지 않고 자동으로 이루어집니다. 서비스 워커 API는 데스크톱 기기의 Safari 및 Firefox와 같이 PWA 설치를 지원하지 않는 플랫폼에서도 사용할 수 있습니다.',
      },
      {
        type: 'paragraph',
        text: '설치 후 서비스 워커가 PWA를 비롯한 클라이언트를 제어하려면 먼저 활성화해야 합니다. 서비스 워커가 클라이언트를 제어할 준비가 되면 activate 이벤트가 발생합니다. 하지만 기본적으로 활성화된 서비스 워커는 페이지를 새로고침하거나 PWA를 다시 열어 해당 페이지로 이동할 때까지 서비스 워커를 등록한 페이지를 관리할 수 없습니다.',
      },
      {
        type: 'paragraph',
        text: 'self 객체를 사용하여 서비스 워커의 전역 범위에서 이벤트를 수신 대기할 수 있습니다.',
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
        text: '서비스 워커 업데이트',
      },
      {
        type: 'paragraph',
        text: '서비스 워커는 브라우저가 클라이언트를 제어하는 서비스 워커와 서버의 새 버전 서비스 워커 파일이 바이트 단위로 다르다고 감지할 때 업데이트됩니다.',
      },
      {
        type: 'paragraph',
        text: "설치가 완료되면 새 서비스 워커는 이전 서비스 워커가 더 이상 클라이언트를 제어하지 않을 때까지 활성화를 기다립니다. 이 상태를 '대기'라고 하며, 브라우저가 한 번에 하나의 서비스 워커 버전만 실행되도록 하는 방법입니다.",
      },
      {
        type: 'paragraph',
        text: '페이지를 새로고침하거나 PWA를 다시 열어도 새 서비스 워커가 제어권을 가져오지 않습니다. 사용자는 현재 서비스 워커를 사용하는 모든 탭과 창을 닫거나 다른 곳으로 이동한 다음 다시 이동하여 새 서비스 워커에 제어 권한을 부여해야 합니다. 자세한 내용은 서비스 워커 수명 주기를 참고하세요.',
      },
      {
        type: 'paragraph',
        text: '설치되고 등록된 서비스 워커는 범위 내의 모든 네트워크 요청을 관리할 수 있습니다. 자체 스레드에서 실행되며 브라우저에서 활성화 및 종료를 제어하므로 PWA가 열리기 전이나 닫힌 후에도 작동할 수 있습니다. 서비스 워커는 자체 스레드에서 실행되지만 서비스 워커 실행 간에 메모리 내 상태가 유지되지 않을 수 있으므로 각 실행에 재사용하려는 항목이 IndexedDB 또는 다른 영구 저장소에 있는지 확인하세요.',
      },
      {
        type: 'paragraph',
        text: '아직 실행되고 있지 않은 경우 서비스 워커는 범위 내에서 네트워크 요청이 전송되거나 주기적인 백그라운드 동기화 또는 푸시 메시지와 같은 트리거링 이벤트를 수신할 때마다 시작됩니다.',
      },
      {
        type: 'paragraph',
        text: '서비스 워커는 몇 초 동안 유휴 상태이거나 너무 오랫동안 사용 중인 경우 종료됩니다. 이 타이밍은 브라우저마다 다릅니다. 서비스 워커가 종료되었는데 서비스 워커를 시작하는 이벤트가 발생하면 서비스 워커가 다시 시작됩니다.',
      },
      {
        type: 'paragraph',
        text: '등록되고 활성 상태인 서비스 워커는 PWA의 기본 스레드와 완전히 다른 실행 수명 주기를 가진 스레드를 사용합니다. 하지만 기본적으로 서비스 워커 파일 자체에는 동작이 없습니다. 리소스는 캐시하거나 제공하지 않습니다. 이는 코드에서 해야 하는 작업입니다. 다음 장에서 방법을 알아보세요.',
      },
      {
        type: 'paragraph',
        text: '서비스 워커의 기능은 HTTP 요청을 프록시하거나 처리하는 데만 사용되는 것이 아닙니다. 백그라운드 코드 실행, 웹 푸시 알림, 결제 처리와 같은 다른 목적으로 이 위에 다른 기능을 사용할 수 있습니다. 이러한 추가 사항은 기능에서 설명합니다.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          '서비스 워커 API (MDN)',
          '서비스 워커 마인드셋',
          'WebKit Workers at your service',
          '서비스 워커의 ES 모듈',
          '서비스 워커 수명 주기',
        ],
      },
      {
        type: 'paragraph',
        text: 'El almacenamiento en caché es una herramienta poderosa. Hace que tus apps dependan menos de las condiciones de red. Con un buen uso de las memorias caché, puedes hacer que tu app web esté disponible sin conexión y publicar tus recursos lo más rápido posible en cualquier condición de red. Como se mencionó en Recursos y datos, puedes decidir la mejor estrategia para almacenar en caché los recursos necesarios. Para administrar la caché con la que interactúa tu trabajador de servicio, usa la API de Cache Storage.',
      },
      {
        type: 'paragraph',
        text: 'La API de Cache Storage está disponible en diferentes contextos:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'El contexto de la ventana (el subproceso principal de tu AWP).',
          'Es el service worker.',
          'Cualquier otro trabajador que uses',
        ],
      },
      {
        type: 'paragraph',
        text: 'Una ventaja de administrar tu caché con Service Workers es que su ciclo de vida no está vinculado a la ventana, lo que significa que no bloqueas el subproceso principal. Ten en cuenta que, para usar la API de Cache Storage, la mayoría de estos contextos deben estar bajo una conexión TLS.',
      },
      {
        type: 'paragraph',
        text: 'La primera pregunta que puedes hacerte sobre el almacenamiento en caché es qué almacenar en caché. Si bien no hay una respuesta única a esa pregunta, puedes comenzar con todos los recursos mínimos que necesitas para renderizar la interfaz de usuario.',
      },
      {
        type: 'paragraph',
        text: 'Esos recursos deben incluir lo siguiente:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'El código HTML de la página principal (la start_url de tu app).',
          'Hojas de estilo CSS necesarias para la interfaz de usuario principal.',
          'Imágenes que se usan en la interfaz de usuario.',
          'Son los archivos JavaScript necesarios para renderizar la interfaz de usuario.',
          'Son los datos, como un archivo JSON, necesarios para renderizar una experiencia básica.',
          'Fuentes web',
          'En una aplicación de varias páginas, otros documentos HTML que quieras publicar rápidamente o sin conexión',
        ],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Listo para el uso sin conexión',
      },
      {
        type: 'paragraph',
        text: 'Si bien la capacidad de funcionar sin conexión es uno de los requisitos de una app web progresiva, es fundamental comprender que no todas las AWP necesitan una experiencia sin conexión completa, por ejemplo, las soluciones de juegos en la nube o las apps de criptoactivos. Por lo tanto, está bien ofrecer una interfaz de usuario básica que guíe a los usuarios en esas situaciones.',
      },
      {
        type: 'paragraph',
        text: 'Tu APW no debe renderizar un mensaje de error del navegador que indique que el motor de renderización web no pudo cargar la página. En su lugar, usa tu Service Worker para mostrar tus propios mensajes y evitar un error genérico y confuso del navegador.',
      },
      {
        type: 'paragraph',
        text: 'Existen muchas estrategias de almacenamiento en caché diferentes que puedes usar según las necesidades de tu PWA. Por eso, es importante diseñar el uso de la caché para brindar una experiencia rápida y confiable. Por ejemplo, si todos los recursos de tu app se descargan rápido, no ocupan mucho espacio y no necesitan actualizarse en cada solicitud, almacenar en caché todos tus recursos sería una estrategia válida. Por otro lado, si tienes recursos que deben ser la versión más reciente, tal vez te convenga no almacenarlos en caché.',
      },
      {
        type: 'paragraph',
        text: 'Usa la API de Cache Storage para definir un conjunto de cachés dentro de tu origen, cada una identificada con un nombre de cadena que puedes definir. Accede a la API a través del objeto caches, y el método open permite crear o abrir una caché ya creada. El método open devuelve una promesa para el objeto de caché.',
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
        text: 'Descarga y almacenamiento de recursos',
      },
      {
        type: 'paragraph',
        text: 'Para solicitarle al navegador que descargue y almacene los recursos, usa los métodos add o addAll. El método add realiza una solicitud y almacena una respuesta HTTP, y addAll un grupo de respuestas HTTP como una transacción basada en un array de solicitudes o URLs.',
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
        text: 'La interfaz de almacenamiento de caché almacena la totalidad de una respuesta, incluidos todos los encabezados y el cuerpo. Por lo tanto, puedes recuperarlo más tarde con una solicitud HTTP o una URL como clave. Verás cómo hacerlo en el capítulo sobre la publicación.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Cuándo almacenar en caché',
      },
      {
        type: 'paragraph',
        text: 'En tu PWA, tú decides cuándo almacenar archivos en caché. Si bien un enfoque es almacenar la mayor cantidad posible de recursos cuando se instala el service worker, por lo general, no es la mejor idea. El almacenamiento en caché de recursos innecesarios desperdicia ancho de banda y espacio de almacenamiento, y podría hacer que tu app publique recursos desactualizados no deseados.',
      },
      {
        type: 'paragraph',
        text: 'No es necesario que almacenes en caché todos los recursos a la vez. Puedes hacerlo muchas veces durante el ciclo de vida de tu PWA, por ejemplo:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'En la instalación del service worker',
          'Después de la primera carga de la página.',
          'Cuando el usuario navega a una sección o ruta.',
          'Cuando la red está inactiva.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Puedes solicitar que se almacenen en caché archivos nuevos en el subproceso principal o dentro del contexto del service worker.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Almacenamiento en caché de recursos en un service worker',
      },
      {
        type: 'paragraph',
        text: 'Una de las situaciones más comunes es almacenar en caché un conjunto mínimo de recursos cuando se instala el service worker. Para ello, puedes usar la interfaz de almacenamiento en caché dentro del evento install en el trabajador de servicio.',
      },
      {
        type: 'paragraph',
        text: 'Dado que el subproceso del service worker se puede detener en cualquier momento, puedes solicitarle al navegador que espere a que finalice la promesa addAll para aumentar la oportunidad de almacenar todos los recursos y mantener la coherencia de la app. En el siguiente ejemplo, se muestra cómo hacerlo con el método waitUntil del argumento de evento recibido en el objeto de escucha de eventos del trabajador de servicio.',
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
        text: 'El método waitUntil() recibe una promesa y le pide al navegador que espere a que se resuelva la tarea de la promesa (cumplida o fallida) antes de finalizar el proceso del service worker. Es posible que debas encadenar promesas y devolver las llamadas a add() o addAll() para que un solo resultado llegue al método waitUntil().',
      },
      {
        type: 'paragraph',
        text: 'También puedes controlar las promesas con la sintaxis async/await. En ese caso, debes crear una función asíncrona que pueda llamar a await y que devuelva una promesa a waitUntil() después de que se la llame, como en el siguiente ejemplo:',
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
        text: 'Solicitudes multidominio y respuestas opacas',
      },
      {
        type: 'paragraph',
        text: 'Tu PWA puede descargar y almacenar en caché recursos de tu origen y de dominios cruzados, como contenido de CDN de terceros. Con una app de varios dominios, la interacción de la caché es muy similar a las solicitudes del mismo origen. Se ejecuta la solicitud y se almacena una copia de la respuesta en la caché. Al igual que con otros recursos almacenados en caché, solo está disponible para usarse en el origen de tu app.',
      },
      {
        type: 'paragraph',
        text: 'El recurso se almacenará como una respuesta opaca, lo que significa que tu código no podrá ver ni modificar el contenido o los encabezados de esa respuesta. Además, las respuestas opacas no exponen su tamaño real en la API de Storage, lo que afecta las cuotas. Algunos navegadores exponen tamaños grandes, como 7 MB, sin importar si el archivo es de solo 1 KB.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Actualiza y borra recursos',
      },
      {
        type: 'paragraph',
        text: 'Puedes actualizar recursos con cache.put(request, response) y borrarlos con delete(request).',
      },
      {
        type: 'paragraph',
        text: 'Consulta la documentación del objeto Cache para obtener más detalles.',
      },
      {
        type: 'paragraph',
        text: 'Muchos navegadores ofrecen una forma de depurar el contenido del almacenamiento en caché dentro de la pestaña Aplicación de sus herramientas para desarrolladores. Allí, puedes ver el contenido de cada caché dentro del origen actual. Hablaremos más sobre estas herramientas en el capítulo Herramientas y depuración.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Cache Storage en MDN',
          'La API de Cache: Una guía rápida',
          'Guía de soluciones sin conexión',
          'Desmitificación del almacenamiento en caché: inspecciona, borra y deshabilita las cachés',
        ],
      },
      {
        type: 'paragraph',
        text: 'Przejdź do głównej treści',
      },
      {
        type: 'paragraph',
        text: 'Manifest aplikacji internetowej to utworzony przez Ciebie plik, który informuje przeglądarkę, jak mają być wyświetlane treści internetowe w systemie operacyjnym. Plik manifestu może zawierać podstawowe informacje, takie jak nazwa aplikacji, ikona i kolor motywu, zaawansowane ustawienia, np. preferowana orientacja i skróty do aplikacji, oraz metadane katalogu, np. zrzuty ekranu.',
      },
      {
        type: 'paragraph',
        text: 'Każda PWA powinna zawierać jeden plik manifestu na aplikację, zwykle hostowany w folderze głównym i połączony ze wszystkimi stronami HTML, z których można zainstalować PWA. Jego oficjalne rozszerzenie to .webmanifest, więc możesz nazwać plik manifestu np. app.webmanifest.',
      },
      {
        type: 'paragraph',
        text: 'Aby utworzyć plik manifestu aplikacji internetowej, najpierw utwórz plik tekstowy z obiektem JSON, który zawiera co najmniej pole name z wartością tekstową:',
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
        text: 'Utworzenie pliku to jednak za mało. Przeglądarka musi wiedzieć, że on istnieje.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Linkowanie do pliku manifestu',
      },
      {
        type: 'paragraph',
        text: 'Aby przeglądarka mogła rozpoznać plik manifestu aplikacji internetowej, musisz połączyć go z PWA za pomocą elementu HTML &lt;link&gt; i atrybutu rel ustawionego na manifest na wszystkich stronach HTML aplikacji PWA. Działa to podobnie jak łączenie arkusza stylów CSS z dokumentem.',
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
        text: 'Debugowanie pliku manifestu',
      },
      {
        type: 'paragraph',
        text: 'Aby sprawdzić, czy plik manifestu jest prawidłowo skonfigurowany, możesz użyć inspektora w przeglądarce Firefox i narzędzi deweloperskich w każdej przeglądarce opartej na Chromium.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Przeglądarki Chromium',
      },
      {
        type: 'paragraph',
        text: 'W Narzędziach deweloperskich',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'W panelu po lewej stronie w sekcji Aplikacja kliknij Plik manifestu.',
          'Sprawdź pola pliku manifestu po przetworzeniu przez przeglądarkę.',
        ],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Firefox',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Otwórz inspektora.',
          'Otwórz kartę Aplikacja.',
          'W panelu po lewej stronie wybierz opcję Plik manifestu.',
          'Sprawdź pola pliku manifestu po przetworzeniu przez przeglądarkę.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Po połączeniu progresywnej aplikacji internetowej z jej plikiem manifestu możesz wypełnić pozostałe pola, aby określić sposób korzystania z niej przez użytkowników.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Pola podstawowe',
      },
      {
        type: 'paragraph',
        text: 'Pierwszy zestaw pól zawiera podstawowe informacje o Twojej progresywnej aplikacji internetowej. Służą one do tworzenia ikony i okna zainstalowanej aplikacji PWA oraz określania sposobu jej uruchamiania. Są to:',
      },
      {
        type: 'paragraph',
        text: 'name',
      },
      {
        type: 'paragraph',
        text: 'Pełna nazwa Twojej progresywnej aplikacji internetowej. Będzie ona widoczna obok ikony na ekranie głównym, w programie uruchamiającym, w docku lub w menu systemu operacyjnego.',
      },
      {
        type: 'paragraph',
        text: 'short_name',
      },
      {
        type: 'paragraph',
        text: 'Opcjonalnie, krótsza nazwa progresywnej aplikacji internetowej, używana, gdy nie ma wystarczająco dużo miejsca, aby wyświetlić pełną wartość pola name. Nie przekraczaj 12 znaków, aby zminimalizować ryzyko ucięcia.',
      },
      {
        type: 'paragraph',
        text: 'icons',
      },
      {
        type: 'paragraph',
        text: 'Tablica obiektów ikon z polami src, type, sizes i opcjonalnym polem purpose, które opisują, jakie obrazy powinny reprezentować PWA.',
      },
      {
        type: 'paragraph',
        text: 'start_url',
      },
      {
        type: 'paragraph',
        text: 'Adres URL, który powinna wczytać progresywna aplikacja internetowa, gdy użytkownik uruchomi ją za pomocą zainstalowanej ikony. Zalecana jest ścieżka bezwzględna, więc jeśli strona główna Twojej progresywnej aplikacji internetowej jest katalogiem głównym witryny, możesz ustawić tę wartość na „/”, aby otwierać ją po uruchomieniu aplikacji. Jeśli nie podasz adresu URL startowego, przeglądarka może użyć adresu URL, z którego zainstalowano aplikację PWA. Może to być precyzyjny link, np. do szczegółów produktu zamiast do ekranu głównego.',
      },
      {
        type: 'paragraph',
        text: 'display',
      },
      {
        type: 'paragraph',
        text: 'Jedna z wartości fullscreen, standalone, minimal-ui lub browser określająca, jak system operacyjny ma rysować okno aplikacji PWA. Więcej informacji o różnych trybach wyświetlania znajdziesz w rozdziale poświęconym projektowaniu aplikacji. W większości przypadków użycia wdrażana jest funkcja standalone.',
      },
      {
        type: 'paragraph',
        text: 'id',
      },
      {
        type: 'paragraph',
        text: 'Ciąg znaków, który jednoznacznie identyfikuje tę PWA na tle innych aplikacji, które mogą być hostowane w tym samym źródle. Jeśli nie jest ustawiona, jako wartość zastępcza zostanie użyta wartość start_url. Pamiętaj, że jeśli w przyszłości zmienisz start_url (np. wartość ciągu zapytania), możesz uniemożliwić przeglądarce wykrycie, że PWA jest już zainstalowana.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Ikony',
      },
      {
        type: 'paragraph',
        text: 'Ikona PWA jest jej wizualną tożsamością na urządzeniach użytkowników po zainstalowaniu, dlatego ważne jest, aby zdefiniować co najmniej jedną. Ponieważ właściwość icons to zbiór obiektów ikon, możesz zdefiniować kilka ikon w różnych formatach, aby zapewnić użytkownikom jak najlepsze wrażenia. Każda przeglądarka wybierze co najmniej 1 ikonę w zależności od swoich potrzeb i systemu operacyjnego, na którym jest zainstalowana. Wybierane są ikony najbardziej zbliżone do wymaganych specyfikacji.',
      },
      {
        type: 'paragraph',
        text: 'Jeśli musisz wybrać tylko jeden rozmiar ikony, powinien on wynosić 512 x 512 pikseli. Zalecamy jednak podanie większej liczby rozmiarów, w tym obrazów o rozmiarach 192 x 192, 384 x 384 i 1024 x 1024 piksele.',
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
        text: 'Jeśli nie podasz ikony lub ikony nie będą miały zalecanych rozmiarów, na niektórych platformach nie spełnisz kryteriów instalacji. Na innych platformach ikona będzie generowana automatycznie, np. na podstawie zrzutu ekranu PWA lub przy użyciu ogólnej ikony.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'Ikony z możliwością maskowania',
      },
      {
        type: 'paragraph',
        text: 'Niektóre systemy operacyjne, np. Android, dostosowują ikony do różnych rozmiarów i kształtów. Na przykład w Androidzie 12 różni producenci lub ustawienia mogą zmieniać kształt ikon z okrągłych na kwadratowe lub kwadratowe z zaokrąglonymi rogami. Aby obsługiwać takie ikony adaptacyjne, możesz podać ikonę z możliwością maskowania za pomocą pola purpose.',
      },
      {
        type: 'paragraph',
        text: 'W tym celu prześlij kwadratowy plik obrazu, którego główna ikona znajduje się w „bezpiecznym obszarze”, czyli w okręgu wyśrodkowanym w ikonie o promieniu równym 40% szerokości ikony. (Zobacz obraz poniżej). Urządzenia obsługujące ikony z maską będą w razie potrzeby maskować Twoją ikonę.',
      },
      {
        type: 'paragraph',
        text: 'Oto przykład ikony z maską w kilku często używanych kształtach:',
      },
      {
        type: 'paragraph',
        text: 'Jeśli na poniższym obrazie użyjesz ikony po lewej stronie jako ikony z maskowaniem, na urządzeniach, na których zastosowano maskę kształtu, uzyskasz słabe wyniki.',
      },
      {
        type: 'paragraph',
        text: 'Ten obraz mógłby być bardziej użyteczny, gdyby miał więcej marginesów.',
      },
      {
        type: 'paragraph',
        text: 'Ikony z maskowaniem powinny mieć co najmniej 512 x 512 pikseli. Po utworzeniu kolekcji możesz dodać ją do icons, aby zwiększyć komfort korzystania z obsługiwanych urządzeń:',
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
        text: 'W większości przypadków, jeśli ikona z maską nie wyświetla się prawidłowo, możesz ją poprawić, dodając więcej dopełnienia. Maskable.app to bezpłatne narzędzie online do testowania i tworzenia wersji ikony z maską.',
      },
      {
        type: 'paragraph',
        text: 'Jeśli ikona służy do ogólnych i maskowalnych celów, możesz ustawić pole purpose na "any maskable". Szczegółowe informacje znajdziesz w dokumentacji MDN Web App Manifest.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Pola zalecane',
      },
      {
        type: 'paragraph',
        text: 'Kolejny zestaw pól, które warto uwzględnić, to te, które poprawią wrażenia użytkownika, mimo że nie są wymagane do zainstalowania aplikacji.',
      },
      {
        type: 'paragraph',
        text: 'theme_color',
      },
      {
        type: 'paragraph',
        text: 'Domyślny kolor aplikacji, który czasami wpływa na sposób wyświetlania witryny przez system operacyjny (np. kolor okna i paska tytułu na komputerze lub kolor paska stanu na urządzeniach mobilnych). Ten kolor można zastąpić elementem HTML theme-color &lt;meta&gt;.',
      },
      {
        type: 'paragraph',
        text: 'background_color',
      },
      {
        type: 'paragraph',
        text: 'Kolor zastępczy, który ma być wyświetlany w tle aplikacji, zanim zostanie wczytany arkusz stylów. Safari w systemach iOS i iPadOS oraz większość przeglądarek na komputery ignoruje obecnie to pole.',
      },
      {
        type: 'paragraph',
        text: 'scope',
      },
      {
        type: 'paragraph',
        text: 'Zmienia zakres nawigacji w PWA, umożliwiając określenie, co ma być wyświetlane w oknie zainstalowanej aplikacji, a co nie. Jeśli na przykład utworzysz link do strony spoza zakresu, zostanie ona wyświetlona w przeglądarce w aplikacji, a nie w oknie PWA. Nie zmieni to jednak zakresu działania service workera.',
      },
      {
        type: 'paragraph',
        text: 'Kolejny obraz pokazuje, jak pole theme_color jest używane na pasku tytułu na komputerze po zainstalowaniu aplikacji PWA.',
      },
      {
        type: 'paragraph',
        text: 'Podczas definiowania kolorów w manifeście, np. w elementach theme_color i background_color, używaj nazw kolorów CSS, np. salmon lub orange, kolorów RGB, np. #FF5500, lub funkcji kolorów bez przezroczystości, np. rgb() lub hsl(). Więcej informacji znajdziesz w rozdziale o projektowaniu aplikacji.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Ekran powitalny',
      },
      {
        type: 'paragraph',
        text: 'Na niektórych urządzeniach podczas ładowania progresywnej aplikacji internetowej renderowany jest obraz statyczny, aby użytkownik od razu widział, że aplikacja się wczytuje.',
      },
      {
        type: 'paragraph',
        text: 'Android używa wartości theme_color, background_color i icon do wygenerowania ekranu powitalnego.',
      },
      {
        type: 'paragraph',
        text: 'Gdy zainstalujesz PWA na Androidzie, urządzenie wygeneruje ekran powitalny z informacjami pochodzącymi z pliku manifestu, jak widać na poniższym diagramie.',
      },
      {
        type: 'paragraph',
        text: 'Safari na iOS i iPadOS nie używa pliku manifestu aplikacji internetowej do generowania ekranów powitalnych. Zamiast tego używają obrazu połączonego z zastrzeżonym elementem &lt;link&gt;, podobnie jak w przypadku ikon. Więcej informacji znajdziesz w rozdziale o ulepszeniach.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Pola rozszerzone',
      },
      {
        type: 'paragraph',
        text: 'Kolejne pola zawierają dodatkowe informacje o Twojej progresywnej aplikacji internetowej. Wszystkie są opcjonalne.',
      },
      {
        type: 'paragraph',
        text: 'lang',
      },
      {
        type: 'paragraph',
        text: 'Tag języka określający język główny wartości w pliku manifestu, np. en w przypadku języka angielskiego, pt-BR w przypadku portugalskiego (brazylijskiego) lub in w przypadku hindi.',
      },
      {
        type: 'paragraph',
        text: 'dir',
      },
      {
        type: 'paragraph',
        text: 'Kierunek wyświetlania pól pliku manifestu obsługujących kierunek pisowni (np. name, short_name i description). Prawidłowe wartości to auto, ltr (od lewej do prawej) i rtl (od prawej do lewej).',
      },
      {
        type: 'paragraph',
        text: 'orientation',
      },
      {
        type: 'paragraph',
        text: 'Orientacja aplikacji po zainstalowaniu. Gra może ustawić tę wartość, aby zażądać orientacji tylko poziomej. Akceptowanych jest kilka wartości, ale jeśli są one uwzględnione, zwykle jest to portrait lub landscape.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Pola promocyjne',
      },
      {
        type: 'paragraph',
        text: 'Czwarty zestaw pól umożliwia podanie informacji promocyjnych o progresywnej aplikacji internetowej, np. w procesach instalacji, informacjach o aplikacji i wynikach wyszukiwania.',
      },
      {
        type: 'paragraph',
        text: 'description',
      },
      {
        type: 'paragraph',
        text: 'Wyjaśnienie, co robi aplikacja PWA.',
      },
      {
        type: 'paragraph',
        text: 'screenshots',
      },
      {
        type: 'paragraph',
        text: 'Tablica obiektów zrzutów ekranu z właściwościami src, type i sizes (podobnymi do obiektu icons) przeznaczona do prezentowania PWA. Nie ma ograniczeń rozmiaru.',
      },
      {
        type: 'paragraph',
        text: 'categories',
      },
      {
        type: 'paragraph',
        text: 'Tablica kategorii, do których powinna należeć progresywna aplikacja internetowa, używana jako wskazówki dotyczące wpisów, opcjonalnie z listy znanych kategorii. Te wartości są zwykle pisane małymi literami.',
      },
      {
        type: 'paragraph',
        text: 'iarc_rating_id',
      },
      {
        type: 'paragraph',
        text: 'Kod certyfikatu International Age Rating Coalition dla PWA, jeśli go masz. Ma ona służyć do określania, dla jakich grup wiekowych jest odpowiednia Twoja progresywna aplikacja internetowa.',
      },
      {
        type: 'paragraph',
        text: 'Możesz już dziś zobaczyć te pola promocyjne w działaniu. Jeśli na przykład w Androidzie Twoja progresywna aplikacja internetowa jest instalowalna i podasz wartości co najmniej w polach description i screenshots, okno instalacji zmieni się z prostego paska informacyjnego „Dodaj do ekranu głównego” w bardziej rozbudowane okno instalacji podobne do tego ze sklepu z aplikacjami.',
      },
      {
        type: 'paragraph',
        text: 'Na Androidzie możesz uzyskać lepszy interfejs instalacji, jeśli podasz wartości w polach promocyjnych, jak widać na filmie poniżej.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Pola dotyczące funkcji',
      },
      {
        type: 'paragraph',
        text: 'Oprócz tego istnieje wiele pól związanych z różnymi funkcjami, których aplikacja PWA może używać w obsługiwanych przeglądarkach, np. pola shortcuts, share_target i display_override, o których piszemy w rozdziale o funkcjach. Istnieją też pola, takie jak related_apps i prefer_related_apps (więcej informacji znajdziesz w rozdziale o wykrywaniu), które umożliwiają połączenie PWA z zainstalowanymi aplikacjami, często ze sklepu z aplikacjami.',
      },
      {
        type: 'paragraph',
        text: 'W przyszłości może pojawić się wiele nowych pól, ponieważ przeglądarki będą dodawać więcej funkcji do progresywnych aplikacji internetowych.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Dodawanie manifestu aplikacji internetowej',
          'Obsługa ikon adaptacyjnych w PWA z ikonami z możliwością maskowania',
          'Poszerzony interfejs instalacji PWA',
          'MDN: Web App Manifest',
        ],
      },
      {
        type: 'paragraph',
        text: 'O ile nie stwierdzono inaczej, treść tej strony jest objęta licencją Creative Commons – uznanie autorstwa 4.0, a fragmenty kodu są dostępne na licencji Apache 2.0. Szczegółowe informacje na ten temat zawierają zasady dotyczące witryny Google Developers. Java jest zastrzeżonym znakiem towarowym firmy Oracle i jej podmiotów stowarzyszonych.',
      },
      {
        type: 'paragraph',
        text: 'Ostatnia aktualizacja: 2024-12-09 UTC.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
