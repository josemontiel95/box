import { Component, OnInit} from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orden-trabajo',
  templateUrl: './orden-trabajo.component.html',
  styleUrls: ['./orden-trabajo.component.scss','../../loadingArrows.css']
})
export class OrdenTrabajoComponent implements OnInit{
  title = 'app';
  id_ordenDeTrabajo: string;
  obra: string;
  nombre_jefe_brigada_id: string;
  actividades: string;
  condicionesTrabajo: string;
  fechaInicio: string;
  fechaFin: string;
  desBut=true;
  actBut=false;
  hidden= false;
  active:string;
  foto= '';
  imgUrl="";
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  rowClassRules;
  columnDefs;
  activeColor;
  cargando= 1;
  id:string;

  statusPaso1=0;
  statusPaso2=1;
  statusPaso3=2;

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
      {headerName: 'ID Orden de trabajo', field: 'id_ordenDeTrabajo'},
      {headerName: 'Obra', field: 'obra' },    
      {headerName: 'Jefe de Brigada', field: 'nombre_jefe_brigada_id'},
      {headerName: 'Actividades', field: 'actividades' },    
      {headerName: 'Condiciones de trabajo', field: 'condicionesTrabajo' },
      {headerName: 'Fecha de Inicio', field: 'fechaInicio' },
      {headerName: 'Fecha de Fin', field: 'fechaFin' },
      {headerName: 'Activo', field: 'active' },
      {headerName: 'Estatus', field: 'odtStatus' },
    ];
    this.rowSelection = "single";
    this.rowClassRules = {
      "row-red-warning": function(params) {
        var activeColor = params.data.activeColor;
        return activeColor == 0;
      }
    };
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=0;
  }

  rowData: any;

  crearOrdenTrabajo(){
    this.router.navigate(['jefeLaboratorio/orden-trabajo/crear-orden-trabajo']);
  }

  detalleOrdenTrabajo(){
    this.router.navigate(['jefeLaboratorio/orden-trabajo/dashboard/'+this.id_ordenDeTrabajo]);
  }

  menosDetalles(){
    this.hidden=false;
  }
  cambiarCargando(num){
    this.cargando=this.cargando + num;
  }



  desactivarCliente(){
     this.actBut= true;
     this.desBut= false;
     this.switchActive(0);
  }

  activarCliente(){
    this.actBut = false;
    this.desBut = true;
    this.switchActive(1);
  }

  switchActive(active: number){
    let url = `${this.global.apiRoot}/ordenDeTrabajo/post/endpoint.php`;
    let formData:FormData = new FormData();
    if(active == 0){
      formData.append('function', 'deactivate');
    }else{
      formData.append('function', 'activate');
    }
    formData.append('id_ordenDeTrabajo', this.id_ordenDeTrabajo);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('token', this.global.token);
    this.http.post(url, formData).subscribe(res => {
      this.respuestaSwitch(res.json());
    });
  }

  respuestaSwitch(res: any){
    console.log(res);
    if(res.error!= 0){
      window.alert("Intentalo otra vez");
      location.reload();
    }
    else{
      location.reload();
    }
  }

}
