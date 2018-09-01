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
    foto: string;

    submitted = false;
    hidden = false;
    cargando= 2;
    mis_con: Array<any>;
    mis_cli: Array<any>;

    obraForm: FormGroup;

    Obra = {
     id_obra:             '',
     obra:                '',
     revenimiento:        '',
     incertidumbre:       '',
     prefijo:             '',
     id_cliente:          '',
     id_concretera:       '',
     tipo:                '',
     localizacion:        '',
     descripcion:         '',
     fechaDeCre:          '',
     telefono_residente:  '',
     nombre_residente:    '',
     correo_residente:    '', 
     cotizacion :          '',
     consecutivoProbeta :  '1',
     consecutivoDocumentos:'1'
   }

  cargandoMessage: string= "";
  actualizarMessageCargando: string= "";

  //inicio y llenados
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=2;
    let url = `${this.global.apiRoot}/concretera/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function',          'getForDroptdownAdmin');
    search.set('token',             this.global.token);
    search.set('rol_usuario_id',    this.global.rol);
    this.http.get(url, {search}).subscribe(res => {this.llenaRoles(res.json());
                                                 this.rolValidator(res.json());
                                                });

    url = `${this.global.apiRoot}/cliente/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function',          'getForDroptdownAdmin');
    search.set('token',             this.global.token);
    search.set('rol_usuario_id',    this.global.rol);
    this.http.get(url, {search}).subscribe(res => {this.llenaClientes(res.json());
                                                   this.labValidator(res.json());
                                                 });
    this.obraForm = new FormGroup({
      'id_obra':              new FormControl({ value:this.Obra.id_obra,           disabled: true }),         
      'obra':                 new FormControl({ value:this.Obra.obra,              disabled: this.hidden },  [Validators.required]), 
      'revenimiento':         new FormControl({ value:this.Obra.revenimiento,      disabled: this.hidden },  [Validators.required, Validators.pattern("^([0-9])*")]), 
      'incertidumbre':        new FormControl({ value:this.Obra.incertidumbre,     disabled: this.hidden },  [Validators.required, Validators.pattern("^([0-9])*")]), 
      'prefijo':              new FormControl({ value:this.Obra.prefijo,           disabled: this.hidden },  [Validators.required]), 
      'id_cliente':           new FormControl({ value:this.Obra.id_cliente,        disabled: this.hidden },  [Validators.required]), 
      'id_concretera':        new FormControl({ value:this.Obra.id_concretera,     disabled: this.hidden },  [Validators.required]), 
      'tipo':                 new FormControl({ value:this.Obra.tipo,              disabled: this.hidden },  [Validators.required]), 
      'localizacion':         new FormControl({ value:this.Obra.localizacion,      disabled: this.hidden },  [Validators.required]), 
      'descripcion':          new FormControl({ value:this.Obra.descripcion,       disabled: this.hidden },  [Validators.required]), 
      'fechaDeCre':           new FormControl({ value:this.Obra.fechaDeCre,        disabled: this.hidden },  [Validators.required]), 
      'telefono_residente':   new FormControl({ value:this.Obra.telefono_residente,disabled: this.hidden },  [Validators.required, Validators.pattern("^([0-9])*")]), 
      'nombre_residente':     new FormControl({ value:this.Obra.nombre_residente,  disabled: this.hidden },  [Validators.required]), 
      'cotizacion':           new FormControl({ value:this.Obra.cotizacion,        disabled: this.hidden },  [Validators.required]), 
      'consecutivoProbeta':   new FormControl({ value:this.Obra.consecutivoProbeta,disabled: true        },  [Validators.required, Validators.pattern("^([0-9])*")]), 
      'consecutivoDocumentos':new FormControl({ value:this.Obra.consecutivoDocumentos,disabled: true        },  [Validators.required, Validators.pattern("^([0-9])*")]), 
      'correo_residente':     new FormControl({ value:this.Obra.correo_residente,  disabled: this.hidden },  [Validators.required])   
    });
  }

  get id_obra()               { return this.obraForm.get('id_obra'); }
  get obra()                  { return this.obraForm.get('obra'); }
  get revenimiento()          { return this.obraForm.get('revenimiento'); }
  get incertidumbre()         { return this.obraForm.get('incertidumbre'); }
  get prefijo()               { return this.obraForm.get('prefijo'); }
  get id_cliente()            { return this.obraForm.get('id_cliente'); }
  get id_concretera()         { return this.obraForm.get('id_concretera'); }
  get tipo()                  { return this.obraForm.get('tipo'); }
  get descripcion()           { return this.obraForm.get('descripcion'); }
  get localizacion()          { return this.obraForm.get('localizacion'); }
  get fechaDeCre()            { return this.obraForm.get('fechaDeCre'); }
  get telefono_residente()    { return this.obraForm.get('telefono_residente'); }
  get cotizacion()            { return this.obraForm.get('cotizacion'); }
  get consecutivoProbeta()    { return this.obraForm.get('consecutivoProbeta'); }
  get consecutivoDocumentos() { return this.obraForm.get('consecutivoDocumentos'); }
  get nombre_residente()      { return this.obraForm.get('nombre_residente'); }
  get correo_residente()      { return this.obraForm.get('correo_residente'); }

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


  crearObra(){
    this.cargando=1;
    this.cargandoMessage="Guardando...";
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/obra/post/endpoint.php`;
    let formData:FormData = new FormData();

    formData.append('function',           'insertAdmin');
    formData.append('token',              this.global.token);
    formData.append('rol_usuario_id',     this.global.rol);
    
    formData.append('obra',               this.obraForm.value.obra);
    formData.append('prefijo',            this.obraForm.value.prefijo );
    formData.append('fechaDeCreacion',    this.obraForm.value.fechaDeCre);
    formData.append('descripcion',        this.obraForm.value.descripcion);
    formData.append('localizacion',       this.obraForm.value.localizacion);
    formData.append('cliente_id',         this.obraForm.value.id_cliente);
    formData.append('concretera',         this.obraForm.value.id_concretera);
    formData.append('tipo',               this.obraForm.value.tipo);
    formData.append('revenimiento',       this.obraForm.value.revenimiento  );
    formData.append('incertidumbre',        this.obraForm.value.incertidumbre );
    formData.append('telefono_residente',   this.obraForm.value.telefono_residente );
    formData.append('cotizacion',           this.obraForm.value.cotizacion );
    formData.append('consecutivoDocumentos',this.obraForm.getRawValue().consecutivoDocumentos );
    formData.append('consecutivoProbeta',   this.obraForm.getRawValue().consecutivoProbeta );
    formData.append('nombre_residente',     this.obraForm.value.nombre_residente );
    formData.append('correo_residente',     this.obraForm.value.correo_residente );
    this.cargandoMessage="Cargando...";
    this.http.post(url, formData).subscribe(res => this.diplay(res.json()) );
    

  }

  diplay(crearResp: CrearResp){
    this.cargando=this.cargando-1;
    if(crearResp.error==0){
      this.cargandoMessage="";
      this.actualizarMessageCargando=crearResp.estatus;
      console.log(crearResp);       
    }else{
      this.actualizarMessageCargando="";
      switch (crearResp.error) {
        case 1:
          
          this.cargandoMessage=crearResp.estatus;
          window.alert(this.cargandoMessage);
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
          this.cargandoMessage=crearResp.estatus;
          window.alert(this.cargandoMessage);
          break;
      }
      
    }
    setTimeout(()=>{ 
      this.router.navigate(['administrador/obras']);
    }, 1800);

  }


}