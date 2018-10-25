//import { GridComponent } from '../grid/grid.component';
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Http, URLSearchParams} from '@angular/http';
import {
    FormGroup,
    FormControl,
} from '@angular/forms';

//FIN DE LOS IMPORTS

@Component({
  selector: 'app-vigaGenerico',
  templateUrl: './vigaGenerico.component.html',
  styleUrls: ['./vigaGenerico.component.scss','../../loadingArrows.css']
})
export class VigaGenericoComponent implements OnInit{

  @Input() id_Registro: any;
  @Output() cambiarCargando = new EventEmitter<any>();
  id_Footer:string;
  campo: "1"; //Esta variable es para seleccionar el campo que se insertara cuando pierda el foco.
  title = 'app';
  global: Global;
  rowSelection;
  columnDefs;
  hiddenA = false;
  hiddenB = false;
  hiddenC = false;
  hidden = false;
  locked =false;   

  formatoCCHForm: FormGroup;
        FormatoCCH = {
        idMuestra:      '',
        fechaColado:    '',
        fechaEnsayo:    '',
        edadEnsaye:     '',
        condiCurado:    '',
        apoyo:          '',
        fractura:       '',
        lijado:         '',
        cuero:          '',
        ancho1:         '',
        ancho2:         '',
        per1:           '',
        per2:           '',
        l1:             '',
        l2:             '',
        l3:             '',
        prom:           '',
        disApoyos:      '',
        disCarga:       '',
        cargaAplicada:  '',
        moduloRuptura:  '',
        defectos:       '',
        velocidad:      '',
        tiempo:         '',
        realizo:        ''
      }

