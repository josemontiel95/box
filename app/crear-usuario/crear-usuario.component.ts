import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../data.service";
import { Global } from "../interfaces/int.Global";
import { CrearResp } from "../interfaces/int.CrearResp";
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


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent  {
//implements OnInit

  apiRoot: string = "http://lacocs.montielpalacios.com/usuario";
  global: Global;
  constructor(private router: Router, 
              private data: DataService, 
              private http: Http) { }
 
 
  model = new Usuario('18', 'Dr IQ', '99999', 'IQ', 'Overstreet','19/05/2010');
 /*
 rol_usuario_id: FormControl;
  email: FormControl;
  contrasena: FormControl;
  nombre: FormControl;
  apellido: FormControl;
  laboratorio_id: FormControl;
  fechaDeNac: FormControl;
*/

  crearMessage: string= "";
  
   /* ngOnInit() {
        this.CreaUForm = this.formBuilder.group({
            rol_usuario_id: ['', Validators.required],
            email: ['', Validators.required],
            contrasena: ['', Validators.required],
            nombre: ['', Validators.required],
            apellido: ['', Validators.required],
            laboratorio_id: ['', Validators.required],
            fechaDeNac: ['', Validators.required]
        })};*/


  submitted = false;

  onSubmit() { this.submitted = true; }
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


}