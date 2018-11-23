import { Component, OnInit} from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-jlabhistorico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss','../../loadingArrows.css']
})
export class JLabHistoricoComponent implements OnInit{
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
  noRowData=false;
  selected = false;
  tipoNo;
  ordenTrabajo;
  mis_obras: Array<any>;

  noObrasMessage="";

  obras= false;

  isdataReadyForGrid=false;
  ordenForm: FormGroup; //se crea un formulario de tipo form group
  obra_idTmp;
  Orden = {
    obra_id: ''
  };

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
  /* this.columnDefs = [    
    {headerName: 'ID_Log', field: 'id_log' },
    {headerName: 'queryType', field: 'queryType' },
    {headerName: 'status', field: 'status' }
  ];*/
  this.columnDefs = [    
    {headerName: 'INFORME N&Uacute;MERO', field: 'informeNo' },
    {headerName: 'CLV ESPECIM', field: 'claveEspecimen' },
    {headerName: 'TIPO', field: 'tipo' },
    {headerName: 'DIAS ENSAYE', field: 'diasEnsaye' },
    {headerName: 'F. ENS ASIG', field: 'fechaEnsayeAsignado' },
    {headerName: 'F. ENS REAL', field: 'fechaEnsayoReal' },
    {headerName: 'CARGA', field: 'carga' },
    {headerName: 'RESISTENCIA', field: 'resistencia' }
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
    this.cargando = this.cargando +1;
    let url = `${this.global.apiRoot}/obra/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {
      this.llenaObra(res.json());
    });
    this.ordenForm = new FormGroup({
      'obra_id':             new FormControl(this.Orden.obra_id,  [ Validators.required])
    });
  }
  get obra_id() { return this.ordenForm.get('obra_id'); }

  onObraBlur(){
    this.obra_idTmp=this.ordenForm.value.obra_id;
    console.log("onObraBlur :: "+this.obra_idTmp);
    this.isdataReadyForGrid=true;
    this.ordenForm.patchValue({
      obra_id: ''
    });
  }
  llenaObra(repuesta: any){
    this.cargando=this.cargando-1;
    if(repuesta.error==5){
      this.mis_obras= [];
      this.obras=false;
      this.noObrasMessage="No hay obras en el sistema."
    }
    else if(repuesta.error>0){
      this.obras=false;
      this.mis_obras= [];
      window.alert(repuesta.estatus);
    }else{
      this.obras=true;
      this.mis_obras= new Array(repuesta.length);
      for (var _i = 0; _i < repuesta.length; _i++){
        this.mis_obras[_i]=repuesta[_i];
      }
      console.log(this.mis_obras);
    }
  }

  rowData: any;

  onGridReady(params) {
    this.cargando = this.cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    /*
    let url = `${this.global.apiRoot}/footerEnsayo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'getLog');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    this.http.post(url, formData).subscribe(res => { 
      console.log(res);
      this.rowData= res.json();
      this.gridApi.sizeColumnsToFit();
      this.llenaTabla(res.json(), "getAllRegistrosFromFooterByID");
    });*/
    console.log("onGridReady :: "+this.obra_idTmp);

    let url = `${this.global.apiRoot}/footerEnsayo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getHistoricEnsayos');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('obra_id', this.obra_idTmp);

    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.gridApi.sizeColumnsToFit();
      this.llenaTabla(res.json(), "getAllRegistrosFromFooterByID");
    }); 
  }


  llenaTabla(repuesta: any, caller){
    console.log("llenaTabla :: "+this.obra_idTmp);

    console.log(repuesta)
    this.cargando = this.cargando -1;
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else if(repuesta.error==5){
      this.rowData =[];
      this.noRowDataError="No hay ensayos de la obra seleccionada";   
      this.noRowData=true;
    }else{
      this.noRowData=false;
      this.noRowDataError="";   
      this.rowData =repuesta;
    }
  }

  cambiarCargando(num){
    this.cargando=this.cargando + num;
  }

 onSelectionChanged(event: EventListenerObject) {
    var selectedRows = this.gridApi.getSelectedRows();
    var tipoo;
    var rutaa;
    var tipoNo;
    var id;
    var ordenDeTrabajo_id;
    var id_footerEnsayo;

    selectedRows.forEach(function(selectedRow, index) {
      tipoNo = selectedRow.tipoNo;
      id     = selectedRow.id;
      id_footerEnsayo = selectedRow.id_footerEnsayo;
      ordenDeTrabajo_id = selectedRow.ordenDeTrabajo_id;
    });

    this.ordenTrabajo = ordenDeTrabajo_id; //ID Orden Trabajo
    this.id =id;                           //ID Formato
    this.id_Footer = id_footerEnsayo;      //ID Footer 
    this.tipo =tipoo;
    this.ruta =rutaa;
    console.log("Que paso: "+this.id);
    this.selected= true;
    this.tipoNo = tipoNo;
   }

  selectOption(){
    this.cambiarCargando(+1);
    if(this.tipoNo == 2){
      this.router.navigate(['tecnico/pendientes/dashboardCilindro/' + this.id_Footer]);
    }else if(this.tipoNo == 3){
      this.router.navigate(['tecnico/pendientes/dashboardCubo/' + this.id_Footer]);
    }else if(this.tipoNo == 4){
      this.router.navigate(['tecnico/pendientes/dashboardViga/' + this.id_Footer]);
    }else if(this.tipoNo == 0){
      window.alert("Error. Algo salió mal. Contacta a soporte.");
    }
  }
}



