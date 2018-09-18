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
  selector: 'app-crear-llenaRevenimiento',
  templateUrl: './crear-llenaRevenimiento.component.html',
  styleUrls: ['./crear-llenaRevenimiento.component.scss','../../loadingArrows.css']
})
export class CrearLlenaRevenimientoComponent implements OnInit {

  global: Global;
  cargando= 3;
  id_orden: string;
  id_formato: "";
  mis_conos: Array<any>;
  mis_varillas: Array<any>;
  mis_flexometro: Array<any>;
  
  constructor(private router: Router, private route: ActivatedRoute, private data: DataService, private http: Http) { }
  
  
    creaCCHForm: FormGroup;
      cch = {
      reg:'',
      localizacion:'',
      cono:'',
      varilla:'',
      flexometro:'',
      termometro:'',
      longitud: '-98.1996779',
      latitud: '19.0437584'}
  
  crearFormatoCCH()
  {
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', this.creaCCHForm.value.reg);
    formData.append('valor', this.id_orden);
    formData.append('id_formatoRegistroRev', this.creaCCHForm.value.localizacion);  
    formData.append('cono_id', this.creaCCHForm.value.cono);
    formData.append('varilla_id', this.creaCCHForm.value.varilla);
    formData.append('flexometro_id', this.creaCCHForm.value.flexometro);
    formData.append('termometro_id', this.creaCCHForm.value.termometro);
    formData.append('longitud', this.creaCCHForm.value.longitud );
    formData.append('latitud', this.creaCCHForm.value.latitud );
    this.http.post(url, formData).subscribe(res => {
                                              this.recibeFormatoID(res.json());
                                              this.respuestaSwitch(res.json());                 
                                            } );

    
  }

  recibeFormatoID(res: any){
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
      window.alert("Ocurrio un error");
      location.reload();
    }
    else{
     
    }
  }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => {this.id_orden=params.id; this.id_formato=params.id2});
    this.cargando=3;


    let url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    let search = new URLSearchParams();

    search.set('function', 'getForDroptdownJefeBrigadaCono');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ordenDeTrabajo', this.id_orden);
    this.http.get(url, {search}).subscribe(res => this.llenaConos(res.json()) );

    search = new URLSearchParams();
    search.set('function', 'getForDroptdownJefeBrigadaVarilla');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ordenDeTrabajo', this.id_orden);
    this.http.get(url, {search}).subscribe(res => this.llenaVarillas(res.json()) );

    search = new URLSearchParams();
    search.set('function', 'getForDroptdownJefeBrigadaFlexometro');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ordenDeTrabajo', this.id_orden);
    this.http.get(url, {search}).subscribe(res => this.llenaFlexometro(res.json()) );

    url = `${this.global.apiRoot}/formatoRegistroRev/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getInfoByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_formatoRegistroRev', this.id_formato);
    this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );

    this.creaCCHForm = new FormGroup({                   
      'reg': new FormControl( {value: this.cch.reg, disabled: true  }, [Validators.required]),
      'localizacion': new FormControl(  {value:this.cch.localizacion}, [Validators.required]),
      'cono': new FormControl( {value:this.cch.cono}),
      'varilla': new FormControl(  {value: this.cch.varilla} ),
      'flexometro': new FormControl(  {value: this.cch.flexometro} ),
      'latitud': new FormControl(  {value: this.cch.latitud }),
      'longitud': new FormControl( {value:  this.cch.longitud }),
       });
  }


   get reg()          { return this.creaCCHForm.get('reg'); }
   get localizacion() { return this.creaCCHForm.get('localizacion'); }
   get cono()         { return this.creaCCHForm.get('cono'); }
   get varilla()      { return this.creaCCHForm.get('varilla'); }
   get flexometro()   { return this.creaCCHForm.get('flexometro'); }
   get latitud()      { return this.creaCCHForm.get('latitud'); }
   get longitud()     { return this.creaCCHForm.get('longitud'); }
 
  

   submitted = false;

  regresaUsuario(){
    this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/'+ this.id_orden]);
  }

  onSubmit() { this.submitted = true; }

  llenaConos(resp: any){
    console.log(resp);
    this.mis_conos= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_conos[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
    console.log("llenaConos this.cargando: "+this.cargando);
  }

  llenaVarillas(resp: any){
    console.log(resp);
    this.mis_varillas= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_varillas[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
    console.log("llenaVarillas this.cargando: "+this.cargando);
  }

  llenaFlexometro(resp: any){
    console.log(resp);
    this.mis_flexometro= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_flexometro[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
    console.log("llenaFlexometros this.cargando: "+this.cargando);
  }

  llenado(respuesta: any){
    console.log(respuesta);
    this.creaCCHForm.patchValue({
     reg:        respuesta.regNo,
     localizacion:      respuesta.localizacion,
     cono:           respuesta.cono_id,
     varilla:        respuesta.varilla_id,
     flexometro:     respuesta.flexometro_id,
     termometro:     respuesta.termometro_id
    });}

  onChangeLocalizacion(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function',                        'insertJefeBrigada');
    formData.append('token',                             this.global.token);
    formData.append('rol_usuario_id',                      this.global.rol);
    formData.append('campo',                                           '2');
    formData.append('valor',              this.creaCCHForm.value.especimen);
    formData.append('id_formatoRegistroRev',               this.id_formato);
    
    this.http.post(url, formData).subscribe(res => {
                                                  
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }
  
  onChangeCono(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function',                        'insertJefeBrigada');
    formData.append('token',                             this.global.token);
    formData.append('rol_usuario_id',                      this.global.rol);
    formData.append('campo',                                           '3');
    formData.append('valor',                   this.creaCCHForm.value.cono);
    formData.append('id_formatoRegistroRev',               this.id_formato);
    
    this.http.post(url, formData).subscribe(res => {
                                                  
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onChangeVarilla(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function',                        'insertJefeBrigada');
    formData.append('token',                             this.global.token);
    formData.append('rol_usuario_id',                      this.global.rol);
    formData.append('campo',                                           '4');
    formData.append('valor',                this.creaCCHForm.value.varilla);
    formData.append('id_formatoRegistroRev',               this.id_formato);
    
    this.http.post(url, formData).subscribe(res => {
                                                  
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onChangeFlexometro(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function',                        'insertJefeBrigada');
    formData.append('token',                             this.global.token);
    formData.append('rol_usuario_id',                      this.global.rol);
    formData.append('campo',                                           '5');
    formData.append('valor',             this.creaCCHForm.value.flexometro);
    formData.append('id_formatoRegistroRev',               this.id_formato);
    
    this.http.post(url, formData).subscribe(res => {
                                                  
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  siguiente(){
    this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaRevenimiento/'+this.id_orden + '/' + this.id_formato]);
  }
  
}




