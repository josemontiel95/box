import { Component, OnInit, Output, EventEmitter,Input} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'historico-filtrado-obras',
  templateUrl: './historico-filtrado-obras.component.html',
  styleUrls: ['./historico-filtrado-obras.component.css','../../loadingArrows.css']
})
export class HistoricoFiltradoObrasComponent implements OnInit{
  //Variables viejas
  nombre= "";
  apellido= "";
  foto= "";
  rol= "";
  active="";
  hidden=true;
  desBut=true;
  actBut=false;
  imgUrl="";
  opciones=false;
  opcionesMessage="Mostrar opciones";

  //Variables nuevas
  title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  id: any;
  historial=false;
  id_obra;
  rowClassRules;

  @Output() cargando = new EventEmitter<any>();

  cambiaCargando(cantidad: any) {
    this.cargando.emit(cantidad);
  }

  @Output() reloadMainGrid = new EventEmitter<any>();

  reloadMainGridFunc() {
    this.reloadMainGrid.emit();
  }

  @Output() idObra = new EventEmitter<any>();

  emitIdObra(id: any) {
    this.idObra.emit(id);
  }


  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
    {headerName: 'Ctrl', field: 'id_obra' },
      {headerName: 'Obra', field: 'obra' },
      {headerName: 'Fecha de Creacion', field: 'fechaDeCreacion' },
      {headerName: 'Nombre de Residente', field: 'nombre_residente' },
      {headerName: 'Concretera', field: 'concretera' },
      {headerName: 'Tipo', field: 'tipo' },
      {headerName: 'Cliente', field: 'nombre' },
      //{headerName: 'Laboratorio', field: 'laboratorio'},
      {headerName: 'Incertidumbre', field: 'incertidumbre' },
      {headerName: 'Active', field: 'active' },      
    ];
    this.rowSelection = "single";
    this.rowClassRules = {
      "row-green-warning": function(params) {
        var activeColor = params.data.estadoNo;
        return activeColor == 1;
      }
    };
  }

  rowData: any;

  ngOnInit() {
        this.data.currentGlobal.subscribe(global => this.global = global);

  }

 

  onGridReady(params) {
   this.cambiaCargando(+1);
   this.data.currentGlobal.subscribe(global => this.global = global);
    console.log("this.global.apiRoot"+this.global.apiRoot);
    console.log("this.global.token"+this.global.token);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/obra/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllJefaLab');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.llenaTabla(res.json());
                                            this.llenadoValidator(res.json());
                                            this.gridApi.sizeColumnsToFit();
                                          });
  }

  llenadoValidator(respuesta: any){
    console.log(respuesta)
    if(respuesta.error==1 || respuesta.error==2 || respuesta.error==3){
      window.alert(respuesta.estatus);
    }
    else{
     
    }
  }


  llenaTabla(repuesta: any){
    console.log(repuesta)
    this.cambiaCargando(-1);
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else{
      this.rowData =repuesta;
    }
  }
  recalcularEstados(){
    this.emitIdObra(this.id_obra);
  }
  
  respuestaRecalculaEdos(resp: any){
    this.cambiaCargando(-1);
    if(resp.error!=0){
      window.alert(resp.estatus);
      window.alert(resp.error);
      location.reload();
    }else{
      this.reloadMainGridFunc();
       //Emit evento que recarge el grid principal
    }
  }

   
  onSelectionChanged(event: EventListenerObject) {
    var selectedRows = this.gridApi.getSelectedRows();
    var id_obra = "";

    selectedRows.forEach(function(selectedRow, index) {
      id_obra         = selectedRow.id_obra;
    });
    this.id_obra = id_obra;
      
      console.log(id_obra);
  }
}
