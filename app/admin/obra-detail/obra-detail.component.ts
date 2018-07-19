import { Component, OnInit } from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { LoginResp } from "../../interfaces/int.LoginResp";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import { Obra }    from './Obra';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

export class Password
{
  constructor(
    public password1: string, 
    public npassword: string, 

    ) {  }

}

@Component({
  selector: 'app-obra-detail',
  templateUrl: './obra-detail.component.html',
  styleUrls: ['./obra-detail.component.css','../../loadingArrows.css']
})
export class ObraDetailComponent implements OnInit {

    
    id_obra: string ;
    obra: string;
    revenimiento: string;
    incertidumbre: string;
    prefijo: string;
    fechaDeCre: string;
    foto: string;
    id_cliente: string;
    id_concretera: string;
    tipo: string;
    laboratorio: string;
    descripcion: string;
    submitted = false;
    hidden = false;
    cargando= 3;
    mis_con: Array<any>;
    mis_cli: Array<any>;

    estatus: string;
    onSubmit() { this.submitted = true; }

    loginMessage: string= "";
    loginresp: LoginResp;
    global: Global;
    
    
    id: string;
    
  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    this.cargando=3;
    let url = `${this.global.apiRoot}/concretera/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAll');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    this.http.get(url, {search}).subscribe(res => {this.llenaRoles(res.json());
                                                 this.rolValidator(res.json());
                                                });

     url = `${this.global.apiRoot}/cliente/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getAllUser');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    this.http.get(url, {search}).subscribe(res => {this.llenaClientes(res.json());
                                                   this.labValidator(res.json());
                                                 });


    url = `${this.global.apiRoot}/obra/get/endpoint.php`;
	  search = new URLSearchParams();
	  search.set('function', 'getObraByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    search.set('id_obra', this.id);
	this.http.get(url, {search}).subscribe(res => {this.llenado(res.json()); 
                                                 this.llenadoValidator(res.json());
                                               });
  }




  llenadoValidator(respuesta: any){
    console.log(respuesta)
    if(respuesta.error==1 || respuesta.error==2 || respuesta.error==3){
      window.alert(respuesta.estatus);
    }
    else{
      
    }
  }

  rolValidator(respuesta: any){
    console.log(respuesta)
    if(respuesta.error==5 || respuesta.error==6){
      window.alert(respuesta.estatus);
    }
    else{
      
    }
  }

  labValidator(respuesta: any){
    console.log(respuesta)
    if(respuesta.error==5 || respuesta.error==6){
      window.alert(respuesta.estatus);
    }
    else{
      
    }
  }

  regresaObra(){
    this.router.navigate(['administrador/obras']);
  }


  

  llenaRoles(resp: any)
  {
    console.log(resp);
    this.mis_con= new Array(resp.length);
    var j=resp.length-1;
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_con[_i]=resp[j];
      j--;

    }
    this.cargando=this.cargando-1;
  }

  llenaClientes(resp: any)
  {
        console.log(resp);
    this.mis_cli= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_cli[_i]=resp[_i];

    }
    this.cargando=this.cargando-1;
  }

  mostrar()
  {
    this.hidden=true;
  }
  ocultar()
  {
    this.hidden=false;


  }


  actualizarObra(obra: string, prefijo: string, fechaDeCre: string, descripcion: string, id_cliente: string, id_concretera:string, tipo: string, revenimiento: string, incertidumbre : string)
  {
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/obra/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'upDate');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', '1001');
    search.set('id_obra', this.id);

    search.set('obra', obra);
    search.set('prefijo', prefijo);
    search.set('fechaDeCreacion', fechaDeCre);
    search.set('descripcion', descripcion);
    search.set('cliente_id', id_cliente);
    search.set('concretera', id_concretera);
    search.set('tipo', tipo);
    search.set('revenimiento', revenimiento);
    search.set('incertidumbre', incertidumbre);
    
    this.http.get(url, {search}).subscribe(res => this.respuestaError(res.json()) );


  }


  respuestaError(resp: any){
    if(resp.error!=0)
    {
      window.alert(resp.estatus);
      location.reload();
    }
    else
    {
      location.reload();
    }
    console.log(resp);
  }


  llenado(respuesta: any)
  {
    console.log(respuesta);
    this.model=respuesta;
    this.cargando=this.cargando-1;
  }
  
  
   model = new Obra(this.id_obra,
                       this.id_concretera,
                       this.obra,
                       this.revenimiento,
                       this.incertidumbre,
                       this.prefijo,
                       this.fechaDeCre,
                       this.foto,
                       this.descripcion,
                       this.laboratorio,
                       this.tipo,
                       this.id_cliente,"");

}
