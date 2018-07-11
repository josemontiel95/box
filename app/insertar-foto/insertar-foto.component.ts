import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: 'app-insertar-foto',
  templateUrl: './insertar-foto.component.html',
  styleUrls: ['./insertar-foto.component.scss']
})
export class InsertarFotoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  fileToUpload: File = null;

}
