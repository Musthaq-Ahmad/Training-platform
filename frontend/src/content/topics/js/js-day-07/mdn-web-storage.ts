import type { ContentTopic } from '../../../types';

export const mdnWebStorageTopics = {
  'mdn-web-storage': {
    id: 'mdn-web-storage',
    heading: 'Concepts and usage',
    blocks: [
      {
        type: 'paragraph',
        text: 'The two mechanisms within Web Storage are as follows:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'sessionStorage is partitioned by browser tabs and by origin. The main document, and all embedded browsing contexts (iframes), are grouped by their origin and each origin has access to its own separate storage area. Closing the browser tab destroys all sessionStorage data associated with that tab.',
          'localStorage is partitioned by origin only. All documents with the same origin have access to the same localStorage area, and it persists even when the browser is closed and reopened.',
        ],
      },
      {
        type: 'paragraph',
        text: 'These mechanisms are available via the Window.sessionStorage and Window.localStorage properties. Accessing one of these will return an instance of a Storage object, through which data items can be set, retrieved and removed. A different storage object is used for the sessionStorage and localStorage for each origin — they function and are controlled separately.',
      },
      {
        type: 'paragraph',
        text: 'To learn about the amount of storage available using the APIs, and what happens when storage limits are exceeded, see Storage quotas and eviction criteria.',
      },
      {
        type: 'paragraph',
        text: 'Both sessionStorage and localStorage in Web Storage are synchronous in nature. This means that when data is set, retrieved, or removed from these storage mechanisms, the operations are performed synchronously, blocking the execution of other JavaScript code until the operation is completed. This synchronous behavior can potentially affect the performance of the web application, especially if there is a large amount of data being stored or retrieved.',
      },
      {
        type: 'paragraph',
        text: "Developers should be cautious when performing operations on sessionStorage or localStorage that involve a significant amount of data or computationally intensive tasks. It is important to optimize code and minimize synchronous operations to prevent blocking the user interface and causing delays in the application's responsiveness.",
      },
      {
        type: 'paragraph',
        text: 'Asynchronous alternatives, such as IndexedDB, may be more suitable for scenarios where performance is a concern or when dealing with larger datasets. These alternatives allow for non-blocking operations, enabling smoother user experiences and better performance in web applications.',
      },
      {
        type: 'paragraph',
        text: 'Each origin has its own storage — this is true for both web storage and shared storage. However, access of third-party (i.e., embedded) code to shared storage depends on its browsing context. The context in which a third-party code from another origin runs determines the storage access of the third-party code.',
      },
      {
        type: 'paragraph',
        text: 'Third-party code can be added to another site by injecting it with a &lt;script&gt; element or by setting the source of an &lt;iframe&gt; to a site that contains third-party code. The method used for integrating third-party code determines the browsing context of the code.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          "If your third-party code is added to another site with a &lt;script&gt; element, your code will be executed in the browsing context of the embedder. Therefore, when you call Storage.setItem() or SharedStorage.set(), the key/value pair will be written to the embedder's storage. From the browser's perspective, there is no difference between first-party code and third-party code when a &lt;script&gt; tag is used.",
          "When your third-party code is added to another site within an &lt;iframe&gt;, the code inside the &lt;iframe&gt; will be executed with the origin of the &lt;iframe&gt;'s browsing context. If the code inside the &lt;iframe&gt; calls Storage.setItem(), data will be written into the local or session storage of the &lt;iframe&gt;'s origin. If the &lt;iframe&gt; code calls SharedStorage.set(), the data will be written into the shared storage of the &lt;iframe&gt;'s origin.",
        ],
      },
      {
        type: 'paragraph',
        text: 'Storage',
      },
      {
        type: 'paragraph',
        text: 'Allows you to set, retrieve and remove data for a specific domain and storage type (session or local).',
      },
      {
        type: 'paragraph',
        text: 'Window',
      },
      {
        type: 'paragraph',
        text: "The Web Storage API extends the Window object with two new properties — Window.sessionStorage and Window.localStorage — which provide access to the current domain's session and local Storage objects respectively, and a storage event handler that fires when a storage area changes (e.g., a new item is stored).",
      },
      {
        type: 'paragraph',
        text: 'StorageEvent',
      },
      {
        type: 'paragraph',
        text: "The storage event is fired on a document's Window object when a storage area changes.",
      },
      {
        type: 'paragraph',
        text: 'To illustrate some typical web storage usage, we have created an example, imaginatively called Web Storage Demo. The landing page provides controls that can be used to customize the color, font and decorative image. When you choose different options, the page is instantly updated; in addition your choices are stored in localStorage, so that when you leave the page then load it again later on your choices are remembered.',
      },
      {
        type: 'paragraph',
        text: "In addition, we have provided an event output page — if you load this page in another tab, then make changes to your choices in the landing page, you'll see the updated storage information outputted as the StorageEvent is fired.",
      },
      {
        type: 'table',
        headers: ['Specification'],
        rows: [
          ['[HTML'],
          [
            '# dom-localstorage-dev](https://html.spec.whatwg.org/multipage/webstorage.html#dom-localstorage-dev)',
          ],
          ['[HTML'],
          [
            '# dom-sessionstorage-dev](https://html.spec.whatwg.org/multipage/webstorage.html#dom-sessionstorage-dev)',
          ],
        ],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'api.Window.localStorage',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'api.Window.sessionStorage',
      },
      {
        type: 'paragraph',
        text: "Private windows, incognito mode, and similarly named privacy browsing options, don't store data like history and cookies. In private mode, localStorage is treated like sessionStorage. The storage APIs are still available and fully functional, but all data stored in the private window is deleted when the browser or browser tab is closed.",
      },
      {
        type: 'list',
        ordered: false,
        items: ['Using the Web Storage API', 'Browser storage quotas and eviction criteria'],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
