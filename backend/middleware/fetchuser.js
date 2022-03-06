const jwt = require('jsonwebtoken');
const JWT_SCERET = "aks";
// This fetch user will be called wherever there is a need of authentication, just pass this fucnction
const fetchuser = (req, res, next) => {
    //get user from JWT token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using valid token" })
    }

    try {
        const data = jwt.verify(token, JWT_SCERET); // token is available in  get user data request and JWT_SCERET is hardcoded here at the moment
        req.user = data.user;// if the above verify is true then user id for that object will be returned.
        next();// this next will tell to perform next fucntion written just after this(fetchuser in this case) function 

    } catch (error) {
        res.status(401).send({ error: "Please authenticate using valid token" })
    }
}

module.exports = fetchuser;