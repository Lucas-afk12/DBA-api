"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocioModel = void 0;
/* eslint linebreak-style: ["error", "unix"] */
const mongoose_1 = require("mongoose");
const SocioSchema = new mongoose_1.Schema({
    createdAt: { type: Date },
    personalInfo: { type: Object },
    filmsInfo: { type: Object },
    puntos: { type: Object },
    Socios_id: { type: String },
});
exports.SocioModel = (0, mongoose_1.model)('socios', SocioSchema);
