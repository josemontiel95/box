import { Component, OnInit } from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { LoginResp } from "../../interfaces/int.LoginResp";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario }    from './Usuario';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

    puestos= ['Jefe de Brigada', 'Jefe de Laboratorio', 
              'Administrativo', 'Tecnico de campo']
    id_usuario: string ;
    nombre: string;
    apellido: string;
    email: string;
    fechaDeNac: string;
    foto: string;
    laboratorio_id: string;
    laboratorio: string;
    nss: string;
    rol: string;
    submitted = false;
    hidden = false;
    mis_roles: Array<any>;
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
    id: string;
  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);

    let url = `${this.global.apiRoot}/rol/get/endpoint.php`;
  let search = new URLSearchParams();
  search.set('function', 'getAll');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
  this.http.get(url, {search}).subscribe(res => this.llenaRoles(res.json()) );

     url = `${this.global.apiRoot}/laboratorio/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getAll');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    this.http.get(url, {search}).subscribe(res => this.llenaLaboratorio(res.json()) );


    url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
	  search = new URLSearchParams();
	  search.set('function', 'getUserByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    search.set('id_usuario', this.id);
	this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );
  }


  cambiarContrasena(){
     this.actBut= true;
     this.desBut= false;
  }

   guardarContrasena(password1: string, npassword: string){
     this.actBut = false;
     this.desBut = true;
     if(password1 == npassword)
     {
       this.postContrasena(password1);
       this.exitoCon = true;
       //setTimeout(this.switchAlerta(this.exitoCon), 8000);
     }
     else{
       this.resppass = true;
     }
     
   }

   postContrasena(password1: string){
     let url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
     let search = new URLSearchParams();
     search.set('function', 'upDateContrasena');
     search.set('constrasena', password1);
     search.set('id_usuario', this.id);

        search.set('rol_usuario_id', "1001");
        search.set('token', this.global.token);
        this.http.get(url, {search}).subscribe(res => {
                                              res.json();
                                            });
   }

  switchAlerta(exitoCon: any){
    this.exitoCon = false;
  }

  regresaUsuario(){
    this.router.navigate(['administrador/usuarios']);
  }


  subirFoto(){
    this.router.navigate(['administrador/insertar-foto/'+this.id]);
  }

  llenaRoles(resp: any)
  {
    console.log(resp);
    this.mis_roles= new Array(resp.length);
    var j=resp.length-1;
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_roles[_i]=resp[j];
      j--;

    }
  }

  llenaLaboratorio(resp: any)
  {
    this.mis_lab= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_lab[_i]=resp[_i];

    }
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


  llenado(respuesta: any)
  {
    console.log("jbihghiv");
    console.log(respuesta);
    this.model=respuesta;
    if(this.foto == "null"){
      this.imgUrl= "../assets/img/gabino.jpg";
    }
    else{
      this.imgUrl= this.global.assetsRoot+this.foto;
    }
  }
  
  
   model = new Usuario(this.id_usuario,
                       this.email,
                       this.nombre,
                       this.apellido,
                       this.fechaDeNac,
                       this.foto,
                       this.rol,
                       this.nss,
                       this.laboratorio,
                       this.laboratorio_id);


}
