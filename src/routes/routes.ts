import { query, Request, Response, Router } from 'express';
import { SocioModel } from '../model/Socios';
import { db } from '../database/database';
import { Socios } from '../classes/sociosClass';
import { empleados } from '../classes/empleadosClass';
import { EmpleadosModel } from '../model/Empleado';

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
			    let EmpleadosReceived = req.body;
				let fecha = this.getDate(req.body.dia,req.body.mes,req.body.año)
				let personalInfo = {
					Nombre: EmpleadosReceived.Nombre,
					Apellidos: EmpleadosReceived.Apellidos,
					Email: EmpleadosReceived.Email,
					FechaDeNacimiento: fecha,
					Direccion: EmpleadosReceived.Direccion,
					DNI: EmpleadosReceived.DNI,
					Genero: EmpleadosReceived.genre,
					NumeroTlf: EmpleadosReceived.NumeroTlf
				  }
			    let socio = new Socios(personalInfo,id);
				let saver = new SocioModel(socio)
				await saver.save().then(()=> res.send('guardado')).catch((err:any)=>res.send(err))
			});
		db.desconectarBD();
	};

	checklast = async(model:string) => {
		
		if (model == 'Socios'){
				let lastId = await SocioModel.findOne().sort({$natural:-1})
				let numero = parseInt(lastId.Socios_id) + 1
				let string :string = numero.toString(10)
				return string
		}
	
		if (model == 'Empleados') {
				let lastId = await EmpleadosModel.findOne().sort({$natural:-1})
				let numero = parseInt(lastId.Socios_id) + 1
				let string :string = numero.toString(10)
				return string
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

	private deleteSocios = async (req: Request, res: Response) => {
		await db.conectarBD().then(async () =>{
			console.log(req.params.ID)
	        if (await SocioModel.findOne({ Socios_id: req.params.ID })){
	            await SocioModel.findOneAndDelete({Socios_id : req.params.ID})
	            .then((docs) => res.send(`deleted: ${docs}`))
	            .catch((err) => res.send(err));

	        } else {
	            res.send('ese socio no existe');
	        }
	    })
	};

	


	private postEmpleados = async (req: Request, res: Response) =>{
		await db.conectarBD().then(async () => {
			let id = await this.checklast('Empleados');
			let EmpleadosReceived = req.body;
			let fecha = this.getDate(req.body.dia,req.body.mes,req.body.año)
			let personalInfo = {
				Nombre: EmpleadosReceived.Nombre,
				Apellidos: EmpleadosReceived.Apellidos,
				Email: EmpleadosReceived.Email,
				FechaDeNacimiento: fecha,
				Direccion: EmpleadosReceived.Direccion,
				DNI: EmpleadosReceived.DNI,
				Genero: EmpleadosReceived.genre,
				NumeroTlf: EmpleadosReceived.NumeroTlf,
			  }
			let jobInfo = {
				sueldo: parseInt(EmpleadosReceived.Sueldo),
    			cantidadDeVentas: 0,
    			Antiguedad: 0,
    			plus: 0,
			}

			let empleado = new empleados(personalInfo,jobInfo,id);
			let saver = new EmpleadosModel(empleado)
			await saver.save().then(()=> res.send('guardado')).catch((err:any)=>res.send(saver))
		});
	db.desconectarBD();
};



	misRutas() {
		this._router.get('/socios', this.getSocios);
		this._router.post('/socios', this.postSocios);
		this._router.delete('/socios/:ID',this.deleteSocios);

		// this._router.get('/empleados', this.getEmpleados);
		this._router.post('/empleados', this.postEmpleados);

	}
}

const obj = new DatoRoutes();
obj.misRutas();
export const routes = obj.router;
