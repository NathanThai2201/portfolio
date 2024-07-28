import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scene } from './components/Scene'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { Overlay } from './components/Overlay';
import { Body } from './components/Body';

gsap.registerPlugin(useGSAP);

function App() {
  const main = useRef()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (

    <div className="container">
      <Overlay/>
      <Canvas  className="mainCanvas" dpr={[1,1]} gl={{ antialias: false }} camera={{ fov: 18, position: [0.1, 0, 0] }}>
        <fog attach="fog" args={['#FFFFFF', 0, 500]} />
        <Scene />
      </Canvas>
      <Body/>
    </div>
  )
}

export default App
