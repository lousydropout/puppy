import { createEffect, onCleanup, onMount } from "solid-js";
import { Action, ActionName, getActions } from "@/utils/actions";
import { animate, queueAction } from "@/utils/animation";
import { toaster } from "@kobalte/core";
import {
  Toast,
  ToastContent,
  ToastDescription,
  ToastProgress,
  ToastTitle,
} from "@/components/ui/toast";

export default function Main() {
  let bgMusic: HTMLAudioElement | undefined;
  let actions: Record<ActionName, Action> | undefined;
  let bg: HTMLAudioElement | undefined;
  let canvasRef: HTMLCanvasElement | undefined;

  const showToast = () => {
    toaster.show((props: any) => (
      <Toast
        toastId={props.toastId}
        duration={1_500}
        class="bg-white bg-opacity-95"
      >
        <ToastContent>
          <ToastTitle>Scooby</ToastTitle>
          <ToastDescription>
            <p>Gender: male</p>
            <p>Breed: mixed (dunno mix of what though)</p>
            <p>Date of birth: June 6th, 2016</p>
          </ToastDescription>
        </ToastContent>
        <ToastProgress />
      </Toast>
    ));
  };

  onMount(async () => {
    if (!canvasRef) return;
    const ctx = canvasRef.getContext("2d");
    if (!ctx) return;

    actions = await getActions();
    animate(ctx, actions.normal);
  });

  createEffect(() => {
    (bg as HTMLAudioElement).volume = 0.2;
    if (typeof window !== "undefined" && !bgMusic) {
      bgMusic = new Audio("/level-7-27947.m4a");
      bgMusic.loop = true;
    }
  });
  onCleanup(() => (bgMusic ? bgMusic.pause() : {}));

  const ButtonCommands = () => {
    return (
      <div class="flex flex-col">
        <button
          class="bg-red-500 hover:bg-red-600 active:bg-red-700 border rounded-lg px-5 py-3 mt-4 min-h-12"
          onClick={() => actions && queueAction(actions.fetch_1)}
        ></button>
        <div class="flex gap-4 items-center justify-between">
          <button
            class="bg-blue-300 hover:bg-blue-400 active:bg-blue-500 border rounded-lg px-5 py-3 mt-4 min-h-12"
            onClick={() => actions && queueAction(actions.happy)}
          ></button>
          <button
            class="bg-green-300 hover:bg-green-400 active:bg-green-500 border rounded-lg px-5 py-3 mt-4 min-h-12"
            onClick={() => actions && queueAction(actions.down)}
          ></button>
          <button
            class="bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-500 border rounded-lg px-5 py-3 mt-4 min-h-12"
            onClick={() => actions && queueAction(actions.up)}
          ></button>
          <button
            class="bg-purple-300 hover:bg-purple-400 active:bg-purple-500 border rounded-lg px-5 py-3 mt-4 min-h-12"
            onClick={() => actions && queueAction(actions.rollOver)}
          ></button>
          <button
            class="bg-pink-300 hover:bg-pink-400 active:bg-pink-500 border rounded-lg px-5 py-3 mt-4 min-h-12"
            onClick={() => actions && queueAction(actions.eager)}
          ></button>
        </div>
      </div>
    );
  };

  return (
    <main>
      <div class="flex flex-col items-center justify-start py-4 gap-4">
        <audio controls autoplay loop ref={(el) => (bg = el)}>
          <source src="/level-7-27947.mp3" type="audio/mp3" />
        </audio>
        <div class="w-full flex flex-col items-center">
          <canvas width={400} height={300} ref={canvasRef}></canvas>
          <ButtonCommands />
        </div>
      </div>
    </main>
  );
}
