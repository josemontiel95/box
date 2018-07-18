import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Herramienta }    from './Herramienta';
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
  selector: 'app-crear-herramientas',
  templateUrl: './crear-herramientas.component.html',
  styleUrls: ['./crear-herramientas.component.scss']
})
export class CrearHerramientasComponent  {


  apiRoot: string = "http://lacocs.montielpalacios.com/usuario";
  global: Global;
  
  constructor(private router: Router, private data: DataService, private http: Http) { }
  
  model = new Herramienta('18', 'Dr IQ', '19/05/2010', 'IQ', '1001');

  crearHerramienta(descripcion: string, tipo: string, fechaDeComp: string, condicion: string, laboratorio_id: string){

  }


   submitted = false;

  onSubmit() { this.submitted = true; }

}
