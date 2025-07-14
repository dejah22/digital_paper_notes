import './AnimatedLetter.css';
import { font } from './fonts/font1';
type Props = {
  letter: string;
  index: number;
  onStrokeStart?: () => void;
    onStrokeEnd?: () => void;
};

export default function AnimatedLetter({ letter, index, onStrokeStart, onStrokeEnd }: Props) {
  const path = font[letter.toLowerCase() as keyof typeof font];
  return (
    <svg
      className="letter-svg"
      style={{ animationDelay: `${index * 0.5}s` }}
      width="auto" height="1em"
      preserveAspectRatio='xMinYMin meet'
      onAnimationStart={onStrokeStart}
      onAnimationEnd={onStrokeEnd}
    >
      <path
        d={path}
        fill="none"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        className="draw-stroke"
      />
    </svg>
  );
}