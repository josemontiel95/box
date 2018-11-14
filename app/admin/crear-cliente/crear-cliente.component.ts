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
  styleUrls: ['./crear-cliente.component.scss', '../../loadingArrows.css']
})
export class CrearClienteComponent implements OnInit{
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
    telefono: '',
    nombreContacto: '',
    calle: '',
    noExt: '',
    noInt: '',
    col: '',
    municipio: '',
    estado: '',
    telefonoDeContacto: '',
    //se creo un arreglo llamado cliente con los campos del form
  };
    estadoss= [{"estado":"Aguascalientes", "id":"Aguascalientes"},              {"estado":"Baja California", "id":"Baja California"},
               {"estado":"Baja California Sur", "id":"Baja California Sur"},    {"estado":"Baja Campeche", "id":"Baja Campeche"},
               {"estado":"Coahuila de Zaragoza", "id":"Coahuila de Zaragoza"},  {"estado":"Colima", "id":"Colima"},
               {"estado":"Chiapas", "id":"Chiapas"},                            {"estado":"Chihuahua", "id":"Chihuahua"},
               {"estado":"CDMX", "id":"CDMX"},                                  {"estado":"Durango", "id":"Durango"},
               {"estado":"Guanajuato", "id":"Guanajuato"},                      {"estado":"Guerrero", "id":"Guerrero"},
               {"estado":"Hidalgo", "id":"Hidalgo"},                            {"estado":"Jalisco", "id":"Jalisco"},
               {"estado":"Mexico", "id":"Mexico"},                              {"estado":"Michoacan de Ocampo", "id":"Michoacan de Ocampo"},
               {"estado":"Morelos", "id":"Morelos"},                            {"estado":"Nayarit", "id":"Nayarit"},
               {"estado":"Nuevo Leon", "id":"Nuevo Leon"},                      {"estado":"Oaxaca", "id":"Oaxaca"},
               {"estado":"Puebla", "id":"Puebla"},                              {"estado":"Queretaro", "id":"Queretaro"},
               {"estado":"Quintana Roo", "id":"Quintana Roo"},                  {"estado":"San Luis Potosi", "id":"San Luis Potosi"},
               {"estado":"Sinaloa", "id":"Sinaloa"},                            {"estado":"Sonora", "id":"Sonora"},
               {"estado":"Tabasco", "id":"Tabasco"},                            {"estado":"Tamaulipas", "id":"Tamaulipas"},
               {"estado":"Tlaxcala", "id":"Tlaxcala"},                          {"estado":"Veracruz de Ignacio de la Llave", "id":"Veracruz de Ignacio de la Llave"},
               {"estado":"Yucatan", "id":"Yucatan"},                            {"estado":"Zacatecas", "id":"Zacatecas"}];


  cargandoMessage: string= "";
  actualizarMessageCargando: string= "";
  cargando = 1;


  //inicio y llenados
  ngOnInit() {
    this.cargando = 2;
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
      'rfc':                 new FormControl(this.cliente.rfc,                 [ Validators.required, Validators.pattern("([A-ZÑ&]{3,4})([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01]))(([A-Z]|[0-9]){2})([A]|[0-9])") ]), 
      'nombre':              new FormControl(this.cliente.nombre,                Validators.required), 
      'razonSocial':         new FormControl(this.cliente.razonSocial,           Validators.required), 
      'calle':               new FormControl(this.cliente.calle,               [ Validators.required]), 
      'noExt':               new FormControl(this.cliente.noExt,               [ Validators.required]), 
      'noInt':               new FormControl(this.cliente.noInt, ), 
      'col':                 new FormControl(this.cliente.col,                 [ Validators.required]), 
      'municipio':           new FormControl(this.cliente.municipio,           [ Validators.required]), 
      'estado':              new FormControl(this.cliente.estado,              [ Validators.required]), 
      'telefono':            new FormControl(this.cliente.telefono,            [ Validators.required, Validators.pattern("^([0-9])*")]), 
      'nombreContacto':      new FormControl(this.cliente.nombreContacto,        Validators.required), 
      'telefonoDeContacto':  new FormControl(this.cliente.telefonoDeContacto,  [ Validators.required, Validators.pattern("^([0-9])*")]), 
      'email':               new FormControl(this.cliente.email,               [ Validators.required, Validators.pattern("[^ @]*@[^ @]*") ])
    });
  }

  // funcion para acceder de manera sencilla a los campos del form
  // referencia: https://angular.io/guide/reactive-forms

  get rfc()                 { return this.clienteForm.get('rfc'); }
  get nombre()              { return this.clienteForm.get('nombre'); }
  get razonSocial()         { return this.clienteForm.get('razonSocial'); }
  get calle()               { return this.clienteForm.get('calle'); }
  get noExt()               { return this.clienteForm.get('noExt'); }
  get noInt()               { return this.clienteForm.get('noInt'); }
  get col()                 { return this.clienteForm.get('col'); }
  get municipio()           { return this.clienteForm.get('municipio'); }
  get estado()              { return this.clienteForm.get('estado'); }
  get telefono()            { return this.clienteForm.get('telefono'); }
  get nombreContacto()      { return this.clienteForm.get('nombreContacto'); }
  get telefonoDeContacto()  { return this.clienteForm.get('telefonoDeContacto'); }
  get email()               { return this.clienteForm.get('email'); }



  llenaRoles(resp: any){
    console.log("llenaRoles :: this.cargando: "+this.cargando);
    this.cargando=this.cargando-1;

    this.mis_roles= new Array(resp.length);
    var j=resp.length-1;
    for (var _i=0;_i<resp.length;_i++){
      this.mis_roles[_i]=resp[j];
      j--;
    }
  }
  onChangeRazonSocial(){
    if(this.clienteForm.value.nombre == ""){
      this.clienteForm.patchValue({
        nombre: this.clienteForm.value.razonSocial
      });
    }
  }

  llenaLaboratorio(resp: any){
    console.log("llenaLaboratorio :: this.cargando: "+this.cargando);
    this.cargando=this.cargando-1;
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


  crearCliente( ){
    this.cargando = 1;
    //la nueva forma de obtener el valor es a través del valor del form sin necesidad de un parceo con hash (#)
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/cliente/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function',           'insertAdmin');
    formData.append('token',              this.global.token);
    formData.append('rol_usuario_id',     this.global.rol);

    formData.append('razonSocial',        this.clienteForm.value.razonSocial);
    formData.append('nombre',             this.clienteForm.value.nombre);
    formData.append('telefono',           this.clienteForm.value.telefono);  
    formData.append('calle',              this.clienteForm.value.calle);
    formData.append('noExt',              this.clienteForm.value.noExt);
    formData.append('noInt',              this.clienteForm.value.noInt);
    formData.append('col',                this.clienteForm.value.col);
    formData.append('municipio',          this.clienteForm.value.municipio);
    formData.append('estado',             this.clienteForm.value.estado);
    formData.append('rfc',                this.clienteForm.value.rfc);      
    formData.append('telefonoDeContacto', this.clienteForm.value.telefonoDeContacto);     
    formData.append('email',              this.clienteForm.value.email);  
    formData.append('nombreContacto',     this.clienteForm.value.nombreContacto);

    this.cargandoMessage="Cargando...";
    this.http.post(url, formData).subscribe(res => this.diplay(res.json()) );

  }

  diplay(crearResp: CrearResp){
    console.log("respuestaError this.cargando: "+this.cargando);
    this.cargando=this.cargando-1;
    if(crearResp.error==0){
      this.cargandoMessage="";
      this.actualizarMessageCargando=crearResp.estatus;
      console.log(crearResp);
      setTimeout(()=>{ this.router.navigate(['administrador/clientes'])}, 1500);
       
    }else{
      this.actualizarMessageCargando="";
      switch (crearResp.error) {
        case 1:
          
          this.cargandoMessage=crearResp.estatus;
          window.alert(this.cargandoMessage);
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
          this.cargandoMessage=crearResp.estatus;
          window.alert(this.cargandoMessage);
          break;
      }
      
    }
  }


}