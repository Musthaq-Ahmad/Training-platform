### Promises API

The `fs/promises` API provides asynchronous file system methods that return promises.

The promise APIs use the underlying Node.js threadpool to perform file system operations off the event loop thread. These operations are not synchronized or threadsafe. Care must be taken when performing multiple concurrent modifications on the same file or data corruption may occur.

#### Class: `FileHandle`

A [`<FileHandle>`](fs.html#class-filehandle) object is an object wrapper for a numeric file descriptor.

Instances of the [`<FileHandle>`](fs.html#class-filehandle) object are created by the `fsPromises.open()` method.

All [`<FileHandle>`](fs.html#class-filehandle) objects are [`<EventEmitter>`](events.html#class-eventemitter)s.

If a [`<FileHandle>`](fs.html#class-filehandle) is not closed using the `filehandle.close()` method, it will try to automatically close the file descriptor and emit a process warning, helping to prevent memory leaks. Please do not rely on this behavior because it can be unreliable and the file may not be closed. Instead, always explicitly close [`<FileHandle>`](fs.html#class-filehandle)s. Node.js may change this behavior in the future.

##### Event: `'close'`

The `'close'` event is emitted when the [`<FileHandle>`](fs.html#class-filehandle) has been closed and can no longer be used.

##### `filehandle.appendFile(data[, options])`

- `data` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`<AsyncIterable>`](https://tc39.github.io/ecma262/#sec-asynciterable-interface) | [`<Iterable>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol)
- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)
  - `encoding` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<null>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#null_type) **Default:** `'utf8'`
  - `signal` [`<AbortSignal>`](globals.html#class-abortsignal) | [`<undefined>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#undefined_type) allows aborting an in-progress writeFile. **Default:** `undefined`
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Alias of [`filehandle.writeFile()`](#filehandlewritefiledata-options).

When operating on file handles, the mode cannot be changed from what it was set to with [`fsPromises.open()`](#fspromisesopenpath-flags-mode). Therefore, this is equivalent to [`filehandle.writeFile()`](#filehandlewritefiledata-options).

##### `filehandle.chmod(mode)`

- `mode` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) the file mode bit mask.
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Modifies the permissions on the file. See [`chmod(2)`](http://man7.org/linux/man-pages/man2/chmod.2.html).

##### `filehandle.chown(uid, gid)`

- `uid` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) The file's new owner's user id.
- `gid` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) The file's new group's group id.
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Changes the ownership of the file. A wrapper for [`chown(2)`](http://man7.org/linux/man-pages/man2/chown.2.html).

##### `filehandle.close()`

- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Closes the file handle after waiting for any pending operation on the handle to complete.

```js
import { open } from 'node:fs/promises';

let filehandle;
try {
  filehandle = await open('thefile.txt', 'r');
} finally {
  await filehandle?.close();
}
```

##### `filehandle.createReadStream([options])`

- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `encoding` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) **Default:** `null`
  - `autoClose` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) **Default:** `true`
  - `emitClose` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) **Default:** `true`
  - `start` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type)
  - `end` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) **Default:** `Infinity`
  - `highWaterMark` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) **Default:** `64 * 1024`
  - `signal` [`<AbortSignal>`](globals.html#class-abortsignal) | [`<undefined>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#undefined_type) **Default:** `undefined`
- Returns: [`<fs.ReadStream>`](fs.html#class-fsreadstream)

`options` can include `start` and `end` values to read a range of bytes from the file instead of the entire file. Both `start` and `end` are inclusive and start counting at 0, allowed values are in the \[0, [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)\] range. If `start` is omitted or `undefined`, `filehandle.createReadStream()` reads sequentially from the current file position. The `encoding` can be any one of those accepted by [`<Buffer>`](buffer.html#class-buffer).

If the `FileHandle` points to a character device that only supports blocking reads (such as keyboard or sound card), read operations do not finish until data is available. This can prevent the process from exiting and the stream from closing naturally.

By default, the stream will emit a `'close'` event after it has been destroyed. Set the `emitClose` option to `false` to change this behavior.

```js
import { open } from 'node:fs/promises';

const fd = await open('/dev/input/event0');
// Create a stream from some character device.
const stream = fd.createReadStream();
setTimeout(() => {
  stream.close(); // This may not close the stream.
  // Artificially marking end-of-stream, as if the underlying resource had
  // indicated end-of-file by itself, allows the stream to close.
  // This does not cancel pending read operations, and if there is such an
  // operation, the process may still not be able to exit successfully
  // until it finishes.
  stream.push(null);
  stream.read(0);
}, 100);
```

If `autoClose` is false, then the file descriptor won't be closed, even if there's an error. It is the application's responsibility to close it and make sure there's no file descriptor leak. If `autoClose` is set to true (default behavior), on `'error'` or `'end'` the file descriptor will be closed automatically.

An example to read the last 10 bytes of a file which is 100 bytes long:

```js
import { open } from 'node:fs/promises';

const fd = await open('sample.txt');
fd.createReadStream({ start: 90, end: 99 });
```

##### `filehandle.createWriteStream([options])`

- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `encoding` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) **Default:** `'utf8'`
  - `autoClose` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) **Default:** `true`
  - `emitClose` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) **Default:** `true`
  - `start` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type)
  - `highWaterMark` [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) **Default:** See [`stream.getDefaultHighWaterMark()`](stream.html#streamgetdefaulthighwatermarkobjectmode).
  - `flush` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) If `true`, the underlying file descriptor is flushed prior to closing it. **Default:** `false`.
