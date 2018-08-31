import { GridComponent } from '../grid/grid.component';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
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
  selector: 'app-evaluaherra',
  templateUrl: './evaluaherra.component.html',
  styleUrls: ['./evaluaherra.component.css'] 
})
export class EvaluaHerraComponent implements OnInit {

  global: Global;
  cargando= 1;
      mis_tipos: Array<any>;
    mis_lab: Array<any>;
  constructor(private router: Router, private data: DataService, private http: Http,private route: ActivatedRoute) { }
  
 formatos = [{"format":"CONTROL DE CONCRETO HIDRAULICO", "id": "1"},{"format":"REVENIMIENTO", "id":"2"}]
 condi= [{"condicion":"Muy Dañado", "id":"Muy Dañado"},{"condicion":"Dañado", "id":"Dañado"},{"condicion":"Regular", "id":"Regular"},{"condicion":"Buena", "id":"Buena"},{"condicion":"Muy Buena", "id":"Muy Buena"}];
 areas= [{"are":"CONCRETO", "id":"CONCRETO"},{"are":"GEOTECNIA", "id":"GEOTECNIA"},{"are":"ASFALTOS", "id":"ASFALTOS"}];
   auxx: any;    
  ordenForm: FormGroup; //se crea un formulario de tipo form group
  tipoForm: FormGroup;
  paseForm: FormGroup;
   id: string;
 
   mis_cli: Array<any>;
   mis_obras: Array<any>;
   mis_jefes: Array<any>;
   hidden = true;
   hiddenDetail = true;
   hiddenHerramienta =true;
   hiddenFormato= true;
   hiddenFormatoDispo = true;
   hiddenTecnicos: any;

   
   forma={
     condicion: ""
   };

 
  

  ngOnInit(){
       this.hiddenTecnicos = true;
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    this.cargando=2;
 
      this.tipoForm = new FormGroup({'condicion': new FormControl(  this.forma.condicion)
          });

 
      }

      
 

   get condicion() {return this.tipoForm.get('condicion');}
  
 
 
 
  pasarlista()
  {

     let url = `${this.global.apiRoot}/Tecnicos_ordenDeTrabajo/post/endpoint.php`;
     let formData:FormData = new FormData();
        formData.append('function', 'insertAdmin');
       // formData.append('id_tecnicos_ordenDeTrabajo', this.ids);
        formData.append('rol_usuario_id', this.global.rol);
        formData.append('token', this.global.token);
        formData.append('email', this.paseForm.value.correo);
        formData.append('contrasena', this.paseForm.value.pass);    
        
        this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                            });
        this.hiddenTecnicos = true;
  }

   respuestaSwitch(res: any){
     console.log(res);
     if(res.error!= 0){
       window.alert("Intentalo otra vez");
       location.reload();
     }
     else{
       window.alert("Insertado con exito.");
     }
   }

  
   submitted = false;

    
 

   regresaOrdenTrabajo(){
    this.router.navigate(['jefeBrigada/orden-trabajo']);
  }

  onSubmit() { this.submitted = true; }

 
    addHerra(aux3: any)
     {
   
    this.auxx=aux3;
    this.hidden= !this.hidden;
    console.log(this.auxx);
    this.tipoForm.value.condicion=aux3;
     console.log(this.tipoForm.value.condicion);
     //this.parcha(aux3);
  }

 parcha(aux: any)
 {
      this.tipoForm.patchValue({
       condicion:  aux.condicion,
        });
 }
  

    llenado(respuesta: any){
    console.log(respuesta);

    this.ordenForm.patchValue({
     area: respuesta.area,
     id_ordenDeTrabajo: respuesta.id_ordenDeTrabajo,
     cotizacion_id:  respuesta.cotizacion_id,
     id_cliente:  respuesta.id_cliente,
     obra_id:  respuesta.obra_id,
     lugar:  respuesta.lugar,
     nombreContacto: respuesta.nombreContacto,
     telefonoDeContacto:  respuesta.telefonoDeContacto,
     actividades:  respuesta.actividades,
     condicionesTrabajo:  respuesta.condicionesTrabajo,
     jefe_brigada_id:  respuesta.jefe_brigada_id,
     fechaInicio:   respuesta.fechaInicio,
     fechaFin:  respuesta.fechaFin,
     horaInicio:  respuesta.horaInicio,
     horaFin:  respuesta.horaFin,
     observaciones: respuesta.observaciones,
     laboratorio_id: respuesta.laboratorio_id

    });

 

     
  }

 
 

 

 

}