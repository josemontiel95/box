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
  id_orden: string;
  id_formato: string;
  id_registro: string;
  id_footer: string;
  tipoEnsayo: string;
  id_registroEnsayo: string;
  rowSelection;
  columnDefs;
  rowClassRules;
  footerEnsayo_id: string;
  statusEnsayo = false;
  isSelected = false;

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
    {headerName: 'CLAVE DEL ESPECIMEN', field: 'claveEspecimen' },
    {headerName: 'FECHA', field: 'fecha' },
    {headerName: 'LOCALIZACI&Oacute;N', field: 'localizacion' },
    {headerName: 'Dias ensaye', field: 'diasEnsaye' },
    /*
    {headerName: 'F&rsquo;C', field: 'fprima'},

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
      "row-blue-warning": function(params) {
        var status = params.data.status;
        return status == 3;
      },
      "row-green-warning": function(params) {
        var status = params.data.status;
        return status ==2; 
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
      this.route.params.subscribe( params => {this.id_orden = params.id2; this.id_formato=params.id; this.id_footer=params.id3;});
  }
  /*Este metodo es llamado por el boton REGISTRO DE CAMPO y llevara al usuario a AgregaRegistroCCH*/
  onLoadCCH(){
    if(this.isSelected){
    this.router.navigate(['jefeLaboratorio/orden-trabajo/dashboard/agregaRegistroCCH/'+this.id_orden + '/' +this.id_formato +'/' +this.id_footer + '/' + this.id_registro]);      
    }else{
      window.alert("No hay un especimen seleccionado, intentalo de nuevo.");
    }
  }

  onLoadEnsayo(){
    if(this.isSelected){
      if(this.footerEnsayo_id == "null"){
        window.alert("ESTE ESPECIMEN AUN NO HA SIDO ENSAYADO POR EL TECNICO DE MUESTRAS");
      }else if(this.tipoEnsayo == "VIGAS"){
        this.router.navigate(['jefeLaboratorio/orden-trabajo/dashboard/pruebaViga/'+this.id_orden + '/' +this.id_formato +'/' +this.id_footer + '/' + this.id_registroEnsayo]);
      }else if(this.tipoEnsayo == "CUBO"){
        this.router.navigate(['jefeLaboratorio/orden-trabajo/dashboard/pruebaCubo/'+this.id_orden + '/' +this.id_formato +'/' +this.id_footer + '/' + this.id_registroEnsayo]);
      }else if(this.tipoEnsayo == "CILINDRO"){
        this.router.navigate(['jefeLaboratorio/orden-trabajo/dashboard/pruebaCilindro/'+this.id_orden + '/' +this.id_formato +'/' +this.id_footer + '/' + this.id_registroEnsayo]);
      }else{
        window.alert("ERROR, CONTANTE A SOPORTE");
      }
    }else{
      window.alert("No hay un especimen seleccionado, intentalo de nuevo.");
    }
    

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
    var tipoEnsayo = "";
    var id_registroEnsayo = "";
    var footerEnsayo_id = "";
    var statusEnsayo;
    this.isSelected = true;

    selectedRows.forEach(function(selectedRow, index) {
      id += selectedRow.id_registrosCampo;
      tipoEnsayo += selectedRow.tipo;
      id_registroEnsayo += selectedRow.id_ensayo;
      footerEnsayo_id +=selectedRow.footerEnsayo_id;
      statusEnsayo += selectedRow.statusEnsayo;
      
    });
    this.id_registro = id;
    this.tipoEnsayo = tipoEnsayo;
    this.id_registroEnsayo = id_registroEnsayo;
    this.footerEnsayo_id = footerEnsayo_id;
    if(statusEnsayo == 1){
      this.statusEnsayo = true;
    }else{
      this.statusEnsayo = false;
    }
  }
}
