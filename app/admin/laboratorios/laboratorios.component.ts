import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-laboratorios',
  templateUrl: './laboratorios.component.html',
  styleUrls: ['./laboratorios.component.scss']
})
export class LaboratoriosComponent implements OnInit{
  title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
    {headerName: 'ID', field: 'id_laboratorio' },
    {headerName: 'Laboratorio', field: 'laboratorio' },
    {headerName: 'Estado', field: 'estado' },
    {headerName: 'Municipio', field: 'municipio'},
    {headerName: 'Creado en', field: 'createdON' },
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
    this.router.navigate(['administrador/crear-laboratorios']);
  }

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/laboratorio/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', '1001');
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
      id += selectedRow.id_laboratorio;
      
    });
    this.router.navigate(['administrador/laboratorio-detail/'+id]);
  }

}
