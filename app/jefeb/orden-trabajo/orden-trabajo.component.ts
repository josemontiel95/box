import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orden-trabajo',
  templateUrl: './orden-trabajo.component.html',
  styleUrls: ['./orden-trabajo.component.scss','../../loadingArrows.css']
})
export class OrdenTrabajoComponent implements OnInit{
  title = 'app';
  id_ordenDeTrabajo: string;
  obra: string;
  nombre_jefe_brigada_id: string;
  actividades: string;
  condicionesTrabajo: string;
  fechaInicio: string;
  fechaFin: string;
  lugar;
  desBut=true;
  actBut=false;
  hidden= false;
  historial= false;
  active: any;
  foto= '';
  imgUrl="";
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  cargando= 1;
  rowClassRules;

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
    {headerName: 'ID Orden de trabajo', field: 'id_ordenDeTrabajo'},
    {headerName: 'Obra', field: 'obra' },    
    {headerName: 'Fecha de Inicio', field: 'fechaInicio' },
    {headerName: 'Fecha de Fin', field: 'fechaFin' },
    {headerName: 'Ejecuci&oacute;n', field: 'estado' },
    {headerName: 'Estatus', field: 'odtStatus' },
  ];
    this.rowSelection = "single";
    this.rowClassRules = {
      "row-red-warning": function(params) {
        var color = params.data.color;
        return color == 0;
      },
      "row-yelloy-warning": function(params) {
        var color = params.data.color;
        return color == 1;
      },
      "row-blue-warning": function(params) {
        var color = params.data.color;
        return color == 2;
      },
      "row-green-warning": function(params) {
        var color = params.data.color;
        return color == 3;
      }
    };
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=1;
  }

  rowData: any;


    detalleOrdenTrabajo(){
    this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/'+this.id_ordenDeTrabajo]);
  }

     desactivarCliente(){
     this.actBut= true;
     this.desBut= false;
     this.switchActive(0);
  }

   activarCliente(){
     this.actBut = false;
     this.desBut = true;
     this.switchActive(1);
   }

      switchActive(active: number){
     let url = `${this.global.apiRoot}/ordenDeTrabajo/post/endpoint.php`;
     let formData:FormData = new FormData();
      
      if(active == 0){
        formData.append('function', 'deactivate');
      }
      else{
        formData.append('function', 'activate');
      }
        formData.append('id_ordenDeTrabajo', this.id_ordenDeTrabajo);
        formData.append('rol_usuario_id', this.global.rol);
        formData.append('token', this.global.token);
        this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                            });
       

      }

               respuestaSwitch(res: any){
     console.log(res);
     if(res.error!= 0){
       window.alert("Intentalo otra vez");
       location.reload();
     }
     else{
       location.reload();
     }
   }



     menosDetalles(){
     this.hidden=false;
   }

  reloadHistorial(){
    this.cargando=this.cargando+1;
    let url = `${this.global.apiRoot}/ordenDeTrabajo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getFULLByJefeBrigada');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.rowData= res.json();
                                            this.gridApi.sizeColumnsToFit();
                                            this.cargando=this.cargando-1;
                                            this.historial = true;
                                          });
  }

  reloadMainGrid(){
    this.cargando=this.cargando+1;
    let url = `${this.global.apiRoot}/ordenDeTrabajo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllByJefeBrigada');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.rowData= res.json();
                                            this.gridApi.sizeColumnsToFit();
                                            this.cargando=this.cargando-1;
                                            this.historial = false;
                                          });
  }



  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/ordenDeTrabajo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllByJefeBrigada');
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
    var id_ordenDeTrabajo = "";
    var obra = "";
    var nombre_jefe_brigada_id = "";
    var actividades = "";
    var condicionesTrabajo ="";
    var fechaInicio = "";
    var fechaFin = "";
    var active= "";
    var lugar="";

    selectedRows.forEach(function(selectedRow, index) {
      id_ordenDeTrabajo += selectedRow.id_ordenDeTrabajo;
      obra += selectedRow.obra;
      nombre_jefe_brigada_id += selectedRow.nombre_jefe_brigada_id;
      actividades += selectedRow.actividades;
      condicionesTrabajo += selectedRow.condicionesTrabajo;
      fechaInicio += selectedRow.fechaInicio;
      fechaFin += selectedRow.fechaFin;
      active += selectedRow.active;
      lugar = selectedRow.lugar;
    });

    this.hidden=true;

    this.id_ordenDeTrabajo=id_ordenDeTrabajo;
    this.obra=obra;
    this.nombre_jefe_brigada_id=nombre_jefe_brigada_id;
    this.actividades=actividades;
    this.condicionesTrabajo=condicionesTrabajo;
    this.fechaInicio=fechaInicio;
    this.fechaFin=fechaFin;
    this.lugar=lugar;
 
    if(Number(active) == 1){
      this.desBut = true;
      this.actBut = false;
    }else if (Number(active) == 0) {
      this.desBut = false;
      this.actBut = true;
    }
  }
}
