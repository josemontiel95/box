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
  private rowSelection;
  private columnDefs;
  id= "";
  nombre= "";
  apellido= "";
  foto= "";
  rol= "";
  hidden=false;

  constructor( private http: Http, private router: Router, private data: DataService){
	  this.columnDefs = [
      {headerName: 'ID', field: 'id_usuario' },
      {headerName: 'Nombre', field: 'nombre' },
      {headerName: 'Apellido', field: 'apellido'},
      {headerName: 'Email', field: 'email' },
      {headerName: 'Fecha de Nacimiento', field: 'fechaDeNac' },
      {headerName: 'Foto', field: 'foto'},
      {headerName: 'Rol', field: 'rol' },
      {headerName: 'Activo', field: 'active' },

    ];
    this.rowSelection = "single";
  }

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

   menosDetalles(){
     this.hidden=false;
   }


   onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    var id = "";
    var nombre = "";
    var apellido = "";
    var foto = "";
    var rol = "";
    selectedRows.forEach(function(selectedRow, index) {
      id += selectedRow.id_usuario;
      nombre += selectedRow.nombre;
      apellido += selectedRow.apellido;
      foto += selectedRow.foto;
      rol += selectedRow.rol;
    });
    this.displayShortDescription(id, nombre, apellido, foto, rol);
  }

  displayShortDescription(id: any, nombre: any, apellido: any, foto: any, rol: any){
    this.hidden=true;
    //activar 
    this.id=id;
    this.nombre=nombre;
    this.apellido=apellido;
    this.foto=foto;
    this.rol=rol;
  }




}
