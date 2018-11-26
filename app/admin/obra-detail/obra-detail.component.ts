import { Component, OnInit } from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { DataService } from "../../data.service";
import { LoginResp } from "../../interfaces/int.LoginResp";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import {
    FormGroup,
    FormControl,
    Validators
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
    incertidumbreCilindro: '',
    incertidumbreCubo: '',
    incertidumbreVigas: '',
    prefijo:'',
    id_cliente:'',
    id_concretera:'',
    tipo:'',
    localizacion:'',
    descripcion:'',
    fechaDeCre:'' ,
    telefono_residente:'',
    nombre_residente: '',
    correo_residente: '' ,
    cotizacion :          '',
    consecutivoProbetaCCH_VIGA :  '1',
    consecutivoProbetaCCH_CILINDRO :  '1',
    consecutivoProbetaCCH_CUBO :  '1',
    consecutivoDocumentosCCH_VIGA :  '1',
    consecutivoDocumentosCCH_CILINDRO :  '1',
    consecutivoDocumentosCCH_CUBO :  '1',
    consecutivoDocumentosCCH_REV:'1',
    correo_alterno:''
  }

  cargandoMessage: string= "";
  actualizarMessageCargando: string= "";

  submitted = false;
  hidden = true;
  cargando= 3;
  imgUrl = "";
  mis_con: Array<any>;
  mis_cli: Array<any>;
  mis_lab: Array<any>;
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
    search.set('function',           'getForDroptdownAdmin');
    search.set('token',              this.global.token);
    search.set('rol_usuario_id',     this.global.rol);
    this.http.get(url, {search}).subscribe(res => {this.llenaRoles(res.json());
                                                 this.rolValidator(res.json());
                                                });

     url = `${this.global.apiRoot}/cliente/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function',           'getForDroptdownAdmin');
    search.set('token',              this.global.token);
    search.set('rol_usuario_id',     this.global.rol);
    this.http.get(url, {search}).subscribe(res => {this.llenaClientes(res.json());
                                                   this.labValidator(res.json());
                                                 });


    url = `${this.global.apiRoot}/obra/get/endpoint.php`;
	  search = new URLSearchParams();
	  search.set('function',            'getByIDAdmin');
    search.set('token',               this.global.token);
    search.set('rol_usuario_id',      this.global.rol);
    search.set('id_obra',             this.id);
	  this.http.get(url, {search}).subscribe(res => {this.llenado(res.json()); 
      this.llenadoValidator(res.json());
    });

    this.obraForm = new FormGroup({
      'id_obra':                             new FormControl({ value:this.Obra.id_obra,                           disabled: true },         [Validators.required]),         
      'obra':                                new FormControl({ value:this.Obra.obra,                              disabled: this.hidden },  [Validators.required]), 
      'revenimiento':                        new FormControl({ value:this.Obra.revenimiento,                      disabled: this.hidden },  [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]), 
      'incertidumbre':                       new FormControl({ value:this.Obra.incertidumbre,                     disabled: this.hidden },  [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]), 
      'incertidumbreCilindro':               new FormControl({ value:this.Obra.incertidumbre,                     disabled: this.hidden },  [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]), 
      'incertidumbreCubo':                   new FormControl({ value:this.Obra.incertidumbre,                     disabled: this.hidden },  [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]), 
      'incertidumbreVigas':                  new FormControl({ value:this.Obra.incertidumbre,                     disabled: this.hidden },  [Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]), 
      'prefijo':                             new FormControl({ value:this.Obra.prefijo,                           disabled: this.hidden },  [Validators.required]), 
      'id_cliente':                          new FormControl({ value:this.Obra.id_cliente,                        disabled: this.hidden },  [Validators.required]), 
      'id_concretera':                       new FormControl({ value:this.Obra.id_concretera,                     disabled: this.hidden },  [Validators.required]), 
      'tipo':                                new FormControl({ value:this.Obra.tipo,                              disabled: this.hidden },  [Validators.required]), 
      'localizacion':                        new FormControl({ value:this.Obra.localizacion,                      disabled: this.hidden },  [Validators.required]), 
      'descripcion':                         new FormControl({ value:this.Obra.descripcion,                       disabled: this.hidden },  [Validators.required]), 
      'fechaDeCre':                          new FormControl({ value:this.Obra.fechaDeCre,                        disabled: this.hidden },  [Validators.required]), 
      'telefono_residente':                  new FormControl({ value:this.Obra.telefono_residente,                disabled: this.hidden },  [Validators.required, Validators.pattern("^([0-9])*")]), 
      'cotizacion':                          new FormControl({ value:this.Obra.cotizacion,                        disabled: this.hidden },  [Validators.required]), 
      'consecutivoProbetaCCH_VIGA':          new FormControl({ value:this.Obra.consecutivoProbetaCCH_VIGA,        disabled: true        },  [Validators.required, Validators.pattern("^([0-9])*")]), 
      'consecutivoProbetaCCH_CILINDRO':      new FormControl({ value:this.Obra.consecutivoProbetaCCH_CILINDRO,    disabled: true        },  [Validators.required, Validators.pattern("^([0-9])*")]), 
      'consecutivoProbetaCCH_CUBO':          new FormControl({ value:this.Obra.consecutivoProbetaCCH_CUBO,        disabled: true        },  [Validators.required, Validators.pattern("^([0-9])*")]), 
      'consecutivoDocumentosCCH_VIGA':       new FormControl({ value:this.Obra.consecutivoDocumentosCCH_VIGA,     disabled: true        },  [Validators.required, Validators.pattern("^([0-9])*")]), 
      'consecutivoDocumentosCCH_CILINDRO':   new FormControl({ value:this.Obra.consecutivoDocumentosCCH_CILINDRO, disabled: true        },  [Validators.required, Validators.pattern("^([0-9])*")]), 
      'consecutivoDocumentosCCH_CUBO':       new FormControl({ value:this.Obra.consecutivoDocumentosCCH_CUBO,     disabled: true        },  [Validators.required, Validators.pattern("^([0-9])*")]), 
      'consecutivoDocumentosCCH_REV':        new FormControl({ value:this.Obra.consecutivoDocumentosCCH_REV,      disabled: true        },  [Validators.required, Validators.pattern("^([0-9])*")]), 
      'nombre_residente':                    new FormControl({ value:this.Obra.nombre_residente,                  disabled: this.hidden },  [Validators.required]),  
      'correo_residente':                    new FormControl({ value:this.Obra.correo_residente,                  disabled: this.hidden },  [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]),
      'correo_alterno':                      new FormControl({ value:this.Obra.correo_alterno,                    disabled: this.hidden },  [Validators.required, Validators.pattern("[^ @]*@[^ @]*")])   

    });
  }

  get id_obra()                             { return this.obraForm.get('id_obra'); }
  get obra()                                { return this.obraForm.get('obra'); }
  get revenimiento()                        { return this.obraForm.get('revenimiento'); }
  get incertidumbre()                       { return this.obraForm.get('incertidumbre'); }
  get incertidumbreCilindro()               { return this.obraForm.get('incertidumbreCilindro'); }
  get incertidumbreCubo()                   { return this.obraForm.get('incertidumbreCubo'); }
  get incertidumbreVigas()                  { return this.obraForm.get('incertidumbreVigas'); }
  get prefijo()                             { return this.obraForm.get('prefijo'); }
  get id_cliente()                          { return this.obraForm.get('id_cliente'); }
  get id_concretera()                       { return this.obraForm.get('id_concretera'); }
  get tipo()                                { return this.obraForm.get('tipo'); }
  get descripcion()                         { return this.obraForm.get('descripcion'); }
  get localizacion()                        { return this.obraForm.get('localizacion'); }
  get fechaDeCre()                          { return this.obraForm.get('fechaDeCre'); }
  get cotizacion()                          { return this.obraForm.get('cotizacion'); }
  get consecutivoProbetaCCH_VIGA()          { return this.obraForm.get('consecutivoProbetaCCH_VIGA'); }
  get consecutivoProbetaCCH_CILINDRO()      { return this.obraForm.get('consecutivoProbetaCCH_CILINDRO'); }
  get consecutivoProbetaCCH_CUBO()          { return this.obraForm.get('consecutivoProbetaCCH_CUBO'); }
  get consecutivoDocumentosCCH_VIGA()       { return this.obraForm.get('consecutivoDocumentosCCH_VIGA'); }
  get consecutivoDocumentosCCH_CILINDRO()   { return this.obraForm.get('consecutivoDocumentosCCH_CILINDRO'); }
  get consecutivoDocumentosCCH_CUBO()       { return this.obraForm.get('consecutivoDocumentosCCH_CUBO'); }
  get consecutivoDocumentosCCH_REV()        { return this.obraForm.get('consecutivoDocumentosCCH_REV'); }
  get telefono_residente()                  { return this.obraForm.get('telefono_residente'); }
  get nombre_residente()                    { return this.obraForm.get('nombre_residente'); }
  get correo_residente()                    { return this.obraForm.get('correo_residente'); }
  get correo_alterno()                      { return this.obraForm.get('correo_alterno'); }


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
    this.router.navigate(['administrador/obras']);
  }

  llenaRoles(resp: any){
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

  llenaClientes(resp: any){
    console.log(resp);
    this.mis_cli= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_cli[_i]=resp[_i];

    }
    this.cargando=this.cargando-1;
  }

  mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.obraForm.controls).forEach((controlName) => {
        this.obraForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
    this.obraForm.controls['id_obra']['disable']();
  }


  actualizarObra(){
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/obra/post/endpoint.php`;
    let formData:FormData = new FormData();

    formData.append('function',           'upDateAdmin');
    formData.append('token',              this.global.token);
    formData.append('rol_usuario_id',     this.global.rol);
    
    formData.append('id_obra',                          this.id);
    formData.append('obra',                             this.obraForm.value.obra);
    formData.append('prefijo',                          this.obraForm.value.prefijo );
    formData.append('fechaDeCreacion',                  this.obraForm.value.fechaDeCre);
    formData.append('descripcion',                      this.obraForm.value.descripcion);
    formData.append('localizacion',                     this.obraForm.value.localizacion);
    formData.append('cliente_id',                       this.obraForm.value.id_cliente);
    formData.append('concretera',                       this.obraForm.value.id_concretera);
    formData.append('tipo',                             this.obraForm.value.tipo);
    formData.append('revenimiento',                     this.obraForm.value.revenimiento  );
    formData.append('incertidumbre',                    this.obraForm.value.incertidumbre );
    formData.append('incertidumbreCilindro',            this.obraForm.value.incertidumbreCilindro );
    formData.append('incertidumbreCubo',                this.obraForm.value.incertidumbreCubo );
    formData.append('incertidumbreVigas',               this.obraForm.value.incertidumbreVigas );
    formData.append('cotizacion',                       this.obraForm.value.cotizacion );
    formData.append('consecutivoProbetaCCH_VIGA',       this.obraForm.getRawValue().consecutivoProbetaCCH_VIGA );
    formData.append('consecutivoProbetaCCH_CILINDRO',   this.obraForm.getRawValue().consecutivoProbetaCCH_CILINDRO );
    formData.append('consecutivoProbetaCCH_CUBO',       this.obraForm.getRawValue().consecutivoProbetaCCH_CUBO );
    formData.append('consecutivoDocumentosCCH_VIGA',    this.obraForm.getRawValue().consecutivoDocumentosCCH_VIGA );
    formData.append('consecutivoDocumentosCCH_CILINDRO',this.obraForm.getRawValue().consecutivoDocumentosCCH_CILINDRO );
    formData.append('consecutivoDocumentosCCH_CUBO',    this.obraForm.getRawValue().consecutivoDocumentosCCH_CUBO );
    formData.append('consecutivoDocumentosCCH_REV',     this.obraForm.getRawValue().consecutivoDocumentosCCH_REV );
    formData.append('telefono_residente',               this.obraForm.value.telefono_residente );
    formData.append('nombre_residente',                 this.obraForm.value.nombre_residente );
    formData.append('correo_residente',                 this.obraForm.value.correo_residente );
    formData.append('correo_alterno',                   this.obraForm.value.correo_alterno );

    this.http.post(url, formData).subscribe(res => this.respuestaError(res.json()) );


  }


  respuestaError(resp: any){
    this.cargando=this.cargando-1;
    if(resp.error!=0){
      window.alert(resp.estatus);
      location.reload();
    }else{
      this.mostrar();
    }
    this.cargandoMessage="";
    this.actualizarMessageCargando=resp.estatus;
     setTimeout(()=>{ 
                     this.actualizarMessageCargando="";
                     }, 3500); 
  }


  llenado(respuesta: any)
  {
    console.log(respuesta);
    
    this.obraForm.patchValue({
      id_obra:                           respuesta.id_obra,
      obra:                              respuesta.obra,
      prefijo:                           respuesta.prefijo,
      fechaDeCre:                        respuesta.fechaDeCreacion,
      descripcion:                       respuesta.descripcion,
      localizacion:                      respuesta.localizacion,
      id_cliente:                        respuesta.id_cliente,
      id_concretera:                     respuesta.id_concretera,
      tipo:                              respuesta.tipo,
      revenimiento:                      respuesta.revenimiento,
      incertidumbre:                     respuesta.incertidumbre,
      incertidumbreCilindro:             respuesta.incertidumbreCilindro,
      incertidumbreCubo:                 respuesta.incertidumbreCubo,
      incertidumbreVigas:                respuesta.incertidumbreVigas,
      cotizacion:                        respuesta.cotizacion,
      consecutivoProbetaCCH_VIGA:        respuesta.consecutivoProbetaCCH_VIGA,
      consecutivoProbetaCCH_CILINDRO:    respuesta.consecutivoProbetaCCH_CILINDRO,
      consecutivoProbetaCCH_CUBO:        respuesta.consecutivoProbetaCCH_CUBO,
      consecutivoDocumentosCCH_VIGA:     respuesta.consecutivoDocumentosCCH_VIGA,
      consecutivoDocumentosCCH_CILINDRO: respuesta.consecutivoDocumentosCCH_CILINDRO,
      consecutivoDocumentosCCH_CUBO:     respuesta.consecutivoDocumentosCCH_CUBO,
      consecutivoDocumentosCCH_REV:      respuesta.consecutivoDocumentosCCH_REV,
      telefono_residente:                respuesta.telefono_residente,
      nombre_residente:                  respuesta.nombre_residente,
      correo_residente:                  respuesta.correo_residente,
      correo_alterno:                    respuesta.correo_alterno
    });

    if(respuesta.isConcreteraActive==0 ){
      this.addConcretera(respuesta.id_concretera,respuesta.concretera);
    }
    if(respuesta.isClienteActive==0){
      this.addCliente(respuesta.id_cliente,respuesta.nombre);
    }
    if(respuesta.foto == "null"){
      this.imgUrl= "../assets/img/gabino.jpg";
    }else{
      this.imgUrl= this.global.assetsRoot+respuesta.foto;
    }
    setTimeout(()=>{  
      this.cargando=this.cargando-1;
      console.log("llenado this.cargando: "+this.cargando);
    }, 0);
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

  llenaLaboratorio(resp: any){
        console.log(resp);
    this.mis_lab= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_lab[_i]=resp[_i];

    }
    this.cargando=this.cargando-1;
    console.log("llenaTipos this.cargando: "+this.cargando);
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
