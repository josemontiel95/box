import { Component, OnInit } from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { LoginResp } from "../../interfaces/int.LoginResp";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente }    from './cliente';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

export class Password
{
  constructor(
    public password1: string, 
    public npassword: string, 

    ) {  }

}

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.css']
})
export class ClienteDetailComponent implements OnInit {


    submitted = false;
    hidden = false;
    imgUrl = "";
    onSubmit() { this.submitted = true; }

    loginMessage: string= "";
    loginresp: LoginResp;
    global: Global;
    desBut=true;
    actBut=false;
    resppass= false;
    exitoCon = false;;
    id: string;
    

    model = new Cliente(
    "",
    "",    
    "",
    "",    
    "",
    "",
    "",
    "",
    "",
    "", "","");


    model2= new Password(
                         "",
                         ""
                        )


  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);


    let url = `${this.global.apiRoot}/cliente/get/endpoint.php`;
	  let search = new URLSearchParams();
	  search.set('function', 'getClienteByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    search.set('id_cliente', this.id);
	this.http.get(url, {search}).subscribe(res => {this.llenado(res.json()); 
                                                 this.llenadoValidator(res.json());
                                               });
  }




  llenadoValidator(respuesta: any){
    console.log(respuesta)
    if(respuesta.error==1 || respuesta.error==2 || respuesta.error==3){
      window.alert(respuesta.estatus);
    }
    else{
      
    }
  }

  rolValidator(respuesta: any){
    console.log(respuesta)
    if(respuesta.error==5 || respuesta.error==6){
      window.alert(respuesta.estatus);
    }
    else{
      
    }
  }

  labValidator(respuesta: any){
    console.log(respuesta)
    if(respuesta.error==5 || respuesta.error==6){
      window.alert(respuesta.estatus);
    }
    else{
      
    }
  }


  cambiarContrasena(){
     this.actBut= true;
     this.desBut= false;
     this.resppass = false;
     this.exitoCon = false;
  }

   guardarContrasena(password1: string, npassword: string){
     this.actBut = false;
     this.desBut = true;
     if(password1 == npassword && password1 != null)
     {
       this.postContrasena(password1);
       this.exitoCon = true;
       //setTimeout(this.switchAlerta(this.exitoCon), 8000);
     }
     else{
       this.resppass = true;
     }
     
   }

   postContrasena(password1: string){
     let url = `${this.global.apiRoot}/cliente/get/endpoint.php`;
     let search = new URLSearchParams();
     search.set('function', 'upDateContrasena');
     search.set('constrasena', password1);
     search.set('id_cliente', this.id);

        search.set('rol_usuario_id', "1001");
        search.set('token', this.global.token);
        this.http.get(url, {search}).subscribe(res => {
                                              res.json();
                                              this.upContValidator(res.json());
                                            });
   }

   upContValidator(respuesta: any){
    console.log(respuesta)
    if(respuesta.error==1 || respuesta.error==2 || respuesta.error==3){
      window.alert(respuesta.estatus);
    }
    else{
      
    }
  }

  switchAlerta(exitoCon: any){
    this.exitoCon = false;
  }

  regresaCliente(){
    this.router.navigate(['administrador/clientes']);
  }


  subirFoto(){
    this.router.navigate(['administrador/insertar-foto/'+this.id]);
  }

  mostrar()
  {
    this.hidden=true;
  }
  ocultar()
  {
    this.hidden=false;


  }


  actualizarcliente(id_cliente: string,
                rfc: string, razonSocial: string,
                    nombre: string, email:string,
                    telefono: string, nombreContacto: string,
                     direccion: string, telefonoDeContacto: string, )
  {
    let url = `${this.global.apiRoot}/cliente/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'upDate');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', '1001');


    formData.append('id_cliente', id_cliente);
    formData.append('rfc', rfc);
    formData.append('razonSocial', razonSocial);
    formData.append('email', email);
    formData.append('nombre', nombre);
    formData.append('telefono', telefono);
    formData.append('nombreContacto', nombreContacto);
    formData.append('direccion', direccion);
    formData.append('telefonoDeContacto', telefonoDeContacto);

    this.http.post(url, formData).subscribe(res => this.respuestaError(res.json()) );


  }


  respuestaError(resp: any){
    if(resp.error!=0)
    {
      window.alert(resp.estatus);
      location.reload();
    }
    else
    {
      location.reload();
    }
  }


  llenado(respuesta: any)
  {
    console.log(respuesta);
    this.model=respuesta;
    console.log(respuesta.foto);
    if(respuesta.foto == "null"){
      this.imgUrl= "../assets/img/gabino.jpg";
    }
    else{
      this.imgUrl= this.global.assetsRoot+respuesta.foto;
    }
  }
  


}
