import { Component, ViewChild ,OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
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
  private gridColumnApi;
  id_formato: string;
  rowSelection;
  columnDefs;
  rowClassRules;

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
    {headerName: 'CLAVE DEL ESPECIMEN', field: 'claveEspecimen' },
    /*
    {headerName: 'FECHA', field: 'fecha' },
    {headerName: 'F&rsquo;C', field: 'fprima'},
    {headerName: 'REVENIMIENTO: PROYECTO', field: 'revProyecto'},
    {headerName: 'REVENIMIENTO: OBRA', field: 'revObra'},
    {headerName: 'TAMA&Ntilde;O NOMINAL DEL AGREGADO (mm)', field: 'tamagregado' },
    {headerName: 'VOLUMEN (m<sup>2</sup>)', field: 'volumen' },
    {headerName: 'TIPO DE CONCRETO', field: 'tipoConcreto' },
    {headerName: 'UNIDAD', field: 'herramienta_id' },
    {headerName: 'HORA DE MUESTREO EN OBRA', field: 'horaMuestreo' },
    {headerName: 'TEMP AMBIENTE DE MUESTREO (&#176;C)', field: 'tempMuestreo' },
    {headerName: 'TEMP AMBIENTE DE RECOLECCI&Oacute;N (&#176;C)', field: 'tempRecoleccion' },
    {headerName: 'LOCALIZACI&Oacute;N', field: 'localizacion' },
    */
    {headerName: 'ESTATUS', field: 'status' }

      
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
      this.route.params.subscribe( params => this.id_formato=params.id);
  }


  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    console.log("this.global.apiRoot"+this.global.apiRoot);
    console.log("this.global.token"+this.global.token);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
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
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else{
      this.rowData =repuesta;
    }
  }

   
 onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var id = "";

    selectedRows.forEach(function(selectedRow, index) {
      id += selectedRow.id_registrosCampo;
      
    });
    this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/agregaRegistroCCH/'+id+'/'+this.id_formato]);
  }


}
