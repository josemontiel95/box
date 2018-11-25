import { Component, OnInit} from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import {
    FormGroup,
    FormControl
} from '@angular/forms';

@Component({
  selector: 'terminados',
  templateUrl: './terminados.component.html',
  styleUrls: ['./terminados.component.css','../../loadingArrows.css']
})
export class TerminadosComponent implements OnInit{
	title = 'app';
  global: Global;
  private gridApi;
  rowSelection;
  columnDefs;
  id= "";
  nombre= "";
  prefijo= "";
  foto= "";
  cliente= "";
  active="";
  hidden=false;
  desBut=true;
  actBut=false;
  imgUrl="";
  cargando= 1;
  mis_tipos: Array<any>;
  formatosSeleccionados: Array<any>;
  status="1";



  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
      {headerName: 'RAZ&Oacute;N SOCIAL', field: 'razonSocial' },
      {headerName: 'COTIZACI&Oacute;N', field: 'cotizacion' },
      {headerName: 'Identificador', field: 'informeNo' },
      {headerName: 'Factura', field: 'factua' },
      {headerName: 'TIPO', field: 'tipoObra' },
      {headerName: 'F. Colado', field: 'fechaColado' },

    ];
    this.rowSelection = "multiple";
  }
  selectLote= false;
  rowData: any;

  ngOnInit() {
    this.route.params.subscribe( params => this.id=params.id );
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=1;
  }




  crearObra(){
    this.router.navigate(['administrador/obras/crear-obra']);
  }

  detalleObra(){ //Cambialo a detalleObra
    this.router.navigate(['administrador/obras/obra-detail/'+this.id]);
  }
  

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    console.log("this.global.apiRoot"+this.global.apiRoot);
    console.log("this.global.token"+this.global.token);
    this.gridApi = params.api;

    let url = `${this.global.apiRoot}/loteCorreos/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllAdministrativoFULL');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);

    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.llenaTabla(res.json());
                                            this.llenadoValidator(res.json());
                                            this.gridApi.sizeColumnsToFit();
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
    this.cargando=this.cargando-1;
  }
  
  llenadoValidator(respuesta: any){
    console.log(respuesta)
    if(respuesta.error==1 || respuesta.error==2 || respuesta.error==3){
      window.alert(respuesta.estatus);
    }
    else{
     
    }
  }


   menosDetalles(){
     this.hidden=false;
   }

   desactivarUsuario(){
     this.actBut= true;
     this.desBut= false;
     this.switchActive(0);
  }

   activarUsuario(){
     this.actBut = false;
     this.desBut = true;
     this.switchActive(1);
   }

   switchActive(active: number){
     let url = `${this.global.apiRoot}/obra/post/endpoint.php`;
     let formData:FormData = new FormData();
      
      if(active == 0){
        formData.append('function', 'deactivate');
      }
      else{
        formData.append('function', 'activate');
      }
        formData.append('id_obra', this.id);
        formData.append('rol_usuario_id', this.global.rol);
        formData.append('token', this.global.token);
        this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                            });
   }

   respuestaSwitch(res: any){
     console.log(res);
     if(res.error!= 0){
       window.alert(res.estatus);
       location.reload();
     }
     else{
       this.router.navigate(['administrativo/obras/dashboardLote/'+res.lote]);
     }
   }

   agregaLote(){
    this.selectLote=!this.selectLote;

  }

   onSelectionChanged(event: EventListenerObject) {
    var selectedRows = this.gridApi.getSelectedRows();
    var pdf = "";
    var link = "";

    selectedRows.forEach(function(selectedRow, index) {
      pdf = selectedRow.PDF;
      link = selectedRow.pdfFinal;
    });
    if(pdf == "No"){
      window.alert("No hay PDF generado");
    }else{
      //window.alert("Redireccionando");
      //this.router.navigate(selectedRows.link);
      window.open(link, "_blank");
    }
  }

}







