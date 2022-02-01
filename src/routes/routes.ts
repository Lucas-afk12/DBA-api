import { query, Request, Response, Router } from 'express';
import { SocioModel } from '../model/Socios';
import { db } from '../database/database';

class DatoRoutes {
	private _router: Router;

	constructor() {
		this._router = Router();
	}
	get router() {
		return this._router;
	}

	private getSocios = async (req: Request, res: Response) => {
				let query = await SocioModel.find({});
				res.send(query);
	};

	private postMangas = async (req: Request, res: Response) => {

		console.log(req.body)
			
	};

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
		this._router.get('/socios', this.getSocios);
	}
}

const obj = new DatoRoutes();
obj.misRutas();
export const routes = obj.router;
