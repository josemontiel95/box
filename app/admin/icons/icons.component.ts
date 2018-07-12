import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent{
	title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  constructor( private http: Http, private router: Router, private data: DataService){}
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


  crearUsuario(){
    this.router.navigate(['administrador/crear-usuario']);
  }

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    console.log("this.global.apiRoot"+this.global.apiRoot);
    console.log("this.global.token"+this.global.token);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
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
