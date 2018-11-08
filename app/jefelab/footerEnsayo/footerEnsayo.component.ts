import { GridComponent } from '../grid/grid.component';
import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

//FIN DE LOS IMPORTS

@Component({
  selector: 'app-footerEnsayo',
  templateUrl: './footerEnsayo.component.html',
  styleUrls: ['./footerEnsayo.component.scss','../../loadingArrows.css']
})
export class footerEnsayoComponent implements OnInit{

  id: string = "1001";
  id_footer: string;
  id_orden: string;
  id_formato: string;
  id_registro: string;
  title = 'app';
  global: Global;
  link = "";
  linkFormatoCampo = "";
  private gridApi;
  private gridColumnApi;
  preliminar = false;
  preliminarGabs= false;
  rowSelection;
  columnDefs;
  cargando= 0;
  hidden = true;
  hiddenf= true;
  isValid=false;
  isComplete=false;
  Viga;
  mis_tipos: Array<any>;
  mis_lab: Array<any>;
  mis_cli: Array<any>;
  mis_jefes: Array<any>;

  mis_basculas: Array<any>;
  mis_reglas: Array<any>;
  mis_prensas: Array<any>;

  formatoStatus;
  maxNoOfRegistrosRev;
  numberOfRegistros;
  
  formatoCCHForm: FormGroup;

  FormatoCCH = {
    fechaEnsayo: '',
    observaciones:'',
    bascula:'',
    regla:'',
    prensa:''
  }

