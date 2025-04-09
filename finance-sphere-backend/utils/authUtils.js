const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const userModel=require('../Models/user')


const findUserByEmail = async (email) => {
    const user = await userModel.findOne({ email });
    return user;
};
const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 8); 
    return hashedPassword;
};


const comparePasswords = async (enteredPassword, storedPassword) => {
    const isMatch = await bcrypt.compare(enteredPassword, storedPassword);
    return isMatch;
};


const generateJwtToken = (user) => {
    const token = jwt.sign(
        { email: user.email, _id: user._id }, // Payload
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
};

module.exports = { findUserByEmail, hashPassword, comparePasswords, generateJwtToken };