import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css']
})
export class ObrasComponent implements OnInit{
	title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  id= "";
  nombre= "";
  prefijo= "";
  foto= "";
  rol= "";
  active="";
  hidden=false;
  desBut=true;
  actBut=false;
  imgUrl="";

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
      {headerName: 'ID', field: 'id_obra' },
      {headerName: 'Nombre', field: 'obra' },
      {headerName: 'Prefijo', field: 'prefijo'},
      {headerName: 'Fecha de Creacion', field: 'fechaDeCreacion' },
      {headerName: 'Descripcion', field: 'descripcion' },
      {headerName: 'Cliente', field: 'cliente_id' },
      {headerName: 'Datos Obra', field: 'concretera_id' },
      {headerName: 'Tipo', field: 'tipo' },
      {headerName: 'Revenimiento', field: 'revenimiento' },
      {headerName: 'Incertidumbre', field: 'incertidumbre' },

    ];
    this.rowSelection = "single";
  }

  rowData: any;

  ngOnInit() {
    this.route.params.subscribe( params => this.id=params.id );
  }


  crearObra(){
    this.router.navigate(['administrador/crear-obra']);
  }

  detalleUsuario(){ //Cambialo a detalleObra
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


   onSelectionChanged(event: EventListenerObject) {
    var selectedRows = this.gridApi.getSelectedRows();
    var id = "";
    var nombre = "";
    var prefijo = "";
    var foto = "";
    var rol = "";
    var active = "";

    selectedRows.forEach(function(selectedRow, index) {
      id += selectedRow.id_usuario;
      nombre += selectedRow.nombre;
      prefijo += selectedRow.prefijo;
      foto += selectedRow.foto;
      rol += selectedRow.rol;
      active += selectedRow.active;
    });
    this.displayShortDescription(id, nombre, prefijo, foto, rol, active);
  }

  displayShortDescription(id: any, nombre: any, prefijo: any, foto: any, rol: any, active: any){
    

    this.hidden=true;
    //activar 
    this.id=id;
    this.nombre=nombre;
    this.prefijo=prefijo;
    this.foto=foto;
    this.rol=rol;

    if(this.foto== "null"){
      this.imgUrl="../assets/img/gabino.jpg";
    }else{
      this.imgUrl= this.global.assetsRoot+this.foto;
    }


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
