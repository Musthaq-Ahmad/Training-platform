import type { ContentTopic } from '../../../types';

export const mdnFetchTopics = {
  'mdn-fetch': {
    id: 'mdn-fetch',
    heading: 'Making a request',
    blocks: [
      {
        type: 'paragraph',
        text: 'To make a request, call fetch(), passing in:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'a definition of the resource to fetch. This can be any one of: * a string containing the URL * an object, such as an instance of URL, which has a stringifier that produces a string containing the URL * a Request instance',
          'optionally, an object containing options to configure the request.',
        ],
      },
      {
        type: 'paragraph',
        text: "In this section we'll look at some of the most commonly-used options. To read about all the options that can be given, see the fetch() reference page.",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Setting the method',
      },
      {
        type: 'paragraph',
        text: 'By default, fetch() makes a GET request, but you can use the method option to use a different request method:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const response = await fetch("https://example.org/post", {\n  method: "POST",\n  // …\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'If the mode option is set to no-cors, then method must be one of GET, POST or HEAD.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Setting a body',
      },
      {
        type: 'paragraph',
        text: "The request body is the payload of the request: it's the thing the client is sending to the server. You cannot include a body with GET requests, but it's useful for requests that send content to the server, such as POST or PUT requests. For example, if you want to upload a file to the server, you might make a POST request and include the file as the request body.",
      },
      {
        type: 'paragraph',
        text: 'To set a request body, pass it as the body option:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const response = await fetch("https://example.org/post", {\n  method: "POST",\n  body: JSON.stringify({ username: "example" }),\n  // …\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'You can supply the body as an instance of any of the following types:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'a string',
          'ArrayBuffer',
          'TypedArray',
          'DataView',
          'Blob',
          'File',
          'URLSearchParams',
          'FormData',
          'ReadableStream',
        ],
      },
      {
        type: 'paragraph',
        text: 'Other objects are converted to strings using their toString() method. For example, you can use a URLSearchParams object to encode form data (see setting headers for more information):',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const response = await fetch("https://example.org/post", {\n  method: "POST",\n  headers: {\n    "Content-Type": "application/x-www-form-urlencoded",\n  },\n  // Automatically converted to "username=example&password=password"\n  body: new URLSearchParams({ username: "example", password: "password" }),\n  // …\n});',
        },
      },
      {
        type: 'paragraph',
        text: "Note that just like response bodies, request bodies are streams, and making the request reads the stream, so if a request contains a body, you can't make it twice:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const request = new Request("https://example.org/post", {\n  method: "POST",\n  body: JSON.stringify({ username: "example" }),\n});\n\nconst response1 = await fetch(request);\nconsole.log(response1.status);\n\n// Will throw: "Body has already been consumed."\nconst response2 = await fetch(request);\nconsole.log(response2.status);',
        },
      },
      {
        type: 'paragraph',
        text: 'Instead, you would need to create a clone of the request before sending it:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const request1 = new Request("https://example.org/post", {\n  method: "POST",\n  body: JSON.stringify({ username: "example" }),\n});\n\nconst request2 = request1.clone();\n\nconst response1 = await fetch(request1);\nconsole.log(response1.status);\n\nconst response2 = await fetch(request2);\nconsole.log(response2.status);',
        },
      },
      {
        type: 'paragraph',
        text: 'See Locked and disturbed streams for more information.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Setting headers',
      },
      {
        type: 'paragraph',
        text: "Request headers give the server information about the request: for example, in a POST request, the Content-Type header tells the server the format of the request's body.",
      },
      {
        type: 'paragraph',
        text: 'To set request headers, assign them to the headers option.',
      },
      {
        type: 'paragraph',
        text: 'You can pass an object literal here containing header-name: header-value properties:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const response = await fetch("https://example.org/post", {\n  method: "POST",\n  headers: {\n    "Content-Type": "application/json",\n  },\n  body: JSON.stringify({ username: "example" }),\n  // …\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'Alternatively, you can construct a Headers object, add headers to that object using Headers.append(), then assign the Headers object to the headers option:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const myHeaders = new Headers();\nmyHeaders.append("Content-Type", "application/json");\n\nconst response = await fetch("https://example.org/post", {\n  method: "POST",\n  headers: myHeaders,\n  body: JSON.stringify({ username: "example" }),\n  // …\n});',
        },
      },
      {
        type: 'paragraph',
        text: "Compared to using plain objects, the Headers object provides some additional input sanitization. For example, it normalizes header names to lowercase, strips leading and trailing whitespace from header values, and prevents certain headers from being set. Many headers are set automatically by the browser and can't be set by a script: these are called Forbidden request headers. If the mode option is set to no-cors, then the set of permitted headers is further restricted.",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Sending data in a GET request',
      },
      {
        type: 'paragraph',
        text: "GET requests don't have a body, but you can still send data to the server by appending it to the URL as a query string. This is a common way to send form data to the server. You can do this by using URLSearchParams to encode the data, and then appending it to the URL:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const params = new URLSearchParams();\nparams.append("username", "example");\n\n// GET request sent to https://example.org/login?username=example\nconst response = await fetch(`https://example.org/login?${params}`);',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Making cross-origin requests',
      },
      {
        type: 'paragraph',
        text: 'Whether a request can be made cross-origin or not is determined by the value of the RequestInit.mode option. This may take one of three values: cors, same-origin, or no-cors.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'For fetch requests the default value of mode is cors, meaning that if the request is cross-origin then it will use the Cross-Origin Resource Sharing (CORS) mechanism. This means that: * if the request is a simple request, then the request will always be sent, but the server must respond with the correct Access-Control-Allow-Origin header or the browser will not share the response with the caller. * if the request is not a simple request, then the browser will send a preflighted request to check that the server understands CORS and allows the request, and the real request will not be sent unless the server responds to the preflighted request with the appropriate CORS headers.',
          'Setting mode to same-origin disallows cross-origin requests completely.',
          'Setting mode to no-cors disables CORS for cross-origin requests. This restricts the headers that may be set, and restricts methods to GET, HEAD, and POST. The response is opaque, meaning that its headers and body are not available to JavaScript. Most of the time a website should not use no-cors: the main application of it is for certain service worker use cases.',
        ],
      },
      {
        type: 'paragraph',
        text: 'See the reference documentation for RequestInit.mode for more details.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Including credentials',
      },
      {
        type: 'paragraph',
        text: 'In the context of the Fetch API, a credential is an extra piece of data sent along with the request that the server may use to authenticate the user. All the following items are considered to be credentials:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'HTTP cookies',
          'TLS client certificates',
          'The Authorization and Proxy-Authorization headers.',
        ],
      },
      {
        type: 'paragraph',
        text: 'By default, credentials are only included in same-origin requests. To customize this behavior, as well as to control whether the browser respects any Set-Cookie response headers, set the credentials option, which can take one of the following three values:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'omit: never send credentials in the request or include credentials in the response.',
          'same-origin (the default): only send and include credentials for same-origin requests.',
          'include: always include credentials, even cross-origin.',
        ],
      },
      {
        type: 'paragraph',
        text: "Note that if a cookie's SameSite attribute is set to Strict or Lax, then the cookie will not be sent cross-site, even if credentials is set to include.",
      },
      {
        type: 'paragraph',
        text: "Including credentials in cross-origin requests can make a site vulnerable to CSRF attacks, so even if credentials is set to include, the server must also agree to their inclusion by including the Access-Control-Allow-Credentials header in its response. Additionally, in this situation the server must explicitly specify the client's origin in the Access-Control-Allow-Origin response header (that is, * is not allowed).",
      },
      {
        type: 'paragraph',
        text: 'This means that if credentials is set to include and the request is cross-origin, then:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'If the request is a simple request, then the request will be sent with credentials, but the server must set the Access-Control-Allow-Credentials and Access-Control-Allow-Origin response headers, or the browser will return a network error to the caller. If the server does set the correct headers, then the response, including credentials, will be delivered to the caller.',
          'If the request is not a simple request, then the browser will send a preflighted request without credentials, and the server must set the Access-Control-Allow-Credentials and Access-Control-Allow-Origin response headers, or the browser will return a network error to the caller. If the server does set the correct headers, then the browser will follow up with the real request, including credentials, and will deliver the real response, including credentials, to the caller.',
        ],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Creating a Request object',
      },
      {
        type: 'paragraph',
        text: 'The Request() constructor takes the same arguments as fetch() itself. This means that instead of passing options into fetch(), you can pass the same options to the Request() constructor, and then pass that object to fetch().',
      },
      {
        type: 'paragraph',
        text: 'For example, we can make a POST request by passing options into fetch() using code like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const myHeaders = new Headers();\nmyHeaders.append("Content-Type", "application/json");\n\nconst response = await fetch("https://example.org/post", {\n  method: "POST",\n  body: JSON.stringify({ username: "example" }),\n  headers: myHeaders,\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'However, we could rewrite this to pass the same arguments to the Request() constructor:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const myHeaders = new Headers();\nmyHeaders.append("Content-Type", "application/json");\n\nconst myRequest = new Request("https://example.org/post", {\n  method: "POST",\n  body: JSON.stringify({ username: "example" }),\n  headers: myHeaders,\n});\n\nconst response = await fetch(myRequest);',
        },
      },
      {
        type: 'paragraph',
        text: 'This also means that you can create a request from another request, while changing some of its properties using the second argument:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'async function post(request) {\n  try {\n    const response = await fetch(request);\n    const result = await response.json();\n    console.log("Success:", result);\n  } catch (error) {\n    console.error("Error:", error);\n  }\n}\n\nconst request1 = new Request("https://example.org/post", {\n  method: "POST",\n  headers: {\n    "Content-Type": "application/json",\n  },\n  body: JSON.stringify({ username: "example1" }),\n});\n\nconst request2 = new Request(request1, {\n  body: JSON.stringify({ username: "example2" }),\n});\n\npost(request1);\npost(request2);',
        },
      },
      {
        type: 'paragraph',
        text: "To make a request cancelable, create an AbortController, and assign its AbortSignal to the request's signal property.",
      },
      {
        type: 'paragraph',
        text: "To cancel the request, call the controller's abort() method. The fetch() call will reject the promise with an AbortError exception.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const controller = new AbortController();\n\nconst fetchButton = document.querySelector("#fetch");\nfetchButton.addEventListener("click", async () => {\n  try {\n    console.log("Starting fetch");\n    const response = await fetch("https://example.org/get", {\n      signal: controller.signal,\n    });\n    console.log(`Response: ${response.status}`);\n  } catch (e) {\n    console.error(`Error: ${e}`);\n  }\n});\n\nconst cancelButton = document.querySelector("#cancel");\ncancelButton.addEventListener("click", () => {\n  controller.abort();\n  console.log("Canceled fetch");\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'If the request is aborted after the fetch() call has been fulfilled but before the response body has been read, then attempting to read the response body will reject with an AbortError exception.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'async function get() {\n  const controller = new AbortController();\n  const request = new Request("https://example.org/get", {\n    signal: controller.signal,\n  });\n\n  const response = await fetch(request);\n  controller.abort();\n  // The next line will throw `AbortError`\n  const text = await response.text();\n  console.log(text);\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'As soon as the browser has received the response status and headers from the server (and potentially before the response body itself has been received), the promise returned by fetch() is fulfilled with a Response object.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Checking response status',
      },
      {
        type: 'paragraph',
        text: 'The promise returned by fetch() will reject on some errors, such as a network error or a bad scheme. However, if the server responds with an error like 404, then fetch() fulfills with a Response, so we have to check the status before we can read the response body.',
      },
      {
        type: 'paragraph',
        text: 'The Response.status property tells us the numerical status code, and the Response.ok property returns true if the status is in the 200 range.',
      },
      {
        type: 'paragraph',
        text: 'A common pattern is to check the value of ok and throw if it is false:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'async function getData() {\n  const url = "https://example.org/products.json";\n  try {\n    const response = await fetch(url);\n    if (!response.ok) {\n      throw new Error(`Response status: ${response.status}`);\n    }\n    // …\n  } catch (error) {\n    console.error(error.message);\n  }\n}',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Checking the response type',
      },
      {
        type: 'paragraph',
        text: 'Responses have a type property that can be one of the following:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'basic: the request was a same-origin request.',
          'cors: the request was a cross-origin CORS request.',
          'opaque: the request was a cross-origin simple request made with the no-cors mode.',
          'opaqueredirect: the request set the redirect option to manual, and the server returned a redirect status.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The type determines the possible contents of the response, as follows:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Basic responses exclude response headers from the Forbidden response header name list.',
          'CORS responses include only response headers from the CORS-safelisted response header list.',
          'Opaque responses and opaque redirect responses have a status of 0, an empty header list, and a null body.',
        ],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Checking headers',
      },
      {
        type: 'paragraph',
        text: 'Just like the request, the response has a headers property which is a Headers object, and this contains any response headers that are exposed to scripts, subject to the exclusions made based on the response type.',
      },
      {
        type: 'paragraph',
        text: 'A common use case for this is to check the content type before trying to read the body:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'async function fetchJSON(request) {\n  try {\n    const response = await fetch(request);\n    const contentType = response.headers.get("content-type");\n    if (!contentType || !contentType.includes("application/json")) {\n      throw new TypeError("Oops, we haven\'t got JSON!");\n    }\n    // Otherwise, we can read the body as JSON\n  } catch (error) {\n    console.error("Error:", error);\n  }\n}',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Reading the response body',
      },
      {
        type: 'paragraph',
        text: 'The Response interface provides a number of methods to retrieve the entire body contents in a variety of different formats:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Response.arrayBuffer()',
          'Response.blob()',
          'Response.formData()',
          'Response.json()',
          'Response.text()',
        ],
      },
      {
        type: 'paragraph',
        text: 'These are all asynchronous methods, returning a Promise which will be fulfilled with the body content.',
      },
      {
        type: 'paragraph',
        text: 'In this example, we fetch an image and read it as a Blob, which we can then use to create an object URL:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const image = document.querySelector("img");\n\nconst url = "flowers.jpg";\n\nasync function setImage() {\n  try {\n    const response = await fetch(url);\n    if (!response.ok) {\n      throw new Error(`Response status: ${response.status}`);\n    }\n    const blob = await response.blob();\n    const objectURL = URL.createObjectURL(blob);\n    image.src = objectURL;\n  } catch (e) {\n    console.error(e);\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: "The method will throw an exception if the response body is not in the appropriate format: for example, if you call json() on a response that can't be parsed as JSON.",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Streaming the response body',
      },
      {
        type: 'paragraph',
        text: "Request and response bodies are actually ReadableStream objects, and whenever you read them, you're streaming the content. This is good for memory efficiency, because the browser doesn't have to buffer the entire response in memory before the caller retrieves it using a method like json().",
      },
      {
        type: 'paragraph',
        text: 'This also means that the caller can process the content incrementally as it is received.',
      },
      {
        type: 'paragraph',
        text: 'For example, consider a GET request that fetches a large text file and processes it in some way, or displays it to the user:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const url = "https://www.example.org/a-large-file.txt";\n\nasync function fetchText(url) {\n  try {\n    const response = await fetch(url);\n    if (!response.ok) {\n      throw new Error(`Response status: ${response.status}`);\n    }\n\n    const text = await response.text();\n    console.log(text);\n  } catch (e) {\n    console.error(e);\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'If we use Response.text(), as above, we must wait until the whole file has been received before we can process any of it.',
      },
      {
        type: 'paragraph',
        text: 'If we stream the response instead, we can process chunks of the body as they are received from the network:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const url = "https://www.example.org/a-large-file.txt";\n\nasync function fetchTextAsStream(url) {\n  try {\n    const response = await fetch(url);\n    if (!response.ok) {\n      throw new Error(`Response status: ${response.status}`);\n    }\n\n    const stream = response.body.pipeThrough(new TextDecoderStream());\n    for await (const value of stream) {\n      console.log(value);\n    }\n  } catch (e) {\n    console.error(e);\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'In this example, we iterate asynchronously over the stream, processing each chunk as it arrives.',
      },
      {
        type: 'paragraph',
        text: 'Note that when you access the body directly like this, you get the raw bytes of the response and must transform it yourself. In this case we call ReadableStream.pipeThrough() to pipe the response through a TextDecoderStream, which decodes the UTF-8-encoded body data as text.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Processing a text file line by line',
      },
      {
        type: 'paragraph',
        text: "In the example below, we fetch a text resource and process it line by line, using a regular expression to look for line endings. For simplicity, we assume the text is UTF-8, and don't handle fetch errors:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'async function* makeTextFileLineIterator(fileURL) {\n  const response = await fetch(fileURL);\n  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();\n\n  let { value: chunk = "", done: readerDone } = await reader.read();\n\n  const newline = /\\r?\\n/g;\n  let startIndex = 0;\n\n  while (true) {\n    const result = newline.exec(chunk);\n    if (!result) {\n      if (readerDone) break;\n      const remainder = chunk.slice(startIndex);\n      ({ value: chunk, done: readerDone } = await reader.read());\n      chunk = remainder + (chunk || "");\n      startIndex = newline.lastIndex = 0;\n      continue;\n    }\n    yield chunk.substring(startIndex, result.index);\n    startIndex = newline.lastIndex;\n  }\n\n  if (startIndex < chunk.length) {\n    // Last line didn\'t end in a newline char\n    yield chunk.substring(startIndex);\n  }\n}\n\nasync function run(urlOfFile) {\n  for await (const line of makeTextFileLineIterator(urlOfFile)) {\n    processLine(line);\n  }\n}\n\nfunction processLine(line) {\n  console.log(line);\n}\n\nrun("https://www.example.org/a-large-file.txt");',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Locked and disturbed streams',
      },
      {
        type: 'paragraph',
        text: 'The consequences of request and response bodies being streams are that:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'if a reader has been attached to a stream using ReadableStream.getReader(), then the stream is locked, and nothing else can read the stream.',
          'if any content has been read from the stream, then the stream is disturbed, and nothing else can read from the stream.',
        ],
      },
      {
        type: 'paragraph',
        text: "This means it's not possible to read the same response (or request) body more than once:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'async function getData() {\n  const url = "https://example.org/products.json";\n  try {\n    const response = await fetch(url);\n    if (!response.ok) {\n      throw new Error(`Response status: ${response.status}`);\n    }\n\n    const result1 = await response.json();\n    const result2 = await response.json(); // will throw\n  } catch (error) {\n    console.error(error.message);\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'If you do need to read the body more than once, you must call Response.clone() before reading the body:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'async function getData() {\n  const url = "https://example.org/products.json";\n  try {\n    const response1 = await fetch(url);\n    if (!response1.ok) {\n      throw new Error(`Response status: ${response1.status}`);\n    }\n\n    const response2 = response1.clone();\n\n    const result1 = await response1.json();\n    const result2 = await response2.json();\n  } catch (error) {\n    console.error(error.message);\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'This is a common pattern when implementing an offline cache with service workers. The service worker wants to return the response to the app, but also to cache the response. So it clones the response, returns the original, and caches the clone:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'async function cacheFirst(request) {\n  const cachedResponse = await caches.match(request);\n  if (cachedResponse) {\n    return cachedResponse;\n  }\n  try {\n    const networkResponse = await fetch(request);\n    if (networkResponse.ok) {\n      const cache = await caches.open("MyCache_1");\n      cache.put(request, networkResponse.clone());\n    }\n    return networkResponse;\n  } catch (error) {\n    return Response.error();\n  }\n}\n\nself.addEventListener("fetch", (event) => {\n  if (precachedResources.includes(url.pathname)) {\n    event.respondWith(cacheFirst(event.request));\n  }\n});',
        },
      },
      {
        type: 'list',
        ordered: false,
        items: ['Service Worker API', 'Streams API', 'CORS', 'HTTP', 'Fetch examples on GitHub'],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
