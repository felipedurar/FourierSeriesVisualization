import { Component, Input, OnInit } from '@angular/core';
import { SerieModel } from 'src/models/serie.model';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  @Input()
  get series(): Array<SerieModel> { return this._series; }
  set series(s: Array<SerieModel>) {
    this._series = s;
  }
  private _series: Array<SerieModel> = [];

  constructor() { }

  ngOnInit() {
    this._series.push({exponent: 0.2, imaginary: 23, real: 54})
    this._series.push({exponent: 0.1, imaginary: 12.45, real: 16.2})
    this._series.push({exponent: 1.3, imaginary: 55, real: 23})
    this._series.push({exponent: 0.5, imaginary: 46, real: 32})
    this._series.push({exponent: 0.3, imaginary: 25, real: 35})
    this._series.push({exponent: 0.7, imaginary: 12, real: 35})
    this._series.push({exponent: 1.1, imaginary: 43, real: 46})
  }

}
