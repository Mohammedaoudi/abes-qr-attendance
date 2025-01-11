const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin','Professeurs','Students'] },
  profile: { type: mongoose.Schema.Types.ObjectId, refPath: 'role' },
  isFirstLogin: { type: Boolean, default: false }, // Flag to indicate if the password has been updated
});

userSchema.pre('save', async function(next) {
  // Check if the document is newly created and the password is modified
  if (this.isNew && this.isModified('password')) {
    try {
      // Generate a salt for hashing
      const salt = await bcrypt.genSalt(10);
      // Hash the password with the salt
      const hashedPassword = await bcrypt.hash(this.password, salt);
      // Replace the plain password with the hashed password
      this.password = hashedPassword;
      // Set isFirstLogin to true for a new user
      this.isFirstLogin = true;
    } catch (error) {
      return next(error);
    }
  }
  next();
});



userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);