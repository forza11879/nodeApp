req.params.symbol MIDL:  undefined
req.params MIDL:  {}
req MIDL:  <ref *2> IncomingMessage {
  _readableState: ReadableState {
    objectMode: false,
    highWaterMark: 16384,
    buffer: BufferList { head: null, tail: null, length: 0 },
    length: 0,
    pipes: [],
    flowing: null,
    ended: true,
    endEmitted: false,
    reading: false,
    sync: true,
    needReadable: false,
    emittedReadable: false,
    readableListening: false,
    resumeScheduled: false,
    errorEmitted: false,
    emitClose: true,
    autoDestroy: false,
    destroyed: false,
    defaultEncoding: 'utf8',
    awaitDrainWriters: null,
    multiAwaitDrain: false,
    readingMore: true,
    decoder: null,
    encoding: null,
    [Symbol(kPaused)]: null
  },
  readable: true,
  _events: [Object: null prototype] {
    end: [Function: resetHeadersTimeoutOnReqEnd]
  },
  _eventsCount: 1,
  _maxListeners: undefined,
  socket: <ref *1> Socket {
    connecting: false,
    _hadError: false,
    _parent: null,
    _host: null,
    _readableState: ReadableState {
      objectMode: false,
      highWaterMark: 16384,
      buffer: BufferList { head: null, tail: null, length: 0 },
      length: 0,
      pipes: [],
      flowing: true,
      ended: false,
      endEmitted: false,
      reading: true,
      sync: false,
      needReadable: true,
      emittedReadable: false,
      readableListening: false,
      resumeScheduled: false,
      errorEmitted: false,
      emitClose: false,
      autoDestroy: false,
      destroyed: false,
      defaultEncoding: 'utf8',
      awaitDrainWriters: null,
      multiAwaitDrain: false,
      readingMore: false,
      decoder: null,
      encoding: null,
      [Symbol(kPaused)]: false
    },
    readable: true,
    _events: [Object: null prototype] {
      end: [Array],
      timeout: [Function: socketOnTimeout],
      data: [Function: bound socketOnData],
      error: [Array],
      close: [Array],
      drain: [Function: bound socketOnDrain],
      resume: [Function: onSocketResume],
      pause: [Function: onSocketPause]
    },
    _eventsCount: 8,
    _maxListeners: undefined,
    _writableState: WritableState {
      objectMode: false,
      highWaterMark: 16384,
      finalCalled: false,
      needDrain: false,
      ending: false,
      ended: false,
      finished: false,
      destroyed: false,
      decodeStrings: false,
      defaultEncoding: 'utf8',
      length: 0,
      writing: false,
      corked: 0,
      sync: false,
      bufferProcessing: false,
      onwrite: [Function: bound onwrite],
      writecb: null,
      writelen: 0,
      afterWriteTickInfo: null,
      bufferedRequest: null,
      lastBufferedRequest: null,
      pendingcb: 0,
      prefinished: false,
      errorEmitted: false,
      emitClose: false,
      autoDestroy: false,
      errored: false,
      bufferedRequestCount: 0,
      corkedRequestsFree: [Object]
    },
    writable: true,
    allowHalfOpen: true,
    _sockname: null,
    _pendingData: null,
    _pendingEncoding: '',
    server: Server {
      maxHeaderSize: undefined,
      insecureHTTPParser: undefined,
      _events: [Object: null prototype],
      _eventsCount: 5,
      _maxListeners: undefined,
      _connections: 1,
      _handle: [TCP],
      _usingWorkers: false,
      _workers: [],
      _unref: false,
      allowHalfOpen: true,
      pauseOnConnect: false,
      httpAllowHalfOpen: false,
      timeout: 0,
      keepAliveTimeout: 5000,
      maxHeadersCount: null,
      headersTimeout: 60000,
      _connectionKey: '6::::3000',
      [Symbol(IncomingMessage)]: [Function: IncomingMessage],
      [Symbol(ServerResponse)]: [Function: ServerResponse],
      [Symbol(kCapture)]: false,
      [Symbol(asyncId)]: 139,
      [Symbol(kUsedByWebSocketServer)]: true
    },
    _server: Server {
      maxHeaderSize: undefined,
      insecureHTTPParser: undefined,
      _events: [Object: null prototype],
      _eventsCount: 5,
      _maxListeners: undefined,
      _connections: 1,
      _handle: [TCP],
      _usingWorkers: false,
      _workers: [],
      _unref: false,
      allowHalfOpen: true,
      pauseOnConnect: false,
      httpAllowHalfOpen: false,
      timeout: 0,
      keepAliveTimeout: 5000,
      maxHeadersCount: null,
      headersTimeout: 60000,
      _connectionKey: '6::::3000',
      [Symbol(IncomingMessage)]: [Function: IncomingMessage],
      [Symbol(ServerResponse)]: [Function: ServerResponse],
      [Symbol(kCapture)]: false,
      [Symbol(asyncId)]: 139,
      [Symbol(kUsedByWebSocketServer)]: true
    },
    parser: HTTPParser {
      '0': [Function: parserOnHeaders],
      '1': [Function: parserOnHeadersComplete],
      '2': [Function: parserOnBody],
      '3': [Function: parserOnMessageComplete],
      '4': [Function: bound onParserExecute],
      _headers: [],
      _url: '',
      socket: [Circular *1],
      incoming: [Circular *2],
      outgoing: null,
      maxHeaderPairs: 2000,
      _consumed: true,
      onIncoming: [Function: bound parserOnIncoming],
      parsingHeadersStart: 0
    },
    on: [Function: socketListenerWrap],
    addListener: [Function: socketListenerWrap],
    prependListener: [Function: socketListenerWrap],
    _paused: false,
    _httpMessage: ServerResponse {
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: undefined,
      outputData: [],
      outputSize: 0,
      writable: true,
      _last: false,
      chunkedEncoding: false,
      shouldKeepAlive: true,
      useChunkedEncodingByDefault: true,
      sendDate: true,
      _removedConnection: false,
      _removedContLen: false,
      _removedTE: false,
      _contentLength: null,
      _hasBody: true,
      _trailer: '',
      finished: false,
      _headerSent: false,
      socket: [Circular *1],
      _header: null,
      _onPendingData: [Function: bound updateOutgoingData],
      _sent100: false,
      _expect_continue: false,
      req: [Circular *2],
      locals: [Object: null prototype],
      _startAt: undefined,
      _startTime: undefined,
      writeHead: [Function: writeHead],
      __onFinished: [Function],
      end: [Function: end],
      [Symbol(kCapture)]: false,
      [Symbol(kNeedDrain)]: false,
      [Symbol(corked)]: 0,
      [Symbol(kOutHeaders)]: [Object: null prototype]
    },
    _peername: { address: '::1', family: 'IPv6', port: 50575 },
    timeout: 0,
    [Symbol(asyncId)]: 208,
    [Symbol(kHandle)]: TCP {
      reading: true,
      onconnection: null,
      _consumed: true,
      [Symbol(owner)]: [Circular *1]
    },
    [Symbol(kSetNoDelay)]: false,
    [Symbol(lastWriteQueueSize)]: 0,
    [Symbol(timeout)]: Timeout {
      _idleTimeout: -1,
      _idlePrev: null,
      _idleNext: null,
      _idleStart: 4967,
      _onTimeout: null,
      _timerArgs: undefined,
      _repeat: null,
      _destroyed: true,
      [Symbol(refed)]: false,
      [Symbol(asyncId)]: 245,
      [Symbol(triggerId)]: 242
    },
    [Symbol(kBuffer)]: null,
    [Symbol(kBufferCb)]: null,
    [Symbol(kBufferGen)]: null,
    [Symbol(kCapture)]: false,
    [Symbol(kBytesRead)]: 0,
    [Symbol(kBytesWritten)]: 0
  },
  httpVersionMajor: 1,
  httpVersionMinor: 1,
  httpVersion: '1.1',
  complete: true,
  headers: {
    host: 'localhost:3000',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:74.0) Gecko/20100101 Firefox/74.0',
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.5',
    'accept-encoding': 'gzip, deflate',
    referer: 'http://localhost:3000/list',
    connection: 'keep-alive',
    cookie: 'connect.sid=s%3ANzCKHdNXhQ7oqZNJ3WnySsEO3iHFzvOB.nzcizoK0gB%2Fs42is1YdHRl0L24o9XABuFtueMNgjHfU',
    'if-none-match': 'W/"b4-llIUqRjhbJnL9QM2x8qDLmalGok"'
  },
  rawHeaders: [
    'Host',
    'localhost:3000',
    'User-Agent',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:74.0) Gecko/20100101 Firefox/74.0',
    'Accept',
    '*/*',
    'Accept-Language',
    'en-US,en;q=0.5',
    'Accept-Encoding',
    'gzip, deflate',
    'Referer',
    'http://localhost:3000/list',
    'Connection',
    'keep-alive',
    'Cookie',
    'connect.sid=s%3ANzCKHdNXhQ7oqZNJ3WnySsEO3iHFzvOB.nzcizoK0gB%2Fs42is1YdHRl0L24o9XABuFtueMNgjHfU',
    'If-None-Match',
    'W/"b4-llIUqRjhbJnL9QM2x8qDLmalGok"'
  ],
  trailers: {},
  rawTrailers: [],
  aborted: false,
  upgrade: false,
  url: '/list/add/RY',
  method: 'GET',
  statusCode: null,
  statusMessage: null,
  client: <ref *1> Socket {
    connecting: false,
    _hadError: false,
    _parent: null,
    _host: null,
    _readableState: ReadableState {
      objectMode: false,
      highWaterMark: 16384,
      buffer: BufferList { head: null, tail: null, length: 0 },
      length: 0,
      pipes: [],
      flowing: true,
      ended: false,
      endEmitted: false,
      reading: true,
      sync: false,
      needReadable: true,
      emittedReadable: false,
      readableListening: false,
      resumeScheduled: false,
      errorEmitted: false,
      emitClose: false,
      autoDestroy: false,
      destroyed: false,
      defaultEncoding: 'utf8',
      awaitDrainWriters: null,
      multiAwaitDrain: false,
      readingMore: false,
      decoder: null,
      encoding: null,
      [Symbol(kPaused)]: false
    },
    readable: true,
    _events: [Object: null prototype] {
      end: [Array],
      timeout: [Function: socketOnTimeout],
      data: [Function: bound socketOnData],
      error: [Array],
      close: [Array],
      drain: [Function: bound socketOnDrain],
      resume: [Function: onSocketResume],
      pause: [Function: onSocketPause]
    },
    _eventsCount: 8,
    _maxListeners: undefined,
    _writableState: WritableState {
      objectMode: false,
      highWaterMark: 16384,
      finalCalled: false,
      needDrain: false,
      ending: false,
      ended: false,
      finished: false,
      destroyed: false,
      decodeStrings: false,
      defaultEncoding: 'utf8',
      length: 0,
      writing: false,
      corked: 0,
      sync: false,
      bufferProcessing: false,
      onwrite: [Function: bound onwrite],
      writecb: null,
      writelen: 0,
      afterWriteTickInfo: null,
      bufferedRequest: null,
      lastBufferedRequest: null,
      pendingcb: 0,
      prefinished: false,
      errorEmitted: false,
      emitClose: false,
      autoDestroy: false,
      errored: false,
      bufferedRequestCount: 0,
      corkedRequestsFree: [Object]
    },
    writable: true,
    allowHalfOpen: true,
    _sockname: null,
    _pendingData: null,
    _pendingEncoding: '',
    server: Server {
      maxHeaderSize: undefined,
      insecureHTTPParser: undefined,
      _events: [Object: null prototype],
      _eventsCount: 5,
      _maxListeners: undefined,
      _connections: 1,
      _handle: [TCP],
      _usingWorkers: false,
      _workers: [],
      _unref: false,
      allowHalfOpen: true,
      pauseOnConnect: false,
      httpAllowHalfOpen: false,
      timeout: 0,
      keepAliveTimeout: 5000,
      maxHeadersCount: null,
      headersTimeout: 60000,
      _connectionKey: '6::::3000',
      [Symbol(IncomingMessage)]: [Function: IncomingMessage],
      [Symbol(ServerResponse)]: [Function: ServerResponse],
      [Symbol(kCapture)]: false,
      [Symbol(asyncId)]: 139,
      [Symbol(kUsedByWebSocketServer)]: true
    },
    _server: Server {
      maxHeaderSize: undefined,
      insecureHTTPParser: undefined,
      _events: [Object: null prototype],
      _eventsCount: 5,
      _maxListeners: undefined,
      _connections: 1,
      _handle: [TCP],
      _usingWorkers: false,
      _workers: [],
      _unref: false,
      allowHalfOpen: true,
      pauseOnConnect: false,
      httpAllowHalfOpen: false,
      timeout: 0,
      keepAliveTimeout: 5000,
      maxHeadersCount: null,
      headersTimeout: 60000,
      _connectionKey: '6::::3000',
      [Symbol(IncomingMessage)]: [Function: IncomingMessage],
      [Symbol(ServerResponse)]: [Function: ServerResponse],
      [Symbol(kCapture)]: false,
      [Symbol(asyncId)]: 139,
      [Symbol(kUsedByWebSocketServer)]: true
    },
    parser: HTTPParser {
      '0': [Function: parserOnHeaders],
      '1': [Function: parserOnHeadersComplete],
      '2': [Function: parserOnBody],
      '3': [Function: parserOnMessageComplete],
      '4': [Function: bound onParserExecute],
      _headers: [],
      _url: '',
      socket: [Circular *1],
      incoming: [Circular *2],
      outgoing: null,
      maxHeaderPairs: 2000,
      _consumed: true,
      onIncoming: [Function: bound parserOnIncoming],
      parsingHeadersStart: 0
    },
    on: [Function: socketListenerWrap],
    addListener: [Function: socketListenerWrap],
    prependListener: [Function: socketListenerWrap],
    _paused: false,
    _httpMessage: ServerResponse {
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: undefined,
      outputData: [],
      outputSize: 0,
      writable: true,
      _last: false,
      chunkedEncoding: false,
      shouldKeepAlive: true,
      useChunkedEncodingByDefault: true,
      sendDate: true,
      _removedConnection: false,
      _removedContLen: false,
      _removedTE: false,
      _contentLength: null,
      _hasBody: true,
      _trailer: '',
      finished: false,
      _headerSent: false,
      socket: [Circular *1],
      _header: null,
      _onPendingData: [Function: bound updateOutgoingData],
      _sent100: false,
      _expect_continue: false,
      req: [Circular *2],
      locals: [Object: null prototype],
      _startAt: undefined,
      _startTime: undefined,
      writeHead: [Function: writeHead],
      __onFinished: [Function],
      end: [Function: end],
      [Symbol(kCapture)]: false,
      [Symbol(kNeedDrain)]: false,
      [Symbol(corked)]: 0,
      [Symbol(kOutHeaders)]: [Object: null prototype]
    },
    _peername: { address: '::1', family: 'IPv6', port: 50575 },
    timeout: 0,
    [Symbol(asyncId)]: 208,
    [Symbol(kHandle)]: TCP {
      reading: true,
      onconnection: null,
      _consumed: true,
      [Symbol(owner)]: [Circular *1]
    },
    [Symbol(kSetNoDelay)]: false,
    [Symbol(lastWriteQueueSize)]: 0,
    [Symbol(timeout)]: Timeout {
      _idleTimeout: -1,
      _idlePrev: null,
      _idleNext: null,
      _idleStart: 4967,
      _onTimeout: null,
      _timerArgs: undefined,
      _repeat: null,
      _destroyed: true,
      [Symbol(refed)]: false,
      [Symbol(asyncId)]: 245,
      [Symbol(triggerId)]: 242
    },
    [Symbol(kBuffer)]: null,
    [Symbol(kBufferCb)]: null,
    [Symbol(kBufferGen)]: null,
    [Symbol(kCapture)]: false,
    [Symbol(kBytesRead)]: 0,
    [Symbol(kBytesWritten)]: 0
  },
  _consuming: false,
  _dumped: false,
  next: [Function: next],
  baseUrl: '',
  originalUrl: '/list/add/RY',
  _parsedUrl: Url {
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: null,
    query: null,
    pathname: '/list/add/RY',
    path: '/list/add/RY',
    href: '/list/add/RY',
    _raw: '/list/add/RY'
  },
  params: {},
  query: {},
  res: <ref *3> ServerResponse {
    _events: [Object: null prototype] {
      finish: [Array],
      end: [Function: onevent]
    },
    _eventsCount: 2,
    _maxListeners: undefined,
    outputData: [],
    outputSize: 0,
    writable: true,
    _last: false,
    chunkedEncoding: false,
    shouldKeepAlive: true,
    useChunkedEncodingByDefault: true,
    sendDate: true,
    _removedConnection: false,
    _removedContLen: false,
    _removedTE: false,
    _contentLength: null,
    _hasBody: true,
    _trailer: '',
    finished: false,
    _headerSent: false,
    socket: <ref *1> Socket {
      connecting: false,
      _hadError: false,
      _parent: null,
      _host: null,
      _readableState: [ReadableState],
      readable: true,
      _events: [Object: null prototype],
      _eventsCount: 8,
      _maxListeners: undefined,
      _writableState: [WritableState],
      writable: true,
      allowHalfOpen: true,
      _sockname: null,
      _pendingData: null,
      _pendingEncoding: '',
      server: [Server],
      _server: [Server],
      parser: [HTTPParser],
      on: [Function: socketListenerWrap],
      addListener: [Function: socketListenerWrap],
      prependListener: [Function: socketListenerWrap],
      _paused: false,
      _httpMessage: [Circular *3],
      _peername: [Object],
      timeout: 0,
      [Symbol(asyncId)]: 208,
      [Symbol(kHandle)]: [TCP],
      [Symbol(kSetNoDelay)]: false,
      [Symbol(lastWriteQueueSize)]: 0,
      [Symbol(timeout)]: Timeout {
        _idleTimeout: -1,
        _idlePrev: null,
        _idleNext: null,
        _idleStart: 4967,
        _onTimeout: null,
        _timerArgs: undefined,
        _repeat: null,
        _destroyed: true,
        [Symbol(refed)]: false,
        [Symbol(asyncId)]: 245,
        [Symbol(triggerId)]: 242
      },
      [Symbol(kBuffer)]: null,
      [Symbol(kBufferCb)]: null,
      [Symbol(kBufferGen)]: null,
      [Symbol(kCapture)]: false,
      [Symbol(kBytesRead)]: 0,
      [Symbol(kBytesWritten)]: 0
    },
    _header: null,
    _onPendingData: [Function: bound updateOutgoingData],
    _sent100: false,
    _expect_continue: false,
    req: [Circular *2],
    locals: [Object: null prototype] { message: undefined },
    _startAt: undefined,
    _startTime: undefined,
    writeHead: [Function: writeHead],
    __onFinished: [Function: listener] { queue: [Array] },
    end: [Function: end],
    [Symbol(kCapture)]: false,
    [Symbol(kNeedDrain)]: false,
    [Symbol(corked)]: 0,
    [Symbol(kOutHeaders)]: [Object: null prototype] {
      'x-powered-by': [Array],
      'access-control-allow-origin': [Array]
    }
  },
  _startAt: [ 178, 556490300 ],
  _startTime: 2020-03-16T16:37:47.119Z,
  _remoteAddress: '::1',
  body: {},
  _parsedOriginalUrl: Url {
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: null,
    query: null,
    pathname: '/list/add/RY',
    path: '/list/add/RY',
    href: '/list/add/RY',
    _raw: '/list/add/RY'
  },
  secret: 'mysecretwordiknow',
  cookies: {},
  signedCookies: [Object: null prototype] {
    'connect.sid': 'NzCKHdNXhQ7oqZNJ3WnySsEO3iHFzvOB'
  },
  sessionStore: Store {
    _emitter: EventEmitter {
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: undefined,
      [Symbol(kCapture)]: false
    },
    _errorHandler: [Function: bound handleError],
    client: MongoClient {
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      s: [Object],
      topology: [Server],
      [Symbol(kCapture)]: false
    },
    db: Db {
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      s: [Object],
      serverConfig: [Getter],
      bufferMaxEntries: [Getter],
      databaseName: [Getter],
      [Symbol(kCapture)]: false
    },
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    options: OptionsType {
      uri: 'mongodb://localhost:27017/myapp?replicaSet\\=rs0',
      collection: 'sessions',
      connectionOptions: [Object],
      expires: 1209600000,
      idField: '_id',
      databaseName: null
    },
    generate: [Function (anonymous)],
    [Symbol(kCapture)]: false
  },
  sessionID: 'NzCKHdNXhQ7oqZNJ3WnySsEO3iHFzvOB',
  session: Session {
    cookie: {
      path: '/',
      _expires: null,
      originalMaxAge: null,
      httpOnly: true,
      secure: null,
      domain: null,
      sameSite: null
    },
    isLoggedIn: true,
    user: {
      cash: 50000,
      equity: 50000,
      _id: 5e6fa8505701cd01ab1a408e,
      name: 'test',
      email: 'test@email.com',
      password: 'test',
      data: [Array],
      __v: 0
    }
  },
  user: {
    cash: 50000,
    equity: 50000,
    _id: 5e6fa8505701cd01ab1a408e,
    name: 'test'
  },
  [Symbol(kCapture)]: false
}