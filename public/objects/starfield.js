import * as THREE from 'three';
export function generateStarfield(numStars) {

    // Create geometry and material for the stars
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(numStars * 3);
  
    // Randomly distribute the stars within a cube
    for (let i = 0; i < numStars; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 500; // X coordinate
      positions[i * 3 + 1] = (Math.random() - 0.5) * 500; // Y coordinate
      positions[i * 3 + 2] = (Math.random() - 0.5) * 500; // Z coordinate
    }
  
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Material for the points
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2 });
  
    // Create and add the stars to the scene
    const stars = new THREE.Points(geometry, material);
    stars.name = 'starField';
    return stars;
  }