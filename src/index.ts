import express from "express";
const cors = require('cors');
import dataSource from "../dataSource";
import users from "./routes/user_route";
import auth from "./routes/auth_route";
import update from "./routes/update_route";
const config = require('config');
const app = express();




if(!config.get("jwtPrivateKey")){
    console.error("FATAL ERROR: jwtPrivateKey is not defind");
    process.exit(1);
}


const connect = async() => {
    
    try {
        await dataSource.initialize();
        console.log("postgres database is connected...");
        
    } catch (err) {
        console.log(err);
    }
    
    
    
}

connect();


app.use(express.json({limit: "10mb"}));




app.use(cors());
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/api/update',update);



const PORT = process.env.PORT || 8000;
app.listen(PORT,()=> console.log(`listen to ${PORT}...`));
