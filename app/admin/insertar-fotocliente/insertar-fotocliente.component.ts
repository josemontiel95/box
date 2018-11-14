import { Component, OnInit } from '@angular/core';
import { DataService } from "../../data.service";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Observable} from 'rxjs/Rx';
import { Global } from "../../interfaces/int.Global";
import { HttpClient, HttpParams,HttpEventType }    from '@angular/common/http';

@Component({
  selector: 'app-insertar-fotocliente',
  templateUrl: './insertar-fotocliente.component.html',
  styleUrls: ['./insertar-fotocliente.component.scss']
})
export class InsertarFotoClienteComponent implements OnInit {
  global: Global;
  id: string;
  crearMessage: string= "";
  crearMessageCargando: string= "";
  value= 0;

  constructor(private router: Router, 
              private http: HttpClient, 
              private http2: Http, 
              private data: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( params => this.id=params.id );
  }

  fileToUpload: File = null; //Variable default para un archivo seleccionado.

    cancelar()
  {
    this.router.navigate(['administrador/usuarios']);
  }
  
  
  handleFileInput(files: FileList) {   
	 if(files.length > 0){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/cliente/post/endpoint.php`;
	 	this.fileToUpload = files[0];
	 	let formData:FormData = new FormData();
	 	formData.append('uploadFile', this.fileToUpload, this.fileToUpload.name);
    formData.append('function', 'upLoadFoto');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', '1001');
    formData.append('id_cliente', this.id);
	 	console.log(formData);
    let search = new HttpParams();
    search.set('function', 'upLoadFoto');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', '1001');
    search.set('id_cliente', this.id);
    this.crearMessageCargando="Cargando...";
		this.http.post(url, formData, { params: search, reportProgress: true, observe: 'events'})
			.subscribe(
				event =>{
                   if(event.type ===HttpEventType.UploadProgress){
                     this.crearMessageCargando='UploadProgress: ' + Math.round(event.loaded / event.total * 100) + "%";
                                   this.value =Math.round(event.loaded / event.total * 100);
                   }else if(event.type ===HttpEventType.Response){
                     this.doIt(event.body);
                   }
                },
                error =>{
                   console.log(error);
                }
               )
	 }

  }
  doIt(objeto : any){
    if(objeto.error==0){
      this.crearMessage=""
      this.crearMessageCargando=objeto.estatus;
      console.log(objeto);
      setTimeout(()=>{ this.router.navigate(['administrador/clientes'])}, 1500)
       
    }else{
      this.crearMessageCargando="";
      window.alert(objeto.estatus);
      switch (objeto.error) {
        case 1:
          
          this.crearMessage=objeto.estatus;
          window.alert(this.crearMessage);
          console.log(objeto);
          let token: string;
          token= localStorage.getItem("token");
          let url = `${this.global.apiRoot}/usuario/post/endpoint.php`;
          let search = new URLSearchParams();
          search.set('function', 'cerrarSesion');
          search.set('token', token);
          this.http2.get(url, {search}).subscribe(res => {
                                                      console.log(res.json().estatus);
                                                      this.router.navigate(['login']); 
                                                    });
          break;
        case 2:
          this.crearMessage=objeto.estatus;
          window.alert(this.crearMessage);
          break;
      }
      
    }
  }
} 


