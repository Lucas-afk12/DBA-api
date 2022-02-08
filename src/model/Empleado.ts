/* eslint linebreak-style: ["error", "unix"] */
import { Schema, createConnection, model } from 'mongoose';


const EmpleadoSchema = new Schema({
createdAt:{type:Date},
personalInfo:{type:Object},
jobInfo:{type:Object},
Empleado_id:{type:String},
tipo:{type:String}
})

export const EmpleadosModel = model('empleados', EmpleadoSchema);