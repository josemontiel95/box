export class Usuario 
{
	constructor(
	  public id_usuario: string,
	  public nombre: string,
  	public apellido: string,
  	public laboratorio_id: string,
 	  public laboratorio: string,
  	public nss: string,
  	public rol: string,
  	public email: string,
  	public fechaDeNac: string,
  	public foto: string
  	) {  }

}
