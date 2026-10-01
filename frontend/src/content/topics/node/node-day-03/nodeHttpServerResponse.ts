import type { ContentTopic } from '../../../types';

export const nodehttpserverresponseTopics = {
  nodehttpserverresponse: {
    id: 'nodehttpserverresponse',
    heading: 'Class: http.ServerResponse',
    blocks: [
      {
        type: 'list',
        ordered: false,
        items: ['Extends: <http.OutgoingMessage>'],
      },
      {
        type: 'paragraph',
        text: "This object is created internally by an HTTP server, not by the user. It is passed as the second parameter to the 'request' event.",
      },
      {
        type: 'subheading',
        level: 4,
        text: "Event: 'close'",
      },
      {
        type: 'paragraph',
        text: 'Indicates that the response is completed, or its underlying connection was terminated prematurely (before the response completion).',
      },
      {
        type: 'subheading',
        level: 4,
        text: "Event: 'finish'",
      },
      {
        type: 'paragraph',
        text: 'Emitted when the response has been sent. More specifically, this event is emitted when the last segment of the response headers and body have been handed off to the operating system for transmission over the network. It does not imply that the client has received anything yet.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.addTrailers(headers)',
      },
      {
        type: 'list',
        ordered: false,
        items: ['headers <Object>'],
      },
      {
        type: 'paragraph',
        text: 'This method adds HTTP trailing headers (a header but at the end of the message) to the response.',
      },
      {
        type: 'paragraph',
        text: 'Trailers will only be emitted if chunked encoding is used for the response; if it is not (e.g. if the request was HTTP/1.0), they will be silently discarded.',
      },
      {
        type: 'paragraph',
        text: 'HTTP requires the Trailer header to be sent in order to emit trailers, with a list of the header fields in its value. E.g.,',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "response.writeHead(200, { 'Content-Type': 'text/plain',\n                          'Trailer': 'Content-MD5' });\nresponse.write(fileData);\nresponse.addTrailers({ 'Content-MD5': '7895bf4b8828b55ceaf47747b4bca667' });\nresponse.end();",
        },
      },
      {
        type: 'paragraph',
        text: 'Attempting to set a header field name or value that contains invalid characters will result in a TypeError being thrown.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.connection',
      },
      {
        type: 'paragraph',
        text: 'Stability: 0 - Deprecated. Use response.socket.',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <stream.Duplex>'],
      },
      {
        type: 'paragraph',
        text: 'See response.socket.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.cork()',
      },
      {
        type: 'paragraph',
        text: 'See writable.cork().',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.end([data[, encoding]][, callback])',
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
        text: 'This method signals to the server that all of the response headers and body have been sent; that server should consider this message complete. The method, response.end(), MUST be called on each response.',
      },
      {
        type: 'paragraph',
        text: 'If data is specified, it is similar in effect to calling response.write(data, encoding) followed by response.end(callback).',
      },
      {
        type: 'paragraph',
        text: 'If callback is specified, it will be called when the response stream is finished.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.finished',
      },
      {
        type: 'paragraph',
        text: 'Stability: 0 - Deprecated. Use response.writableEnded.',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <boolean>'],
      },
      {
        type: 'paragraph',
        text: 'The response.finished property will be true if response.end() has been called.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.flushHeaders()',
      },
      {
        type: 'paragraph',
        text: 'Flushes the response headers. See also: request.flushHeaders().',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.getHeader(name)',
      },
      {
        type: 'list',
        ordered: false,
        items: ['name <string>', 'Returns: <number> | <string> | <string>[] | <undefined>'],
      },
      {
        type: 'paragraph',
        text: "Reads out a header that's already been queued but not sent to the client. The name is case-insensitive. The type of the return value depends on the arguments provided to response.setHeader().",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "response.setHeader('Content-Type', 'text/html');\nresponse.setHeader('Content-Length', Buffer.byteLength(body));\nresponse.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);\nconst contentType = response.getHeader('content-type');\n// contentType is 'text/html'\nconst contentLength = response.getHeader('Content-Length');\n// contentLength is of type number\nconst setCookie = response.getHeader('set-cookie');\n// setCookie is of type string[]",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.getHeaderNames()',
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
          code: "response.setHeader('Foo', 'bar');\nresponse.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);\n\nconst headerNames = response.getHeaderNames();\n// headerNames === ['foo', 'set-cookie']",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.getHeaders()',
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
        text: 'The object returned by the response.getHeaders() method does not prototypically inherit from the JavaScript Object. This means that typical Object methods such as obj.toString(), obj.hasOwnProperty(), and others are not defined and will not work.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "response.setHeader('Foo', 'bar');\nresponse.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);\n\nconst headers = response.getHeaders();\n// headers === { foo: 'bar', 'set-cookie': ['foo=bar', 'bar=baz'] }",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.hasHeader(name)',
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
          code: "const hasContentType = response.hasHeader('content-type');",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.headersSent',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <boolean>'],
      },
      {
        type: 'paragraph',
        text: 'Boolean (read-only). True if headers were sent, false otherwise.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.removeHeader(name)',
      },
      {
        type: 'list',
        ordered: false,
        items: ['name <string>'],
      },
      {
        type: 'paragraph',
        text: "Removes a header that's queued for implicit sending.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "response.removeHeader('Content-Encoding');",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.req',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <http.IncomingMessage>'],
      },
      {
        type: 'paragraph',
        text: 'A reference to the original HTTP request object.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.sendDate',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <boolean>'],
      },
      {
        type: 'paragraph',
        text: 'When true, the Date header will be automatically generated and sent in the response if it is not already present in the headers. Defaults to true.',
      },
      {
        type: 'paragraph',
        text: 'This should only be disabled for testing; the Date header is required in most HTTP responses (see RFC 9110 Section 6.6.1 for details).',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.setHeader(name, value)',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'name <string>',
          'value <number> | <string> | <string>[]',
          'Returns: <http.ServerResponse>',
        ],
      },
      {
        type: 'paragraph',
        text: 'Returns the response object.',
      },
      {
        type: 'paragraph',
        text: 'Sets a single header value for implicit headers. If this header already exists in the to-be-sent headers, its value will be replaced. Use an array of strings here to send multiple headers with the same name. Non-string values will be stored without modification. Therefore, response.getHeader() may return non-string values. However, the non-string values will be converted to strings for network transmission. The same response object is returned to the caller, to enable call chaining.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "response.setHeader('Content-Type', 'text/html');",
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
          code: "response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);",
        },
      },
      {
        type: 'paragraph',
        text: 'Attempting to set a header field name or value that contains invalid characters will result in a TypeError being thrown.',
      },
      {
        type: 'paragraph',
        text: 'When headers have been set with response.setHeader(), they will be merged with any headers passed to response.writeHead(), with the headers passed to response.writeHead() given precedence.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// Returns content-type = text/plain\nconst server = http.createServer((req, res) => {\n  res.setHeader('Content-Type', 'text/html');\n  res.setHeader('X-Foo', 'bar');\n  res.writeHead(200, { 'Content-Type': 'text/plain' });\n  res.end('ok');\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'If response.writeHead() method is called and this method has not been called, it will directly write the supplied header values onto the network channel without caching internally, and the response.getHeader() on the header will not yield the expected result. If progressive population of headers is desired with potential future retrieval and modification, use response.setHeader() instead of response.writeHead().',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.setTimeout(msecs[, callback])',
      },
      {
        type: 'list',
        ordered: false,
        items: ['msecs <number>', 'callback <Function>', 'Returns: <http.ServerResponse>'],
      },
      {
        type: 'paragraph',
        text: "Sets the Socket's timeout value to msecs. If a callback is provided, then it is added as a listener on the 'timeout' event on the response object.",
      },
      {
        type: 'paragraph',
        text: "If no 'timeout' listener is added to the request, the response, or the server, then sockets are destroyed when they time out. If a handler is assigned to the request, the response, or the server's 'timeout' events, timed out sockets must be handled explicitly.",
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.socket',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <stream.Duplex>'],
      },
      {
        type: 'paragraph',
        text: "Reference to the underlying socket. Usually users will not want to access this property. In particular, the socket will not emit 'readable' events because of how the protocol parser attaches to the socket. After response.end(), the property is nulled.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import http from 'node:http';\nconst server = http.createServer((req, res) => {\n  const ip = res.socket.remoteAddress;\n  const port = res.socket.remotePort;\n  res.end(`Your IP address is ${ip} and your source port is ${port}.`);\n}).listen(3000);",
        },
      },
      {
        type: 'paragraph',
        text: 'This property is guaranteed to be an instance of the <net.Socket> class, a subclass of <stream.Duplex>, unless the user specified a socket type other than <net.Socket>.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.statusCode',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <number> Default: 200'],
      },
      {
        type: 'paragraph',
        text: 'When using implicit headers (not calling response.writeHead() explicitly), this property controls the status code that will be sent to the client when the headers get flushed.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'response.statusCode = 404;',
        },
      },
      {
        type: 'paragraph',
        text: 'After response header was sent to the client, this property indicates the status code which was sent out.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.statusMessage',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <string>'],
      },
      {
        type: 'paragraph',
        text: 'When using implicit headers (not calling response.writeHead() explicitly), this property controls the status message that will be sent to the client when the headers get flushed. If this is left as undefined then the standard message for the status code will be used.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "response.statusMessage = 'Not found';",
        },
      },
      {
        type: 'paragraph',
        text: 'After response header was sent to the client, this property indicates the status message which was sent out.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.strictContentLength',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <boolean> Default: false'],
      },
      {
        type: 'paragraph',
        text: "If set to true, Node.js will check whether the Content-Length header value and the size of the body, in bytes, are equal. Mismatching the Content-Length header value will result in an Error being thrown, identified by code: 'ERR_HTTP_CONTENT_LENGTH_MISMATCH'.",
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.uncork()',
      },
      {
        type: 'paragraph',
        text: 'See writable.uncork().',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.writableEnded',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <boolean>'],
      },
      {
        type: 'paragraph',
        text: 'Is true after response.end() has been called. This property does not indicate whether the data has been flushed, for this use response.writableFinished instead.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.writableFinished',
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
        text: 'response.write(chunk[, encoding][, callback])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'chunk <string> | <Buffer> | <Uint8Array>',
          "encoding <string> Default: 'utf8'",
          'callback <Function>',
          'Returns: <boolean>',
        ],
      },
      {
        type: 'paragraph',
        text: 'If this method is called and response.writeHead() has not been called, it will switch to implicit header mode and flush the implicit headers.',
      },
      {
        type: 'paragraph',
        text: 'This sends a chunk of the response body. This method may be called multiple times to provide successive parts of the body.',
      },
      {
        type: 'paragraph',
        text: 'If rejectNonStandardBodyWrites is set to true in createServer then writing to the body is not allowed when the request method or response status do not support content. If an attempt is made to write to the body for a HEAD request or as part of a 204 or 304response, a synchronous Error with the code ERR_HTTP_BODY_NOT_ALLOWED is thrown.',
      },
      {
        type: 'paragraph',
        text: 'chunk can be a string or a buffer. If chunk is a string, the second parameter specifies how to encode it into a byte stream. callback will be called when this chunk of data is flushed.',
      },
      {
        type: 'paragraph',
        text: 'This is the raw HTTP body and has nothing to do with higher-level multi-part body encodings that may be used.',
      },
      {
        type: 'paragraph',
        text: 'The first time response.write() is called, it will send the buffered header information and the first chunk of the body to the client. The second time response.write() is called, Node.js assumes data will be streamed, and sends the new data separately. That is, the response is buffered up to the first chunk of the body.',
      },
      {
        type: 'paragraph',
        text: "Returns true if the entire data was flushed successfully to the kernel buffer. Returns false if all or part of the data was queued in user memory. 'drain' will be emitted when the buffer is free again.",
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.writeContinue()',
      },
      {
        type: 'paragraph',
        text: "Sends an HTTP/1.1 100 Continue message to the client, indicating that the request body should be sent. See the 'checkContinue' event on Server.",
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.writeEarlyHints(hints[, callback])',
      },
      {
        type: 'list',
        ordered: false,
        items: ['hints <Object>', 'callback <Function>'],
      },
      {
        type: 'paragraph',
        text: 'Sends an HTTP/1.1 103 Early Hints message to the client with a Link header, indicating that the user agent can preload/preconnect the linked resources. The hints is an object containing the values of headers to be sent with early hints message. The optional callback argument will be called when the response message has been written.',
      },
      {
        type: 'paragraph',
        text: 'Example',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const earlyHintsLink = '</styles.css>; rel=preload; as=style';\nresponse.writeEarlyHints({\n  'link': earlyHintsLink,\n});\n\nconst earlyHintsLinks = [\n  '</styles.css>; rel=preload; as=style',\n  '</scripts.js>; rel=preload; as=script',\n];\nresponse.writeEarlyHints({\n  'link': earlyHintsLinks,\n  'x-trace-id': 'id for diagnostics',\n});\n\nconst earlyHintsCallback = () => console.log('early hints message sent');\nresponse.writeEarlyHints({\n  'link': earlyHintsLinks,\n}, earlyHintsCallback);",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.writeHead(statusCode[, statusMessage][, headers])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'statusCode <number>',
          'statusMessage <string>',
          'headers <Object> | <Array>',
          'Returns: <http.ServerResponse>',
        ],
      },
      {
        type: 'paragraph',
        text: 'Sends a response header to the request. The status code is a 3-digit HTTP status code, like 404. The last argument, headers, are the response headers. Optionally one can give a human-readable statusMessage as the second argument.',
      },
      {
        type: 'paragraph',
        text: 'headers may be an Array where the keys and values are in the same list. It is not a list of tuples. So, the even-numbered offsets are key values, and the odd-numbered offsets are the associated values. The array is in the same format as request.rawHeaders.',
      },
      {
        type: 'paragraph',
        text: 'Returns a reference to the ServerResponse, so that calls can be chained.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const body = 'hello world';\nresponse\n  .writeHead(200, {\n    'Content-Length': Buffer.byteLength(body),\n    'Content-Type': 'text/plain',\n  })\n  .end(body);",
        },
      },
      {
        type: 'paragraph',
        text: 'This method must only be called once on a message and it must be called before response.end() is called.',
      },
      {
        type: 'paragraph',
        text: 'If response.write() or response.end() are called before calling this, the implicit/mutable headers will be calculated and call this function.',
      },
      {
        type: 'paragraph',
        text: 'When headers have been set with response.setHeader(), they will be merged with any headers passed to response.writeHead(), with the headers passed to response.writeHead() given precedence.',
      },
      {
        type: 'paragraph',
        text: 'If this method is called and response.setHeader() has not been called, it will directly write the supplied header values onto the network channel without caching internally, and the response.getHeader() on the header will not yield the expected result. If progressive population of headers is desired with potential future retrieval and modification, use response.setHeader() instead.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// Returns content-type = text/plain\nconst server = http.createServer((req, res) => {\n  res.setHeader('Content-Type', 'text/html');\n  res.setHeader('X-Foo', 'bar');\n  res.writeHead(200, { 'Content-Type': 'text/plain' });\n  res.end('ok');\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'Content-Length is read in bytes, not characters. Use Buffer.byteLength() to determine the length of the body in bytes. Node.js will check whether Content-Length and the length of the body which has been transmitted are equal or not.',
      },
      {
        type: 'paragraph',
        text: 'Attempting to set a header field name or value that contains invalid characters will result in a TypeError being thrown.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.writeInformation(statusCode[, headers][, callback])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          "statusCode <number> An HTTP 1xx informational status code, between 100 and 199 inclusive, excluding 101 (Switching Protocols) which is only available through the 'upgrade' event.",
          'headers <Object> | <Array> An optional set of headers to send with the informational response. Accepts the same shapes as response.writeHead().',
          'callback <Function> Optional, called once the message has been written to the socket.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Sends an arbitrary HTTP/1.1 1xx informational response to the client. This is a generic equivalent of response.writeContinue(), response.writeProcessing() and response.writeEarlyHints(), and can be called multiple times before the final response. After the final response headers have been sent (via response.writeHead() or an implicit header), calling this method throws ERR_HTTP_HEADERS_SENT.',
      },
      {
        type: 'paragraph',
        text: "Clients receive these responses via the 'information' event on http.ClientRequest.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "response.writeInformation(110, { 'X-Progress': '50%' });",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'response.writeProcessing()',
      },
      {
        type: 'paragraph',
        text: 'Sends an HTTP/1.1 102 Processing message to the client, indicating that the request body should be sent.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