 curado= [{"condicion":"Humedo", "id":"Humedo"},{"condicion":"Seco", "id":"Seco"},{"condicion":"Intemperie", "id":"Intemperie"}];
 apoyos= [{"tapoyo":"Lijado", "id":"1"},{"tapoyo":"Cuero", "id":"2"}];
 fracture= [{"frac":"Dentro del Claro", "id":"1"},{"frac":"Fuera del Claro", "id":"2"}];



  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
      
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    //El primer parametro es para recibir el numero de registro y el segundo el numero de formato.
    this.cambiarCargando.emit(+1)


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
      'idMuestra':        new FormControl( {value: this.FormatoCCH.idMuestra, disabled: true}),
      'fechaColado':      new FormControl( {value: this.FormatoCCH.fechaColado, disabled: true}),
      'fechaEnsayo':      new FormControl( {value: this.FormatoCCH.fechaEnsayo, disabled: true}),      
      'edadEnsaye':       new FormControl( {value: this.FormatoCCH.edadEnsaye, disabled: true}),
      'condiCurado':      new FormControl( {value: this.FormatoCCH.condiCurado,disabled: true}),
      'apoyo':            new FormControl( {value: this.FormatoCCH.apoyo, disabled: true}),
      'fractura':         new FormControl( {value: this.FormatoCCH.fractura, disabled: true}),
      'lijado':           new FormControl( {value: this.FormatoCCH.lijado, disabled: true}),
      'cuero':            new FormControl( {value: this.FormatoCCH.cuero, disabled: true}),
      'ancho1':           new FormControl( {value: this.FormatoCCH.ancho1, disabled: true}),
      'ancho2':           new FormControl( {value: this.FormatoCCH.ancho2, disabled: true}),
      'per1':             new FormControl( {value: this.FormatoCCH.per1, disabled: true}),
      'per2':             new FormControl( {value: this.FormatoCCH.per2, disabled: true}),
      'l1':               new FormControl( {value: this.FormatoCCH.l1, disabled: true}),   
      'l2':               new FormControl( {value: this.FormatoCCH.l2, disabled: true}),  
      'l3':               new FormControl( {value: this.FormatoCCH.l3, disabled: true}),
      'prom':             new FormControl( {value: this.FormatoCCH.prom, disabled: true}),     
      'disApoyos':        new FormControl( {value: this.FormatoCCH.disApoyos, disabled: true}),
      'disCarga':         new FormControl( {value: this.FormatoCCH.disCarga, disabled: true}),
      'cargaAplicada':    new FormControl( {value: this.FormatoCCH.cargaAplicada, disabled: true}),
      'moduloRuptura':    new FormControl( {value: this.FormatoCCH.moduloRuptura, disabled: true}),       
      'defectos':         new FormControl( {value: this.FormatoCCH.defectos, disabled: true}),   
      'velocidad':        new FormControl( {value: this.FormatoCCH.velocidad, disabled: true}),
      'tiempo':           new FormControl( {value: this.FormatoCCH.tiempo, disabled: true}),
      'realizo':          new FormControl( {value: this.FormatoCCH.realizo, disabled: true})  
    });
  }
  
   get idMuestra()       { return this.formatoCCHForm.get('idMuestra'); }
   get fechaColado()     { return this.formatoCCHForm.get('fechaColado'); }
   get fechaEnsayo()     { return this.formatoCCHForm.get('fechaEnsayo'); }
   get edadEnsaye()      { return this.formatoCCHForm.get('edadEnsaye'); }
   get condiCurado()     { return this.formatoCCHForm.get('condiCurado'); }
   get apoyo()           { return this.formatoCCHForm.get('apoyo'); }
   get fractura()        { return this.formatoCCHForm.get('fractura'); }
   get lijado()          { return this.formatoCCHForm.get('lijado'); }
   get cuero()           { return this.formatoCCHForm.get('cuero'); }
   get ancho1()          { return this.formatoCCHForm.get('ancho1'); }
   get ancho2()          { return this.formatoCCHForm.get('ancho2'); }
   get per1()            { return this.formatoCCHForm.get('per1'); }
   get per2()            { return this.formatoCCHForm.get('per2'); }
   get l1()              { return this.formatoCCHForm.get('l1'); }
   get l2()              { return this.formatoCCHForm.get('l2'); }
   get l3()              { return this.formatoCCHForm.get('l3'); }
   get prom()            { return this.formatoCCHForm.get('prom'); }
   get disApoyos()       { return this.formatoCCHForm.get('disApoyos'); }
   get disCarga()        { return this.formatoCCHForm.get('disCarga'); }
   get cargaAplicada()   { return this.formatoCCHForm.get('cargaAplicada'); }              
   get moduloRuptura()   { return this.formatoCCHForm.get('moduloRuptura'); }              
   get defectos()        { return this.formatoCCHForm.get('defectos'); }   
   get velocidad()       { return this.formatoCCHForm.get('velocidad'); }        
   get tiempo()          { return this.formatoCCHForm.get('tiempo'); }                               
   get realizo()         { return this.formatoCCHForm.get('realizo'); }                          
   
  submitted = false;

  onSubmit() { this.submitted = true; } 

    llenado(respuesta: any){
    this.cambiarCargando.emit(-1)

    console.log(respuesta);

    this.formatoCCHForm.patchValue({
     idMuestra:       respuesta.claveEspecimen,
     fechaColado:     respuesta.fechaColado,
     fechaEnsayo:     respuesta.fechaEnsayo,
     edadEnsaye:      respuesta.diasEnsayeFinal,
     condiCurado:     respuesta.condiciones,
     apoyo:           respuesta.apoyo,
     fractura:        respuesta.posFractura,
     lijado:          respuesta.lijado,
     cuero:           respuesta.cuero,
     ancho1:          respuesta.ancho1,
     ancho2:          respuesta.ancho2,
     per1:            respuesta.per1,
     per2:            respuesta.per2,
     l1:              respuesta.l1,
     l2:              respuesta.l2,
     l3:              respuesta.l3,
     prom:            respuesta.prom,
     disApoyos:       respuesta.disApoyo,
     disCarga:        respuesta.disCarga,
     cargaAplicada:   respuesta.carga,
     moduloRuptura:   respuesta.moduloRuptura,
     defectos:        respuesta.defectos,
     velocidad:       respuesta.velAplicacionExp,
     tiempo:          respuesta.tiempoDeCarga, 
     realizo:         respuesta.nombre 
   });
  }
  
}


