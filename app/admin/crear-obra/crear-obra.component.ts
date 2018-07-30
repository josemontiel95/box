import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import * as moment from 'moment';
import { Obra }    from './Obra';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

  //Esto es un dummy, borralo despues.

@Component({
  selector: 'app-crear-obra',
  templateUrl: './crear-obra.component.html',
  styleUrls: ['./crear-obra.component.scss','../../loadingArrows.css']
})
export class CrearObraComponent implements OnInit
  {
  global: Global;
  constructor(private router: Router, 
              private data: DataService, 
              private http: Http) { }
 
    id_obra: string ;

    foto: string;

    submitted = false;
    hidden = false;
    cargando= 2;
    mis_con: Array<any>;
    mis_cli: Array<any>;

     obraForm: FormGroup;
 


   Obra = {
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

  crearMessage: string= "";
  crearMessageCargando: string= "";


    //inicio y llenados
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=2;
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

        this.obraForm = new FormGroup({
      'obra': new FormControl(this.Obra.obra, Validators.required), 
      'revenimiento': new FormControl(this.Obra.revenimiento, Validators.required), 
      'incertidumbre': new FormControl(this.Obra.incertidumbre,  Validators.required), 
      'prefijo': new FormControl(this.Obra.prefijo,  Validators.required), 
      'cliente_id': new FormControl(this.Obra.cliente_id,  Validators.required), 
      'id_concretera': new FormControl(this.Obra.id_concretera,  Validators.required), 
      'tipo': new FormControl(this.Obra.tipo,  Validators.required), 
      'descripcion': new FormControl(this.Obra.descripcion,  Validators.required), 
       'fechaDeCre': new FormControl(this.Obra.fechaDeCre,  Validators.required), 
        
                                        
                                      });


  }


  get obra() { return this.obraForm.get('obra'); }

  get revenimiento() { return this.obraForm.get('revenimiento'); }

  get incertidumbre() { return this.obraForm.get('incertidumbre'); }

  get prefijo() { return this.obraForm.get('prefijo'); }

  get cliente_id() { return this.obraForm.get('cliente_id'); }

  get id_concretera() { return this.obraForm.get('id_concretera'); }

  get tipo() { return this.obraForm.get('tipo'); }

  get descripcion() { return this.obraForm.get('descripcion'); }

  get fechaDeCre() { return this.obraForm.get('fechaDeCre'); }

  rolValidator(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==5 || repuesta.error==6){
      window.alert(repuesta.estatus);
    }
    else{
      
    }
  }

  labValidator(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==5 || repuesta.error==6){
      window.alert(repuesta.estatus);
    }
    else{
      
    }
  }

  llenaRoles(resp: any)
  {
    this.mis_con= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_con[_i]=resp[_i];
    }
    console.log(this.mis_con);
    this.cargando=this.cargando-1;
  }

  llenaClientes(resp: any)
  {
    this.mis_cli= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_cli[_i]=resp[_i];

    }
    console.log(this.mis_cli);
    this.cargando=this.cargando-1;
  }

  regresaObra(){
    this.router.navigate(['administrador/obras']);
  }

//insertar-foto


  onSubmit() { this.submitted = true; }


  crearObra(obra: string, revenimiento: string, incertidumbre : string, prefijo: string, cliente_id: string, tipo: string, descripcion: string, fechaDeCre: string, id_concretera:string )
  {
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/obra/post/endpoint.php`;
    let formData:FormData = new FormData();

    formData.append('function', 'insertAdmin');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', "1001");
    formData.append('obra', this.obraForm.value.obra);
    formData.append('revenimiento', this.obraForm.value.revenimiento);
    formData.append('incertidumbre', this.obraForm.value.incertidumbre);
    formData.append('prefijo', this.obraForm.value.prefijo);
    formData.append('cliente_id', this.obraForm.value.cliente_id);
    formData.append('concretera', this.obraForm.value.id_concretera);
    formData.append('tipo', this.obraForm.value.tipo);
    formData.append('descripcion', this.obraForm.value.descripcion);
    formData.append('fechaDeCreacion', this.obraForm.value.fechaDeCre);
    this.crearMessageCargando="Cargando...";
    this.http.post(url, formData).subscribe(res => this.diplay(res.json()) );
    

  }

  diplay(crearResp: CrearResp){
    
    if(crearResp.error==0){
      this.crearMessage="";
      this.crearMessageCargando=crearResp.estatus;
      console.log(crearResp);
      //setTimeout(()=>{ this.router.navigate(['administrador/insertar-foto/'+crearResp.id_obra])}, 1500);
       
    }else{
      this.crearMessageCargando="";
      switch (crearResp.error) {
        case 1:
          
          this.crearMessage=crearResp.estatus;
          window.alert(this.crearMessage);
          console.log(crearResp);
          let token: string;
          token= localStorage.getItem("token");
          let url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
          let search = new URLSearchParams();
          search.set('function', 'cerrarSesion');
          search.set('token', token);
          this.http.get(url, {search}).subscribe(res => {
                                                      console.log(res.json().estatus);
                                                      this.router.navigate(['login']); 
                                                    });
          break;
        case 2:
          this.crearMessage=crearResp.estatus;
          window.alert(this.crearMessage);
          break;
      }
      
    }
    this.cargando=this.cargando-1;
    this.router.navigate(['administrador/obras']);
  }


}