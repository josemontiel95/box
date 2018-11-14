import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Global } from "./interfaces/int.Global";

@Injectable()
export class DataService {

	private globalSource = new BehaviorSubject<Global>(new Global(0,localStorage.getItem("token"),"http://lacocsmex.com.mx/laboratorio/API","http://lacocsmex.com.mx/laboratorio/", localStorage.getItem("rol")) );
	currentGlobal = this.globalSource.asObservable();

	constructor() { }

	changeGlobal(global: Global){
		localStorage.setItem('token', global.token);
		localStorage.setItem('rol', global.rol);
		this.globalSource.next(global);
	}

}
