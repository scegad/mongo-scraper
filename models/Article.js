import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Article title is Required"
  },
  link: {
    type: String,
    trim: true,
    required: "Article link is Required"
  },
  body: {
    type: String,
    trim: true,
    required: false
  },
  fingerprint: {
    type: String,
    trim: true,
    required: false,
    index: true
  },
  dateSaved: {
    type: Date,
    default: Date.now
  }
});

// Define the following custom instance methods here

// 1. setFullName: sets the current user's `fullName` property to their lastName appended to their `firstName`

// ArticleSchema.methods.setFullName = function () {
//   console.log("In setFullName(). First name: " + this.firstName + " Last name: " + this.lastName);
//   this.fullName = this.firstName + " " + this.lastName;
//   return this.fullName;
// };

// // 2. lastUpdatedDate: sets the current user's `lastUpdated` property to Date.now()

// UserSchema.methods.lastUpdatedDate = function () {
//   this.lastUpdated = Date.now();
//   return this.lastUpdated;
// };

// This creates our model from the above schema, using mongoose's model method
const ArticleModel = mongoose.model("Article", ArticleSchema);

// Export the User model
export default ArticleModel;
