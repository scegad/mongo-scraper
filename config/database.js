import mongoose from 'mongoose';

// Database configuration

if (process.env.NODE_ENV != "production") {
  const MONGODB_URI = `mongodb://${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`;
} else {
  const MONGODB_URI = process.env.MONGODB_URI;
}

// Set Mongoose to use ES6 Promise API, and connect to DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

export default dbConfig;