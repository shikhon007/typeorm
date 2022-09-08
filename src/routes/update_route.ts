import express from "express";
import { NewUser } from "../entities/NewUser";
import dataSource from "../../dataSource";
const router = express.Router();



const userRepository =  dataSource.getRepository(NewUser);

router.post('/',async(req,res) => {
    try {
        
         const {firstname,lastname,username,image} = req.body;
         console.log(image);
         
         // const user     = new NewUser();
         
         // user.firstname = firstname;
         // user.lastname  = lastname;
         // user.username  = username;
         // user.image     = image;
         //    //user.isAdmin   = isAdmin;
         // await userRepository.save(user);
         // return res.status(200).json(user);


     } catch (error) {
        res.json({"message": `${error.message}`})
        console.log({"message": `${error.message}`})
     }
          
});

router.get("/",async(req,res) => {

    try {
      const newUser = await userRepository.find();
      newUser.map((updateUser) => {
         let {image} = updateUser;
         const u8 = new Uint8Array(image);
         const b64 = Buffer.from(u8).toString('base64');
         updateUser.imageBase64 = b64;
         return updateUser.imageBase64;
      })
      res.status(200).json({
         newUser
      });
    } catch (error) {
      console.log(error);
    }


})



export default router;