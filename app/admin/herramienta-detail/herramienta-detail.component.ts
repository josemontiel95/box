import { Component, OnInit } from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { LoginResp } from "../../interfaces/int.LoginResp";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import { Herramienta }    from './herramienta';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';


@Component({
  selector: 'app-herramienta-detail',
  templateUrl: './herramienta-detail.component.html',
  styleUrls: ['./herramienta-detail.component.css','../../loadingArrows.css']
})
export class HerramientaDetailComponent implements OnInit {

    id_herramienta: string;
    fechaDeCompra: string;
    placas: string;
    observaciones: string;
    condicion: string;
    tipo: string;
    estatus: string;
    error: string;
    cargando= 2;
    active: any;
    submitted = false;
    hidden = false;
    mis_tipos: Array<any>;
    mis_lab: Array<any>;
    imgUrl = "";
    condi= [{"condicion":"Muy Dañado", "id":"Muy Dañado"},{"condicion":"Dañado", "id":"Dañado"},{"condicion":"Regular", "id":"Regular"},{"condicion":"Buena", "id":"Buena"},{"condicion":"Muy Buena", "id":"Muy Buena"}];
    onSubmit() { this.submitted = true; }

    loginMessage: string= "";
    loginresp: LoginResp;
    global: Global;
    desBut=true;
    actBut=false;
    desHis=true;
    actHis=false;
    resppass= false;
    exitoCon = false;
    password1: string;
    npassword: string;
    id: string;
    model: Herramienta= new Herramienta("","","","","","","","", "", "");
    private gridApi;
    private gridColumnApi;
    rowSelection;
    columnDefs;
    
  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) {
    this.columnDefs = [
    {headerName: 'Orden de Servicio', field: 'ordenDeServicio_id' },
    {headerName: 'ID J.Brigada', field: 'jefe_brigada_id' },
    {headerName: 'Nombre J.Brigada', field: 'nombre_jefe_brigada' },
    {headerName: 'Condici&oacute;n', field: 'status' },
    {headerName: 'Fecha de Prestamo', field: 'fechaDePrestamo' },
    {headerName: 'Fecha de Devoluci&oacute;n', field: 'fechaDevolucion'},
    {headerName: 'Placa/Identificador', field: 'placas' },
    {headerName: 'Estado', field: 'estado' }
  ];
    this.rowSelection = "single";
   }

   rowData: any;

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    
    this.cargando=2;

    let url = `${this.global.apiRoot}/herramienta_tipo/get/endpoint.php`;
    let search = new URLSearchParams();
    
    search.set('function', 'getAllUser');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    this.http.get(url, {search}).subscribe(res => this.llenaTipos(res.json()) );

    url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
	  search = new URLSearchParams();
	  search.set('function', 'getByIDAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_herramienta', this.id);
	  this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );
  }



  switchAlerta(exitoCon: any){
    this.exitoCon = false;
  }

  regresaHerramientas(){
    this.router.navigate(['administrador/herramientas']);
  }


  llenaTipos(resp: any)
  {
    console.log(resp);
    this.mis_tipos= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_tipos[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
    console.log("llenaTipos this.cargando: "+this.cargando);
  }

  mostrar()
  {
    this.hidden=true;
  }
  ocultar()
  {
    this.hidden=false;
  }

  actualizarHerramienta(herramienta_tipo_id:string, placas: string, observaciones: string,
                          fechaDeCompra: string, condicion: string)
  {
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/herramienta/post/endpoint.php`;
    let formData:FormData = new FormData();
    //let search = new URLSearchParams();
    formData.append('function', 'upDateAdmin');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id',  this.global.rol);
    //formData.append
    formData.append('id_herramienta', this.id);
    formData.append('fechaDeCompra', fechaDeCompra);
    formData.append('placas', placas);
    formData.append('observaciones', observaciones);
    formData.append('condicion', condicion);
    formData.append('herramienta_tipo_id', herramienta_tipo_id);
    //post  formData
    this.http.post(url, formData).subscribe(res =>  {
                                              this.respuestaError(res.json());
                                            } );
    /*
    let url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'upDate');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");

    search.set('id_herramienta', this.id);
    search.set('fechaDeCompra', fechaDeCompra);
    search.set('placas', placas);
    search.set('condicion', condicion);
    search.set('herramienta_tipo_id', herramienta_tipo_id);
    this.http.get(url, {search}).subscribe(res => this.respuestaError(res.json()) );
    */
  }


  respuestaError(resp: any){
    console.log(resp);
    if(resp.error!=0)
    {
      window.alert(resp.estatus);
      location.reload();
    }
    else
    {
      location.reload();
    }
  }


  llenado(respuesta: any){
    console.log(respuesta);
    this.model=respuesta;
    if(respuesta.isHerramienta_tipoActive==0){
      this.addHerramientaTipo(respuesta.herramienta_tipo_id,respuesta.tipo);
    }
     
    setTimeout(()=>{ this.model=respuesta;
                     this.active= this.model.active;
                     this.status(this.active);
                     this.statusHistorial(this.active);
                     this.cargando=this.cargando-1;
                     console.log("llenado this.cargando: "+this.cargando);
                     }, 100);  
  }


  addHerramientaTipo(herramienta_tipo_id: any,tipo: any){
    let aux= new Array(this.mis_tipos.length+1);

    let index=0;
    for (var _i = 0; _i < aux.length; _i++ ){
       if(_i < aux.length-1){
        aux[_i]=this.mis_tipos[_i];
      }else if(_i == aux.length-1){
        aux[_i]={'id_herramienta_tipo':herramienta_tipo_id,'tipo':"*Desactivado*"+tipo+"*Desactivado*"};
      }
    }
    this.mis_tipos= new Array(aux.length);
    for (var _i = 0; _i < aux.length; _i++ ){
      this.mis_tipos[_i]=aux[_i];
    }
  }
 

  status(active: any)
  {
    if (active == 1) {
     this.actBut = false;
     this.desBut = true;
          }
     else
     {
     this.actBut= true;
     this.desBut= false;
     }     

  }

  statusHistorial(active: any)
  {
    if (active == 1) {
     this.actHis = false;
     this.desHis = true;
          }
     else
     {
     this.actHis= true;
     this.desHis= false;
     }     

  }

  desactivarHerramienta(){
     this.actBut= true;
     this.desBut= false;
     this.switchActive(0);
  }

   activarHerramienta(){
     this.actBut = false;
     this.desBut = true;
     this.switchActive(1);
   }

   desactivarHistorial(){
     this.actHis= true;
     this.desHis= false;
     //this.switchHistorial(0);
  }

   activarHistorial(){
     this.actHis = false;
     this.desHis = true;
     //this.switchHistorial(1);
   }

   switchHistorial(active: number){
     let url = `${this.global.apiRoot}/herramienta/post/endpoint.php`;
     let formData:FormData = new FormData();
      
      if(active == 0){
        formData.append('function', 'deactivate');
      }
      else{
       formData.append('function', 'activate');
      }
        formData.append('id_herramienta', this.id);
        formData.append('rol_usuario_id', this.global.rol);
        formData.append('token', this.global.token);
        this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                            });
       
   }

   switchActive(active: number){
     let url = `${this.global.apiRoot}/herramienta/post/endpoint.php`;
     let formData:FormData = new FormData();
      
      if(active == 0){
        formData.append('function', 'deactivate');
      }
      else{
       formData.append('function', 'activate');
      }
        formData.append('id_herramienta', this.id);
        formData.append('rol_usuario_id', this.global.rol);
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


   onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/herramienta_ordenDeServicio/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getByIDAdminHerra');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_herramienta', this.id);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.rowData= res.json();
                                            this.gridApi.sizeColumnsToFit();
                                          });
  }

}
