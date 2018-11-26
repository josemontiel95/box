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
  selector: 'terminados',
  templateUrl: './terminados.component.html',
  styleUrls: ['./terminados.component.css','../../loadingArrows.css']
})
export class TerminadosComponent implements OnInit{
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
  imgUrl="";
  cargando= 0;
  mis_tipos: Array<any>;
  formatosSeleccionados: Array<any>;
  status="1";

  link;
  id_loteCorreos;
  selected=false;
  noRowDataError;
  noRowData;
  mis_obras: Array<any>;

  noObrasMessage="";

  obras= false;

  isdataReadyForGrid=false;
  ordenForm: FormGroup; //se crea un formulario de tipo form group
  obra_idTmp;
  Orden = {
    obra_id: ''
  };

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
      {headerName: 'Lote No.', field: 'id_loteCorreos' },
      {headerName: 'RAZ&Oacute;N SOCIAL', field: 'razonSocial' },
      {headerName: 'COTIZACI&Oacute;N', field: 'cotizacion' },
      {headerName: 'Identificador', field: 'informeNo' },
      {headerName: 'Clave de Especimen', field: 'claveEspecimen' },
      {headerName: 'Factura', field: 'factua' },
      {headerName: 'TIPO', field: 'tipoObra' },
      {headerName: 'F. Colado', field: 'fechaColado' },
      {headerName: 'F. Lote', field: 'fechaLote' },

    ];
    this.rowSelection = "multiple";
  }
  selectLote= false;
  rowData: any;

  ngOnInit() {
    this.route.params.subscribe( params => this.id=params.id );
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

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    this.cargando = this.cargando +1;
    let url = `${this.global.apiRoot}/loteCorreos/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllAdministrativoFULL');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('obra_id', this.obra_idTmp);

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
      this.noRowDataError="No hay reportes de la obra seleccionada";   
      this.noRowData=true;
    }else{
      this.noRowData=false;
      this.noRowDataError="";   
      this.rowData =repuesta;
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
    var pdf = "";
    var link = "";
    var id_loteCorreos;
    this.selected=true;
    selectedRows.forEach(function(selectedRow, index) {
      pdf = selectedRow.PDF;
      link = selectedRow.pdfFinal;
      id_loteCorreos = selectedRow.id_loteCorreos;
    });
    this.link=link;
    this.id_loteCorreos=id_loteCorreos;

  }
  openPDF(){
    window.open(this.link, "_blank");
  }
  openLote(){
    this.cargando = this.cargando +1;

    this.router.navigate(['administrativo/obras/dashboardLote/'+this.id_loteCorreos]);
  }
  onObraBlur(){
    this.obra_idTmp=this.ordenForm.value.obra_id;
    console.log("onObraBlur :: "+this.obra_idTmp);
    this.isdataReadyForGrid=true;
    this.ordenForm.patchValue({
      obra_id: ''
    });
  }

}







