


export class Pelicula {

    private id?:string = "0";
    private Titulo:string;
    private Autor:string;
    private Genero:string;
    private Duracion:number;
    private Año:Date;
    private Created_At : Date;

    constructor(Titulo:string,Autor:string,Genero:string,Duracion:number,año:Date,id?:string){
        this.Titulo = Titulo;
        this.Autor = Autor;
        this.Genero = Genero;
        this.Duracion = Duracion;
        this.Año = año
        this.Created_At = new Date;
        if (id){
            this.id = id
        }
    }
}