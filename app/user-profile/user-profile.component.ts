import { Component, OnInit } from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../data.service";
import { LoginResp } from "../interfaces/int.LoginResp";
import { Global } from "../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario }    from './Usuario';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    id_usuario: string;
    nombre: string;
    apellido: string;
    email: string;
    fechaDeNac: string;
    foto: string;
    rol_usuario_id: string;
    submitted = false;
    onSubmit() { this.submitted = true; }

  loginMessage: string= "";
  loginresp: LoginResp;
  global: Global;
  constructor(private router: Router, private http: Http, private data: DataService) { }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
	let search = new URLSearchParams();
	search.set('function', 'getIDByToken');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
	this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );
  }

  llenado(respuesta: any)
  {
    console.log(respuesta);
    this.model=respuesta;
    /*this.id_usuario= respuesta.id_usuario;
    this.nombre= respuesta.nombre;
    this.apellido= respuesta.apellido;
    this.email= respuesta.email;
    this.fechaDeNac= respuesta.fechaDeNac;
    this.foto= respuesta.foto;
    this.rol_usuario_id= respuesta.rol_usuario_id;*/


  }
  
  
   model = new Usuario(this.id_usuario,
                       this.email,
                       this.nombre,
                       this.apellido,
                       this.fechaDeNac,
                       this.foto,
                       this.rol_usuario_id);


}
