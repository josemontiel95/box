import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import * as moment from 'moment';
import { Cliente }    from './cliente';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';


@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.scss']
})
export class CrearClienteComponent implements OnInit
  {
  global: Global;
  constructor(private router: Router, 
              private data: DataService, 
              private http: Http) { }
 
    id_cliente: string;
  
    submitted = false;
    hidden = false;
    mis_roles: Array<any>;
    mis_lab: Array<any>;
    clienteForm: FormGroup; //se crea un formulario de tipo form group


   cliente = {
    id_cliente: '',
    rfc: '',
    razonSocial: '',
    nombre: '',
        email: '',
        telefono: 8686973,
        nombreContacto: '',
        direccion: '',
        telefonoDeContacto: 8686974,
        //se creo un arreglo llamado cliente con los campos del form
        };


  crearMessage: string= "";
  crearMessageCargando: string= "";


    //inicio y llenados
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);

  let url = `${this.global.apiRoot}/rol/get/endpoint.php`;
  let search = new URLSearchParams();
  search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
  this.http.get(url, {search}).subscribe(res => this.llenaRoles(res.json()) );

      url = `${this.global.apiRoot}/laboratorio/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => this.llenaLaboratorio(res.json()) );

    // se inicializan los campos del form y se añaden un validador personalizado para email que confirma la existencia del arroba "@"

    this.clienteForm = new FormGroup({
      'rfc': new FormControl(this.cliente.rfc, Validators.required), 
      'nombre': new FormControl(this.cliente.nombre, Validators.required), 
      'razonSocial': new FormControl(this.cliente.razonSocial,  Validators.required), 
      'direccion': new FormControl(this.cliente.direccion,  Validators.required), 
      'telefono': new FormControl(this.cliente.telefono,  Validators.required), 
      'nombreContacto': new FormControl(this.cliente.nombreContacto,  Validators.required), 
      'telefonoDeContacto': new FormControl(this.cliente.telefonoDeContacto,  Validators.required), 
      'email': new FormControl(this.cliente.email, [Validators.required, Validators.pattern("[^ @]*@[^ @]*") ])

                                        
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

    regresaCliente(){
    this.router.navigate(['administrador/clientes']);
  }



//insertar-foto


  onSubmit() { this.submitted = true; }


  crearCliente( )
  {
    //la nueva forma de obtener el valor es a través del valor del form sin necesidad de un parceo con hash (#)
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/cliente/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertAdmin');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('razonSocial', this.clienteForm.value.razonSocial);
    formData.append('nombre', this.clienteForm.value.nombre);
    formData.append('telefono', this.clienteForm.value.telefono);  
    formData.append('direccion', this.clienteForm.value.direccion); 
    formData.append('rfc', this.clienteForm.value.rfc);      
    formData.append('telefonoDeContacto', this.clienteForm.value.telefonoDeContacto);     
    formData.append('email',this.clienteForm.value.email);  
    formData.append('nombreContacto', this.clienteForm.value.nombreContacto); 
    this.crearMessageCargando="Cargando...";
    this.http.post(url, formData).subscribe(res => this.diplay(res.json()) );

  }

 diplay(crearResp: CrearResp){
    
    if(crearResp.error==0){
      this.crearMessage="";
      this.crearMessageCargando=crearResp.estatus;
      console.log(crearResp);
      setTimeout(()=>{ this.router.navigate(['administrador/clientes'])}, 1500);
       
    }else{
      this.crearMessageCargando="";
      switch (crearResp.error) {
        case 1:
          
          this.crearMessage=crearResp.estatus;
          window.alert(this.crearMessage);
          console.log(crearResp);
          let token: string;
          token= localStorage.getItem("token");
          let url = `${this.global.apiRoot}/cliente/get/endpoint.php`;
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
      }
      
    }
  }


}