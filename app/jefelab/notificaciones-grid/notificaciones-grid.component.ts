import { Component,OnInit,  Output, EventEmitter, Input} from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-notificaciones-grid',
  templateUrl: './notificaciones-grid.component.html',
  styleUrls: ['./notificaciones-grid.component.css']
})
export class NotificacionesGridComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  id_orden: string;
  rowSelection;
  columnDefs;
  rowClassRules;
  noRowDataError="";
  ordenTrabajo;
  id;
  id_Footer;
  selected;
  noRowData;
  tipoNo;
  @Output() cambiarCargando = new EventEmitter<any>();
  @Input() done: any;
  editMode = false;
  formVisible = false;
  createMode = false;
  locked = true;
  auGen = false;

  contactoForm: FormGroup; //se crea un formulario de tipo form group

  Contacto = {
    id_contacto_ordenDeTrabajo: '',
    ordenDeTrabajo_id: '',
    perzonalizedMail: '',
    nombre: '',
    correo: '',
    codigoPais: '',
    lada: '',
    telefono: '',
    autoGen: '',
    SMTPnotifyPreliminarJB: '',
    SMTPnotifyFinalAdministrativo: '',
    SMSnotifyPreliminarJB: '',
    SMSnnotifyFinalAdministrativo: '',
    active: '',
  };  

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
      {headerName: 'Correo', field: 'correo' },
      {headerName: 'Telefono', field: 'telefono' },
      {headerName: 'Nombre', field: 'nombre' },
      {headerName: 'Correos JB', field: 'SMTPnotifyPreliminarJB' },
      {headerName: 'Correos Finales', field: 'SMTPnotifyFinalAdministrativo' },
      {headerName: 'SMS JB', field: 'SMSnotifyPreliminarJB' },
      {headerName: 'SMS Finales', field: 'SMSnnotifyFinalAdministrativo' },
      {headerName: 'Activa', field: 'active' }
    ];
    this.rowSelection = "single";

    this.rowClassRules = {
      "row-blue-warning": function(params) {
        var status = params.data.status;
        return status == 2;
      },
      "row-green-warning": function(params) {
        var status = params.data.status;
        return status > 2;
      }
    };
  }

  rowData: any;

  ngOnInit() {
      this.data.currentGlobal.subscribe(global => this.global = global);
      this.route.params.subscribe( params => this.id_orden=params.id);

      this.contactoForm = new FormGroup({
        'id_contacto_ordenDeTrabajo':    new FormControl({value: this.Contacto.id_contacto_ordenDeTrabajo,           disabled: true }), 
        'ordenDeTrabajo_id':             new FormControl({value: this.Contacto.ordenDeTrabajo_id ,                   disabled: true },  [  Validators.required]),
        'perzonalizedMail':              new FormControl({value: this.Contacto.perzonalizedMail,                     disabled: true },  [  Validators.required]), 
        'nombre':                        new FormControl({value: this.Contacto.nombre,                               disabled: true },  [  Validators.required]),
        'correo':                        new FormControl({value: this.Contacto.correo,                               disabled: true },  [  Validators.required, Validators.pattern("[^ @]*@[^ @]*") ]), 
        'codigoPais':                    new FormControl({value: this.Contacto.codigoPais,                           disabled: true },  [  Validators.required,Validators.pattern("^([0-9])*$")]),
        'lada':                          new FormControl({value: this.Contacto.lada,                                 disabled: true },  [  Validators.required]), 
        'telefono':                      new FormControl({value: this.Contacto.telefono,                             disabled: true },  [  Validators.required]), 
        'autoGen':                       new FormControl({value: this.Contacto.autoGen,                              disabled: true },  [  Validators.required]), 
        'SMTPnotifyPreliminarJB':        new FormControl({value: this.Contacto.SMTPnotifyPreliminarJB,               disabled: true },  [  Validators.required]), 
        'SMTPnotifyFinalAdministrativo': new FormControl({value: this.Contacto.SMTPnotifyFinalAdministrativo,        disabled: true },  [  Validators.required]), 
        'SMSnotifyPreliminarJB':         new FormControl({value: this.Contacto.SMSnotifyPreliminarJB,                disabled: true },  [  Validators.required]), 
        'SMSnnotifyFinalAdministrativo': new FormControl({value: this.Contacto.SMSnnotifyFinalAdministrativo,        disabled: true },  [  Validators.required]), 
        'active':                        new FormControl({value: this.Contacto.active,                               disabled: true },  [  Validators.required])
      });
  }
   get id_contacto_ordenDeTrabajo()      { return this.contactoForm.get('id_contacto_ordenDeTrabajo'); }
   get ordenDeTrabajo_id()               { return this.contactoForm.get('ordenDeTrabajo_id'); }
   get perzonalizedMail()                { return this.contactoForm.get('perzonalizedMail'); }
   get nombre()                          { return this.contactoForm.get('nombre'); }
   get correo()                          { return this.contactoForm.get('correo'); }
   get codigoPais()                      { return this.contactoForm.get('codigoPais'); }
   get lada()                            { return this.contactoForm.get('lada'); }
   get telefono()                        { return this.contactoForm.get('telefono'); }
   get autoGen()                         { return this.contactoForm.get('autoGen'); }
   get SMTPnotifyPreliminarJB()          { return this.contactoForm.get('SMTPnotifyPreliminarJB'); } 
   get SMTPnotifyFinalAdministrativo()   { return this.contactoForm.get('SMTPnotifyFinalAdministrativo'); } 
   get SMSnotifyPreliminarJB()           { return this.contactoForm.get('SMSnotifyPreliminarJB'); } 
   get SMSnnotifyFinalAdministrativo()   { return this.contactoForm.get('SMSnnotifyFinalAdministrativo'); } 
   get active()                          { return this.contactoForm.get('active'); } 
   


  onGridReady(params) {
    this.cambiarCargando.emit(+1);
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    let url = `${this.global.apiRoot}/ordenDeTrabajo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllNotificaciones');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ordenDeTrabajo', this.id_orden);
    console.log(search);
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.llenaTabla(res.json());
      this.gridApi.sizeColumnsToFit();
    });
  }

  llenaTabla(repuesta: any){
    this.cambiarCargando.emit(-1);
    console.log("formatosGrid :: llenaTabla :: cambiarCargando(-1)");
    console.log(repuesta)
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else if(repuesta.error==5){
      this.rowData = [];
      this.noRowDataError = "No existen notificaciones para esta orden.";
      this.noRowData = true;
    }else{
      this.rowData =repuesta;
      this.noRowData = false;
    }
  }

   
 onSelectionChanged(event: EventListenerObject){
  var selectedRows = this.gridApi.getSelectedRows();
  var id;

  selectedRows.forEach(function(selectedRow, index) {
    id     = selectedRow.id_contacto_ordenDeTrabajo;
  });

  this.id =id;                           //ID Formato
  this.selected= true;   
  }
  selectOption(){ // on click Edit
    this.cambiarCargando.emit(+1);
    let url = `${this.global.apiRoot}/ordenDeTrabajo/get/endpoint.php`;
	  let search = new URLSearchParams();
	  search.set('function', 'getContactoById');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_contacto_ordenDeTrabajo', this.id);
	  this.http.get(url, {search}).subscribe(res =>{
      this.llenado(res.json());
      this.editMode= true; 
      this.formVisible = true;
    });
  }
  createModeOn(){
    this.selected= true;
    this.createMode= true; 
    this.formVisible = true;
    this.contactoForm.patchValue({
      id_contacto_ordenDeTrabajo:      "PENDIENTE",
      ordenDeTrabajo_id:               this.id_orden,
      perzonalizedMail:                "",
      nombre:                          "",
      correo:                          "",
      codigoPais:                      "",
      lada:                            "",
      telefono:                        "",
      autoGen:                         "0",
      SMTPnotifyPreliminarJB:          "",
      SMTPnotifyFinalAdministrativo:   "",
      SMSnotifyPreliminarJB:           "0",
      SMSnnotifyFinalAdministrativo:   "0",
      active:                          ""
     });   
    this.mostrar();
    this.contactoForm.controls["correo"]['enable']();
  }
  cancelEdit(){
    this.selected= false;   
    this.editMode= false; 
    this.formVisible = false;
    this.createMode= false; 
    this.relodMainGrid();
  }

  mostrar(){
    this.locked = !this.locked;
    const state = this.locked ? 'disable' : 'enable';
    Object.keys(this.contactoForm.controls).forEach((controlName) => {
        this.contactoForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
    this.contactoForm.controls["id_contacto_ordenDeTrabajo"]['disable']();
    this.contactoForm.controls["ordenDeTrabajo_id"]['disable']();
    this.contactoForm.controls["autoGen"]['disable']();
    this.contactoForm.controls["SMSnotifyPreliminarJB"]['disable']();
    this.contactoForm.controls["SMSnnotifyFinalAdministrativo"]['disable']();
    if(this.auGen){
      this.contactoForm.controls["correo"]['disable']();
    }
  }
  relodMainGrid(){
    this.cambiarCargando.emit(+1);
    let url = `${this.global.apiRoot}/ordenDeTrabajo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllNotificaciones');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ordenDeTrabajo', this.id_orden);
    console.log(search);
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.llenaTabla(res.json());
      this.gridApi.sizeColumnsToFit();
    });
  }

  llenado(respuesta: any){
    this.cambiarCargando.emit(-1);
    console.log(respuesta);
    this.contactoForm.patchValue({
     id_contacto_ordenDeTrabajo:      respuesta.id_contacto_ordenDeTrabajo,
     ordenDeTrabajo_id:               respuesta.ordenDeTrabajo_id,
     perzonalizedMail:                respuesta.perzonalizedMail,
     nombre:                          respuesta.nombre,
     correo:                          respuesta.correo,
     codigoPais:                      respuesta.codigoPais,
     lada:                            respuesta.lada,
     telefono:                        respuesta.telefono,
     autoGen:                         respuesta.autoGen,
     SMTPnotifyPreliminarJB:          respuesta.SMTPnotifyPreliminarJB,
     SMTPnotifyFinalAdministrativo:   respuesta.SMTPnotifyFinalAdministrativo,
     SMSnotifyPreliminarJB:           respuesta.SMSnotifyPreliminarJB,
     SMSnnotifyFinalAdministrativo:   respuesta.SMSnnotifyFinalAdministrativo,
     active:                          respuesta.active
    });   
    if(Number(this.contactoForm.getRawValue().autoGen) == 1){
      this.auGen = true;
    }else{
      this.auGen = false;
    }
  }

  createContacto(){
    //console.log("crearOrdenTrabajo :: "+this.ordenForm.value.obra_id);
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cambiarCargando.emit(+1);
    let url = `${this.global.apiRoot}/ordenDeTrabajo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertContactoJefaLabo');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('ordenDeTrabajo_id',                this.id_orden);  
    formData.append('perzonalizedMail',                 this.contactoForm.getRawValue().perzonalizedMail);
    formData.append('nombre',                           this.contactoForm.getRawValue().nombre);
    formData.append('correo',                           this.contactoForm.getRawValue().correo);  
    formData.append('codigoPais',                       this.contactoForm.getRawValue().codigoPais);
    formData.append('lada',                             this.contactoForm.getRawValue().lada);  
    formData.append('telefono',                         this.contactoForm.getRawValue().telefono);
    formData.append('autoGen',                          this.contactoForm.getRawValue().autoGen);
    formData.append('SMTPnotifyPreliminarJB',           this.contactoForm.getRawValue().SMTPnotifyPreliminarJB);
    formData.append('SMTPnotifyFinalAdministrativo',    this.contactoForm.getRawValue().SMTPnotifyFinalAdministrativo);
    formData.append('SMSnotifyPreliminarJB',            this.contactoForm.getRawValue().SMSnotifyPreliminarJB);
    formData.append('SMSnnotifyFinalAdministrativo',    this.contactoForm.getRawValue().SMSnnotifyFinalAdministrativo);
    formData.append('active',                           this.contactoForm.getRawValue().active);
    this.http.post(url, formData).subscribe(res => {
      this.respuestaSwitch(res.json());
    } );
  }
  respuestaSwitch(res: any){
    this.cambiarCargando.emit(-1);
    //console.log(res);
    if(res.error!= 0){
      window.alert("ERROR. Intentalo otra vez");
      this.cancelEdit();
    }
    else{
      window.alert("Exito.");
      this.cancelEdit();
    }
  }  

}
