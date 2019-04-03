const db = require("../db/models/List");

exports.getWebApiList = async (req, res) => {
  try {
    const curValue = req.params.symbol
    // const urlCompact = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${curValue}&apikey=6BUYSS9QR8Y9HH15`

    const urlCompact = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${curValue}&apikey=${process.env.API_KEY}`

    const port = process.env.PORT

    let urlArray = await db.generateUrlArrayList({}, { _id: 0 });

    if (!urlArray.includes(urlCompact)) urlArray.push(urlCompact);

    await Promise.all(
      urlArray.map(async url => {
        const data = await db.fetchWebApiList(url);
        await db.saveToDbList(data);
      })
    );

    const dataFromDB = await db.fetchDataFromDbList({}, { _id: 0 });

    res.send(dataFromDB);
  } catch (ex) {
    // example of nice error handling
    res.status(500).send(`fetchDataList: ${ex}`);
  }
};
