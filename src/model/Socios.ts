/* eslint linebreak-style: ["error", "unix"] */
import { Schema, createConnection, model } from 'mongoose';


const SocioSchema = new Schema({
createdAt:{type:Date},
personalInfo:{type:Object},
filmsInfo:{type:Object},
puntos:{type:Object},
Socios_id:{type:String},
})

export const SocioModel = model('socios', SocioSchema);