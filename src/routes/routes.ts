import { query, Request, Response, Router } from 'express';
import { SocioModel } from '../model/Socios';
import { db } from '../database/database';
import { Socios } from '../classes/sociosClass';
import { empleados } from '../classes/empleadosClass';
import { EmpleadosModel } from '../model/Empleado';
import { Console } from 'console';
import { Pelicula } from '../classes/peliculas';
import { PeliculasModel } from '../model/Pelicula';
import { pedidos } from '../classes/pedidos';
import { PedidosModel } from '../model/pedidos';

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

	getDate(day: string,month: string,year :string): Date {
		return new Date(`${year}-${month}-${day}`)
	}

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
		db.desconectarBD();
	};

	
	private getEmpleados = async (req: Request, res: Response) => {
		await db
			.conectarBD()
			.then(async (b) => {
				console.log(b);
				let query = await EmpleadosModel.find({});
				res.send(query);
			})
			.catch((error) => console.log(error));
		db.desconectarBD();
	};

	private verifyCode = async (req:Request , res: Response) => {
	
			await db.conectarBD().then(async () =>{
				let a = await EmpleadosModel.findOne({'personalInfo.DNI':req.params.Code})
				console.log(a)
				if (a){
					res.send(true)
				}else{
					res.send(false)
				}
			})
			db.desconectarBD();
	}

	private deleteEmpleados = async (req: Request, res: Response) => {
		await db.conectarBD().then(async () =>{
			console.log(req.params.ID)
	        if (await EmpleadosModel.findOne({ Empleado_id: req.params.ID })){
	            await EmpleadosModel.findOneAndDelete({Empleado_id : req.params.ID})
	            .then((docs) => res.send(`deleted: ${docs}`))
	            .catch((err) => res.send(err));

	        } else {
	            res.send('ese socio no existe');
	        }
	    })
		db.desconectarBD();
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
    			cantidadDeVentas: [] ,
    			Antiguedad: 0,
    			plus: 0,
			}
			let empleado = new empleados(personalInfo,jobInfo,id);
			let saver = new EmpleadosModel(empleado)
			await saver.save().then(()=> res.send('guardado')).catch((err:any)=>res.send(saver))
		});
	db.desconectarBD();
};




private getPeliculas = async (req: Request, res: Response) => {
	await db.conectarBD()
		.then(async (b) => {
			let query = await PeliculasModel.find({});
			res.send(query);
		})
		.catch((error) => console.log(error));
	db.desconectarBD();
};


private postPeliculas = async (req: Request, res: Response) =>{
	await db.conectarBD().then(async () => {
		console.log(req.body)
		let id = await this.checklast('Peliculas');
		let fecha = this.getDate(req.body.dia,req.body.mes,req.body.año)
		let pelicula = new Pelicula(req.body.Titulo,req.body.Autor,req.body.Genero,req.body.Duracion,fecha,id)
		let saver = new PeliculasModel(pelicula)
		await saver.save().then(()=> res.send('guardado')).catch((err:any)=>res.send(saver))
	});
db.desconectarBD();
};

private deletePeliculas = async (req: Request, res: Response) => {
	await db.conectarBD().then(async () =>{
		console.log(req.params.ID)
		if (await PeliculasModel.findOne({ id: req.params.ID })){
			await PeliculasModel.findOneAndDelete({ id : req.params.ID})
			.then((docs) => res.send(`deleted: ${docs}`))
			.catch((err) => res.send(err));

		} else {
			res.send('ese socio no existe');
		}
	});
	db.desconectarBD();
};

