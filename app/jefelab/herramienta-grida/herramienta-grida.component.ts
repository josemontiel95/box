import { Component, OnInit,  Output, EventEmitter,Input} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';


@Component({
  selector: 'app-herramienta-grida',
  templateUrl: './herramienta-grida.component.html',
  styleUrls: ['./herramienta-grida.component.css']
})
export class HerramientaGridAgregaComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  id: any;

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
    {headerName: 'ID', field: 'id_herramienta' },    
    {headerName: 'Tipo', field: 'tipo' },
    {headerName: 'Placas', field: 'placas' },
    {headerName: 'Condicion', field: 'condicion'},

      
    ];
    this.rowSelection = "multiple";
  }

  rowData: any;

  ngOnInit() {
        this.data.currentGlobal.subscribe(global => this.global = global);
        this.route.params.subscribe( params => this.id=params.id);

  }

 

  onGridReady(params) {
    this.route.params.subscribe( params => this.id=params.id);

    this.cargando(+1);
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllFromTipo');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('herramienta_tipo_id', this.idh);
    search.set('id_ordenDeTrabajo', this.id);
    
    console.log(search);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.llenaTabla(res.json());
                                            this.gridApi.sizeColumnsToFit();
                                          });
  }
    @Input( ) idh: any;

    @Output() agregaHerra = new EventEmitter<any>();
    @Output() cambiarCargando = new EventEmitter<any>();

  agregaHerr(ids: any) {
    this.agregaHerra.emit(ids);
    //this.id= h
    console.log(ids);
  }

  cargando(num){
    this.cambiarCargando.emit(num)
  }



  llenaTabla(repuesta: any){
    this.cargando(-1);

    console.log(repuesta)
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else{
      if(repuesta.registros == 0){
        this.rowData =[];
      }else{
        this.rowData =repuesta;
      }
    }
  }

   
 onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var id = []; //array
    var i =0 ;
    selectedRows.forEach(function(selectedRow, index) {
      id.push(selectedRow.id_herramienta);
      
    });
      this.agregaHerr(id);
  }


}
