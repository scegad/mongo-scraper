import mongoose from 'mongoose';

// Database configuration
const dbConfig = {
  databaseHost: process.env.DATABASE_HOST,
  databaseName: process.env.DATABASE_NAME
};

// Set Mongoose to use ES6 Promise API, and connect to DB
mongoose.Promise = Promise;
mongoose.connect(`mongodb://${dbConfig.databaseHost}/${dbConfig.databaseName}`);

export default dbConfig;