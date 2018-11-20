import { Component,OnInit,  Output, EventEmitter} from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formatos-grid',
  templateUrl: './formatos-grid.component.html',
  styleUrls: ['./formatos-grid.component.css']
})
export class FormatosGridComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  id_orden: string;
  rowSelection;
  columnDefs;
  rowClassRules;
  noRowDataError="";
  ordenTrabajo;
  id;
  id_Footer;
  selected;
  tipoNo;
  @Output() cambiarCargando = new EventEmitter<any>();


  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
      {headerName: 'InformeNo.', field: 'informeNo' },
      {headerName: 'Fecha.', field: 'fecha' },
      {headerName: 'Tipo', field: 'tipo' },
      {headerName: 'Accion Requerida', field: 'accReq' }
      
    ];
    this.rowSelection = "single";

    this.rowClassRules = {
      "sick-days-warning": function(params) {
        var numSickDays = params.data.status;
        return numSickDays === 0;
      },
      "sick-days-breach": "data.status == 1"
    };
  }

  rowData: any;

  ngOnInit() {
      this.data.currentGlobal.subscribe(global => this.global = global);
      this.route.params.subscribe( params => this.id_orden=params.id);
  }


  onGridReady(params) {
    this.cambiarCargando.emit(+1);

    this.data.currentGlobal.subscribe(global => this.global = global);
    console.log("this.global.apiRoot"+this.global.apiRoot);
    console.log("this.global.token"+this.global.token);
    this.gridApi = params.api;
    let url = `${this.global.apiRoot}/ordenDeTrabajo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllFormatos');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ordenDeTrabajo', this.id_orden);
    console.log(search);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.llenaTabla(res.json());
                                            this.gridApi.sizeColumnsToFit();
                                          });
  }

  llenaTabla(repuesta: any){
    this.cambiarCargando.emit(-1);

    console.log(repuesta)
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else if(repuesta.error==5){
      this.rowData =[];
      this.noRowDataError="No existen formatos para esta orden.";   
    }else{
      this.rowData =repuesta;
    }
  }

   
 onSelectionChanged(event: EventListenerObject){
  var selectedRows = this.gridApi.getSelectedRows();
  var tipoNo;
  var id;
  var ordenDeTrabajo_id;
  var id_footerEnsayo;

  selectedRows.forEach(function(selectedRow, index) {
    tipoNo = selectedRow.tipoNo;
    id     = selectedRow.id;
    id_footerEnsayo = selectedRow.id_footerEnsayo
    ordenDeTrabajo_id = selectedRow.ordenDeTrabajo_id;
  });

  this.ordenTrabajo = ordenDeTrabajo_id; //ID Orden Trabajo
  this.id =id;                           //ID Formato
  this.id_Footer = id_footerEnsayo;      //ID Footer 
  this.selected= true;
  this.tipoNo = tipoNo;
   
  }
  selectOption(){
    this.cambiarCargando.emit(+1);
    if(this.tipoNo == 1){
      this.router.navigate(['jefeLaboratorio/orden-trabajo/dashboard/llenaRevenimiento/'+ this.ordenTrabajo + "/" + this.id]);
    }else if(this.tipoNo > 1){
      this.router.navigate(['jefeLaboratorio/orden-trabajo/dashboard/llenaFormatoCCH/'+this.ordenTrabajo + "/" + this.id + "/" + this.id_Footer]);
    }else if(this.tipoNo == 0){
      window.alert("Error. Algo salió mal. Contacta a soporte.");
    }
  }


}
