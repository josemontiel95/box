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
  desBut=true;
  actBut=false;
  hidden= false;
  active:string;
  foto= '';
  imgUrl="";
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  cargando= 1;
  id:string;

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
    {headerName: 'ID Orden de trabajo', field: 'id_ordenDeTrabajo'},
    {headerName: 'Obra', field: 'obra' },    
    {headerName: 'Jefe de Brigada', field: 'nombre_jefe_brigada_id'},
    {headerName: 'Actividades', field: 'actividades' },    
    {headerName: 'Condiciones de trabajo', field: 'condicionesTrabajo' },
    {headerName: 'Fecha de Inicio', field: 'fechaInicio' },
    {headerName: 'Fecha de Fin', field: 'fechaFin' },
    {headerName: 'Activo', field: 'active' },
  ];
    this.rowSelection = "single";
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=1;
  }

  rowData: any;

  crearOrdenTrabajo(){
    this.router.navigate(['jefeLaboratorio/orden-trabajo/crear-orden-trabajo']);
  }

    detalleOrdenTrabajo(){
    this.router.navigate(['jefeLaboratorio/orden-trabajo/dashboard/'+this.id_ordenDeTrabajo]);
  }

     menosDetalles(){
     this.hidden=false;
   }

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/ordenDeTrabajo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllAdmin');
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


    selectedRows.forEach(function(selectedRow, index) {
      id_ordenDeTrabajo += selectedRow.id_ordenDeTrabajo;
      obra += selectedRow.obra;
      nombre_jefe_brigada_id += selectedRow.nombre_jefe_brigada_id;
      actividades += selectedRow.actividades;
      condicionesTrabajo += selectedRow.condicionesTrabajo;
      fechaInicio += selectedRow.fechaInicio;
      fechaFin += selectedRow.fechaFin;
      active += selectedRow.active;

    });
    this.displayShortDescription(id_ordenDeTrabajo, obra, nombre_jefe_brigada_id, actividades, condicionesTrabajo, fechaInicio, fechaFin, active);
  }

  displayShortDescription(id_ordenDeTrabajo: any, obra: any, nombre_jefe_brigada_id: any,  actividades: any, condicionesTrabajo: any, fechaInicio: any, fechaFin: any, active: any )
  {
    

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
    if(this.foto== "null"){
      this.imgUrl="../assets/img/gabino.jpg";
    }else{
      this.imgUrl= this.global.assetsRoot+this.foto;
    }
    
    if(active == 1)
    {
      this.desBut = true;
      this.actBut= false;
    }
    else{
      if (active == 0) {
        this.desBut = false;
        this.actBut= true;
      }
    }
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

}
