import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grid-cilindros',
  templateUrl: './grid-cilindros.component.html',
  styleUrls: ['./grid-cilindros.component.css']
})
export class GridCilindrosComponent implements OnInit  {
	@Output() cambiarCargando = new EventEmitter<any>();
  title = 'app';
  global: Global;
  private gridApi;
  rowSelection;
  columnDefs;
  id_orden: string;
  id_footer: string;
  rowClassRules;

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
    {headerName: 'FECHA DE COLADO', field: 'fechaColado'},
    {headerName: 'INFORME NUMERO', field: 'informeNo'},
    {headerName: 'CLAVE', field: 'claveEspecimen'},
    {headerName: 'ENSAYE EN DIAS', field: 'diasEnsayeFinal' }
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
      }
    };
  }

  ngOnInit() {
     this.data.currentGlobal.subscribe(global => this.global = global);
     this.route.params.subscribe( params => this.id_footer=params.id);
     this.cambiarCargando.emit(+1); 
  }


 rowData: any;

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;

    let url = `${this.global.apiRoot}/ensayoCilindro/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllRegistrosFromFooterByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('footerEnsayo_id', this.id_footer);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.rowData= res.json();
                                            this.gridApi.sizeColumnsToFit();
                                            this.llenadoValidator(res.json(), "getAllRegistrosFromFooterByID");
                                          });
  }

  llenadoValidator(respuesta: any, caller){
    this.cambiarCargando.emit(-1);
    if(respuesta.error>0){
      window.alert(caller + " :: GridCilindro :: " +respuesta.estatus);
    }else{
      //EXITO. 
    } 
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
      id += selectedRow.id_ensayoCilindro;
      
    });
    this.cambiarCargando.emit(+1); 
    this.router.navigate(['tecnico/pendientes/dashboardCilindro/pruebaCilindro/'+this.id_footer +'/' +id]);
  }
}
