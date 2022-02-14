"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidosModel = void 0;
/* eslint linebreak-style: ["error", "unix"] */
const mongoose_1 = require("mongoose");
const PedidosSchema = new mongoose_1.Schema({
    id: { type: String },
    Socio: { type: String },
    Pelicula: { type: String },
    Empleado: { type: String },
    Tiempo: { type: Number },
    createdAt: { type: Date },
    devuelto: { type: Boolean },
    precio: { type: Number }
});
exports.PedidosModel = (0, mongoose_1.model)('pedidos', PedidosSchema);
