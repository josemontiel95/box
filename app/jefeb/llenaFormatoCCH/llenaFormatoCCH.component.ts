import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { LoginResp } from "../../interfaces/int.LoginResp";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

export class FormatoCCH
{
  constructor(
    public id_cch: string,
    public obra: string,
    public localizacion: string,
    public empresa: string,
    public observaciones: string
    ) {  }

} 

@Component({
  selector: 'app-llenaFormatoCCH',
  templateUrl: './llenaFormatoCCH.component.html',
  styleUrls: ['./llenaFormatoCCH.component.scss','../../loadingArrows.css']
})
export class llenaFormatoCCHComponent implements OnInit{
  title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  cargando= 1;

   formatoCCHForm: FormGroup;

    model= new FormatoCCH(
    "", "", "", "", "");


      FormatoCCH = {
        id_cch: '',
        obra:'',
        localizacion: '',
        empresa:'',
        observaciones:''}

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
    {headerName: '# Orden', field: 'id_herramienta' },
    {headerName: '# Cotización', field: 'id_herramienta' },
    {headerName: 'Tipo', field: 'tipo' },
    {headerName: 'Placas', field: 'placas' },
    {headerName: 'Condicion', field: 'condicion'},
    {headerName: 'Fecha de compra', field: 'fechaDeCompra' },
    {headerName: 'Editado en', field: 'lastEditedON'},

  ];
    this.rowSelection = "single";
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    
    this.cargando=1;

    /*
    let url = `${this.global.apiRoot}/concretera/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getByIDAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_cch', this.id);
    this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );

    this.formatoCCHForm = new FormGroup({
      'id_cch': new FormControl( { value:this.FormatoCCH.id_cch, },  [Validators.required]), 
      'obra': new FormControl({ value: this.FormatoCCH.obra, disabled: this.hidden },  [ Validators.required]),
                                        
                                 }); */

  }

  rowData: any;

  crearOrdenTrabajo(){
    this.router.navigate(['jefeBrigada/orden-trabajo/crear-orden-trabajo']);
  }

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllJefaLab');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.rowData= res.json();
                                            this.gridApi.sizeColumnsToFit();
                                            this.cargando=this.cargando-1;
                                          });
  }

  onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var id = "";

    selectedRows.forEach(function(selectedRow, index) {
      id += selectedRow.id_herramienta;
      
    });
    this.router.navigate(['jefeBrigada/herramientas/herramienta-detail/'+id]);
  }

}
