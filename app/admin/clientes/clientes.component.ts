import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css','../../loadingArrows.css']
})
export class ClientesComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  id= "";
  active="";
  hidden=false;
  desBut=true;
  actBut=false;
  imgUrl="";
  id_cliente= "";
  rfc= "";
  razonSocial= "";
  nombre= "";
  email= "";
  telefono= "";
  nombreContacto= "";
  direccion= "";
  telefonoDeContacto= "";
  cargando= 1;

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
      {headerName: 'ID', field: 'id_cliente'},
      {headerName: 'Razón social.', field: 'razonSocial' },
      {headerName: 'Nombre de la empresa.', field: 'nombre' },
      {headerName: 'Direccion', field: 'direccion'},
      {headerName: 'RFC', field: 'rfc' },      
      {headerName: 'Email', field: 'email' },
      {headerName: 'Nombre de contacto', field: 'nombreContacto' },
      {headerName: 'Telefono de Contacto', field: 'telefonoDeContacto' },
      {headerName: 'Telefono de la Empresa', field: 'telefono' },
      {headerName: 'Activo', field: 'active' },

      
    ];
    this.rowSelection = "single";
  }

  rowData: any;

  ngOnInit() {
    this.cargando=1;
  }

  
  crearCliente(){
    this.router.navigate(['administrador/crear-cliente']);
  }

  detalleCliente(){
    this.router.navigate(['administrador/cliente-detail/'+this.id_cliente]);
  }
  

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    console.log("this.global.apiRoot"+this.global.apiRoot);
    console.log("this.global.token"+this.global.token);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let url = `${this.global.apiRoot}/cliente/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
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
    this.cargando=this.cargando-1;
  }

   menosDetalles(){
     this.hidden=false;
   }

   desactivarCliente(){
     this.actBut= true;
     this.desBut= false;
     this.switchActive(0);
  }

   activarCliente(){
     this.actBut = false;
     this.desBut = true;
     this.switchActive(1);
   }

   switchActive(active: number){
     let url = `${this.global.apiRoot}/cliente/post/endpoint.php`;
     let formData:FormData = new FormData();
      
      if(active == 0){
        formData.append('function', 'deactivate');
      }
      else{
        formData.append('function', 'activate');
      }
        formData.append('id_cliente', this.id_cliente);
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
    var id_cliente = "";
    var razonSocial = "";
    var nombre = "";
    var direccion = "";
    var rfc ="";
    var email = "";
    var nombreContacto = "";
    var telefonoDeContacto = "";
    var telefono = "";
    var active = ""

    selectedRows.forEach(function(selectedRow, index) {
      id_cliente += selectedRow.id_cliente;
      razonSocial += selectedRow.razonSocial;
      nombre += selectedRow.nombre;
      direccion += selectedRow.direccion;
      rfc += selectedRow.rfc;
      email += selectedRow.email;
      nombreContacto += selectedRow.nombreContacto;
      telefonoDeContacto += selectedRow.telefonoDeContacto;
      telefono+= selectedRow.telefono;
       active += selectedRow.active;
    });
    this.displayShortDescription(id_cliente, razonSocial, nombre, direccion, email, nombreContacto, rfc, active);
  }

  displayShortDescription(id_cliente: any, razonSocial: any, nombre: any, direccion: any, email: any, nombreContacto: any, rfc: any, active: any)
  {
    

    this.hidden=true;
    //activar 
    this.id_cliente=id_cliente;
    this.nombre=nombre;
    this.razonSocial=razonSocial;
    this.rfc=rfc;
    this.direccion=direccion;
    this.nombreContacto=nombreContacto;
    
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
