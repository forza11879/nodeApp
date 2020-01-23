import mongoose from 'mongoose';

// VERIFY async/await
export const connectDb = async () => {
  try {
    // const uri = 'mongodb://localhost:27017/myapp?replicaSet=rs0';
    const uri = process.env.MONGODB_URL;
    const options = {
      socketTimeoutMS: 30000, // Close sockets after 30 seconds of inactivity
      keepAlive: true, // is true by default since mongoose 5.2.0.
      // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      // reconnectInterval: 500, // Reconnect every 500ms
      poolSize: 10, // Maintain up to 10 socket connections
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
      //   autoIndex: false, // By default, mongoose will automatically build indexes defined in your schema when it connects. This is great for development, but not ideal for large production deployments, because index builds can cause performance degradation. If you set autoIndex to false, mongoose will not automatically build indexes for any model associated with this connection.
    };
    mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
    // Connect to our Database and handle any bad connections

    await mongoose.connect(uri, options);
    // await mongoose.connect(uri, options, { replicaSet: 'rs0' });

    const db = mongoose.connection;

    db.on('error', err => {
      console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
    });
  } catch (err) {
    console.error(`Error connectDb: ${err}`);
  }
};

// https://blog.cloudboost.io/waiting-for-db-connections-before-app-listen-in-node-f568af8b9ec9

// setting up replica set mongoose https://thecodebarbarian.com/stock-price-notifications-with-mongoose-and-mongodb-change-streams
