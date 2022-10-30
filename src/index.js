import React, { useRef, } from "react";
import { createRoot } from 'react-dom/client'
import { Canvas, useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from "@react-three/drei";
// import { CubeTextureLoader } from "three";
// import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from "three";
import map from "./assets/8k_earth_daymap.png";
import height from "./assets/earth_normals_lowres.png";
// import nx from './assets/nx.png'
// import ny from './assets/ny.png'
// import nz from './assets/nz.png'
// import px from './assets/px.png'
// import py from './assets/py.png'
// import pz from './assets/pz.png'
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
    stars.current.rotation.x = a*0.05
    stars.current.rotation.z = a*0.05
  })
  return (
    <Stars ref={stars} radius={10} depth={500} count={5000} factor={9} saturation={10} fade />
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
  const spotLight = useRef()
  useFrame(({ clock }) => {
    const a = clock.getElapsedTime()
    spotLight.current.position.x = Math.cos(a*0.1) * 400
    spotLight.current.position.z = Math.sin(a*0.1) * 400
  })
  return (
    <pointLight castShadow ref={spotLight} intensity={2} position={[10, 10, 10]} />
  );
}
// function SkyBox () {
//   const {scene} = useThree()
//   const loader = new CubeTextureLoader()
//   const texture = loader.load([
//     px,nx,py,ny,pz,nz
//   ])
//   scene.background = texture
//   return null
// }

createRoot(document.getElementById('root')).render(
	 <Canvas shadowMap>
    {/* <SkyBox /> */}
    <Scene/>
		<OrbitControls />
		<Starz />
		<ambientLight intensity={0.05} /> 
		<SpotLight />
			<Sphere castShadow/>
      <Moon receiveShadow position={[10,10,10]}/>
	</Canvas> 
);
