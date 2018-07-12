import { Component, OnInit } from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../data.service";
import { LoginResp } from "../interfaces/int.LoginResp";
import { Global } from "../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

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
	this.http.get(url, {search}).subscribe(res => console.log(res.json()) );
  }
  


}