- Returns: [`<fs.WriteStream>`](fs.html#class-fswritestream)

`options` may also include a `start` option to allow writing data at some position past the beginning of the file, allowed values are in the \[0, [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)\] range. Modifying a file rather than replacing it may require the `flags` `open` option to be set to `r+` rather than the default `r`. The `encoding` can be any one of those accepted by [`<Buffer>`](buffer.html#class-buffer).

If `autoClose` is set to true (default behavior) on `'error'` or `'finish'` the file descriptor will be closed automatically. If `autoClose` is false, then the file descriptor won't be closed, even if there's an error. It is the application's responsibility to close it and make sure there's no file descriptor leak.

By default, the stream will emit a `'close'` event after it has been destroyed. Set the `emitClose` option to `false` to change this behavior.

##### `filehandle.datasync()`

- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Forces all currently queued I/O operations associated with the file to the operating system's synchronized I/O completion state. Refer to the POSIX [`fdatasync(2)`](http://man7.org/linux/man-pages/man2/fdatasync.2.html) documentation for details.

Unlike `filehandle.sync` this method does not flush modified metadata.

##### `filehandle.fd`

- Type: [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) The numeric file descriptor managed by the [`<FileHandle>`](fs.html#class-filehandle) object.

##### `filehandle.pull([...transforms][, options])`

Stability: 1 - Experimental

- `...transforms` [`<Function>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function) | [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) Optional transforms to apply via [`stream/iter pull()`](stream_iter.html#pullsource-transforms-options).
- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `signal` [`<AbortSignal>`](globals.html#class-abortsignal)
  - `autoClose` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) Close the file handle when the stream ends. **Default:** `false`.
  - `start` [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) Byte offset to begin reading from. When specified, reads use explicit positioning (`pread` semantics). **Default:** current file position.
  - `limit` [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) Maximum number of bytes to read before ending the iterator. Reads stop when `limit` bytes have been delivered or EOF is reached, whichever comes first. **Default:** read until EOF.
  - `chunkSize` [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) Size in bytes of the buffer allocated for each read operation. **Default:** `131072` (128 KB).
- Returns: [`<AsyncIterable>`](https://tc39.github.io/ecma262/#sec-asynciterable-interface) whose chunks fulfill with [`<Uint8Array>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\[\]

Return the file contents as an async iterable using the [`node:stream/iter`](stream_iter.html) pull model. Reads are performed in `chunkSize`\-byte chunks (default 128 KB). If transforms are provided, they are applied via [`stream/iter pull()`](stream_iter.html#pullsource-transforms-options).

The file handle is locked while the iterable is being consumed and unlocked when iteration completes, an error occurs, or the consumer breaks.

This function is only available when the `--experimental-stream-iter` flag is enabled.

```js
import { open } from 'node:fs/promises';
import { text } from 'node:stream/iter';
import { compressGzip } from 'node:zlib/iter';

const fh = await open('input.txt', 'r');

// Read as text
console.log(await text(fh.pull({ autoClose: true })));

// Read 1 KB starting at byte 100
const fh2 = await open('input.txt', 'r');
console.log(await text(fh2.pull({ start: 100, limit: 1024, autoClose: true })));

// Read with compression
const fh3 = await open('input.txt', 'r');
const compressed = fh3.pull(compressGzip(), { autoClose: true });
```

##### `filehandle.pullSync([...transforms][, options])`

Stability: 1 - Experimental

- `...transforms` [`<Function>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function) | [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) Optional transforms to apply via [`stream/iter pullSync()`](stream_iter.html#pullsyncsource-transforms).
- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `autoClose` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) Close the file handle when the stream ends. **Default:** `false`.
  - `start` [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) Byte offset to begin reading from. When specified, reads use explicit positioning. **Default:** current file position.
  - `limit` [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) Maximum number of bytes to read before ending the iterator. **Default:** read until EOF.
  - `chunkSize` [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) Size in bytes of the buffer allocated for each read operation. **Default:** `131072` (128 KB).
- Returns: [`<Iterable>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol) whose chunks return [`<Uint8Array>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\[\]

Synchronous counterpart of [`filehandle.pull()`](#filehandlepulltransforms-options). Returns a sync iterable that reads the file using synchronous I/O on the main thread. Reads are performed in `chunkSize`\-byte chunks (default 128 KB).

The file handle is locked while the iterable is being consumed. Unlike the async `pull()`, this method does not support `AbortSignal` since all operations are synchronous.

This function is only available when the `--experimental-stream-iter` flag is enabled.

```js
import { open } from 'node:fs/promises';
import { textSync, pipeToSync } from 'node:stream/iter';
import { compressGzipSync, decompressGzipSync } from 'node:zlib/iter';

const fh = await open('input.txt', 'r');

// Read as text (sync)
console.log(textSync(fh.pullSync({ autoClose: true })));

// Sync compress pipeline: file -> gzip -> file
const src = await open('input.txt', 'r');
const dst = await open('output.gz', 'w');
pipeToSync(src.pullSync(compressGzipSync(), { autoClose: true }), dst.writer({ autoClose: true }));
```

##### `filehandle.read(buffer, offset, length, position)`

- `buffer` [`<Buffer>`](buffer.html#class-buffer) | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView) A buffer that will be filled with the file data read.
- `offset` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) The location in the buffer at which to start filling. **Default:** `0`
- `length` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) The number of bytes to read. **Default:** `buffer.byteLength - offset`
- `position` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) | [`<bigint>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#bigint_type) | [`<null>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#null_type) The location where to begin reading data from the file. If `null` or `-1`, data will be read from the current file position, and the position will be updated. If `position` is a non-negative integer, the current file position will remain unchanged. **Default:** `null`
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills upon success with an object with two properties:
  - `bytesRead` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) The number of bytes read
  - `buffer` [`<Buffer>`](buffer.html#class-buffer) | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView) A reference to the passed in `buffer` argument.

Reads data from the file and stores that in the given buffer.

If the file is not modified concurrently, the end-of-file is reached when the number of bytes read is zero.

##### `filehandle.read([options])`

- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `buffer` [`<Buffer>`](buffer.html#class-buffer) | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView) A buffer that will be filled with the file data read. **Default:** `Buffer.alloc(16384)`
  - `offset` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) The location in the buffer at which to start filling. **Default:** `0`
  - `length` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) The number of bytes to read. **Default:** `buffer.byteLength - offset`
  - `position` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) | [`<bigint>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#bigint_type) | [`<null>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#null_type) The location where to begin reading data from the file. If `null` or `-1`, data will be read from the current file position, and the position will be updated. If `position` is a non-negative integer, the current file position will remain unchanged. **Default:**: `null`
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills upon success with an object with two properties:
  - `bytesRead` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) The number of bytes read
  - `buffer` [`<Buffer>`](buffer.html#class-buffer) | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView) A reference to the passed in `buffer` argument.

Reads data from the file and stores that in the given buffer.

If the file is not modified concurrently, the end-of-file is reached when the number of bytes read is zero.

##### `filehandle.read(buffer[, options])`

- `buffer` [`<Buffer>`](buffer.html#class-buffer) | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView) A buffer that will be filled with the file data read.
- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `offset` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) The location in the buffer at which to start filling. **Default:** `0`
  - `length` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) The number of bytes to read. **Default:** `buffer.byteLength - offset`
  - `position` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) | [`<bigint>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#bigint_type) | [`<null>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#null_type) The location where to begin reading data from the file. If `null` or `-1`, data will be read from the current file position, and the position will be updated. If `position` is a non-negative integer, the current file position will remain unchanged. **Default:**: `null`
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills upon success with an object with two properties:
  - `bytesRead` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) The number of bytes read
  - `buffer` [`<Buffer>`](buffer.html#class-buffer) | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView) A reference to the passed in `buffer` argument.

Reads data from the file and stores that in the given buffer.

If the file is not modified concurrently, the end-of-file is reached when the number of bytes read is zero.

##### `filehandle.readableWebStream([options])`

- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `autoClose` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) When true, causes the [`<FileHandle>`](fs.html#class-filehandle) to be closed when the stream is closed. **Default:** `false`
- Returns: [`<ReadableStream>`](webstreams.html#class-readablestream)

Returns a byte-oriented `ReadableStream` that may be used to read the file's contents.

An error will be thrown if this method is called more than once or is called after the `FileHandle` is closed or closing.

```js
import { open } from 'node:fs/promises';

const file = await open('./some/file/to/read');

for await (const chunk of file.readableWebStream()) console.log(chunk);

await file.close();
```

While the `ReadableStream` will read the file to completion, it will not close the `FileHandle` automatically. User code must still call the `fileHandle.close()` method unless the `autoClose` option is set to `true`.

##### `filehandle.readFile(options)`

- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)
  - `encoding` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<null>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#null_type) **Default:** `null`
  - `signal` [`<AbortSignal>`](globals.html#class-abortsignal) allows aborting an in-progress readFile
  - `buffer` [`<Buffer>`](buffer.html#class-buffer) | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`<Function>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function) A buffer to read into, or a function called with the file size that returns the buffer.
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills upon a successful read with the contents of the file. If no encoding is specified (using `options.encoding`), the data is returned as a [`<Buffer>`](buffer.html#class-buffer) object. Otherwise, the data will be a string.

Asynchronously reads the entire contents of a file.

If `options` is a string, then it specifies the `encoding`.

If `buffer` is provided and no encoding is specified, the returned [`<Buffer>`](buffer.html#class-buffer) is a view over the supplied buffer containing only the bytes read. If the supplied buffer is too small to contain the entire file, the operation will fail.

The [`<FileHandle>`](fs.html#class-filehandle) has to support reading.

If one or more `filehandle.read()` calls are made on a file handle and then a `filehandle.readFile()` call is made, the data will be read from the current position till the end of the file. It doesn't always read from the beginning of the file.

An example using the `buffer` option with a pre-allocated buffer:

```js
import { Buffer } from 'node:buffer';
import { open } from 'node:fs/promises';

const file = await open('./some/file/to/read');
try {
  const buf = Buffer.alloc(16384);
  const contents = await file.readFile({ buffer: buf });
  console.log(contents); // A view over `buf` containing only the bytes read
} finally {
  await file.close();
}
```

An example using the `buffer` option with a function returning a buffer:

```js
import { Buffer } from 'node:buffer';
import { open } from 'node:fs/promises';

const file = await open('./some/file/to/read');
try {
  const contents = await file.readFile({
    buffer: (size) => Buffer.alloc(size),
  });
  console.log(contents);
} finally {
  await file.close();
}
```

##### `filehandle.readLines([options])`

- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `encoding` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) **Default:** `null`
  - `autoClose` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) **Default:** `true`
  - `emitClose` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) **Default:** `true`
  - `start` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type)
  - `end` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) **Default:** `Infinity`
  - `highWaterMark` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) **Default:** `64 * 1024`
- Returns: [`<readline.InterfaceConstructor>`](readline.html#class-readlineinterfaceconstructor)

Convenience method to create a `readline` interface and stream over the file. See [`filehandle.createReadStream()`](#filehandlecreatereadstreamoptions) for the options.

```js
import { open } from 'node:fs/promises';

const file = await open('./some/file/to/read');

for await (const line of file.readLines()) {
  console.log(line);
}
```

##### `filehandle.readv(buffers[, position])`

- `buffers` [`<Buffer>`](buffer.html#class-buffer)\[\] | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)\[\] | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView)\[\]
- `position` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) | [`<null>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#null_type) The offset from the beginning of the file where the data should be read from. If `position` is not a `number`, the data will be read from the current position. **Default:** `null`
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills upon success an object containing two properties:
  - `bytesRead` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) the number of bytes read
  - `buffers` [`<Buffer>`](buffer.html#class-buffer)\[\] | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)\[\] | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView)\[\] property containing a reference to the `buffers` input.

Read from a file and write to an array of [`<ArrayBufferView>`](https://developer.mozilla.org/docs/Web/API/ArrayBufferView)s

##### `filehandle.stat([options])`

- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `bigint` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) Whether the numeric values in the returned [`<fs.Stats>`](fs.html#class-fsstats) object should be `bigint`. **Default:** `false`.
  - `signal` [`<AbortSignal>`](globals.html#class-abortsignal) An AbortSignal to cancel the operation. **Default:** `undefined`.
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with an [`<fs.Stats>`](fs.html#class-fsstats) for the file.

##### `filehandle.sync()`

- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Request that all data for the open file descriptor is flushed to the storage device. The specific implementation is operating system and device specific. Refer to the POSIX [`fsync(2)`](http://man7.org/linux/man-pages/man2/fsync.2.html) documentation for more detail.

##### `filehandle.truncate(len)`

- `len` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) **Default:** `0`
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Truncates the file.

If the file was larger than `len` bytes, only the first `len` bytes will be retained in the file.

The following example retains only the first four bytes of the file:

```js
import { open } from 'node:fs/promises';

let filehandle = null;
try {
  filehandle = await open('temp.txt', 'r+');
  await filehandle.truncate(4);
} finally {
  await filehandle?.close();
}
```

If the file previously was shorter than `len` bytes, it is extended, and the extended part is filled with null bytes (`'\0'`):

If `len` is negative then `0` will be used.

##### `filehandle.utimes(atime, mtime)`

- `atime` [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) | [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Date>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)
- `mtime` [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) | [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Date>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Change the file system timestamps of the object referenced by the [`<FileHandle>`](fs.html#class-filehandle) then fulfills the promise with no arguments upon success.

##### `filehandle.write(buffer, offset[, length[, position]])`

- `buffer` [`<Buffer>`](buffer.html#class-buffer) | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView)
- `offset` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) The start position from within `buffer` where the data to write begins.
- `length` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) The number of bytes from `buffer` to write. **Default:** `buffer.byteLength - offset`
- `position` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) | [`<null>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#null_type) The offset from the beginning of the file where the data from `buffer` should be written. If `position` is not a `number`, the data will be written at the current position. See the POSIX [`pwrite(2)`](http://man7.org/linux/man-pages/man2/pwrite.2.html) documentation for more detail. **Default:** `null`
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Write `buffer` to the file.

The promise is fulfilled with an object containing two properties:

- `bytesWritten` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) the number of bytes written
- `buffer` [`<Buffer>`](buffer.html#class-buffer) | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView) a reference to the `buffer` written.

It is unsafe to use `filehandle.write()` multiple times on the same file without waiting for the promise to be fulfilled (or rejected). For this scenario, use [`filehandle.createWriteStream()`](#filehandlecreatewritestreamoptions).

On Linux, positional writes do not work when the file is opened in append mode. The kernel ignores the position argument and always appends the data to the end of the file.

##### `filehandle.write(buffer[, options])`

- `buffer` [`<Buffer>`](buffer.html#class-buffer) | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView)
- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `offset` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) **Default:** `0`
  - `length` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) **Default:** `buffer.byteLength - offset`
  - `position` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) | [`<null>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#null_type) **Default:** `null`
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Write `buffer` to the file.

Similar to the above `filehandle.write` function, this version takes an optional `options` object. If no `options` object is specified, it will default with the above values.

##### `filehandle.write(string[, position[, encoding]])`

- `string` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)
- `position` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) | [`<null>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#null_type) The offset from the beginning of the file where the data from `string` should be written. If `position` is not a `number` the data will be written at the current position. See the POSIX [`pwrite(2)`](http://man7.org/linux/man-pages/man2/pwrite.2.html) documentation for more detail. **Default:** `null`
- `encoding` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) The expected string encoding. **Default:** `'utf8'`
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Write `string` to the file. If `string` is not a string, the promise is rejected with an error.

The promise is fulfilled with an object containing two properties:

- `bytesWritten` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) the number of bytes written
- `buffer` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) a reference to the `string` written.

It is unsafe to use `filehandle.write()` multiple times on the same file without waiting for the promise to be fulfilled (or rejected). For this scenario, use [`filehandle.createWriteStream()`](#filehandlecreatewritestreamoptions).

On Linux, positional writes do not work when the file is opened in append mode. The kernel ignores the position argument and always appends the data to the end of the file.

##### `filehandle.writeFile(data, options)`

- `data` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`<AsyncIterable>`](https://tc39.github.io/ecma262/#sec-asynciterable-interface) | [`<Iterable>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol)
- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)
  - `encoding` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<null>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#null_type) The expected character encoding when `data` is a string. **Default:** `'utf8'`
  - `signal` [`<AbortSignal>`](globals.html#class-abortsignal) | [`<undefined>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#undefined_type) allows aborting an in-progress writeFile. **Default:** `undefined`
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Asynchronously writes data to a file, replacing the file if it already exists. `data` can be a string, a buffer, an [`<AsyncIterable>`](https://tc39.github.io/ecma262/#sec-asynciterable-interface), or an [`<Iterable>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol) object. The promise is fulfilled with no arguments upon success.

If `options` is a string, then it specifies the `encoding`.

The [`<FileHandle>`](fs.html#class-filehandle) has to support writing.

It is unsafe to use `filehandle.writeFile()` multiple times on the same file without waiting for the promise to be fulfilled (or rejected).

If one or more `filehandle.write()` calls are made on a file handle and then a `filehandle.writeFile()` call is made, the data will be written from the current position till the end of the file. It doesn't always write from the beginning of the file.

##### `filehandle.writev(buffers[, position])`

- `buffers` [`<Buffer>`](buffer.html#class-buffer)\[\] | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)\[\] | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView)\[\]
- `position` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) | [`<null>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#null_type) The offset from the beginning of the file where the data from `buffers` should be written. If `position` is not a `number`, the data will be written at the current position. **Default:** `null`
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Write an array of [`<ArrayBufferView>`](https://developer.mozilla.org/docs/Web/API/ArrayBufferView)s to the file.

The promise is fulfilled with an object containing a two properties:

- `bytesWritten` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) the number of bytes written
- `buffers` [`<Buffer>`](buffer.html#class-buffer)\[\] | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)\[\] | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView)\[\] a reference to the `buffers` input.

It is unsafe to call `writev()` multiple times on the same file without waiting for the promise to be fulfilled (or rejected).

On Linux, positional writes don't work when the file is opened in append mode. The kernel ignores the position argument and always appends the data to the end of the file.

##### `filehandle.writer([options])`

Stability: 1 - Experimental

- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `autoClose` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) Close the file handle when the writer ends or fails. **Default:** `false`.
  - `start` [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) Byte offset to start writing at. When specified, writes use explicit positioning. **Default:** current file position.
  - `limit` [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) Maximum number of bytes the writer will accept. Async writes (`write()`, `writev()`) that would exceed the limit reject with `ERR_OUT_OF_RANGE`. Sync writes (`writeSync()`, `writevSync()`) return `false`. **Default:** no limit.
  - `chunkSize` [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) Maximum chunk size in bytes for synchronous write operations. Writes larger than this threshold fall back to async I/O. Set this to match the reader's `chunkSize` for optimal `pipeTo()` performance. **Default:** `131072` (128 KB).
- Returns: [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `write(chunk[, options])` [`<Function>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function) Returns [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise). Accepts `Uint8Array`, `Buffer`, or string (UTF-8 encoded).
    - `chunk` [`<Buffer>`](buffer.html#class-buffer) | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)
    - `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
      - `signal` [`<AbortSignal>`](globals.html#class-abortsignal) If the signal is already aborted, the write rejects with `AbortError` without performing I/O.
  - `writev(chunks[, options])` [`<Function>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function) Returns [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise). Uses scatter/gather I/O via a single `writev()` syscall. Accepts mixed `Uint8Array`/string arrays.
    - `chunks` [`<Buffer>`](buffer.html#class-buffer)\[\] | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)\[\] | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView)\[\] | [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)\[\]
    - `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
      - `signal` [`<AbortSignal>`](globals.html#class-abortsignal) If the signal is already aborted, the write rejects with `AbortError` without performing I/O.
  - `writeSync(chunk)` [`<Function>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function) Returns [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type). Attempts a synchronous write. Returns `true` if the write succeeded, `false` if the caller should fall back to async `write()`. Returns `false` when: the writer is closed/errored, an async operation is in flight, the chunk exceeds `chunkSize`, or the write would exceed `limit`.
    - `chunk` [`<Buffer>`](buffer.html#class-buffer) | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)
  - `writevSync(chunks)` [`<Function>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function) Returns [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type). Synchronous batch write. Same fallback semantics as `writeSync()`.
    - `chunks` [`<Buffer>`](buffer.html#class-buffer)\[\] | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)\[\] | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView)\[\] | [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)\[\]
  - `end([options])` [`<Function>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function) Returns [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise), fulfills with the total number of bytes written. Idempotent: returns `totalBytesWritten` if already closed, returns the pending promise if already closing. Rejects if the writer is in an errored state.
    - `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
      - `signal` [`<AbortSignal>`](globals.html#class-abortsignal) If the signal is already aborted, `end()` rejects with `AbortError` and the writer remains open.
  - `endSync()` [`<Function>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function) Returns [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) | [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) total bytes written on success, `-1` if the writer is errored or an async operation is in flight. Idempotent when already closed.
  - `fail(reason)` [`<Function>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function) Puts the writer into a terminal error state. Synchronous. If the writer is already closed or errored, this is a no-op. If `autoClose` is true, closes the file handle synchronously.

Return a [`node:stream/iter`](stream_iter.html) writer backed by this file handle.

The writer supports both `Symbol.asyncDispose` and `Symbol.dispose`:

- `await using w = fh.writer()` — if the writer is still open (no `end()` called), `asyncDispose` calls `fail()`. If `end()` is pending, it waits for it to complete.
- `using w = fh.writer()` — calls `fail()` unconditionally.

The `writeSync()` and `writevSync()` methods enable the try-sync fast path used by [`stream/iter pipeTo()`](stream_iter.html#pipetosource-transforms-writer-options). When the reader's chunk size matches the writer's `chunkSize`, all writes in a `pipeTo()` pipeline complete synchronously with zero promise overhead.

This function is only available when the `--experimental-stream-iter` flag is enabled.

```js
import { open } from 'node:fs/promises';
import { from, pipeTo } from 'node:stream/iter';
import { compressGzip } from 'node:zlib/iter';

// Async pipeline
const fh = await open('output.gz', 'w');
await pipeTo(from('Hello!'), compressGzip(), fh.writer({ autoClose: true }));

// Sync pipeline with limit
const src = await open('input.txt', 'r');
const dst = await open('output.txt', 'w');
const w = dst.writer({ limit: 1024 * 1024 }); // Max 1 MB
await pipeTo(src.pull({ autoClose: true }), w);
await w.end();
await dst.close();
```

##### `filehandle[Symbol.asyncDispose]()`

- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Calls `filehandle.close()` and returns a promise that fulfills when the filehandle is closed.

This method enables the filehandle to be used with [`await using`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/await_using), which will automatically close the file when the scope exits. For more information, see the [MDN documentation on `using` statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/using).

#### `fsPromises.access(path[, mode])`

- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `mode` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) **Default:** `fs.constants.F_OK`
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Tests a user's permissions for the file or directory specified by `path`. The `mode` argument is an optional integer that specifies the accessibility checks to be performed. `mode` should be either the value `fs.constants.F_OK` or a mask consisting of the bitwise OR of any of `fs.constants.R_OK`, `fs.constants.W_OK`, and `fs.constants.X_OK` (e.g. `fs.constants.W_OK | fs.constants.R_OK`). Check [File access constants](#file-access-constants) for possible values of `mode`.

If the accessibility check is successful, the promise is fulfilled with no value. If any of the accessibility checks fail, the promise is rejected with an [`<Error>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error) object. The following example checks if the file `/etc/passwd` can be read and written by the current process.

```js
import { access, constants } from 'node:fs/promises';

try {
  await access('/etc/passwd', constants.R_OK | constants.W_OK);
  console.log('can access');
} catch {
  console.error('cannot access');
}
```

Using `fsPromises.access()` to check for the accessibility of a file before calling `fsPromises.open()` is not recommended. Doing so introduces a race condition, since other processes may change the file's state between the two calls. Instead, user code should open/read/write the file directly and handle the error raised if the file is not accessible.

#### `fsPromises.appendFile(path, data[, options])`

- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api) | [`<FileHandle>`](fs.html#class-filehandle) filename or [`<FileHandle>`](fs.html#class-filehandle)
- `data` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`<AsyncIterable>`](https://tc39.github.io/ecma262/#sec-asynciterable-interface) | [`<Iterable>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol)
- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)
  - `encoding` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<null>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#null_type) **Default:** `'utf8'`
  - `mode` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) **Default:** `0o666`
  - `flag` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) See [support of file system `flags`](#file-system-flags). **Default:** `'a'`.
  - `flush` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) If `true`, the underlying file descriptor is flushed prior to closing it. **Default:** `false`.
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Asynchronously append data to a file, creating the file if it does not yet `data` can be a string, a buffer, an [`<AsyncIterable>`](https://tc39.github.io/ecma262/#sec-asynciterable-interface), or an [`<Iterable>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol) object.

If `options` is a string, then it specifies the `encoding`.

The `mode` option only affects the newly created file. See [`fs.open()`](#fsopenpath-flags-mode-callback) for more details.

The `path` may be specified as a [`<FileHandle>`](fs.html#class-filehandle) that has been opened for appending (using `fsPromises.open()`).

#### `fsPromises.chmod(path, mode)`

- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `mode` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type)
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Changes the permissions of a file.

#### `fsPromises.chown(path, uid, gid)`

- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `uid` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type)
- `gid` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type)
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Changes the ownership of a file.

#### `fsPromises.copyFile(src, dest[, mode])`

- `src` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api) source filename to copy
- `dest` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api) destination filename of the copy operation
- `mode` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) Optional modifiers that specify the behavior of the copy operation. It is possible to create a mask consisting of the bitwise OR of two or more values (e.g. `fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE`) **Default:** `0`.
  - `fs.constants.COPYFILE_EXCL`: The copy operation will fail if `dest` already exists.
  - `fs.constants.COPYFILE_FICLONE`: The copy operation will attempt to create a copy-on-write reflink. If the platform does not support copy-on-write, then a fallback copy mechanism is used.
  - `fs.constants.COPYFILE_FICLONE_FORCE`: The copy operation will attempt to create a copy-on-write reflink. If the platform does not support copy-on-write, then the operation will fail.
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Asynchronously copies `src` to `dest`. By default, `dest` is overwritten if it already exists.

