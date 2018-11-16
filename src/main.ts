import { PerspectiveCamera, Scene, WebGLRenderer, Color, Vector3 } from 'three';
import Canvas from '~services/Canvas';
import ParticleSystem from '~particles/ParticleSystem';

import snow1 from '~/images/snowflake1.png';
import snow2 from '~/images/snowflake2.png';
import snow3 from '~/images/snowflake3.png';
import snow4 from '~/images/snowflake4.png';
import snow5 from '~/images/snowflake5.png';
import Physics from '~services/Physics';
import Wind from '~models/Wind';

// Initilice canvas; scene, camera and renderer
const canvas = Canvas.Instance;
canvas.scene = new Scene();
canvas.camera = new PerspectiveCamera (75, window.innerWidth / window.innerHeight, 0.1, 1000);
canvas.renderer = new WebGLRenderer();
canvas.camera_rotation = true;
canvas.camera_rotation_radius = 50;
canvas.SetSize(window.innerWidth, window.innerHeight);
canvas.Mount();

// Create a particle system
const particle_system: ParticleSystem = new ParticleSystem(
  new Vector3(50, 50, 0),
  {
    particle_drag: 2,
    particle_textures: [snow1, snow2, snow3, snow4, snow5],
  },
);
particle_system.generateRandom(10000, 150);

// Add some wind to the physics engine
Physics.Instance.AddWind(new Wind(new Vector3(-3, 0, 0), 5, 1));

animate();

function animate () {
  
  Physics.Instance.Update();
  particle_system.Update();
  canvas.Render();
  requestAnimationFrame(animate);
  
}
