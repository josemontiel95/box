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
  selector: 'app-crear-llenaFormatoCCH',
  templateUrl: './crear-llenaFormatoCCH.component.html',
  styleUrls: ['./crear-llenaFormatoCCH.component.scss','../../loadingArrows.css']
})
export class CrearLlenaFormatoCCHComponent implements OnInit {

  global: Global;
  cargando= 4;
  mis_conos: Array<any>;
  mis_varillas: Array<any>;
  mis_flexometro: Array<any>;
  mis_termometro: Array<any>;
  mis_lab: Array<any>;
  id_orden = "";
  id_formato: "";

  atconcreto ="";
  aespecimen1 ="";
  aespecimen2 = "";
  aespecimen3 ="";
  aespecimen4 ="";
  notRR=true;
  hidden=false;
  

  constructor(private router: Router, private route: ActivatedRoute, private data: DataService, private http: Http) { }
  
  
    creaCCHForm: FormGroup;
      cch = {
      cch_id: '',
      informe:'',
      tconcreto: '',
      especimen1: '',
      especimen2: '',
      especimen3: '',
      especimen4: '',
      especimen:'',
      cono:'',
      varilla:'',
      flexometro:'',
      termometro:'',
      longitud: '-98.1996779',
      latitud: '19.0437584' }

   espec= [{"especimen":"CILINDRO", "id":"CILINDRO"},{"especimen":"CUBO", "id":"CUBO"},{"especimen":"VIGAS", "id":"VIGAS"}];
   tipoconcreto= [{"tconcreto":"Normal", "id": "N"},{"tconcreto":"Resistencia Rápida", "id": "RR"},{"tconcreto":"Con aditivo", "id": "CA"}];
  
  crearFormatoCCH(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function',           'insertJefeBrigada');
    formData.append('token',              this.global.token);
    formData.append('rol_usuario_id',     this.global.rol);

    formData.append('informeNo',          this.creaCCHForm.value.informe);
    formData.append('ordenDeTrabajo_id',  this.id_orden);  
    formData.append('tipoConcreto',       this.creaCCHForm.value.tconcreto); 
    formData.append('prueba1',            this.creaCCHForm.getRawValue().especimen1);  
    formData.append('prueba2',            this.creaCCHForm.getRawValue().especimen2);  
    formData.append('prueba3',            this.creaCCHForm.getRawValue().especimen3);  
    formData.append('prueba4',            this.creaCCHForm.getRawValue().especimen4);  
    formData.append('tipo',               this.creaCCHForm.value.especimen);
    formData.append('cono_id',            this.creaCCHForm.value.cono);
    formData.append('varilla_id',         this.creaCCHForm.value.varilla);
    formData.append('flexometro_id',      this.creaCCHForm.value.flexometro);
    formData.append('termometro_id',      this.creaCCHForm.value.termometro);
    formData.append('longitud',           this.creaCCHForm.value.longitud );
    formData.append('latitud',            this.creaCCHForm.value.latitud );
    this.http.post(url, formData).subscribe(res => {
                                              this.recibeFormatoID(res.json());
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }
  onBlurEspecimen3(){
    this.creaCCHForm.patchValue({
      especimen4: this.creaCCHForm.value.especimen3,
    });
  }
  onBlurTipoConcreto(){
    if(this.creaCCHForm.value.tconcreto == "RR" || this.creaCCHForm.value.tconcreto == "CA" ){
      this.notRR = false;
     // window.alert("notRR es false, this.creaCCHForm.value.tconcreto: "+this.creaCCHForm.value.tconcreto);
    }else{
      //window.alert("notRR es true, this.creaCCHForm.value.tconcreto: "+this.creaCCHForm.value.tconcreto);
      this.notRR = true;
      this.creaCCHForm.patchValue({
         tconcreto: this.atconcreto,
         especimen1: this.aespecimen1,
         especimen2: this.aespecimen2,
         especimen3: this.aespecimen3,
         especimen4: this.aespecimen4
      });
    }
    //this.notRR = !this.notRR;
    const state = this.hidden || this.notRR ? 'disable' : 'enable'; 
    this.creaCCHForm.controls["especimen1"][state](); // disables/enables each form control based on 'this.formDisabled'
    this.creaCCHForm.controls["especimen2"][state](); // disables/enables each form control based on 'this.formDisabled'
    this.creaCCHForm.controls["especimen3"][state](); // disables/enables each form control based on 'this.formDisabled'
    //this.creaCCHForm.controls["especimen4"][state](); // disables/enables each form control based on 'this.formDisabled'
  }

  recibeFormatoID(res: any)
  {
    this.id_formato= res.id_formatoCampo;
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
       this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaFormatoCCH/'+this.id_orden + '/' + this.id_formato]);
       
     }
   }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id_orden=params.id);
    this.cargando=4;


