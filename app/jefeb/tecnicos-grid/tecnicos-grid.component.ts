import { Component, OnInit,  Output, EventEmitter} from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tecnicos-grid',
  templateUrl: './tecnicos-grid.component.html',
  styleUrls: ['./tecnicos-grid.component.css']
})
export class TecnicosGridComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  noRowDataError;
  rowSelection;
  columnDefs;
  id: string;
  iid: string;
  eventWraper= new Array();

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
      {headerName: 'ID', field: 'id_usuario'},
      {headerName: 'Tecnico.', field: 'nombre' },
      {headerName: '¿Paso lista?', field: 'estado' },
    ];
    this.rowSelection = "single";
  }

  rowData: any;

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
  }

  @Output() pasaLista = new EventEmitter<any>();
  @Output() cambiarCargando = new EventEmitter<any>();


  paseL() {
    console.log("paseL :: eventWraper: "+this.eventWraper);
    this.pasaLista.emit(this.eventWraper);
  }

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    this.cambiarCargando.emit(+1);
    let url = `${this.global.apiRoot}/Tecnicos_ordenDeTrabajo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getTecAsistencia');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ordenDeTrabajo', this.id);
    console.log(search);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log("getTecAsistencia:"+res.json());
                                            this.llenaTabla(res.json());
                                            this.gridApi.sizeColumnsToFit();
                                          });
  }

  llenaTabla(repuesta: any){
    console.log(repuesta)
    this.cambiarCargando.emit(-1);
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else if(repuesta.error==5){
      this.rowData =[];
      this.noRowDataError="No existen técnicos asignados a esta orden.";   
    }else{
      this.rowData =repuesta;   
    }
  }

   
  onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var estado = "";
    var id = "";
    selectedRows.forEach(function(selectedRow, index) {
      estado = selectedRow.estado;
      id = selectedRow.id_tecnicos_ordenDeTrabajo;
    });
    if (estado == "NO") {
      this.eventWraper.push({'estado' : false, 'id' : id});

      this.paseL();
      //this.paseL(this.iid);
    }
    else{
      this.eventWraper.push({'estado' : true, 'id' : id});
      this.paseL();
    }
  }
}
