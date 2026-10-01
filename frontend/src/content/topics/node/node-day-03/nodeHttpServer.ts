import type { ContentTopic } from '../../../types';

export const nodehttpserverTopics = {
  nodehttpserver: {
    id: 'nodehttpserver',
    heading: 'Class: http.Server',
    blocks: [
      {
        type: 'list',
        ordered: false,
        items: ['Extends: <net.Server>'],
      },
      {
        type: 'subheading',
        level: 4,
        text: "Event: 'checkContinue'",
      },
      {
        type: 'list',
        ordered: false,
        items: ['request <http.IncomingMessage>', 'response <http.ServerResponse>'],
      },
      {
        type: 'paragraph',
        text: 'Emitted each time a request with an HTTP Expect: 100-continue is received. If this event is not listened for, the server will automatically respond with a 100 Continue as appropriate.',
      },
      {
        type: 'paragraph',
        text: 'Handling this event involves calling response.writeContinue() if the client should continue to send the request body, or generating an appropriate HTTP response (e.g. 400 Bad Request) if the client should not continue to send the request body.',
      },
      {
        type: 'paragraph',
        text: "When this event is emitted and handled, the 'request' event will not be emitted.",
      },
      {
        type: 'subheading',
        level: 4,
        text: "Event: 'checkExpectation'",
      },
      {
        type: 'list',
        ordered: false,
        items: ['request <http.IncomingMessage>', 'response <http.ServerResponse>'],
      },
      {
        type: 'paragraph',
        text: 'Emitted each time a request with an HTTP Expect header is received, where the value is not 100-continue. If this event is not listened for, the server will automatically respond with a 417 Expectation Failed as appropriate.',
      },
      {
        type: 'paragraph',
        text: "When this event is emitted and handled, the 'request' event will not be emitted.",
      },
      {
        type: 'subheading',
        level: 4,
        text: "Event: 'clientError'",
      },
      {
        type: 'list',
        ordered: false,
        items: ['exception <Error>', 'socket <stream.Duplex>'],
      },
      {
        type: 'paragraph',
        text: "If a client connection emits an 'error' event, it will be forwarded here. Listener of this event is responsible for closing/destroying the underlying socket. For example, one may wish to more gracefully close the socket with a custom HTTP response instead of abruptly severing the connection. The socket must be closed or destroyed before the listener ends.",
      },
      {
        type: 'paragraph',
        text: 'This event is guaranteed to be passed an instance of the <net.Socket> class, a subclass of <stream.Duplex>, unless the user specifies a socket type other than <net.Socket>.',
      },
      {
        type: 'paragraph',
        text: "Default behavior is to try close the socket with an HTTP '400 Bad Request', or an HTTP '431 Request Header Fields Too Large' in the case of an HPE_HEADER_OVERFLOW error. If the socket is not writable or headers of the current attached http.ServerResponse has been sent, it is immediately destroyed.",
      },
      {
        type: 'paragraph',
        text: 'socket is the net.Socket object that the error originated from.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import http from 'node:http';\n\nconst server = http.createServer((req, res) => {\n  res.end();\n});\nserver.on('clientError', (err, socket) => {\n  socket.end('HTTP/1.1 400 Bad Request\\r\\n\\r\\n');\n});\nserver.listen(8000);",
        },
      },
      {
        type: 'paragraph',
        text: "When the 'clientError' event occurs, there is no request or response object, so any HTTP response sent, including response headers and payload, must be written directly to the socket object. Care must be taken to ensure the response is a properly formatted HTTP response message.",
      },
      {
        type: 'paragraph',
        text: 'err is an instance of Error with two extra columns:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'bytesParsed: the bytes count of request packet that Node.js may have parsed correctly;',
          'rawPacket: the raw packet of current request.',
        ],
      },
      {
        type: 'paragraph',
        text: 'In some cases, the client has already received the response and/or the socket has already been destroyed, like in case of ECONNRESET errors. Before trying to send data to the socket, it is better to check that it is still writable.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "server.on('clientError', (err, socket) => {\n  if (err.code === 'ECONNRESET' || !socket.writable) {\n    return;\n  }\n\n  socket.end('HTTP/1.1 400 Bad Request\\r\\n\\r\\n');\n});",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: "Event: 'close'",
      },
      {
        type: 'paragraph',
        text: 'Emitted when the server closes.',
      },
      {
        type: 'subheading',
        level: 4,
        text: "Event: 'connect'",
      },
      {
        type: 'list',
        ordered: false,
        items: [
          "request <http.IncomingMessage> Arguments for the HTTP request, as it is in the 'request' event",
          'socket <stream.Duplex> Network socket between the server and client',
          'head <Buffer> The first packet of the tunneling stream (may be empty)',
        ],
      },
      {
        type: 'paragraph',
        text: 'Emitted each time a client requests an HTTP CONNECT method. If this event is not listened for, then clients requesting a CONNECT method will have their connections closed.',
      },
      {
        type: 'paragraph',
        text: 'This event is guaranteed to be passed an instance of the <net.Socket> class, a subclass of <stream.Duplex>, unless the user specifies a socket type other than <net.Socket>.',
      },
      {
        type: 'paragraph',
        text: "After this event is emitted, the request's socket will not have a 'data' event listener, meaning it will need to be bound in order to handle data sent to the server on that socket.",
      },
      {
        type: 'subheading',
        level: 4,
        text: "Event: 'connection'",
      },
      {
        type: 'list',
        ordered: false,
        items: ['socket <stream.Duplex>'],
      },
      {
        type: 'paragraph',
        text: "This event is emitted when a new TCP stream is established. socket is typically an object of type net.Socket. Usually users will not want to access this event. In particular, the socket will not emit 'readable' events because of how the protocol parser attaches to the socket. The socket can also be accessed at request.socket.",
      },
      {
        type: 'paragraph',
        text: 'This event can also be explicitly emitted by users to inject connections into the HTTP server. In that case, any Duplex stream can be passed.',
      },
      {
        type: 'paragraph',
        text: 'If socket.setTimeout() is called here, the timeout will be replaced with server.keepAliveTimeout when the socket has served a request (if server.keepAliveTimeout is non-zero).',
      },
      {
        type: 'paragraph',
        text: 'This event is guaranteed to be passed an instance of the <net.Socket> class, a subclass of <stream.Duplex>, unless the user specifies a socket type other than <net.Socket>.',
      },
      {
        type: 'subheading',
        level: 4,
        text: "Event: 'dropRequest'",
      },
      {
        type: 'list',
        ordered: false,
        items: [
          "request <http.IncomingMessage> Arguments for the HTTP request, as it is in the 'request' event",
          'socket <stream.Duplex> Network socket between the server and client',
        ],
      },
      {
        type: 'paragraph',
        text: "When the number of requests on a socket reaches the threshold of server.maxRequestsPerSocket, the server will drop new requests and emit 'dropRequest' event instead, then send 503 to client.",
      },
      {
        type: 'subheading',
        level: 4,
        text: "Event: 'request'",
      },
      {
        type: 'list',
        ordered: false,
        items: ['request <http.IncomingMessage>', 'response <http.ServerResponse>'],
      },
      {
        type: 'paragraph',
        text: 'Emitted each time there is a request. There may be multiple requests per connection (in the case of HTTP Keep-Alive connections).',
      },
      {
        type: 'subheading',
        level: 4,
        text: "Event: 'upgrade'",
      },
      {
        type: 'list',
        ordered: false,
        items: [
          "request <http.IncomingMessage> Arguments for the HTTP request, as it is in the 'request' event",
          'stream <stream.Duplex> The upgraded stream between the server and client',
          'head <Buffer> The first packet of the upgraded stream (may be empty)',
        ],
      },
      {
        type: 'paragraph',
        text: "Emitted each time a client's HTTP upgrade request is accepted. By default all HTTP upgrade requests are ignored (i.e. only regular 'request' events are emitted, sticking with the normal HTTP request/response flow) unless you listen to this event, in which case they are all accepted (i.e. the 'upgrade' event is emitted instead, and future communication must handled directly through the raw stream). You can control this more precisely by using the server shouldUpgradeCallback option.",
      },
      {
        type: 'paragraph',
        text: 'Listening to this event is optional and clients cannot insist on a protocol change.',
      },
      {
        type: 'paragraph',
        text: 'If an upgrade is accepted by shouldUpgradeCallback but no event handler is registered then the socket will be destroyed, resulting in an immediate connection closure for the client.',
      },
      {
        type: 'paragraph',
        text: "In the uncommon case that the incoming request has a body, this body will be parsed as normal, separate to the upgrade stream, and the raw stream data will only begin after it has completed. To ensure that reading from the stream isn't blocked by waiting for the request body to be read, any reads on the stream will start the request body flowing automatically. If you want to read the request body, ensure that you do so (i.e. you attach 'data' listeners) before starting to read from the upgraded stream.",
      },
      {
        type: 'paragraph',
        text: 'The stream argument will typically be the <net.Socket> instance used by the request, but in some cases (such as with a request body) it may be a duplex stream. If required, you can access the raw connection underlying the request via request.socket, which is guaranteed to be an instance of <net.Socket> unless the user specified another socket type.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'server.close([callback])',
      },
      {
        type: 'list',
        ordered: false,
        items: ['callback <Function>'],
      },
      {
        type: 'paragraph',
        text: 'Stops the server from accepting new connections and closes all connections connected to this server which are not sending a request or waiting for a response. See net.Server.close().',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const http = require('node:http');\n\nconst server = http.createServer({ keepAliveTimeout: 60000 }, (req, res) => {\n  res.writeHead(200, { 'Content-Type': 'application/json' });\n  res.end(JSON.stringify({\n    data: 'Hello World!',\n  }));\n});\n\nserver.listen(8000);\n// Close the server after 10 seconds\nsetTimeout(() => {\n  server.close(() => {\n    console.log('server on port 8000 closed successfully');\n  });\n}, 10000);",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'server.closeAllConnections()',
      },
      {
        type: 'paragraph',
        text: 'Closes all established HTTP(S) connections connected to this server, including active connections connected to this server which are sending a request or waiting for a response. This does not destroy sockets upgraded to a different protocol, such as WebSocket or HTTP/2.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const http = require('node:http');\n\nconst server = http.createServer({ keepAliveTimeout: 60000 }, (req, res) => {\n  res.writeHead(200, { 'Content-Type': 'application/json' });\n  res.end(JSON.stringify({\n    data: 'Hello World!',\n  }));\n});\n\nserver.listen(8000);\n// Close the server after 10 seconds\nsetTimeout(() => {\n  server.close(() => {\n    console.log('server on port 8000 closed successfully');\n  });\n  // Closes all connections, ensuring the server closes successfully\n  server.closeAllConnections();\n}, 10000);",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'server.closeIdleConnections()',
      },
      {
        type: 'paragraph',
        text: 'Closes all connections connected to this server which are not sending a request or waiting for a response.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const http = require('node:http');\n\nconst server = http.createServer({ keepAliveTimeout: 60000 }, (req, res) => {\n  res.writeHead(200, { 'Content-Type': 'application/json' });\n  res.end(JSON.stringify({\n    data: 'Hello World!',\n  }));\n});\n\nserver.listen(8000);\n// Close the server after 10 seconds\nsetTimeout(() => {\n  server.close(() => {\n    console.log('server on port 8000 closed successfully');\n  });\n  // Closes idle connections, such as keep-alive connections. Server will close\n  // once remaining active connections are terminated\n  server.closeIdleConnections();\n}, 10000);",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'server.headersTimeout',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <number> Default: The minimum between server.requestTimeout or 60000.'],
      },
      {
        type: 'paragraph',
        text: 'Limit the amount of time the parser will wait to receive the complete HTTP headers.',
      },
      {
        type: 'paragraph',
        text: 'If the timeout expires, the server responds with status 408 without forwarding the request to the request listener and then closes the connection.',
      },
      {
        type: 'paragraph',
        text: 'It must be set to a non-zero value (e.g. 120 seconds) to protect against potential Denial-of-Service attacks in case the server is deployed without a reverse proxy in front.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'server.listen()',
      },
      {
        type: 'paragraph',
        text: 'Starts the HTTP server listening for connections. This method is identical to server.listen() from net.Server.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'server.listening',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Type: <boolean> Indicates whether or not the server is listening for connections.',
        ],
      },
      {
        type: 'subheading',
        level: 4,
        text: 'server.maxHeadersCount',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <number> Default: 1000'],
      },
      {
        type: 'paragraph',
        text: 'Limits maximum incoming headers count. If set to 0, no limit will be applied.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'server.requestTimeout',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <number> Default: 300000'],
      },
      {
        type: 'paragraph',
        text: 'Sets the timeout value in milliseconds for receiving the entire request from the client.',
      },
      {
        type: 'paragraph',
        text: 'If the timeout expires, the server responds with status 408 without forwarding the request to the request listener and then closes the connection.',
      },
      {
        type: 'paragraph',
        text: 'It must be set to a non-zero value (e.g. 120 seconds) to protect against potential Denial-of-Service attacks in case the server is deployed without a reverse proxy in front.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'server.setTimeout([msecs][, callback])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'msecs <number> Default: 0 (no timeout)',
          'callback <Function>',
          'Returns: <http.Server>',
        ],
      },
      {
        type: 'paragraph',
        text: "Sets the timeout value for sockets, and emits a 'timeout' event on the Server object, passing the socket as an argument, if a timeout occurs.",
      },
      {
        type: 'paragraph',
        text: "If there is a 'timeout' event listener on the Server object, then it will be called with the timed-out socket as an argument.",
      },
      {
        type: 'paragraph',
        text: "By default, the Server does not timeout sockets. However, if a callback is assigned to the Server's 'timeout' event, timeouts must be handled explicitly.",
      },
      {
        type: 'subheading',
        level: 4,
        text: 'server.maxRequestsPerSocket',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <number> Requests per socket. Default: 0 (no limit)'],
      },
      {
        type: 'paragraph',
        text: 'The maximum number of requests socket can handle before closing keep alive connection.',
      },
      {
        type: 'paragraph',
        text: 'A value of 0 will disable the limit.',
      },
      {
        type: 'paragraph',
        text: 'When the limit is reached it will set the Connection header value to close, but will not actually close the connection, subsequent requests sent after the limit is reached will get 503 Service Unavailable as a response.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'server.timeout',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <number> Timeout in milliseconds. Default: 0 (no timeout)'],
      },
      {
        type: 'paragraph',
        text: 'The number of milliseconds of inactivity before a socket is presumed to have timed out.',
      },
      {
        type: 'paragraph',
        text: 'A value of 0 will disable the timeout behavior on incoming connections.',
      },
      {
        type: 'paragraph',
        text: 'The socket timeout logic is set up on connection, so changing this value only affects new connections to the server, not any existing connections.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'server.keepAliveTimeout',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <number> Timeout in milliseconds. Default: 5000 (5 seconds).'],
      },
      {
        type: 'paragraph',
        text: 'The number of milliseconds of inactivity a server needs to wait for additional incoming data, after it has finished writing the last response, before a socket will be destroyed.',
      },
      {
        type: 'paragraph',
        text: 'This timeout value is combined with the server.keepAliveTimeoutBuffer option to determine the actual socket timeout, calculated as: socketTimeout = keepAliveTimeout + keepAliveTimeoutBuffer If the server receives new data before the keep-alive timeout has fired, it will reset the regular inactivity timeout, i.e., server.timeout.',
      },
      {
        type: 'paragraph',
        text: 'A value of 0 will disable the keep-alive timeout behavior on incoming connections. A value of 0 makes the HTTP server behave similarly to Node.js versions prior to 8.0.0, which did not have a keep-alive timeout.',
      },
      {
        type: 'paragraph',
        text: 'The socket timeout logic is set up on connection, so changing this value only affects new connections to the server, not any existing connections.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'server.keepAliveTimeoutBuffer',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <number> Timeout in milliseconds. Default: 1000 (1 second).'],
      },
      {
        type: 'paragraph',
        text: 'An additional buffer time added to the server.keepAliveTimeout to extend the internal socket timeout.',
      },
      {
        type: 'paragraph',
        text: 'This buffer helps reduce connection reset (ECONNRESET) errors by increasing the socket timeout slightly beyond the advertised keep-alive timeout.',
      },
      {
        type: 'paragraph',
        text: 'This option applies only to new incoming connections.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'server[Symbol.asyncDispose]()',
      },
      {
        type: 'paragraph',
        text: 'Calls server.close() and returns a promise that fulfills when the server has closed.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
