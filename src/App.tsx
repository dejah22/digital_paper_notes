// import { useState, Suspense } from 'react'
// import { motion } from 'framer-motion'
// import { playScratchSounds } from './sounds'
// import {Canvas} from '@react-three/fiber'
// import Pencil from './Pencil'
// import './App.css'

// function App() {
//   const [penType, setPenType] = useState<'pencil' | 'marker' | 'pen'>('pencil');
//   const [todos, setTodos] = useState<string[]>([]);
//   const [input, setInput] = useState('');
//   const [cursorX, setCursorX] = useState(0);


//   const addTodo = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;
//     setTodos([...todos, input]);
//     setInput('');
//     playScratchSounds(penType);
//   };

//   return (
//     // <div className='notebook'>
//     //   <h1 className='notebook-title'>My Notebook</h1>

//     //   <div className='pen-selector'>
//     //     <button onClick={() => setPenType('pencil')}> Pencil </button>
//     //     <button onClick={() => setPenType('marker')}> Marker </button>
//     //     <button onClick={() => setPenType('pen')}> Pen </button>
//     //   </div>

//     //   <form onSubmit={addTodo} className='todo-form'>
//     //     <input
//     //       value={input}
//     //       onChange={(e) => {
//     //         setInput(e.target.value);
//     //         setCursorX((e.target.value.length % 20) * 0.2); // Adjust movement sensitivity
//     //         playScratchSounds(penType); // Play sound on input change
//     //       }}
//     //     />
//     //   </form>

//     //   <ul className='todo-list'>
//     //     {todos.map((todo, index) => (
//     //       <motion.li
//     //         key={index}
//     //         className='todo-item'
//     //         initial={{ opacity: 0, x: -20 }}
//     //         animate={{ opacity: 1, x: 0 }}
//     //         exit={{ opacity: 0, x: -20 }}
//     //         transition={{ duration: 0.3, ease: 'easeInOut' }}
//     //       >
//     //         {todo}
//     //       </motion.li>
//     //     ))}
//     //     </ul>
//         <div style={{background:'#ff0000', height: '100vh' }}>
//           <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
//             <ambientLight intensity={1.5} />
//             <Suspense fallback={null}>
//               <Pencil x={cursorX} />
//               </Suspense>
//             </Canvas>
//         </div> 
//     // </div>
//   );
// }

// src/App.tsx
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
 