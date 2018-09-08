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
  selector: 'app-llenaFooterViga',
  templateUrl: './llenaFooterViga.component.html',
  styleUrls: ['./llenaFooterViga.component.scss','../../loadingArrows.css']
})
export class LlenaFooterVigaComponent implements OnInit {

  global: Global;
  cargando= 2;
  id_orden: string;
  id_formato: "";
  id_Footer:string;
  id_Registro: string;
  mis_prensas: Array<any>;
  mis_flexos: Array<any>;
  
  constructor(private router: Router, private route: ActivatedRoute, private data: DataService, private http: Http) { }
  
  
    creaCCHForm: FormGroup;
      cch = {
      prensas:'',
      flexo:''}
  
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
            this.router.navigate(['tecnico/pruebaViga/'+this.id_Footer + '/'+this.id_Registro]);
          }
    }

  }

  recibeFormatoID(res: any)
  {
    this.id_formato= res.id_formatoRegistroRev;
    console.log(this.id_formato); 
  }

   /*respuestaSwitch  
     Si la respuesta es distinta 0 siginifica que hubo algun error
     por lo que mandara una alerta y recargara la pagina
     Si la respuesta es 0 siginifica que la insercion fue exitosa y
     Por lo tanto lo enviara a la ruta de llenaFormatoCCH con su id_formato 
     Parametrizado. */
   respuestaSwitch(res: any){ 
     console.log(res);
     if(res.error!= 0){
       window.alert("Intentalo otra vez");
       location.reload();
     }
     else{
       this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaRevenimiento/'+this.id_orden + '/' +this.id_formato]);
       
     }
   }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => {this.id_Footer=params.id; this.id_Registro=params.id2;});
    this.cargando=0;


    let url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    let search = new URLSearchParams();

    search.set('function', 'getForDroptdownPrensas');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => this.llenaPrensas(res.json()) );

    search = new URLSearchParams();
    search.set('function', 'getForDroptdownFlexo');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res =>{console.log(res); this.llenaFlexos(res.json()) });

    url = `${this.global.apiRoot}/footerEnsayo/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getFooterByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_footerEnsayo', this.id_Footer);
    this.http.get(url, {search}).subscribe(res => {console.log(res);this.llenado(res.json());} );

    this.creaCCHForm = new FormGroup({
      'prensas': new FormControl( this.cch.prensas),
      'flexo': new FormControl( this.cch.flexo )
       });
  }

   get prensas() { return this.creaCCHForm.get('prensas'); }
   
   get flexo() { return this.creaCCHForm.get('flexo'); }

   submitted = false;

   regresaUsuario(){
    this.router.navigate(['tecnico/pendientes']);
  }

  onSubmit() { this.submitted = true; }

  llenado(respuesta:any){
    console.log(respuesta);

    this.creaCCHForm.patchValue({
     flexo: respuesta.regVerFle_id,
     prensas: respuesta.prensa_id
    });
  }

  llenaPrensas(resp: any)
  {
    console.log(resp);
    this.mis_prensas= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_prensas[_i]=resp[_i];
    }
    //this.cargando=this.cargando-1;
    console.log("llenaPrensas this.cargando: "+this.cargando);
  }

  llenaFlexos(resp: any)
  {
    console.log(resp);
    this.mis_flexos= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_flexos[_i]=resp[_i];
    }
    //this.cargando=this.cargando-1;
    console.log("llenaFlexos this.cargando: "+this.cargando);
  }

  onChangeRegla(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/footerEnsayo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '2');
    formData.append('valor', this.creaCCHForm.value.flexo);
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
    formData.append('valor', this.creaCCHForm.value.prensas);
    formData.append('id_footerEnsayo', this.id_Footer);
    this.http.post(url, formData).subscribe(res => {
                                              console.log(this.id_Footer);
                                              this.validaRespuesta(res.json());                 
                                            } );
  }

  validaRespuesta(res:any){
     console.log(res);
     if(res.error!= 0){
       window.alert("Intentalo otra vez");
     }
     else{
               
     }
   }

}