import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

// Define a User Schema
const UserSchema = new mongoose.Schema({
    userCreated: {
      type: Date,
      default: Date.now
    }
  });

// Enable the passport-local-mongoose plugin on the User Schema
// The plugin adds username, hash, and salt properties to the Schema,
// along with defining some helpful auth-related methods on the User model
UserSchema.plugin(passportLocalMongoose);

// Create a User Model from the above-defined Schema
const UserModel = mongoose.model("User", UserSchema);

// Export the User model
export default UserModel;
