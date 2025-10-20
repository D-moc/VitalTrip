// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const userSchema = new mongoose.Schema({
//     fullname: {
//         firstname: {
//             type: String,
//             required: true,
//             minlength: [3, 'First name must be at least 3 characters long'],
//         },
//         lastname: {
//             type: String,
//             minlength: [3, 'Last name must be at least 3 characters long'],
//         },
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         minlength: [5, 'Email must be at least 5 characters long'],
//     },      
//     password: {
//         type: String,
//         required: true,
//         select: false
//     },      
// })

// userSchema.methods.generateAuthToken = function() {
//     const token = jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
//     return token;
// }

// userSchema.methods.comparePassword = async function(Password) {
//     return await bcrypt.compare(Password, this.password);
// }

// userSchema.statics.hashPassword = async function(password) {
//     return await bcrypt.hash(password, 10);
// }

// const userModel = mongoose.model('user', userSchema);
// module.exports = userModel;


// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const userSchema = new mongoose.Schema({
//   fullname: {
//     firstname: {
//       type: String,
//       required: true,
//       minlength: [3, 'First name must be at least 3 characters long'],
//     },
//     lastname: {
//       type: String,
//       minlength: [3, 'Last name must be at least 3 characters long'],
//     },
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     minlength: [5, 'Email must be at least 5 characters long'],
//   },
//   password: {
//     type: String,
//     required: true,
//     select: false,
//   },
// });

// // ✅ Generate JWT with role
// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign(
//     { _id: this._id, email: this.email, role: 'user' }, // role added here
//     process.env.JWT_SECRET,
//     { expiresIn: '24h' }
//   );
//   return token;
// };

// userSchema.methods.comparePassword = async function (Password) {
//   return await bcrypt.compare(Password, this.password);
// };

// userSchema.statics.hashPassword = async function (password) {
//   return await bcrypt.hash(password, 10);
// };

// const userModel = mongoose.model('user', userSchema);
// module.exports = userModel;


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, 'First name must be at least 3 characters long'],
    },
    lastname: {
      type: String,
      minlength: [3, 'Last name must be at least 3 characters long'],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Email must be at least 5 characters long'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  // ✅ NEW FIELD
  profileImage: {
    type: String,
    default: "",
  },
});

// ✅ Generate JWT with role
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, role: 'user' },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  return token;
};

userSchema.methods.comparePassword = async function (Password) {
  return await bcrypt.compare(Password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
