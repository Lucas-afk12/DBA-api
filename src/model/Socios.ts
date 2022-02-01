/* eslint linebreak-style: ["error", "unix"] */
import { Schema, createConnection, model } from 'mongoose';

let autoIncrement = require('mongoose-auto-increment');

var connection = createConnection("'mongodb+srv://Lucas1:Salmeron1@cluster0.x9iuu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'");

autoIncrement.initialize(connection);

const SocioSchema = new Schema({
createdAt:{type:Date},
personalInfo:{type:Object},
filmsInfo:{type:Object},
puntos:{type:Object},
Socios_id:{type:Number},
})

SocioSchema.plugin(autoIncrement.plugin, { model: 'socios', field: 'Socios_id' });

export const SocioModel = model('socios', SocioSchema);