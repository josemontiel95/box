import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../data.service";
import { Global } from "../interfaces/int.Global";
import { CrearResp } from "../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import * as moment from 'moment';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {


  apiRoot: string = "http://lacocs.montielpalacios.com/usuario";
  global: Global;
  constructor(private router: Router, private data: DataService, private http: Http) { }
 
 /*
  myform: FormGroup;
  rol_usuario_idf: FormControl;
  emailf: FormControl;
  contrasenaf: FormControl;
  nombref: FormControl;
  apellidof: FormControl;
  laboratorio_idf: FormControl;
  fechaDeNacf: FormControl;
*/
  crearMessage: string= "";
  
  ngOnInit() {
    
  }
/*
  createFormControls() {
    this.rol_usuario_idf = new FormControl('', Validators.required);
    this.nombref = new FormControl('', Validators.required);
    this.apellidof = new FormControl('', Validators.required);
    this.fechaDeNacf = new FormControl('', Validators.required);
    this.emailf = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]@[^ @]")
    ]);
    this.contrasenaf = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.laboratorio_idf = new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]);
  }

  createForm() {
    this.myform = new FormGroup({
      name: new FormGroup({
        rol_usuario_idf: this.rol_usuario_idf,
        nombref: this.nombref,
        apellidof: this.apellidof,
        fechaDeNacf: this.fechaDeNacf,
      }),
      emailf: this.emailf,
      contrasenaf: this.contrasenaf,
      laboratorio_idf: this.laboratorio_idf
    });
  }
}


*/


  crearUsuario(rol_usuario_id: string, email: string, contrasena: string, nombre: string, apellido: string, /*nss: string,*/ laboratorio_id: string, fechaDeNac: string, error: string, envioDatos: boolean = true){
      
   let validador = 0;

   
  	 /*
      function emailDomainValidator(control: FormControl) { 
              let email = control.value; 
              if (email && email.indexOf("@") != -1) { 
                let [_, domain] = email.split("@"); 
                if (domain !== "lacocs.com") { 
                  return {
                    emailDomain: {
                      parsedDomain: domain
                    }
                  }
                }
              }
        return null; 
      }

*/
    error = "1";
   if(envioDatos == true){
  	  if(rol_usuario_id.length == 0)
  	  {
        validador = 1;
        envioDatos = false;
  	  }
      if(email.length == 0)
      {
        validador = 2;
        envioDatos = false;
      }
      if(contrasena.length == 0)
      {
        validador = 3;
        envioDatos = false;
      }
      if(nombre.length == 0)
      {
        validador = 4;
        envioDatos = false;
      }
      if(apellido.length == 0)
      {
        validador = 5;
        envioDatos = false;
      }
      if(laboratorio_id != "1001")
      {
        validador = 6;
        envioDatos = false;
      }
      if(fechaDeNac.length == 0)
      {
        validador = 7;
        envioDatos = false;
      }
      error = null;

      this.data.currentGlobal.subscribe(global => this.global = global);
      let url = `${this.apiRoot}/get/endpoint.php`;
      let search = new URLSearchParams();
      search.set('function', 'insert');
      search.set('token', this.global.token);
      search.set('rol_usuario_id', "1001");
      search.set('nombre', nombre);
      search.set('apellido', apellido);
      search.set('email', email);
      //search.set('nss', nss);
      search.set('fechaDeNac', fechaDeNac);
      search.set('rol_usuario_id_new', rol_usuario_id);
      search.set('constrasena', contrasena);
      search.set('error', error);

      
      this.http.get(url, {search}).subscribe(res => this.diplay(res.json()) );
    } //Fin enviarDatos
    else{
      switch(validador)
      {
        case 1:
        this.crearMessage = "Rol de usuario vacio";
        break;
        case 2:
        this.crearMessage = "Email de usuario vacio";
        break;
        case 3:
        this.crearMessage = "Contraseña de usuario vacia";
        break;
        case 4:
        this.crearMessage = "Nombre de usuario vacio";
        break;
        case 5:
        this.crearMessage = "Apellido de usuario vacio";
        break;
        case 6:
        this.crearMessage = "ID de Laboratorio incorrecto";
        break;
        case 7:
        this.crearMessage = "Fecha de nacimiento vacia";
        break;
      }
       
       error = null;

      this.data.currentGlobal.subscribe(global => this.global = global);
      let url = `${this.apiRoot}/get/endpoint.php`;
      let search = new URLSearchParams();
      search.set('function', 'insert');
      search.set('token', this.global.token);
      search.set('rol_usuario_id', "1001");
      search.set('nombre', nombre);
      search.set('apellido', apellido);
      search.set('email', email);
      //search.set('nss', nss);
      search.set('fechaDeNac', fechaDeNac);
      search.set('rol_usuario_id_new', rol_usuario_id);
      search.set('constrasena', contrasena);

      
      this.http.get(url, {search}).subscribe(res => this.diplay(res.json()) );

    }
}

diplay(crearResp: CrearResp){
    
    if(crearResp.error==0){
      console.log(crearResp);
   	  this.router.navigate(['administrador/insertar-foto']);
    }else{
      this.crearMessage=crearResp.estatus;
    }
  }

}