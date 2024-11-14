import { createEffect, onMount } from "solid-js";
import { animate, queueAction } from "./utils/animation";
import { actions } from "./utils/actions";
import { transcript } from "./store";
import {
  isRecording,
  setIsRecording,
  setSttCompatible,
  setTranscript,
} from "./store";

export const App = () => {
  setSttCompatible(
    "SpeechRecognition" in window || "webkitSpeechRecognition" in window
  );

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onresult = (event: any) => {
    console.log("[recognition.onresult] event: ", event);
    setIsRecording(false);

    const speechResult = Array.from(event.results)
      .map((result: any) => result[0].transcript)
      .join("");
    console.log("speechResult: ", speechResult);
    setTranscript(speechResult);
  };

  const startRecording = () => {
    console.log("down");
    setIsRecording(true);
    console.log("isRecording: ", isRecording());
    recognition.start();
  };

  const stopRecording = () => {
    console.log("up");
    setIsRecording(false);
    console.log("isRecording: ", isRecording());
  };

  const root = document.getElementById("root");
  root?.addEventListener("mousedown", startRecording);
  root?.addEventListener("mouseup", stopRecording);

  let canvasRef: HTMLCanvasElement | undefined;

  onMount(() => {
    if (!canvasRef) return;
    const ctx = canvasRef.getContext("2d");
    if (!ctx) return;
    ctx.globalAlpha = 1;
    animate(ctx, actions.normal);
  });

  createEffect(() => {
    const text = transcript().toLowerCase();

    switch (text) {
      case "good puppy":
        queueAction("happy");
        setTranscript("");
        break;
      // Add more cases as needed
      default:
        console.log("No matches found for: ", text);
    }
  });

  return (
    <div class="flex-col items-center pt-8 min-h-screen min-w-[500px]">
      <canvas class="mx-auto" width={700} height={500} ref={canvasRef}></canvas>
      {/* <SpeechToText />
      <h1 class="text-center">Transcript: {transcript() || "nothing"}</h1> */}
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
