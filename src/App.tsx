import { useState, useEffect, useRef, Suspense } from 'react';
import AnimatedLetter from './AnimatedLetter';
import Pencil from './Pencil';
import {Canvas} from '@react-three/fiber'
import { startSound, stopSound } from './sounds';
import './App.css';
 
export default function App() {
  const [letters, setLetters] = useState<string[]>([]);
  const [positions, setPositions] = useState<[number,number,number][]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
 
  // Capture key input
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.length === 1) setLetters((l) => [...l, e.key]);
      if (e.key === 'Backspace') setLetters((l) => l.slice(0, -1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
 
  // Map caret positions
  useEffect(() => {
    const posArr: [number,number,number][] = [];
    if (cursorRef.current) {
      const spans = cursorRef.current.querySelectorAll('span');
      spans.forEach((span) => {
        const r = span.getBoundingClientRect();
        const parent = cursorRef.current!.getBoundingClientRect();
        posArr.push([(r.left - parent.left) / 50, -(r.top - parent.top)/50, 0]);
      });
    }
    setPositions(posArr);
  }, [letters]);
 
  return (
    <div className="notebook-container" onClick={() => document.body.focus()}>
      <div className="paper">
        <div className="text-layer" ref={cursorRef}>
          {letters.map((ch, i) =>
            <AnimatedLetter
              key={i} letter={ch} index={i}

            />
          )}
        </div>
        <div className="canvas-layer">
          <Canvas camera={{ position:[0,0,5], fov:50 }}>
            <ambientLight />
            <Suspense><Pencil position={positions[positions.length-1] || [0,0,0]} /></Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
}
 