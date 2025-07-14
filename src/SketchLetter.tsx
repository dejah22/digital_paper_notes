// SketchLetter.tsx
import { useEffect, useState, useRef } from 'react';
import { Howl } from 'howler';
import { SketchRNN } from '@magenta/sketch';
import './AnimatedLetter.css';
 
const pencilSound = new Howl({ src: ['/pencil-scratch.mp3'], loop: true, volume: 0.3 });
 
export default function SketchLetter({ temperature = 0.25, length = 80 }: { temperature?: number, length?: number }) {
  const [pathData, setPathData] = useState<string>('');
  const modelRef = useRef<SketchRNN>(null);
 
  useEffect(() => {
    async function loadAndGenerate() {
      const model = new SketchRNN('https://storage.googleapis.com/quickdraw-models/sketchRNN/models/handwriting.gen.json');
      await model.initialize();
      model.setPixelFactor(2);
 
      let stroke = model.zeroInput(); // [dx,dy,p_down,p_up,p_end]
      let state = model.zeroState();
      let d = 'M 150 150 ';
      let x = 150, y = 150;
      pencilSound.play();
 
      while (stroke[4] !== 1 && length-- > 0) {
        const pdf = model.getPDF(state, temperature);
        const sample = model.sample(pdf);
        stroke = sample;
        state = model.update(stroke, state);
 
        const [dx, dy, pd, pu, pe] = stroke;
        x += dx; y += dy;
        if (pd === 1) d += `L ${x} ${y} `;
        else d += `M ${x} ${y} `;
 
        // brief delay for rendering if needed
        await new Promise((r) => setTimeout(r, 10));
      }
 
      pencilSound.stop();
      setPathData(d.trim());
    }
 
    loadAndGenerate();
  }, [temperature, length]);
 
  return (
    <svg viewBox="0 0 300 300" width={200} height={200} className="letter-svg">
      <path
        d={pathData}
        fill="none"
        stroke="#000"
        strokeWidth="2"
        strokeDasharray="800"
        strokeDashoffset="800"
        style={{ animation: 'draw 1.5s ease forwards' }}
      />
    </svg>
  );
}
 