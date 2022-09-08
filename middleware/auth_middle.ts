const jwt = require('jsonwebtoken');
const config = require('config');
function authMiddle(req:any,res:any,next:any){
       const token = req.header('x-auth-token');
       console.log(token)
       if(!token) return res.status(401).send("Access Denied.No token provided");

       try {
           const decoded = jwt.varify(token,config.get('jwtPrivateKey'));
           req.user = decoded;
           next();
       } catch (error) {
          res.status(400).send("Invalid Token");
       }
}

export default authMiddle;