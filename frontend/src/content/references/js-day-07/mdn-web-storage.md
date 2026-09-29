## [Concepts and usage](#concepts_and_usage)

The two mechanisms within Web Storage are as follows:

- `sessionStorage` is partitioned by browser tabs and by [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin). The main document, and all embedded [browsing contexts](https://developer.mozilla.org/en-US/docs/Glossary/Browsing_context) (iframes), are grouped by their origin and each origin has access to its own separate storage area. Closing the browser tab destroys all `sessionStorage` data associated with that tab.
- `localStorage` is partitioned by [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) only. All documents with the same origin have access to the same `localStorage` area, and it persists even when the browser is closed and reopened.

These mechanisms are available via the [`Window.sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) and [`Window.localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) properties. Accessing one of these will return an instance of a [`Storage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage) object, through which data items can be set, retrieved and removed. A different storage object is used for the `sessionStorage` and `localStorage` for each origin — they function and are controlled separately.

To learn about the amount of storage available using the APIs, and what happens when storage limits are exceeded, see [Storage quotas and eviction criteria](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria).

Both `sessionStorage` and `localStorage` in Web Storage are synchronous in nature. This means that when data is set, retrieved, or removed from these storage mechanisms, the operations are performed synchronously, blocking the execution of other JavaScript code until the operation is completed. This synchronous behavior can potentially affect the performance of the web application, especially if there is a large amount of data being stored or retrieved.

Developers should be cautious when performing operations on `sessionStorage` or `localStorage` that involve a significant amount of data or computationally intensive tasks. It is important to optimize code and minimize synchronous operations to prevent blocking the user interface and causing delays in the application's responsiveness.

Asynchronous alternatives, such as [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API), may be more suitable for scenarios where performance is a concern or when dealing with larger datasets. These alternatives allow for non-blocking operations, enabling smoother user experiences and better performance in web applications.

## [Determining storage access by a third party](#determining_storage_access_by_a_third_party)

Each origin has its own storage — this is true for both web storage and [shared storage](https://developer.mozilla.org/en-US/docs/Web/API/Shared_Storage_API). However, access of third-party (i.e., embedded) code to shared storage depends on its [browsing context](https://developer.mozilla.org/en-US/docs/Glossary/Browsing_context). The context in which a third-party code from another origin runs determines the storage access of the third-party code.

![A box diagram showing a top-level browsing context called publisher.com, with third-party content embedded in it](/src/content/assets/js/embedded-content.png)

Third-party code can be added to another site by injecting it with a [`<script>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script) element or by setting the source of an [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe) to a site that contains third-party code. The method used for integrating third-party code determines the browsing context of the code.

- If your third-party code is added to another site with a `<script>` element, your code will be executed in the browsing context of the embedder. Therefore, when you call [`Storage.setItem()`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem) or [`SharedStorage.set()`](https://developer.mozilla.org/en-US/docs/Web/API/SharedStorage/set), the key/value pair will be written to the embedder's storage. From the browser's perspective, there is no difference between first-party code and third-party code when a `<script>` tag is used.
- When your third-party code is added to another site within an `<iframe>`, the code inside the `<iframe>` will be executed with the origin of the `<iframe>`'s browsing context. If the code inside the `<iframe>` calls [`Storage.setItem()`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem), data will be written into the local or session storage of the `<iframe>`'s origin. If the `<iframe>` code calls [`SharedStorage.set()`](https://developer.mozilla.org/en-US/docs/Web/API/SharedStorage/set), the data will be written into the shared storage of the `<iframe>`'s origin.

## [Web Storage interfaces](#web_storage_interfaces)

[`Storage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage)

Allows you to set, retrieve and remove data for a specific domain and storage type (session or local).

[`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window)

The Web Storage API extends the [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) object with two new properties — [`Window.sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) and [`Window.localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) — which provide access to the current domain's session and local [`Storage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage) objects respectively, and a [`storage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event 'storage') event handler that fires when a storage area changes (e.g., a new item is stored).

[`StorageEvent`](https://developer.mozilla.org/en-US/docs/Web/API/StorageEvent)

The `storage` event is fired on a document's `Window` object when a storage area changes.

## [Examples](#examples)

To illustrate some typical web storage usage, we have created an example, imaginatively called [Web Storage Demo](https://github.com/mdn/dom-examples/tree/main/web-storage 'External link (opens in new tab)'). The [landing page](https://mdn.github.io/dom-examples/web-storage/ 'External link (opens in new tab)') provides controls that can be used to customize the color, font and decorative image. When you choose different options, the page is instantly updated; in addition your choices are stored in `localStorage`, so that when you leave the page then load it again later on your choices are remembered.

In addition, we have provided an [event output page](https://mdn.github.io/dom-examples/web-storage/event.html 'External link (opens in new tab)') — if you load this page in another tab, then make changes to your choices in the landing page, you'll see the updated storage information outputted as the [`StorageEvent`](https://developer.mozilla.org/en-US/docs/Web/API/StorageEvent) is fired.

## [Specifications](#specifications)

| Specification                                                                                             |
| --------------------------------------------------------------------------------------------------------- |
| [HTML                                                                                                     |
| \# dom-localstorage-dev](https://html.spec.whatwg.org/multipage/webstorage.html#dom-localstorage-dev)     |
| [HTML                                                                                                     |
| \# dom-sessionstorage-dev](https://html.spec.whatwg.org/multipage/webstorage.html#dom-sessionstorage-dev) |

## [Browser compatibility](#browser_compatibility)

### [api.Window.localStorage](#api.Window.localStorage)

### [api.Window.sessionStorage](#api.Window.sessionStorage)

## [Private Browsing / Incognito modes](#private_browsing_incognito_modes)

Private windows, incognito mode, and similarly named privacy browsing options, don't store data like history and cookies. In private mode, `localStorage` is treated like `sessionStorage`. The storage APIs are still available and fully functional, but all data stored in the private window is deleted when the browser or browser tab is closed.

## [See also](#see_also)

- [Using the Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
- [Browser storage quotas and eviction criteria](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)
