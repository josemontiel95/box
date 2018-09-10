import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import * as moment from 'moment';
import { Usuario }    from './Usuario';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

  //Esto es un dummy, borralo despues.

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit
  {
  global: Global;
  constructor(private router: Router, 
              private data: DataService, 
              private http: Http) { }
 
    id_usuario: string ;
    foto: string;
    laboratorio: string;
    nss: string;
    rol: string;
    submitted = false;
    hidden = false;
    mis_roles: Array<any>;
    mis_lab: Array<any>;
    
    userForm: FormGroup;

  Usuario= {
            email: '',
            nombre: '',
            apellido: '',
            fechaDeNac: '',
            contrasena: '',
            rol_usuario_id: '',
            nss: '',
            laboratorio_id: ''};


  crearMessage: string= "";
  crearMessageCargando: string= "";


    //inicio y llenados
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);

    let url = `${this.global.apiRoot}/rol/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
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

     this.userForm = new FormGroup({
      'apellido': new FormControl(this.Usuario.apellido, Validators.required), 
      'nombre': new FormControl(this.Usuario.nombre, Validators.required), 
      'rol_usuario_id': new FormControl(this.Usuario.rol_usuario_id,  Validators.required), 
      'nss': new FormControl(this.Usuario.nss,), 
      'laboratorio_id': new FormControl(this.Usuario.laboratorio_id,  Validators.required), 
      'contrasena': new FormControl(this.Usuario.contrasena,  Validators.required), 
      'fechaDeNac': new FormControl(this.Usuario.fechaDeNac,  Validators.required), 
      'email': new FormControl(this.Usuario.email, [Validators.required, Validators.pattern("[^ @]*@[^ @]*") ])

                                        
                                      });

  }

    get apellido() { return this.userForm.get('apellido'); }

  get nombre() { return this.userForm.get('nombre'); }

  get rol_usuario_id() { return this.userForm.get('rol_usuario_id'); }

  get direccion() { return this.userForm.get('direccion'); }

  get laboratorio_id() { return this.userForm.get('laboratorio_id'); }

  get contrasena() { return this.userForm.get('contrasena'); }

  get fechaDeNac() { return this.userForm.get('fechaDeNac'); }

  get email() { return this.userForm.get('email'); }


  rolValidator(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==5 || repuesta.error==6){
      window.alert(repuesta.estatus);
    }
    else{
      
    }
  }

  labValidator(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==5 || repuesta.error==6){
      window.alert(repuesta.estatus);
    }
    else{
      
    }
  }

  llenaRoles(resp: any)
  {
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


  regresaUsuario(){
    this.router.navigate(['administrador/usuarios']);
  }
//insertar-foto


  onSubmit() { this.submitted = true; }


  crearUsuario( ){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/usuario/post/endpoint.php`;
    let formData:FormData = new FormData();

    formData.append('function', 'insertAdmin');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', '1001');
    formData.append('nombre', this.userForm.value.nombre);
    formData.append('apellido', this.userForm.value.apellido);
    formData.append('laboratorio_id', this.userForm.value.laboratorio_id);
    formData.append('nss', this.userForm.value.nss);
    formData.append('email', this.userForm.value.email);
    formData.append('fechaDeNac',this.userForm.value.fechaDeNac);
    formData.append('rol_usuario_id_new', this.userForm.value.rol_usuario_id);
    formData.append('constrasena', this.userForm.value.contrasena);

    this.crearMessageCargando="Cargando...";
    this.http.post(url, formData).subscribe(res => this.diplay(res.json()) );

  }

  diplay(crearResp: CrearResp){
    console.log(crearResp);
    if(crearResp.error==0){
      this.crearMessage="";
      this.crearMessageCargando=crearResp.estatus;
      console.log(crearResp);
      setTimeout(()=>{ this.router.navigate(['administrador/insertar-foto/'+crearResp.id_usuario])}, 1500);
       
    }else{
      this.crearMessageCargando="";
      switch (crearResp.error) {
        case 1:
          
          this.crearMessage=crearResp.estatus;
          window.alert(this.crearMessage);
          console.log(crearResp);
          let token: string;
          token= localStorage.getItem("token");
          let url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
          let search = new URLSearchParams();
          search.set('function', 'cerrarSesion');
          search.set('token', token);
          this.http.get(url, {search}).subscribe(res => {
                                                      console.log(res.json().estatus);
                                                      this.router.navigate(['login']); 
                                                    });
          break;
        case 2:
          this.crearMessage=crearResp.estatus;
          window.alert(this.crearMessage);
          break;

        case 3:
          this.crearMessage=crearResp.estatus;
          window.alert(this.crearMessage);
          console.log(crearResp);
           token= "";
          token= localStorage.getItem("token");
           url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
           search = new URLSearchParams();
          search.set('function', 'cerrarSesion');
          search.set('token', token);
          this.http.get(url, {search}).subscribe(res => {
                                                      console.log(res.json().estatus);
                                                      this.router.navigate(['login']); 
                                                    });
          break;

        case 4:
          this.crearMessage=crearResp.estatus;
          window.alert(this.crearMessage);
          break;
      }
      
    }
  }


}