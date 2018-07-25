import { Component, OnInit } from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { LoginResp } from "../../interfaces/int.LoginResp";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

export class Concretera
{
  constructor(
    public id_concretera: string,
    public concretera: string,
    public active: string
    ) {  }

} 


@Component({
  selector: 'app-concretera-detail',
  templateUrl: './concretera-detail.component.html',
  styleUrls: ['./concretera-detail.component.css','../../loadingArrows.css']
})
export class ConcreteraDetailComponent implements OnInit {

    id_concretera: string;
    estatus: string;
    error: string;
    cargando= 1;
    active: any;
    submitted = false;
    hidden = false;
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

    model= new Concretera(
    "", "", "");

    
  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    
    this.cargando=1;

    let url = `${this.global.apiRoot}/concretera/get/endpoint.php`;
	  let search = new URLSearchParams();
	  search.set('function', 'getByIDAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_concretera', this.id);
	  this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );
  }



  switchAlerta(exitoCon: any){
    this.exitoCon = false;
  }

  regresaConcreteras(){
    this.router.navigate(['jefeLaboratorio/concretera']);
  }


  mostrar()
  {
    this.hidden=true;
  }

  ocultar()
  {
    this.hidden=false;


  }

  actualizarConcretera(concretera:string )
  {
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/concretera/post/endpoint.php`;
    let formData:FormData = new FormData();
    //let search = new URLSearchParams();
    formData.append('function', 'upDateAdmin');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    //formData.append
    formData.append('id_concretera', this.id);
    formData.append('concretera', concretera);

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

  desactivarConcretera(){
     this.actBut= true;
     this.desBut= false;
     this.switchActive(0);
  }

   activarConcretera(){
     this.actBut = false;
     this.desBut = true;
     this.switchActive(1);
   }

   switchActive(active: number){
     let url = `${this.global.apiRoot}/concretera/post/endpoint.php`;
     let formData:FormData = new FormData();
      
      if(active == 0){
        formData.append('function', 'deactivate');
      }
      else{
       formData.append('function', 'activate');
      }
        formData.append('id_concretera', this.id);
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

}
