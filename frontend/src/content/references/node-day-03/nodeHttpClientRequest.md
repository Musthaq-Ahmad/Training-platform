### Class: `http.ClientRequest`

- Extends: [`<http.OutgoingMessage>`](http.html#class-httpoutgoingmessage)

This object is created internally and returned from [`http.request()`](#httprequestoptions-callback). It represents an _in-progress_ request whose header has already been queued. The header is still mutable using the [`setHeader(name, value)`](#requestsetheadername-value), [`getHeader(name)`](#requestgetheadername), [`removeHeader(name)`](#requestremoveheadername) API. The actual header will be sent along with the first data chunk or when calling [`request.end()`](#requestenddata-encoding-callback).

To get the response, add a listener for [`'response'`](#event-response) to the request object. [`'response'`](#event-response) will be emitted from the request object when the response headers have been received. The [`'response'`](#event-response) event is executed with one argument which is an instance of [`http.IncomingMessage`](#class-httpincomingmessage).

During the [`'response'`](#event-response) event, one can add listeners to the response object; particularly to listen for the `'data'` event.

If no [`'response'`](#event-response) handler is added, then the response will be entirely discarded. However, if a [`'response'`](#event-response) event handler is added, then the data from the response object **must** be consumed, either by calling `response.read()` whenever there is a `'readable'` event, or by adding a `'data'` handler, or by calling the `.resume()` method. Until the data is consumed, the `'end'` event will not fire. Also, until the data is read it will consume memory that can eventually lead to a 'process out of memory' error.

For backward compatibility, `res` will only emit `'error'` if there is an `'error'` listener registered.

Set `Content-Length` header to limit the response body size. If [`response.strictContentLength`](#responsestrictcontentlength) is set to `true`, mismatching the `Content-Length` header value will result in an `Error` being thrown, identified by `code:` [`'ERR_HTTP_CONTENT_LENGTH_MISMATCH'`](errors.html#err_http_content_length_mismatch).

`Content-Length` value should be in bytes, not characters. Use [`Buffer.byteLength()`](buffer.html#static-method-bufferbytelengthstring-encoding) to determine the length of the body in bytes.

#### Event: `'abort'`

Stability: 0 - Deprecated. Listen for the `'close'` event instead.

Emitted when the request has been aborted by the client. This event is only emitted on the first call to `abort()`.

#### Event: `'close'`

Indicates that the request is completed, or its underlying connection was terminated prematurely (before the response completion).

#### Event: `'connect'`

- `response` [`<http.IncomingMessage>`](http.html#class-httpincomingmessage)
- `socket` [`<stream.Duplex>`](stream.html#class-streamduplex)
- `head` [`<Buffer>`](buffer.html#class-buffer)

Emitted each time a server responds to a request with a `CONNECT` method. If this event is not being listened for, clients receiving a `CONNECT` method will have their connections closed.

This event is guaranteed to be passed an instance of the [`<net.Socket>`](net.html#class-netsocket) class, a subclass of [`<stream.Duplex>`](stream.html#class-streamduplex), unless the user specifies a socket type other than [`<net.Socket>`](net.html#class-netsocket).

A client and server pair demonstrating how to listen for the `'connect'` event:

```js
import { createServer, request } from 'node:http';
import { connect } from 'node:net';
import { URL } from 'node:url';

// Create an HTTP tunneling proxy
const proxy = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
proxy.on('connect', (req, clientSocket, head) => {
  // Connect to an origin server
  const { port, hostname } = new URL(`http://${req.url}`);
  const serverSocket = connect(port || 80, hostname, () => {
    clientSocket.write(
      'HTTP/1.1 200 Connection Established\r\n' + 'Proxy-agent: Node.js-Proxy\r\n' + '\r\n'
    );
    serverSocket.write(head);
    serverSocket.pipe(clientSocket);
    clientSocket.pipe(serverSocket);
  });
});

// Now that proxy is running
proxy.listen(1337, '127.0.0.1', () => {
  // Make a request to a tunneling proxy
  const options = {
    port: 1337,
    host: '127.0.0.1',
    method: 'CONNECT',
    path: 'www.google.com:80',
  };

  const req = request(options);
  req.end();

  req.on('connect', (res, socket, head) => {
    console.log('got connected!');

    // Make a request over an HTTP tunnel
    socket.write(
      'GET / HTTP/1.1\r\n' + 'Host: www.google.com:80\r\n' + 'Connection: close\r\n' + '\r\n'
    );
    socket.on('data', (chunk) => {
      console.log(chunk.toString());
    });
    socket.on('end', () => {
      proxy.close();
    });
  });
});
```

#### Event: `'continue'`

Emitted when the server sends a '100 Continue' HTTP response, usually because the request contained 'Expect: 100-continue'. This is an instruction that the client should send the request body.

#### Event: `'finish'`

Emitted when the request has been sent. More specifically, this event is emitted when the last segment of the request headers and body have been handed off to the operating system for transmission over the network. It does not imply that the server has received anything yet.

#### Event: `'information'`

- `info` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `httpVersion` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)
  - `httpVersionMajor` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type)
  - `httpVersionMinor` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type)
  - `statusCode` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type)
  - `statusMessage` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)
  - `headers` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `rawHeaders` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)\[\]

Emitted when the server sends a 1xx intermediate response (excluding 101 Upgrade). The listeners of this event will receive an object containing the HTTP version, status code, status message, key-value headers object, and array with the raw header names followed by their respective values.

```js
import { request } from 'node:http';

const options = {
  host: '127.0.0.1',
  port: 8080,
  path: '/length_request',
};

// Make a request
const req = request(options);
req.end();

req.on('information', (info) => {
  console.log(`Got information prior to main response: ${info.statusCode}`);
});
```

101 Upgrade statuses do not fire this event due to their break from the traditional HTTP request/response chain, such as web sockets, in-place TLS upgrades, or HTTP 2.0. To be notified of 101 Upgrade notices, listen for the [`'upgrade'`](#event-upgrade) event instead.

#### Event: `'response'`

- `response` [`<http.IncomingMessage>`](http.html#class-httpincomingmessage)

Emitted when a response is received to this request. This event is emitted only once.

#### Event: `'socket'`

- `socket` [`<stream.Duplex>`](stream.html#class-streamduplex)

This event is guaranteed to be passed an instance of the [`<net.Socket>`](net.html#class-netsocket) class, a subclass of [`<stream.Duplex>`](stream.html#class-streamduplex), unless the user specifies a socket type other than [`<net.Socket>`](net.html#class-netsocket).

#### Event: `'timeout'`

Emitted when the underlying socket times out from inactivity. This only notifies that the socket has been idle. The request must be destroyed manually.

See also: [`request.setTimeout()`](#requestsettimeouttimeout-callback).

#### Event: `'upgrade'`

- `response` [`<http.IncomingMessage>`](http.html#class-httpincomingmessage)
- `stream` [`<stream.Duplex>`](stream.html#class-streamduplex)
- `head` [`<Buffer>`](buffer.html#class-buffer)

Emitted each time a server responds to a request with an upgrade. If this event is not being listened for and the response status code is 101 Switching Protocols, clients receiving an upgrade header will have their connections closed.

This event is guaranteed to be passed an instance of the [`<net.Socket>`](net.html#class-netsocket) class, a subclass of [`<stream.Duplex>`](stream.html#class-streamduplex), unless the user specifies a socket type other than [`<net.Socket>`](net.html#class-netsocket).

A client server pair demonstrating how to listen for the `'upgrade'` event.

```js
import http from 'node:http';
import process from 'node:process';

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
server.on('upgrade', (req, stream, head) => {
  stream.write(
    'HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
      'Upgrade: WebSocket\r\n' +
      'Connection: Upgrade\r\n' +
      '\r\n'
  );

  stream.pipe(stream); // echo back
});

// Now that server is running
server.listen(1337, '127.0.0.1', () => {
  // make a request
  const options = {
    port: 1337,
    host: '127.0.0.1',
    headers: {
      Connection: 'Upgrade',
      Upgrade: 'websocket',
    },
  };

  const req = http.request(options);
  req.end();

  req.on('upgrade', (res, stream, upgradeHead) => {
    console.log('got upgraded!');
    stream.end();
    process.exit(0);
  });
});
```

#### `request.abort()`

Stability: 0 - Deprecated: Use [`request.destroy()`](#requestdestroyerror) instead.

Marks the request as aborting. Calling this will cause remaining data in the response to be dropped and the socket to be destroyed.

#### `request.aborted`

Stability: 0 - Deprecated. Check [`request.destroyed`](#requestdestroyed) instead.

- Type: [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type)

The `request.aborted` property will be `true` if the request has been aborted.

#### `request.connection`

Stability: 0 - Deprecated. Use [`request.socket`](#requestsocket).

- Type: [`<stream.Duplex>`](stream.html#class-streamduplex)

See [`request.socket`](#requestsocket).

#### `request.cork()`

See [`writable.cork()`](stream.html#writablecork).

#### `request.end([data[, encoding]][, callback])`

- `data` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<Uint8Array>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
- `encoding` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)
- `callback` [`<Function>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function)
- Returns: [`<this>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/this)

Finishes sending the request. If any parts of the body are unsent, it will flush them to the stream. If the request is chunked, this will send the terminating `'0\r\n\r\n'`.

If `data` is specified, it is equivalent to calling [`request.write(data, encoding)`](#requestwritechunk-encoding-callback) followed by `request.end(callback)`.

If `callback` is specified, it will be called when the request stream is finished.

#### `request.destroy([error])`

- `error` [`<Error>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error) Optional, an error to emit with `'error'` event.
- Returns: [`<this>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/this)

Destroy the request. Optionally emit an `'error'` event, and emit a `'close'` event. Calling this will cause remaining data in the response to be dropped, and the socket to be destroyed if used, or returned to the corresponding Agent pool otherwise if possible.

See [`writable.destroy()`](stream.html#writabledestroyerror) for further details.

##### `request.destroyed`

- Type: [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type)

Is `true` after [`request.destroy()`](#requestdestroyerror) has been called.

See [`writable.destroyed`](stream.html#writabledestroyed) for further details.

#### `request.finished`

Stability: 0 - Deprecated. Use [`request.writableEnded`](#requestwritableended).

- Type: [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type)

The `request.finished` property will be `true` if [`request.end()`](#requestenddata-encoding-callback) has been called. `request.end()` will automatically be called if the request was initiated via [`http.get()`](#httpgetoptions-callback).

#### `request.flushHeaders()`

Flushes the request headers.

For efficiency reasons, Node.js normally buffers the request headers until `request.end()` is called or the first chunk of request data is written. It then tries to pack the request headers and data into a single TCP packet.

That's usually desired (it saves a TCP round-trip), but not when the first data is not sent until possibly much later. `request.flushHeaders()` bypasses the optimization and kickstarts the request.

#### `request.getHeader(name)`

- `name` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)
- Returns: [`<any>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#Data_types)

Reads out a header on the request. The name is case-insensitive. The type of the return value depends on the arguments provided to [`request.setHeader()`](#requestsetheadername-value).

```js
request.setHeader('content-type', 'text/html');
request.setHeader('Content-Length', Buffer.byteLength(body));
request.setHeader('Cookie', ['type=ninja', 'language=javascript']);
const contentType = request.getHeader('Content-Type');
// 'contentType' is 'text/html'
const contentLength = request.getHeader('Content-Length');
// 'contentLength' is of type number
const cookie = request.getHeader('Cookie');
// 'cookie' is of type string[]
```

#### `request.getHeaderNames()`

- Returns: [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)\[\]

Returns an array containing the unique names of the current outgoing headers. All header names are lowercase.

```js
request.setHeader('Foo', 'bar');
request.setHeader('Cookie', ['foo=bar', 'bar=baz']);

const headerNames = request.getHeaderNames();
// headerNames === ['foo', 'cookie']
```

#### `request.getHeaders()`

- Returns: [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

Returns a shallow copy of the current outgoing headers. Since a shallow copy is used, array values may be mutated without additional calls to various header-related http module methods. The keys of the returned object are the header names and the values are the respective header values. All header names are lowercase.

The object returned by the `request.getHeaders()` method _does not_ prototypically inherit from the JavaScript `Object`. This means that typical `Object` methods such as `obj.toString()`, `obj.hasOwnProperty()`, and others are not defined and _will not work_.

```js
request.setHeader('Foo', 'bar');
request.setHeader('Cookie', ['foo=bar', 'bar=baz']);

const headers = request.getHeaders();
// headers === { foo: 'bar', 'cookie': ['foo=bar', 'bar=baz'] }
```

#### `request.getRawHeaderNames()`

- Returns: [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)\[\]

Returns an array containing the unique names of the current outgoing raw headers. Header names are returned with their exact casing being set.

```js
request.setHeader('Foo', 'bar');
request.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);

const headerNames = request.getRawHeaderNames();
// headerNames === ['Foo', 'Set-Cookie']
```

#### `request.hasHeader(name)`

- `name` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)
- Returns: [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type)

Returns `true` if the header identified by `name` is currently set in the outgoing headers. The header name matching is case-insensitive.

```js
const hasContentType = request.hasHeader('content-type');
```

#### `request.maxHeadersCount`

- Type: [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) **Default:** `1000`

Limits maximum response headers count. If set to 0, no limit will be applied.

#### `request.path`

- Type: [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) The request path.

#### `request.method`

- Type: [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) The request method.

#### `request.host`

- Type: [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) The request host.

#### `request.protocol`

- Type: [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) The request protocol.

#### `request.removeHeader(name)`

- `name` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)

Removes a header that's already defined into headers object.

```js
request.removeHeader('Content-Type');
```

#### `request.reusedSocket`

- Type: [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) Whether the request is sent through a reused socket.

When sending request through a keep-alive enabled agent, the underlying socket might be reused. But if server closes connection at unfortunate time, client may run into a 'ECONNRESET' error.

```js
import http from 'node:http';
const agent = new http.Agent({ keepAlive: true });

// Server has a 5 seconds keep-alive timeout by default
http
  .createServer((req, res) => {
    res.write('hello\n');
    res.end();
  })
  .listen(3000);

setInterval(() => {
  // Adapting a keep-alive agent
  http.get('http://localhost:3000', { agent }, (res) => {
    res.on('data', (data) => {
      // Do nothing
    });
  });
}, 5000); // Sending request on 5s interval so it's easy to hit idle timeout
```

By marking a request whether it reused socket or not, we can do automatic error retry base on it.

```js
import http from 'node:http';
const agent = new http.Agent({ keepAlive: true });

function retriableRequest() {
  const req = http
    .get('http://localhost:3000', { agent }, (res) => {
      // ...
    })
    .on('error', (err) => {
      // Check if retry is needed
      if (req.reusedSocket && err.code === 'ECONNRESET') {
        retriableRequest();
      }
    });
}

retriableRequest();
```

#### `request.setHeader(name, value)`

- `name` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)
- `value` [`<any>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#Data_types)

Sets a single header value for headers object. If this header already exists in the to-be-sent headers, its value will be replaced. Use an array of strings here to send multiple headers with the same name. Non-string values will be stored without modification. Therefore, [`request.getHeader()`](#requestgetheadername) may return non-string values. However, the non-string values will be converted to strings for network transmission.

```js
request.setHeader('Content-Type', 'application/json');
```

or

```js
request.setHeader('Cookie', ['type=ninja', 'language=javascript']);
```

When the value is a string an exception will be thrown if it contains characters outside the `latin1` encoding.

If you need to pass UTF-8 characters in the value please encode the value using the [RFC 8187](https://www.rfc-editor.org/rfc/rfc8187.txt) standard.

```js
const filename = 'Rock 🎵.txt';
request.setHeader(
  'Content-Disposition',
  `attachment; filename*=utf-8''${encodeURIComponent(filename)}`
);
```

#### `request.setNoDelay([noDelay])`

- `noDelay` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type)

Once a socket is assigned to this request and is connected [`socket.setNoDelay()`](net.html#socketsetnodelaynodelay) will be called.

#### `request.setSocketKeepAlive([enable][, initialDelay])`

- `enable` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type)
- `initialDelay` [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type)

Once a socket is assigned to this request and is connected [`socket.setKeepAlive()`](net.html#socketsetkeepalive) will be called.

#### `request.setTimeout(timeout[, callback])`

- `timeout` [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) Milliseconds before a request times out.
- `callback` [`<Function>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function) Optional function to be called when a timeout occurs. Same as binding to the `'timeout'` event.
- Returns: [`<http.ClientRequest>`](http.html#class-httpclientrequest)

Once a socket is assigned to this request and is connected [`socket.setTimeout()`](net.html#socketsettimeouttimeout-callback) will be called.

#### `request.socket`

- Type: [`<stream.Duplex>`](stream.html#class-streamduplex)

Reference to the underlying socket. Usually users will not want to access this property. In particular, the socket will not emit `'readable'` events because of how the protocol parser attaches to the socket.

```js
import http from 'node:http';
const options = {
  host: 'www.google.com',
};
const req = http.get(options);
req.end();
req.once('response', (res) => {
  const ip = req.socket.localAddress;
  const port = req.socket.localPort;
  console.log(`Your IP address is ${ip} and your source port is ${port}.`);
  // Consume response object
});
```

This property is guaranteed to be an instance of the [`<net.Socket>`](net.html#class-netsocket) class, a subclass of [`<stream.Duplex>`](stream.html#class-streamduplex), unless the user specified a socket type other than [`<net.Socket>`](net.html#class-netsocket).

#### `request.uncork()`

See [`writable.uncork()`](stream.html#writableuncork).

#### `request.writableEnded`

- Type: [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type)

Is `true` after [`request.end()`](#requestenddata-encoding-callback) has been called. This property does not indicate whether the data has been flushed, for this use [`request.writableFinished`](#requestwritablefinished) instead.

#### `request.writableFinished`

- Type: [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type)

Is `true` if all data has been flushed to the underlying system, immediately before the [`'finish'`](#event-finish) event is emitted.

#### `request.write(chunk[, encoding][, callback])`

- `chunk` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<Uint8Array>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
- `encoding` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)
- `callback` [`<Function>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function)
- Returns: [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type)

Sends a chunk of the body. This method can be called multiple times. If no `Content-Length` is set, data will automatically be encoded in HTTP Chunked transfer encoding, so that server knows when the data ends. The `Transfer-Encoding: chunked` header is added. Calling [`request.end()`](#requestenddata-encoding-callback) is necessary to finish sending the request.

The `encoding` argument is optional and only applies when `chunk` is a string. Defaults to `'utf8'`.

The `callback` argument is optional and will be called when this chunk of data is flushed, but only if the chunk is non-empty.

Returns `true` if the entire data was flushed successfully to the kernel buffer. Returns `false` if all or part of the data was queued in user memory. `'drain'` will be emitted when the buffer is free again.

When `write` function is called with empty string or buffer, it does nothing and waits for more input.
