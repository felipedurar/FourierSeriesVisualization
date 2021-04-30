import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SerieModel } from 'src/models/serie.model';

@Component({
  selector: 'app-serie-dialog',
  templateUrl: './serie-dialog.component.html',
  styleUrls: ['./serie-dialog.component.css']
})
export class SerieDialogComponent implements OnInit {
  @Input() serie: SerieModel;

  public real: string = '';
  public imaginary: string = '';
  public exponent: string = '';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.real = this.serie.real.toString();
    this.imaginary = this.serie.imaginary.toString();
    this.exponent = this.serie.exponent.toString();
  }

  add() {
    this.serie.real = parseFloat(this.real);
    this.serie.imaginary = parseFloat(this.imaginary);
    this.serie.exponent = parseFloat(this.exponent);

    if (isNaN(this.serie.real)) this.serie.real = 0;
    if (isNaN(this.serie.imaginary)) this.serie.imaginary = 0;
    if (isNaN(this.serie.exponent)) this.serie.exponent = 0;

    this.activeModal.close(this.serie);
  }

}
