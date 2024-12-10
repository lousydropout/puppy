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

type MainProps = {
  bgMusic: HTMLAudioElement;
};

export default function Main(props: MainProps) {
  const { bgMusic } = props;

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

  createEffect(() => ((bg as HTMLAudioElement).volume = 0.2));

  onCleanup(() => bgMusic.pause());

  const ButtonCommands = () => {
    return (
      <>
        <button
          class="bg-slate-300 hover:bg-slate-400 active:bg-slate-500 border rounded-lg px-5 py-3 mt-4"
          onClick={() => actions && queueAction(actions.happy)}
        >
          "Good puppy!"
        </button>
        <button
          class="bg-slate-300 hover:bg-slate-400 active:bg-slate-500 border rounded-lg px-5 py-3 mt-4"
          onClick={() => actions && queueAction(actions.down)}
        >
          "down"
        </button>
        <button
          class="bg-slate-300 hover:bg-slate-400 active:bg-slate-500 border rounded-lg px-5 py-3 mt-4"
          onClick={() => actions && queueAction(actions.up)}
        >
          "up"
        </button>
        <button
          class="bg-slate-300 hover:bg-slate-400 active:bg-slate-500 border rounded-lg px-5 py-3 mt-4"
          onClick={() => actions && queueAction(actions.rollOver)}
        >
          "roll over"
        </button>
        <button
          class="bg-slate-300 hover:bg-slate-400 active:bg-slate-500 border rounded-lg px-5 py-3 mt-4"
          onClick={() => actions && queueAction(actions.eager)}
        >
          "Who wants a treat?"
        </button>
        <button
          class="bg-slate-300 hover:bg-slate-400 active:bg-slate-500 border rounded-lg px-5 py-3 mt-4"
          onClick={() => {
            actions && queueAction(actions.fetch_1);
            console.log("Fetch treat!");
          }}
        >
          (Throw treat)
        </button>
      </>
    );
  };

  return (
    <main>
      <audio
        class="absolute top-0 right-0 p-4"
        controls
        autoplay
        loop
        ref={(el) => (bg = el)}
      >
        <source src="/level-7-27947.mp3" type="audio/mp3" />
      </audio>
      <div class="flex flex-col items-center justify-start py-16 gap-16 min-h-screen">
        <h1
          class="text-7xl font-semibold italic text-center cursor-pointer"
          onClick={showToast}
        >
          Puppy
        </h1>
        <div class="w-full min-h-screen flex flex-col items-center">
          <canvas width={400} height={300} ref={canvasRef}></canvas>
          <ButtonCommands />
        </div>
      </div>
    </main>
  );
}
