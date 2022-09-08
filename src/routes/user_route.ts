import express from "express";
import { User } from "../entities/User";
import dataSource from "../../dataSource";
import {UserDtos} from "../../dtos/user_dtos";
import { validate } from "class-validator";
// import authMiddle from "../../middleware/auth_middle";
// import authAdmin from "../../middleware/auth_admin";
// const jwt = require('jsonwebtoken');
// const config = require('config');
const bcript = require('bcrypt');
const router = express.Router();

const userRepository =  dataSource.getRepository(User);

router.post('/',async(req,res) => {
    try {
        
         const {firstname,lastname,email,password,username} = req.body;

         console.log(username)
         const userFound = await userRepository.find({
            where: {
               username: username
            }
         });

         if(userFound.length > 0){
            return res.status(409).json({"message":"***Username already Exist"});
         }

         const hashPassword = await bcript.hash(password,10);

         const dtos = new UserDtos();
         dtos.firstname = firstname;
         dtos.lastname  = lastname;
         dtos.username  = username;
         dtos.email     = email;
         dtos.password  = password;

         const error =  await validate(dtos);
         if(error.length > 0){
                return res.status(400).json(error);
         }

         const user     = new User();
         user.firstname = firstname;
         user.lastname  = lastname;
         user.email     = email
         user.username  = username;
         user.password  = hashPassword;
            //user.isAdmin   = isAdmin;
           
         await userRepository.save(user);
         const token = user.generateAutToken();
            //const token = jwt.sign({id:user.user_id}, config.get('jwtPrivateKey'));
         return res
            .header('x-auth-token',token)
            .header("access-control-expose-headers","x-auth-token")
            .status(200)
            .json(user);
            //res.status(200).json(user); 


     } catch (error) {
        res.json({"message": `${error.message}`})
        console.log({"message": `${error.message}`})
     }
          
});



router.get('/',async(req,res) => {

     try {
     const allUser =  await userRepository.createQueryBuilder('user').select(['user.user_id','user.firstname','user.lastname','user.email','user.username']).getMany();
     res.status(200).json(allUser);

     } catch (error) {
          console.log(error.message)
     }


});


router.delete('/:id',async(req,res) => {
    
   const {id} = req.params;
   
   const deleteUser =  await userRepository
                            .createQueryBuilder()
                            .delete()
                            .where("user_id = :id",{id: id})
                            .execute();
 
     res.json(deleteUser);

})






export default router;