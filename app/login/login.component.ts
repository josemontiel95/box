import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
/*Este import es para redireccionar iniciar sesion a Dashboard*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

  }

  login(user: string){
  	if(user=="admin"){
  		this.router.navigate(['administrador/']);

  	}else{
  		this.router.navigate(['administrativo/']);
  	}
  }

}
