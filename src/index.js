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
    camera.position.set(100, 10, 0);
    camera.lookAt(0, 0, 0);
    
  });
  
};

const Starz = () => {
  const stars = useRef()
  useFrame(({ clock }) => {
    const a = clock.getElapsedTime()
    stars.current.position.x = a*2
    stars.current.position.z = a*2
  })
  return (
    <Stars ref={stars} radius={100} depth={50} count={5000} factor={4} saturation={10} fade />
  )
}

const Sphere = () => {
  const color = useLoader(THREE.TextureLoader, map);
  const displace = useLoader(THREE.TextureLoader, height);
  const mesh = useRef()
  useFrame((state, delta) => (mesh.current.rotation.y += 0.01))
  return (
    <mesh ref={mesh} rotation-x={Math.PI * 2}>
      <sphereBufferGeometry args={[5, 100, 100]} />
      <meshStandardMaterial attach="material" color="white" metalness={0.2} map={color} normalMap={displace}/>
    </mesh>
    
  ); 
};

const Moon = () => {
  const moon = useRef()
  
  useFrame(({ clock }) => {
    const a = clock.getElapsedTime()
    moon.current.position.x = Math.cos(a*0.5) * 20
    moon.current.position.z = Math.sin(a*0.5) * 20
  })
  return(
    <mesh ref={moon} position={new THREE.Vector3(40, 0, 0)}>
      <sphereBufferGeometry args={[1, 100, 100]} />
      <meshStandardMaterial attach="material" color="white" metalness={0.2} />
    </mesh>
  )
}
const SpotLight = () => {
  const light = useRef()
  useFrame((state, delta) => (light.current.rotation.y += 1))
  return (
    <spotLight ref={light} intensity={2} position={[300, 300, 4000]} angle={0.90} penumbra={1} />
  );
}

const Axis = () => {
  return (
    <mesh>
      <axesHelper args={[100]} />
    </mesh>
  );
}

createRoot(document.getElementById('root')).render(
	 <Canvas >
    <Axis />
    <Scene/>
		<OrbitControls />
		<Starz />
		<ambientLight intensity={0.05} /> 
		<SpotLight />
			<Sphere />
      <Moon position={[10,10,10]}/>
	</Canvas> 
);
