declare module 'simplex-noise' {
  export default class Simplex {
    public noise2D (x: number, y: number): number;
    public noise3D (x: number, y: number, z: number): number;
    public noise4D (x: number, y: number, z: number, w: number): number;
  }
}