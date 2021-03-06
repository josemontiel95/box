import { Component ,OnInit, Output, EventEmitter} from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formato-cch-grid',
  templateUrl: './formato-cch-grid.component.html',
  styleUrls: ['./formato-cch-grid.component.css']
})
export class FormatoCCHGridComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  id_orden: string;
  id_formato: string;
  rowSelection;
  columnDefs;
  rowClassRules;
  noRowDataError;


  @Output() statusForm = new EventEmitter<any>();

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
    {headerName: 'CLAVE DEL ESPECIMEN', field: 'claveEspecimen' },
    {headerName: 'FECHA', field: 'fecha' },
    {headerName: 'LOCALIZACI&Oacute;N', field: 'localizacion' },
    {headerName: 'Dias ensaye', field: 'diasEnsaye' },
    {headerName: 'ESTATUS', field: 'status' }
    ];
    this.rowSelection = "single";
    this.rowClassRules = {
      "row-blue-warning": function(params) {
        var status = params.data.status;
        return status == 1;
      },
      "row-green-warning": function(params) {
        var status = params.data.status;
        return status > 1;
      },
      "row-red-warning": function(params) {
        var herramienta_id = params.data.herramienta_id;
        return herramienta_id == null;
      }
    };
  }

  rowData: any;

  ngOnInit() {
      this.data.currentGlobal.subscribe(global => this.global = global);
      this.route.params.subscribe( params => {this.id_orden = params.id2; this.id_formato=params.id});
  }


  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    console.log("this.global.apiRoot"+this.global.apiRoot);
    console.log("this.global.token"+this.global.token);
    this.gridApi = params.api;
    let url = `${this.global.apiRoot}/formatoCampo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllRegistrosByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_formatoCampo', this.id_formato);
    console.log(search);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.llenaTabla(res.json());
                                            this.gridApi.sizeColumnsToFit();
                                          });
  }

  llenaTabla(repuesta: any){
    console.log(repuesta)
    let isValid=true;
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else if(repuesta.error==5){
      this.rowData =[];
      this.noRowDataError="No has agregado registros a este formato";
      isValid=false;
    }else{
      this.rowData =repuesta;
      isValid=true;
      repuesta.forEach(function (value) {
        if(value.status == "0"){
           isValid = false;
        }
      });
    }
    this.statusForm.emit(isValid);
  }

   
  onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var id = "";

    selectedRows.forEach(function(selectedRow, index) {
      id += selectedRow.id_registrosCampo;
      
    });
    this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/agregaRegistroCCH/'+this.id_orden + '/' +this.id_formato +'/' +id]);
  }


}
