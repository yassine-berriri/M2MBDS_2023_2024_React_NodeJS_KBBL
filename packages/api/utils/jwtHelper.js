const jwt = require('jsonwebtoken');
const SECRET_KEY = "16b92c70852025726a3bc61c7b6756ac38c0f638aa259dad1fb5dc29724717eb"; 
const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
        expiresIn: '1h'
    });
};
const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};
module.exports = { generateToken, verifyToken };