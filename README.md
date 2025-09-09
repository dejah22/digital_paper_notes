# Cutesy Digital Paper-pad with Animated Writing and Scratch Sounds

This project explores the intersection of **human–computer interaction, animation, and sound design** through a playful, interactive notepad.  
As users type, text is rendered as **animated handwriting strokes** on digital lined paper, while synchronized **pencil scratch audio** creates the illusion of physically writing on a notebook.

## Highlights
- **Stroke-Based Handwriting Animation** – Typed characters are drawn in real time using vector font paths, simulating handwriting.  
- **Multimodal Interaction** – Pencil scratch sounds dynamically synchronized with stroke animation enhance realism.  
- **Notebook Aesthetic** – Lined-paper background, margins, and title space recreate the familiar look of a physical notebook.  
- **Generative Pipeline** – Character vector paths and widths are programmatically generated, enabling dynamic spacing and kerning without pre-rendered assets.  
- **Lightweight & Responsive** – Built with a modern web stack for 

##  🛠️ Technical Stack
### ⚙️ Runtime & Build
- [**Node.js**](https://nodejs.org/) – development runtime  
- [**Vite**](https://vitejs.dev/) – ultra-fast build tool and dev server  
- [**TypeScript**](https://www.typescriptlang.org/) – type safety for frontend logic  

### 🖋️ Fonts & Path Generation
- [**Hershey Vector Fonts**](https://paulbourke.net/dataformats/hershey/) – open stroke-based fonts  
- [**hersheytext**](https://www.npmjs.com/package/hersheytext) – extracts SVG path + width metadata for each character  
- **Custom Node.js preprocessing script** – generates `letterPathsGenerated.ts`, containing per-character SVG `d` values and advance widths for kerning control  

### 🎨 Frontend & Rendering
- [**React**](https://react.dev/) – component-based UI  
- [**Tailwind CSS**](https://tailwindcss.com/) – utility-first styling for layout and notebook aesthetics  
- **SVG `<path>` animation** – handwriting effect via `stroke-dasharray` & `stroke-dashoffset`  
- **Dynamic kerning** – cursor origin offset per letter using extracted font widths  

### 🎬 Animation
- **CSS animations** – lightweight handwriting stroke reveal  
- [Cubic Bézier easing](https://cubic-bezier.com/) – natural stroke speed curves  
- Sequential stroke animation with `animation-delay`  

### 🔊 Sound Integration
- [**Howler.js**](https://howlerjs.com/) – audio playback and control  
- `public/pencil_sound.mp3` – synchronized pencil scratch sound per stroke (looping, adjustable volume) - switch up your pencil scratch audio here :p

## Installation & Setup
1. Clone the repo:
   ```git clone https://github.com/your-username/digital-paper-pad.git```
2. Navigate to the project: ```cd digital-paper-pad```
3. Install dependencies: ```npm install```
4. Start the app: ```npm start```
5. Open http://localhost:3000 to view it in the browser.

<p align="center">
<img width="611" height="405" alt="Screenshot 2025-08-08 at 7 57 54 PM" src="https://github.com/user-attachments/assets/62dc0992-dd93-43be-b9f0-a3bf4a0323f7" />
<img width="611" height="405" alt="Screenshot 2025-08-08 at 8 04 08 PM" src="https://github.com/user-attachments/assets/e4b75f44-47e6-461d-8bd2-ab95df34bc1d" />
</p>

### Possible Enhancements
- [Framer Motion](https://www.framer.com/motion/) for advanced staggered animations
- [SketchRNN (Magenta)](https://magenta.tensorflow.org/sketch_rnn) for AI-generated handwriting strokes
- Custom kerning maps for more natural cursive joins

## Contributions
Contributions are welcome! Feel free to fork this repo and submit a pull request.
