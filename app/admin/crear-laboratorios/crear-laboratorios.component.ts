import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Laboratorios }    from './Laboratorios';
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
  selector: 'app-crear-laboratorios',
  templateUrl: './crear-laboratorios.component.html',
  styleUrls: ['./crear-laboratorios.component.scss', '../../loadingArrows.css']
})
export class CrearLaboratoriosComponent implements OnInit {


  global: Global;
  cargando= 0;
  
  mis_lab: Array<any>;
  constructor(private router: Router, private data: DataService, private http: Http) { }
  
  laboratorioForm: FormGroup;

  Laboratorio= {
    laboratorio: '',  
    estado: '',
    municipio: ''  
  }

  estados= [{"estado":"Aguascalientes", "id":"Aguascalientes"},{"estado":"Baja California", "id":"Baja California"},{"estado":"Baja California Sur", "id":"Baja California Sur"},{"estado":"Baja Campeche", "id":"Baja Campeche"},{"estado":"Coahuila de Zaragoza", "id":"Coahuila de Zaragoza"},{"estado":"Colima", "id":"Colima"},{"estado":"Chiapas", "id":"Chiapas"},{"estado":"Chihuahua", "id":"Chihuahua"},{"estado":"CDMX", "id":"CDMX"},{"estado":"Durango", "id":"Durango"},{"estado":"Guanajuato", "id":"Guanajuato"},{"estado":"Guerrero", "id":"Guerrero"},{"estado":"Hidalgo", "id":"Hidalgo"},{"estado":"Jalisco", "id":"Jalisco"},{"estado":"México", "id":"México"},{"estado":"Michoacan de Ocampo", "id":"Michoacan de Ocampo"},{"estado":"Morelos", "id":"Morelos"},{"estado":"Nayarit", "id":"Nayarit"},{"estado":"Nuevo Leon", "id":"Nuevo Leon"},{"estado":"Oaxaca", "id":"Oaxaca"},{"estado":"Puebla", "id":"Puebla"},{"estado":"Querétaro", "id":"Querétaro"},{"estado":"Quintana Roo", "id":"Quintana Roo"},{"estado":"San Luis Potosí", "id":"San Luis Potosí"},{"estado":"Sinaloa", "id":"Sinaloa"},{"estado":"Sonora", "id":"Sonora"},{"estado":"Tabasco", "id":"Tabasco"},{"estado":"Tamaulipas", "id":"Tamaulipas"},{"estado":"Tlaxcala", "id":"Tlaxcala"},{"estado":"Veracruz de Ignacio de la Llave", "id":"Veracruz de Ignacio de la Llave"},{"estado":"Yucatán", "id":"Yucatán"},{"estado":"Zacatecas", "id":"Zacatecas"},];
  crearLaboratorio(){
    this.cargando= 1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/laboratorio/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertAdmin');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', "1001");
    formData.append('laboratorio', this.laboratorioForm.value.laboratorio);
      
    formData.append('estado', this.laboratorioForm.value.estado);
    formData.append('municipio', this.laboratorioForm.value.municipio);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                            } );

  }


   respuestaSwitch(res: any){
     this.cargando= this.cargando-1;
     console.log(res);
     if(res.error!= 0){
       window.alert(res.estatus);
       location.reload();
     }
     else{
       this.regresaLaboratorio();
     }
   }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=0;
     this.laboratorioForm = new FormGroup({
      'laboratorio': new FormControl(this.Laboratorio.laboratorio, Validators.required), 
      'estado': new FormControl(this.Laboratorio.estado,  Validators.required), 
      'municipio': new FormControl(this.Laboratorio.municipio,  Validators.required)    });
 
  }


  get laboratorio()    { return this.laboratorioForm.get('laboratorio'); }
  get estado()         { return this.laboratorioForm.get('estado'); }
  get municipio()      { return this.laboratorioForm.get('municipio'); }


   submitted = false;

   regresaLaboratorio(){
    this.router.navigate(['administrador/laboratorios']);
  }

  onSubmit() { this.submitted = true; }

}




