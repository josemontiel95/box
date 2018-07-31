import { Component, OnInit } from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { LoginResp } from "../../interfaces/int.LoginResp";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import { Obra }    from './Obra';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

export class Password
{
  constructor(
    public password1: string, 
    public npassword: string, 

    ) {  }

}

@Component({
  selector: 'app-obra-detail',
  templateUrl: './obra-detail.component.html',
  styleUrls: ['./obra-detail.component.css','../../loadingArrows.css']
})
export class ObraDetailComponent implements OnInit {

    foto: string;
    obraForm: FormGroup;

    Obra = {
     id_obra:'',
     obra:'',
     revenimiento:'',
     incertidumbre:'',
     prefijo:'',
     cliente_id:'',
     id_concretera:'',
     tipo:'',
     descripcion:'',
     fechaDeCre:'' 
   }
    submitted = false;
    hidden = true;
    cargando= 3;
    imgUrl = "";
    mis_con: Array<any>;
    mis_cli: Array<any>;
    mis_concreterasActivas: Array<any>;
    mis_clientesActivos: Array<any>;
    estatus: string;
    onSubmit() { this.submitted = true; }

    loginMessage: string= "";
    loginresp: LoginResp;
    global: Global;
    
    
    id: string;
    
  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    this.cargando=3;
    let url = `${this.global.apiRoot}/concretera/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {this.llenaRoles(res.json());
                                                 this.rolValidator(res.json());
                                                });

     url = `${this.global.apiRoot}/cliente/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {this.llenaClientes(res.json());
                                                   this.labValidator(res.json());
                                                 });


    url = `${this.global.apiRoot}/obra/get/endpoint.php`;
	  search = new URLSearchParams();
	  search.set('function', 'getByIDAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_obra', this.id);
	this.http.get(url, {search}).subscribe(res => {this.llenado(res.json()); 
                                                 this.llenadoValidator(res.json());
                                               });
  this.obraForm = new FormGroup({
      'id_obra': new FormControl({ value:this.Obra.id_obra, disabled: this.hidden },  [Validators.required]),         
      'obra': new FormControl({ value:this.Obra.obra, disabled: this.hidden },  [Validators.required]), 
      'revenimiento': new FormControl( { value:this.Obra.revenimiento, disabled: this.hidden },  [Validators.required]), 
      'incertidumbre': new FormControl( { value:this.Obra.incertidumbre, disabled: this.hidden },  [Validators.required]), 
      'prefijo': new FormControl( { value:this.Obra.prefijo, disabled: this.hidden },  [Validators.required]), 
      'cliente_id': new FormControl( { value:this.Obra.cliente_id, disabled: this.hidden },  [Validators.required]), 
      'id_concretera': new FormControl( { value:this.Obra.id_concretera, disabled: this.hidden },  [Validators.required]), 
      'tipo': new FormControl( { value:this.Obra.tipo, disabled: this.hidden },  [Validators.required]), 
      'descripcion': new FormControl( { value:this.Obra.descripcion, disabled: this.hidden },  [Validators.required]), 
       'fechaDeCre': new FormControl( { value:this.Obra.fechaDeCre, disabled: this.hidden },  [Validators.required]), 
        
                                        
                                      });

  }


  get id_obra() { return this.obraForm.get('id_obra'); }

  get obra() { return this.obraForm.get('obra'); }

  get revenimiento() { return this.obraForm.get('revenimiento'); }

  get incertidumbre() { return this.obraForm.get('incertidumbre'); }

  get prefijo() { return this.obraForm.get('prefijo'); }

  get cliente_id() { return this.obraForm.get('cliente_id'); }

  get id_concretera() { return this.obraForm.get('id_concretera'); }

  get tipo() { return this.obraForm.get('tipo'); }

  get descripcion() { return this.obraForm.get('descripcion'); }

  get fechaDeCre() { return this.obraForm.get('fechaDeCre'); }

  llenadoValidator(respuesta: any){
    console.log(respuesta)
    if(respuesta.error==1 || respuesta.error==2 || respuesta.error==3){
      window.alert(respuesta.estatus);
    }
    else{
      
    }
  }

  rolValidator(respuesta: any){
    console.log(respuesta)
    if(respuesta.error==5 || respuesta.error==6){
      window.alert(respuesta.estatus);
    }
    else{
      
    }
  }

  labValidator(respuesta: any){
    console.log(respuesta)
    if(respuesta.error==5 || respuesta.error==6){
      window.alert(respuesta.estatus);
    }
    else{
      
    }
  }

  regresaObra(){
    this.router.navigate(['jefeLaboratorio/obras']);
  }


  

  llenaRoles(resp: any)
  {
    console.log(resp);
    this.mis_con= new Array(resp.length);
    var j=resp.length-1;
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_con[_i]=resp[j];
      j--;

    }
    this.cargando=this.cargando-1;
  }



  llenaClientes(resp: any)
  {
        console.log(resp);
    this.mis_cli= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_cli[_i]=resp[_i];

    }
    this.cargando=this.cargando-1;
  }

  mostrar()
  {
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.obraForm.controls).forEach((controlName) => {
        this.obraForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
  }


  actualizarObra(){
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/obra/post/endpoint.php`;
    let formData:FormData = new FormData();

    formData.append('function', 'upDateAdmin');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('id_obra', this.id);

    formData.append('obra', this.obraForm.value.obra);
    formData.append('prefijo', this.obraForm.value.prefijo);
    formData.append('fechaDeCreacion', this.obraForm.value.fechaDeCre);
    formData.append('descripcion', this.obraForm.value.descripcion);
    formData.append('cliente_id', this.obraForm.value.id_cliente);
    formData.append('concretera', this.obraForm.value.id_concretera);
    formData.append('tipo', this.obraForm.value.tipo);
    formData.append('revenimiento', this.obraForm.value.revenimiento);
    formData.append('incertidumbre', this.obraForm.value.incertidumbre);
    
    this.http.post(url, formData).subscribe(res => this.respuestaError(res.json()) );


  }


  respuestaError(resp: any){
    if(resp.error!=0)
    {
      window.alert(resp.estatus);
      location.reload();
    }
    else
    {
      location.reload();
    }
    console.log(resp);
  }


  llenado(respuesta: any)
  {
    console.log(respuesta);
    this.obraForm.patchValue({
      obra: respuesta.obra,
      prefijo: respuesta.prefijo,
      fechaDeCre: respuesta.fechaDeCre,
      descripcion: respuesta.descripcion,
      cliente_id: respuesta.cliente_id,
      id_concretera: respuesta.id_concretera,
      tipo: respuesta.tipo,
      revenimiento:respuesta.revenimiento,
      incertidumbre: respuesta.incertidumbre
    });

     if(respuesta.isConcreteraActive==0 ){
      this.addConcretera(respuesta.id_concretera,respuesta.concretera);
    }

    if(respuesta.isClienteActive==0)
    {
      this.addCliente(respuesta.id_cliente,respuesta.nombre);
    }

    console.log(respuesta.foto);
    if(respuesta.foto == "null"){
      this.imgUrl= "../assets/img/gabino.jpg";
    }
    else{
      this.imgUrl= this.global.assetsRoot+respuesta.foto;
    }
    this.cargando=this.cargando-1;
  }
  
  addConcretera(id_concretera: any,concretera: any){
    let aux= new Array(this.mis_con.length+1);

    let index=0;
    for (var _i = 0; _i < aux.length; _i++ ){
       if(_i < aux.length-1){
        aux[_i]=this.mis_con[_i];
      }else if(_i == aux.length-1){
        aux[_i]={'id_concretera':id_concretera,'concretera':"*Desactivado*"+concretera+"*Desactivado*"};
      }
    }
    this.mis_con= new Array(aux.length);
    for (var _i = 0; _i < aux.length; _i++ ){
      this.mis_con[_i]=aux[_i];
    }
  }

    addCliente(id_cliente: any,cliente: any){
    let aux= new Array(this.mis_cli.length+1);
    let index=0;
    for (var _i = 0; _i < aux.length; _i++ ){
       if(_i < aux.length-1){
        aux[_i]=this.mis_cli[_i];
      }else if(_i == aux.length-1){
        aux[_i]={'id_cliente':id_cliente,'nombre':"*Desactivado*"+cliente+"*Desactivado*"};
      }
    }
    this.mis_cli= new Array(aux.length);
    for (var _i = 0; _i < aux.length; _i++ ){
      this.mis_cli[_i]=aux[_i];
    }
  }
}
