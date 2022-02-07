"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empleados = void 0;
class empleados {
    constructor(personalInfo, jobInfo, Empleado_id) {
        this.Empleado_id = '0';
        this.personalInfo = personalInfo;
        this.jobInfo = jobInfo;
        this.createdAt = new Date();
        if (Empleado_id) {
            this.Empleado_id = Empleado_id;
        }
    }
}
exports.empleados = empleados;
