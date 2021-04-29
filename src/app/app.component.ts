import { Component } from '@angular/core';
import { StatusService } from './services/status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FourierSeriesVisualization';

  public simStatus = false;
  public t = 0;

  constructor(private statusService: StatusService) {
    statusService.runStatus.subscribe((status) => {
      this.simStatus = status;
    });
    statusService.time.subscribe((nt) => {
      this.t = nt;
    });
  }

  startStopSim() {
    this.statusService.runStatus.next(!this.simStatus);
  }
}
