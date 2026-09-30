import type { ContentTopic } from '../../../types';

export const nodehttpclientrequestTopics = {
  nodehttpclientrequest: {
    id: 'nodehttpclientrequest',
    heading: 'Class: http.ClientRequest',
    blocks: [
      {
        type: 'list',
        ordered: false,
        items: ['Extends: <http.OutgoingMessage>'],
      },
      {
        type: 'paragraph',
        text: 'This object is created internally and returned from http.request(). It represents an in-progress request whose header has already been queued. The header is still mutable using the setHeader(name, value), getHeader(name), removeHeader(name) API. The actual header will be sent along with the first data chunk or when calling request.end().',
      },
      {
        type: 'paragraph',
        text: "To get the response, add a listener for 'response' to the request object. 'response' will be emitted from the request object when the response headers have been received. The 'response' event is executed with one argument which is an instance of http.IncomingMessage.",
      },
      {
        type: 'paragraph',
        text: "During the 'response' event, one can add listeners to the response object; particularly to listen for the 'data' event.",
      },
      {
        type: 'paragraph',
        text: "If no 'response' handler is added, then the response will be entirely discarded. However, if a 'response' event handler is added, then the data from the response object must be consumed, either by calling response.read() whenever there is a 'readable' event, or by adding a 'data' handler, or by calling the .resume() method. Until the data is consumed, the 'end' event will not fire. Also, until the data is read it will consume memory that can eventually lead to a 'process out of memory' error.",
      },
      {
        type: 'paragraph',
        text: "For backward compatibility, res will only emit 'error' if there is an 'error' listener registered.",
      },
      {
        type: 'paragraph',
        text: "Set Content-Length header to limit the response body size. If response.strictContentLength is set to true, mismatching the Content-Length header value will result in an Error being thrown, identified by code: 'ERR_HTTP_CONTENT_LENGTH_MISMATCH'.",
      },
      {
        type: 'paragraph',
        text: 'Content-Length value should be in bytes, not characters. Use Buffer.byteLength() to determine the length of the body in bytes.',
      },
      {
        type: 'subheading',
        level: 4,
        text: "Event: 'abort'",
      },
      {
        type: 'paragraph',
        text: "Stability: 0 - Deprecated. Listen for the 'close' event instead.",
      },
      {
        type: 'paragraph',
        text: 'Emitted when the request has been aborted by the client. This event is only emitted on the first call to abort().',
      },
      {
        type: 'subheading',
        level: 4,
        text: "Event: 'close'",
      },
      {
        type: 'paragraph',
        text: 'Indicates that the request is completed, or its underlying connection was terminated prematurely (before the response completion).',
      },
      {
        type: 'subheading',
        level: 4,
        text: "Event: 'connect'",
      },
      {
        type: 'list',
        ordered: false,
        items: ['response <http.IncomingMessage>', 'socket <stream.Duplex>', 'head <Buffer>'],
      },
      {
        type: 'paragraph',
        text: 'Emitted each time a server responds to a request with a CONNECT method. If this event is not being listened for, clients receiving a CONNECT method will have their connections closed.',
      },
      {
        type: 'paragraph',
        text: 'This event is guaranteed to be passed an instance of the <net.Socket> class, a subclass of <stream.Duplex>, unless the user specifies a socket type other than <net.Socket>.',
      },
      {
        type: 'paragraph',
        text: "A client and server pair demonstrating how to listen for the 'connect' event:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { createServer, request } from 'node:http';\nimport { connect } from 'node:net';\nimport { URL } from 'node:url';\n\n// Create an HTTP tunneling proxy\nconst proxy = createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'text/plain' });\n  res.end('okay');\n});\nproxy.on('connect', (req, clientSocket, head) => {\n  // Connect to an origin server\n  const { port, hostname } = new URL(`http://${req.url}`);\n  const serverSocket = connect(port || 80, hostname, () => {\n    clientSocket.write('HTTP/1.1 200 Connection Established\\r\\n' +\n                    'Proxy-agent: Node.js-Proxy\\r\\n' +\n                    '\\r\\n');\n    serverSocket.write(head);\n    serverSocket.pipe(clientSocket);\n    clientSocket.pipe(serverSocket);\n  });\n});\n\n// Now that proxy is running\nproxy.listen(1337, '127.0.0.1', () => {\n\n  // Make a request to a tunneling proxy\n  const options = {\n    port: 1337,\n    host: '127.0.0.1',\n    method: 'CONNECT',\n    path: 'www.google.com:80',\n  };\n\n  const req = request(options);\n  req.end();\n\n  req.on('connect', (res, socket, head) => {\n    console.log('got connected!');\n\n    // Make a request over an HTTP tunnel\n    socket.write('GET / HTTP/1.1\\r\\n' +\n                 'Host: www.google.com:80\\r\\n' +\n                 'Connection: close\\r\\n' +\n                 '\\r\\n');\n    socket.on('data', (chunk) => {\n      console.log(chunk.toString());\n    });\n    socket.on('end', () => {\n      proxy.close();\n    });\n  });\n});",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: "Event: 'continue'",
      },
      {
        type: 'paragraph',
        text: "Emitted when the server sends a '100 Continue' HTTP response, usually because the request contained 'Expect: 100-continue'. This is an instruction that the client should send the request body.",
      },
      {
        type: 'subheading',
        level: 4,
        text: "Event: 'finish'",
      },
      {
        type: 'paragraph',
        text: 'Emitted when the request has been sent. More specifically, this event is emitted when the last segment of the request headers and body have been handed off to the operating system for transmission over the network. It does not imply that the server has received anything yet.',
      },
      {
        type: 'subheading',
        level: 4,
        text: "Event: 'information'",
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'info <Object> * httpVersion <string> * httpVersionMajor <integer> * httpVersionMinor <integer> * statusCode <integer> * statusMessage <string> * headers <Object> * rawHeaders <string>[]',
        ],
      },
      {
        type: 'paragraph',
        text: 'Emitted when the server sends a 1xx intermediate response (excluding 101 Upgrade). The listeners of this event will receive an object containing the HTTP version, status code, status message, key-value headers object, and array with the raw header names followed by their respective values.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { request } from 'node:http';\n\nconst options = {\n  host: '127.0.0.1',\n  port: 8080,\n  path: '/length_request',\n};\n\n// Make a request\nconst req = request(options);\nreq.end();\n\nreq.on('information', (info) => {\n  console.log(`Got information prior to main response: ${info.statusCode}`);\n});",
        },
      },
      {
        type: 'paragraph',
        text: "101 Upgrade statuses do not fire this event due to their break from the traditional HTTP request/response chain, such as web sockets, in-place TLS upgrades, or HTTP 2.0. To be notified of 101 Upgrade notices, listen for the 'upgrade' event instead.",
      },
      {
        type: 'subheading',
        level: 4,
        text: "Event: 'response'",
      },
      {
        type: 'list',
        ordered: false,
        items: ['response <http.IncomingMessage>'],
      },
      {
        type: 'paragraph',
        text: 'Emitted when a response is received to this request. This event is emitted only once.',
      },
      {
        type: 'subheading',
        level: 4,
        text: "Event: 'socket'",
      },
      {
        type: 'list',
        ordered: false,
        items: ['socket <stream.Duplex>'],
      },
      {
        type: 'paragraph',
        text: 'This event is guaranteed to be passed an instance of the <net.Socket> class, a subclass of <stream.Duplex>, unless the user specifies a socket type other than <net.Socket>.',
      },
      {
        type: 'subheading',
        level: 4,
        text: "Event: 'timeout'",
      },
      {
        type: 'paragraph',
        text: 'Emitted when the underlying socket times out from inactivity. This only notifies that the socket has been idle. The request must be destroyed manually.',
      },
      {
        type: 'paragraph',
        text: 'See also: request.setTimeout().',
      },
      {
        type: 'subheading',
        level: 4,
        text: "Event: 'upgrade'",
      },
      {
        type: 'list',
        ordered: false,
        items: ['response <http.IncomingMessage>', 'stream <stream.Duplex>', 'head <Buffer>'],
      },
      {
        type: 'paragraph',
        text: 'Emitted each time a server responds to a request with an upgrade. If this event is not being listened for and the response status code is 101 Switching Protocols, clients receiving an upgrade header will have their connections closed.',
      },
      {
        type: 'paragraph',
        text: 'This event is guaranteed to be passed an instance of the <net.Socket> class, a subclass of <stream.Duplex>, unless the user specifies a socket type other than <net.Socket>.',
      },
      {
        type: 'paragraph',
        text: "A client server pair demonstrating how to listen for the 'upgrade' event.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import http from 'node:http';\nimport process from 'node:process';\n\n// Create an HTTP server\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'text/plain' });\n  res.end('okay');\n});\nserver.on('upgrade', (req, stream, head) => {\n  stream.write('HTTP/1.1 101 Web Socket Protocol Handshake\\r\\n' +\n               'Upgrade: WebSocket\\r\\n' +\n               'Connection: Upgrade\\r\\n' +\n               '\\r\\n');\n\n  stream.pipe(stream); // echo back\n});\n\n// Now that server is running\nserver.listen(1337, '127.0.0.1', () => {\n\n  // make a request\n  const options = {\n    port: 1337,\n    host: '127.0.0.1',\n    headers: {\n      'Connection': 'Upgrade',\n      'Upgrade': 'websocket',\n    },\n  };\n\n  const req = http.request(options);\n  req.end();\n\n  req.on('upgrade', (res, stream, upgradeHead) => {\n    console.log('got upgraded!');\n    stream.end();\n    process.exit(0);\n  });\n});",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.abort()',
      },
      {
        type: 'paragraph',
        text: 'Stability: 0 - Deprecated: Use request.destroy() instead.',
      },
      {
        type: 'paragraph',
        text: 'Marks the request as aborting. Calling this will cause remaining data in the response to be dropped and the socket to be destroyed.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.aborted',
      },
      {
        type: 'paragraph',
        text: 'Stability: 0 - Deprecated. Check request.destroyed instead.',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <boolean>'],
      },
      {
        type: 'paragraph',
        text: 'The request.aborted property will be true if the request has been aborted.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.connection',
      },
      {
        type: 'paragraph',
        text: 'Stability: 0 - Deprecated. Use request.socket.',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <stream.Duplex>'],
      },
      {
        type: 'paragraph',
        text: 'See request.socket.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.cork()',
      },
      {
        type: 'paragraph',
        text: 'See writable.cork().',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.end([data[, encoding]][, callback])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'data <string> | <Buffer> | <Uint8Array>',
          'encoding <string>',
          'callback <Function>',
          'Returns: <this>',
        ],
      },
      {
        type: 'paragraph',
        text: "Finishes sending the request. If any parts of the body are unsent, it will flush them to the stream. If the request is chunked, this will send the terminating '0\\r\\n\\r\\n'.",
      },
      {
        type: 'paragraph',
        text: 'If data is specified, it is equivalent to calling request.write(data, encoding) followed by request.end(callback).',
      },
      {
        type: 'paragraph',
        text: 'If callback is specified, it will be called when the request stream is finished.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.destroy([error])',
      },
      {
        type: 'list',
        ordered: false,
        items: ["error <Error> Optional, an error to emit with 'error' event.", 'Returns: <this>'],
      },
      {
        type: 'paragraph',
        text: "Destroy the request. Optionally emit an 'error' event, and emit a 'close' event. Calling this will cause remaining data in the response to be dropped, and the socket to be destroyed if used, or returned to the corresponding Agent pool otherwise if possible.",
      },
      {
        type: 'paragraph',
        text: 'See writable.destroy() for further details.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'request.destroyed',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <boolean>'],
      },
      {
        type: 'paragraph',
        text: 'Is true after request.destroy() has been called.',
      },
      {
        type: 'paragraph',
        text: 'See writable.destroyed for further details.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.finished',
      },
      {
        type: 'paragraph',
        text: 'Stability: 0 - Deprecated. Use request.writableEnded.',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <boolean>'],
      },
      {
        type: 'paragraph',
        text: 'The request.finished property will be true if request.end() has been called. request.end() will automatically be called if the request was initiated via http.get().',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.flushHeaders()',
      },
      {
        type: 'paragraph',
        text: 'Flushes the request headers.',
      },
      {
        type: 'paragraph',
        text: 'For efficiency reasons, Node.js normally buffers the request headers until request.end() is called or the first chunk of request data is written. It then tries to pack the request headers and data into a single TCP packet.',
      },
      {
        type: 'paragraph',
        text: "That's usually desired (it saves a TCP round-trip), but not when the first data is not sent until possibly much later. request.flushHeaders() bypasses the optimization and kickstarts the request.",
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.getHeader(name)',
      },
      {
        type: 'list',
        ordered: false,
        items: ['name <string>', 'Returns: <any>'],
      },
      {
        type: 'paragraph',
        text: 'Reads out a header on the request. The name is case-insensitive. The type of the return value depends on the arguments provided to request.setHeader().',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "request.setHeader('content-type', 'text/html');\nrequest.setHeader('Content-Length', Buffer.byteLength(body));\nrequest.setHeader('Cookie', ['type=ninja', 'language=javascript']);\nconst contentType = request.getHeader('Content-Type');\n// 'contentType' is 'text/html'\nconst contentLength = request.getHeader('Content-Length');\n// 'contentLength' is of type number\nconst cookie = request.getHeader('Cookie');\n// 'cookie' is of type string[]",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.getHeaderNames()',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Returns: <string>[]'],
      },
      {
        type: 'paragraph',
        text: 'Returns an array containing the unique names of the current outgoing headers. All header names are lowercase.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "request.setHeader('Foo', 'bar');\nrequest.setHeader('Cookie', ['foo=bar', 'bar=baz']);\n\nconst headerNames = request.getHeaderNames();\n// headerNames === ['foo', 'cookie']",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.getHeaders()',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Returns: <Object>'],
      },
      {
        type: 'paragraph',
        text: 'Returns a shallow copy of the current outgoing headers. Since a shallow copy is used, array values may be mutated without additional calls to various header-related http module methods. The keys of the returned object are the header names and the values are the respective header values. All header names are lowercase.',
      },
      {
        type: 'paragraph',
        text: 'The object returned by the request.getHeaders() method does not prototypically inherit from the JavaScript Object. This means that typical Object methods such as obj.toString(), obj.hasOwnProperty(), and others are not defined and will not work.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "request.setHeader('Foo', 'bar');\nrequest.setHeader('Cookie', ['foo=bar', 'bar=baz']);\n\nconst headers = request.getHeaders();\n// headers === { foo: 'bar', 'cookie': ['foo=bar', 'bar=baz'] }",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.getRawHeaderNames()',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Returns: <string>[]'],
      },
      {
        type: 'paragraph',
        text: 'Returns an array containing the unique names of the current outgoing raw headers. Header names are returned with their exact casing being set.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "request.setHeader('Foo', 'bar');\nrequest.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);\n\nconst headerNames = request.getRawHeaderNames();\n// headerNames === ['Foo', 'Set-Cookie']",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.hasHeader(name)',
      },
      {
        type: 'list',
        ordered: false,
        items: ['name <string>', 'Returns: <boolean>'],
      },
      {
        type: 'paragraph',
        text: 'Returns true if the header identified by name is currently set in the outgoing headers. The header name matching is case-insensitive.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const hasContentType = request.hasHeader('content-type');",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.maxHeadersCount',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <number> Default: 1000'],
      },
      {
        type: 'paragraph',
        text: 'Limits maximum response headers count. If set to 0, no limit will be applied.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.path',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <string> The request path.'],
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.method',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <string> The request method.'],
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.host',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <string> The request host.'],
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.protocol',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <string> The request protocol.'],
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.removeHeader(name)',
      },
      {
        type: 'list',
        ordered: false,
        items: ['name <string>'],
      },
      {
        type: 'paragraph',
        text: "Removes a header that's already defined into headers object.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "request.removeHeader('Content-Type');",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.reusedSocket',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <boolean> Whether the request is sent through a reused socket.'],
      },
      {
        type: 'paragraph',
        text: "When sending request through a keep-alive enabled agent, the underlying socket might be reused. But if server closes connection at unfortunate time, client may run into a 'ECONNRESET' error.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import http from 'node:http';\nconst agent = new http.Agent({ keepAlive: true });\n\n// Server has a 5 seconds keep-alive timeout by default\nhttp\n  .createServer((req, res) => {\n    res.write('hello\\n');\n    res.end();\n  })\n  .listen(3000);\n\nsetInterval(() => {\n  // Adapting a keep-alive agent\n  http.get('http://localhost:3000', { agent }, (res) => {\n    res.on('data', (data) => {\n      // Do nothing\n    });\n  });\n}, 5000); // Sending request on 5s interval so it's easy to hit idle timeout",
        },
      },
      {
        type: 'paragraph',
        text: 'By marking a request whether it reused socket or not, we can do automatic error retry base on it.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import http from 'node:http';\nconst agent = new http.Agent({ keepAlive: true });\n\nfunction retriableRequest() {\n  const req = http\n    .get('http://localhost:3000', { agent }, (res) => {\n      // ...\n    })\n    .on('error', (err) => {\n      // Check if retry is needed\n      if (req.reusedSocket && err.code === 'ECONNRESET') {\n        retriableRequest();\n      }\n    });\n}\n\nretriableRequest();",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.setHeader(name, value)',
      },
      {
        type: 'list',
        ordered: false,
        items: ['name <string>', 'value <any>'],
      },
      {
        type: 'paragraph',
        text: 'Sets a single header value for headers object. If this header already exists in the to-be-sent headers, its value will be replaced. Use an array of strings here to send multiple headers with the same name. Non-string values will be stored without modification. Therefore, request.getHeader() may return non-string values. However, the non-string values will be converted to strings for network transmission.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "request.setHeader('Content-Type', 'application/json');",
        },
      },
      {
        type: 'paragraph',
        text: 'or',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "request.setHeader('Cookie', ['type=ninja', 'language=javascript']);",
        },
      },
      {
        type: 'paragraph',
        text: 'When the value is a string an exception will be thrown if it contains characters outside the latin1 encoding.',
      },
      {
        type: 'paragraph',
        text: 'If you need to pass UTF-8 characters in the value please encode the value using the RFC 8187 standard.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const filename = 'Rock 🎵.txt';\nrequest.setHeader('Content-Disposition', `attachment; filename*=utf-8''${encodeURIComponent(filename)}`);",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.setNoDelay([noDelay])',
      },
      {
        type: 'list',
        ordered: false,
        items: ['noDelay <boolean>'],
      },
      {
        type: 'paragraph',
        text: 'Once a socket is assigned to this request and is connected socket.setNoDelay() will be called.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.setSocketKeepAlive([enable][, initialDelay])',
      },
      {
        type: 'list',
        ordered: false,
        items: ['enable <boolean>', 'initialDelay <number>'],
      },
      {
        type: 'paragraph',
        text: 'Once a socket is assigned to this request and is connected socket.setKeepAlive() will be called.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.setTimeout(timeout[, callback])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'timeout <number> Milliseconds before a request times out.',
          "callback <Function> Optional function to be called when a timeout occurs. Same as binding to the 'timeout' event.",
          'Returns: <http.ClientRequest>',
        ],
      },
      {
        type: 'paragraph',
        text: 'Once a socket is assigned to this request and is connected socket.setTimeout() will be called.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.socket',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <stream.Duplex>'],
      },
      {
        type: 'paragraph',
        text: "Reference to the underlying socket. Usually users will not want to access this property. In particular, the socket will not emit 'readable' events because of how the protocol parser attaches to the socket.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import http from 'node:http';\nconst options = {\n  host: 'www.google.com',\n};\nconst req = http.get(options);\nreq.end();\nreq.once('response', (res) => {\n  const ip = req.socket.localAddress;\n  const port = req.socket.localPort;\n  console.log(`Your IP address is ${ip} and your source port is ${port}.`);\n  // Consume response object\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'This property is guaranteed to be an instance of the <net.Socket> class, a subclass of <stream.Duplex>, unless the user specified a socket type other than <net.Socket>.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.uncork()',
      },
      {
        type: 'paragraph',
        text: 'See writable.uncork().',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.writableEnded',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <boolean>'],
      },
      {
        type: 'paragraph',
        text: 'Is true after request.end() has been called. This property does not indicate whether the data has been flushed, for this use request.writableFinished instead.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.writableFinished',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <boolean>'],
      },
      {
        type: 'paragraph',
        text: "Is true if all data has been flushed to the underlying system, immediately before the 'finish' event is emitted.",
      },
      {
        type: 'subheading',
        level: 4,
        text: 'request.write(chunk[, encoding][, callback])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'chunk <string> | <Buffer> | <Uint8Array>',
          'encoding <string>',
          'callback <Function>',
          'Returns: <boolean>',
        ],
      },
      {
        type: 'paragraph',
        text: 'Sends a chunk of the body. This method can be called multiple times. If no Content-Length is set, data will automatically be encoded in HTTP Chunked transfer encoding, so that server knows when the data ends. The Transfer-Encoding: chunked header is added. Calling request.end() is necessary to finish sending the request.',
      },
      {
        type: 'paragraph',
        text: "The encoding argument is optional and only applies when chunk is a string. Defaults to 'utf8'.",
      },
      {
        type: 'paragraph',
        text: 'The callback argument is optional and will be called when this chunk of data is flushed, but only if the chunk is non-empty.',
      },
      {
        type: 'paragraph',
        text: "Returns true if the entire data was flushed successfully to the kernel buffer. Returns false if all or part of the data was queued in user memory. 'drain' will be emitted when the buffer is free again.",
      },
      {
        type: 'paragraph',
        text: 'When write function is called with empty string or buffer, it does nothing and waits for more input.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
