import { Camera, Scene, WebGLRenderer } from 'three';
import NumberUtil from '~utils/NumberUtil';

export default class Canvas {
  
  private static _instance?: Canvas;
  public static get Instance (): Canvas { return this._instance || (this._instance = new Canvas()); }
  
  public scene?: Scene;
  public camera?: Camera;
  public renderer?: WebGLRenderer;
  public width: number = 0;
  public height: number = 0;
  public camera_rotation: boolean = false;
  public camera_rotation_radius: number = 100;
  
  private mouse_x: number = 0;
  private mouse_y: number = 0;
  private win_half_w: number;
  private win_half_h: number;
  
  private constructor () {
    this.win_half_w = window.innerWidth / 2;
    this.win_half_h = window.innerHeight / 2;
    document.addEventListener('mousemove', this.OnMouseMove.bind(this));
  }
  
  public Render () {
    if (this.camera_rotation) { this.RotateCamera(); }
    this.renderer.render(this.scene, this.camera);
  }
  
  public SetSize (width: number, height: number) {
    this.width = width;
    this.height = height;
    this.renderer.setSize(width, height);
  }
  
  public Mount (element: HTMLElement = document.body) {
    element.appendChild(this.renderer.domElement);
  }
  
  private OnMouseMove (e: MouseEvent) {
    this.mouse_x = e.clientX - this.win_half_w;
    this.mouse_y = e.clientY - this.win_half_h;
  }
  
  private RotateCamera () {
    const x = NumberUtil.Map(
      this.mouse_x,
      -this.win_half_w,
      this.win_half_w,
      -this.camera_rotation_radius,
      this.camera_rotation_radius,
    );
    const y = NumberUtil.Map(
      this.mouse_y,
      -this.win_half_h,
      this.win_half_h,
      -this.camera_rotation_radius,
      this.camera_rotation_radius,
    );
    this.camera.position.x += (x - this.camera.position.x) * 0.05;
    this.camera.position.y += (-y - this.camera.position.y) * 0.05;
    this.camera.position.z = this.camera_rotation_radius;
    this.camera.lookAt(this.scene.position);
  }
  
}
