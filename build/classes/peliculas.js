"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pelicula = void 0;
class Pelicula {
    constructor(Titulo, Autor, Genero, Duracion, año, id) {
        this.id = "0";
        this.Titulo = Titulo;
        this.Autor = Autor;
        this.Genero = Genero;
        this.Duracion = Duracion;
        this.Año = año;
        this.Created_At = new Date;
        if (id) {
            this.id = id;
        }
    }
}
exports.Pelicula = Pelicula;
