import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css','../../loadingArrows.css']
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
  cliente= "";
  active="";
  hidden=false;
  desBut=true;
  actBut=false;
  imgUrl="";
  cargando= 1;
  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
      {headerName: 'Ctrl', field: 'id_obra' },
      {headerName: 'Obra', field: 'obra' },
      {headerName: 'Fecha de Creacion', field: 'fechaDeCreacion' },
      {headerName: 'Nombre de Residente', field: 'nombre_residente' },
      {headerName: 'Concretera', field: 'concretera' },
      {headerName: 'Tipo', field: 'tipo' },
      {headerName: 'Cliente', field: 'nombre' },
      {headerName: 'Created', field: 'createdON' },
      {headerName: 'Last Edited', field: 'lastEditedON' },
      {headerName: 'Incertidumbre', field: 'incertidumbre' },
      {headerName: 'Active', field: 'active' },

    ];
    this.rowSelection = "single";
  }

  rowData: any;

  ngOnInit() {
    this.route.params.subscribe( params => this.id=params.id );
    this.cargando=1;
  }


  crearObra(){
    this.router.navigate(['jefeLaboratorio/obras/crear-obra']);
  }

  detalleObra(){ //Cambialo a detalleObra
    this.router.navigate(['jefeLaboratorio/obras/obra-detail/'+this.id]);
  }
  

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    console.log("this.global.apiRoot"+this.global.apiRoot);
    console.log("this.global.token"+this.global.token);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/obra/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.llenaTabla(res.json());
                                            this.llenadoValidator(res.json());
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
  }

  llenadoValidator(respuesta: any){
    console.log(respuesta)
    if(respuesta.error==1 || respuesta.error==2 || respuesta.error==3){
      window.alert(respuesta.estatus);
    }
    else{
     
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
     let url = `${this.global.apiRoot}/obra/post/endpoint.php`;
     let formData:FormData = new FormData();
      
      if(active == 0){
        formData.append('function', 'deactivate');
      }
      else{
        formData.append('function', 'activate');
      }
        formData.append('id_obra', this.id);
        formData.append('rol_usuario_id', this.global.rol);
        formData.append('token', this.global.token);
        this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                            });
   }

   respuestaSwitch(res: any){
     console.log(res);
     if(res.error!= 0){
       window.alert(res.estatus);
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
    var cliente = "";
    var active = "";

    selectedRows.forEach(function(selectedRow, index) {
      id += selectedRow.id_obra;
      nombre += selectedRow.obra;
      prefijo += selectedRow.prefijo;
      foto += selectedRow.foto;
      cliente += selectedRow.nombre;
      active += selectedRow.active;
    });
    this.displayShortDescription(id, nombre, prefijo, foto, cliente, active);
  }

  displayShortDescription(id: any, nombre: any, prefijo: any, foto: any, cliente: any, active: any){
    
    
    this.hidden=true;
    //activar 
    this.id=id;
    this.nombre=nombre;
    this.prefijo=prefijo;
    this.foto=foto;
    this.cliente=cliente;

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