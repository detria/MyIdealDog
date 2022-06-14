const jwt = require("jsonwebtoken");
const validate = {}
validate.validateToken = (req, res, next) => {
    const accessToken = req.headers.token;
    if (!accessToken) {
        res.status(400).send('Access denied');
    } else {
        jwt.verify(accessToken, 'your_secret_key', (err, user) => {
            if (err) {
                res.status(400).send('Access denied, token expired or incorrect');
            } else {
                res.user = user;
                next();
            }
        });
    }
};

/**
 * 
 * @param {*} req recibe el token del usuario 
 * @param {*} res 
 * @param {*} next 
 */
validate.validateAdmin = (req, res, next) => {
    const accessToken = req.headers.token;
    if (!accessToken) {
        res.status(400).send('Access denied');
    } else {
        jwt.verify(accessToken, 'your_secret_key', (err, user) => {
            if (err) {
                res.status(400).send('Access denied, token expired or incorrect');
            } else {
                res.user = user;
                if (user.userFound.role === "admin") {
                    next();
                } else {
                    res.status(400).send('Access denied, the user is not the admin');
                }

            }
        });
    }
};


module.exports = validate;
