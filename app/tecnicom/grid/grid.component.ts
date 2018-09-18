import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  id_orden: string;
  rowClassRules;


  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
      {headerName: 'Ctrl', field: 'id_footerEnsayo'},
      {headerName: 'TMU', field: 'nombre' },   
      {headerName: 'Tipo', field: 'tipo' },
      {headerName: 'Creado', field: 'fecha' },    
    ];
    this.rowSelection = "single";
    this.rowClassRules = {
      "row-blue-warning": function(params) {
        var color = params.data.color;
        return color == 1;
      },
      "row-yelloy-warning": function(params) {
        var color = params.data.color;
        return color == 2;
      },
      "row-orange-warning": function(params) {
        var color = params.data.color;
        return color == 3;
      },
      "row-red-warning": function(params) {
        var color = params.data.color;
        return color == 4;
      }
    };
  }

 

  ngOnInit() {
     this.data.currentGlobal.subscribe(global => this.global = global);
 
  }


 rowData: any;

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/footerEnsayo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllFooterPendientes');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.rowData= res.json();
                                            this.gridApi.sizeColumnsToFit();
                                            //this.cargando=this.cargando-1;
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
    var tipo = "";

    selectedRows.forEach(function(selectedRow, index) {
      id   = selectedRow.id_footerEnsayo;
      tipo = selectedRow.tipo;
    });
    switch(tipo){
      case 'CILINDRO':
        //window.alert("El mike no se apura...");
        this.router.navigate(['tecnico/pendientes/dashboardCilindro/'+id]);
      break;
      case 'CUBO':
        window.alert("CUBO :: El mike no se apura...");
        //this.router.navigate(['tecnico/pendientes/dashboardCilindro/'+id]);
      break;
      case 'VIGA':
        window.alert("VIGA :: El mike no se apura...");
        //this.router.navigate(['tecnico/pendientes/dashboardCilindro/'+id]);
      break;
    }
  }


}
