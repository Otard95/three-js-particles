import * as three from 'three'

declare module 'three' {
  
  class ParticleBufferGeometry extends three.BufferGeometry {
    particleData?: ParticleData;
  }

  interface ParticleData {
    velocities: three.Vector3[];
  }

}
