export class Herramienta 
{
	constructor(
	  public id_herramienta: string, 
	  public fechaDeCompra: string, 
  	public placas: string,
    public observaciones, 
 	  public condicion: string, 
  	public tipo: string, 
  	public active: string, 
  	public estatus: string, 
  	public error: string, 
    public herramienta_tipo_id: string
  	) {  }

}
