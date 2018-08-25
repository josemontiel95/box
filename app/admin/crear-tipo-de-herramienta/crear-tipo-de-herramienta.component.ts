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
  selector: 'app-crear-tipo-de-herramienta',
  templateUrl: './crear-tipo-de-herramienta.component.html',
  styleUrls: ['./crear-tipo-de-herramienta.component.scss']
})
export class CrearTipoHerramientasComponent implements OnInit {


  apiRoot: string = "http://lacocs.montielpalacios.com/usuario";
  global: Global;
  cargando= 1;

  constructor(private router: Router, private data: DataService, private http: Http) { }
  
  model = new Herramienta('','');

  herramientaForm: FormGroup;

    herramienta= {
      tipo: '',
    }
  
  crearTipoHerramienta(  )
  {
      this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/herramienta_tipo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertAdmin');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', "1001");

    formData.append('tipo', this.herramientaForm.value.tipo);
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
       this.router.navigate(['administrador/tipos-de-herramienta']);
     }
   }


  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=0;

   this.herramientaForm = new FormGroup({
  'tipo': new FormControl(  this.herramienta.tipo, Validators.required),
     });  

  }

    get tipo() { return this.herramientaForm.get('tipo'); }

   submitted = false;

   regresaUsuario(){
    this.router.navigate(['administrador/tipos-de-herramienta']);
  }

  onSubmit() { this.submitted = true; }



}




