import { Component, OnInit } from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { LoginResp } from "../../interfaces/int.LoginResp";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.css' , '../../loadingArrows.css']
})
export class ClienteDetailComponent implements OnInit {


    submitted = false;
    hidden = true;
    imgUrl = "../assets/img/gabino.jpg";
    onSubmit() { this.submitted = true; }

    loginMessage: string= "";
    loginresp: LoginResp;
    global: Global;
    desBut=true;
    actBut=false;
    resppass= false;
    exitoCon = false;;
    id: string;
    foto: string;
    cargando= 1;
    
 clienteForm: FormGroup; //se crea un formulario de tipo form group

  
   cliente = {
    id_cliente: '',
    rfc: '',
    razonSocial: '',
    nombre: '',
        email: '',
        telefono: '',
        nombreContacto: '',
        direccion: '',
        telefonoDeContacto: '',
        //se creo un arreglo llamado cliente con los campos del form
        };


    model2= new Password(
                         "",
                         ""
                        );


  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    this.cargando=1;

    let url = `${this.global.apiRoot}/cliente/get/endpoint.php`;
	  let search = new URLSearchParams();
	  search.set('function', 'getByIDAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_cliente', this.id);
	this.http.get(url, {search}).subscribe(res => {this.llenado(res.json()); 
                                                 this.llenadoValidator(res.json());
                                               });

   // se inicializan los campos del form y se añaden un validador personalizado para email que confirma la existencia del arroba "@"

    this.clienteForm = new FormGroup({
      'rfc': new FormControl( { value:this.cliente.rfc, disabled: this.hidden },  [Validators.required, Validators.pattern("^(([A-Z]|[a-z]|\s){1})(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3})) || ^(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3})) ") ]), 
      'nombre': new FormControl({ value: this.cliente.nombre, disabled: this.hidden },  [ Validators.required]),
      'razonSocial': new FormControl({ value: this.cliente.razonSocial, disabled: this.hidden },  [  Validators.required]),
      'direccion': new FormControl({ value: this.cliente.direccion, disabled: this.hidden },  [  Validators.required]), 
      'telefono': new FormControl({ value: this.cliente.telefono, disabled: this.hidden },  [  Validators.required]),
      'nombreContacto': new FormControl({ value: this.cliente.nombreContacto, disabled: this.hidden },  [  Validators.required]), 
      'telefonoDeContacto': new FormControl({ value: this.cliente.telefonoDeContacto, disabled: this.hidden },  [  Validators.required]),
      'email': new FormControl({ value: this.cliente.email, disabled: this.hidden },  [Validators.required, Validators.pattern("[^ @]*@[^ @]*") ])

                                        
                                 });



  }

  // funcion para acceder de manera sencilla a los campos del form
  // referencia: https://angular.io/guide/reactive-forms

  get rfc() { return this.clienteForm.get('rfc'); }

  get nombre() { return this.clienteForm.get('nombre'); }

  get razonSocial() { return this.clienteForm.get('razonSocial'); }

  get direccion() { return this.clienteForm.get('direccion'); }

  get telefono() { return this.clienteForm.get('telefono'); }

  get nombreContacto() { return this.clienteForm.get('nombreContacto'); }

  get telefonoDeContacto() { return this.clienteForm.get('telefonoDeContacto'); }

  get email() { return this.clienteForm.get('email'); }



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
     let url = `${this.global.apiRoot}/cliente/get/endpoint.php`;
     let search = new URLSearchParams();
     search.set('function', 'upDateContrasena');
     search.set('constrasena', password1);
     search.set('id_cliente', this.id);

        search.set('rol_usuario_id', this.global.rol);
        search.set('token', this.global.token);
        this.http.get(url, {search}).subscribe(res => {
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

  regresaCliente(){
    this.router.navigate(['jefeLaboratorio/clientes']);
  }


  subirFoto(){
    this.router.navigate(['jefeLaboratorio/insertar-fotocliente/'+this.id]);
  }

  mostrar()
  {
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.clienteForm.controls).forEach((controlName) => {
        this.clienteForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
  }



  actualizarCliente( )
  {
    let url = `${this.global.apiRoot}/cliente/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'upDateAdmin');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);


    formData.append('id_cliente', this.id);
    formData.append('rfc', this.clienteForm.value.rfc);
    formData.append('razonSocial', this.clienteForm.value.razonSocial);
    formData.append('email', this.clienteForm.value.email);
    formData.append('nombre', this.clienteForm.value.nombre);
    formData.append('telefono', this.clienteForm.value.telefono);
    formData.append('nombreContacto', this.clienteForm.value.nombreContacto);
    formData.append('direccion', this.clienteForm.value.direccion);
    formData.append('telefonoDeContacto', this.clienteForm.value.telefonoDeContacto);

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
    console.log(respuesta);
    console.log(respuesta.foto);
    if(respuesta.foto == "null"){
      this.imgUrl= "../assets/img/gabino2.jpg";
      console.log("--"+respuesta.foto);
    }
    else{
      this.imgUrl= this.global.assetsRoot+respuesta.foto;
    }
    console.log("llenado this.cargando: "+this.cargando);
    this.cargando=this.cargando-1;
  }
  


}
