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
  
  crearFormatoCCH()
  {
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('ordenDeTrabajo_id', this.id_orden); 
    formData.append('prensas_id', this.creaCCHForm.value.prensas);
    formData.append('flexometro_id', this.creaCCHForm.value.flexo);
    this.http.post(url, formData).subscribe(res => {
                                              this.recibeFormatoID(res.json());
                                              this.respuestaSwitch(res.json());                 
                                            } );    
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
    this.route.params.subscribe( params => this.id_orden=params.id);
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
     prensa: respuesta.prensa_id
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