import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.scss','../../loadingArrows.css']
})
export class PendientesComponent implements OnInit{
  title = 'app';
  id_Footer: string;
  obra: string;
  nombre_jefe_brigada_id: string;
  actividades: string;
  condicionesTrabajo: string;
  fechaInicio: string;
  fechaFin: string;
  foto= '';
  imgUrl="";
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  cargando= 1;
  id_registrosCampo: string;
  id = "";
  tipo = "";
  ruta = 0;

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
    {headerName: 'FECHA DE COLADO', field: 'fecha'},
    {headerName: 'INFORME N&Uacute;MERO', field: 'informeNo' },    
    {headerName: 'CLAVE', field: 'claveEspecimen' },    
    {headerName: 'EDAD DE ENSAYE EN D&Iacute;AS', field: 'diasEnsaye' },
    {headerName: 'TIPO', field: 'tipo' },
    {headerName: 'ESTADO', field: 'estado' },
    {headerName: 'COMPLETADO', field: 'completado' },
  ];
    this.rowSelection = "single";
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id_registrosCampo=params.id);
    this.cargando=1;
  }

  rowData: any;

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/formatoCampo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getRegistrosForToday');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.rowData= res.json();
                                            this.gridApi.sizeColumnsToFit();
                                            this.cargando=this.cargando-1;
                                          });
  }

 onSelectionChanged(event: EventListenerObject) {
    var selectedRows = this.gridApi.getSelectedRows();
    var idd
    var tipoo
    var rutaa
    selectedRows.forEach(function(selectedRow, index) {
      console.log("Que paso: "+selectedRow.id_registrosCampo);
      console.log("El tipo es:"+selectedRow.tipo);
      if(selectedRow.tipo == "CILINDRO"){
         idd= selectedRow.id_registrosCampo;
         tipoo = selectedRow.tipo;
         //window.alert(selectedRow.id_formato);
         rutaa = 1;
      }else if(selectedRow.tipo == "CUBO"){
         idd= selectedRow.id_registrosCampo;
         tipoo = selectedRow.tipo;
         //window.alert(selectedRow.id_formato);
         rutaa = 2;
      }else if(selectedRow.tipo == "VIGA"){
        idd= selectedRow.id_registrosCampo;
         tipoo = selectedRow.tipo;
         //window.alert(selectedRow.id_formato);
         rutaa = 3;
      }
            
    });
    this.id =idd;
    this.tipo =tipoo;
    this.ruta =rutaa;
    console.log("Que paso: "+this.id);
    this.validaFooter();
   }

   validaFooter(){

    let url = `${this.global.apiRoot}/footerEnsayo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'initInsert');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('tipo', this.tipo);
    formData.append('id_RegistroCCH', this.id);
    this.http.post(url, formData).subscribe(res => {
      console.log(res);
                                              this.respuestaSwitch(res.json());                 
    });
   }

   respuestaSwitch(res: any){
     let id_footer= "";
     let id_RegistroCCH= "";
     console.log("HOLA!!: "+ res.id_RegistroGabs);
     if(res.existe == 1){

       if(this.ruta == 1){
          id_footer = res.id_footerEnsayo;
          id_RegistroCCH = res.id_RegistroGabs;
          window.alert("CILINDRO");
          this.router.navigate(['tecnico/pruebaCilindro/'+id_footer + '/'+id_RegistroCCH]);
       }else if(this.ruta == 2) {
          id_footer = res.id_footerEnsayo;
          window.alert("CUBO");
          id_RegistroCCH = res.id_RegistroGabs;
          this.router.navigate(['tecnico/pruebaCubo/'+id_footer + '/'+id_RegistroCCH]);
       }else if(this.ruta == 3) {
          id_footer = res.id_footerEnsayo;
          window.alert("VIGA");
          id_RegistroCCH = res.id_RegistroGabs;          
          this.router.navigate(['tecnico/pruebaViga/'+id_footer + '/'+id_RegistroCCH]);
       }
     }else{

       if(this.ruta == 1){
          id_footer = res.id_footerEnsayo;
          window.alert("CILINDRO");
          id_RegistroCCH = res.id_RegistroGabs;
          this.router.navigate(['tecnico/llenaFooter/'+id_footer + '/'+id_RegistroCCH]);
       }else if(this.ruta == 2) {
          id_footer = res.id_footerEnsayo;
          window.alert("CUBO");
          id_RegistroCCH = res.id_RegistroGabs;
          this.router.navigate(['tecnico/llenaFooterCubo/'+id_footer + '/'+id_RegistroCCH]);
       }else if(this.ruta == 3) {
          id_footer = res.id_footerEnsayo;
          window.alert("VIGA");
          id_RegistroCCH = res.id_RegistroGabs;  
          this.router.navigate(['tecnico/llenaFooterViga/'+id_footer + '/'+id_RegistroCCH]);
       }

     }
     
   }

}
