import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css','../../loadingArrows.css']
})
export class IconsComponent implements OnInit{
	title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  id= "";
  nombre= "";
  apellido= "";
  foto= "";
  rol= "";
  active="";
  hidden=false;
  desBut=true;
  actBut=false;
  imgUrl="";
  cargando= 1;
  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
      {headerName: 'Ctrl', field: 'id_usuario' },
      {headerName: 'Nombre', field: 'nombre' },
      {headerName: 'Apellido', field: 'apellido'},
      {headerName: 'Email', field: 'email' },
      {headerName: 'Fecha de Nacimiento', field: 'fechaDeNac' },
      //{headerName: 'Foto', field: 'foto'},
      {headerName: 'Rol', field: 'rol' },
      {headerName: 'Activo', field: 'active' },

    ];
    this.rowSelection = "single";
  }

  rowData: any;

  ngOnInit() {
    this.route.params.subscribe( params => this.id=params.id );
    this.cargando=1;
  }


  crearUsuario(){
    this.router.navigate(['administrador/usuarios/crear-usuario']);
  }

  detalleUsuario(){
    this.router.navigate(['administrador/usuarios/user-detail/'+this.id]);
  }
  

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    console.log("this.global.apiRoot"+this.global.apiRoot);
    console.log("this.global.token"+this.global.token);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllAdmin');
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
    this.cargando=this.cargando-1;
      console.log("llenaTipos this.cargando: "+this.cargando);
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
    let url = `${this.global.apiRoot}/usuario/post/endpoint.php`;
    let formData:FormData = new FormData();
      
      if(active == 0){
        formData.append('function', 'deactivate');
      }
      else{
        formData.append('function', 'activate');
      }
        formData.append('id_usuario', this.id);
        formData.append('rol_usuario_id', "1001");
        formData.append('token', this.global.token);

        this.http.post(url, formData).subscribe(res => {
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

    if(this.foto== "null"){
      this.imgUrl="../assets/img/gabino.jpg";
    }else{
      this.imgUrl= this.global.assetsRoot+this.foto;
    }


    if(active == "Si")
    {
      this.desBut = true;
      this.actBut= false;
    }
    else{
      if (active == "No") {
        this.desBut = false;
        this.actBut= true;
      }
    }
  }




}
