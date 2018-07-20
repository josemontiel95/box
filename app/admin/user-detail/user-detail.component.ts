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

export class Password
{
  constructor(
    public password1: string, 
    public npassword: string, 

    ) {  }

}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css','../../loadingArrows.css']
})
export class UserDetailComponent implements OnInit {

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
    estatus: string;
    submitted = false;
    hidden = false;
    mis_rolesActivos: Array<any>;
    mis_lab: Array<any>;
    imgUrl = "";
    cargando= 3;
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
    size: number;
    
  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    this.cargando=3;

    let url = `${this.global.apiRoot}/rol/get/endpoint.php`;
  let search = new URLSearchParams();
  search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    console.log(search);
  this.http.get(url, {search}).subscribe(res => {this.llenaRoles(res.json());
                                                 this.rolValidator(res.json());
                                                });

     url = `${this.global.apiRoot}/laboratorio/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    this.http.get(url, {search}).subscribe(res => {this.llenaLaboratorio(res.json());
                                                   this.labValidator(res.json());
                                                 });


    url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getByIDAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    search.set('id_usuario', this.id);
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


  cambiarContrasena(){
     this.actBut= true;
     this.desBut= false;
     this.resppass = false;
     this.exitoCon = false;
  }

   guardarContrasena(password1: string, npassword: string){
     this.actBut = false;
     this.desBut = true;
     if(password1 == npassword && password1 != null)
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
     let url = `${this.global.apiRoot}/usuario/post/endpoint.php`;
     this.data.currentGlobal.subscribe(global => this.global = global);
     let formData:FormData = new FormData();
     formData.append('function', 'upDateContrasena');
     formData.append('constrasena', password1);
     formData.append('id_usuario', this.id);

        formData.append('rol_usuario_id', "1001");
        formData.append('token', this.global.token);
        this.http.post(url, formData).subscribe(res => {
                                              res.json();
                                              this.upContValidator(res.json());
                                            });
   }

   upContValidator(respuesta: any){
    console.log(respuesta)
    if(respuesta.error==1 || respuesta.error==2 || respuesta.error==3){
      window.alert(respuesta.estatus);
    }
    else{
      
    }
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

  llenaRoles(resp: any){
    console.log(resp);

    this.mis_rolesActivos= new Array(resp.length);

    for (var _i = 0; _i < resp.length; _i++ ){
      this.mis_rolesActivos[_i]=resp[_i];
    }

    this.cargando=this.cargando-1;
    console.log("llenaTipos this.cargando: "+this.cargando);
  }

  llenaLaboratorio(resp: any)
  {
        console.log(resp);
    this.mis_lab= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_lab[_i]=resp[_i];

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
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/usuario/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'upDateAdmin');
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
    this.model=respuesta;
    if(respuesta.isRolActive==0){
      this.addRol(respuesta.rol_usuario_id,respuesta.rol);
    }
    if(respuesta.isLaboratorioActive==0){
      this. addLabs(respuesta.laboratorio_id, respuesta.laboratorio );
    }
    console.log(respuesta.foto);
    if(respuesta.foto == "null"){
      this.imgUrl= "../assets/img/gabino.jpg";
    }
    else{
      this.imgUrl= this.global.assetsRoot+respuesta.foto;
    }
    setTimeout(()=>{ this.model=respuesta;
                     this.cargando=this.cargando-1;
                     console.log("llenado this.cargando: "+this.cargando);
                     }, 0);
  }

  addRol(rol_usuario_id: any,rol: any){
    let aux= new Array(this.mis_rolesActivos.length+1);

    let index=0;
    for (var _i = 0; _i < aux.length; _i++ ){
       if(_i < aux.length-1){
        aux[_i]=this.mis_rolesActivos[_i];
      }else if(_i == aux.length-1){
        aux[_i]={'id_rol_usuario':rol_usuario_id,'rol':"*Desactivado*"+rol+"*Desactivado*"};
      }
    }
    this.mis_rolesActivos= new Array(aux.length);
    for (var _i = 0; _i < aux.length; _i++ ){
      this.mis_rolesActivos[_i]=aux[_i];
    }
  }
  
   addLabs(laboratorio_id: any,laboratorio: any){
    let aux= new Array(this.mis_lab.length+1);

    let index=0;
    for (var _i = 0; _i < aux.length; _i++ ){
       if(_i < aux.length-1){
        aux[_i]=this.mis_lab[_i];
      }else if(_i == aux.length-1){
        aux[_i]={'id_laboratorio':laboratorio_id,'laboratorio':"*Desactivado*"+laboratorio+"*Desactivado*"};
      }
    }
    this.mis_lab= new Array(aux.length);
    for (var _i = 0; _i < aux.length; _i++ ){
      this.mis_lab[_i]=aux[_i];
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
                       this.estatus,"","");

   model2= new Password(
                         this.password1,
                         this.npassword
                        )
}
