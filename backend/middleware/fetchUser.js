var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodboy';

const fetchUser = (req, res, next) =>{
    //get the user from the auth-token and add it to the request object

    const token=req.header('auth-token');// this is the token passed in the header of the request

    if(!token){
        res.status(401).json({error:"Please authenticate with a valid token"})
    }

    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({error:"Please authenticate with a valid token"})
    }
  
}

module.exports = fetchUser;