import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fehcas-app-grid',
  templateUrl: './fechasgrid.component.html',
  styleUrls: ['./fechasgrid.component.css']
})
export class FechasGridComponent implements OnInit  {
   title = 'app';
  global: Global;
  private gridApi;
  rowSelection;
  columnDefs;
  id;
    eventWraper= new Array();
  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
      {headerName: 'Dia', field: 'dia' },
      {headerName: 'Hora', field: 'hora' },
      {headerName: 'Mes', field: 'mes' },
      {headerName: 'A&ntilde;o', field: 'anio' },
    ];
    this.rowSelection = "single";
  }

  rowData: any;

  ngOnInit() {
    this.route.params.subscribe( params => this.id=params.id);
  }

@Input( ) idte: any;
@Output() cambiarCargando = new EventEmitter<any>();

onGridReady(params) {
  this.cambiarCargando.emit(+1);
  this.data.currentGlobal.subscribe(global => this.global = global);
 
    this.gridApi = params.api;
    let url = `${this.global.apiRoot}/Tecnicos_ordenDeTrabajo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllPasesLista');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_tecnicos_ordenDeTrabajo', this.idte);
    console.log(search);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.llenaTabla(res.json());
                                            this.gridApi.sizeColumnsToFit();
                                          });
  }

  llenaTabla(repuesta: any){
    this.cambiarCargando.emit(-1);
    console.log(repuesta)
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else{
      this.rowData =repuesta;
    }
  }

   
 onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var id = 22; //array

    selectedRows.forEach(function(selectedRow, index) {
      id += selectedRow.id_usuario;
    });
  }


}
