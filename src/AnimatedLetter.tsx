import './AnimatedLetter.css';
import { font2 } from './fonts/font2_v2';
type Props = {
  letter: string;
  index: number;
  onStrokeStart?: () => void;
    onStrokeEnd?: () => void;
};

export default function AnimatedLetter({ letter, onStrokeStart, onStrokeEnd }: Props) {
  const path = font2[letter as keyof typeof font2];

  return (
    <svg
      className="letter-svg"
      style={{ animationDuration: `${Math.random() * 0.8}s`, display: 'inline-block', width: `1em` , height: '1em' }}
      viewBox='0 0 20 1'
      preserveAspectRatio='xMinYMin meet'
      onAnimationStart={onStrokeStart}
      onAnimationEnd={onStrokeEnd}
    >
      <path
      transform={`translate(${path?.width ? -path.width/2 : 0}, 0)`}
      d={path?.d}
      fill="none"
      stroke="#000"
      strokeWidth="2"
      strokeLinecap="round"
      className="draw-stroke"
      />
    </svg>
  );
}