db.party.aggregate([
  {
    $lookup: {
      from: 'address',
      localField: '_id',
      foreignField: 'party_id',
      as: 'address'
    }
  },
  {
    $unwind: {
      path: '$address',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $lookup: {
      from: 'addressComment',
      localField: 'address._id',
      foreignField: 'address_id',
      as: 'address.addressComment'
    }
  },
  {
    $group: {
      _id: '$_id',
      name: { $first: '$name' },
      address: { $push: '$address' }
    }
  },
  {
    $project: {
      _id: 1,
      name: 1,
      address: {
        $filter: {
          input: '$address',
          as: 'a',
          cond: { $ifNull: ['$$a._id', false] }
        }
      }
    }
  }
]);
