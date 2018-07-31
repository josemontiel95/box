export class OrdenTrabajo {

  constructor(
	  public id_herramienta: string, 
	  public fechaDeCompra: string, 
  	public placas: string, 
 	  public condicion: string, 
  	public tipo: string, 
    public descripcion: string,
    public herramienta_tipo_id: string
  
  ) {  }
}
