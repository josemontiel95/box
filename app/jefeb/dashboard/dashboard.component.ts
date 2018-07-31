import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] 
})
export class DashboardComponent implements OnInit {
  public lineBigDashboardChartType;
  public gradientStroke;
  public chartColor;
  public canvas : any;
  public ctx;
  public gradientFill;
  public lineBigDashboardChartData:Array<any>;
  public lineBigDashboardChartOptions:any;
  public lineBigDashboardChartLabels:Array<any>;
  public lineBigDashboardChartColors:Array<any>

  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;

  public lineChartType;
  public lineChartData:Array<any>;
  public lineChartOptions:any;
  public lineChartLabels:Array<any>;
  public lineChartColors:Array<any>

  public lineChartWithNumbersAndGridType;
  public lineChartWithNumbersAndGridData:Array<any>;
  public lineChartWithNumbersAndGridOptions:any;
  public lineChartWithNumbersAndGridLabels:Array<any>;
  public lineChartWithNumbersAndGridColors:Array<any>

  public lineChartGradientsNumbersType;
  public lineChartGradientsNumbersData:Array<any>;
  public lineChartGradientsNumbersOptions:any;
  public lineChartGradientsNumbersLabels:Array<any>;
  public lineChartGradientsNumbersColors:Array<any>
  // events
  

  constructor() { }

  ngOnInit() {
    
  }
}
