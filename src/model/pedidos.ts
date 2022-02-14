/* eslint linebreak-style: ["error", "unix"] */
import { Schema, model } from 'mongoose';


const PedidosSchema = new Schema({

    id:{type:String},
    Socio:{type:String},
    Pelicula:{type:String},
    Empleado:{type:String},
    Tiempo:{type:Number},
    createdAt:{type:Date},
    devuelto:{type:Boolean},
    precio:{type:Number}
})

export const PedidosModel = model('pedidos', PedidosSchema);