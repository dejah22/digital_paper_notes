import { Howl, Howler } from 'howler';
const pencilSound = new Howl({ src: ['/pencil_sound.mp3'], volume: 0.5, loop: true });
 
export async function startSound() {
  if (Howler.ctx.state === 'suspended') await Howler.ctx.resume();
pencilSound.play();
}
export function stopSound() { pencilSound.stop(); }