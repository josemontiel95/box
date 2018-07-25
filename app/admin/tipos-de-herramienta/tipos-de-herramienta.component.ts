import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipos-de-herramienta',
  templateUrl: './tipos-de-herramienta.component.html',
  styleUrls: ['./tipos-de-herramienta.component.scss','../../loadingArrows.css']
})
export class TiposDeHerramientaComponent implements OnInit{
  title = 'app';
  global: Global;
    private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  cargando= 1;

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
    {headerName: 'ID', field: 'id_herramienta_tipo' },
    {headerName: 'Tipo', field: 'tipo' },
    {headerName: 'Placas', field: 'createdON' },
    {headerName: 'Editado en', field: 'lastEditedON'},
    {headerName: 'active', field: 'active' },
  ];
    this.rowSelection = "single";
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=1;
  }

  rowData: any;

  crearTipoHerramienta(){
    this.router.navigate(['administrador/crear-tipo-de-herramienta']);
  }

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/herramienta_tipo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', '1001');
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.rowData= res.json();
                                            this.gridApi.sizeColumnsToFit();
                                            this.cargando=this.cargando-1;
                                          });
  }

  onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var id = "";

    selectedRows.forEach(function(selectedRow, index) {
      id += selectedRow.id_herramienta_tipo;
      
    });
    this.router.navigate(['administrador/tipo-de-herramienta-detail/'+id]);
  }

}
