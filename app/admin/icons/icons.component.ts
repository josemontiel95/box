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
export class IconsComponent implements OnInit{
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
  active="";
  hidden=false;
  desBut=true;
  actBut=false;

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
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

  ngOnInit() {
    this.route.params.subscribe( params => this.id=params.id );
  }


  crearUsuario(){
    this.router.navigate(['administrador/crear-usuario']);
  }

  detalleUsuario(){
    this.router.navigate(['administrador/user-detail/'+this.id]);
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

   desactivarUsuario(){
     this.actBut= true;
     this.desBut= false;
     this.switchActive(0);
  }

   activarUsuario(){
     this.actBut = false;
     this.desBut = true;
     this.switchActive(1);
   }

   switchActive(active: number){
     let url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
     let search = new URLSearchParams();
      
      if(active == 0){
        search.set('function', 'deactivate');
      }
      else{
        search.set('function', 'activate');
      }
        search.set('id_usuario', this.id);
        search.set('rol_usuario_id', "1001");
        search.set('token', this.global.token);
        this.http.get(url, {search}).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                            });
       
   }

   respuestaSwitch(res: any){
     console.log(res);
     if(res.error!= 0){
       window.alert("Intentalo otra vez");
       location.reload();
     }
     else{
       location.reload();
     }
   }


   onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    var id = "";
    var nombre = "";
    var apellido = "";
    var foto = "";
    var rol = "";
    var active = "";

    selectedRows.forEach(function(selectedRow, index) {
      id += selectedRow.id_usuario;
      nombre += selectedRow.nombre;
      apellido += selectedRow.apellido;
      foto += selectedRow.foto;
      rol += selectedRow.rol;
      active += selectedRow.active;
    });
    this.displayShortDescription(id, nombre, apellido, foto, rol, active);
  }

  displayShortDescription(id: any, nombre: any, apellido: any, foto: any, rol: any, active: any){
    

    this.hidden=true;
    //activar 
    this.id=id;
    this.nombre=nombre;
    this.apellido=apellido;
    this.foto=foto;
    this.rol=rol;


    if(active == 1)
    {
      this.desBut = true;
      this.actBut= false;
    }
    else{
      if (active == 0) {
        this.desBut = false;
        this.actBut= true;
      }
    }
  }




}