private postPedidos = async (req:Request , res:Response) => {
	await db.conectarBD().then(async () => {
		console.log(req.body)
		let Tiempo = parseInt(req.body.Tiempo)
		let id = await this.checklast('Pedidos')
		let precio = parseInt(req.body.precio)
		console.log(req.body)
		let pedido = new pedidos(req.body.Socio,req.body.Pelicula,req.body.Empleado,Tiempo,precio,id);
		let saver = new PedidosModel(pedido)
		await saver.save().then(async ()=> {
			res.send('guardado');
			await SocioModel.findOneAndUpdate({"Socios_id":req.body.Socio},{$addToSet:{"filmsInfo.Peliculas_alquiladas": id}})
			await EmpleadosModel.findOneAndUpdate({"Empleado_id":req.body.Empleado},{$addToSet:{"jobInfo.Peliculas_alquiladas": id}})
	
	})
	});
db.desconectarBD();
}

private getPedidos = async (req:Request , res:Response) => {
	await db
		.conectarBD()
		.then(async (b) => {
			let query = await PedidosModel.find({});
			res.send(query);
		})
		.catch((error) => console.log(error));
	db.desconectarBD();
}

private deletePedidos = async (req: Request, res: Response) => {
	await db.conectarBD().then(async () =>{
		console.log(req.params.ID)
		if (await PedidosModel.findOne({ id: req.params.ID })){
			await PedidosModel.findOneAndDelete({id : req.params.ID})
			.then(async (docs) => {res.send(`deleted: ${docs}`);
		
			await SocioModel.findOneAndUpdate({"Socios_id":req.params.socioID},{$pull:{"filmsInfo.Peliculas_alquiladas": req.params.ID}})
			
		})	
			.catch((err) => res.send(err));

		} else {
			res.send('ese socio no existe');
		}
	})
	db.desconectarBD();
};

private devueltoPedido = async (req: Request, res: Response) => {
	await db.conectarBD().then(async () => {
		console.log(req);
		await PedidosModel.findOneAndUpdate({"id":req.params.ID},{"devuelto": true }).then((resa)=>res.send(req.params))
		await SocioModel.findOneAndUpdate({"Socios_id":req.params.socioID},{$pull:{"filmsInfo.Peliculas_alquiladas": req.params.ID}})
		await SocioModel.findOneAndUpdate({"Socios_id":req.params.socioID},{$addToSet:{"filmsInfo.Peliculas_devueltas": req.params.ID}})
	})
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
			if (lastId){
				console.log(lastId)
			let numero = parseInt(lastId.Empleado_id) + 1
			let string :string = numero.toString(10)
			return string }else{
			return "0"
		}
	}

	if (model == 'Peliculas') {
		let lastId = await PeliculasModel.findOne().sort({$natural:-1})
		if (lastId){
			console.log(lastId)
		let numero = parseInt(lastId.Empleado_id) + 1
		let string :string = numero.toString(10)
		return string }else{
		return "0"
	}
}
	if (model == 'Pedidos') {
		let lastId = await PedidosModel.findOne().sort({$natural:-1})
		if (lastId){
		console.log(lastId)
		let numero = parseInt(lastId.id) + 1
		let string :string = numero.toString(10)
		return string }else{
		return "0"
}
}


}




	misRutas() {
		this._router.get('/socios', this.getSocios)
		this._router.post('/socios', this.postSocios)
		this._router.delete('/socios/:ID',this.deleteSocios)


		this._router.get('/empleados',this.getEmpleados)
		this._router.post('/empleados', this.postEmpleados)
		this._router.get('/empleados/verify/:Code', this.verifyCode)
		this._router.delete('/empleados/:ID',this.deleteEmpleados)

		this._router.get('/peliculas',this.getPeliculas)
		this._router.post('/peliculas',this.postPeliculas)
		this._router.delete('/peliculas/:ID',this.deletePeliculas)

		this._router.post('/pedidos',this.postPedidos)
		this._router.get('/pedidos',this.getPedidos)
		this._router.delete('/pedidos/:ID/:socioID',this.deletePedidos)
		this._router.put('/pedidos/:ID/:socioID',this.devueltoPedido)
	}
}

const obj = new DatoRoutes();
obj.misRutas();
export const routes = obj.router;
