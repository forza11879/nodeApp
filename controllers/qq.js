db.orders.aggregate([
  {
    $lookup: {
      from: 'items',
      localField: 'item', // field in the orders collection
      foreignField: 'item', // field in the items collection
      as: 'fromItems'
    }
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: [{ $arrayElemAt: ['$fromItems', 0] }, '$$ROOT']
      }
    }
  },
  { $project: { fromItems: 0 } }
]);
