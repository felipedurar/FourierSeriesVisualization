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

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
