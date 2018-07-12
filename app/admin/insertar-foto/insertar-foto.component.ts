import { Component, OnInit } from '@angular/core';
import { DataService } from "../../data.service";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Observable} from 'rxjs/Rx';
import { Global } from "../../interfaces/int.Global";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-insertar-foto',
  templateUrl: './insertar-foto.component.html',
  styleUrls: ['./insertar-foto.component.scss']
})
export class InsertarFotoComponent implements OnInit {

  global: Global;

  constructor(private router: Router, 
              private http: Http, 
              private data: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( params => console.log(params.id) );
  }

  fileToUpload: File = null; //Variable default para un archivo seleccionado.

  handleFileInput(files: FileList) {   
  	this.data.currentGlobal.subscribe(global => this.global = global);
    
	  let url = `${this.global.apiRoot}/usuario/post/endpoint.php`;

	 if(files.length > 0){
	 	this.fileToUpload = files[0];
	 	let formData:FormData = new FormData();
	 	formData.append('uploadFile', this.fileToUpload, this.fileToUpload.name);
	 	console.log(formData);
    let search = new URLSearchParams();
    search.set('foo', 'moo');
    search.set('limit', 25);
    search.set('limit', 25);
		this.http.post(url, formData, {search})
			.catch(error => Observable.throw(error))
			.subscribe(
				data =>{
                    console.log(data.json());
                },
                error =>{
                    console.log(error);
                }
               )
	 }
  }
} 


