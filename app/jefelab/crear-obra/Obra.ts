export class Obra 
{
	constructor(
	  public id_obra: string,
	  public obra: string,
    public revenimiento: string,
    public incertidumbre: string,
  	public prefijo: string,
  	public cliente_id: string,
    public id_concretera: string,
    public tipo: string,
 	  public laboratorio: string,
  	public descripcion: string,
    public fechaDeCre: string,
  	public foto: string,
  	) {  }

}
