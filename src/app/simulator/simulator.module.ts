import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulatorComponent } from './simulator.component';
import { SimulatorRoutingModule } from './simulator.routing.module';
import { RouterModule } from '@angular/router';
import { SeriesComponent } from './series/series.component';
import { BidimensionalViewComponent } from './bidimensional-view/bidimensional-view.component';
import { WaveViewComponent } from './wave-view/wave-view.component';
import { SerieDialogComponent } from './serie-dialog/serie-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SimulatorComponent,
    SeriesComponent,
    BidimensionalViewComponent,
    WaveViewComponent,
    SerieDialogComponent
  ],
  entryComponents: [
    SerieDialogComponent
  ],
  imports: [
    CommonModule,
    SimulatorRoutingModule,
    RouterModule,
    NgbModule,
    FormsModule
  ]
})
export class SimulatorModule { }
