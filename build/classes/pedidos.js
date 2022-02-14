"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pedidos = void 0;
class pedidos {
    constructor(Socio, Pelicula, Empleado, Tiempo, precio, id) {
        this.createdAt = new Date();
        this.devuelto = false;
        this.Socio = Socio;
        this.Pelicula = Pelicula;
        this.Empleado = Empleado;
        this.Tiempo = Tiempo;
        this.id = id;
        this.precio = precio;
    }
}
exports.pedidos = pedidos;
