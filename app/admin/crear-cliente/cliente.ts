export class Cliente 
{
	constructor(
	  public id_cliente: string,
    public rfc: string,    
  	public razonSocial: string,
    public nombre: string,    
    public email: string,
 	public telefono: string,
  	public nombreContacto: string,
  	public direccion: string,
  	public telefonoDeContacto: string,
    public contrasena: string
  	) {  }

}
