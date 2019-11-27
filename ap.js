const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
// //////
const app = express();
// routes
const stockRoute = require('./routes/stock');
// //////
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// //////
app.set('view engine', 'ejs');
app.set('views', 'views');
// //////
app.use(express.static(path.join(__dirname, 'public')));
// Mount Rout
app.use('/stock', stockRoute);
// //////
const port = process.env.PORT;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/myapp?replicaSet=rs0', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
db.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});
db.once('open', () => {
  app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
  });

  const taskCollection = db.collection('stocks');
  // const pipeline = [
  //   {
  //     $match: { "fullDocument.symbol": req.params.symbol },
  //   },
  // ];
  const changeStream = taskCollection.watch(
    { fullDocument: 'updateLookup' }
    // pipeline
  );
  changeStream.on('change', change => {
    console.log(`CHANGE : ${JSON.stringify(change)}`);
  });
});

const streamMap = new Map();

const debounceStreamExecution = (next, fn) => {
  const streamId = `${next.operationType}_${next.documentKey._id.toString()}`; // This could be your own unique representation of a stream.
  const streamItem = streamMap.get(streamId);

  if (streamItem && streamItem.timeout) {
    // Same stream came before, so stop previous execution.
    clearTimeout(streamItem.timeout);
  }

  // We merge previous updates with new ones
  const updateDescription = {
    updatedFields: {
      // Use Lodash _.merge() if you want deep merging
      ...(streamItem.updateDescription.updatedFields || {}),
      ...(next.updateDescription.updatedFields || {}),
    },
    removedFields: [].concat(
      streamItem.updateDescription.removedFields || [],
      next.updateDescription.removedFields || []
    ),
  };

  // We set our timeout to delay execution
  const timeout = setTimeout(() => {
    streamMap.delete(streamId);
    fn({
      ...next,
      updateDescription,
    });
  }, 1000 /* <-- Your delay preference */);

  // We store this stream information.
  streamMap.set(streamId, {
    updateDescription,
    timeout,
  });
};

db.collection('aCollection')
  .watch()
  .on('change', next => {
    debounceStreamExecution(next, result => {
      console.log('Single stream', result);
    });
  });
