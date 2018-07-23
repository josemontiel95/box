import { Component, OnInit } from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { LoginResp } from "../../interfaces/int.LoginResp";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import { Laboratorio }    from './laboratorio';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';


@Component({
  selector: 'app-laboratorio-detail',
  templateUrl: './laboratorio-detail.component.html',
  styleUrls: ['./laboratorio-detail.component.css','../../loadingArrows.css']
})
export class LaboratorioDetailComponent implements OnInit {

    id_laboratorio: string;
    laboratorio: string;
    estado: string;
    municipio: string;
    tipo: string;
    estatus: string;
    error: string;
    cargando= 1;
    active: any;
    submitted = false;
    hidden = false;
    mis_tipos: Array<any>;
    mis_lab: Array<any>;
    imgUrl = "";
    condi= [1,2,3,4,5,6,7,8,9,10];
    onSubmit() { this.submitted = true; }

    loginMessage: string= "";
    loginresp: LoginResp;
    global: Global;
    desBut=true;
    actBut=false;
    resppass= false;
    exitoCon = false;
    password1: string;
    npassword: string;
    id: string;
    model: Laboratorio= new Laboratorio("","","","","","","");
    
  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    
    this.cargando=1;

    let url = `${this.global.apiRoot}/laboratorio/get/endpoint.php`;
	  let search = new URLSearchParams();
	  search.set('function', 'getByIDAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    search.set('id_laboratorio', this.id);
	  this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );
  }



  switchAlerta(exitoCon: any){
    this.exitoCon = false;
  }

  regresaHerramientas(){
    this.router.navigate(['administrador/laboratorios']);
  }


  mostrar()
  {
    this.hidden=true;
  }
  ocultar()
  {
    this.hidden=false;


  }

  actualizarLaboratorio(laboratorio: string, estado: string, municipio: string)
  {
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/laboratorio/post/endpoint.php`;
    let formData:FormData = new FormData();
    //let search = new URLSearchParams();
    formData.append('function', 'upDateAdmin');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', '1001');
    //formData.append
    formData.append('id_laboratorio', this.id);
    formData.append('laboratorio', laboratorio);
    formData.append('estado', estado);
    formData.append('municipio', municipio);
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

    search.set('id_laboratorio', this.id);
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
    setTimeout(()=>{ this.model=respuesta;
                     this.active= this.model.active;
                     this.status(this.active);
                     this.cargando=this.cargando-1;
                     console.log("llenado this.cargando: "+this.cargando);
                     }, 100);  
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

  desactivarLaboratorio(){
     this.actBut= true;
     this.desBut= false;
     this.switchActive(0);
  }

   activarLaboratorio(){
     this.actBut = false;
     this.desBut = true;
     this.switchActive(1);
   }

   switchActive(active: number){
     let url = `${this.global.apiRoot}/laboratorio/post/endpoint.php`;
     let formData:FormData = new FormData();
      
      if(active == 0){
        formData.append('function', 'deactivate');
      }
      else{
       formData.append('function', 'activate');
      }
        formData.append('id_laboratorio', this.id);
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

}
