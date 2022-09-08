import { Entity,Column,PrimaryGeneratedColumn} from "typeorm";
const jwt = require("jsonwebtoken");
const config = require('config');
@Entity('user_manager')
export class User {

    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({
        unique: true,
        length: 255
    })
    username: string;

    @Column({
        length: 255
    })
    firstname: string;

    @Column({
        length: 255
    })
    lastname: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column({
        length: 255
    })
    password: string;

   
    // @Column({
    //     type: 'boolean',
    //     default: false,
    // })
    // isAdmin: boolean;

    generateAutToken(){
        const token = jwt.sign({id:this.user_id,username:this.username}, config.get('jwtPrivateKey'));
        return token;
    }
    
}


