import { Component ,OnInit,Output, EventEmitter} from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registrosrev-grid',
  templateUrl: './registrosrev-grid.component.html',
  styleUrls: ['./registrosrev-grid.component.css']
})
export class RegistrosRevGridComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  id_orden: string;
  id_formato: string;
  rowSelection;
  columnDefs;
  rowClassRules;
  noRowDataError;

  @Output() statusForm = new EventEmitter<any>();

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
    {headerName: 'FECHA DE COLADO', field: 'fecha' },
    {headerName: 'REVENIMIENTO OBTENIDO', field: 'revObtenido' },
    {headerName: 'REVENIMIENTO PROYECTO', field: 'revProyecto' },
    {headerName: 'NUMERO DE REMISI&Oacute;N', field: 'remisionNo' },

    {headerName: 'ESTATUS', field: 'status' }

      
    ];
    this.rowSelection = "single";

    this.rowClassRules = {
      "row-blue-warning": function(params) {
        var status = params.data.status;
        return status == 1;
      },
      "row-green-warning": function(params) {
        var status = params.data.status;
        return status > 1;
      }
    };
  }

  rowData: any;

  ngOnInit() {
      this.data.currentGlobal.subscribe(global => this.global = global);
      this.route.params.subscribe( params => {this.id_orden = params.id2; this.id_formato=params.id});
  }


  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    console.log("this.global.apiRoot"+this.global.apiRoot);
    console.log("this.global.token"+this.global.token);
    this.gridApi = params.api;
    let url = `${this.global.apiRoot}/formatoRegistroRev/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllRegistrosByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_formatoRegistroRev', this.id_formato);
    console.log(search);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.llenaTabla(res.json());
                                            this.gridApi.sizeColumnsToFit();
                                          });
  }

  llenaTabla(repuesta: any){
    console.log(repuesta)
    let isValid=true;
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else if(repuesta.error==5){
      this.rowData =[];
      this.noRowDataError="No has agregado registros a este formato";
      isValid=false;
    }else{
      this.rowData =repuesta;
      isValid=true;
      repuesta.forEach(function (value) {
        if(value.status == "0"){
           isValid = false;
        }
      });
    }
    this.statusForm.emit(isValid);
  }

   
 onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var id = "";

    selectedRows.forEach(function(selectedRow, index) {
      id += selectedRow.id_registrosRev;
      
    });
    this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/agregaRegistroRevenimiento/'+this.id_orden + '/' +this.id_formato +'/' +id]);
  }


}