Symbolic links are followed. If `src` is a symbolic link, the target file is copied. If `dest` is a symbolic link, the target file is overwritten unless `mode` contains `fs.constants.COPYFILE_EXCL`.

No guarantees are made about the atomicity of the copy operation. If an error occurs after the destination file has been opened for writing, an attempt will be made to remove the destination.

```js
import { copyFile, constants } from 'node:fs/promises';

try {
  await copyFile('source.txt', 'destination.txt');
  console.log('source.txt was copied to destination.txt');
} catch {
  console.error('The file could not be copied');
}

// By using COPYFILE_EXCL, the operation will fail if destination.txt exists.
try {
  await copyFile('source.txt', 'destination.txt', constants.COPYFILE_EXCL);
  console.log('source.txt was copied to destination.txt');
} catch {
  console.error('The file could not be copied');
}
```

#### `fsPromises.cp(src, dest[, options])`

- `src` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<URL>`](url.html#the-whatwg-url-api) source path to copy.
- `dest` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<URL>`](url.html#the-whatwg-url-api) destination path to copy to.
- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `dereference` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) dereference symlinks. **Default:** `false`.
  - `errorOnExist` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) when `force` is `false`, and the destination exists, throw an error. **Default:** `false`.
  - `filter` [`<Function>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function) Function to filter copied files/directories. Return `true` to copy the item, `false` to ignore it. When ignoring a directory, all of its contents will be skipped as well. Can also return a `Promise` that resolves to `true` or `false` **Default:** `undefined`.
    - `src` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) source path to copy.
    - `dest` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) destination path to copy to.
    - Returns: [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) | [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) A value that is coercible to `boolean` or a `Promise` that fulfils with such value.
  - `force` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) overwrite existing file or directory. The copy operation will ignore errors if you set this to false and the destination exists. Use the `errorOnExist` option to change this behavior. **Default:** `true`.
  - `mode` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) modifiers for copy operation. **Default:** `0`. See `mode` flag of [`fsPromises.copyFile()`](#fspromisescopyfilesrc-dest-mode).
  - `preserveTimestamps` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) When `true` timestamps from `src` will be preserved. **Default:** `false`.
  - `recursive` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) copy directories recursively **Default:** `false`
  - `verbatimSymlinks` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) When `true`, path resolution for symlinks will be skipped. **Default:** `false`
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Asynchronously copies the entire directory structure from `src` to `dest`, including subdirectories and files.

When copying a directory to another directory, globs are not supported and behavior is similar to `cp dir1/ dir2/`.

#### `fsPromises.glob(pattern[, options])`

- `pattern` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)\[\]
- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `cwd` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<URL>`](url.html#the-whatwg-url-api) current working directory. **Default:** `process.cwd()`
  - `exclude` [`<Function>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function) | [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)\[\] Function to filter out files/directories or a list of glob patterns to be excluded. If a function is provided, return `true` to exclude the item, `false` to include it. **Default:** `undefined`. If a string array is provided, each string should be a glob pattern that specifies paths to exclude. Note: Negation patterns (e.g., '!foo.js') are not supported.
  - `followSymlinks` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) When `true`, symbolic links to directories are followed while expanding `**` patterns. **Default:** `false`.
  - `maxDepth` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) Maximum number of directory levels to traverse. The `cwd` directory has a depth of `0`. **Default:** `Infinity`.
  - `withFileTypes` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) `true` if the glob should return paths as Dirents, `false` otherwise. **Default:** `false`.
- Returns: [`<AsyncIterator>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator) An AsyncIterator that yields the paths of files that match the pattern.

When `followSymlinks` is enabled, detected symbolic link cycles are not traversed recursively.

```js
import { glob } from 'node:fs/promises';

for await (const entry of glob('**/*.js')) console.log(entry);
```

#### `fsPromises.lchmod(path, mode)`

Stability: 0 - Deprecated

- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `mode` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type)
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Changes the permissions on a symbolic link.

