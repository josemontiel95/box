import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
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

@Component({
  selector: 'obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css','../../loadingArrows.css']
})
export class ObrasComponent implements OnInit{
	title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
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
  tipoForm: FormGroup;
  mis_tipos: Array<any>;
  formatosSeleccionados: Array<any>;
  status="1";

  forma={
    formato_tipo_id:'0'
  };


  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
      {headerName: 'Ctrl', field: 'id_formatoCampo' },
      {headerName: 'No. Informe', field: 'informeNo' },
      {headerName: 'Tipo', field: 'tipo' },
      {headerName: 'No. Cotizaci&oacute;n', field: 'cotizacion' },
      {headerName: 'Cliente', field: 'razonSocial' },
      {headerName: 'Obra', field: 'obra' },

    ];
    this.rowSelection = "multiple";
  }
  selectLote= false;
  rowData: any;

  ngOnInit() {
    this.route.params.subscribe( params => this.id=params.id );
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=2;

    let url = `${this.global.apiRoot}/loteCorreos/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('status', this.status);
    this.http.get(url, {search}).subscribe(res => this.llenaLotes(res.json()) );

    this.tipoForm = new FormGroup({
      'lotes': new FormControl(  this.forma.formato_tipo_id)
    });
  }

   get lotes() { return this.tipoForm.get('lotes'); } 

  llenaLotes(resp: any){
    console.log(resp);
    this.mis_tipos= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_tipos[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
    console.log("llenaTipos this.cargando: "+this.cargando);
  }


  crearObra(){
    this.router.navigate(['administrador/obras/crear-obra']);
  }

  detalleObra(){ //Cambialo a detalleObra
    this.router.navigate(['administrador/obras/obra-detail/'+this.id]);
  }
  seleccionaLote(){
    if(this.tipoForm.value.lotes == -1){
      //window.alert("seleccionaLote :: IF : -1");
        if(window.confirm("¿Estas seguro de crear un nuevo lote de correos? Ya NO podrás eliminarlo despues.")){
          this.agregaFormatos();
        }else{
          return;
        }
    }else{
      this.agregaFormatos();
      //window.alert("seleccionaLote :: ELSE: "+this.tipoForm.value.lotes);
    }
  }

  agregaFormatos(){
    window.alert("POR EL MOMENTO EL FORMATO DE VIGAS NO DISPONIBLE. IGNORANDO ESTOS FORMATOS");
    let url = `${this.global.apiRoot}/loteCorreos/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'agregaFormatos');
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('token', this.global.token);
    formData.append('lote', this.tipoForm.value.lotes);
    formData.append('formatosSeleccionados', JSON.stringify(this.formatosSeleccionados));
    this.http.post(url, formData).subscribe(res => {
                                                    this.respuestaSwitch(res.json());
    });
  }

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    console.log("this.global.apiRoot"+this.global.apiRoot);
    console.log("this.global.token"+this.global.token);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/loteCorreos/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllAdministrativo');
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
    var id = []; //array
    selectedRows.forEach(function(selectedRow, index) {
      if(selectedRow.tipo == "VIGAS"){

      }else{
            id.push(selectedRow.id_formatoCampo);
      }
      //this.formatosSeleccionados.push(selectedRow.id_formatoCampo);
    });
    this.formatosSeleccionados = [];
    this.formatosSeleccionados = id;

    console.log(this.formatosSeleccionados);
  }

}







