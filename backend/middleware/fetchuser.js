const jwt = require('jsonwebtoken');
const JWT_SECRET = "Simply Marvellous";

const fetchuser = (req, res, next) => { // next is the funvtion which after where the middleware function is used
    // Get the user from the jwt token and add id to the request
    // the value of authtoken has been sent in header content by the name of auth-token while sending the post api requesr
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;  // data.user is accessing a specific property named user within the JWT payload and here req.user is a custom made property which is here used to store the same!
        next();
    } catch (error) {
        res.status(401).send({error:"please authenticate using a valid token"})    
    }
}

module.exports = fetchuser;