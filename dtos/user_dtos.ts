import { MinLength,MaxLength, IsEmail, IsOptional } from "class-validator";

export class UserDtos {

     @MinLength(4) 
     @MaxLength(20)
     firstname: string;

     @MinLength(4) 
     @MaxLength(20)
     lastname: string;

     @MinLength(4) 
     @MaxLength(20)
     username: string;

     @IsEmail()
     email: string;

     @MinLength(8) 
     @MaxLength(249)
     password: string;

     

}