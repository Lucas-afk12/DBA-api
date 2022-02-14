
export class pedidos {
    id?: string
    Socio : string
    Pelicula: string
    Empleado: string
    Tiempo: number
    createdAt:Date = new Date();
    devuelto:boolean = false;
    precio:number;

    constructor(Socio:string, Pelicula: string , Empleado : string , Tiempo: number,  precio:number ,id?:string ){
        this.Socio = Socio;
        this.Pelicula = Pelicula;
        this.Empleado = Empleado;
        this.Tiempo = Tiempo;
        this.id = id;
        this.precio = precio;
    }
}