This method is only implemented on macOS.

#### `fsPromises.lchown(path, uid, gid)`

- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `uid` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type)
- `gid` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type)
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Changes the ownership on a symbolic link.

#### `fsPromises.lutimes(path, atime, mtime)`

- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `atime` [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) | [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Date>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)
- `mtime` [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) | [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Date>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Changes the access and modification times of a file in the same way as [`fsPromises.utimes()`](#fspromisesutimespath-atime-mtime), with the difference that if the path refers to a symbolic link, then the link is not dereferenced: instead, the timestamps of the symbolic link itself are changed.

#### `fsPromises.link(existingPath, newPath)`

- `existingPath` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `newPath` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Creates a new link from the `existingPath` to the `newPath`. See the POSIX [`link(2)`](http://man7.org/linux/man-pages/man2/link.2.html) documentation for more detail.

#### `fsPromises.lstat(path[, options])`

- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `bigint` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) Whether the numeric values in the returned [`<fs.Stats>`](fs.html#class-fsstats) object should be `bigint`. **Default:** `false`.
  - `signal` [`<AbortSignal>`](globals.html#class-abortsignal) An AbortSignal to cancel the operation. **Default:** `undefined`.
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with the [`<fs.Stats>`](fs.html#class-fsstats) object for the given symbolic link `path`.

Equivalent to [`fsPromises.stat()`](#fspromisesstatpath-options) unless `path` refers to a symbolic link, in which case the link itself is stat-ed, not the file that it refers to. Refer to the POSIX [`lstat(2)`](http://man7.org/linux/man-pages/man2/lstat.2.html) document for more detail.

#### `fsPromises.mkdir(path[, options])`

- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type)
  - `recursive` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) **Default:** `false`
  - `mode` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) Not supported on Windows. See [File modes](#file-modes) for more details. **Default:** `0o777`.
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Upon success, fulfills with `undefined` if `recursive` is `false`, or the first directory path created if `recursive` is `true`.

Asynchronously creates a directory.

The optional `options` argument can be an integer specifying `mode` (permission and sticky bits), or an object with a `mode` property and a `recursive` property indicating whether parent directories should be created. Calling `fsPromises.mkdir()` when `path` is a directory that exists results in a rejection only when `recursive` is false.

```js
import { mkdir } from 'node:fs/promises';

try {
  const projectFolder = new URL('./test/project/', import.meta.url);
  const createDir = await mkdir(projectFolder, { recursive: true });

  console.log(`created ${createDir}`);
} catch (err) {
  console.error(err.message);
}
```

#### `fsPromises.mkdtemp(prefix[, options])`

- `prefix` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `options` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `encoding` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) **Default:** `'utf8'`
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with the created directory path. If `encoding` is `'buffer'`, then the resulting directory path is returned as a [`<Buffer>`](buffer.html#class-buffer). Otherwise, the path is returned as a [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) using the specified encoding.

Creates a unique temporary directory. A unique directory name is generated by appending six random characters to the end of the provided `prefix`. Due to platform inconsistencies, avoid trailing `X` characters in `prefix`. Some platforms, notably the BSDs, can return more than six random characters, and replace trailing `X` characters in `prefix` with random characters.

The optional `options` argument can be a string specifying an encoding, or an object with an `encoding` property specifying the character encoding to use.

```js
import { mkdtemp } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

try {
  await mkdtemp(join(tmpdir(), 'foo-'));
} catch (err) {
  console.error(err);
}
```

The `fsPromises.mkdtemp()` method will append the six randomly selected characters directly to the `prefix` string. For instance, given a directory `/tmp`, if the intention is to create a temporary directory _within_ `/tmp`, the `prefix` must end with a trailing platform-specific path separator (`require('node:path').sep`).

#### `fsPromises.mkdtempDisposable(prefix[, options])`

- `prefix` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `options` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `encoding` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) **Default:** `'utf8'`
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with a Promise for an async-disposable Object:
  - `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) The path of the created directory.
  - `remove` [`<AsyncFunction>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction) A function which removes the created directory.
  - `[Symbol.asyncDispose]` [`<AsyncFunction>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction) The same as `remove`.

The resulting Promise holds an async-disposable object whose `path` property holds the created directory path. If `encoding` is `'buffer'`, the `path` will also be a [`<Buffer>`](buffer.html#class-buffer), otherwise a [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type). When the object is disposed, the directory and its contents will be removed asynchronously if it still exists. If the directory cannot be deleted, disposal will throw an error. The object has an async `remove()` method which will perform the same task.

Both this function and the disposal function on the resulting object are async, so it should be used with `await` + [`await using`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/await_using) as in `await using dir = await fsPromises.mkdtempDisposable('prefix')`.

See the [MDN documentation on `using` statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/using) for more information about explicit resource management.

For detailed information, see the documentation of [`fsPromises.mkdtemp()`](#fspromisesmkdtempprefix-options).

The optional `options` argument can be a string specifying an encoding, or an object with an `encoding` property specifying the character encoding to use.

#### `fsPromises.open(path, flags[, mode])`

- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `flags` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) See [support of file system `flags`](#file-system-flags). **Default:** `'r'`.
- `mode` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) Sets the file mode (permission and sticky bits) if the file is created. See [File modes](#file-modes) for more details. **Default:** `0o666` (readable and writable)
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with a [`<FileHandle>`](fs.html#class-filehandle) object.

Opens a [`<FileHandle>`](fs.html#class-filehandle).

Refer to the POSIX [`open(2)`](http://man7.org/linux/man-pages/man2/open.2.html) documentation for more detail.

Some characters (`< > : " / \ | ? *`) are reserved under Windows as documented by [Naming Files, Paths, and Namespaces](https://docs.microsoft.com/en-us/windows/desktop/FileIO/naming-a-file). Under NTFS, if the filename contains a colon, Node.js will open a file system stream, as described by [this MSDN page](https://docs.microsoft.com/en-us/windows/desktop/FileIO/using-streams).

#### `fsPromises.opendir(path[, options])`

- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `encoding` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<null>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#null_type) **Default:** `'utf8'`
  - `bufferSize` [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) Number of directory entries that are buffered internally when reading from the directory. Higher values lead to better performance but higher memory usage. **Default:** `32`
  - `recursive` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) Resolved `Dir` will be an [`<AsyncIterable>`](https://tc39.github.io/ecma262/#sec-asynciterable-interface) containing all sub files and directories. **Default:** `false`
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with an [`<fs.Dir>`](fs.html#class-fsdir).

Asynchronously open a directory for iterative scanning. See the POSIX [`opendir(3)`](http://man7.org/linux/man-pages/man3/opendir.3.html) documentation for more detail.

Creates an [`<fs.Dir>`](fs.html#class-fsdir), which contains all further functions for reading from and cleaning up the directory.

The `encoding` option sets the encoding for the `path` while opening the directory and subsequent read operations.

Example using async iteration:

```js
import { opendir } from 'node:fs/promises';

try {
  const dir = await opendir('./');
  for await (const dirent of dir) console.log(dirent.name);
} catch (err) {
  console.error(err);
}
```

When using the async iterator, the [`<fs.Dir>`](fs.html#class-fsdir) object will be automatically closed after the iterator exits.

#### `fsPromises.readdir(path[, options])`

- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `options` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `encoding` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) **Default:** `'utf8'`
  - `withFileTypes` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) **Default:** `false`
  - `recursive` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) If `true`, reads the contents of a directory recursively. In recursive mode, it will list all files, sub files, and directories. **Default:** `false`.
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with an array of the names of the files in the directory excluding `'.'` and `'..'`.

Reads the contents of a directory.

The optional `options` argument can be a string specifying an encoding, or an object with an `encoding` property specifying the character encoding to use for the filenames. If the `encoding` is set to `'buffer'`, the filenames returned will be passed as [`<Buffer>`](buffer.html#class-buffer) objects.

If `options.withFileTypes` is set to `true`, the returned array will contain [`<fs.Dirent>`](fs.html#class-fsdirent) objects.

```js
import { readdir } from 'node:fs/promises';

try {
  const files = await readdir(path);
  for (const file of files) console.log(file);
} catch (err) {
  console.error(err);
}
```

#### `fsPromises.readFile(path[, options])`

- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api) | [`<FileHandle>`](fs.html#class-filehandle) filename or `FileHandle`
- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)
  - `encoding` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<null>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#null_type) **Default:** `null`
  - `flag` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) See [support of file system `flags`](#file-system-flags). **Default:** `'r'`.
  - `signal` [`<AbortSignal>`](globals.html#class-abortsignal) allows aborting an in-progress readFile
  - `buffer` [`<Buffer>`](buffer.html#class-buffer) | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`<Function>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function) A buffer to read into, or a function called with the file size that returns the buffer.
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with the contents of the file.

Asynchronously reads the entire contents of a file.

If no encoding is specified (using `options.encoding`), the data is returned as a [`<Buffer>`](buffer.html#class-buffer) object. Otherwise, the data will be a string.

If `options` is a string, then it specifies the encoding.

If `buffer` is provided and no encoding is specified, the returned [`<Buffer>`](buffer.html#class-buffer) is a view over the supplied buffer containing only the bytes read. If the supplied buffer is too small to contain the entire file, the promise will be rejected.

When the `path` is a directory, the behavior of `fsPromises.readFile()` is platform-specific. On macOS, Linux, and Windows, the promise will be rejected with an error. On FreeBSD, a representation of the directory's contents will be returned.

An example of reading a `package.json` file located in the same directory of the running code:

```js
import { readFile } from 'node:fs/promises';
try {
  const filePath = new URL('./package.json', import.meta.url);
  const contents = await readFile(filePath, { encoding: 'utf8' });
  console.log(contents);
} catch (err) {
  console.error(err.message);
}
```

It is possible to abort an ongoing `readFile` using an [`<AbortSignal>`](globals.html#class-abortsignal). If a request is aborted the promise returned is rejected with an `AbortError`:

```js
import { readFile } from 'node:fs/promises';

try {
  const controller = new AbortController();
  const { signal } = controller;
  const promise = readFile(fileName, { signal });

  // Abort the request before the promise settles.
  controller.abort();

  await promise;
} catch (err) {
  // When a request is aborted - err is an AbortError
  console.error(err);
}
```

Aborting an ongoing request does not abort individual operating system requests but rather the internal buffering `fs.readFile` performs.

Any specified [`<FileHandle>`](fs.html#class-filehandle) has to support reading.

An example using the `buffer` option with a pre-allocated buffer:

```js
import { Buffer } from 'node:buffer';
import { readFile } from 'node:fs/promises';

const buf = Buffer.alloc(16384);
const contents = await readFile('/path/to/file', { buffer: buf });
console.log(contents); // A view over `buf` containing only the bytes read
```

An example using the `buffer` option with a function returning a buffer:

```js
import { Buffer } from 'node:buffer';
import { readFile } from 'node:fs/promises';

const contents = await readFile('/path/to/file', {
  buffer: (size) => Buffer.alloc(size),
});
console.log(contents);
```

#### `fsPromises.readlink(path[, options])`

- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `options` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `encoding` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) **Default:** `'utf8'`
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with the `linkString` upon success.

Reads the contents of the symbolic link referred to by `path`. See the POSIX [`readlink(2)`](http://man7.org/linux/man-pages/man2/readlink.2.html) documentation for more detail. The promise is fulfilled with the `linkString` upon success.

The optional `options` argument can be a string specifying an encoding, or an object with an `encoding` property specifying the character encoding to use for the link path returned. If the `encoding` is set to `'buffer'`, the link path returned will be passed as a [`<Buffer>`](buffer.html#class-buffer) object.

#### `fsPromises.realpath(path[, options])`

- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `options` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `encoding` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) **Default:** `'utf8'`
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with the resolved path upon success.

Determines the actual location of `path` using the same semantics as the `fs.realpath.native()` function.

Only paths that can be converted to UTF8 strings are supported.

The optional `options` argument can be a string specifying an encoding, or an object with an `encoding` property specifying the character encoding to use for the path. If the `encoding` is set to `'buffer'`, the path returned will be passed as a [`<Buffer>`](buffer.html#class-buffer) object.

On Linux, when Node.js is linked against musl libc, the procfs file system must be mounted on `/proc` in order for this function to work. Glibc does not have this restriction.

#### `fsPromises.rename(oldPath, newPath)`

- `oldPath` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `newPath` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Renames `oldPath` to `newPath`.

#### `fsPromises.rmdir(path[, options])`

- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) There are currently no options exposed. There used to be options for `recursive`, `maxBusyTries`, and `emfileWait` but they were deprecated and removed. The `options` argument is still accepted for backwards compatibility but it is not used.
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Removes the directory identified by `path`.

Using `fsPromises.rmdir()` on a file (not a directory) results in the promise being rejected with an `ENOENT` error on Windows and an `ENOTDIR` error on POSIX.

To get a behavior similar to the `rm -rf` Unix command, use [`fsPromises.rm()`](#fspromisesrmpath-options) with options `{ recursive: true, force: true }`.

#### `fsPromises.rm(path[, options])`

- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `force` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) When `true`, exceptions will be ignored if `path` does not exist. **Default:** `false`.
  - `maxRetries` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) If an `EBUSY`, `EMFILE`, `ENFILE`, `ENOTEMPTY`, or `EPERM` error is encountered, Node.js will retry the operation with a linear backoff wait of `retryDelay` milliseconds longer on each try. This option represents the number of retries. This option is ignored if the `recursive` option is not `true`. **Default:** `0`.
  - `recursive` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) If `true`, perform a recursive directory removal. In recursive mode operations are retried on failure. **Default:** `false`.
  - `retryDelay` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) The amount of time in milliseconds to wait between retries. This option is ignored if the `recursive` option is not `true`. **Default:** `100`.
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Removes files and directories (modeled on the standard POSIX `rm` utility).

#### `fsPromises.stat(path[, options])`

- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `bigint` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) Whether the numeric values in the returned [`<fs.Stats>`](fs.html#class-fsstats) object should be `bigint`. **Default:** `false`.
  - `throwIfNoEntry` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) Whether an exception will be thrown if no file system entry exists, rather than returning `undefined`. **Default:** `true`.
  - `signal` [`<AbortSignal>`](globals.html#class-abortsignal) An AbortSignal to cancel the operation. **Default:** `undefined`.
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with the [`<fs.Stats>`](fs.html#class-fsstats) object for the given `path`.

#### `fsPromises.statfs(path[, options])`

- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `bigint` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) Whether the numeric values in the returned [`<fs.StatFs>`](fs.html#class-fsstatfs) object should be `bigint`. **Default:** `false`.
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with the [`<fs.StatFs>`](fs.html#class-fsstatfs) object for the given `path`.

#### `fsPromises.symlink(target, path[, type])`

- `target` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `type` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<null>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#null_type) **Default:** `null`
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Creates a symbolic link.

The `type` argument is only used on Windows platforms and can be one of `'dir'`, `'file'`, or `'junction'`. If the `type` argument is `null`, Node.js will autodetect `target` type and use `'file'` or `'dir'`. If the `target` does not exist, `'file'` will be used. Windows junction points require the destination path to be absolute. When using `'junction'`, the `target` argument will automatically be normalized to absolute path. Junction points on NTFS volumes can only point to directories.

#### `fsPromises.truncate(path[, len])`

- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `len` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) **Default:** `0`
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Truncates (shortens or extends the length) of the content at `path` to `len` bytes.

#### `fsPromises.unlink(path)`

- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

If `path` refers to a symbolic link, then the link is removed without affecting the file or directory to which that link refers. If the `path` refers to a file path that is not a symbolic link, the file is deleted. See the POSIX [`unlink(2)`](http://man7.org/linux/man-pages/man2/unlink.2.html) documentation for more detail.

#### `fsPromises.utimes(path, atime, mtime)`

- `path` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `atime` [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) | [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Date>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)
- `mtime` [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) | [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Date>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Change the file system timestamps of the object referenced by `path`.

The `atime` and `mtime` arguments follow these rules:

- Values can be either numbers representing Unix epoch time, `Date`s, or a numeric string like `'123456789.0'`.
- If the value can not be converted to a number, or is `NaN`, `Infinity`, or `-Infinity`, an `Error` will be thrown.

#### `fsPromises.watch(filename[, options])`

- `filename` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api)
- `options` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
  - `persistent` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) Indicates whether the process should continue to run as long as files are being watched. **Default:** `true`.
  - `recursive` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) Indicates whether all subdirectories should be watched, or only the current directory. This applies when a directory is specified, and only on supported platforms (See [caveats](#caveats)). **Default:** `false`.
  - `encoding` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) Specifies the character encoding to be used for the filename passed to the listener. **Default:** `'utf8'`.
  - `signal` [`<AbortSignal>`](globals.html#class-abortsignal) An [`<AbortSignal>`](globals.html#class-abortsignal) used to signal when the watcher should stop.
  - `maxQueue` [`<number>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) Specifies the number of events to queue between iterations of the [`<AsyncIterator>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator) returned. **Default:** `2048`.
  - `overflow` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) Either `'ignore'` or `'error'` when there are more events to be queued than `maxQueue` allows. `'ignore'` means overflow events are dropped and a warning is emitted, while `'error'` means to throw an exception. **Default:** `'ignore'`.
  - `ignore` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<RegExp>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp) | [`<Function>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function) | [`<Array>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array) Pattern(s) to ignore. Strings are glob patterns (using [`minimatch`](https://github.com/isaacs/minimatch)), RegExp patterns are tested against the filename, and functions receive the filename and return `true` to ignore. **Default:** `undefined`.
- Returns: [`<AsyncIterator>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator) of objects with the properties:
  - `eventType` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) The type of change
  - `filename` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<null>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#null_type) The name of the file changed.

Returns an async iterator that watches for changes on `filename`, where `filename` is either a file or a directory.

```js
const { watch } = require('node:fs/promises');

const ac = new AbortController();
const { signal } = ac;
setTimeout(() => ac.abort(), 10000);

(async () => {
  try {
    const watcher = watch(__filename, { signal });
    for await (const event of watcher) console.log(event);
  } catch (err) {
    if (err.name === 'AbortError') return;
    throw err;
  }
})();
```

On most platforms, `'rename'` is emitted whenever a filename appears or disappears in the directory.

All the [caveats](#caveats) for `fs.watch()` also apply to `fsPromises.watch()`.

#### `fsPromises.writeFile(file, data[, options])`

- `file` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<URL>`](url.html#the-whatwg-url-api) | [`<FileHandle>`](fs.html#class-filehandle) filename or `FileHandle`
- `data` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<Buffer>`](buffer.html#class-buffer) | [`<TypedArray>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [`<DataView>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [`<AsyncIterable>`](https://tc39.github.io/ecma262/#sec-asynciterable-interface) | [`<Iterable>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol)
- `options` [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)
  - `encoding` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) | [`<null>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#null_type) **Default:** `'utf8'`
  - `mode` [`<integer>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type) **Default:** `0o666`
  - `flag` [`<string>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type) See [support of file system `flags`](#file-system-flags). **Default:** `'w'`.
  - `flush` [`<boolean>`](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type) If all data is successfully written to the file, and `flush` is `true`, `filehandle.sync()` is used to flush the data. **Default:** `false`.
  - `signal` [`<AbortSignal>`](globals.html#class-abortsignal) allows aborting an in-progress writeFile
- Returns: [`<Promise>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) Fulfills with `undefined` upon success.

Asynchronously writes data to a file, replacing the file if it already exists. `data` can be a string, a buffer, an [`<AsyncIterable>`](https://tc39.github.io/ecma262/#sec-asynciterable-interface), or an [`<Iterable>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol) object.

The `encoding` option is ignored if `data` is a buffer.

If `options` is a string, then it specifies the encoding.

The `mode` option only affects the newly created file. See [`fs.open()`](#fsopenpath-flags-mode-callback) for more details.

Any specified [`<FileHandle>`](fs.html#class-filehandle) has to support writing.

It is unsafe to use `fsPromises.writeFile()` multiple times on the same file without waiting for the promise to be settled.

Similarly to `fsPromises.readFile` - `fsPromises.writeFile` is a convenience method that performs multiple `write` calls internally to write the buffer passed to it. For performance sensitive code consider using [`fs.createWriteStream()`](#fscreatewritestreampath-options) or [`filehandle.createWriteStream()`](#filehandlecreatewritestreamoptions).

It is possible to use an [`<AbortSignal>`](globals.html#class-abortsignal) to cancel an `fsPromises.writeFile()`. Cancelation is "best effort", and some amount of data is likely still to be written.

```js
import { writeFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

try {
  const controller = new AbortController();
  const { signal } = controller;
  const data = new Uint8Array(Buffer.from('Hello Node.js'));
  const promise = writeFile('message.txt', data, { signal });

  // Abort the request before the promise settles.
  controller.abort();

  await promise;
} catch (err) {
  // When a request is aborted - err is an AbortError
  console.error(err);
}
```

Aborting an ongoing request does not abort individual operating system requests but rather the internal buffering `fs.writeFile` performs.

#### `fsPromises.constants`

- Type: [`<Object>`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

Returns an object containing commonly used constants for file system operations. The object is the same as `fs.constants`. See [FS constants](#fs-constants) for more details.