    let url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    let search = new URLSearchParams();
    
    search.set('function', 'getForDroptdownJefeBrigadaCono');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => this.llenaConos(res.json()) );

    search = new URLSearchParams();
    search.set('function', 'getForDroptdownJefeBrigadaVarilla');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => this.llenaVarillas(res.json()) );

    search = new URLSearchParams();
    search.set('function', 'getForDroptdownJefeBrigadaFlexometro');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => this.llenaFlexometro(res.json()) );

    search = new URLSearchParams();
    search.set('function', 'getForDroptdownJefeBrigadaTermometro');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => this.llenaTermometro(res.json()) );
    
    url = `${this.global.apiRoot}/formatoCampo/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getformatoDefoults');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => this.llenatipo(res.json()) );
    
    this.creaCCHForm = new FormGroup({
      'cch_id':       new FormControl( { value:this.cch.cch_id, disabled: true}), 
      'especimen':    new FormControl( this.cch.especimen,  Validators.required), 
      'informe':      new FormControl({ value:this.cch.informe, disabled: true}),
      'tconcreto':    new FormControl( this.cch.tconcreto, Validators.required),
      'especimen1':   new FormControl( this.cch.especimen1, Validators.required),
      'especimen2':   new FormControl( this.cch.especimen2, Validators.required),
      'especimen3':   new FormControl( this.cch.especimen3, Validators.required),
      'especimen4':   new FormControl( this.cch.especimen4, Validators.required),
      'cono':         new FormControl( this.cch.cono),
      'varilla':      new FormControl( this.cch.varilla ),
      'flexometro':   new FormControl( this.cch.flexometro ),
      'termometro':   new FormControl( this.cch.termometro ),
      'latitud':      new FormControl( this.cch.latitud ),
      'longitud':     new FormControl( this.cch.longitud ),
    });
  }


   get informe()     { return this.creaCCHForm.get('informe'); }
   get especimen()   { return this.creaCCHForm.get('especimen'); }
   get tconcreto()   { return this.creaCCHForm.get('tconcreto'); }
   get especimen1()  { return this.creaCCHForm.get('especimen1'); }
   get especimen2()  { return this.creaCCHForm.get('especimen2'); }
   get especimen3()  { return this.creaCCHForm.get('especimen3'); }
   get especimen4()  { return this.creaCCHForm.get('especimen4'); }
   get cono()        { return this.creaCCHForm.get('cono'); }
   get varilla()     { return this.creaCCHForm.get('varilla')}; 
   get flexometro()  { return this.creaCCHForm.get('flexometro')};
   get termometro()  { return this.creaCCHForm.get('termometro');}

   submitted = false;

   regresaOrdenTrabajo(){
    this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/'+this.id_orden]);
  }

  onSubmit() { this.submitted = true; }

  llenatipo(resp: any){
    console.log(resp);
    this.notRR=true;
    this.atconcreto= "N";
    this.aespecimen1= resp.cch_def_prueba1;
    this.aespecimen2= resp.cch_def_prueba2;
    this.aespecimen3= resp.cch_def_prueba3;
    this.aespecimen4= resp.cch_def_prueba4;

    this.creaCCHForm.patchValue({
       tconcreto: this.atconcreto,
       especimen1: this.aespecimen1,
       especimen2: this.aespecimen2,
       especimen3: this.aespecimen3,
       especimen4: this.aespecimen4
    });
    const state = this.hidden || this.notRR ? 'disable' : 'enable'; 
    this.creaCCHForm.controls["especimen1"][state](); // disables/enables each form control based on 'this.formDisabled'
    this.creaCCHForm.controls["especimen2"][state](); // disables/enables each form control based on 'this.formDisabled'
    this.creaCCHForm.controls["especimen3"][state](); // disables/enables each form control based on 'this.formDisabled'
    this.creaCCHForm.controls["especimen4"][state](); // disables/enables each form control based on 'this.formDisabled'
  }

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

  llenaTermometro(resp: any){
    console.log(resp);
    this.mis_termometro= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_termometro[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
    console.log("llenaTermometros this.cargando: "+this.cargando);
  }
  
}




