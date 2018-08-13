import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';


@Component({
  selector: 'app-herramienta-grida',
  templateUrl: './herramienta-grida.component.html',
  styleUrls: ['./herramienta-grida.component.css']
})
export class HerramientaGridAgregaComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  id: string;

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
    {headerName: 'ID', field: 'id_herramienta' },    
    {headerName: 'Tipo', field: 'tipo' },
    {headerName: 'Placas', field: 'placas' },
    {headerName: 'Condicion', field: 'condicion'},

      
    ];
    this.rowSelection = "single";
  }

  rowData: any;

  ngOnInit() {
        this.data.currentGlobal.subscribe(global => this.global = global);
        this.id= localStorage.getItem("herra");
  }


  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllFromTipo');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('herramienta_tipo_id', this.id);
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
      id += selectedRow.id_herramienta;
      
    });
      localStorage.setItem('herrasel',id );

  }


}
