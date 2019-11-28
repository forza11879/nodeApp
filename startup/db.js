const mongoose = require('mongoose');

// VERIFY async/await
module.exports.connectDb = async () => {
  try {
    const uri = 'mongodb://localhost:27017/myapp?replicaSet=rs0';
    const options = {
      socketTimeoutMS: 30000, // Close sockets after 30 seconds of inactivity
      keepAlive: true, // is true by default since mongoose 5.2.0.
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500, // Reconnect every 500ms
      poolSize: 10, // Maintain up to 10 socket connections
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
      //   autoIndex: false, // By default, mongoose will automatically build indexes defined in your schema when it connects. This is great for development, but not ideal for large production deployments, because index builds can cause performance degradation. If you set autoIndex to false, mongoose will not automatically build indexes for any model associated with this connection.
    };
    await mongoose.connect(uri, options);

    mongoose.connection.on('error', err => {
      console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
    });
  } catch (err) {
    console.error(`Error connectDb: ${err}`);
  }
};
