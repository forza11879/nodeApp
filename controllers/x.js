exports.getWebApi = async (req, res) => {
  const db = mongoose.connection;
  const taskCollection = db.collection('stocks');
  const pipeline = [
    { fullDocument: 'updateLookup' },
    { $match: { 'fullDocument.symbol': req.params.symbol } },
  ];
  const changeStream = taskCollection.watch(
    // { fullDocument: 'updateLookup' },
    pipeline
  );
  changeStream.on('change', change => {
    console.log(`CHANGE route : ${JSON.stringify(change).green}`);
  });
};

async function run() {
  // Connect to the replica set
  const uri =
    'mongodb://localhost:31000,localhost:31001,localhost:31002/' +
    'test?replicaSet=rs0';
  await mongoose.connect(uri);

  // Create mongoose models for prices and thresholds
  const thresholdSchema = new mongoose.Schema({
    ticker: String,
    price: String,
  });
  const Threshold = mongoose.model('Threshold', thresholdSchema, 'Threshold');

  const priceSchema = new mongoose.Schema({
    ticker: String,
    price: Number,
  });
  const Price = mongoose.model('Price', priceSchema, 'Price');

  // Store the threshold in the database
  await Threshold.create({ ticker: 'MDB', price: 45 });

  let lastPrice = -1;
  // The first argument to `watch()` is an aggregation pipeline. This
  // pipeline makes sure we only get notified of changes on the 'Price'
  // collection.
  const pipeline = [{ $match: { 'ns.db': 'test', 'ns.coll': 'Price' } }];
  // const pipeline = [
  //   { $match: { 'ns.db': 'myapp', 'ns.coll': 'stocks','fullDocument.symbol': symbol } },
  // ];
  Price.watch(pipeline).on('change', async data => {
    const newPrice = data.fullDocument.price;
    if (lastPrice === -1) {
      lastPrice = newPrice;
      return;
    }
    const { ticker } = data.fullDocument;
    const $gte = Math.min(lastPrice, newPrice);
    const $lte = Math.max(lastPrice, newPrice);
    // Make sure to set `lastPrice` **before** any async logic, in case
    // another `change` event comes in before the query is done
    lastPrice = newPrice;

    const threshold = await Threshold.findOne({
      ticker,
      price: { $gte, $lte },
    });
    if (threshold != null) {
      console.log(
        new Date(),
        `Threshold for ${threshold.ticker} ` +
          `${threshold.price} crossed: ${$gte}, ${$lte}`
      );
    }
  });
}
