import { Component, OnInit} from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
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
  rowSelection;
  columnDefs;
  cargando= 0;
  id_registrosCampo: string;
  id = "";
  tipo = "";
  ruta = 0;
  rowClassRules;
  noRowDataError;
  selected = false;

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
    {headerName: 'FECHA DE COLADO', field: 'fecha'},
    {headerName: 'INFORME N&Uacute;MERO', field: 'informeNo' },    
    {headerName: 'CLAVE', field: 'claveEspecimen' },    
    {headerName: 'EDAD DE ENSAYE EN D&Iacute;AS', field: 'diasEnsaye' },
    {headerName: 'Fecha de ensayo', field: 'fechaEnsayeAsignado' },
    {headerName: 'TIPO', field: 'tipo' },
    {headerName: 'ESTADO', field: 'estado' },
    {headerName: 'COMPLETADO', field: 'completado' },
  ];
    this.rowSelection = "single";
    this.rowClassRules = {
      "row-blue-warning": function(params) {
        var color = params.data.color;
        return color == 1;
      },
      "row-red-warning": function(params) {
        var color = params.data.color;
        return color == 2;
      }
    };

  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id_registrosCampo=params.id);
    this.cargando=0;
  }

  rowData: any;

  onGridReady(params) {
    this.cargando = this.cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;

    let url = `${this.global.apiRoot}/formatoCampo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getRegistrosForToday');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.rowData= res.json();
      this.gridApi.sizeColumnsToFit();
      this.llenaTabla(res.json(), "getAllRegistrosFromFooterByID");
    });
  }

  llenaTabla(repuesta: any, caller){
    console.log(repuesta)
    this.cargando = this.cargando -1;
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else if(repuesta.error==5){
      this.rowData =[];
      this.noRowDataError="No existen Especimenes pendientes para hoy.";   
    }else{
      this.rowData =repuesta;
    }
  }

  cambiarCargando(num){
    this.cargando=this.cargando + num;
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
      }else if(selectedRow.tipo == "VIGAS"){
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
    this.selected= true;
    //this.validaFooter();
   }

   validaFooter(){
    this.cambiarCargando(+1);
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
      this.cambiarCargando(-1);

     console.log(res);
     if(res.error!= 0){
       window.alert(res.estatus);
       location.reload();
     }
     else{
          //EXITO         
     }
     let id_footer= "";
     let id_RegistroCCH= "";
     console.log("HOLA!!: "+ res.id_RegistroGabs);
     if(res.existe == 1){

       if(this.ruta == 1){
          id_footer = res.id_footerEnsayo;
          id_RegistroCCH = res.id_RegistroGabs;
          window.alert("CILINDRO");
          this.router.navigate(['tecnico/pendientes/dashboardCilindro/'+id_footer]);
       }else if(this.ruta == 2) {
          id_footer = res.id_footerEnsayo;
          window.alert("CUBO");
          id_RegistroCCH = res.id_RegistroGabs;
          this.router.navigate(['tecnico/pendientes/dashboardCubo'+id_footer]);
       }else if(this.ruta == 3) {
          id_footer = res.id_footerEnsayo;
          window.alert("VIGA");
          id_RegistroCCH = res.id_RegistroGabs;          
          this.router.navigate(['tecnico/pendientes/dashboardViga/'+id_footer]);
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
