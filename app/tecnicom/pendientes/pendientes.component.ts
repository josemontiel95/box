import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.scss','../../loadingArrows.css']
})
export class PendientesComponent implements OnInit{
  title = 'app';
  id_Footer: string;
  obra: string;
  nombre_jefe_brigada_id: string;
  actividades: string;
  condicionesTrabajo: string;
  fechaInicio: string;
  fechaFin: string;
  foto= '';
  imgUrl="";
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  cargando= 1;
  id_registrosCampo: string;
  id = "";
  tipo = "";
  ruta = 0;

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
    {headerName: 'FECHA DE COLADO', field: 'fecha'},
    {headerName: 'INFORME N&Uacute;MERO', field: 'informeNo' },    
    {headerName: 'CLAVE', field: 'claveEspecimen' },    
    {headerName: 'EDAD DE ENSAYE EN D&Iacute;AS', field: 'diasEnsaye' },
    {headerName: 'TIPO', field: 'tipo' },
    {headerName: 'ESTADO', field: 'estado' }
  ];
    this.rowSelection = "single";
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id_registrosCampo=params.id);
    this.cargando=1;
  }

  rowData: any;

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/formatoCampo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getRegistrosForToday');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.rowData= res.json();
                                            this.gridApi.sizeColumnsToFit();
                                            this.cargando=this.cargando-1;
                                          });
  }

 onSelectionChanged(event: EventListenerObject) {
    var selectedRows = this.gridApi.getSelectedRows();
    selectedRows.forEach(function(selectedRow, index) {
      if(selectedRow.tipo == "CILINDRO"){
         this.id = selectedRow.id_registrosCampo;
         this.tipo = selectedRow.tipo;
         //window.alert(selectedRow.id_formato);
         this.ruta = 1;
         this.validaFooter();
      }else if(selectedRow.tipo == "CUBO"){
        this.id = selectedRow.id_formato;
        //window.alert(selectedRow.id_formato);
        this.ruta = 2;
      }else if(selectedRow.tipo == "VIGA"){
        this.id = selectedRow.id_formato;
        //window.alert(selectedRow.id_formato);
        this.ruta = 3;
      }
            
    });
    

   }

   validaFooter(){

    let url = `${this.global.apiRoot}/formatoRegistroRev/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getRegistrosByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_reg', this.id);
    search.set('tipo', this.tipo);
    this.http.get(url, {search}).subscribe(res => this.repuestaSwitch(res.json()) );

   }

   repuestaSwitch(res: any){
     let id_footer= "";
     if(res.existeFooter == 1){

       if(this.ruta == 1){
          id_footer = res.id_footer;
          window.alert("CILINDRO");
          this.router.navigate(['tecnico/pruebaCilindro/'+id_footer + '/'+this.id]);
       }else if(this.ruta == 2) {
            window.alert("CUBO");
            //this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaRevenimiento/'+this.id_orden +'/'+id]);
       }else if(this.ruta == 3) {
            //this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaRevenimiento/'+this.id_orden +'/'+id]);
       }
     }else{

       if(this.ruta == 1){
          id_footer = res.id_footer;
          window.alert("CILINDRO");
          this.router.navigate(['tecnico/llenaFooter/'+id_footer + '/'+this.id]);
       }else if(this.ruta == 2) {
            window.alert("CUBO");
            //this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaRevenimiento/'+this.id_orden +'/'+id]);
       }else if(this.ruta == 3) {
            //this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaRevenimiento/'+this.id_orden +'/'+id]);
       }

     }
     
   }

}
