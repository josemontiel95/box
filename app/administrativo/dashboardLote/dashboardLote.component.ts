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
  hiddenFormato=true;

  mensajeEstado="";
  
  fechaForm: FormGroup;

  fecha  = {
    fechaEnsayo: ''
  }
  footerForm: FormGroup;

  footer  = {
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
    this.cargando=1;
    let url = `${this.global.apiRoot}/loteCorreos/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getLoteByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('lote', this.loteCorreos);
    this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );

   
    this.fechaForm = new FormGroup({
      'fechaEnsayo':      new FormControl( {value: this.fecha.fechaEnsayo, disabled: true })
    });
    this.footerForm = new FormGroup({
      'noCorreos':        new FormControl( {value: this.footer.noCorreos,   disabled: true }),
      'encargado':        new FormControl( {value: this.footer.encargado,   disabled: true }),
      'ctrl':             new FormControl( {value: this.footer.ctrl,        disabled: true }),
    });
  }

   get fechaEnsayo()    { return this.fechaForm.get('fechaEnsayo'); }
   get noCorreos()      { return this.footerForm.get('noCorreos'); }
   get encargado()      { return this.footerForm.get('encargado'); }
   get ctrl()           { return this.footerForm.get('ctrl'); }  
  
  mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';
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
    console.log("llenado :: respuesta.correosNo: "+respuesta.correosNo);
    console.log("llenado :: respuesta.id_loteCorreos: "+respuesta.id_loteCorreos);
    console.log("llenado :: respuesta.encargado: "+respuesta.encargado);


    this.footerForm.patchValue({
     noCorreos:     respuesta.correosNo,
     encargado:     respuesta.encargado,
     ctrl:          respuesta.id_loteCorreos
    });
    this.fechaForm.patchValue({
     fechaEnsayo:   respuesta.fecha
    });
    this.formatoStatus=respuesta.status;

    switch(Number(respuesta.status)){
      case 0:
        this.mensajeEstado = "Listo para generar PDFs";
      break;
      case 1:
        this.mensajeEstado = "Listo para mandar correos";
      break;
      case 2:
        this.mensajeEstado = "Correos enviados";
      break;
    }
    console.log(this.formatoStatus);
    this.cargando=this.cargando-1;
  }

  generarPDF(){
    this.cargando=1;
    this.hiddenFormato=false;

    let url = `${this.global.apiRoot}/loteCorreos/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'generateAllFormatosByLote');
    search.set('token',           this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('lote',            this.loteCorreos);
    console.log(this.loteCorreos);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.validaRespuesta(res.json());
                                          });
  }
  validaRespuesta(res: any){
    this.cargando=this.cargando-1;
    this.hiddenFormato=true;

    if(res.error==0){
      window.alert("server regreso con exito");
    }else{
      window.alert("server regreso con error, estatus: "+res.estatus+" error: "+res.error);
    }
  }

  mandarCorreo(){
    this.cargando=1;
    this.hiddenFormato=false;
    let url = `${this.global.apiRoot}/loteCorreos/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'sentAllEmailFormatosByLote');
    search.set('token',           this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('lote',            this.loteCorreos);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.validaRespuesta(res.json());
                                          });
  } 

  
  
    
  respuestaSwitch(res: any){ 
    this.cargando=this.cargando-1;
    this.hiddenFormato=true;
     console.log(res);
     if(res.error!= 0){
       window.alert(res.estatus);
       location.reload();
     }
     else{
          this.mostrar();         
     }
   }



  regresaPendientes(){
    this.router.navigate(['administrativo/obras/']);
  }

}
