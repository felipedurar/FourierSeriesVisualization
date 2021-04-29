import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulatorComponent } from './simulator.component';
import { SimulatorRoutingModule } from './simulator.routing.module';
import { RouterModule } from '@angular/router';
import { SeriesComponent } from './series/series.component';
import { BidimensionalViewComponent } from './bidimensional-view/bidimensional-view.component';
import { WaveViewComponent } from './wave-view/wave-view.component';



@NgModule({
  declarations: [
    SimulatorComponent,
    SeriesComponent,
    BidimensionalViewComponent,
    WaveViewComponent
  ],
  imports: [
    CommonModule,
    SimulatorRoutingModule,
    RouterModule
  ]
})
export class SimulatorModule { }