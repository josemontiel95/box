import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Global } from "./interfaces/int.Global";

@Injectable()
export class DataService {

	private globalSource = new BehaviorSubject<Global>(new Global(0,localStorage.getItem("token"),"http://lacocs.montielpalacios.com/API","http://lacocs.montielpalacios.com/") );
	currentGlobal = this.globalSource.asObservable();

	constructor() { }

	changeGlobal(global: Global){
		localStorage.setItem('token', global.token);
		this.globalSource.next(global);
	}

}
