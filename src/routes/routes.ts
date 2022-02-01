import { query, Request, Response, Router } from 'express';
import { SocioModel } from '../model/Socios';
import { db } from '../database/database';
import { Socios } from '../classes/sociosClass';

class DatoRoutes {
	private _router: Router;

	constructor() {
		this._router = Router();
	}
	get router() {
		return this._router;
	}

	private getSocios = async (req: Request, res: Response) => {
		await db
			.conectarBD()
			.then(async (b) => {
				console.log(b);
				let query = await SocioModel.find({});
				res.send(query);
			})
			.catch((error) => console.log(error));
		db.desconectarBD();
	};

	private postSocios = async (req: Request, res: Response) => {
		await db.conectarBD().then(async () => {
				let id = await this.checklast('Socios');
			    let socioReceived = req.body;
				let fecha = this.getDate(req.body.dia,req.body.mes,req.body.año)
				let personalInfo = {
					Nombre: socioReceived.Nombre,
					Apellidos: socioReceived.Apellidos,
					Email: socioReceived.Email,
					FechaDeNacimiento: fecha,
					Direccion: socioReceived.Direccion,
					DNI: socioReceived.DNI,
					Genero: socioReceived.genre,
					NumeroTlf: socioReceived.telefono
				  }
			    let socio = new Socios(personalInfo,id);
				let saver = new SocioModel(socio)
				res.send(socio)
				// saver.save().then(()=> res.send('guardado')).catch(()=>res.send('ha ocurrido un error'))
			});
		db.desconectarBD();
	};

	checklast = async(model:string) => {
		
		if (model == 'Socios'){
				let lastId = await SocioModel.findOne().sort({$natural:-1})
				return lastId.Socios_id + 1
		}
	
	}

	getDate(day: string,month: string,year :string): Date {
		return new Date(`${year}-${month}-${day}`)
	}

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
		this._router.post('/socios', this.postSocios);

	}
}

const obj = new DatoRoutes();
obj.misRutas();
export const routes = obj.router;
