const  jwt =require( "jsonwebtoken");
const validateToken = (req, res, next) => {
    const accessToken = req.headers.token;
    if (!accessToken){
        res.status(400).send('Access denied');
    } else {
        jwt.verify(accessToken, 'your_secret_key', (err, user) => {
            if(err){
                res.status(400).send('Access denied, token expired or incorrect');
            } else {
                res.user = user;
                next();
            }
        });
    }
};

module.exports=validateToken;