  mis_conos:      Array<any>;
  mis_varillas:   Array<any>;
  mis_flexometro: Array<any>;

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
    {headerName: '# Orden', field: 'id_herramienta' },
    {headerName: '# Cotización', field: 'id_herramienta' },
    {headerName: 'Tipo', field: 'tipo' },
    {headerName: 'Placas', field: 'placas' },
    {headerName: 'Condicion', field: 'condicion'},
    {headerName: 'Fecha de compra', field: 'fechaDeCompra' },
    {headerName: 'Editado en', field: 'lastEditedON'},

  ];
    this.rowSelection = "single";
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id_footer=params.id); 
    
    //this.cargando=5;
    /*El Chema me va a ayudar despues
    let url = `${this.global.apiRoot}/footerEnsayo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getFooterByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_footerEnsayo', this.id_footer);
    this.http.get(url, {search}).subscribe(res =>{ 
      this.llenado(res.json());
      this.llenadoValidator(res.json(), "getFooterByID");
    });

    */

    let url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    let search = new URLSearchParams();

    search.set('function', 'getForDroptdownBasculas');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {                                                    
      this.llenaBascula(res.json());
      this.llenadoValidator(res.json(), "getForDroptdownBasculas"); 
    });

    search = new URLSearchParams();
    search.set('function', 'getForDroptdownReglasVerFlex');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {                                                    
      this.llenaReglas(res.json());
      this.llenadoValidator(res.json(), "getForDroptdownReglasVerFlex");  
    });

    search = new URLSearchParams();
    search.set('function', 'getForDroptdownPrensas');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {                                                  
      this.llenaPrensas(res.json());
      this.llenadoValidator(res.json(), "getForDroptdownPrensas");
    });

    this.formatoCCHForm = new FormGroup({
      'fechaEnsayo':      new FormControl( {value: this.FormatoCCH.fechaEnsayo,   disabled: true }),
      'observaciones':    new FormControl( {value: this.FormatoCCH.observaciones, disabled: this.hidden },  [Validators.required,Validators.pattern("^[0-9]+([.][0-9]+)?$")]),       
      'bascula':          new FormControl( {value: this.FormatoCCH.bascula,       disabled: this.hidden },  [Validators.required]),
      'regla':            new FormControl( {value: this.FormatoCCH.regla,         disabled: this.hidden },  [Validators.required]),
      'prensa':           new FormControl( {value: this.FormatoCCH.prensa,        disabled: this.hidden },  [Validators.required]),
    });
  }

  get fechaEnsayo()        { return this.formatoCCHForm.get('fechaEnsayo'); }
  get observaciones()  { return this.formatoCCHForm.get('observaciones'); }
  get bascula()           { return this.formatoCCHForm.get('bascula'); }
  get regla()        { return this.formatoCCHForm.get('regla'); }
  get prensa()     { return this.formatoCCHForm.get('prensa'); }  
  
  mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.formatoCCHForm.controls).forEach((controlName) => {
      this.formatoCCHForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
    
    this.formatoCCHForm.controls['observaciones']['disable']();
    
    this.formatoCCHForm.controls['bascula']['disable']();
    this.formatoCCHForm.controls['regla']['disable']();
    this.formatoCCHForm.controls['prensa']['disable']();
  }



  mostrarFooter(){
    this.hiddenf = !this.hiddenf;
    const state = this.hiddenf ? 'disable' : 'enable';

    Object.keys(this.formatoCCHForm.controls).forEach((controlName) => {
        this.formatoCCHForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });

    this.formatoCCHForm.controls['fechaEnsayo']['disable']();

  }

  submitted = false;

  onSubmit() { this.submitted = true; }


  
  labValidator(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==5 || repuesta.error==6){
      window.alert(repuesta.estatus);
    }
    else{
      
    }
  }

  llenado(respuesta:any){
    console.log(respuesta);

    this.formatoCCHForm.patchValue({
     fechaEnsayo:      respuesta.fecha,
     observaciones:    respuesta.observaciones,
     bascula:          respuesta.buscula_id,
     regla:            respuesta.regVerFle_id,
     prensa:           respuesta.prensa_id
    });

    this.link = respuesta.preliminarGabs;
    this.linkFormatoCampo = respuesta.preliminar;

     this.formatoStatus=(respuesta.status == 0 ? true : false);
     console.log(this.formatoStatus);
     //this.cargando=this.cargando-1;
  }

 /*************************************************/
            /*CODIGO DEL FOOTERENSAYO */  


  llenaBascula(resp: any){
    console.log(resp);
    this.mis_basculas= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_basculas[_i]=resp[_i];
    }
    console.log("llenaBascula this.cargando: "+this.cargando);
  }

   llenaReglas(resp: any){
    console.log(resp);
    this.mis_reglas= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_reglas[_i]=resp[_i];
    }
    console.log("llenaVarillas this.cargando: "+this.cargando);
  }

  llenaPrensas(resp: any){
    console.log(resp);
    this.mis_prensas= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_prensas[_i]=resp[_i];
    }
    console.log("llenaPrensas this.cargando: "+this.cargando);
  }

   onChangeBascula(){
    this.cargando = this.cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/footerEnsayo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '1');
    formData.append('valor', this.formatoCCHForm.value.bascula);
    formData.append('id_footerEnsayo', this.id_footer);
    this.http.post(url, formData).subscribe(res => {
                                              console.log(this.id_footer);
                                              this.validaRespuesta(res.json());                 
                                            } );
  }

  onChangeRegla(){
    this.cargando = this.cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/footerEnsayo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '2');
    formData.append('valor', this.formatoCCHForm.value.regla);
    formData.append('id_footerEnsayo', this.id_footer);
    this.http.post(url, formData).subscribe(res => {
                                              console.log(this.id_footer);
                                              this.validaRespuesta(res.json());                 
                                            } );
  }

  onChangePrensa(){
    this.cargando = this.cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/footerEnsayo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '3');
    formData.append('valor', this.formatoCCHForm.value.prensa);
    formData.append('id_footerEnsayo', this.id_footer);
    this.http.post(url, formData).subscribe(res => {
                                              console.log(this.id_footer);
                                              this.validaRespuesta(res.json());                 
                                            } );
  }

  onChangeObservaciones(){
    this.cargando = this.cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/footerEnsayo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '4');
    formData.append('valor', this.formatoCCHForm.value.observaciones);
    formData.append('id_footerEnsayo', this.id_footer);
    this.http.post(url, formData).subscribe(res => {
                                              console.log(this.id_footer);
                                              this.validaRespuesta(res.json());                 
                                            } );
  }    


  validaRespuesta(res:any){
    this.cargando = this.cargando -1;
    console.log(res);
    if(res.error!= 0){
      window.alert("Intentalo otra vez");
    }
    else{
              
    }
  }

  regresaPendientes(){
    this.router.navigate(['tecnico/pendientes/']);
  }

  /* VALIDATORS ZONE */

  llenadoValidator(respuesta: any, caller){
    this.cargando = this.cargando -1;
    if(respuesta.error>0){
      window.alert(caller + " :: " +respuesta.estatus);
    }else{
      //EXITO. 
    } 
  }
}
