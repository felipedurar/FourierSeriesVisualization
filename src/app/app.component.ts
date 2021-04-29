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

  constructor(private statusService: StatusService) {
    statusService.runStatus.subscribe((status) => {
      this.simStatus = status;
    });
  }

  startStopSim() {
    this.statusService.runStatus.next(!this.simStatus);
  }
}
