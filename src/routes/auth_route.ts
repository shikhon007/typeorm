import express from "express";
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
import {User} from "../entities/User";
const bcript = require('bcrypt');
import dataSource from "../../dataSource";


router.post('/', async(req,res) => {

    try {

        const userRepository = dataSource.getRepository(User);
        const {username,password} = req.body;

        
        let user =   await userRepository.findOne({
            where: {
                username: username
            }
        });
        
        if(!user){
             res.status(400).json({"message": "Invalid Email or Password"});
        }else{
              
                const validPassword = await bcript.compare(password,user.password);
                if(!validPassword) {
                res.status(400).send({"message": "***Invalid Email or Password"});
                }else{
                    const token = user.generateAutToken();
                    //const token = jwt.sign({id:validUser.user_id}, config.get('jwtPrivateKey'));
                    res.status(200).send(token);
                    //res.status(200).json({"message": "true"});
                }
            }
        

        
    } catch (error) {
        console.log({"message": `${error.message}`})
    }


})


export default router;