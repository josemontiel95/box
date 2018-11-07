import { Component, OnInit} from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jlabpendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.scss','../../loadingArrows.css']
})
export class JLabPendientesComponent implements OnInit{
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
  tipoNo;
  ordenTrabajo;

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
    {headerName: 'CTRL FORMATO', field: 'id' },    
    {headerName: 'INFORME N&Uacute;MERO', field: 'informeNo' },    
    
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

    let url = `${this.global.apiRoot}/footerEnsayo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAwaitingApproval');
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
    var idd;
    var tipoo;
    var rutaa;
    var tipoNo;
    var id;
    var ordenDeTrabajo_id;

    selectedRows.forEach(function(selectedRow, index) {
      tipoNo = selectedRow.tipoNo;
      id     = selectedRow.id;
      ordenDeTrabajo_id = selectedRow.ordenDeTrabajo_id;
    });

    if(tipoNo == 0){
      window.alert("ERROR: CONTACTA A SOPORTE");
    }

    this.ordenTrabajo = ordenDeTrabajo_id
    this.id =id;
    this.tipo =tipoo;
    this.ruta =rutaa;
    console.log("Que paso: "+this.id);
    this.selected= true;
    this.tipoNo = tipoNo;
   }

  selectOption(){
    this.cambiarCargando(+1);
    this.respuestaSwitch(this.tipoNo);
  }

  respuestaSwitch(res: any){  
    this.cambiarCargando(-1);
    if(res == 1){
      this.router.navigate(['jefeLaboratorio/orden-trabajo/dashboard/llenaRevenimiento/'+ this.ordenTrabajo + "/" + this.id]);
    }else if(res == 2){
      this.router.navigate(['jefeLaboratorio/orden-trabajo/dashboard/llenaFormatoCCH/'+this.ordenTrabajo + "/" + this.id]);
    }   
  }
}


/*
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
*/
