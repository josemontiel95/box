import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-insertar-foto',
  templateUrl: './insertar-foto.component.html',
  styleUrls: ['./insertar-foto.component.scss']
})
export class InsertarFotoComponent implements OnInit {

  apiRoot: string = "http://lacocs.montielpalacios.com/usuario";

  constructor(private router: Router, private http: Http, private data: DataService) { }

  ngOnInit() {
  }

  fileToUpload: File = null; //Variable default para un archivo seleccionado.

  handleFileInput(files: FileList) {   
	  let url = `${this.apiRoot}/get/endpoint.php`;

	 if(files.length > 0){
	 	this.fileToUpload = files[0];
	 	console.log(this.fileToUpload);
	 	console.log(this.fileToUpload.name);
	 	let formData:FormData = new FormData();
	 	formData.append('uploadFile', this.fileToUpload, this.fileToUpload.name);

	 	let headers = new Headers();
	 	headers.append('enctype', 'multipart/form-data');
	 	headers.append('Accept', 'application/json');
	 	let options = new RequestOptions({ headers: headers });
	 	console.log(formData);
		console.log(options);
		this.http.post(url, formData, options)
			.catch(error => Observable.throw(error))
			.subscribe(
				data =>{
                    console.log(data);
                },
                error =>{
                    console.log(error);
                }
               )
	 }
  }
} 


