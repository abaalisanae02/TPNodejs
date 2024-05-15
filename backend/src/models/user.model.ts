import { Schema, model } from "mongoose";

export interface User{
    id:string;
    name:string;
    username:string;
    password:string;
}

export const UserSchema= new Schema<User>({
    name:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
},{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    },
    timestamps:true
});

export const UserModel=model<User>('user',UserSchema);