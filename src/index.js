import React, { useRef, } from "react";
import { createRoot } from 'react-dom/client'
import { Canvas, useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from "@react-three/drei";
// import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from "three";
import map from "./assets/8k_earth_daymap.png";
import height from "./assets/earth_normals_lowres.png";
// import normal from "./assets/elev.png";
import "./styles.css";




const Scene = () => {
  useThree(({camera}) => {
    camera.position.set(0, 10, 0);
  
    
  });
  
};

const Sphere = () => {
  const color = useLoader(THREE.TextureLoader, map);
  const displace = useLoader(THREE.TextureLoader, height);
  const mesh = useRef()
  useFrame((state, delta) => (mesh.current.rotation.y += 0.001))
  return (
    <mesh ref={mesh} rotation-x={Math.PI * 0.25} rotation-y={Math.PI * 0.25}>
      <sphereBufferGeometry args={[5, 100, 100]} />
      <meshStandardMaterial attach="material" color="white" metalness={0.2} map={color} normalMap={displace}/>
    </mesh>
    
  );
  
};

createRoot(document.getElementById('root')).render(
	 <Canvas >
    
    <Scene />
		<OrbitControls />
		<Stars />
		<ambientLight intensity={0.05} /> 
		<spotLight position={[15, 15, -10]} angle={0.3} />
			<Sphere />
	</Canvas> 
);
