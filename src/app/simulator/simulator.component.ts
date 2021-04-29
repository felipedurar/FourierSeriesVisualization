import { Component, OnInit } from '@angular/core';
import { SerieModel } from 'src/models/serie.model';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit {

  public series: Array<SerieModel> = [];

  constructor() { }

  ngOnInit() {
  }

}
