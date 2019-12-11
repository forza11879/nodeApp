exports.getWebApi = async (req, res) => {
  try {
    const { symbol } = req.params;

    console.log('on entry req.params.symbol: ', symbol);
    console.log(typeof symbol);

    const apiKeyAlpha = process.env.API_KEY_ALPHAVANTAGE;

    const urlCompact = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${apiKeyAlpha}`;

    const webApiData = await Db.fetchWebApiStock(urlCompact);
    await Db.creatUpdateStock(symbol, webApiData);

    const pipeline = [
      {
        $match: {
          'ns.db': 'myapp',
          'ns.coll': 'stocks',
          'fullDocument.symbol': symbol,
        },
      },
    ];

    const options = { fullDocument: 'updateLookup' };
    const changeStream = Stock.watch(pipeline, options);

    changeStream.on('change', change => {
      console.log('req.params.symbol in change: ', symbol);

      const { fullDocument } = change;

      const logData = fullDocument.data.map(item => ({
        date: parseFloat(item.date),
        open: parseFloat(item.open),
        high: parseFloat(item.high),
        low: parseFloat(item.low),
        close: parseFloat(item.close),
        volume: parseInt(item.volume),
      }));

      // pusher.trigger(channel, 'AnyEvent', {
      //   chartData: logData,
      //   symbol: fullDocument.symbol,
      // });
    });

    res.send(webApiData);
  } catch (ex) {
    console.log('getWebApi error:', ex);
  }
};
