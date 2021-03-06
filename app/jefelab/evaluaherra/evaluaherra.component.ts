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
 condi= [{"condicion":"Muy Dañado", "id":"Muy Dañado"},
 {"condicion":"Dañado", "id":"Dañado"},
 {"condicion":"Regular", "id":"Regular"},
 {"condicion":"Buena", "id":"Buena"},{"condicion":"Muy Buena", "id":"Muy Buena"}];
 areas= [{"are":"CONCRETO", "id":"CONCRETO"},{"are":"GEOTECNIA", "id":"GEOTECNIA"},{"are":"ASFALTOS", "id":"ASFALTOS"}];
   auxx: any;    
  ordenForm: FormGroup; //se crea un formulario de tipo form group
  tipoForm: FormGroup;
  paseForm: FormGroup;
   id: string;
   idher: string;
 
   mis_cli: Array<any>;
   mis_obras: Array<any>;
   mis_jefes: Array<any>;
   hidden = true;
   hiddenDetail = true;
   hiddenHerramienta =true;
   hiddenFormato= true;
   hiddenFormatoDispo = true;
   hiddenTecnicos: any;
   hiddenw= true;
   error: any;
   forma={
     condicion: "",
     observaciones: ""
   };

 
  

  ngOnInit(){
       this.hiddenTecnicos = true;
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    this.cargando=2;
 
      this.tipoForm = new FormGroup({
        'condicion': new FormControl( this.forma.condicion,  [Validators.required]),
        'observaciones': new FormControl( this.forma.observaciones,  [Validators.required])
          });

       console.log(this.id);
      }

      
 

   
  get condicion() {return this.tipoForm.get('condicion');}
  get observaciones() {return this.tipoForm.get('observaciones');}
 
 
 
  actualizaCondicion()
  {

     let url = `${this.global.apiRoot}/herramienta/post/endpoint.php`;
     let formData:FormData = new FormData();
        formData.append('function', 'evaluateHerra');
        formData.append('condicion', this.tipoForm.value.condicion);
        formData.append('rol_usuario_id', this.global.rol);
        formData.append('token', this.global.token);
        formData.append('id_herramienta', this.idher );
        formData.append('observaciones', this.tipoForm.value.observaciones);    
        
        this.http.post(url, formData).subscribe(res => {
                                                  console.log(res);
                                              this.respuestaSwitch(res.json());
                                            });
  }

   respuestaSwitch(res: any){
     console.log(res);
     if(res.error!= 0){
       window.alert("Intentalo otra vez");
       location.reload();
     }
     else{
       window.alert("Insertado con exito.");
       this.cargando = 0;
       //this.regresaOrdenTrabajo2();
       this.hiddenw = false
       setTimeout(() =>{this.hiddenw = true},1000);   
       this.hidden = !this.hidden;  
     }
   }

   respuestaSwitchFinOrden(res: any){
     console.log(res);
     if(res.error!= 0){
       //window.alert("Intentalo otra vez");
       window.alert(res.estatus);
       location.reload();
     }
     else{
       window.alert("Insertado con exito.");
       this.cargando = 0;
       //this.regresaOrdenTrabajo2();
       this.regresaOrdenTrabajo2();
     }
   }

  
   submitted = false;

    
 

  regresaOrdenTrabajo(){
    this.router.navigate(['jefeLaboratorio/orden-trabajo/dashboard/'+ this.id]);
  }


  regresaOrdenTrabajo2(){
    this.router.navigate(['jefeLaboratorio/orden-trabajo/']);
  }


  onSubmit() { this.submitted = true; }

  TerminaOrdenTrabajo(){
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ordenDeTrabajo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'completeOrden');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol); 
    formData.append('id_ordenDeTrabajo', this.id);
    this.http.post(url, formData).subscribe(res => {
                                                     this.respuestaSwitchFinOrden(res.json());
                                                     
                                                                                      });
  }

/*SHIT TO BE DELETED
  this.auxx=aux3;
*/

 
  evaHerra(aux3: any){
    console.log(aux3);
    this.idher = aux3.ids;
    console.log(this.idher);
   
    if(this.hidden  == true){
      this.hidden  = !this.hidden;
    }
    else{
       this.hidden = true;
       setTimeout(() =>{this.hidden = false},1000);
    }

    console.log(aux3);

    if(!aux3.error){
      this.tipoForm.patchValue({
        condicion: aux3.cond,
        observaciones: ""
      });
    }
    else{
        this.hidden  = !this.hidden;
        this.TerminaOrdenTrabajo();
        this.idher = aux3.ids;         
     
      
    }
    console.log(this.tipoForm.value.condicion);
    console.log(this.id);
    console.log(aux3.error);
    console.log(this.hidden);
    
  }
}