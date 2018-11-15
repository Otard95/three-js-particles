import { Vector3 } from 'three';

export default class Physics {
  
  private static _instance: Physics;
  public static get Instance (): Physics { return this._instance || (this._instance = new Physics()); }
  
  private constructor () {}
  
}
