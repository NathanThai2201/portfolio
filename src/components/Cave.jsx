import * as THREE from 'three'
import React, { useRef } from 'react';
import { useGLTF} from '@react-three/drei';
import { forwardRef, useState, useEffect } from 'react';

export function Cave(props) {
  const { nodes, materials } = useGLTF('./models/cave.glb');
  const groupRef = useRef();
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = window.innerHeight;
      const scrollPercent = scrollY / scrollHeight;

    
      if (groupRef.current) {
        groupRef.current.position.y = scrollPercent * 1 +0.1;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <group {...props} dispose={null} ref={groupRef}>
      <mesh geometry={nodes.C.geometry} material={materials.C} rotation={[-2.715, 0.903, 2.687]} scale={129.606} />
      <mesh geometry={nodes.B.geometry} material={materials.B} rotation={[1.631, 0.276, -2.187]} scale={52.747} />
      <mesh geometry={nodes.A.geometry} material={materials.A} />
      <mesh geometry={nodes.Cube.geometry} material={materials.A} position={[-2.693, 0.215, 0.184]} scale={[11.233, 5.301, 5.301]} />
      <mesh geometry={nodes.TVS.geometry} material={materials.TV} position={[-7.547, -1.048, 2.615]} rotation={[1.67, 0.213, -2.286]} scale={1.761} />
      <Screen/>
    </group>
  );
}

useGLTF.preload('./models/cave.glb');


const Screen = forwardRef((props, forwardRef) => {
  const [video] = useState(() => Object.assign(document.createElement('video'), { src: './videos/screen.mp4', crossOrigin: 'Anonymous', loop: true, muted: true }))
  useEffect(() => void video.play(), [video])
  return (
    <mesh ref={forwardRef} position={[-8.64, -1.09, 2.05]} rotation={[-3,0.8,3]} scale={[0.11,0.11,0.1]}{...props}>
      <planeGeometry args={[16, 10]} />
      <meshBasicMaterial>
        <videoTexture attach="map" args={[video]} colorSpace={THREE.SRGBColorSpace} />
      </meshBasicMaterial>
    </mesh>
  )
})