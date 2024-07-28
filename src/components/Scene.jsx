import { useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, DepthOfField, ToneMapping, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { Cave } from "./Cave"
import { Overlay } from './Overlay'


export const Scene = () => {
    return(
        <>
        <ambientLight intensity={4}/>
        <Cave/>
        <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={0.5} />
            <DepthOfField target={[0, 0, 1]} focalLength={0.6} bokehScale={15} height={700} />
            <ChromaticAberration />
            <Vignette darkness={0.6}/>
        </EffectComposer>
        <CameraRig />
        </>
    )
}
function CameraRig() {
    useFrame((state, delta) => {
        state.camera.position.lerp({ x: 0, y: -state.pointer.y / 6 +0.02, z: state.pointer.x / 1.2 }, 0.1)
        state.camera.lookAt(-3, 0, 0)
    })
  }
  
