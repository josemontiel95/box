import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
/*Este import es para redireccionar iniciar sesion a Dashboard*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  apiRoot: string = "http://192.168.1.102/work/lacocs/Core/BackEnd/usuario";
  loginMessage: string= "";
  loginresp: LoginResp;
  constructor(private router: Router, private http: Http) { }

  ngOnInit() {

  }

  login(user: string, password: string){
  	  

      let url = `${this.apiRoot}/get/endpoint.php`;
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
      this.router.navigate(['administrador/']);
    }else{
      this.loginMessage=loginresp.estatus;
    }
  }
}
export interface LoginResp {
    id_usuario: number,
    nombre: string,
    token: string,
    estatus: string,
    error: number
}


