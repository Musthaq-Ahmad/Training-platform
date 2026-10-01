import type { ContentTopic } from '../../../types';

export const nodefspromisesTopics = {
  nodefspromises: {
    id: 'nodefspromises',
    heading: 'Promises API',
    blocks: [
      {
        type: 'paragraph',
        text: 'The fs/promises API provides asynchronous file system methods that return promises.',
      },
      {
        type: 'paragraph',
        text: 'The promise APIs use the underlying Node.js threadpool to perform file system operations off the event loop thread. These operations are not synchronized or threadsafe. Care must be taken when performing multiple concurrent modifications on the same file or data corruption may occur.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Class: FileHandle',
      },
      {
        type: 'paragraph',
        text: 'A <FileHandle> object is an object wrapper for a numeric file descriptor.',
      },
      {
        type: 'paragraph',
        text: 'Instances of the <FileHandle> object are created by the fsPromises.open() method.',
      },
      {
        type: 'paragraph',
        text: 'All <FileHandle> objects are <EventEmitter>s.',
      },
      {
        type: 'paragraph',
        text: 'If a <FileHandle> is not closed using the filehandle.close() method, it will try to automatically close the file descriptor and emit a process warning, helping to prevent memory leaks. Please do not rely on this behavior because it can be unreliable and the file may not be closed. Instead, always explicitly close <FileHandle>s. Node.js may change this behavior in the future.',
      },
      {
        type: 'subheading',
        level: 5,
        text: "Event: 'close'",
      },
      {
        type: 'paragraph',
        text: "The 'close' event is emitted when the <FileHandle> has been closed and can no longer be used.",
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.appendFile(data[, options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'data <string> | <Buffer> | <TypedArray> | <DataView> | <AsyncIterable> | <Iterable>',
          "options <Object> | <string> * encoding <string> | <null> Default: 'utf8' * signal <AbortSignal> | <undefined> allows aborting an in-progress writeFile. Default: undefined",
          'Returns: <Promise> Fulfills with undefined upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Alias of filehandle.writeFile().',
      },
      {
        type: 'paragraph',
        text: 'When operating on file handles, the mode cannot be changed from what it was set to with fsPromises.open(). Therefore, this is equivalent to filehandle.writeFile().',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.chmod(mode)',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'mode <integer> the file mode bit mask.',
          'Returns: <Promise> Fulfills with undefined upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Modifies the permissions on the file. See chmod(2).',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.chown(uid, gid)',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          "uid <integer> The file's new owner's user id.",
          "gid <integer> The file's new group's group id.",
          'Returns: <Promise> Fulfills with undefined upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Changes the ownership of the file. A wrapper for chown(2).',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.close()',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Returns: <Promise> Fulfills with undefined upon success.'],
      },
      {
        type: 'paragraph',
        text: 'Closes the file handle after waiting for any pending operation on the handle to complete.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { open } from 'node:fs/promises';\n\nlet filehandle;\ntry {\n  filehandle = await open('thefile.txt', 'r');\n} finally {\n  await filehandle?.close();\n}",
        },
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.createReadStream([options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'options <Object> * encoding <string> Default: null * autoClose <boolean> Default: true * emitClose <boolean> Default: true * start <integer> * end <integer> Default: Infinity * highWaterMark <integer> Default: 64 * 1024 * signal <AbortSignal> | <undefined> Default: undefined',
          'Returns: <fs.ReadStream>',
        ],
      },
      {
        type: 'paragraph',
        text: 'options can include start and end values to read a range of bytes from the file instead of the entire file. Both start and end are inclusive and start counting at 0, allowed values are in the [0, Number.MAX_SAFE_INTEGER] range. If start is omitted or undefined, filehandle.createReadStream() reads sequentially from the current file position. The encoding can be any one of those accepted by <Buffer>.',
      },
      {
        type: 'paragraph',
        text: 'If the FileHandle points to a character device that only supports blocking reads (such as keyboard or sound card), read operations do not finish until data is available. This can prevent the process from exiting and the stream from closing naturally.',
      },
      {
        type: 'paragraph',
        text: "By default, the stream will emit a 'close' event after it has been destroyed. Set the emitClose option to false to change this behavior.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { open } from 'node:fs/promises';\n\nconst fd = await open('/dev/input/event0');\n// Create a stream from some character device.\nconst stream = fd.createReadStream();\nsetTimeout(() => {\n  stream.close(); // This may not close the stream.\n  // Artificially marking end-of-stream, as if the underlying resource had\n  // indicated end-of-file by itself, allows the stream to close.\n  // This does not cancel pending read operations, and if there is such an\n  // operation, the process may still not be able to exit successfully\n  // until it finishes.\n  stream.push(null);\n  stream.read(0);\n}, 100);",
        },
      },
      {
        type: 'paragraph',
        text: "If autoClose is false, then the file descriptor won't be closed, even if there's an error. It is the application's responsibility to close it and make sure there's no file descriptor leak. If autoClose is set to true (default behavior), on 'error' or 'end' the file descriptor will be closed automatically.",
      },
      {
        type: 'paragraph',
        text: 'An example to read the last 10 bytes of a file which is 100 bytes long:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { open } from 'node:fs/promises';\n\nconst fd = await open('sample.txt');\nfd.createReadStream({ start: 90, end: 99 });",
        },
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.createWriteStream([options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          "options <Object> * encoding <string> Default: 'utf8' * autoClose <boolean> Default: true * emitClose <boolean> Default: true * start <integer> * highWaterMark <number> Default: See stream.getDefaultHighWaterMark(). * flush <boolean> If true, the underlying file descriptor is flushed prior to closing it. Default: false.",
          'Returns: <fs.WriteStream>',
        ],
      },
      {
        type: 'paragraph',
        text: 'options may also include a start option to allow writing data at some position past the beginning of the file, allowed values are in the [0, Number.MAX_SAFE_INTEGER] range. Modifying a file rather than replacing it may require the flags open option to be set to r+ rather than the default r. The encoding can be any one of those accepted by <Buffer>.',
      },
      {
        type: 'paragraph',
        text: "If autoClose is set to true (default behavior) on 'error' or 'finish' the file descriptor will be closed automatically. If autoClose is false, then the file descriptor won't be closed, even if there's an error. It is the application's responsibility to close it and make sure there's no file descriptor leak.",
      },
      {
        type: 'paragraph',
        text: "By default, the stream will emit a 'close' event after it has been destroyed. Set the emitClose option to false to change this behavior.",
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.datasync()',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Returns: <Promise> Fulfills with undefined upon success.'],
      },
      {
        type: 'paragraph',
        text: "Forces all currently queued I/O operations associated with the file to the operating system's synchronized I/O completion state. Refer to the POSIX fdatasync(2) documentation for details.",
      },
      {
        type: 'paragraph',
        text: 'Unlike filehandle.sync this method does not flush modified metadata.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.fd',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <number> The numeric file descriptor managed by the <FileHandle> object.'],
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.pull([...transforms][, options])',
      },
      {
        type: 'paragraph',
        text: 'Stability: 1 - Experimental',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          '...transforms <Function> | <Object> Optional transforms to apply via stream/iter pull().',
          'options <Object> * signal <AbortSignal> * autoClose <boolean> Close the file handle when the stream ends. Default: false. * start <number> Byte offset to begin reading from. When specified, reads use explicit positioning (pread semantics). Default: current file position. * limit <number> Maximum number of bytes to read before ending the iterator. Reads stop when limit bytes have been delivered or EOF is reached, whichever comes first. Default: read until EOF. * chunkSize <number> Size in bytes of the buffer allocated for each read operation. Default: 131072 (128 KB).',
          'Returns: <AsyncIterable> whose chunks fulfill with <Uint8Array>[]',
        ],
      },
      {
        type: 'paragraph',
        text: 'Return the file contents as an async iterable using the node:stream/iter pull model. Reads are performed in chunkSize-byte chunks (default 128 KB). If transforms are provided, they are applied via stream/iter pull().',
      },
      {
        type: 'paragraph',
        text: 'The file handle is locked while the iterable is being consumed and unlocked when iteration completes, an error occurs, or the consumer breaks.',
      },
      {
        type: 'paragraph',
        text: 'This function is only available when the --experimental-stream-iter flag is enabled.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { open } from 'node:fs/promises';\nimport { text } from 'node:stream/iter';\nimport { compressGzip } from 'node:zlib/iter';\n\nconst fh = await open('input.txt', 'r');\n\n// Read as text\nconsole.log(await text(fh.pull({ autoClose: true })));\n\n// Read 1 KB starting at byte 100\nconst fh2 = await open('input.txt', 'r');\nconsole.log(await text(fh2.pull({ start: 100, limit: 1024, autoClose: true })));\n\n// Read with compression\nconst fh3 = await open('input.txt', 'r');\nconst compressed = fh3.pull(compressGzip(), { autoClose: true });",
        },
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.pullSync([...transforms][, options])',
      },
      {
        type: 'paragraph',
        text: 'Stability: 1 - Experimental',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          '...transforms <Function> | <Object> Optional transforms to apply via stream/iter pullSync().',
          'options <Object> * autoClose <boolean> Close the file handle when the stream ends. Default: false. * start <number> Byte offset to begin reading from. When specified, reads use explicit positioning. Default: current file position. * limit <number> Maximum number of bytes to read before ending the iterator. Default: read until EOF. * chunkSize <number> Size in bytes of the buffer allocated for each read operation. Default: 131072 (128 KB).',
          'Returns: <Iterable> whose chunks return <Uint8Array>[]',
        ],
      },
      {
        type: 'paragraph',
        text: 'Synchronous counterpart of filehandle.pull(). Returns a sync iterable that reads the file using synchronous I/O on the main thread. Reads are performed in chunkSize-byte chunks (default 128 KB).',
      },
      {
        type: 'paragraph',
        text: 'The file handle is locked while the iterable is being consumed. Unlike the async pull(), this method does not support AbortSignal since all operations are synchronous.',
      },
      {
        type: 'paragraph',
        text: 'This function is only available when the --experimental-stream-iter flag is enabled.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { open } from 'node:fs/promises';\nimport { textSync, pipeToSync } from 'node:stream/iter';\nimport { compressGzipSync, decompressGzipSync } from 'node:zlib/iter';\n\nconst fh = await open('input.txt', 'r');\n\n// Read as text (sync)\nconsole.log(textSync(fh.pullSync({ autoClose: true })));\n\n// Sync compress pipeline: file -> gzip -> file\nconst src = await open('input.txt', 'r');\nconst dst = await open('output.gz', 'w');\npipeToSync(src.pullSync(compressGzipSync(), { autoClose: true }), dst.writer({ autoClose: true }));",
        },
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.read(buffer, offset, length, position)',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'buffer <Buffer> | <TypedArray> | <DataView> A buffer that will be filled with the file data read.',
          'offset <integer> The location in the buffer at which to start filling. Default: 0',
          'length <integer> The number of bytes to read. Default: buffer.byteLength - offset',
          'position <integer> | <bigint> | <null> The location where to begin reading data from the file. If null or -1, data will be read from the current file position, and the position will be updated. If position is a non-negative integer, the current file position will remain unchanged. Default: null',
          'Returns: <Promise> Fulfills upon success with an object with two properties: * bytesRead <integer> The number of bytes read * buffer <Buffer> | <TypedArray> | <DataView> A reference to the passed in buffer argument.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Reads data from the file and stores that in the given buffer.',
      },
      {
        type: 'paragraph',
        text: 'If the file is not modified concurrently, the end-of-file is reached when the number of bytes read is zero.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.read([options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'options <Object> * buffer <Buffer> | <TypedArray> | <DataView> A buffer that will be filled with the file data read. Default: Buffer.alloc(16384) * offset <integer> The location in the buffer at which to start filling. Default: 0 * length <integer> The number of bytes to read. Default: buffer.byteLength - offset * position <integer> | <bigint> | <null> The location where to begin reading data from the file. If null or -1, data will be read from the current file position, and the position will be updated. If position is a non-negative integer, the current file position will remain unchanged. Default:: null',
          'Returns: <Promise> Fulfills upon success with an object with two properties: * bytesRead <integer> The number of bytes read * buffer <Buffer> | <TypedArray> | <DataView> A reference to the passed in buffer argument.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Reads data from the file and stores that in the given buffer.',
      },
      {
        type: 'paragraph',
        text: 'If the file is not modified concurrently, the end-of-file is reached when the number of bytes read is zero.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.read(buffer[, options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'buffer <Buffer> | <TypedArray> | <DataView> A buffer that will be filled with the file data read.',
          'options <Object> * offset <integer> The location in the buffer at which to start filling. Default: 0 * length <integer> The number of bytes to read. Default: buffer.byteLength - offset * position <integer> | <bigint> | <null> The location where to begin reading data from the file. If null or -1, data will be read from the current file position, and the position will be updated. If position is a non-negative integer, the current file position will remain unchanged. Default:: null',
          'Returns: <Promise> Fulfills upon success with an object with two properties: * bytesRead <integer> The number of bytes read * buffer <Buffer> | <TypedArray> | <DataView> A reference to the passed in buffer argument.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Reads data from the file and stores that in the given buffer.',
      },
      {
        type: 'paragraph',
        text: 'If the file is not modified concurrently, the end-of-file is reached when the number of bytes read is zero.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.readableWebStream([options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'options <Object> * autoClose <boolean> When true, causes the <FileHandle> to be closed when the stream is closed. Default: false',
          'Returns: <ReadableStream>',
        ],
      },
      {
        type: 'paragraph',
        text: "Returns a byte-oriented ReadableStream that may be used to read the file's contents.",
      },
      {
        type: 'paragraph',
        text: 'An error will be thrown if this method is called more than once or is called after the FileHandle is closed or closing.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import {\n  open,\n} from 'node:fs/promises';\n\nconst file = await open('./some/file/to/read');\n\nfor await (const chunk of file.readableWebStream())\n  console.log(chunk);\n\nawait file.close();",
        },
      },
      {
        type: 'paragraph',
        text: 'While the ReadableStream will read the file to completion, it will not close the FileHandle automatically. User code must still call the fileHandle.close() method unless the autoClose option is set to true.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.readFile(options)',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'options <Object> | <string> * encoding <string> | <null> Default: null * signal <AbortSignal> allows aborting an in-progress readFile * buffer <Buffer> | <TypedArray> | <DataView> | <Function> A buffer to read into, or a function called with the file size that returns the buffer.',
          'Returns: <Promise> Fulfills upon a successful read with the contents of the file. If no encoding is specified (using options.encoding), the data is returned as a <Buffer> object. Otherwise, the data will be a string.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Asynchronously reads the entire contents of a file.',
      },
      {
        type: 'paragraph',
        text: 'If options is a string, then it specifies the encoding.',
      },
      {
        type: 'paragraph',
        text: 'If buffer is provided and no encoding is specified, the returned <Buffer> is a view over the supplied buffer containing only the bytes read. If the supplied buffer is too small to contain the entire file, the operation will fail.',
      },
      {
        type: 'paragraph',
        text: 'The <FileHandle> has to support reading.',
      },
      {
        type: 'paragraph',
        text: "If one or more filehandle.read() calls are made on a file handle and then a filehandle.readFile() call is made, the data will be read from the current position till the end of the file. It doesn't always read from the beginning of the file.",
      },
      {
        type: 'paragraph',
        text: 'An example using the buffer option with a pre-allocated buffer:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { Buffer } from 'node:buffer';\nimport { open } from 'node:fs/promises';\n\nconst file = await open('./some/file/to/read');\ntry {\n  const buf = Buffer.alloc(16384);\n  const contents = await file.readFile({ buffer: buf });\n  console.log(contents); // A view over `buf` containing only the bytes read\n} finally {\n  await file.close();\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'An example using the buffer option with a function returning a buffer:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { Buffer } from 'node:buffer';\nimport { open } from 'node:fs/promises';\n\nconst file = await open('./some/file/to/read');\ntry {\n  const contents = await file.readFile({\n    buffer: (size) => Buffer.alloc(size),\n  });\n  console.log(contents);\n} finally {\n  await file.close();\n}",
        },
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.readLines([options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'options <Object> * encoding <string> Default: null * autoClose <boolean> Default: true * emitClose <boolean> Default: true * start <integer> * end <integer> Default: Infinity * highWaterMark <integer> Default: 64 * 1024',
          'Returns: <readline.InterfaceConstructor>',
        ],
      },
      {
        type: 'paragraph',
        text: 'Convenience method to create a readline interface and stream over the file. See filehandle.createReadStream() for the options.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { open } from 'node:fs/promises';\n\nconst file = await open('./some/file/to/read');\n\nfor await (const line of file.readLines()) {\n  console.log(line);\n}",
        },
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.readv(buffers[, position])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'buffers <Buffer>[] | <TypedArray>[] | <DataView>[]',
          'position <integer> | <null> The offset from the beginning of the file where the data should be read from. If position is not a number, the data will be read from the current position. Default: null',
          'Returns: <Promise> Fulfills upon success an object containing two properties: * bytesRead <integer> the number of bytes read * buffers <Buffer>[] | <TypedArray>[] | <DataView>[] property containing a reference to the buffers input.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Read from a file and write to an array of <ArrayBufferView>s',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.stat([options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'options <Object> * bigint <boolean> Whether the numeric values in the returned <fs.Stats> object should be bigint. Default: false. * signal <AbortSignal> An AbortSignal to cancel the operation. Default: undefined.',
          'Returns: <Promise> Fulfills with an <fs.Stats> for the file.',
        ],
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.sync()',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Returns: <Promise> Fulfills with undefined upon success.'],
      },
      {
        type: 'paragraph',
        text: 'Request that all data for the open file descriptor is flushed to the storage device. The specific implementation is operating system and device specific. Refer to the POSIX fsync(2) documentation for more detail.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.truncate(len)',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'len <integer> Default: 0',
          'Returns: <Promise> Fulfills with undefined upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Truncates the file.',
      },
      {
        type: 'paragraph',
        text: 'If the file was larger than len bytes, only the first len bytes will be retained in the file.',
      },
      {
        type: 'paragraph',
        text: 'The following example retains only the first four bytes of the file:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { open } from 'node:fs/promises';\n\nlet filehandle = null;\ntry {\n  filehandle = await open('temp.txt', 'r+');\n  await filehandle.truncate(4);\n} finally {\n  await filehandle?.close();\n}",
        },
      },
      {
        type: 'paragraph',
        text: "If the file previously was shorter than len bytes, it is extended, and the extended part is filled with null bytes ('\\0'):",
      },
      {
        type: 'paragraph',
        text: 'If len is negative then 0 will be used.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.utimes(atime, mtime)',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'atime <number> | <string> | <Date>',
          'mtime <number> | <string> | <Date>',
          'Returns: <Promise>',
        ],
      },
      {
        type: 'paragraph',
        text: 'Change the file system timestamps of the object referenced by the <FileHandle> then fulfills the promise with no arguments upon success.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.write(buffer, offset[, length[, position]])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'buffer <Buffer> | <TypedArray> | <DataView>',
          'offset <integer> The start position from within buffer where the data to write begins.',
          'length <integer> The number of bytes from buffer to write. Default: buffer.byteLength - offset',
          'position <integer> | <null> The offset from the beginning of the file where the data from buffer should be written. If position is not a number, the data will be written at the current position. See the POSIX pwrite(2) documentation for more detail. Default: null',
          'Returns: <Promise>',
        ],
      },
      {
        type: 'paragraph',
        text: 'Write buffer to the file.',
      },
      {
        type: 'paragraph',
        text: 'The promise is fulfilled with an object containing two properties:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'bytesWritten <integer> the number of bytes written',
          'buffer <Buffer> | <TypedArray> | <DataView> a reference to the buffer written.',
        ],
      },
      {
        type: 'paragraph',
        text: 'It is unsafe to use filehandle.write() multiple times on the same file without waiting for the promise to be fulfilled (or rejected). For this scenario, use filehandle.createWriteStream().',
      },
      {
        type: 'paragraph',
        text: 'On Linux, positional writes do not work when the file is opened in append mode. The kernel ignores the position argument and always appends the data to the end of the file.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.write(buffer[, options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'buffer <Buffer> | <TypedArray> | <DataView>',
          'options <Object> * offset <integer> Default: 0 * length <integer> Default: buffer.byteLength - offset * position <integer> | <null> Default: null',
          'Returns: <Promise>',
        ],
      },
      {
        type: 'paragraph',
        text: 'Write buffer to the file.',
      },
      {
        type: 'paragraph',
        text: 'Similar to the above filehandle.write function, this version takes an optional options object. If no options object is specified, it will default with the above values.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.write(string[, position[, encoding]])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'string <string>',
          'position <integer> | <null> The offset from the beginning of the file where the data from string should be written. If position is not a number the data will be written at the current position. See the POSIX pwrite(2) documentation for more detail. Default: null',
          "encoding <string> The expected string encoding. Default: 'utf8'",
          'Returns: <Promise>',
        ],
      },
      {
        type: 'paragraph',
        text: 'Write string to the file. If string is not a string, the promise is rejected with an error.',
      },
      {
        type: 'paragraph',
        text: 'The promise is fulfilled with an object containing two properties:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'bytesWritten <integer> the number of bytes written',
          'buffer <string> a reference to the string written.',
        ],
      },
      {
        type: 'paragraph',
        text: 'It is unsafe to use filehandle.write() multiple times on the same file without waiting for the promise to be fulfilled (or rejected). For this scenario, use filehandle.createWriteStream().',
      },
      {
        type: 'paragraph',
        text: 'On Linux, positional writes do not work when the file is opened in append mode. The kernel ignores the position argument and always appends the data to the end of the file.',
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.writeFile(data, options)',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'data <string> | <Buffer> | <TypedArray> | <DataView> | <AsyncIterable> | <Iterable>',
          "options <Object> | <string> * encoding <string> | <null> The expected character encoding when data is a string. Default: 'utf8' * signal <AbortSignal> | <undefined> allows aborting an in-progress writeFile. Default: undefined",
          'Returns: <Promise>',
        ],
      },
      {
        type: 'paragraph',
        text: 'Asynchronously writes data to a file, replacing the file if it already exists. data can be a string, a buffer, an <AsyncIterable>, or an <Iterable> object. The promise is fulfilled with no arguments upon success.',
      },
      {
        type: 'paragraph',
        text: 'If options is a string, then it specifies the encoding.',
      },
      {
        type: 'paragraph',
        text: 'The <FileHandle> has to support writing.',
      },
      {
        type: 'paragraph',
        text: 'It is unsafe to use filehandle.writeFile() multiple times on the same file without waiting for the promise to be fulfilled (or rejected).',
      },
      {
        type: 'paragraph',
        text: "If one or more filehandle.write() calls are made on a file handle and then a filehandle.writeFile() call is made, the data will be written from the current position till the end of the file. It doesn't always write from the beginning of the file.",
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.writev(buffers[, position])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'buffers <Buffer>[] | <TypedArray>[] | <DataView>[]',
          'position <integer> | <null> The offset from the beginning of the file where the data from buffers should be written. If position is not a number, the data will be written at the current position. Default: null',
          'Returns: <Promise>',
        ],
      },
      {
        type: 'paragraph',
        text: 'Write an array of <ArrayBufferView>s to the file.',
      },
      {
        type: 'paragraph',
        text: 'The promise is fulfilled with an object containing a two properties:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'bytesWritten <integer> the number of bytes written',
          'buffers <Buffer>[] | <TypedArray>[] | <DataView>[] a reference to the buffers input.',
        ],
      },
      {
        type: 'paragraph',
        text: 'It is unsafe to call writev() multiple times on the same file without waiting for the promise to be fulfilled (or rejected).',
      },
      {
        type: 'paragraph',
        text: "On Linux, positional writes don't work when the file is opened in append mode. The kernel ignores the position argument and always appends the data to the end of the file.",
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle.writer([options])',
      },
      {
        type: 'paragraph',
        text: 'Stability: 1 - Experimental',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          "options <Object> * autoClose <boolean> Close the file handle when the writer ends or fails. Default: false. * start <number> Byte offset to start writing at. When specified, writes use explicit positioning. Default: current file position. * limit <number> Maximum number of bytes the writer will accept. Async writes (write(), writev()) that would exceed the limit reject with ERR_OUT_OF_RANGE. Sync writes (writeSync(), writevSync()) return false. Default: no limit. * chunkSize <number> Maximum chunk size in bytes for synchronous write operations. Writes larger than this threshold fall back to async I/O. Set this to match the reader's chunkSize for optimal pipeTo() performance. Default: 131072 (128 KB).",
          'Returns: <Object> * write(chunk[, options]) <Function> Returns <Promise>. Accepts Uint8Array, Buffer, or string (UTF-8 encoded). * chunk <Buffer> | <TypedArray> | <DataView> | <string> * options <Object> * signal <AbortSignal> If the signal is already aborted, the write rejects with AbortError without performing I/O. * writev(chunks[, options]) <Function> Returns <Promise>. Uses scatter/gather I/O via a single writev() syscall. Accepts mixed Uint8Array/string arrays. * chunks <Buffer>[] | <TypedArray>[] | <DataView>[] | <string>[] * options <Object> * signal <AbortSignal> If the signal is already aborted, the write rejects with AbortError without performing I/O. * writeSync(chunk) <Function> Returns <boolean>. Attempts a synchronous write. Returns true if the write succeeded, false if the caller should fall back to async write(). Returns false when: the writer is closed/errored, an async operation is in flight, the chunk exceeds chunkSize, or the write would exceed limit. * chunk <Buffer> | <TypedArray> | <DataView> | <string> * writevSync(chunks) <Function> Returns <boolean>. Synchronous batch write. Same fallback semantics as writeSync(). * chunks <Buffer>[] | <TypedArray>[] | <DataView>[] | <string>[] * end([options]) <Function> Returns <Promise>, fulfills with the total number of bytes written. Idempotent: returns totalBytesWritten if already closed, returns the pending promise if already closing. Rejects if the writer is in an errored state. * options <Object> * signal <AbortSignal> If the signal is already aborted, end() rejects with AbortError and the writer remains open. * endSync() <Function> Returns <number> | <number> total bytes written on success, -1 if the writer is errored or an async operation is in flight. Idempotent when already closed. * fail(reason) <Function> Puts the writer into a terminal error state. Synchronous. If the writer is already closed or errored, this is a no-op. If autoClose is true, closes the file handle synchronously.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Return a node:stream/iter writer backed by this file handle.',
      },
      {
        type: 'paragraph',
        text: 'The writer supports both Symbol.asyncDispose and Symbol.dispose:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'await using w = fh.writer() — if the writer is still open (no end() called), asyncDispose calls fail(). If end() is pending, it waits for it to complete.',
          'using w = fh.writer() — calls fail() unconditionally.',
        ],
      },
      {
        type: 'paragraph',
        text: "The writeSync() and writevSync() methods enable the try-sync fast path used by stream/iter pipeTo(). When the reader's chunk size matches the writer's chunkSize, all writes in a pipeTo() pipeline complete synchronously with zero promise overhead.",
      },
      {
        type: 'paragraph',
        text: 'This function is only available when the --experimental-stream-iter flag is enabled.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { open } from 'node:fs/promises';\nimport { from, pipeTo } from 'node:stream/iter';\nimport { compressGzip } from 'node:zlib/iter';\n\n// Async pipeline\nconst fh = await open('output.gz', 'w');\nawait pipeTo(from('Hello!'), compressGzip(), fh.writer({ autoClose: true }));\n\n// Sync pipeline with limit\nconst src = await open('input.txt', 'r');\nconst dst = await open('output.txt', 'w');\nconst w = dst.writer({ limit: 1024 * 1024 }); // Max 1 MB\nawait pipeTo(src.pull({ autoClose: true }), w);\nawait w.end();\nawait dst.close();",
        },
      },
      {
        type: 'subheading',
        level: 5,
        text: 'filehandle[Symbol.asyncDispose]()',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Returns: <Promise>'],
      },
      {
        type: 'paragraph',
        text: 'Calls filehandle.close() and returns a promise that fulfills when the filehandle is closed.',
      },
      {
        type: 'paragraph',
        text: 'This method enables the filehandle to be used with await using, which will automatically close the file when the scope exits. For more information, see the MDN documentation on using statements.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.access(path[, mode])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'path <string> | <Buffer> | <URL>',
          'mode <integer> Default: fs.constants.F_OK',
          'Returns: <Promise> Fulfills with undefined upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: "Tests a user's permissions for the file or directory specified by path. The mode argument is an optional integer that specifies the accessibility checks to be performed. mode should be either the value fs.constants.F_OK or a mask consisting of the bitwise OR of any of fs.constants.R_OK, fs.constants.W_OK, and fs.constants.X_OK (e.g. fs.constants.W_OK | fs.constants.R_OK). Check File access constants for possible values of mode.",
      },
      {
        type: 'paragraph',
        text: 'If the accessibility check is successful, the promise is fulfilled with no value. If any of the accessibility checks fail, the promise is rejected with an <Error> object. The following example checks if the file /etc/passwd can be read and written by the current process.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { access, constants } from 'node:fs/promises';\n\ntry {\n  await access('/etc/passwd', constants.R_OK | constants.W_OK);\n  console.log('can access');\n} catch {\n  console.error('cannot access');\n}",
        },
      },
      {
        type: 'paragraph',
        text: "Using fsPromises.access() to check for the accessibility of a file before calling fsPromises.open() is not recommended. Doing so introduces a race condition, since other processes may change the file's state between the two calls. Instead, user code should open/read/write the file directly and handle the error raised if the file is not accessible.",
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.appendFile(path, data[, options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'path <string> | <Buffer> | <URL> | <FileHandle> filename or <FileHandle>',
          'data <string> | <Buffer> | <TypedArray> | <DataView> | <AsyncIterable> | <Iterable>',
          "options <Object> | <string> * encoding <string> | <null> Default: 'utf8' * mode <integer> Default: 0o666 * flag <string> See support of file system flags. Default: 'a'. * flush <boolean> If true, the underlying file descriptor is flushed prior to closing it. Default: false.",
          'Returns: <Promise> Fulfills with undefined upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Asynchronously append data to a file, creating the file if it does not yet data can be a string, a buffer, an <AsyncIterable>, or an <Iterable> object.',
      },
      {
        type: 'paragraph',
        text: 'If options is a string, then it specifies the encoding.',
      },
      {
        type: 'paragraph',
        text: 'The mode option only affects the newly created file. See fs.open() for more details.',
      },
      {
        type: 'paragraph',
        text: 'The path may be specified as a <FileHandle> that has been opened for appending (using fsPromises.open()).',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.chmod(path, mode)',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'path <string> | <Buffer> | <URL>',
          'mode <string> | <integer>',
          'Returns: <Promise> Fulfills with undefined upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Changes the permissions of a file.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.chown(path, uid, gid)',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'path <string> | <Buffer> | <URL>',
          'uid <integer>',
          'gid <integer>',
          'Returns: <Promise> Fulfills with undefined upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Changes the ownership of a file.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.copyFile(src, dest[, mode])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'src <string> | <Buffer> | <URL> source filename to copy',
          'dest <string> | <Buffer> | <URL> destination filename of the copy operation',
          'mode <integer> Optional modifiers that specify the behavior of the copy operation. It is possible to create a mask consisting of the bitwise OR of two or more values (e.g. fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE) Default: 0. * fs.constants.COPYFILE_EXCL: The copy operation will fail if dest already exists. * fs.constants.COPYFILE_FICLONE: The copy operation will attempt to create a copy-on-write reflink. If the platform does not support copy-on-write, then a fallback copy mechanism is used. * fs.constants.COPYFILE_FICLONE_FORCE: The copy operation will attempt to create a copy-on-write reflink. If the platform does not support copy-on-write, then the operation will fail.',
          'Returns: <Promise> Fulfills with undefined upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Asynchronously copies src to dest. By default, dest is overwritten if it already exists.',
      },
      {
        type: 'paragraph',
        text: 'Symbolic links are followed. If src is a symbolic link, the target file is copied. If dest is a symbolic link, the target file is overwritten unless mode contains fs.constants.COPYFILE_EXCL.',
      },
      {
        type: 'paragraph',
        text: 'No guarantees are made about the atomicity of the copy operation. If an error occurs after the destination file has been opened for writing, an attempt will be made to remove the destination.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { copyFile, constants } from 'node:fs/promises';\n\ntry {\n  await copyFile('source.txt', 'destination.txt');\n  console.log('source.txt was copied to destination.txt');\n} catch {\n  console.error('The file could not be copied');\n}\n\n// By using COPYFILE_EXCL, the operation will fail if destination.txt exists.\ntry {\n  await copyFile('source.txt', 'destination.txt', constants.COPYFILE_EXCL);\n  console.log('source.txt was copied to destination.txt');\n} catch {\n  console.error('The file could not be copied');\n}",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.cp(src, dest[, options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'src <string> | <URL> source path to copy.',
          'dest <string> | <URL> destination path to copy to.',
          'options <Object> * dereference <boolean> dereference symlinks. Default: false. * errorOnExist <boolean> when force is false, and the destination exists, throw an error. Default: false. * filter <Function> Function to filter copied files/directories. Return true to copy the item, false to ignore it. When ignoring a directory, all of its contents will be skipped as well. Can also return a Promise that resolves to true or false Default: undefined. * src <string> source path to copy. * dest <string> destination path to copy to. * Returns: <boolean> | <Promise> A value that is coercible to boolean or a Promise that fulfils with such value. * force <boolean> overwrite existing file or directory. The copy operation will ignore errors if you set this to false and the destination exists. Use the errorOnExist option to change this behavior. Default: true. * mode <integer> modifiers for copy operation. Default: 0. See mode flag of fsPromises.copyFile(). * preserveTimestamps <boolean> When true timestamps from src will be preserved. Default: false. * recursive <boolean> copy directories recursively Default: false * verbatimSymlinks <boolean> When true, path resolution for symlinks will be skipped. Default: false',
          'Returns: <Promise> Fulfills with undefined upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Asynchronously copies the entire directory structure from src to dest, including subdirectories and files.',
      },
      {
        type: 'paragraph',
        text: 'When copying a directory to another directory, globs are not supported and behavior is similar to cp dir1/ dir2/.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.glob(pattern[, options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'pattern <string> | <string>[]',
          "options <Object> * cwd <string> | <URL> current working directory. Default: process.cwd() * exclude <Function> | <string>[] Function to filter out files/directories or a list of glob patterns to be excluded. If a function is provided, return true to exclude the item, false to include it. Default: undefined. If a string array is provided, each string should be a glob pattern that specifies paths to exclude. Note: Negation patterns (e.g., '!foo.js') are not supported. * followSymlinks <boolean> When true, symbolic links to directories are followed while expanding ** patterns. Default: false. * maxDepth <integer> Maximum number of directory levels to traverse. The cwd directory has a depth of 0. Default: Infinity. * withFileTypes <boolean> true if the glob should return paths as Dirents, false otherwise. Default: false.",
          'Returns: <AsyncIterator> An AsyncIterator that yields the paths of files that match the pattern.',
        ],
      },
      {
        type: 'paragraph',
        text: 'When followSymlinks is enabled, detected symbolic link cycles are not traversed recursively.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { glob } from 'node:fs/promises';\n\nfor await (const entry of glob('**/*.js'))\n  console.log(entry);",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.lchmod(path, mode)',
      },
      {
        type: 'paragraph',
        text: 'Stability: 0 - Deprecated',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'path <string> | <Buffer> | <URL>',
          'mode <integer>',
          'Returns: <Promise> Fulfills with undefined upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Changes the permissions on a symbolic link.',
      },
      {
        type: 'paragraph',
        text: 'This method is only implemented on macOS.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.lchown(path, uid, gid)',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'path <string> | <Buffer> | <URL>',
          'uid <integer>',
          'gid <integer>',
          'Returns: <Promise> Fulfills with undefined upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Changes the ownership on a symbolic link.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.lutimes(path, atime, mtime)',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'path <string> | <Buffer> | <URL>',
          'atime <number> | <string> | <Date>',
          'mtime <number> | <string> | <Date>',
          'Returns: <Promise> Fulfills with undefined upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Changes the access and modification times of a file in the same way as fsPromises.utimes(), with the difference that if the path refers to a symbolic link, then the link is not dereferenced: instead, the timestamps of the symbolic link itself are changed.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.link(existingPath, newPath)',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'existingPath <string> | <Buffer> | <URL>',
          'newPath <string> | <Buffer> | <URL>',
          'Returns: <Promise> Fulfills with undefined upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Creates a new link from the existingPath to the newPath. See the POSIX link(2) documentation for more detail.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.lstat(path[, options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'path <string> | <Buffer> | <URL>',
          'options <Object> * bigint <boolean> Whether the numeric values in the returned <fs.Stats> object should be bigint. Default: false. * signal <AbortSignal> An AbortSignal to cancel the operation. Default: undefined.',
          'Returns: <Promise> Fulfills with the <fs.Stats> object for the given symbolic link path.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Equivalent to fsPromises.stat() unless path refers to a symbolic link, in which case the link itself is stat-ed, not the file that it refers to. Refer to the POSIX lstat(2) document for more detail.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.mkdir(path[, options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'path <string> | <Buffer> | <URL>',
          'options <Object> | <integer> * recursive <boolean> Default: false * mode <string> | <integer> Not supported on Windows. See File modes for more details. Default: 0o777.',
          'Returns: <Promise> Upon success, fulfills with undefined if recursive is false, or the first directory path created if recursive is true.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Asynchronously creates a directory.',
      },
      {
        type: 'paragraph',
        text: 'The optional options argument can be an integer specifying mode (permission and sticky bits), or an object with a mode property and a recursive property indicating whether parent directories should be created. Calling fsPromises.mkdir() when path is a directory that exists results in a rejection only when recursive is false.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { mkdir } from 'node:fs/promises';\n\ntry {\n  const projectFolder = new URL('./test/project/', import.meta.url);\n  const createDir = await mkdir(projectFolder, { recursive: true });\n\n  console.log(`created ${createDir}`);\n} catch (err) {\n  console.error(err.message);\n}",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.mkdtemp(prefix[, options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'prefix <string> | <Buffer> | <URL>',
          "options <string> | <Object> * encoding <string> Default: 'utf8'",
          "Returns: <Promise> Fulfills with the created directory path. If encoding is 'buffer', then the resulting directory path is returned as a <Buffer>. Otherwise, the path is returned as a <string> using the specified encoding.",
        ],
      },
      {
        type: 'paragraph',
        text: 'Creates a unique temporary directory. A unique directory name is generated by appending six random characters to the end of the provided prefix. Due to platform inconsistencies, avoid trailing X characters in prefix. Some platforms, notably the BSDs, can return more than six random characters, and replace trailing X characters in prefix with random characters.',
      },
      {
        type: 'paragraph',
        text: 'The optional options argument can be a string specifying an encoding, or an object with an encoding property specifying the character encoding to use.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { mkdtemp } from 'node:fs/promises';\nimport { join } from 'node:path';\nimport { tmpdir } from 'node:os';\n\ntry {\n  await mkdtemp(join(tmpdir(), 'foo-'));\n} catch (err) {\n  console.error(err);\n}",
        },
      },
      {
        type: 'paragraph',
        text: "The fsPromises.mkdtemp() method will append the six randomly selected characters directly to the prefix string. For instance, given a directory /tmp, if the intention is to create a temporary directory within /tmp, the prefix must end with a trailing platform-specific path separator (require('node:path').sep).",
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.mkdtempDisposable(prefix[, options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'prefix <string> | <Buffer> | <URL>',
          "options <string> | <Object> * encoding <string> Default: 'utf8'",
          'Returns: <Promise> Fulfills with a Promise for an async-disposable Object: * path <string> | <Buffer> The path of the created directory. * remove <AsyncFunction> A function which removes the created directory. * [Symbol.asyncDispose] <AsyncFunction> The same as remove.',
        ],
      },
      {
        type: 'paragraph',
        text: "The resulting Promise holds an async-disposable object whose path property holds the created directory path. If encoding is 'buffer', the path will also be a <Buffer>, otherwise a <string>. When the object is disposed, the directory and its contents will be removed asynchronously if it still exists. If the directory cannot be deleted, disposal will throw an error. The object has an async remove() method which will perform the same task.",
      },
      {
        type: 'paragraph',
        text: "Both this function and the disposal function on the resulting object are async, so it should be used with await + await using as in await using dir = await fsPromises.mkdtempDisposable('prefix').",
      },
      {
        type: 'paragraph',
        text: 'See the MDN documentation on using statements for more information about explicit resource management.',
      },
      {
        type: 'paragraph',
        text: 'For detailed information, see the documentation of fsPromises.mkdtemp().',
      },
      {
        type: 'paragraph',
        text: 'The optional options argument can be a string specifying an encoding, or an object with an encoding property specifying the character encoding to use.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.open(path, flags[, mode])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'path <string> | <Buffer> | <URL>',
          "flags <string> | <number> See support of file system flags. Default: 'r'.",
          'mode <string> | <integer> Sets the file mode (permission and sticky bits) if the file is created. See File modes for more details. Default: 0o666 (readable and writable)',
          'Returns: <Promise> Fulfills with a <FileHandle> object.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Opens a <FileHandle>.',
      },
      {
        type: 'paragraph',
        text: 'Refer to the POSIX open(2) documentation for more detail.',
      },
      {
        type: 'paragraph',
        text: 'Some characters (< > : " / \\ | ? *) are reserved under Windows as documented by Naming Files, Paths, and Namespaces. Under NTFS, if the filename contains a colon, Node.js will open a file system stream, as described by this MSDN page.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.opendir(path[, options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'path <string> | <Buffer> | <URL>',
          "options <Object> * encoding <string> | <null> Default: 'utf8' * bufferSize <number> Number of directory entries that are buffered internally when reading from the directory. Higher values lead to better performance but higher memory usage. Default: 32 * recursive <boolean> Resolved Dir will be an <AsyncIterable> containing all sub files and directories. Default: false",
          'Returns: <Promise> Fulfills with an <fs.Dir>.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Asynchronously open a directory for iterative scanning. See the POSIX opendir(3) documentation for more detail.',
      },
      {
        type: 'paragraph',
        text: 'Creates an <fs.Dir>, which contains all further functions for reading from and cleaning up the directory.',
      },
      {
        type: 'paragraph',
        text: 'The encoding option sets the encoding for the path while opening the directory and subsequent read operations.',
      },
      {
        type: 'paragraph',
        text: 'Example using async iteration:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { opendir } from 'node:fs/promises';\n\ntry {\n  const dir = await opendir('./');\n  for await (const dirent of dir)\n    console.log(dirent.name);\n} catch (err) {\n  console.error(err);\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'When using the async iterator, the <fs.Dir> object will be automatically closed after the iterator exits.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.readdir(path[, options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'path <string> | <Buffer> | <URL>',
          "options <string> | <Object> * encoding <string> Default: 'utf8' * withFileTypes <boolean> Default: false * recursive <boolean> If true, reads the contents of a directory recursively. In recursive mode, it will list all files, sub files, and directories. Default: false.",
          "Returns: <Promise> Fulfills with an array of the names of the files in the directory excluding '.' and '..'.",
        ],
      },
      {
        type: 'paragraph',
        text: 'Reads the contents of a directory.',
      },
      {
        type: 'paragraph',
        text: "The optional options argument can be a string specifying an encoding, or an object with an encoding property specifying the character encoding to use for the filenames. If the encoding is set to 'buffer', the filenames returned will be passed as <Buffer> objects.",
      },
      {
        type: 'paragraph',
        text: 'If options.withFileTypes is set to true, the returned array will contain <fs.Dirent> objects.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { readdir } from 'node:fs/promises';\n\ntry {\n  const files = await readdir(path);\n  for (const file of files)\n    console.log(file);\n} catch (err) {\n  console.error(err);\n}",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.readFile(path[, options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'path <string> | <Buffer> | <URL> | <FileHandle> filename or FileHandle',
          "options <Object> | <string> * encoding <string> | <null> Default: null * flag <string> See support of file system flags. Default: 'r'. * signal <AbortSignal> allows aborting an in-progress readFile * buffer <Buffer> | <TypedArray> | <DataView> | <Function> A buffer to read into, or a function called with the file size that returns the buffer.",
          'Returns: <Promise> Fulfills with the contents of the file.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Asynchronously reads the entire contents of a file.',
      },
      {
        type: 'paragraph',
        text: 'If no encoding is specified (using options.encoding), the data is returned as a <Buffer> object. Otherwise, the data will be a string.',
      },
      {
        type: 'paragraph',
        text: 'If options is a string, then it specifies the encoding.',
      },
      {
        type: 'paragraph',
        text: 'If buffer is provided and no encoding is specified, the returned <Buffer> is a view over the supplied buffer containing only the bytes read. If the supplied buffer is too small to contain the entire file, the promise will be rejected.',
      },
      {
        type: 'paragraph',
        text: "When the path is a directory, the behavior of fsPromises.readFile() is platform-specific. On macOS, Linux, and Windows, the promise will be rejected with an error. On FreeBSD, a representation of the directory's contents will be returned.",
      },
      {
        type: 'paragraph',
        text: 'An example of reading a package.json file located in the same directory of the running code:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { readFile } from 'node:fs/promises';\ntry {\n  const filePath = new URL('./package.json', import.meta.url);\n  const contents = await readFile(filePath, { encoding: 'utf8' });\n  console.log(contents);\n} catch (err) {\n  console.error(err.message);\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'It is possible to abort an ongoing readFile using an <AbortSignal>. If a request is aborted the promise returned is rejected with an AbortError:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { readFile } from 'node:fs/promises';\n\ntry {\n  const controller = new AbortController();\n  const { signal } = controller;\n  const promise = readFile(fileName, { signal });\n\n  // Abort the request before the promise settles.\n  controller.abort();\n\n  await promise;\n} catch (err) {\n  // When a request is aborted - err is an AbortError\n  console.error(err);\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Aborting an ongoing request does not abort individual operating system requests but rather the internal buffering fs.readFile performs.',
      },
      {
        type: 'paragraph',
        text: 'Any specified <FileHandle> has to support reading.',
      },
      {
        type: 'paragraph',
        text: 'An example using the buffer option with a pre-allocated buffer:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { Buffer } from 'node:buffer';\nimport { readFile } from 'node:fs/promises';\n\nconst buf = Buffer.alloc(16384);\nconst contents = await readFile('/path/to/file', { buffer: buf });\nconsole.log(contents); // A view over `buf` containing only the bytes read",
        },
      },
      {
        type: 'paragraph',
        text: 'An example using the buffer option with a function returning a buffer:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { Buffer } from 'node:buffer';\nimport { readFile } from 'node:fs/promises';\n\nconst contents = await readFile('/path/to/file', {\n  buffer: (size) => Buffer.alloc(size),\n});\nconsole.log(contents);",
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.readlink(path[, options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'path <string> | <Buffer> | <URL>',
          "options <string> | <Object> * encoding <string> Default: 'utf8'",
          'Returns: <Promise> Fulfills with the linkString upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Reads the contents of the symbolic link referred to by path. See the POSIX readlink(2) documentation for more detail. The promise is fulfilled with the linkString upon success.',
      },
      {
        type: 'paragraph',
        text: "The optional options argument can be a string specifying an encoding, or an object with an encoding property specifying the character encoding to use for the link path returned. If the encoding is set to 'buffer', the link path returned will be passed as a <Buffer> object.",
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.realpath(path[, options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'path <string> | <Buffer> | <URL>',
          "options <string> | <Object> * encoding <string> Default: 'utf8'",
          'Returns: <Promise> Fulfills with the resolved path upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Determines the actual location of path using the same semantics as the fs.realpath.native() function.',
      },
      {
        type: 'paragraph',
        text: 'Only paths that can be converted to UTF8 strings are supported.',
      },
      {
        type: 'paragraph',
        text: "The optional options argument can be a string specifying an encoding, or an object with an encoding property specifying the character encoding to use for the path. If the encoding is set to 'buffer', the path returned will be passed as a <Buffer> object.",
      },
      {
        type: 'paragraph',
        text: 'On Linux, when Node.js is linked against musl libc, the procfs file system must be mounted on /proc in order for this function to work. Glibc does not have this restriction.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.rename(oldPath, newPath)',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'oldPath <string> | <Buffer> | <URL>',
          'newPath <string> | <Buffer> | <URL>',
          'Returns: <Promise> Fulfills with undefined upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Renames oldPath to newPath.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.rmdir(path[, options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'path <string> | <Buffer> | <URL>',
          'options <Object> There are currently no options exposed. There used to be options for recursive, maxBusyTries, and emfileWait but they were deprecated and removed. The options argument is still accepted for backwards compatibility but it is not used.',
          'Returns: <Promise> Fulfills with undefined upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Removes the directory identified by path.',
      },
      {
        type: 'paragraph',
        text: 'Using fsPromises.rmdir() on a file (not a directory) results in the promise being rejected with an ENOENT error on Windows and an ENOTDIR error on POSIX.',
      },
      {
        type: 'paragraph',
        text: 'To get a behavior similar to the rm -rf Unix command, use fsPromises.rm() with options { recursive: true, force: true }.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.rm(path[, options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'path <string> | <Buffer> | <URL>',
          'options <Object> * force <boolean> When true, exceptions will be ignored if path does not exist. Default: false. * maxRetries <integer> If an EBUSY, EMFILE, ENFILE, ENOTEMPTY, or EPERM error is encountered, Node.js will retry the operation with a linear backoff wait of retryDelay milliseconds longer on each try. This option represents the number of retries. This option is ignored if the recursive option is not true. Default: 0. * recursive <boolean> If true, perform a recursive directory removal. In recursive mode operations are retried on failure. Default: false. * retryDelay <integer> The amount of time in milliseconds to wait between retries. This option is ignored if the recursive option is not true. Default: 100.',
          'Returns: <Promise> Fulfills with undefined upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Removes files and directories (modeled on the standard POSIX rm utility).',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.stat(path[, options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'path <string> | <Buffer> | <URL>',
          'options <Object> * bigint <boolean> Whether the numeric values in the returned <fs.Stats> object should be bigint. Default: false. * throwIfNoEntry <boolean> Whether an exception will be thrown if no file system entry exists, rather than returning undefined. Default: true. * signal <AbortSignal> An AbortSignal to cancel the operation. Default: undefined.',
          'Returns: <Promise> Fulfills with the <fs.Stats> object for the given path.',
        ],
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.statfs(path[, options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'path <string> | <Buffer> | <URL>',
          'options <Object> * bigint <boolean> Whether the numeric values in the returned <fs.StatFs> object should be bigint. Default: false.',
          'Returns: <Promise> Fulfills with the <fs.StatFs> object for the given path.',
        ],
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.symlink(target, path[, type])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'target <string> | <Buffer> | <URL>',
          'path <string> | <Buffer> | <URL>',
          'type <string> | <null> Default: null',
          'Returns: <Promise> Fulfills with undefined upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Creates a symbolic link.',
      },
      {
        type: 'paragraph',
        text: "The type argument is only used on Windows platforms and can be one of 'dir', 'file', or 'junction'. If the type argument is null, Node.js will autodetect target type and use 'file' or 'dir'. If the target does not exist, 'file' will be used. Windows junction points require the destination path to be absolute. When using 'junction', the target argument will automatically be normalized to absolute path. Junction points on NTFS volumes can only point to directories.",
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.truncate(path[, len])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'path <string> | <Buffer> | <URL>',
          'len <integer> Default: 0',
          'Returns: <Promise> Fulfills with undefined upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Truncates (shortens or extends the length) of the content at path to len bytes.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.unlink(path)',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'path <string> | <Buffer> | <URL>',
          'Returns: <Promise> Fulfills with undefined upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'If path refers to a symbolic link, then the link is removed without affecting the file or directory to which that link refers. If the path refers to a file path that is not a symbolic link, the file is deleted. See the POSIX unlink(2) documentation for more detail.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.utimes(path, atime, mtime)',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'path <string> | <Buffer> | <URL>',
          'atime <number> | <string> | <Date>',
          'mtime <number> | <string> | <Date>',
          'Returns: <Promise> Fulfills with undefined upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Change the file system timestamps of the object referenced by path.',
      },
      {
        type: 'paragraph',
        text: 'The atime and mtime arguments follow these rules:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          "Values can be either numbers representing Unix epoch time, Dates, or a numeric string like '123456789.0'.",
          'If the value can not be converted to a number, or is NaN, Infinity, or -Infinity, an Error will be thrown.',
        ],
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.watch(filename[, options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'filename <string> | <Buffer> | <URL>',
          "options <string> | <Object> * persistent <boolean> Indicates whether the process should continue to run as long as files are being watched. Default: true. * recursive <boolean> Indicates whether all subdirectories should be watched, or only the current directory. This applies when a directory is specified, and only on supported platforms (See caveats). Default: false. * encoding <string> Specifies the character encoding to be used for the filename passed to the listener. Default: 'utf8'. * signal <AbortSignal> An <AbortSignal> used to signal when the watcher should stop. * maxQueue <number> Specifies the number of events to queue between iterations of the <AsyncIterator> returned. Default: 2048. * overflow <string> Either 'ignore' or 'error' when there are more events to be queued than maxQueue allows. 'ignore' means overflow events are dropped and a warning is emitted, while 'error' means to throw an exception. Default: 'ignore'. * ignore <string> | <RegExp> | <Function> | <Array> Pattern(s) to ignore. Strings are glob patterns (using minimatch), RegExp patterns are tested against the filename, and functions receive the filename and return true to ignore. Default: undefined.",
          'Returns: <AsyncIterator> of objects with the properties: * eventType <string> The type of change * filename <string> | <Buffer> | <null> The name of the file changed.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Returns an async iterator that watches for changes on filename, where filename is either a file or a directory.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const { watch } = require('node:fs/promises');\n\nconst ac = new AbortController();\nconst { signal } = ac;\nsetTimeout(() => ac.abort(), 10000);\n\n(async () => {\n  try {\n    const watcher = watch(__filename, { signal });\n    for await (const event of watcher)\n      console.log(event);\n  } catch (err) {\n    if (err.name === 'AbortError')\n      return;\n    throw err;\n  }\n})();",
        },
      },
      {
        type: 'paragraph',
        text: "On most platforms, 'rename' is emitted whenever a filename appears or disappears in the directory.",
      },
      {
        type: 'paragraph',
        text: 'All the caveats for fs.watch() also apply to fsPromises.watch().',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.writeFile(file, data[, options])',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'file <string> | <Buffer> | <URL> | <FileHandle> filename or FileHandle',
          'data <string> | <Buffer> | <TypedArray> | <DataView> | <AsyncIterable> | <Iterable>',
          "options <Object> | <string> * encoding <string> | <null> Default: 'utf8' * mode <integer> Default: 0o666 * flag <string> See support of file system flags. Default: 'w'. * flush <boolean> If all data is successfully written to the file, and flush is true, filehandle.sync() is used to flush the data. Default: false. * signal <AbortSignal> allows aborting an in-progress writeFile",
          'Returns: <Promise> Fulfills with undefined upon success.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Asynchronously writes data to a file, replacing the file if it already exists. data can be a string, a buffer, an <AsyncIterable>, or an <Iterable> object.',
      },
      {
        type: 'paragraph',
        text: 'The encoding option is ignored if data is a buffer.',
      },
      {
        type: 'paragraph',
        text: 'If options is a string, then it specifies the encoding.',
      },
      {
        type: 'paragraph',
        text: 'The mode option only affects the newly created file. See fs.open() for more details.',
      },
      {
        type: 'paragraph',
        text: 'Any specified <FileHandle> has to support writing.',
      },
      {
        type: 'paragraph',
        text: 'It is unsafe to use fsPromises.writeFile() multiple times on the same file without waiting for the promise to be settled.',
      },
      {
        type: 'paragraph',
        text: 'Similarly to fsPromises.readFile - fsPromises.writeFile is a convenience method that performs multiple write calls internally to write the buffer passed to it. For performance sensitive code consider using fs.createWriteStream() or filehandle.createWriteStream().',
      },
      {
        type: 'paragraph',
        text: 'It is possible to use an <AbortSignal> to cancel an fsPromises.writeFile(). Cancelation is "best effort", and some amount of data is likely still to be written.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { writeFile } from 'node:fs/promises';\nimport { Buffer } from 'node:buffer';\n\ntry {\n  const controller = new AbortController();\n  const { signal } = controller;\n  const data = new Uint8Array(Buffer.from('Hello Node.js'));\n  const promise = writeFile('message.txt', data, { signal });\n\n  // Abort the request before the promise settles.\n  controller.abort();\n\n  await promise;\n} catch (err) {\n  // When a request is aborted - err is an AbortError\n  console.error(err);\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Aborting an ongoing request does not abort individual operating system requests but rather the internal buffering fs.writeFile performs.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'fsPromises.constants',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Type: <Object>'],
      },
      {
        type: 'paragraph',
        text: 'Returns an object containing commonly used constants for file system operations. The object is the same as fs.constants. See FS constants for more details.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
