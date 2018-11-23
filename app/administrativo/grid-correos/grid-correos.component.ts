import { Component, OnInit} from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grid-correos',
  templateUrl: './grid-correos.component.html',
  styleUrls: ['./grid-correos.component.css']
})
export class GridCorreosComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  rowSelection;
  columnDefs;
  id_orden: string;
  id_footer: string;
  lote: string;
  rowClassRules;

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
      {headerName: 'Cliente', field: 'razonSocial' },
      {headerName: '# Cot.', field: 'cotizacion' },
      {headerName: 'Obra', field: 'obra' },
      {headerName: '# Informe', field: 'informeNo' },
      {headerName: 'Tipo', field: 'tipo' },
      {headerName: 'F. Colado', field: 'fechaColado' },
      {headerName: '# envios', field: 'sentToClientFinal' }
  ];

    this.rowSelection = "single";

    this.rowClassRules = {
      "row-blue-warning": function(params) {
        var corrLoteStatus = params.data.corrLoteStatus;
        var sentToClientFinal = params.data.sentToClientFinal;
        return corrLoteStatus == 0 && sentToClientFinal > 0;
      },
      "row-green-warning": function(params) {
        var corrLoteStatus = params.data.corrLoteStatus;
        return corrLoteStatus == 1;
      }
    };
  }

  ngOnInit() {
     this.data.currentGlobal.subscribe(global => this.global = global);
     this.route.params.subscribe( params => this.lote=params.id); 
  }


  rowData: any;

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;

    let url = `${this.global.apiRoot}/loteCorreos/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllFormatosByLote');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('lote', this.lote);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.rowData= res.json();
                                            this.gridApi.sizeColumnsToFit();
                                            //this.cargando=this.cargando-1;
                                          });
  }

  llenaTabla(repuesta: any){
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
    var pdf = "";
    var link = "";

    selectedRows.forEach(function(selectedRow, index) {
      pdf = selectedRow.PDF;
      link = selectedRow.link;
    });
    if(pdf == "No"){
      window.alert("No hay PDF generado");
    }else{
      //window.alert("Redireccionando");
      //this.router.navigate(selectedRows.link);
      window.open(link, "_blank");
    }
    //this.router.navigate(['tecnico/pendientes/dashboardCilindro/pruebaCilindro/'+this.id_footer +'/' +id]);
  }


}
