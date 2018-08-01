import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
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
  selector: 'app-crear-llenaFormatoCCH',
  templateUrl: './crear-llenaFormatoCCH.component.html',
  styleUrls: ['./crear-llenaFormatoCCH.component.scss']
})
export class CrearLlenaFormatoCCHComponent implements OnInit {


  apiRoot: string = "http://lacocs.montielpalacios.com/usuario";
  global: Global;
  cargando= 1;
  mis_tipos: Array<any>;
  mis_lab: Array<any>;
  constructor(private router: Router, private data: DataService, private http: Http) { }
  
  
    creaCCHForm: FormGroup;
      cch = {
      cch_id: '',
      informe:'',
      especimen:'',
      cono:'',
      varilla:'',
      flexometro:'',
      termometro:'',
      latitud: '19.0437584',
      longitud: '-98.1996779' }

   espec= [{"especimen":"Cilindro", "id":"Cilindro"},{"especimen":"Cubo", "id":"Cubo"},{"especimen":"Vigas", "id":"Vigas"}];
    
  
  crearFormatoCCH()
  {
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('informeNo', this.creaCCHForm.value.informe);
    formData.append('ordenDeTrabajo_id', this.creaCCHForm.value.cch_id);  
    formData.append('tipo', this.creaCCHForm.value.especimen);
    formData.append('cono_id', this.creaCCHForm.value.cono);
    formData.append('varilla_id', this.creaCCHForm.value.varilla);
    formData.append('flexometro_id', this.creaCCHForm.value.flexometro);
    formData.append('termometro_id', this.creaCCHForm.value.termometro);
    formData.append('latitud ', this.creaCCHForm.value.longitud );
    formData.append('longitud ', this.creaCCHForm.value.latitud );
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


    let url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    let search = new URLSearchParams();
    
    search.set('function', 'getForDroptdownJefeBrigadaCono');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => this.llenaTipos(res.json()) );

    this.creaCCHForm = new FormGroup({
      'cch_id': new FormControl(this.cch.cch_id, Validators.required), 
      'especimen': new FormControl(this.cch.especimen,  Validators.required), 
      'informe': new FormControl( this.cch.informe )
      
          });
  }

   get cch_id() { return this.creaCCHForm.get('cch_id'); }

   get informe() { return this.creaCCHForm.get('informe'); }

   get especimen() { return this.creaCCHForm.get('especimen'); }

   
   get cono() { return this.creaCCHForm.get('cono'); }

   get varilla() { return this.creaCCHForm.get('varilla')}; 

   get flexometro() { return this.creaCCHForm.get('flexometro')};

   get termometro() { return this.creaCCHForm.get('termometro');}

   submitted = false;

   regresaUsuario(){
    this.router.navigate(['jefeLaboratorio/herramientas']);
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




