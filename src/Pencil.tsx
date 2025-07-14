import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
 
type Props = { position: [number, number, number] };
 
export default function Pencil({ position }: Props) {
const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/design_elements/Pencil.glb');
  return <primitive ref={ref} object={scene} position={position} scale={1} rotation={[0, 0, 6]} />;
}