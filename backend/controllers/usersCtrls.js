const User = require('../models/Users');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { use } = require('../routes/ProfesseursRts');


exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Paire login/mot de passe incorrecte' });
      }

      bcrypt.compare(req.body.password, user.password)
        .then(valid => {

          if (!valid) {
            return res.status(401).json({ error: 'Paire login/mot de passe incorrecte' });
          }
          if (user.isFirstLogin) {
            // Send a response with a redirection URL
            return res.status(200).json({ message: 'First login. Please update your password.', isFirstLogin: true, redirectUrl: '/update-password', nom: user.nom, userId: user._id });
          }
          res.status(200).json({
            userId: user._id,
            profId: user.profile,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            ),
            userRole: user.role
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


exports.updatePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newPassword } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the current password


    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password and set isFirstLogin to false
    user.password = hashedPassword;
    user.isFirstLogin = false;

    // Save the updated user
    await user.save();

    return res.status(200).json({
      message: 'Password updated successfully', userId: user._id,
      profId: user.profile,
      token: jwt.sign(
        { userId: user._id },
        'RANDOM_TOKEN_SECRET',
        { expiresIn: '24h' }
      ),
      userRole: user.role,nom:user.nom
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
exports.getUserNameById = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by userId
    const user = await User.findById(userId).populate({
      path: 'profile',
      select: 'nom' // Specify the fields to select from the populated document
    });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract and return the user's name
    const profileName = user.profile.nom;
    return res.status(200).json({ profileName });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error hhhh fetching users', error });
  }
};
