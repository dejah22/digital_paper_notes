import './AnimatedLetter.css';
import { letterPaths } from './letterPathsGenerated';
type Props = {
  letter: string;
  index: number;
  onStrokeStart?: () => void;
    onStrokeEnd?: () => void;
};

export default function AnimatedLetter({ letter, index, onStrokeStart, onStrokeEnd }: Props) {
  const path = letterPaths[letter.toLowerCase() as keyof typeof letterPaths];
  return (
    <svg
      className="letter-svg"
      style={{ animationDelay: `${index * 0.5}s` }}
      width="50" height="50"
      onAnimationStart={onStrokeStart}
      onAnimationEnd={onStrokeEnd}
    >
      <path
        d={path}
        fill="none"
        stroke="#000"
        strokeWidth="4"
        strokeDasharray="200"
        strokeDashoffset="200"
        strokeLinecap="round"
        className="draw-stroke"
      />
    </svg>
  );
}