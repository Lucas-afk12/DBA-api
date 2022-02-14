"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeliculasModel = void 0;
/* eslint linebreak-style: ["error", "unix"] */
const mongoose_1 = require("mongoose");
const PeliculaSchema = new mongoose_1.Schema({
    id: { type: String },
    Titulo: { type: String },
    Autor: { type: String },
    Genero: { type: String },
    Duracion: { type: Number },
    Año: { type: Date },
    Created_At: { type: Date }
});
exports.PeliculasModel = (0, mongoose_1.model)('peliculas', PeliculaSchema);
