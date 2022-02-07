"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpleadosModel = void 0;
/* eslint linebreak-style: ["error", "unix"] */
const mongoose_1 = require("mongoose");
const EmpleadoSchema = new mongoose_1.Schema({
    createdAt: { type: Date },
    personalInfo: { type: Object },
    jobInfo: { type: Object },
    Empleado_id: { type: String },
});
exports.EmpleadosModel = (0, mongoose_1.model)('empleados', EmpleadoSchema);
