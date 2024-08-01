    const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
 password : {
    type : String,
    require : true
}

}, {
  timestamps: true, 
});

// Pre-save hook to hash the password if modified or new
UserSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  });

const User = mongoose.model('User', UserSchema);

module.exports = User;
