import { query, Request, Response, Router } from 'express';
import { MangaModel } from '../model/Mangas';
import { db } from '../database/database';

class DatoRoutes {
	private _router: Router;

	constructor() {
		this._router = Router();
	}
	get router() {
		return this._router;
	}

	private getMangas = async (req: Request, res: Response) => {
		await db
			.conectarBD()
			.then(async () => {
				let query = undefined;
				if (req.params.Genre) {
					if (req.params.MangaName) {
						query = query = await MangaModel.find({
							$and: [
								{ 'Datos.genero': req.params.Genre },
								{ 'Datos.titulo': req.params.MangaName },
							],
						});
					} else {
						query = await MangaModel.find({ 'Datos.genero': req.params.Genre });
					}
				} else {
					query = await MangaModel.find({});
				}
				res.json(query);
			})

			.catch((mensaje) => {
				res.send(mensaje);
			});

		db.desconectarBD();
	};

	private postMangas = async (req: Request, res: Response) => {
		await db.conectarBD().then(async () => {
			if (await MangaModel.findOne({ _id: req.body._id })) {
				res.send('ese manga ya existe');
			} else {
				let mangaReceived = new MangaModel(req.body);

				mangaReceived.save((err: any, result: any) => {
					if (err) {
						res.send(err);
					}

					res.send(`${result.Datos.titulo} guardado`);
				});
			}
		});
		db.desconectarBD();
	};

	private updateMangas = async (req: Request, res: Response) => {
		await db.conectarBD().then(async () => {
			if (await MangaModel.findOne({ _id: req.params.mangaID })) {
				let value = req.params.value;
				if (value) {
					await MangaModel.findOneAndUpdate(
						{ _id: req.params.mangaID },
						{ 'Datos.titulo': value }
					)
						.then(() => res.send(`${req.params.mangaID} actualizado`))
						.catch(() =>
							res.send(
								`ha habido un error actualizando el manga ${req.params.mangaID}`
							)
						);
				} else {
					res.send('No puedes poner un titulo en blanco');
				}
			} else {
				res.send('ese manga no existe');
			}
		});
		db.desconectarBD();
	};

	private deleteMangas = async (req: Request, res: Response) => {
		await db.conectarBD().then(async () =>{
            if (await MangaModel.findOne({ _id: req.params.mangaID })){

                await MangaModel.findOneAndDelete({_id : req.params.mangaID})
                .then((docs) => res.send(`deleted: ${docs}`))
                .catch((err) => res.send(err));

            } else {
                res.send('ese manga no existe');
            }
        })
	};

	misRutas() {
		this._router.get('/Mangas/:Genre?/:MangaName?', this.getMangas);
		this._router.post('/Mangas', this.postMangas);
		this._router.put('/Mangas/update/:mangaID/title/:value', this.updateMangas);
		this._router.delete('/Mangas/delete/:mangaID', this.deleteMangas);
	}
}

const obj = new DatoRoutes();
obj.misRutas();
export const routes = obj.router;
