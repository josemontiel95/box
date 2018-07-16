import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../data.service";
import { LoginResp } from "../interfaces/int.LoginResp";
import { Global } from "../interfaces/int.Global";

import 'rxjs/Rx';
/*Este import es para redireccionar iniciar sesion a Dashboard*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginMessage: string= "";
  loginresp: LoginResp;
  global: Global;
  constructor(private router: Router, private http: Http, private data: DataService) { }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
  }

  login(user: string, password: string){
      let url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
      console.log(url);
      let search = new URLSearchParams();
      search.set('function', 'login');
      search.set('email', user);
      search.set('constrasena', password);
      this.http.get(url, {search}).subscribe(res => this.diplay(res.json()) );
    /*
    
    */
  }
  
  diplay(loginresp: LoginResp){
    if(loginresp.error==0){
      this.data.changeGlobal(new Global(loginresp.id_usuario,loginresp.token,"http://lacocs.montielpalacios.com/API", "http://lacocs.montielpalacios.com/"));
      this.router.navigate(['administrador/']);
    }else{
      this.loginMessage=loginresp.estatus;
    }
  }
}



