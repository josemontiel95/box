import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-concretera',
  templateUrl: './concretera.component.html',
  styleUrls: ['./concretera.component.scss']
})
export class ConcreteraComponent implements OnInit{
  title = 'app';
  global: Global;
    private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
    {headerName: 'Concretera', field: 'concretera' },
    {headerName: 'Editado en', field: 'lastEditedON'},
    {headerName: 'Activo', field: 'active'},


  ];
    this.rowSelection = "single";
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
  }

  rowData: any;

  crearConcretera(){
    this.router.navigate(['jefeLaboratorio/crear-concretera']);
  }

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/concretera/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllJefaLab');
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
      id += selectedRow.id_concretera;
      
    });
    this.router.navigate(['jefeLaboratorio/concretera-detail/'+id]);
  }

}
