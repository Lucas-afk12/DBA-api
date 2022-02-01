"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocioModel = void 0;
/* eslint linebreak-style: ["error", "unix"] */
const mongoose_1 = require("mongoose");
let autoIncrement = require('mongoose-auto-increment');
var connection = (0, mongoose_1.createConnection)("'mongodb+srv://Lucas1:Salmeron1@cluster0.x9iuu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'");
autoIncrement.initialize(connection);
const SocioSchema = new mongoose_1.Schema({
    createdAt: { type: Date },
    personalInfo: { type: Object },
    filmsInfo: { type: Object },
    puntos: { type: Object },
    Socios_id: { type: Number },
});
SocioSchema.plugin(autoIncrement.plugin, { model: 'socios', field: 'Socios_id' });
exports.SocioModel = (0, mongoose_1.model)('socios', SocioSchema);
