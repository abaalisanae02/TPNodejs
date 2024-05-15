import { Schema, model } from "mongoose";

export interface Image{
    id: string;
    name:string;
    data:string;
    contentType:string;
}

export const ImageSchema= new Schema<Image>({
    name:{type:String,required:true},
    data:{ type: String, required: true },
    contentType: { type: String, required: true }
},{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    },
    timestamps:true
});

export const ImageModel=model<Image>('image',ImageSchema);