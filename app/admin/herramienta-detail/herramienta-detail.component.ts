import { Component, OnInit } from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { LoginResp } from "../../interfaces/int.LoginResp";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import { Herramienta }    from './herramienta';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';


@Component({
  selector: 'app-herramienta-detail',
  templateUrl: './herramienta-detail.component.html',
  styleUrls: ['./herramienta-detail.component.css']
})
export class HerramientaDetailComponent implements OnInit {

    id_herramienta: string;
    fechaDeCompra: string;
    placas: string;
    condicion: string;
    tipo: string;
    active: string;
    estatus: string;
    error: string;
    cargando= 2;

    submitted = false;
    hidden = false;
    mis_tipos: Array<any>;
    mis_lab: Array<any>;
    imgUrl = "";
    onSubmit() { this.submitted = true; }

    loginMessage: string= "";
    loginresp: LoginResp;
    global: Global;
    desBut=true;
    actBut=false;
    resppass= false;
    exitoCon = false;
    password1: string;
    npassword: string;
    id: string;
    model: Herramienta= new Herramienta("","","","","","","","", "");
    
  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    
    this.cargando=2;

    let url = `${this.global.apiRoot}/herramienta_tipo/get/endpoint.php`;
    let search = new URLSearchParams();
    
    search.set('function', 'getAll');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    this.http.get(url, {search}).subscribe(res => this.llenaTipos(res.json()) );

    url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
	  search = new URLSearchParams();
	  search.set('function', 'getHerramientaByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    search.set('id_herramienta', this.id);
	  this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );
  }



  switchAlerta(exitoCon: any){
    this.exitoCon = false;
  }

  regresaHerramientas(){
    this.router.navigate(['administrador/herramientas']);
  }


  llenaTipos(resp: any)
  {
    console.log(resp);
    this.mis_tipos= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_tipos[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
    console.log("llenaTipos this.cargando: "+this.cargando);
  }

  mostrar()
  {
    this.hidden=true;
  }
  ocultar()
  {
    this.hidden=false;


  }

  actualizarUsuario(nombre: string, apellido: string,
                    laboratorio_id: string, nss:string,
                    email: string, fechaDeNac: string,
                    id_usuario: string, rol_usuario_id: string, )
  {
    let url = `${this.global.apiRoot}/usuario/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'upDate');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', '1001');

    formData.append('id_usuario', id_usuario);
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('laboratorio_id', laboratorio_id);
    formData.append('nss', nss);
    formData.append('email', email);
    formData.append('fechaDeNac', fechaDeNac);
    formData.append('rol_usuario_id_new', rol_usuario_id);

    this.http.post(url, formData).subscribe(res => this.respuestaError(res.json()) );


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
  }


  llenado(respuesta: any){
    console.log(respuesta);
     
    setTimeout(()=>{ this.model=respuesta;
                     this.cargando=this.cargando-1;
                     console.log("llenado this.cargando: "+this.cargando);
                     }, 100);
    
    
    
    
  }
  


}
