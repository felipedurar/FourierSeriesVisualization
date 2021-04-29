import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { StatusService } from 'src/app/services/status.service';
import { SerieModel } from 'src/models/serie.model';

@Component({
  selector: 'app-bidimensional-view',
  templateUrl: './bidimensional-view.component.html',
  styleUrls: ['./bidimensional-view.component.css']
})
export class BidimensionalViewComponent implements OnInit, AfterViewInit {
  @ViewChild('bidimensionalView', {static: false})
  bidimensionalView: ElementRef<HTMLCanvasElement>;

  public context: CanvasRenderingContext2D;

  public offScreenCanvas: any;
  public offscreenContext: CanvasRenderingContext2D;

  @Input()
  get series(): Array<SerieModel> { return this._series; }
  set series(s: Array<SerieModel>) {
    this._series = s;
  }
  private _series: Array<SerieModel> = [];

  public linesDist: number = 50;
  public linesAmount: number = 100;

  public scaling = window.devicePixelRatio || 1;

  public tX: number = 0;
  public tY: number = 0;

  public t: number = 0;
  public running = false;

  public lastCycleX = 0.0;
  public lastCycleY = 0.0;

  constructor(private statusService: StatusService) { }

  ngOnInit() {
    this.statusService.runStatus.subscribe((status) => {
      this.running = status;
      if (!this.running) {
        this.t = 0;
        this.statusService.time.next(this.t);

        setTimeout(() => {
          this.clearOffscreen();
        }, 200);
      }
    });
    this.statusService.paused.subscribe((status) => {
      if (this.statusService.runStatus.getValue()) {
        this.running = !status;
      }
    });
  }


  ngAfterViewInit(): void {
    const w = this.bidimensionalView.nativeElement.offsetWidth;
    const h = this.bidimensionalView.nativeElement.offsetHeight;

    this.statusService.bidimensionalViewHeight.next(h);
    
    this.tX = w / 2;
    this.tY = h / 2;
    this.bidimensionalView.nativeElement.width = w;
    this.bidimensionalView.nativeElement.height = h;

    this.context = this.bidimensionalView.nativeElement.getContext('2d');

    this.offScreenCanvas = document.createElement('canvas');
    this.offScreenCanvas.width = w;
    this.offScreenCanvas.height = h;
    this.offscreenContext = this.offScreenCanvas.getContext("2d");

    setInterval(() => {
      this.draw();

      //
      if (this.running) {
        this.t += 0.1;
        this.statusService.time.next(this.t);
      }
    }, 10);
  }

  clearOffscreen() {
    if (!this.offscreenContext) return;

    this.offscreenContext.fillStyle = "rgb(255, 255, 255)";
    this.offscreenContext.fillRect(0, 0, this.bidimensionalView.nativeElement.width, this.bidimensionalView.nativeElement.height);
  }

  draw() {
    this.context.fillStyle = "rgb(255, 255, 255)";
    this.context.fillRect(0, 0, this.bidimensionalView.nativeElement.width, this.bidimensionalView.nativeElement.height);

    this.context.save();
    this.context.drawImage(this.offScreenCanvas, 0, 0);
    this.context.restore();

    this.context.save();
    this.context.translate(this.tX, this.tY);

    this.offscreenContext.save();
    this.offscreenContext.translate(this.tX, this.tY);
    this.offscreenContext.lineWidth = 1;
    this.offscreenContext.strokeStyle = "rgb(50, 50, 50, 0.3)";

    this.context.scale(this.scaling, this.scaling);
    this.context.lineWidth = 1;
    this.context.strokeStyle = "rgb(50, 50, 50, 0.3)";

    const lineSz = this.linesAmount * this.linesDist;
    for (let x = 0; x < (this.linesAmount / 2); x++) {
      this.context.beginPath();
      this.context.moveTo(x * this.linesDist, -(lineSz / 2));
      this.context.lineTo(x * this.linesDist, +(lineSz / 2));
      this.context.closePath();
      this.context.stroke();

      this.context.beginPath();
      this.context.moveTo(-x * this.linesDist, -(lineSz / 2));
      this.context.lineTo(-x * this.linesDist, +(lineSz / 2));
      this.context.closePath();
      this.context.stroke();

      this.context.beginPath();
      this.context.moveTo(-(lineSz / 2), +x * this.linesDist);
      this.context.lineTo(+(lineSz / 2), +x * this.linesDist);
      this.context.closePath();
      this.context.stroke();

      this.context.beginPath();
      this.context.moveTo(-(lineSz / 2), -x * this.linesDist);
      this.context.lineTo(+(lineSz / 2), -x * this.linesDist);
      this.context.closePath();
      this.context.stroke();
    }

    this.context.lineWidth = 2;
    this.context.strokeStyle = "rgb(0, 0, 0, 255)";

    let lastX = 0.0;
    let lastY = 0.0;
    for (let c = 0; c < this._series.length; c++) {
      const cSerie = this._series[c];
      //
      const angle = Math.atan2(cSerie.imaginary, cSerie.real);
      const dist = Math.hypot(cSerie.real, cSerie.imaginary);
      const angTime = cSerie.exponent * 2.0 * Math.PI * (this.t / 100.0);
      const nextX = lastX + (Math.cos(angle + angTime) * dist);
      const nextY = lastY + (Math.sin(angle + angTime) * dist);

      // Draw the circle
      this.context.beginPath();
      this.context.arc(lastX, lastY, dist, 0, Math.PI * 2, true);
      this.context.closePath();
      this.context.stroke();

      // Draw the line towards the direction
      this.context.beginPath();
      this.context.moveTo(lastX, lastY);
      this.context.lineTo(nextX, nextY);
      this.context.closePath();
      this.context.stroke();

      // Small dot in the destination point
      this.context.fillStyle = "rgb(0, 0, 0)";
      this.context.beginPath();
      this.context.arc(nextX, nextY, 4, 0, Math.PI * 2, true);
      this.context.closePath();
      this.context.fill();

      // Set the last
      lastX = nextX;
      lastY = nextY;
    }

    if (this.lastCycleX !== 0.0 && this.lastCycleY !== 0.0) {
      // Draw to the offscreen canvas
      this.offscreenContext.strokeStyle = "rgb(200, 0, 0, 0.7)";
      this.offscreenContext.beginPath();
      this.offscreenContext.moveTo(this.lastCycleX, this.lastCycleY);
      this.offscreenContext.lineTo(lastX, lastY);
      this.offscreenContext.closePath();
      this.offscreenContext.stroke();
    }

    this.lastCycleX = lastX;
    this.lastCycleY = lastY;

    this.offscreenContext.restore();
    this.context.restore();

    //this.context.translate(150, 150);
  }

}
