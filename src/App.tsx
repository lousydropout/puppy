import { onMount } from "solid-js";
import { animate, queueAction } from "./utils/animation";
import { actions } from "./utils/actions";

export const App = () => {
  let canvasRef: HTMLCanvasElement | undefined;

  onMount(() => {
    if (!canvasRef) return;
    const ctx = canvasRef.getContext("2d");
    if (!ctx) return;
    ctx.globalAlpha = 1;
    animate(ctx, actions.normal);
  });

  return (
    <div class="flex-col items-center pt-8 min-h-screen">
      <canvas class="mx-auto" width={400} height={300} ref={canvasRef}></canvas>
      <h1 class="text-center">Puppy</h1>
      <button
        id="happy-btn"
        class={`bg-slate-300 hover:bg-slate-400 active:bg-slate-500 active:text-white
          border rounded-lg px-4 py-2 mt-4 block mx-auto`}
        onClick={() => queueAction("happy")}
      >
        "Good puppy!"
      </button>
    </div>
  );
};
