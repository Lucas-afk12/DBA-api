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
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    // private postMangas = async (req: Request, res: Response) => {
    // 	await db.conectarBD().then(async () => {
    // 		if (await MangaModel.findOne({ _id: req.body._id })) {
    // 			res.send('ese manga ya existe');
    // 		} else {
    // 			let mangaReceived = new MangaModel(req.body);
    // 			mangaReceived.save((err: any, result: any) => {
    // 				if (err) {
    // 					res.send(err);
    // 				}
    // 				res.send(`${result.Datos.titulo} guardado`);
    // 			});
    // 		}
    // 	});
    // 	db.desconectarBD();
    // };
    // private updateMangas = async (req: Request, res: Response) => {
    // 	await db.conectarBD().then(async () => {
    // 		if (await MangaModel.findOne({ _id: req.params.mangaID })) {
    // 			let value = req.params.value;
    // 			if (value) {
    // 				await MangaModel.findOneAndUpdate(
    // 					{ _id: req.params.mangaID },
    // 					{ 'Datos.titulo': value }
    // 				)
    // 					.then(() => res.send(`${req.params.mangaID} actualizado`))
    // 					.catch(() =>
    // 						res.send(
    // 							`ha habido un error actualizando el manga ${req.params.mangaID}`
    // 						)
    // 					);
    // 			} else {
    // 				res.send('No puedes poner un titulo en blanco');
    // 			}
    // 		} else {
    // 			res.send('ese manga no existe');
    // 		}
    // 	});
    // 	db.desconectarBD();
    // };
    // private deleteMangas = async (req: Request, res: Response) => {
    // 	await db.conectarBD().then(async () =>{
    //         if (await MangaModel.findOne({ _id: req.params.mangaID })){
    //             await MangaModel.findOneAndDelete({_id : req.params.mangaID})
    //             .then((docs) => res.send(`deleted: ${docs}`))
    //             .catch((err) => res.send(err));
    //         } else {
    //             res.send('ese manga no existe');
    //         }
    //     })
    // };
    misRutas() {
        this._router.get('/', this.getMangas);
    }
}
const obj = new DatoRoutes();
obj.misRutas();
exports.routes = obj.router;
