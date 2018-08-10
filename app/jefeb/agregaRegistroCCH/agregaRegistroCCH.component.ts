import { GridComponent } from '../grid/grid.component';
import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

//FIN DE LOS IMPORTS

@Component({
  selector: 'app-agregaRegistroCCH',
  templateUrl: './agregaRegistroCCH.component.html',
  styleUrls: ['./agregaRegistroCCH.component.scss','../../loadingArrows.css']
})
export class agregaRegistroCCHComponent implements OnInit{

  id: string = "1001";
  id_registro: string;
  id_formato: string;
  campo: "0";
  title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  cargando= 1;
  hidden = true;
 
  
  formatoCCHForm: FormGroup;

        FormatoCCH = {
        cesp:'',
        fecha: '',
        informe: '',
        empresa:'',
        direccion: ''        
    }

    espec= [{"especimen":"CILINDRO", "id":"CILINDRO"},{"especimen":"CUBO", "id":"CUBO"},{"especimen":"VIGAS", "id":"VIGAS"}];



  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => {this.id_registro=params.id; this.id_formato=params.id2});
    this.cargando=1;

    let url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    let search = new URLSearchParams();
    
    url = `${this.global.apiRoot}/formatoCampo/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getInfoByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_formatoCampo', this.id_registro);
    this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) ); 


    this.formatoCCHForm = new FormGroup({
      'cesp': new FormControl( {value: this.FormatoCCH.cesp, disabled: this.hidden },  [Validators.required]),
      'fecha': new FormControl( {value: this.FormatoCCH.fecha, disabled: this.hidden },  [Validators.required]),
      'informe': new FormControl( {value: this.FormatoCCH.informe, disabled: this.hidden },  [Validators.required]),
      'empresa': new FormControl( {value: this.FormatoCCH.empresa, disabled: this.hidden },  [Validators.required]),
      'direccion': new FormControl( {value: this.FormatoCCH.direccion, disabled: this.hidden },  [Validators.required]),
          });
  }

   get cesp() { return this.formatoCCHForm.get('cesp'); }
  
   get fecha() { return this.formatoCCHForm.get('fecha'); }

   get informe() { return this.formatoCCHForm.get('informe'); }
   
   get empresa() { return this.formatoCCHForm.get('empresa'); }

   get direccion() { return this.formatoCCHForm.get('direccion'); }
              

    mostrar()
  {
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.formatoCCHForm.controls).forEach((controlName) => {
        this.formatoCCHForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
    
    
  }

  submitted = false;

  onSubmit() { this.submitted = true; }


  
  labValidator(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==5 || repuesta.error==6){
      window.alert(repuesta.estatus);
    }
    else{
      
    }
  }


    
    

  
    llenado(respuesta: any){
    console.log(respuesta);

    this.formatoCCHForm.patchValue({
     cesp: respuesta.cesp,
     fecha:  respuesta.fecha,
     informe:  respuesta.informeNo,
     empresa:  respuesta.razonSocial,
     direccion: respuesta.direccion,
    });

    
     
  }

  descartaCambios(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'deactivate');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('id_registrosCampo', this.id_registro);  
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaDescartaCambios(res.json());                 
                                            } );
  }

  actualizaRegistro(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', this.campo);  
    formData.append('informeNo', this.formatoCCHForm.value.informe);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );


  }

  respuestaDescartaCambios(res: any){ 
     console.log(res);
     if(res.error!= 0){
       window.alert(res.estatus);
       location.reload();
     }
     else{
          console.log(this.id_registro);
          this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaFormatoCCH/'+ this.id_formato]);        
     }
   }

  respuestaSwitch(res: any){ 
     console.log(res);
     if(res.error!= 0){
       window.alert("Intentalo otra vez");
       location.reload();
     }
     else{
          this.mostrar();  
          //this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaFormatoCCH/'+this.id_formato]);
       
     }
   }

  
  




}
