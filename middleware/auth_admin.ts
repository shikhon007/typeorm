
function authAdmin(req:any,res:any,next:any){
         
         if(!req.user.isAdmin) return res.status(403).send("Access Denied");
         next();
}

export default authAdmin;