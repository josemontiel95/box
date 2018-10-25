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
  selector: 'app-cilindroGenerico',
  templateUrl: './cilindroGenerico.component.html',
  styleUrls: ['./cilindroGenerico.component.scss','../../loadingArrows.css']
})
export class CilindroGenericoComponent implements OnInit{

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
        diametro1:       '',
        diametro2:       '',
        altura1:         '',
        altura2:         '',
        cargaKg:         '',
        area:            '',
        resCompresion:   '',
        falla:           ''
      }


  fallas= [{"falla":1, "id": 1},{"falla":2, "id": 2},{"falla":3, "id": 3},{"falla":4, "id": 4},{"falla":5, "id": 5},{"falla":6, "id": 6}];

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
  
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    //El primer parametro es para recibir el numero de registro y el segundo el numero de formato.
    this.cambiarCargando.emit(+1);


    let url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    let search = new URLSearchParams();
    
    url = `${this.global.apiRoot}/ensayoViga/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getRegistrosByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_ensayoViga', this.id_Registro);
    this.http.get(url, {search}).subscribe(res => { 
                                                    this.llenado(res.json());
                                                  });


    this.formatoCCHForm = new FormGroup({
      'fechaColado':    new FormControl( {value: this.FormatoCCH.fechaColado,   disabled: true}),
      'infoNo':         new FormControl( {value: this.FormatoCCH.infoNo,        disabled: true}),
      'clave':          new FormControl( {value: this.FormatoCCH.clave,         disabled: true}),
      'pesoKg':         new FormControl( {value: this.FormatoCCH.pesoKg,        disabled: true}),
      'edadEnsaye':     new FormControl( {value: this.FormatoCCH.edadEnsaye,    disabled: true}),
      'diametro1':      new FormControl( {value: this.FormatoCCH.diametro1,     disabled: true}),
      'diametro2':      new FormControl( {value: this.FormatoCCH.diametro2,     disabled: true}),
      'altura1':        new FormControl( {value: this.FormatoCCH.altura1,       disabled: true}),
      'altura2':        new FormControl( {value: this.FormatoCCH.altura2,       disabled: true}),
      'cargaKg':        new FormControl( {value: this.FormatoCCH.cargaKg,       disabled: true}),
      'area':           new FormControl( {value: this.FormatoCCH.area,          disabled: true}),
      'resCompresion':  new FormControl( {value: this.FormatoCCH.resCompresion, disabled: true}),       
      'falla':          new FormControl( {value: this.FormatoCCH.falla,         disabled: true})});
  }
  
   get fechaColado()     { return this.formatoCCHForm.get('fechaColado'); }
   get infoNo()          { return this.formatoCCHForm.get('infoNo'); }
   get clave()           { return this.formatoCCHForm.get('clave'); }
   get pesoKg()          { return this.formatoCCHForm.get('pesoKg'); }
   get edadEnsaye()      { return this.formatoCCHForm.get('edadEnsaye'); }
   get diametro1()       { return this.formatoCCHForm.get('diametro1'); }
   get diametro2()       { return this.formatoCCHForm.get('diametro2'); }
   get altura1()         { return this.formatoCCHForm.get('altura1'); }
   get altura2()         { return this.formatoCCHForm.get('altura2'); }
   get cargaKg()         { return this.formatoCCHForm.get('cargaKg'); }
   get area()            { return this.formatoCCHForm.get('area'); } 
   get resCompresion()   { return this.formatoCCHForm.get('resCompresion'); }
   get falla()           { return this.formatoCCHForm.get('falla'); }                              
   
  submitted = false;

  onSubmit() { this.submitted = true; } 

    llenado(respuesta: any){
      this.cambiarCargando.emit(-1)
    
      this.formatoCCHForm.patchValue({
        fechaColado:     respuesta.fechaColado,
        infoNo:          respuesta.informeNo,
        clave:           respuesta.claveEspecimen,
        pesoKg:          respuesta.peso,
        edadEnsaye:      respuesta.diasEnsayeFinal,
        diametro1:       respuesta.d1,
        diametro2:       respuesta.d2,
        altura1:         respuesta.h1,
        altura2:         respuesta.h2,
        cargaKg:         respuesta.carga,
        area:            respuesta.area,
        resCompresion:   respuesta.resCompresion,
        falla:           respuesta.falla
      });
  }
}