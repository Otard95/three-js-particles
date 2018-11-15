import { PerspectiveCamera, Scene, WebGLRenderer, Color } from 'three';
import Canvas from '~services/Canvas';
import ParticleSystem from '~particles/ParticleSystem';

import snow1 from '~/images/snowflake1.png';
import snow2 from '~/images/snowflake2.png';
import snow3 from '~/images/snowflake3.png';
import snow4 from '~/images/snowflake4.png';
import snow5 from '~/images/snowflake5.png';

const canvas = Canvas.Instance;
canvas.scene = new Scene();
canvas.camera = new PerspectiveCamera (75, window.innerWidth / window.innerHeight, 0.1, 1000);
canvas.renderer = new WebGLRenderer();
canvas.camera_rotation = true;
canvas.camera_rotation_radius = 50;
canvas.SetSize(window.innerWidth, window.innerHeight);
canvas.Mount();

const particle_system: ParticleSystem = new ParticleSystem(
  undefined,
  { particle_textures: [snow1, snow2, snow3, snow4, snow5] },
);
particle_system.generateQube();

animate();

function animate () {
  
  canvas.Render();
  requestAnimationFrame(animate);
  
}
