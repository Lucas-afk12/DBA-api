export class empleados {
    Empleado_id: string = '0';
    personalInfo: personalInfo;
    jobInfo: jobInfo;
    createdAt: Date;
    tipo: string ;
  
    constructor(
      personalInfo: personalInfo,
      jobInfo: jobInfo,
      Empleado_id?:string
    ){
      this.personalInfo = personalInfo;
      this.jobInfo = jobInfo;
      this.createdAt = new Date();
      if (Empleado_id) {
          this.Empleado_id = Empleado_id;
        }
      this.tipo="empleados"
    }
  }
  
  interface personalInfo {
    Nombre: string;
    Apellidos: string;
    Email: string;
    FechaDeNacimiento: Date;
    Direccion: string;
    DNI: string;
    Genero: string;
    NumeroTlf: string;
  }
  
  interface jobInfo {
    sueldo: number;
    cantidadDeVentas : Array<Number>;
    Antiguedad: number;
    plus: number
  }
  