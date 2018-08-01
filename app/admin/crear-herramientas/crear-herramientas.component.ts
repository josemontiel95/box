import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Herramienta }    from './Herramienta';
import * as moment from 'moment';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-crear-herramientas',
  templateUrl: './crear-herramientas.component.html',
  styleUrls: ['./crear-herramientas.component.scss']
})
export class CrearHerramientasComponent implements OnInit {


  apiRoot: string = "http://lacocs.montielpalacios.com/usuario";
  global: Global;
  cargando= 1;
  mis_tipos: Array<any>;
  mis_lab: Array<any>;
  constructor(private router: Router, private data: DataService, private http: Http) { }
  
      herramientaForm: FormGroup;
      herramienta = {
      herramienta_tipo_id: '',
      placas:'',
      condicion:'',
      fechaDeCompra:'',
      observaciones:'' }


  condi= [{"condicion":"Muy Dañado", "id":"Muy Dañado"},{"condicion":"Dañado", "id":"Dañado"},{"condicion":"Regular", "id":"Regular"},{"condicion":"Buena", "id":"Buena"},{"condicion":"Muy Buena", "id":"Muy Buena"}];
  
  crearHerramienta()
  {
      this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/herramienta/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertAdmin');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('placas', this.herramientaForm.value.placas);
    formData.append('herramienta_tipo_id', this.herramientaForm.value.herramienta_tipo_id);  
    formData.append('condicion', this.herramientaForm.value.condicion);
    formData.append('fechaDeCompra', this.herramientaForm.value.fechaDeCompra);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                            } );

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

 
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=2;


    let url = `${this.global.apiRoot}/herramienta_tipo/get/endpoint.php`;
    let search = new URLSearchParams();
    
    search.set('function', 'getAllUser');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => this.llenaTipos(res.json()) );

        this.herramientaForm = new FormGroup({
      'herramienta_tipo_id': new FormControl(this.herramienta.herramienta_tipo_id, Validators.required), 
      'condicion': new FormControl(this.herramienta.condicion,  Validators.required), 
      'observaciones': new FormControl(this.herramienta.fechaDeCompra),
      'placas': new FormControl( this.herramienta.placas ),
      'fechaDeCompra': new FormControl(this.herramienta.fechaDeCompra,  Validators.required),
      
          });
  }

  get herramienta_tipo_id() { return this.herramientaForm.get('herramienta_tipo_id'); }

  get placas() { return this.herramientaForm.get('placas'); }
   
  get observaciones() { return this.herramientaForm.get('observaciones'); }

  get condicion() { return this.herramientaForm.get('condicion'); }

  get fechaDeCompra() { return this.herramientaForm.get('fechaDeCompra'); }

   submitted = false;

   regresaUsuario(){
    this.router.navigate(['administrador/herramientas']);
  }

  onSubmit() { this.submitted = true; }

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


}




