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
const Mangas_1 = require("../model/Mangas");
const database_1 = require("../database/database");
class DatoRoutes {
    constructor() {
        this.getMangas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db
                .conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                let query = undefined;
                if (req.params.Genre) {
                    if (req.params.MangaName) {
                        query = query = yield Mangas_1.MangaModel.find({
                            $and: [
                                { 'Datos.genero': req.params.Genre },
                                { 'Datos.titulo': req.params.MangaName },
                            ],
                        });
                    }
                    else {
                        query = yield Mangas_1.MangaModel.find({ 'Datos.genero': req.params.Genre });
                    }
                }
                else {
                    query = yield Mangas_1.MangaModel.find({});
                }
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.postMangas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD().then(() => __awaiter(this, void 0, void 0, function* () {
                if (yield Mangas_1.MangaModel.findOne({ _id: req.body._id })) {
                    res.send('ese manga ya existe');
                }
                else {
                    let mangaReceived = new Mangas_1.MangaModel(req.body);
                    mangaReceived.save((err, result) => {
                        if (err) {
                            res.send(err);
                        }
                        res.send(`${result.Datos.titulo} guardado`);
                    });
                }
            }));
            database_1.db.desconectarBD();
        });
        this.updateMangas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD().then(() => __awaiter(this, void 0, void 0, function* () {
                if (yield Mangas_1.MangaModel.findOne({ _id: req.params.mangaID })) {
                    let value = req.params.value;
                    if (value) {
                        yield Mangas_1.MangaModel.findOneAndUpdate({ _id: req.params.mangaID }, { 'Datos.titulo': value })
                            .then(() => res.send(`${req.params.mangaID} actualizado`))
                            .catch(() => res.send(`ha habido un error actualizando el manga ${req.params.mangaID}`));
                    }
                    else {
                        res.send('No puedes poner un titulo en blanco');
                    }
                }
                else {
                    res.send('ese manga no existe');
                }
            }));
            database_1.db.desconectarBD();
        });
        this.deleteMangas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD().then(() => __awaiter(this, void 0, void 0, function* () {
                if (yield Mangas_1.MangaModel.findOne({ _id: req.params.mangaID })) {
                    yield Mangas_1.MangaModel.findOneAndDelete({ _id: req.params.mangaID })
                        .then((docs) => res.send(`deleted: ${docs}`))
                        .catch((err) => res.send(err));
                }
                else {
                    res.send('ese manga no existe');
                }
            }));
        });
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/Mangas/:Genre?/:MangaName?', this.getMangas);
        this._router.post('/Mangas', this.postMangas);
        this._router.put('/Mangas/update/:mangaID/title/:value', this.updateMangas);
        this._router.delete('/Mangas/delete/:mangaID', this.deleteMangas);
    }
}
const obj = new DatoRoutes();
obj.misRutas();
exports.routes = obj.router;
