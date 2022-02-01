"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socios = void 0;
class Socios {
    constructor(personalInfo, Socios_id, filmsInfo, points) {
        this.Socios_id = 0;
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
    set AlquilatedNum(count) {
        if (this.FilmsInfo)
            this.FilmsInfo.AlquiladasCount = count;
    }
    get AlquilatedNum() {
        if (this.FilmsInfo)
            return this.FilmsInfo.AlquiladasCount;
    }
    set DevueltasNum(count) {
        if (this.FilmsInfo)
            this.FilmsInfo.DevueltasCount = count;
    }
    get DevueltasNum() {
        if (this.FilmsInfo)
            return this.FilmsInfo.DevueltasCount;
    }
}
exports.Socios = Socios;
let filmsInfoA = {
    Peliculas_alquiladas: [],
    Peliculas_devueltas: [],
    AlquiladasCount: 0,
    DevueltasCount: 0,
};
let pointsA = {
    ComprasTotales: [],
    puntosDisponibles: [],
    puntosGastados: [],
};
