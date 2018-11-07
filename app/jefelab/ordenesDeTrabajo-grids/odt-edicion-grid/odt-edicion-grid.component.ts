import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { DataService } from "../../../data.service";
import { Global } from "../../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'odt-edicion-grid',
  templateUrl: './odt-edicion-grid.component.html',
  styleUrls: ['./odt-edicion-grid.component.css']
})
export class OdtEdicionGridComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  rowSelection;
  columnDefs;
  id_orden: string;
  noRowDataError;
  @Input( ) status: any;
  hidden= false;

  id_ordenDeTrabajo;
  obra;
  nombre_jefe_brigada_id;
  actividades;
  condicionesTrabajo;
  fechaInicio;
  fechaFin;
  active;
  activeColor;
  imgUrl;

  desBut;
  actBut;

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
      {headerName: 'ID Orden de trabajo', field: 'id_ordenDeTrabajo'},
      {headerName: 'Obra', field: 'obra' },    
      {headerName: 'Jefe de Brigada', field: 'nombre_jefe_brigada_id'},
      {headerName: 'Actividades', field: 'actividades' },    
      {headerName: 'Condiciones de trabajo', field: 'condicionesTrabajo' },
      {headerName: 'Fecha de Inicio', field: 'fechaInicio' },
      {headerName: 'Fecha de Fin', field: 'fechaFin' },
      {headerName: 'Activo', field: 'active' },
      {headerName: 'Estatus', field: 'odtStatus' },
    ];
    this.rowSelection = "single";
  }

  rowData: any;
  @Output() cambiarCargando = new EventEmitter<any>();

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id_orden=params.id);
  }

  cargando(num){
    this.cambiarCargando.emit(num)
  }
  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    console.log("this.global.apiRoot"+this.global.apiRoot);
    console.log("this.global.token"+this.global.token);
    this.gridApi = params.api;
    this.cargando(+1);
    let url = `${this.global.apiRoot}/ordenDeTrabajo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllJefaLab');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('status', this.status);
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.llenaTabla(res.json());
      this.gridApi.sizeColumnsToFit();
    });
  }

  llenaTabla(repuesta: any){
    this.cargando(-1);
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

   
  onSelectionChanged(event: EventListenerObject) {
    var selectedRows = this.gridApi.getSelectedRows();
    var id_ordenDeTrabajo = "";
    var obra = "";
    var nombre_jefe_brigada_id = "";
    var actividades = "";
    var condicionesTrabajo ="";
    var fechaInicio = "";
    var fechaFin = "";
    var active= "";
    var activeColor= "";


    selectedRows.forEach(function(selectedRow, index) {
      id_ordenDeTrabajo = selectedRow.id_ordenDeTrabajo;
      obra = selectedRow.obra;
      nombre_jefe_brigada_id = selectedRow.nombre_jefe_brigada_id;
      actividades = selectedRow.actividades;
      condicionesTrabajo = selectedRow.condicionesTrabajo;
      fechaInicio = selectedRow.fechaInicio;
      fechaFin = selectedRow.fechaFin;
      active = selectedRow.active;
      activeColor = selectedRow.activeColor;
    });
    this.hidden=true;
    //activar 
    this.id_ordenDeTrabajo=id_ordenDeTrabajo;
    this.obra=obra;
    this.nombre_jefe_brigada_id=nombre_jefe_brigada_id;
    this.actividades=actividades;
    this.condicionesTrabajo=condicionesTrabajo;
    this.fechaInicio=fechaInicio;
    this.fechaFin=fechaFin;
    this.active=active;
    this.activeColor=activeColor;
    this.imgUrl="../assets/img/gabino.jpg";
    
    console.log("displayShortDescription :: "+activeColor);

    if(Number(activeColor) == 1){
      console.log("if :: "+activeColor);
      this.desBut = true;
      this.actBut= false;
    }
    else if (Number(activeColor) == 0) {
      console.log("else :: "+activeColor);
      this.desBut = false;
      this.actBut= true;
    }
  }


  menosDetalles(){
    this.hidden=false;
  }
  detalleOrdenTrabajo(){
    this.router.navigate(['jefeLaboratorio/orden-trabajo/dashboard/'+this.id_ordenDeTrabajo]);
  }

}
