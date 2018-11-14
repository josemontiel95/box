import { Component, OnInit } from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { LoginResp } from "../../interfaces/int.LoginResp";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import { Laboratorio }    from './laboratorio';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';


@Component({
  selector: 'app-laboratorio-detail',
  templateUrl: './laboratorio-detail.component.html',
  styleUrls: ['./laboratorio-detail.component.css','../../loadingArrows.css']
})
export class LaboratorioDetailComponent implements OnInit {
  onSubmit() { this.submitted = true; }
  laboratorioForm: FormGroup;

  laboratorio2= {
    laboratorio: '',  
    estado: '',
    municipio: ''  ,
    id_laboratorio: ''
  }
    tipo: string;
    estatus: string;
    error: string;
    cargando= 1;
    active: any;
    submitted = false;
    hidden = true;
    mis_tipos: Array<any>;
    mis_lab: Array<any>;
    imgUrl = "";

    cargandoMessage: string= "";
    actualizarMessageCargando: string= "";

    global: Global;
    desBut=true;
    actBut=false;
    resppass= false;
    exitoCon = false;
    password1: string;
    npassword: string;
    id: string;
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

  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    //window.alert(this.id);
    this.cargando=1;
    
    let url = `${this.global.apiRoot}/laboratorio/get/endpoint.php`;
	  let search = new URLSearchParams();
	  search.set('function', 'getByIDAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_laboratorio', this.id);
	  this.http.get(url, {search}).subscribe(res => {
                                                   this.llenado(res.json()) 

                                                    });
    
    this.laboratorioForm = new FormGroup({
      'laboratorio':     new FormControl( { value:this.laboratorio2.laboratorio   , disabled: this.hidden },  [Validators.required]),
      'estado':          new FormControl( { value:this.laboratorio2.estado        , disabled: this.hidden },  [Validators.required]),
      'municipio':       new FormControl( { value:this.laboratorio2.municipio     , disabled: this.hidden },  [Validators.required]),
      'id_laboratorio':  new FormControl( { value:this.laboratorio2.id_laboratorio, disabled: true        },  [Validators.required,  Validators.pattern("^([0-9])*")])
    });
    //console.log(this.estadoss);
  }

  get laboratorio()    { return this.laboratorioForm.get('laboratorio'       );}
  get estado()         { return this.laboratorioForm.get('estado'            );}
  get municipio()      { return this.laboratorioForm.get('municipio'         );}
  get id_laboratorio() { return this.laboratorioForm.get('id_laboratorio'    );}


  switchAlerta(exitoCon: any){
    this.exitoCon = false;
  }

  regresaHerramientas(){
    this.router.navigate(['administrador/laboratorios']);
  }


  mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.laboratorioForm.controls).forEach((controlName) => {
        this.laboratorioForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
    this.laboratorioForm.controls['id_laboratorio']['disable']();
  }

  actualizarLaboratorio(){
    this.cargando=1;
    this.cargandoMessage="Cargando..."
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/laboratorio/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'upDateAdmin');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', '1001');
    formData.append('id_laboratorio', this.id);
    formData.append('laboratorio', this.laboratorioForm.value.laboratorio);
    formData.append('estado', this.laboratorioForm.value.estado);
    formData.append('municipio', this.laboratorioForm.value.municipio);
    this.http.post(url, formData).subscribe(res =>  {
                                              this.respuestaError(res.json());
                                            } );
   }


  respuestaError(resp: any){
    //console.log("respuestaError this.cargando: "+this.cargando);
    this.cargando=this.cargando-1;
    //console.log(resp);
    if(resp.error!=0){ // El error es verdadero
      window.alert(resp.estatus);
      location.reload();
    }
    else{
      //window.alert(resp.estatus);
      this.mostrar();
    }
    this.cargandoMessage="";
    this.actualizarMessageCargando=resp.estatus;
     setTimeout(()=>{ 
                     this.actualizarMessageCargando="";
                     }, 3500); 
  }

  llenado(respuesta: any){
    //console.log(respuesta);
    this.laboratorioForm.patchValue({
      laboratorio:    respuesta.laboratorio,
      estado:         respuesta.estado,
      municipio:      respuesta.municipio,
      id_laboratorio: respuesta.id_laboratorio
    });

    this.status(respuesta.active);


    //console.log("llenado this.cargando: "+this.cargando);
    this.cargando=this.cargando-1;

   
  }

  status(active: any){
    if (active == 1) {
      this.actBut = false;
      this.desBut = true;
    }else{
      this.actBut= true;
      this.desBut= false;
    }
  }

  desactivarLaboratorio(){
     this.actBut= true;
     this.desBut= false;
     this.switchActive(0);
  }

   activarLaboratorio(){
     this.actBut = false;
     this.desBut = true;
     this.switchActive(1);
   }

  switchActive(active: number){
    this.cargando=1;
    let url = `${this.global.apiRoot}/laboratorio/post/endpoint.php`;
    let formData:FormData = new FormData();
    if(active == 0){
      formData.append('function', 'deactivate');
    }else{
      formData.append('function', 'activate');
    }
    formData.append('id_laboratorio', this.id);
    formData.append('rol_usuario_id', "1001");
    formData.append('token', this.global.token);
    this.http.post(url, formData).subscribe(res => {
                                          this.respuestaSwitch(res.json());
                                        });
  }
  respuestaSwitch(res: any){
    //console.log("respuestaSwitch :: llenado this.cargando: "+this.cargando);
    this.cargando=this.cargando-1;
      //console.log("respuestaSwitch :: "+res);
     if(res.error!= 0){
       window.alert(res.estatus);
       location.reload();
     }
     else{
       window.alert(res.estatus);
     }
   }
}
