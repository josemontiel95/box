import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../data.service";
import { Global } from "../interfaces/int.Global";
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent{
	title = 'app';
  apiRoot: string = "http://192.168.1.102/work/lacocs/Core/BackEnd/usuario";
  global: Global;
  private gridApi;
  private gridColumnApi;
  constructor( private http: Http,private data: DataService){}
	columnDefs = [
      {headerName: 'id_usuario', field: 'id_usuario' },
      {headerName: 'nombre', field: 'nombre' },
      {headerName: 'apellido', field: 'apellido'},
      {headerName: 'email', field: 'email' },
      {headerName: 'fechaDeNac', field: 'fechaDeNac' },
      {headerName: 'foto', field: 'foto'},
      {headerName: 'rol_usuario_id', field: 'rol_usuario_id' },
      {headerName: 'active', field: 'active' },

  ];

  rowData: any;

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);

    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.apiRoot}/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllUsuarios');
    search.set('token', this.global.token);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.rowData= res.json();
                                            this.gridApi.sizeColumnsToFit();
                                          });
  }

}
