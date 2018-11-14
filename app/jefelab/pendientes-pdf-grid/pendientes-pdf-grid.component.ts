import { Component, OnInit,  Output, EventEmitter,Input} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pendientes-pdf-grid',
  templateUrl: './pendientes-pdf-grid.component.html',
  styleUrls: ['./pendientes-pdf-grid.component.css']
})
export class PendientesPDFGridComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  id: any;
  historial=false;
  rowClassRules;
  noRowDataError;
  noRowData=false;
  selected = false;
  tipoNo;

  @Output() cargando = new EventEmitter<any>();

  cambiaCargando(cantidad: any) {
    this.cargando.emit(cantidad);
  }
  @Output() reloadMainGrid = new EventEmitter<any>();

  reloadMainGridFunc() {
    this.reloadMainGrid.emit();
  }

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
    {headerName: 'Ctrl', field: 'id_certificaciones' },    
    {headerName: 'Nombre', field: 'certificacion' },
    {headerName: 'Activo', field: 'estado' },
      
    ];
    this.rowSelection = "single";
    this.rowClassRules = {
      "row-green-warning": function(params) {
        var activeColor = params.data.estadoNo;
        return activeColor == 1;
      }
    };
  }

  rowData: any;

  ngOnInit() {
        this.data.currentGlobal.subscribe(global => this.global = global);

  }

 

  onGridReady(params) {
    this.cambiaCargando(1);
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let url = `${this.global.apiRoot}/certificaciones/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllusuario_certificacionesAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    console.log(search);
    this.http.get(url, {search}).subscribe(res => {
    console.log(res.json());
    this.llenaTabla(res.json(), "getAllRegistrosFromFooterByID");
    this.gridApi.sizeColumnsToFit();
  });
  }

  llenaTabla(repuesta: any, caller){
    console.log(repuesta)
    this.cambiarCargando(-1);
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else if(repuesta.error==5){
      this.rowData =[];
      this.noRowDataError="No existen Especimenes pendientes para hoy.";   
      this.noRowData=true;
    }else{
      this.noRowData=false;
      this.rowData =repuesta;
    }
  }

  cambiarCargando(num){
    this.cargando=this.cargando + num;
  }


/* Antiguo llenaTabla
  llenaTabla(repuesta: any){
    console.log(repuesta)
    this.cambiaCargando(-1);
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else{
      this.rowData =repuesta;
    }
  } */
  recalcularEstados(){
    if(window.confirm("¿Estas seguro que quieres recalcular estados? Esto puede tomar varios minutos. Recuerda que cada que inicias sesión por primera vez en el día, se recalculan los estados. ")){
      this.recalculaEstados();
    }else{

    }
  }
  recalculaEstados(){
    this.cambiaCargando(1);
    let url = `${this.global.apiRoot}/certificaciones/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function',           'recalculaEstados');
    formData.append('token',              this.global.token);
    formData.append('rol_usuario_id',     '1004');
    this.http.post(url, formData).subscribe(res => this.respuestaRecalculaEdos(res.json()) );
  }
  respuestaRecalculaEdos(resp: any){
    this.cambiaCargando(-1);
    if(resp.error!=0){
      window.alert(resp.estatus);
      window.alert(resp.error);
      location.reload();
    }else{
      this.reloadMainGridFunc();
       //Emit evento que recarge el grid principal
    }
  }

   
  onSelectionChanged(event: EventListenerObject) {
    var selectedRows = this.gridApi.getSelectedRows();
    var id_certificaciones = "";
    var id_usuario_certificaciones =  "";
    var certificacion = "";
    var estadoNo = "";

    selectedRows.forEach(function(selectedRow, index) {
      this.tipoNo = selectedRow.tipoNo;
      this.id     = selectedRow.id;
      this.id_footerEnsayo = selectedRow.id_footerEnsayo
      this.ordenDeTrabajo_id = selectedRow.ordenDeTrabajo_id;
    });

    if(this.tipoNo == 0){
      window.alert("ERROR: CONTACTA A SOPORTE");
    }
    /*

    this.ordenTrabajo = ordenDeTrabajo_id; //ID Orden Trabajo
    this.id =id;                           //ID Formato
    this.id_Footer = id_footerEnsayo;      //ID Footer 
    this.tipo =tipoo;
    this.ruta =rutaa;
    console.log("Que paso: "+this.id);
    this.selected= true;
    this.tipoNo = tipoNo;
    */
    }
   
    //this.displayShortDescription(id_ordenDeTrabajo, obra, nombre_jefe_brigada_id, actividades, condicionesTrabajo, fechaInicio, fechaFin, active,activeColor);
  
  changeCertificacionAdmin(id_certificaciones,estadoNo){
    this.cambiaCargando(1);
    let url = `${this.global.apiRoot}/certificaciones/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function',           'addCertificacionPerfil');
    formData.append('token',              this.global.token);
    formData.append('rol_usuario_id',     '1004');

    formData.append('id_certificaciones', id_certificaciones);
    formData.append('estadoNo',           estadoNo);
    this.http.post(url, formData).subscribe(res => this.respuestaToggle(res.json()) );
  }
  respuestaToggle(resp: any){
    if(resp.error!=0){
      this.cambiaCargando(-1);
      window.alert(resp.estatus);
      location.reload();
    }else{
      let url = `${this.global.apiRoot}/certificaciones/get/endpoint.php`;
      let search = new URLSearchParams();
      search.set('function', 'getAllusuario_certificacionesAdmin');
      search.set('token', this.global.token);
      search.set('rol_usuario_id', "1004");
      this.http.get(url, {search}).subscribe(res => {
                                                console.log(res.json());
                                                this.llenaTabla(res.json(), "getAllRegistrosFromFooterByID");
                                                this.gridApi.sizeColumnsToFit();
                                              });
     
    }
  }


}
