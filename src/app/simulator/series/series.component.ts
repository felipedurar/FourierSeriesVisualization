import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SerieModel } from 'src/models/serie.model';
import { SerieDialogComponent } from '../serie-dialog/serie-dialog.component';

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

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    // this._series.push({exponent: 0.2, imaginary: 23, real: 54})
    // this._series.push({exponent: 0.1, imaginary: 12.45, real: 16.2})
    // this._series.push({exponent: 1.3, imaginary: 55, real: 23})
    // this._series.push({exponent: 0.5, imaginary: 46, real: 32})
    // this._series.push({exponent: 0.3, imaginary: 25, real: 35})
    // this._series.push({exponent: 0.7, imaginary: 12, real: 35})
    // this._series.push({exponent: 1.1, imaginary: 43, real: 46})
    const baseSize = 100;
    let last = 1;
    let a = 1;
    for (let c = 3; c < 30; c += 2) {
      this._series.push({exponent: c, imaginary: (baseSize / last) * a, real: 0});
      a *= -1;
      last = c;
    }
    // this._series.push({exponent: 3, imaginary: 40, real: 0})
    // this._series.push({exponent: 5, imaginary: -13.3, real: 0})
    // this._series.push({exponent: 7, imaginary: 8, real: 0})
    // this._series.push({exponent: 9, imaginary: -5, real: 0})
    // this._series.push({exponent: 11, imaginary: 4, real: 0})
    //this._series.push({exponent: 13, imaginary: 23, real: 54})
  }

  addSerie() {
    const modalRef = this.modalService.open(SerieDialogComponent, { centered: true });
    modalRef.componentInstance.serie = new SerieModel();
    modalRef.result.then((result) => {
      if (result) {
        this._series.push(result);
      }
    });
  }

  formatVal(val) {
    return val.toFixed(2).replace('.', ',');
  }

  editSerie(cSerie) {
    const modalRef = this.modalService.open(SerieDialogComponent, { centered: true });
    modalRef.componentInstance.serie = Object.assign({}, cSerie);
    modalRef.result.then((result) => {
      if (result) {
        cSerie.real = result.real;
        cSerie.imaginary = result.imaginary;
        cSerie.exponent = result.exponent;
      }
    });
  }

}
