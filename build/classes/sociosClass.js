"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socios = void 0;
class Socios {
    constructor(personalInfo, Socios_id, filmsInfo, points) {
        this.Socios_id = '';
        this.personalInfo = personalInfo;
        this.createdAt = new Date();
        if (!filmsInfo) {
            this.filmsInfo = filmsInfoA;
        }
        else {
            this.filmsInfo = filmsInfo;
        }
        if (!points) {
            this.points = pointsA;
        }
        else {
            this.points = points;
        }
        if (Socios_id) {
            this.Socios_id = Socios_id;
        }
    }
    get PersonalInfo() {
        return this.personalInfo;
    }
    get FilmsInfo() {
        return this.filmsInfo;
    }
    get CreatedAt() {
        return this.createdAt;
    }
    get Points() {
        return this.points;
    }
}
exports.Socios = Socios;
let filmsInfoA = {
    Peliculas_alquiladas: [],
    Peliculas_devueltas: [],
};
let pointsA = {
    ComprasTotales: [],
    puntosDisponibles: [],
    puntosGastados: [],
};
