const Db = require('../db/models/List');

exports.getWebApiList = async (req, res) => {
  try {
    const curValue = req.params.symbol;
    const apiKey = process.env.API_TOKEN_QUOTE;
    const urlCompact = `https://cloud.iexapis.com/beta/stock/${curValue}/quote?token=${apiKey}`;

    let urlArray = await Db.generateUrlArrayList({}, { _id: 0 });

    if (!urlArray.includes(urlCompact)) urlArray.push(urlCompact);

    await Promise.all(
      urlArray.map(async url => {
        const data = await Db.fetchWebApiList(url);
        await Db.saveToDbList(data);
      })
    );

    const dataFromDB = await Db.fetchDataFromDbList({}, { _id: 0 });

    res.send(dataFromDB);
  } catch (ex) {
    // example of nice error handling - 500 Internal Server Error
    res.status(500).send(`getWebApiList: ${ex}`);
  }
};
