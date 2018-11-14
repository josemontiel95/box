//import { GridComponent } from '../grid/grid.component';
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
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
    FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-cuboGenerico',
  templateUrl: './cuboGenerico.component.html',
  styleUrls: ['./cuboGenerico.component.scss','../../loadingArrows.css']
})
export class CuboGenericoComponent implements OnInit{

  @Input() id_Registro: any;
  @Output() cambiarCargando = new EventEmitter<any>();
  id_Footer:string;
  campo: "1"; //Esta variable es para seleccionar el campo que se insertara cuando pierda el foco.
  title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  hiddenA = false;
  hiddenB = false;
  hiddenC = false;
  hidden = false;
  locked =false;
 
  
  formatoCCHForm: FormGroup;

    FormatoCCH = {
    fechaColado:     '',
    infoNo:          '',
    pesoKg:          '',
    clave:           '',
    edadEnsaye:      '',
    l1:              '',
    l2:              '',
    cargaKg:         '',
    area:            '',
    resCompresion:   '',
    velocidad:       '',
    tiempo:          '',
    falla:           ''
    }

  fallas= [{"falla":"Ninguna Falla", "id": 0},{"falla":1, "id": 1},{"falla":2, "id": 2},{"falla":3, "id": 3}];

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    
  }

  ngOnInit(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cambiarCargando.emit(+1);
   
    let url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    let search = new URLSearchParams();
    
    url = `${this.global.apiRoot}/ensayoCubo/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getRegistrosByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_ensayoCubo', this.id_Registro);
    this.http.get(url, {search}).subscribe(res => {
      this.llenado(res.json());
    });

    this.formatoCCHForm = new FormGroup({
      'fechaColado':      new FormControl( {value: this.FormatoCCH.fechaColado,    disabled: true}),
      'infoNo':           new FormControl( {value: this.FormatoCCH.infoNo,         disabled: true}),
      'clave':            new FormControl( {value: this.FormatoCCH.clave,          disabled: true}),
      'pesoKg':           new FormControl( {value: this.FormatoCCH.pesoKg,         disabled: true}),
      'edadEnsaye':       new FormControl( {value: this.FormatoCCH.edadEnsaye,     disabled: true}),
      'l1':               new FormControl( {value: this.FormatoCCH.l1,             disabled: true}),
      'l2':               new FormControl( {value: this.FormatoCCH.l2,             disabled: true}),
      'cargaKg':          new FormControl( {value: this.FormatoCCH.cargaKg,        disabled: true}),
      'area':             new FormControl( {value: this.FormatoCCH.area,           disabled: true}),
      'resCompresion':    new FormControl( {value: this.FormatoCCH.resCompresion,  disabled: true}),
      'velocidad':        new FormControl( {value: this.FormatoCCH.velocidad,      disabled: true}),
      'tiempo':           new FormControl( {value: this.FormatoCCH.tiempo,         disabled: true}),      
      'falla':            new FormControl( {value: this.FormatoCCH.falla,          disabled: true})
    });
  }

  get fechaColado()     { return this.formatoCCHForm.get('fechaColado'); }
  get infoNo()          { return this.formatoCCHForm.get('infoNo'); }
  get clave()           { return this.formatoCCHForm.get('clave'); }
  get pesoKg()          { return this.formatoCCHForm.get('pesoKg'); }
  get edadEnsaye()      { return this.formatoCCHForm.get('edadEnsaye'); }
  get l1()              { return this.formatoCCHForm.get('l1'); }
  get l2()              { return this.formatoCCHForm.get('l2'); }
  get cargaKg()         { return this.formatoCCHForm.get('cargaKg'); }
  get area()            { return this.formatoCCHForm.get('area'); }
  get resCompresion()   { return this.formatoCCHForm.get('resCompresion'); }
  get velocidad()       { return this.formatoCCHForm.get('velocidad'); }        
  get tiempo()          { return this.formatoCCHForm.get('tiempo'); }               
  get falla()           { return this.formatoCCHForm.get('falla'); }                          
   
  submitted = false;

  onSubmit() { this.submitted = true; } 

    llenado(respuesta: any){
    console.log(respuesta);
    this.cambiarCargando.emit(-1);
    this.formatoCCHForm.patchValue({
      fechaColado:      respuesta.fechaColado,
      infoNo:           respuesta.informeNo,
      clave:            respuesta.claveEspecimen,
      pesoKg:           respuesta.diasEnsayeFinal,
      edadEnsaye:       respuesta.diasEnsayeFinal,
      l1:               respuesta.l1,
      l2:               respuesta.l2,
      cargaKg:          respuesta.carga,
      area:             respuesta.area,
      resCompresion:    respuesta.resistencia,
      velocidad:        respuesta.velAplicacionExp,
      tiempo:           respuesta.tiempoDeCarga, 
      falla:            respuesta.falla,
    });  
  }
}