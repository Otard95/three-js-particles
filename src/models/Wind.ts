import { Vector3 } from 'three';
import simplex from 'simplex-noise';
const n = new simplex();

export default class Wind {
  
  private wind_vec: Vector3;
  private turbulense_scale: number = 0;
  private turbulense_variance: number = 0.5;
  
  constructor (vec: Vector3, turbulense_scale: number = 0, turbulense_variance: number = 0) {
    this.wind_vec = vec;
    this.turbulense_scale = turbulense_scale;
  }
  
  public get Strength (): number  { return this.wind_vec.length(); }
  public set Strength (s: number) { this.wind_vec.setLength(s); }
  
  public get Direction (): Vector3  { return this.wind_vec.clone().normalize(); }
  public set Direction (v: Vector3) { const s = this.Strength; this.wind_vec = v.setLength(s); }
  
  public get Raw (): Vector3 { return this.wind_vec.clone(); }
  
  public WindAtPoint (pos: Vector3): Vector3 {
    const turbulense_x = n.noise3D(pos.x, pos.y, Date.now() / 1000 * this.turbulense_variance);
    const turbulense_y = n.noise3D(pos.y, pos.z, Date.now() / 1000 * this.turbulense_variance);
    const turbulense_z = n.noise3D(pos.z, pos.x, Date.now() / 1000 * this.turbulense_variance);
    const turbulense = new Vector3(turbulense_x, turbulense_y, turbulense_z).multiplyScalar(this.turbulense_scale);
    return this.wind_vec.clone().add(turbulense);
  }
  
}
