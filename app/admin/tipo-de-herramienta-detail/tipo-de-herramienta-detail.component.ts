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
  selector: 'app-tipo-de-herramienta-detail',
  templateUrl: './tipo-de-herramienta-detail.component.html',
  styleUrls: ['./tipo-de-herramienta-detail.component.css','../../loadingArrows.css']
})
export class TipoHerramientaDetailComponent implements OnInit {

  
    cargando= 1;
    active: any;
    submitted = false;
    hidden = true;
    imgUrl = "";
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

    herramientaForm: FormGroup;
    herramienta= {

    id_herramienta_tipo: '',
    tipo: '',

    }

    model: Herramienta= new Herramienta("","","");
    
  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    
    this.cargando=1;

    let url = `${this.global.apiRoot}/herramienta_tipo/get/endpoint.php`;
	  let search = new URLSearchParams();
	  search.set('function', 'getByIDAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    search.set('id_herramienta_tipo', this.id);
	  this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );

     this.herramientaForm = new FormGroup({
      'id_herramienta_tipo': new FormControl( { value: this.herramienta.id_herramienta_tipo, disabled: this.hidden },  [Validators.required]), 
      'tipo': new FormControl({ value: this.herramienta.tipo, disabled: this.hidden },  [ Validators.required]),
     });   

  }


  get id_herramienta_tipo() { return this.herramientaForm.get('id_herramienta_tipo'); }

  get tipo() { return this.herramientaForm.get('tipo'); }


  switchAlerta(exitoCon: any){
    this.exitoCon = false;
  }

  regresaHerramientas(){
    this.router.navigate(['administrador/tipos-de-herramienta']);
  }



    mostrar()
  {
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.herramientaForm.controls).forEach((controlName) => {
        this.herramientaForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
  }


  actualizarHerramienta( )
  {
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/herramienta_tipo/post/endpoint.php`;
    let formData:FormData = new FormData();
    //let search = new URLSearchParams();
    formData.append('function', 'upDateAdmin');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', '1001');
    //formData.append
    formData.append('id_herramienta_tipo', this.id);
    formData.append('tipo',  this.herramientaForm.value.tipo);
    //post  formData
    this.http.post(url, formData).subscribe(res =>  {
                                              this.respuestaError(res.json());
                                            } );

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
      this.router.navigate(['administrador/tipos-de-herramienta']);
    }
  }


  llenado(respuesta: any){
    console.log(respuesta);
     this.herramientaForm.patchValue({
      id_herramienta_tipo: respuesta.id_herramienta_tipo,
      tipo: respuesta.tipo
      });

    setTimeout(()=>{ 
                     this.active= respuesta.active;
                     this.status(this.active);
                     this.cargando=this.cargando-1;
                     console.log("llenado this.cargando: "+this.cargando);
                     }, 0);  
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

   switchActive(active: number){
     let url = `${this.global.apiRoot}/herramienta_tipo/post/endpoint.php`;
     let formData:FormData = new FormData();
      
      if(active == 0){
        formData.append('function', 'deactivate');
      }
      else{
       formData.append('function', 'activate');
      }
        formData.append('id_herramienta_tipo', this.id);
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
