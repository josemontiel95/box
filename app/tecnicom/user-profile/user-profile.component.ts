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
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css','../../loadingArrows.css']
})
export class UserProfileComponent implements OnInit {

    
    foto: string;
    
    submitted = false;
    hidden = true;
    mis_roles: Array<any>;
    mis_lab: Array<any>;
    imgUrl = "";
    cargando= 3;
    onSubmit() { this.submitted = true; }

    loginMessage: string= "";
    loginresp: LoginResp;
    global: Global;
    id: string;

    userForm: FormGroup;

    Usuario= {
              id_usuario: '',
              email: '',
              nombre: '',
              apellido: '',
              fechaDeNac: '',
              contrasena: '',
              rol_usuario_id: '',
              nss: '',
              laboratorio_id: ''};

  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) { }

  

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);

    this.cargando=3;

  let url = `${this.global.apiRoot}/rol/get/endpoint.php`;
  let search = new URLSearchParams();
  search.set('function', 'getForDroptdownAdmin');
  search.set('token', this.global.token);
  search.set('rol_usuario_id', this.global.rol);
  this.http.get(url, {search}).subscribe(res => {this.llenaRoles(res.json());
                                                 this.rolValidator(res.json());
                                                });

     url = `${this.global.apiRoot}/laboratorio/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {this.llenaLaboratorio(res.json());
                                                   this.labValidator(res.json());
                                                 });


    url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
	 search = new URLSearchParams();
	search.set('function', 'getIDByToken');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
	this.http.get(url, {search}).subscribe(res => {this.llenado(res.json()); 
                                                 this.llenadoValidator(res.json());});

    this.userForm = new FormGroup({
      'id_usuario':         new FormControl( { value:this.Usuario.id_usuario,       disabled: true },  [Validators.required]), 
      'apellido':           new FormControl( { value:this.Usuario.apellido,         disabled: this.hidden },  [Validators.required]), 
      'nombre':             new FormControl( { value:this.Usuario.nombre,           disabled: this.hidden },  [Validators.required]), 
      'rol_usuario_id':     new FormControl( { value:this.Usuario.rol_usuario_id,   disabled: this.hidden },  [Validators.required]), 
      'nss':                new FormControl( { value:this.Usuario.nss,              disabled: this.hidden }), 
      'laboratorio_id':     new FormControl( { value:this.Usuario.laboratorio_id,   disabled: this.hidden },  [Validators.required]), 
      'fechaDeNac':         new FormControl( { value:this.Usuario.fechaDeNac,       disabled: this.hidden },  [Validators.required]), 
      'email':              new FormControl( { value:this.Usuario.email,            disabled: this.hidden },  [Validators.required, Validators.pattern("[^ @]*@[^ @]*") ])
    });

  }

  get apellido()       { return this.userForm.get('apellido'); }
  get nombre()         { return this.userForm.get('nombre'); }
  get rol_usuario_id() { return this.userForm.get('rol_usuario_id'); }
  get direccion()      { return this.userForm.get('direccion'); }
  get laboratorio_id() { return this.userForm.get('laboratorio_id'); }
  get fechaDeNac()     { return this.userForm.get('fechaDeNac'); }
  get email()          { return this.userForm.get('email'); }

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

  llenadoValidator(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
    }
    else{
      
    }
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

   mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.userForm.controls).forEach((controlName) => {
        this.userForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
    this.userForm.controls['id_usuario']['disable']();
    this.userForm.controls['laboratorio_id']['disable']();
    this.userForm.controls['nss']['disable']();
    this.userForm.controls['email']['disable']();
    this.userForm.controls['rol_usuario_id']['disable']();
  }


   actualizarUsuario(){
    let url = `${this.global.apiRoot}/usuario/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function',           'upDateAdmin');
    formData.append('token',              this.global.token);
    formData.append('rol_usuario_id',     this.global.rol);

    formData.append('id_usuario',         this.userForm.getRawValue().id_usuario);
    formData.append('nombre',             this.userForm.value.nombre);
    formData.append('apellido',           this.userForm.value.apellido);
    formData.append('laboratorio_id',     this.userForm.getRawValue().laboratorio_id);
    formData.append('nss',                this.userForm.getRawValue().nss);
    formData.append('email',              this.userForm.getRawValue().email);
    formData.append('fechaDeNac',         this.userForm.value.fechaDeNac);
    formData.append('rol_usuario_id_new', this.userForm.getRawValue().rol_usuario_id);

    this.http.post(url, formData).subscribe(res => this.respuestaError(res.json()) );
  }

  respuestaError(resp: any){
    if(resp.error!=0){
      window.alert(resp.estatus);
      location.reload();
    }else{
      this.mostrar();
    }
  }


  subirFoto(){
    this.router.navigate(['administrador/insertar-foto/'+this.id]);
  }

    llenado(respuesta: any)
  {
    console.log(respuesta);
    this.userForm.patchValue({
      id_usuario: respuesta.id_usuario,
      apellido: respuesta.apellido,
      nombre: respuesta.nombre,
      email: respuesta.email,
      rol_usuario_id: respuesta.rol_usuario_id,
      nss: respuesta.nss,
      laboratorio_id: respuesta.laboratorio_id,
      fechaDeNac:respuesta.fechaDeNac,

    });

    if(respuesta.isRolActive==0){
      this.addRol(respuesta.rol_usuario_id,respuesta.rol);
    }
    if(respuesta.isLaboratorioActive==0){
      this. addLabs(respuesta.laboratorio_id, respuesta.laboratorio );
    }
    this.id = respuesta.id_usuario; //De aqui sacamos id para parametrisarlo en el método subirFoto.
    console.log(respuesta.foto);
    if(respuesta.foto == "null"){
      this.imgUrl= "../assets/img/gabino.jpg";
    }
    else{
      this.imgUrl= this.global.assetsRoot+respuesta.foto;
    }

    this.cargando=this.cargando-1;
  }

  addRol(rol_usuario_id: any,rol: any){
    let aux= new Array(this.mis_roles.length+1);

    let index=0;
    for (var _i = 0; _i < aux.length; _i++ ){
       if(_i < aux.length-1){
        aux[_i]=this.mis_roles[_i];
      }else if(_i == aux.length-1){
        aux[_i]={'id_rol_usuario':rol_usuario_id,'rol':"*Desactivado*"+rol+"*Desactivado*"};
      }
    }
    this.mis_roles= new Array(aux.length);
    for (var _i = 0; _i < aux.length; _i++ ){
      this.mis_roles[_i]=aux[_i];
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
  
  


}
