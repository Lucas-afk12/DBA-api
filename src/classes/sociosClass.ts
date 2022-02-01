export class Socios {
    private Socios_id: number = 0;
    private personalInfo: personalInfo;
    private filmsInfo: jobInfo;
    private createdAt: Date;
    private points: points;
  
    constructor(
      personalInfo: personalInfo,
      Socios_id?: number,
      filmsInfo?: jobInfo,
      points?: points
    ) {
      this.personalInfo = personalInfo;
      this.createdAt = new Date();
      if (!filmsInfo) {
        this.filmsInfo = filmsInfoA;
      } else {
        this.filmsInfo = filmsInfo;
      }
      if (!points) {
        this.points = pointsA;
      } else {
        this.points = points;
      }
      if (Socios_id) {
        this.Socios_id = Socios_id;
      }
    }
  
    get PersonalInfo() {
      return this.personalInfo;
    }
  
    get FilmsInfo() {
      return this.filmsInfo;
    }
  
    get CreatedAt() {
      return this.createdAt;
    }
  
    get Points() {
      return this.points;
    }
  
    set AlquilatedNum(count) {
      if (this.FilmsInfo) this.FilmsInfo.AlquiladasCount = count;
    }
  
    get AlquilatedNum() {
      if (this.FilmsInfo) return this.FilmsInfo.AlquiladasCount;
    }
  
    set DevueltasNum(count) {
      if (this.FilmsInfo) this.FilmsInfo.DevueltasCount = count;
    }
    get DevueltasNum() {
      if (this.FilmsInfo) return this.FilmsInfo.DevueltasCount;
    }

  }
  
  export interface personalInfo {
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
    Peliculas_alquiladas: [];
    Peliculas_devueltas: [];
    AlquiladasCount: any;
    DevueltasCount: any;
  }
  
  interface points {
    ComprasTotales: [];
    puntosDisponibles: [];
    puntosGastados: [];
  }
  
  let filmsInfoA: jobInfo = {
    Peliculas_alquiladas: [],
    Peliculas_devueltas: [],
    AlquiladasCount: 0,
    DevueltasCount: 0,
  };
  
  let pointsA: points = {
    ComprasTotales: [],
    puntosDisponibles: [],
    puntosGastados: [],
  };
  