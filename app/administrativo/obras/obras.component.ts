import { Component, OnInit} from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import {
    FormGroup,
    FormControl
} from '@angular/forms';

@Component({
  selector: 'obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css','../../loadingArrows.css']
})
export class ObrasComponent implements OnInit{
	title = 'app';
  global: Global;
  private gridApi;
  rowSelection;
  columnDefs;
  id= "";
  nombre= "";
  prefijo= "";
  foto= "";
  cliente= "";
  active="";
  hidden=false;
  desBut=true;
  actBut=false;
  viewPDF=false;
  imgUrl="";
  cargando= 0;
  tipoForm: FormGroup;
  mis_tipos: Array<any>;
  formatosSeleccionadosCCH: Array<any>;
  formatosSeleccionadosRev: Array<any>;
  status="1";

  noRowDataError;
  pdfFinal;
  selected;

  forma={
    formato_tipo_id:''
  };


  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
      {headerName: 'Cliente', field: 'razonSocial' },
      {headerName: '# Cot.', field: 'cotizacion' },
      {headerName: 'Obra', field: 'obra' },
      {headerName: '# Informe', field: 'informeNo' },
      {headerName: 'Clave especimen', field: 'claveEspecimen' },
      {headerName: 'Tipo', field: 'tipo' },
      {headerName: 'F. Colado', field: 'fechaColado' },
      {headerName: 'F. Ensayo', field: 'fechaEnsayado' },
      {headerName: 'Dias de Ensaye', field: 'diasEnsaye' },
      {headerName: 'Tipo Obra', field: 'tipoObra' },
      {headerName: '# envios', field: 'sentToClientFinal' },

    ];
    this.rowSelection = "multiple";
  }
  selectLote= false;
  rowData: any;

  ngOnInit() {
    this.route.params.subscribe( params => this.id=params.id );
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=this.cargando+1;

    let url = `${this.global.apiRoot}/loteCorreos/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('status', this.status);
    this.http.get(url, {search}).subscribe(res => this.llenaLotes(res.json()) );

    this.tipoForm = new FormGroup({
      'lotes': new FormControl(  this.forma.formato_tipo_id)
    });
  }

   get lotes() { return this.tipoForm.get('lotes'); } 

  llenaLotes(resp: any){
    if(resp.error==5){
      this.mis_tipos=[];
    }else{
      console.log(resp);
      this.mis_tipos= new Array(resp.length);
      for (var _i = 0; _i < resp.length; _i++ ){
        this.mis_tipos[_i]=resp[_i];
      }
      console.log("llenaTipos this.cargando: "+this.cargando);
    }
    this.cargando=this.cargando-1;
  }

  cambiarCargando(num){
    this.cargando=this.cargando+num;
  }

  crearObra(){
    this.router.navigate(['administrador/obras/crear-obra']);
  }

  detalleObra(){ //Cambialo a detalleObra
    this.router.navigate(['administrador/obras/obra-detail/'+this.id]);
  }
  seleccionaLote(){
    if(this.tipoForm.value.lotes == -1){
      //window.alert("seleccionaLote :: IF : -1");
        if(window.confirm("¿Estas seguro de crear un nuevo lote de correos? Ya NO podrás eliminarlo despues.")){
          this.agregaFormatos();
        }else{
          return;
        }
    }else{
      this.agregaFormatos();
      //window.alert("seleccionaLote :: ELSE: "+this.tipoForm.value.lotes);
    }
  }

  agregaFormatos(){
    this.cargando=this.cargando+1;
    let url = `${this.global.apiRoot}/loteCorreos/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'agregaFormatos');
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('token', this.global.token);
    formData.append('lote', this.tipoForm.value.lotes);
    formData.append('formatosSeleccionadosCCH', JSON.stringify(this.formatosSeleccionadosCCH));
    formData.append('formatosSeleccionadosRev', JSON.stringify(this.formatosSeleccionadosRev));
    this.http.post(url, formData).subscribe(res => {
                                                    this.respuestaSwitch(res.json());
    });
  }

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    this.cargando=this.cargando+1;
    let url = `${this.global.apiRoot}/loteCorreos/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllAdministrativo');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.llenaTabla(res.json());
                                            this.gridApi.sizeColumnsToFit();
                                          });
  }

  llenaTabla(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else if(repuesta.error==5){
      this.rowData =[];
      this.noRowDataError="No tienes lotes pendientes.";
    }else{
      this.rowData =repuesta;
      this.noRowDataError="";

    }
    this.cargando=this.cargando-1;
  }
  
   menosDetalles(){
     this.hidden=false;
   }

   respuestaSwitch(res: any){
     console.log(res);
     if(res.error!= 0){
       window.alert(res.estatus);
       location.reload();
     }
     else{
       this.router.navigate(['administrativo/obras/dashboardLote/'+res.lote]);
     }
   }

   agregaLote(){
    this.selectLote=!this.selectLote;
  }

   onSelectionChanged(event: EventListenerObject) {
    var selectedRows = this.gridApi.getSelectedRows();
    var id_rev = []; //array
    var id_cch = []; //array
    var pdfFinal;
    this.selected=true;

    selectedRows.forEach(function(selectedRow, index) {
      pdfFinal = selectedRow.pdfFinal;
      if(selectedRow.tipoNo == 1){
          id_rev.push(selectedRow.id_formato);
      }else if(selectedRow.tipoNo > 1 && selectedRow.tipoNo < 5){
          id_cch.push(selectedRow.id_registrosCampo);
      }
      //this.formatosSeleccionados.push(selectedRow.id_formatoCampo);
    });
    this.pdfFinal=pdfFinal;
    this.formatosSeleccionadosCCH = [];
    this.formatosSeleccionadosRev = [];
    this.formatosSeleccionadosCCH = id_cch;
    this.formatosSeleccionadosRev = id_rev;

    console.log(this.formatosSeleccionadosCCH);
    console.log(this.formatosSeleccionadosRev);

    console.log("onSelectionChage Size CCH: "+this.formatosSeleccionadosCCH.length);
    console.log("onSelectionChage Size Rev: "+this.formatosSeleccionadosRev.length);
    if(this.formatosSeleccionadosCCH.length == 1 && this.formatosSeleccionadosRev.length == 0){
      this.viewPDF=true;
    }else if(this.formatosSeleccionadosCCH.length == 0 && this.formatosSeleccionadosRev.length == 1){
      this.viewPDF=true;
    }else{
      this.viewPDF=false;
    }
  }
  verPDF(){
    if(this.viewPDF){
      window.open(this.pdfFinal, "_blank");
    }else{
      window.alert("Debes seleccionar exactamente s\u00F3lo un reporte para ver su PDF")
    }
  }

}







