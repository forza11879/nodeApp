const Db = require('../db/models/Stock');

exports.getWebApi = async (req, res) => {
  try {
    const { symbol } = req.params;

    const apiKey = process.env.API_TOKEN_QUOTE;

    const urlCompact = `https://cloud.iexapis.com/beta/stock/${symbol}/chart?token=${apiKey}`;

    const webApiData = await Db.fetchWebApi(urlCompact);
    // some business logic related to change Streams MongoDB

    res.send(webApiData);
  } catch (ex) {
    console.log(`getWebApi error: ${ex}`.red);
  }
};
