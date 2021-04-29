import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { StatusService } from 'src/app/services/status.service';
import { SerieModel } from 'src/models/serie.model';

@Component({
  selector: 'app-wave-view',
  templateUrl: './wave-view.component.html',
  styleUrls: ['./wave-view.component.css']
})
export class WaveViewComponent implements OnInit, AfterViewInit {
  @ViewChild('waveView', {static: false})
  waveView: ElementRef<HTMLCanvasElement>;

  public context: CanvasRenderingContext2D;

  @Input()
  get series(): Array<SerieModel> { return this._series; }
  set series(s: Array<SerieModel>) {
    this._series = s;
  }
  private _series: Array<SerieModel> = [];

  public scaling = window.devicePixelRatio || 1;
  public hScale = 1.0;

  public t: number = 0;
  public running = false;

  public tX: number = 0;
  public tY: number = 0;

  public linesDist: number = 50;
  public linesAmount: number = 100;

  public lastCycleX = 0.0;
  public lastCycleY = 0.0;

  public offScreenCanvas1: any;
  public offscreenContext1: CanvasRenderingContext2D;

  public offScreenCanvas2: any;
  public offscreenContext2: CanvasRenderingContext2D;

  public offscreenSwap: boolean = false;
  public offscreenOffset: number = 0;

  public w: number = 0;
  public h: number = 0;
  
  constructor(private statusService: StatusService) { }

  ngOnInit() {
    this.statusService.runStatus.subscribe((status) => {
      this.running = status;
      if (!this.running) {
        this.t = 0;
        this.offscreenSwap = false;
        this.offscreenOffset = 0;

        if (!!this.offscreenContext1 && !!this.offscreenContext2) {
          this.offscreenContext1.fillStyle = "#FFFFFF";
          this.offscreenContext1.fillRect(0, 0, this.waveView.nativeElement.width / 2, this.waveView.nativeElement.height);
          this.offscreenContext2.fillStyle = "#FFFFFF";
          this.offscreenContext2.fillRect(0, 0, this.waveView.nativeElement.width / 2, this.waveView.nativeElement.height);
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.w = this.waveView.nativeElement.offsetWidth;
    this.h = this.waveView.nativeElement.offsetHeight;

    this.statusService.bidimensionalViewHeight.subscribe((bH) => {
      this.hScale = (this.h * 1.0) / (bH * 1.0);
    });
    
    this.tX = this.w / 2;
    this.tY = this.h / 2;
    this.waveView.nativeElement.width = this.w;
    this.waveView.nativeElement.height = this.h;

    this.context = this.waveView.nativeElement.getContext('2d');

    this.offScreenCanvas1 = document.createElement('canvas');
    this.offScreenCanvas1.width = this.w / 2;
    this.offScreenCanvas1.height = this.h;
    this.offscreenContext1 = this.offScreenCanvas1.getContext("2d");


    this.offScreenCanvas2 = document.createElement('canvas');
    this.offScreenCanvas2.width = this.w / 2;
    this.offScreenCanvas2.height = this.h;
    this.offscreenContext2 = this.offScreenCanvas2.getContext("2d");

    setInterval(() => {
      this.draw();

      //
      if (this.running){
        this.t += 0.1;
        this.offscreenOffset++;
      }

      if (this.offscreenOffset > (this.w / 2)) {
        this.offscreenSwap = !this.offscreenSwap;
        this.offscreenOffset = 0;

        if (this.offscreenSwap) {
          this.offscreenContext1.fillStyle = "#FFFFFF";
          this.offscreenContext1.fillRect(0, 0, this.waveView.nativeElement.width / 2, this.waveView.nativeElement.height);
        } else {
          this.offscreenContext2.fillStyle = "#FFFFFF";
          this.offscreenContext2.fillRect(0, 0, this.waveView.nativeElement.width / 2, this.waveView.nativeElement.height);
        }
      }
    }, 10);
  }

  getCurrentOffscreenCanvas

  draw() {
    this.context.fillStyle = "rgb(255, 255, 255)";
    this.context.fillRect(0, 0, this.waveView.nativeElement.width, this.waveView.nativeElement.height);

    this.context.save();
    if (!this.offscreenSwap) {
      this.context.drawImage(this.offScreenCanvas1, -this.offscreenOffset, 0);
      this.context.drawImage(this.offScreenCanvas2, -this.offscreenOffset + (this.w / 2), 0);
    } else {
      this.context.drawImage(this.offScreenCanvas2, -this.offscreenOffset, 0);
      this.context.drawImage(this.offScreenCanvas1, -this.offscreenOffset + (this.w / 2), 0);
    }
    this.context.restore();

    this.context.save();
    this.context.translate(this.tX, this.tY);

    this.context.scale(this.scaling, this.hScale);
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
      lastX = lastX + (Math.cos(angle + angTime) * dist);
      lastY = lastY + (Math.sin(angle + angTime) * dist);
    }

    // Small dot in the destination point
    this.context.fillStyle = "rgb(0, 0, 0)";
    this.context.beginPath();
    this.context.arc(0, lastY, 4, 0, Math.PI * 2, true);
    this.context.closePath();
    this.context.fill();

    // Offscreen Draw Region
    const getCurrOffscreenContext = () => {
      if (this.offscreenSwap) return this.offscreenContext1;
      else return this.offscreenContext2;
    };

    const cOffscreenDraw = getCurrOffscreenContext();
    
    cOffscreenDraw.save();

    cOffscreenDraw.translate(0, this.tY);

    //cOffscreenDraw.scale(this.scaling, this.hScale);
    cOffscreenDraw.lineWidth = 2;
    cOffscreenDraw.strokeStyle = "rgb(200, 0, 0, 0.7)";

    cOffscreenDraw.beginPath();
    cOffscreenDraw.moveTo(this.offscreenOffset, lastY * this.hScale);
    cOffscreenDraw.lineTo(this.offscreenOffset - 1, this.lastCycleY * this.hScale);
    cOffscreenDraw.closePath();
    cOffscreenDraw.stroke();

    cOffscreenDraw.restore();
    // End Offscreen Draw Region

    this.lastCycleX = lastX;
    this.lastCycleY = lastY;

    this.context.restore();

  }

}
