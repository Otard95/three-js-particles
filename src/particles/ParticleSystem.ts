import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Points,
  PointsMaterial,
  Texture,
  TextureLoader,
  Vector3,
  Blending,
  AdditiveBlending,
} from 'three';
import Canvas from '~services/Canvas';

export default class ParticleSystem {
  
  private position: Vector3;
  private options: IParticleSystemOptions;
  private particle_pos: number[] = [];
  private particles: Points[] = [];
  private textures?: Texture[];

  constructor (
    pos: Vector3 = new Vector3(),
    options: IParticleSystemOptions = {},
  ) {
    if (!options.particle_color)    { options.particle_color = new Color(0xeeeeee); }
    if (!options.particle_size)     { options.particle_size = 1; }
    if (!options.relative_position) { options.relative_position = false; }
    if (!options.particle_blending) { options.particle_blending = AdditiveBlending; }
    
    this.position = pos;
    this.options = options;
    if (options.particle_textures) { this.loadTextures(); }
    this.createMaterial();
  }
  
  public get Position (): Vector3 {
    return this.position;
  }
  public set Position (pos: Vector3) {
    this.position = pos;
  }
  
  public generateRandom (num_particles: number = 100, pos_jitter: number = 100) {
    
    for (let i = 0; i < num_particles; i++) {
      this.particle_pos.push((Math.random() * 2 - 1) * pos_jitter); // x
      this.particle_pos.push((Math.random() * 2 - 1) * pos_jitter); // y
      this.particle_pos.push((Math.random() * 2 - 1) * pos_jitter); // z
    }
    
    this.createPointsFromVertecies(this.particle_pos);
    
    this.particles.forEach((p: Points) => {
      Canvas.Instance.scene.add(p);
    });
    
  }
  
  public generateQube (size: Vector3 = new Vector3(100, 100, 100), point_count: number = 30) {
    
    for (let x = 0; x <= point_count; x++) {
      for (let y = 0; y <= point_count; y++) {
        for (let z = 0; z <= point_count; z++) {
          this.particle_pos.push( size.x * x / point_count - size.x / 2 );
          this.particle_pos.push( size.y * y / point_count - size.y / 2 );
          this.particle_pos.push( size.z * z / point_count - size.z / 2 );
        }
      }
    }
    
    this.createPointsFromVertecies(this.particle_pos);

    this.particles.forEach((p: Points) => {
      Canvas.Instance.scene.add(p);
    });
    
  }
  
  private createPointsFromVertecies (verticies: number[]) {
    
    let prevStart = 0;
    for (let i = 0; i < this.options.particle_materials.length; i++) {
      const geometry = new BufferGeometry();
      let sliceTo = verticies.length / this.options.particle_materials.length * (i + 1);
      sliceTo -= sliceTo % 3;
      geometry.addAttribute('position', new Float32BufferAttribute(verticies.slice(prevStart, sliceTo), 3));
      prevStart = sliceTo;
      
      this.particles.push(new Points(geometry, this.options.particle_materials[i]));
    }
    
  }

  private loadTextures () {
    const textureLoader = new TextureLoader();
    this.textures = [];
    this.options.particle_textures.forEach((tex: string) => {
      this.textures.push(textureLoader.load(tex));
    });
  }
  
  private createMaterial () {
    if (this.options.particle_materials) { return; }
    
    if (this.textures) {
      this.options.particle_materials = [];
      this.textures.forEach((texture: Texture) => {
        this.options.particle_materials.push(new PointsMaterial({
          blending: this.options.particle_blending,
          depthTest: false,
          map: texture,
          size: this.options.particle_size,
          transparent: true,
        }));
      });
    } else {
      this.options.particle_materials = [
        new PointsMaterial(
          {
            color: this.options.particle_color,
            size: this.options.particle_size,
          },
        ),
      ];
    }
    
  } 

}

export interface IParticleSystemOptions {
  relative_position?: boolean;
  particle_size?: number;
  particle_color?: Color;
  particle_materials?: PointsMaterial[];
  particle_textures?: string[];
  particle_blending?: Blending;
}
