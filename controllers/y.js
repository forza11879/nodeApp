Project.aggregate([
  { $match: condition },
  { $group: { _id: '$_id' } },
  {
    $lookup: {
      from: 'worksheets',
      let: { projectId: '$_id' },
      pipeline: [
        { $match: { $expr: { $eq: ['$projectId', '$$projectId'] } } },
        { $group: { _id: '$projectId', totalHours: { $sum: '$hours' } } },
        {
          $lookup: {
            from: 'projects',
            let: { projectId: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$_id', '$$projectId'] } } },
              {
                $lookup: {
                  from: 'developers',
                  let: { developers: '$developers' },
                  pipeline: [
                    { $match: { $expr: { $in: ['$_id', '$$developers'] } } }
                  ],
                  as: 'developers'
                }
              },
              {
                $project: {
                  projectName: 1,
                  upworkdId: 1,
                  status: 1,
                  developers: 1,
                  hoursApproved: 1
                }
              }
            ],
            as: 'project'
          }
        }
      ],
      as: 'projects'
    }
  }
]);
