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
  selector: 'app-llenaFooter',
  templateUrl: './llenaFooter.component.html',
  styleUrls: ['./llenaFooter.component.scss','../../loadingArrows.css']
})
export class LlenaFooterComponent implements OnInit {

  global: Global;
  cargando= 3;
  id_Footer:string;
  id_Registro: string;
  id_orden: string;
  id_formato: "";
  mis_basculas: Array<any>;
  mis_reglas: Array<any>;
  mis_prensas: Array<any>;
  
  constructor(private router: Router, private route: ActivatedRoute, private data: DataService, private http: Http) { }
  
  
    creaCCHForm: FormGroup;
      cch = {
      vAplicacion:'',
      bascula:'',
      regla:'',
      prensa:''}
  
    ValidaSiguiente(){

    let warning = false;
    Object.keys(this.creaCCHForm.controls).forEach((controlName) => {
        if(this.creaCCHForm.controls[controlName].value == "" || this.creaCCHForm.controls[controlName].value == null || this.creaCCHForm.controls[controlName].value == "null"){
          warning = true;
        }// disables/enables each form control based on 'this.formDisabled'
    });

    if(warning){
      window.alert("Tienes al menos un campo vacio, verifica tus datos.");     
    }else{
          if(window.confirm("¿Estas seguro dar como completado el Footer de Cilindros del día?.")){
            //window.alert("Aqui voy a llamar a la conexion la funcion de la BD");
            //this.router.navigate(['tecnico/pruebaCilindro/'+this.id_Footer + '/'+this.id_Registro]);
            this.router.navigate(['tecnico/pendientes/dashboardCilindro/'+this.id_Footer]);
          }
    }

  }
  
   validaRespuesta(res:any){
     console.log(res);
     if(res.error!= 0){
       window.alert("Intentalo otra vez");
     }
     else{
               
     }
   }

   respuestaSwitch(res: any){ 
     console.log(res);
     if(res.error!= 0){
       window.alert("Intentalo otra vez");
       //this.router.navigate(['tecnico/pruebaCilindro/'+this.id_Footer + '/'+this.id_Registro]);
       //location.reload();
     }
     else{
       this.router.navigate(['tecnico/pruebaCilindro/'+this.id_Footer + '/'+this.id_Registro]);
       
     }
   }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => {this.id_Footer=params.id; this.id_Registro=params.id2;});
    this.cargando=3;


    let url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    let search = new URLSearchParams();

    search.set('function', 'getForDroptdownBasculas');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => this.llenaBascula(res.json()) );

    search = new URLSearchParams();
    search.set('function', 'getForDroptdownReglasVerFlex');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => this.llenaReglas(res.json()) );

    search = new URLSearchParams();
    search.set('function', 'getForDroptdownPrensas');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => this.llenaPrensas(res.json()) );

    url = `${this.global.apiRoot}/footerEnsayo/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getFooterByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_footerEnsayo', this.id_Footer);
    this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );

    this.creaCCHForm = new FormGroup({
      'vAplicacion': new FormControl( this.cch.vAplicacion, Validators.required),
      'bascula': new FormControl( this.cch.bascula, Validators.required),
      'regla': new FormControl( this.cch.regla),
      'prensa': new FormControl( this.cch.prensa )});
  }


   get vAplicacion() { return this.creaCCHForm.get('vAplicacion'); }

   get bascula() { return this.creaCCHForm.get('bascula'); }

   get regla() { return this.creaCCHForm.get('regla'); }
   
   get prensa() { return this.creaCCHForm.get('prensa'); }
    

   submitted = false;

   regresaUsuario(){
    this.router.navigate(['tecnico/pendientes']);
  }

  onSubmit() { this.submitted = true; }

  llenado(respuesta:any){
    console.log(respuesta);

    this.creaCCHForm.patchValue({
     vAplicacion:  respuesta.observaciones,
     bascula: respuesta.buscula_id,
     regla: respuesta.regVerFle_id,
     prensa: respuesta.prensa_id
    });
  }

  llenaBascula(resp: any){
    console.log(resp);
    this.mis_basculas= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_basculas[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
    console.log("llenaBascula this.cargando: "+this.cargando);
  }

  llenaReglas(resp: any){
    console.log(resp);
    this.mis_reglas= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_reglas[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
    console.log("llenaVarillas this.cargando: "+this.cargando);
  }

  llenaPrensas(resp: any){
    console.log(resp);
    this.mis_prensas= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_prensas[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
    console.log("llenaPrensas this.cargando: "+this.cargando);
  }

  onChangeObservaciones(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/footerEnsayo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '4');
    formData.append('valor', this.creaCCHForm.value.vAplicacion);
    formData.append('id_footerEnsayo', this.id_Footer);
    this.http.post(url, formData).subscribe(res => {
                                              console.log(this.id_Footer);
                                              this.validaRespuesta(res.json());                 
                                            } );
  }
  
  onChangeBascula(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/footerEnsayo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '1');
    formData.append('valor', this.creaCCHForm.value.bascula);
    formData.append('id_footerEnsayo', this.id_Footer);
    this.http.post(url, formData).subscribe(res => {
                                              console.log(this.id_Footer);
                                              this.validaRespuesta(res.json());                 
                                            } );
  }

  onChangeRegla(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/footerEnsayo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '2');
    formData.append('valor', this.creaCCHForm.value.regla);
    formData.append('id_footerEnsayo', this.id_Footer);
    this.http.post(url, formData).subscribe(res => {
                                              console.log(this.id_Footer);
                                              this.validaRespuesta(res.json());                 
                                            } );
  }

  onChangePrensa(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/footerEnsayo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '3');
    formData.append('valor', this.creaCCHForm.value.prensa);
    formData.append('id_footerEnsayo', this.id_Footer);
    this.http.post(url, formData).subscribe(res => {
                                              console.log(this.id_Footer);
                                              this.validaRespuesta(res.json());                 
                                            } );
  }  
  
}




