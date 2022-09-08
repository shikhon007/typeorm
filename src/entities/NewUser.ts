import { Entity,Column,PrimaryGeneratedColumn} from "typeorm";
const jwt = require("jsonwebtoken");
const config = require('config');
@Entity()
export class NewUser {

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
        type: "bytea",
        nullable: true
    })
    image: Buffer;

    imageBase64: string;

    generateAutToken(){
        const token = jwt.sign({id:this.user_id,username:this.username}, config.get('jwtPrivateKey'));
        return token;
    }
    
}


