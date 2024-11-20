import { createEffect, createSignal, onMount, Show } from "solid-js";
import { animate, queueAction } from "./utils/animation";
import { Action, ActionName, getActions } from "./utils/actions";
import { Sound } from "./icons/Sound";
import { Muted } from "./icons/Muted";

export const App = () => {
  const [muted, setMuted] = createSignal(true);
  let actions: Record<ActionName, Action> | undefined;

  let canvasRef: HTMLCanvasElement | undefined;
  const bgMusic = new Audio("/level-7-27947.mp3");
  bgMusic.loop = true;

  onMount(async () => {
    if (!canvasRef) return;
    const ctx = canvasRef.getContext("2d");
    if (!ctx) return;
    ctx.globalAlpha = 1;

    actions = await getActions();
    animate(ctx, actions.normal, actions.normal);
  });

  createEffect(() => {
    if (muted()) {
      bgMusic.pause();
    } else {
      bgMusic.play();
    }
  });

  return (
    <>
      <button
        onClick={() => setMuted((prev) => !prev)}
        class="absolute top-0 right-0 p-4 cursor-pointer"
      >
        <Show when={muted()} fallback={<Sound />}>
          <Muted />
        </Show>
      </button>
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
              if (actions) queueAction(actions.happy);
            }}
          >
            "Good puppy!"
          </button>
        </div>
      </div>
    </>
  );
};
