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
  selector: 'app-dashboardLote',
  templateUrl: './dashboardLote.component.html',
  styleUrls: ['./dashboardLote.component.scss','../../loadingArrows.css']
})
export class dashboardLoteComponent implements OnInit{

  id: string = "1001";
  id_footer: string;
  id_orden: string;
  id_formato: string;
  id_registro: string;
  loteCorreos: string;
  title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  cargando= 4;
  hidden = true;
  hiddenf= true;
  formatoStatus;
  maxNoOfRegistrosRev;
  numberOfRegistros;
  
  formatoCCHForm: FormGroup;

    FormatoCCH  = {
    fechaEnsayo: '',
    noCorreos:'',
    encargado:'',
    ctrl:''
  }

   mis_conos: Array<any>;
   mis_varillas: Array<any>;
   mis_flexometro: Array<any>;

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
    {headerName: '# Orden',         field: 'id_herramienta' },
    {headerName: '# Cotización',    field: 'id_herramienta' },
    {headerName: 'Tipo',            field: 'tipo' },
    {headerName: 'Placas',          field: 'placas' },
    {headerName: 'Condicion',       field: 'condicion'},
    {headerName: 'Fecha de compra', field: 'fechaDeCompra' },
    {headerName: 'Editado en',      field: 'lastEditedON'},

  ];
    this.rowSelection = "single";
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.loteCorreos=params.id); 
    this.cargando=0;
/*
    let url = `${this.global.apiRoot}/footerEnsayo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getFooterByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_footerEnsayo', this.id_footer);
    this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );

   */
  this.formatoCCHForm = new FormGroup({
      'fechaEnsayo':      new FormControl( {value: this.FormatoCCH.fechaEnsayo, disabled: true }),
      'noCorreos':        new FormControl( {value: this.FormatoCCH.noCorreos,   disabled: true }),
      'encargado':        new FormControl( {value: this.FormatoCCH.encargado,   disabled: true }),
      'ctrl':             new FormControl( {value: this.FormatoCCH.ctrl,        disabled: true }),
    });
  }

   get fechaEnsayo()    { return this.formatoCCHForm.get('fechaEnsayo'); }
   get noCorreos()      { return this.formatoCCHForm.get('noCorreos'); }
   get encargado()      { return this.formatoCCHForm.get('encargado'); }
   get ctrl()           { return this.formatoCCHForm.get('ctrl'); }  
  
  mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.formatoCCHForm.controls).forEach((controlName) => {
        this.formatoCCHForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
        
    this.formatoCCHForm.controls['noCorreos']['disable']();
    this.formatoCCHForm.controls['encargado']['disable']();
    this.formatoCCHForm.controls['ctrl']['disable']();
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
     fechaEnsayo:   respuesta.fecha,
     noCorreos:     respuesta.buscula_id,
     encargado:     respuesta.regVerFle_id,
     ctrl:          respuesta.prensa_id
    });
    this.formatoStatus=(respuesta.status == 0 ? true : false);
    console.log(this.formatoStatus);
    this.cargando=this.cargando-1;
  }

  obtenStatusReg(){
    let url = `${this.global.apiRoot}/ensayoViga/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllRegistrosFromFooterByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('footerEnsayo_id', this.id_footer);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.validaRegistrosVacios(res.json());
                                          });
  }

  validaRegistrosVacios(res: any){

    let isValid = true;
    res.forEach(function (value) {
      if(value.status == "0"){
         isValid = false;
        //window.alert("Existe al menos un registro que no ha sido completado, verifica que todos los registros esten completados.");
      }
    });

    if(!isValid){
      window.alert("Tienes al menos un registro sin completar, todos los registros deben estar en ESTATUS:1 para completar el formato.");     
    }else{
          if(window.confirm("¿Estas seguro de marcar como completado el formato? ya no podrá ser editado.")){
            this.formatoCompletado();
          }
    } 
  } 

  formatoCompletado(){
    //console.log("formatoCompletado :: Sigo vivo");
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/footerEnsayo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'completeFormato');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('id_footerEnsayo', this.id_footer);  
    this.http.post(url, formData).subscribe(res => {
      this.respuestaFormatoCompletado(res.json());
    });
  } 
  
  respuestaFormatoCompletado(res: any){
    this.cargando=this.cargando-1;
    this.formatoStatus=false;
    console.log(res.status);
    if(res.error==0){
      window.alert("¡Exito! El Formato Se ha Completado");
    }else{
      window.alert(res.estatus);
    }
  }
    
  respuestaSwitch(res: any){ 
     console.log(res);
     if(res.error!= 0){
       window.alert(res.estatus);
       location.reload();
     }
     else{
          this.mostrar();         
     }
   }

  respuestaRegistro(res: any){ 
     console.log(res);
     if(res.error!= 0){
       window.alert(res.estatus);
       location.reload();
     }
     else{
          this.id_registro= res.id_registrosRev;
          console.log(this.id_registro);
          this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/agregaRegistroRevenimiento/'+this.id_orden + '/' + this.id_formato + '/' +this.id_registro]);        
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

  regresaPendientes(){
    this.router.navigate(['administrativo/obras/']);
  }

}
