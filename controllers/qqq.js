db.party.aggregate([
  {
    $lookup: {
      from: 'address',
      let: { partyId: '$_id' },
      pipeline: [
        { $match: { $expr: { $eq: ['$party_id', '$$partyId'] } } },
        {
          $lookup: {
            from: 'addressComment',
            let: { addressId: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$address_id', '$$addressId'] } } }
            ],
            as: 'address'
          }
        }
      ],
      as: 'address'
    }
  },
  { $unwind: '$address' }
]);

const portfolioList = await Portfolio.aggregate([
  { $match: { userId: userId } },
  {
    $lookup: {
      from: 'stocks', // collection name in db
      localField: 'symbolId',
      let: { symbolId: '$symbolId' },
      pipeline: [
        { $match: { $expr: { $eq: ['$_id', '$$symbolId'] } } },
        {
          $lookup: {
            from: 'transactions', // collection name in db
            localField: '_id',
            let: { stockId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$symbolId', '$$stockId'], orderType: 'buy' }
                }
              },
              {
                $group: {
                  _id: { orderType: '$orderType' },
                  totalBuyTradeAmount: {
                    $sum: { $multiply: ['$price', '$qty'] }
                  }
                }
              }
            ],
            as: 'transactionDb'
          }
        }
      ],
      as: 'symbolDb'
    }
  }
]);
