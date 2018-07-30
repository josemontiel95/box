import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import * as moment from 'moment';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';
 


@Component({
  selector: 'app-crear-concretera',
  templateUrl: './crear-concretera.component.html',
  styleUrls: ['./crear-concretera.component.scss']
})
export class CrearConcreteraComponent implements OnInit {

  
  apiRoot: string = "http://lacocs.montielpalacios.com/usuario";
  global: Global;
  concreteraForm: FormGroup;


      Concretera = {
  
        concretera:'' }

  constructor(private router: Router, private data: DataService, private http: Http) { }
  
  
  crearConcretera(  )
  {
      this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/concretera/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertAdmin');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('concretera', this.concreteraForm.value.concretera );
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                            } );

  }

  get concretera() { return this.concreteraForm.get('concretera'); }

   respuestaSwitch(res: any){
     console.log(res);
     if(res.error!= 0){
       window.alert("Intentalo otra vez");
       location.reload();
     }
     else{
       this.router.navigate(['administrador/concretera']);
     }
   }



  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);

    
        this.concreteraForm = new FormGroup({
           'concretera': new FormControl( this.Concretera.concretera ,  [ Validators.required]),
                                        
                                 });
  }

   submitted = false;

   regresaConcretera(){
    this.router.navigate(['administrador/concretera']);
  }

  onSubmit() { this.submitted = true; }



}




