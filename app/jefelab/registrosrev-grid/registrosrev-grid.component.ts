import { Component ,OnInit, Output, EventEmitter} from '@angular/core';
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
  id_registro: string;
  id_footer: string;
  rowSelection;
  columnDefs;
  rowClassRules;
  isSelected = false;
  pdfFinal;
  statusEnsayo;


  /* Variables de estado de los botones */ 


  @Output() cambiarCargando = new EventEmitter<any>();
  @Output() statusForm = new EventEmitter<any>();

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
    {headerName: 'FECHA DE COLADO', field: 'fecha' },
    
    {headerName: 'ESTATUS', field: 'status' }

      
    ];
    this.rowSelection = "single";

    this.rowClassRules = {
      "row-blue-warning": function(params) {
        var status = params.data.status;
        return status == 2 || status == 4;
      },
      "row-green-warning": function(params) {
        var status = params.data.status;
        return status == 5;
      }
    };
  }

  rowData: any;

  ngOnInit() {
      this.data.currentGlobal.subscribe(global => this.global = global);
      this.route.params.subscribe( params => {this.id_orden = params.id2; this.id_formato=params.id; this.id_footer=params.id3;});
  }

  cargando(num){
    this.cambiarCargando=this.cargando + num;
  }

  onGridReady(params) {
    this.cargando(+1);
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
    this.cargando(-1);
    console.log(repuesta);
    let isValid=true;
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else if(repuesta.error==5){
      this.rowData =[];
      console.log("Error Contactar a Soporte");
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
    var status;
    this.isSelected = true;

    selectedRows.forEach(function(selectedRow, index) {
      id = selectedRow.id_registrosRev;
      status = selectedRow.status;
    });
    this.id_registro = id;

    if(status > 0){
      this.statusEnsayo = true;
    }else{
      this.statusEnsayo = false;
    }

  }

  onLoadRev(){
    if(this.isSelected){
      this.cargando(+1);
      this.router.navigate(['jefeLaboratorio/orden-trabajo/dashboard/agregaRegistroRevenimiento/'+this.id_orden + '/' +this.id_formato +'/' + this.id_registro]);      
    }else{
      window.alert("Selecciona un ensayo primero");
    }
  }


}
