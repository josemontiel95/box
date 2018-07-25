import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.scss']
})
export class HerramientasComponent implements OnInit{
  title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
    {headerName: 'ID', field: 'id_herramienta' },
    {headerName: 'Tipo', field: 'tipo' },
    {headerName: 'Placas', field: 'placas' },
    {headerName: 'Condicion', field: 'condicion'},
    {headerName: 'Fecha de compra', field: 'fechaDeCompra' },
    {headerName: 'Editado en', field: 'lastEditedON'},
    {headerName: 'active', field: 'active' },
  ];
    this.rowSelection = "single";
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
  }

  rowData: any;

  crearHerramienta(){
    this.router.navigate(['administrador/herramientas/crear-herramientas']);
  }

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.rowData= res.json();
                                            this.gridApi.sizeColumnsToFit();
                                          });
  }

  onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var id = "";

    selectedRows.forEach(function(selectedRow, index) {
      id += selectedRow.id_herramienta;
      
    });
    this.router.navigate(['administrador/herramientas/herramienta-detail/'+id]);
  }

}
