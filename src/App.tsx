import { onMount } from "solid-js";
import { animate, queueAction } from "./utils/animation";
import { actions } from "./utils/actions";

export const App = () => {
  let canvasRef: HTMLCanvasElement | undefined;
  const bgMusic = new Audio("/level-7-27947.mp3");
  bgMusic.loop = true;
  bgMusic.play();

  onMount(() => {
    if (!canvasRef) return;
    const ctx = canvasRef.getContext("2d");
    if (!ctx) return;
    ctx.globalAlpha = 1;
    animate(ctx, actions.normal);
  });

  return (
    <div class="flex flex-col items-center justify-start py-16 gap-16 min-h-screen">
      <h1 class="text-7xl font-semibold italic text-center">Puppy</h1>
      <div class="flex flex-col">
        <canvas width={400} height={300} ref={canvasRef}></canvas>
        <button
          class={`bg-slate-300
          hover:bg-slate-400 hover:text-white
          active:bg-slate-500 active:text-white
          border rounded-lg px-5 py-3 block w-fit mx-auto mt-4`}
          onClick={() => {
            queueAction("happy");
          }}
        >
          "Good puppy!"
        </button>
      </div>
    </div>
  );
};
