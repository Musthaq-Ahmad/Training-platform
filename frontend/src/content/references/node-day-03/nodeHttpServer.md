### Class: `http.Server`

- Extends: [`<net.Server>`](net.html#class-netserver)

#### Event: `'checkContinue'`

- `request` [`<http.IncomingMessage>`](http.html#class-httpincomingmessage)
- `response` [`<http.ServerResponse>`](http.html#class-httpserverresponse)

Emitted each time a request with an HTTP `Expect: 100-continue` is received. If this event is not listened for, the server will automatically respond with a `100 Continue` as appropriate.

Handling this event involves calling [`response.writeContinue()`](#responsewritecontinue) if the client should continue to send the request body, or generating an appropriate HTTP response (e.g. 400 Bad Request) if the client should not continue to send the request body.

When this event is emitted and handled, the [`'request'`](#event-request) event will not be emitted.

#### Event: `'checkExpectation'`

- `request` [`<http.IncomingMessage>`](http.html#class-httpincomingmessage)
- `response` [`<http.ServerResponse>`](http.html#class-httpserverresponse)

Emitted each time a request with an HTTP `Expect` header is received, where the value is not `100-continue`. If this event is not listened for, the server will automatically respond with a `417 Expectation Failed` as appropriate.

When this event is emitted and handled, the [`'request'`](#event-request) event will not be emitted.

#### Event: `'clientError'`

- `exception` [`<Error>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)
- `socket` [`<stream.Duplex>`](stream.html#class-streamduplex)

If a client connection emits an `'error'` event, it will be forwarded here. Listener of this event is responsible for closing/destroying the underlying socket. For example, one may wish to more gracefully close the socket with a custom HTTP response instead of abruptly severing the connection. The socket **must be closed or destroyed** before the listener ends.

This event is guaranteed to be passed an instance of the [`<net.Socket>`](net.html#class-netsocket) class, a subclass of [`<stream.Duplex>`](stream.html#class-streamduplex), unless the user specifies a socket type other than [`<net.Socket>`](net.html#class-netsocket).

Default behavior is to try close the socket with an HTTP '400 Bad Request', or an HTTP '431 Request Header Fields Too Large' in the case of an [`HPE_HEADER_OVERFLOW`](errors.html#hpe_header_overflow) error. If the socket is not writable or headers of the current attached [`http.ServerResponse`](#class-httpserverresponse) has been sent, it is immediately destroyed.

`socket` is the [`net.Socket`](net.html#class-netsocket) object that the error originated from.

```js
import http from 'node:http';

const server = http.createServer((req, res) => {
  res.end();
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000);
```

When the `'clientError'` event occurs, there is no `request` or `response` object, so any HTTP response sent, including response headers and payload, _must_ be written directly to the `socket` object. Care must be taken to ensure the response is a properly formatted HTTP response message.

`err` is an instance of `Error` with two extra columns:

- `bytesParsed`: the bytes count of request packet that Node.js may have parsed correctly;
- `rawPacket`: the raw packet of current request.

In some cases, the client has already received the response and/or the socket has already been destroyed, like in case of `ECONNRESET` errors. Before trying to send data to the socket, it is better to check that it is still writable.

```js
server.on('clientError', (err, socket) => {
  if (err.code === 'ECONNRESET' || !socket.writable) {
    return;
  }

  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
```

#### Event: `'close'`

Emitted when the server closes.

#### Event: `'connect'`

- `request` [`<http.IncomingMessage>`](http.html#class-httpincomingmessage) Arguments for the HTTP request, as it is in the [`'request'`](#event-request) event
- `socket` [`<stream.Duplex>`](stream.html#class-streamduplex) Network socket between the server and client
- `head` [`<Buffer>`](buffer.html#class-buffer) The first packet of the tunneling stream (may be empty)

Emitted each time a client requests an HTTP `CONNECT` method. If this event is not listened for, then clients requesting a `CONNECT` method will have their connections closed.

This event is guaranteed to be passed an instance of the [`<net.Socket>`](net.html#class-netsocket) class, a subclass of [`<stream.Duplex>`](stream.html#class-streamduplex), unless the user specifies a socket type other than [`<net.Socket>`](net.html#class-netsocket).

After this event is emitted, the request's socket will not have a `'data'` event listener, meaning it will need to be bound in order to handle data sent to the server on that socket.

#### Event: `'connection'`

- `socket` [`<stream.Duplex>`](stream.html#class-streamduplex)

This event is emitted when a new TCP stream is established. `socket` is typically an object of type [`net.Socket`](net.html#class-netsocket). Usually users will not want to access this event. In particular, the socket will not emit `'readable'` events because of how the protocol parser attaches to the socket. The `socket` can also be accessed at `request.socket`.

This event can also be explicitly emitted by users to inject connections into the HTTP server. In that case, any [`Duplex`](stream.html#class-streamduplex) stream can be passed.

If `socket.setTimeout()` is called here, the timeout will be replaced with `server.keepAliveTimeout` when the socket has served a request (if `server.keepAliveTimeout` is non-zero).

This event is guaranteed to be passed an instance of the [`<net.Socket>`](net.html#class-netsocket) class, a subclass of [`<stream.Duplex>`](stream.html#class-streamduplex), unless the user specifies a socket type other than [`<net.Socket>`](net.html#class-netsocket).

#### Event: `'dropRequest'`

- `request` [`<http.IncomingMessage>`](http.html#class-httpincomingmessage) Arguments for the HTTP request, as it is in the [`'request'`](#event-request) event
- `socket` [`<stream.Duplex>`](stream.html#class-streamduplex) Network socket between the server and client

When the number of requests on a socket reaches the threshold of `server.maxRequestsPerSocket`, the server will drop new requests and emit `'dropRequest'` event instead, then send `503` to client.

#### Event: `'request'`

- `request` [`<http.IncomingMessage>`](http.html#class-httpincomingmessage)
- `response` [`<http.ServerResponse>`](http.html#class-httpserverresponse)

Emitted each time there is a request. There may be multiple requests per connection (in the case of HTTP Keep-Alive connections).

#### Event: `'upgrade'`

- `request` [`<http.IncomingMessage>`](http.html#class-httpincomingmessage) Arguments for the HTTP request, as it is in the [`'request'`](#event-request) event
- `stream` [`<stream.Duplex>`](stream.html#class-streamduplex) The upgraded stream between the server and client
- `head` [`<Buffer>`](buffer.html#class-buffer) The first packet of the upgraded stream (may be empty)

Emitted each time a client's HTTP upgrade request is accepted. By default all HTTP upgrade requests are ignored (i.e. only regular `'request'` events are emitted, sticking with the normal HTTP request/response flow) unless you listen to this event, in which case they are all accepted (i.e. the `'upgrade'` event is emitted instead, and future communication must handled directly through the raw stream). You can control this more precisely by using the server `shouldUpgradeCallback` option.

Listening to this event is optional and clients cannot insist on a protocol change.

If an upgrade is accepted by `shouldUpgradeCallback` but no event handler is registered then the socket will be destroyed, resulting in an immediate connection closure for the client.

In the uncommon case that the incoming request has a body, this body will be parsed as normal, separate to the upgrade stream, and the raw stream data will only begin after it has completed. To ensure that reading from the stream isn't blocked by waiting for the request body to be read, any reads on the stream will start the request body flowing automatically. If you want to read the request body, ensure that you do so (i.e. you attach `'data'` listeners) before starting to read from the upgraded stream.

The stream argument will typically be the [`<net.Socket>`](net.html#class-netsocket) instance used by the request, but in some cases (such as with a request body) it may be a duplex stream. If required, you can access the raw connection underlying the request via [`request.socket`](#requestsocket), which is guaranteed to be an instance of [`<net.Socket>`](net.html#class-netsocket) unless the user specified another socket type.

#### `server.close([callback])`

- `callback` [`<Function>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function)

Stops the server from accepting new connections and closes all connections connected to this server which are not sending a request or waiting for a response. See [`net.Server.close()`](net.html#serverclosecallback).

```js
const http = require('node:http');

const server = http.createServer({ keepAliveTimeout: 60000 }, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      data: 'Hello World!',
    })
  );
});

server.listen(8000);
// Close the server after 10 seconds
setTimeout(() => {
  server.close(() => {
    console.log('server on port 8000 closed successfully');
  });
}, 10000);
```

#### `server.closeAllConnections()`

Closes all established HTTP(S) connections connected to this server, including active connections connected to this server which are sending a request or waiting for a response. This does _not_ destroy sockets upgraded to a different protocol, such as WebSocket or HTTP/2.

> This is a forceful way of closing all connections and should be used with caution. Whenever using this in conjunction with `server.close`, calling this _after_ `server.close` is recommended as to avoid race conditions where new connections are created between a call to this and a call to `server.close`.

```js
const http = require('node:http');

const server = http.createServer({ keepAliveTimeout: 60000 }, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      data: 'Hello World!',
    })
  );
});

server.listen(8000);
// Close the server after 10 seconds
setTimeout(() => {
  server.close(() => {
    console.log('server on port 8000 closed successfully');
  });
  // Closes all connections, ensuring the server closes successfully
  server.closeAllConnections();
}, 10000);
```

#### `server.closeIdleConnections()`

Closes all connections connected to this server which are not sending a request or waiting for a response.

> Starting with Node.js 19.0.0, there's no need for calling this method in conjunction with `server.close` to reap `keep-alive` connections. Using it won't cause any harm though, and it can be useful to ensure backwards compatibility for libraries and applications that need to support versions older than 19.0.0. Whenever using this in conjunction with `server.close`, calling this _after_ `server.close` is recommended as to avoid race conditions where new connections are created between a call to this and a call to `server.close`.

```js
const http = require('node:http');

const server = http.createServer({ keepAliveTimeout: 60000 }, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      data: 'Hello World!',
    })
  );
});

server.listen(8000);
// Close the server after 10 seconds
setTimeout(() => {
  server.close(() => {
    console.log('server on port 8000 closed successfully');
  });
  // Closes idle connections, such as keep-alive connections. Server will close
  // once remaining active connections are terminated
  server.closeIdleConnections();
}, 10000);
```

#### `server.headersTimeout`

- Type: [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) **Default:** The minimum between [`server.requestTimeout`](#serverrequesttimeout) or `60000`.

Limit the amount of time the parser will wait to receive the complete HTTP headers.

If the timeout expires, the server responds with status 408 without forwarding the request to the request listener and then closes the connection.

It must be set to a non-zero value (e.g. 120 seconds) to protect against potential Denial-of-Service attacks in case the server is deployed without a reverse proxy in front.

#### `server.listen()`

Starts the HTTP server listening for connections. This method is identical to [`server.listen()`](net.html#serverlisten) from [`net.Server`](net.html#class-netserver).

#### `server.listening`

- Type: [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) Indicates whether or not the server is listening for connections.

#### `server.maxHeadersCount`

- Type: [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) **Default:** `1000`

Limits maximum incoming headers count. If set to 0, no limit will be applied.

#### `server.requestTimeout`

- Type: [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) **Default:** `300000`

Sets the timeout value in milliseconds for receiving the entire request from the client.

If the timeout expires, the server responds with status 408 without forwarding the request to the request listener and then closes the connection.

It must be set to a non-zero value (e.g. 120 seconds) to protect against potential Denial-of-Service attacks in case the server is deployed without a reverse proxy in front.

#### `server.setTimeout([msecs][, callback])`

- `msecs` [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) **Default:** 0 (no timeout)
- `callback` [`<Function>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function)
- Returns: [`<http.Server>`](http.html#class-httpserver)

Sets the timeout value for sockets, and emits a `'timeout'` event on the Server object, passing the socket as an argument, if a timeout occurs.

If there is a `'timeout'` event listener on the Server object, then it will be called with the timed-out socket as an argument.

By default, the Server does not timeout sockets. However, if a callback is assigned to the Server's `'timeout'` event, timeouts must be handled explicitly.

#### `server.maxRequestsPerSocket`

- Type: [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) Requests per socket. **Default:** 0 (no limit)

The maximum number of requests socket can handle before closing keep alive connection.

A value of `0` will disable the limit.

When the limit is reached it will set the `Connection` header value to `close`, but will not actually close the connection, subsequent requests sent after the limit is reached will get `503 Service Unavailable` as a response.

#### `server.timeout`

- Type: [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) Timeout in milliseconds. **Default:** 0 (no timeout)

The number of milliseconds of inactivity before a socket is presumed to have timed out.

A value of `0` will disable the timeout behavior on incoming connections.

The socket timeout logic is set up on connection, so changing this value only affects new connections to the server, not any existing connections.

#### `server.keepAliveTimeout`

- Type: [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) Timeout in milliseconds. **Default:** `5000` (5 seconds).

The number of milliseconds of inactivity a server needs to wait for additional incoming data, after it has finished writing the last response, before a socket will be destroyed.

This timeout value is combined with the [`server.keepAliveTimeoutBuffer`](#serverkeepalivetimeoutbuffer) option to determine the actual socket timeout, calculated as: socketTimeout = keepAliveTimeout + keepAliveTimeoutBuffer If the server receives new data before the keep-alive timeout has fired, it will reset the regular inactivity timeout, i.e., [`server.timeout`](#servertimeout).

A value of `0` will disable the keep-alive timeout behavior on incoming connections. A value of `0` makes the HTTP server behave similarly to Node.js versions prior to 8.0.0, which did not have a keep-alive timeout.

The socket timeout logic is set up on connection, so changing this value only affects new connections to the server, not any existing connections.

#### `server.keepAliveTimeoutBuffer`

- Type: [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) Timeout in milliseconds. **Default:** `1000` (1 second).

An additional buffer time added to the [`server.keepAliveTimeout`](#serverkeepalivetimeout) to extend the internal socket timeout.

This buffer helps reduce connection reset (`ECONNRESET`) errors by increasing the socket timeout slightly beyond the advertised keep-alive timeout.

This option applies only to new incoming connections.

#### `server[Symbol.asyncDispose]()`

Calls [`server.close()`](#serverclosecallback) and returns a promise that fulfills when the server has closed.
