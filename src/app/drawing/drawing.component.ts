import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Square } from './square';
import { Canvas } from '../canvas';
import { Direction, GameKey } from '../enums';
import { Position } from '../position';
import { Grid } from '../grid';
import { Snake } from '../snake';
import { Direct } from 'protractor/built/driverProviders';
import { Food } from '../food';


@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css']
})
export class DrawingComponent implements OnInit {

  @ViewChild('canv', {static: true})
  canv!: ElementRef<HTMLCanvasElement>;
  
  canvas!: Canvas;
  grid!: Grid;

  private snake!: Snake;
  private food!: Food;
  
  //private ctx!: CanvasRenderingContext2D;

  constructor() {}
  
  ngOnInit(): void {
    /*
    const c = this.canv.nativeElement.getContext('2d');
    if (!c || !(c instanceof CanvasRenderingContext2D)) throw new Error('canvas context error');
    this.ctx = c;
    */
   this.canvas = new Canvas(this.canv.nativeElement);
   this.grid = new Grid(this.canv.nativeElement);

   this.snake = new Snake(this.grid, new Position(0,0));
   this.food = new Food(this.grid, 10);
  }


  i: number = 1
  animate(): void {
    /*
    this.ctx.fillStyle = 'red';
    const square = new Square(this.ctx);
    square.draw(1, 1, 20);
    */
   /*
   this.canvas.draw_rect(this.i, 2, 20, 20, 'red');
   this.canvas.fill_rect(this.i, 2, 20, 20, 'blue');
   this.canvas.draw_rect(this.i, 2+20, 20, 20, 'red');
   */

   this.i += 10;
   this.grid.fillSquare(new Position(this.i, this.i));
   
  }

  private drawSmth(p: Position, color: string): void {
    this.canvas.draw_rect(p.X, p.Y, 10, 10, color);
  }

  pos: Position = new Position(0, 0);
  step: number = 10;

  animateDirection(e: number) : void {
    var d: Direction = Direction.NONE;

    switch (e) {
      case GameKey.DOWN:
        d = Direction.DOWN; break;
      case GameKey.UP:
        d = Direction.UP; break;
      case GameKey.LEFT:
        d = Direction.LEFT; break;
      case GameKey.RIGHT:
        d = Direction.RIGHT; break;
    
      default:
        console.log("invalid key");
    }
    this.snake.changeDirection(d);
    
  }

  private running: boolean = false;

  start(): void {
    this.canv.nativeElement.focus();

    if (this.running) return;
    this.snake.start();
    this.running = true;
  }

  stop(): void {
    this.running = false;
    this.snake.stop();
  }

  /*
  animateDirection(e: number): void {
    // i can compare the values with the enum!!! 
    switch (e) {
      case GameKey.DOWN:
        this.pos.Y+=this.step; break;

      case GameKey.UP:
        this.pos.Y-=this.step; break;

      case GameKey.LEFT:
        this.pos.X-=this.step; break;

      case GameKey.RIGHT:
        this.pos.X+=this.step; break;
      
      default:
        console.log("invalid key");

    }
    this.drawSmth(this.pos, 'red');

    console.log(e + " key == up? " + (e == GameKey.UP) + " - " + GameKey[e]);
  }
  */

  log(): void { console.log('help'); }
}

