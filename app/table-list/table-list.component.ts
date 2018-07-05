import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {


  constructor() { }

   ngOnInit(){}


}