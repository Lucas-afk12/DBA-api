"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const Socios_1 = require("../model/Socios");
const database_1 = require("../database/database");
const sociosClass_1 = require("../classes/sociosClass");
const empleadosClass_1 = require("../classes/empleadosClass");
const Empleado_1 = require("../model/Empleado");
const peliculas_1 = require("../classes/peliculas");
const Pelicula_1 = require("../model/Pelicula");
const pedidos_1 = require("../classes/pedidos");
const pedidos_2 = require("../model/pedidos");
class DatoRoutes {
    constructor() {
        this.getSocios = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db
                .conectarBD()
                .then((b) => __awaiter(this, void 0, void 0, function* () {
                console.log(b);
                let query = yield Socios_1.SocioModel.find({});
                res.send(query);
            }))
                .catch((error) => console.log(error));
            database_1.db.desconectarBD();
        });
        this.postSocios = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD().then(() => __awaiter(this, void 0, void 0, function* () {
                let id = yield this.checklast('Socios');
                let EmpleadosReceived = req.body;
                let fecha = this.getDate(req.body.dia, req.body.mes, req.body.año);
                let personalInfo = {
                    Nombre: EmpleadosReceived.Nombre,
                    Apellidos: EmpleadosReceived.Apellidos,
                    Email: EmpleadosReceived.Email,
                    FechaDeNacimiento: fecha,
                    Direccion: EmpleadosReceived.Direccion,
                    DNI: EmpleadosReceived.DNI,
                    Genero: EmpleadosReceived.genre,
                    NumeroTlf: EmpleadosReceived.NumeroTlf
                };
                let socio = new sociosClass_1.Socios(personalInfo, id);
                let saver = new Socios_1.SocioModel(socio);
                yield saver.save().then(() => res.send('guardado')).catch((err) => res.send(err));
            }));
            database_1.db.desconectarBD();
        });
        this.deleteSocios = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD().then(() => __awaiter(this, void 0, void 0, function* () {
                console.log(req.params.ID);
                if (yield Socios_1.SocioModel.findOne({ Socios_id: req.params.ID })) {
                    yield Socios_1.SocioModel.findOneAndDelete({ Socios_id: req.params.ID })
                        .then((docs) => res.send(`deleted: ${docs}`))
                        .catch((err) => res.send(err));
                }
                else {
                    res.send('ese socio no existe');
                }
            }));
            database_1.db.desconectarBD();
        });
        this.getEmpleados = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db
                .conectarBD()
                .then((b) => __awaiter(this, void 0, void 0, function* () {
                console.log(b);
                let query = yield Empleado_1.EmpleadosModel.find({});
                res.send(query);
            }))
                .catch((error) => console.log(error));
            database_1.db.desconectarBD();
        });
        this.verifyCode = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD().then(() => __awaiter(this, void 0, void 0, function* () {
                let a = yield Empleado_1.EmpleadosModel.findOne({ 'personalInfo.DNI': req.params.Code });
                console.log(a);
                if (a) {
                    res.send(true);
                }
                else {
                    res.send(false);
                }
            }));
            database_1.db.desconectarBD();
        });
        this.deleteEmpleados = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD().then(() => __awaiter(this, void 0, void 0, function* () {
                console.log(req.params.ID);
                if (yield Empleado_1.EmpleadosModel.findOne({ Empleado_id: req.params.ID })) {
                    yield Empleado_1.EmpleadosModel.findOneAndDelete({ Empleado_id: req.params.ID })
                        .then((docs) => res.send(`deleted: ${docs}`))
                        .catch((err) => res.send(err));
                }
                else {
                    res.send('ese socio no existe');
                }
            }));
            database_1.db.desconectarBD();
        });
        this.postEmpleados = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD().then(() => __awaiter(this, void 0, void 0, function* () {
                let id = yield this.checklast('Empleados');
                let EmpleadosReceived = req.body;
                let fecha = this.getDate(req.body.dia, req.body.mes, req.body.año);
                let personalInfo = {
                    Nombre: EmpleadosReceived.Nombre,
                    Apellidos: EmpleadosReceived.Apellidos,
                    Email: EmpleadosReceived.Email,
                    FechaDeNacimiento: fecha,
                    Direccion: EmpleadosReceived.Direccion,
                    DNI: EmpleadosReceived.DNI,
                    Genero: EmpleadosReceived.genre,
                    NumeroTlf: EmpleadosReceived.NumeroTlf,
                };
                let jobInfo = {
                    sueldo: parseInt(EmpleadosReceived.Sueldo),
                    cantidadDeVentas: [],
                    Antiguedad: 0,
                    plus: 0,
                };
                let empleado = new empleadosClass_1.empleados(personalInfo, jobInfo, id);
                let saver = new Empleado_1.EmpleadosModel(empleado);
                yield saver.save().then(() => res.send('guardado')).catch((err) => res.send(saver));
            }));
            database_1.db.desconectarBD();
        });
        this.getPeliculas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((b) => __awaiter(this, void 0, void 0, function* () {
                let query = yield Pelicula_1.PeliculasModel.find({});
                res.send(query);
            }))
                .catch((error) => console.log(error));
            database_1.db.desconectarBD();
        });
        this.postPeliculas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD().then(() => __awaiter(this, void 0, void 0, function* () {
                console.log(req.body);
                let id = yield this.checklast('Peliculas');
                let fecha = this.getDate(req.body.dia, req.body.mes, req.body.año);
                let pelicula = new peliculas_1.Pelicula(req.body.Titulo, req.body.Autor, req.body.Genero, req.body.Duracion, fecha, id);
                let saver = new Pelicula_1.PeliculasModel(pelicula);
                yield saver.save().then(() => res.send('guardado')).catch((err) => res.send(saver));
            }));
            database_1.db.desconectarBD();
        });
        this.deletePeliculas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD().then(() => __awaiter(this, void 0, void 0, function* () {
                console.log(req.params.ID);
                if (yield Pelicula_1.PeliculasModel.findOne({ id: req.params.ID })) {
                    yield Pelicula_1.PeliculasModel.findOneAndDelete({ id: req.params.ID })
                        .then((docs) => res.send(`deleted: ${docs}`))
                        .catch((err) => res.send(err));
                }
                else {
                    res.send('ese socio no existe');
                }
            }));
            database_1.db.desconectarBD();
        });
        this.postPedidos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD().then(() => __awaiter(this, void 0, void 0, function* () {
                console.log(req.body);
                let Tiempo = parseInt(req.body.Tiempo);
                let id = yield this.checklast('Pedidos');
                let precio = parseInt(req.body.precio);
                console.log(req.body);
                let pedido = new pedidos_1.pedidos(req.body.Socio, req.body.Pelicula, req.body.Empleado, Tiempo, precio, id);
                let saver = new pedidos_2.PedidosModel(pedido);
                yield saver.save().then(() => __awaiter(this, void 0, void 0, function* () {
                    res.send('guardado');
                    yield Socios_1.SocioModel.findOneAndUpdate({ "Socios_id": req.body.Socio }, { $addToSet: { "filmsInfo.Peliculas_alquiladas": id } });
                    yield Empleado_1.EmpleadosModel.findOneAndUpdate({ "Empleado_id": req.body.Empleado }, { $addToSet: { "jobInfo.Peliculas_alquiladas": id } });
                }));
            }));
            database_1.db.desconectarBD();
        });
        this.getPedidos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db
                .conectarBD()
                .then((b) => __awaiter(this, void 0, void 0, function* () {
                let query = yield pedidos_2.PedidosModel.find({});
                res.send(query);
            }))
                .catch((error) => console.log(error));
            database_1.db.desconectarBD();
        });
        this.deletePedidos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD().then(() => __awaiter(this, void 0, void 0, function* () {
                console.log(req.params.ID);
                if (yield pedidos_2.PedidosModel.findOne({ id: req.params.ID })) {
                    yield pedidos_2.PedidosModel.findOneAndDelete({ id: req.params.ID })
                        .then((docs) => __awaiter(this, void 0, void 0, function* () {
                        res.send(`deleted: ${docs}`);
                        yield Socios_1.SocioModel.findOneAndUpdate({ "Socios_id": req.params.socioID }, { $pull: { "filmsInfo.Peliculas_alquiladas": req.params.ID } });
                    }))
                        .catch((err) => res.send(err));
                }
                else {
                    res.send('ese socio no existe');
                }
            }));
            database_1.db.desconectarBD();
        });
        this.devueltoPedido = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD().then(() => __awaiter(this, void 0, void 0, function* () {
                console.log(req);
                yield pedidos_2.PedidosModel.findOneAndUpdate({ "id": req.params.ID }, { "devuelto": true }).then((resa) => res.send(req.params));
                yield Socios_1.SocioModel.findOneAndUpdate({ "Socios_id": req.params.socioID }, { $pull: { "filmsInfo.Peliculas_alquiladas": req.params.ID } });
                yield Socios_1.SocioModel.findOneAndUpdate({ "Socios_id": req.params.socioID }, { $addToSet: { "filmsInfo.Peliculas_devueltas": req.params.ID } });
            }));
            database_1.db.desconectarBD();
        });
        this.checklast = (model) => __awaiter(this, void 0, void 0, function* () {
            if (model == 'Socios') {
                let lastId = yield Socios_1.SocioModel.findOne().sort({ $natural: -1 });
                let numero = parseInt(lastId.Socios_id) + 1;
                let string = numero.toString(10);
                return string;
            }
            if (model == 'Empleados') {
                let lastId = yield Empleado_1.EmpleadosModel.findOne().sort({ $natural: -1 });
                if (lastId) {
                    console.log(lastId);
                    let numero = parseInt(lastId.Empleado_id) + 1;
                    let string = numero.toString(10);
                    return string;
                }
                else {
                    return "0";
                }
            }
            if (model == 'Peliculas') {
                let lastId = yield Pelicula_1.PeliculasModel.findOne().sort({ $natural: -1 });
                if (lastId) {
                    console.log(lastId);
                    let numero = parseInt(lastId.Empleado_id) + 1;
                    let string = numero.toString(10);
                    return string;
                }
                else {
                    return "0";
                }
            }
            if (model == 'Pedidos') {
                let lastId = yield pedidos_2.PedidosModel.findOne().sort({ $natural: -1 });
                if (lastId) {
                    console.log(lastId);
                    let numero = parseInt(lastId.id) + 1;
                    let string = numero.toString(10);
                    return string;
                }
                else {
                    return "0";
                }
            }
        });
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    getDate(day, month, year) {
        return new Date(`${year}-${month}-${day}`);
    }
    misRutas() {
        this._router.get('/socios', this.getSocios);
        this._router.post('/socios', this.postSocios);
        this._router.delete('/socios/:ID', this.deleteSocios);
        this._router.get('/empleados', this.getEmpleados);
        this._router.post('/empleados', this.postEmpleados);
        this._router.get('/empleados/verify/:Code', this.verifyCode);
        this._router.delete('/empleados/:ID', this.deleteEmpleados);
        this._router.get('/peliculas', this.getPeliculas);
        this._router.post('/peliculas', this.postPeliculas);
        this._router.delete('/peliculas/:ID', this.deletePeliculas);
        this._router.post('/pedidos', this.postPedidos);
        this._router.get('/pedidos', this.getPedidos);
        this._router.delete('/pedidos/:ID/:socioID', this.deletePedidos);
        this._router.put('/pedidos/:ID/:socioID', this.devueltoPedido);
    }
}
const obj = new DatoRoutes();
obj.misRutas();
exports.routes = obj.router;
