import { Vector3 } from 'three';
import Wind from '~models/Wind';

export default class Physics {
  
  private static _instance: Physics;
  public static get Instance (): Physics { return this._instance || (this._instance = new Physics()); }
  
  private winds: Wind[] = [];
  private lastFrame: number;
  private time: number;
  
  private constructor () {
    this.time = Date.now();
    this.lastFrame = Date.now();
  }
  
  public get Delta (): number { return (this.time - this.lastFrame) / 1000; }
  
  public Update () {
    this.lastFrame = this.time;
    this.time = Date.now();
  }
  
  public Apply (pos: Vector3, vel: Vector3, gravity: boolean = true, drag: number): void {
    const acc = new Vector3();
    if (gravity) { acc.y -= 9.81; }
    
    // cumulative wind
    const wind: Vector3 = this.winds
      .map((w: Wind) => w.WindAtPoint(pos))
      .reduce((total: Vector3, w: Vector3) => total.add(w), new Vector3());
    
    // calculate drag based on thre relative arispeed of the object
    const relative_airspeed = wind.sub(vel);
    acc.add(relative_airspeed.multiplyScalar(drag));
    
    // scale acceleration with time and update final position
    acc.multiplyScalar(this.Delta);
    vel.add(acc);
    pos.add(vel.clone().multiplyScalar(this.Delta));
    
  }
  
  public AddWind (wind: Wind): void {
    this.winds.push(wind);
  }
  
}
