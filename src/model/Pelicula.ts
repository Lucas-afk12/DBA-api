/* eslint linebreak-style: ["error", "unix"] */
import { Schema, model } from 'mongoose';


const PeliculaSchema = new Schema({

    id:{type:String},
    Titulo:{type:String},
    Autor:{type:String},
    Genero:{type:String},
    Duracion:{type:Number},
    Año:{type:Date},
    Created_At : {type:Date}
})

export const PeliculasModel = model('peliculas', PeliculaSchema);