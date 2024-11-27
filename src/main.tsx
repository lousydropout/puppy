import { createEffect, createSignal, onCleanup, onMount, Show } from "solid-js";
import { Sound } from "@/icons/Sound";
import { Muted } from "@/icons/Muted";
import { Action, ActionName, getActions } from "@/utils/actions";
import { animate, queueAction } from "@/utils/animation";
import { sendAudio } from "@/utils/server";
import { toaster } from "@kobalte/core";
import {
  Toast,
  ToastContent,
  ToastDescription,
  ToastProgress,
  ToastTitle,
} from "@/components/ui/toast";

const MIME_TYPE = "audio/webm" as const;

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export default function Main() {
  const [muted, setMuted] = createSignal(true);
  const [recording, setRecording] = createSignal(false);
  const [audioBlob, setAudioBlob] = createSignal<Blob | null>(null);
  const [audioUrl, setAudioUrl] = createSignal<string>("");
  const [command, setCommand] = createSignal<string>("");
  const [confidence, setConfidence] = createSignal<number>(0);
  const [error, setError] = createSignal<string>("");

  let actions: Record<ActionName, Action> | undefined;
  let canvasRef: HTMLCanvasElement | undefined;
  let mediaRecorder: MediaRecorder | undefined;
  let audioChunks: Blob[] = [];

  const bgMusic = new Audio("/level-7-27947.mp3");
  bgMusic.loop = true;

  const showToast = () => {
    toaster.show((props) => (
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

  // Start recording
  const startRecording = async () => {
    setError("");
    setCommand("");
    setConfidence(0);
    try {
      setMuted(true); // Pause background music
      audioChunks = []; // Reset the audio chunks
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        try {
          setMuted(false); // Resume background music

          const _blob = new Blob(audioChunks, { type: MIME_TYPE });
          setAudioBlob(_blob);
          const generatedUrl = URL.createObjectURL(_blob);
          setAudioUrl(generatedUrl);

          // Convert to Base64 and send
          const audioBase64 = await blobToBase64(_blob);

          const result = await sendAudio(audioBase64, _blob.type);
          // result = {
          //   "result_index": 0,
          //   "results": [
          //     {
          //       "final": true,
          //       "alternatives": [
          //         {
          //           "transcript": "apple for ",
          //           "confidence": 0.4
          //         }
          //       ]
          //     }
          //   ]
          // }
          console.log("Recognition result: ", JSON.stringify(result, null, 2));

          setCommand(result.results[0].alternatives[0].transcript);
          setConfidence(result.results[0].alternatives[0].confidence);
        } catch (error) {
          console.error("Error processing recorded audio:", error);
          setError("Error processing recorded audio");
        }
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error: any) {
      console.error("Error accessing microphone:", error);
      console.error(error.message);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  onMount(async () => {
    if (!canvasRef) return;
    const ctx = canvasRef.getContext("2d");
    if (!ctx) return;

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

  onCleanup(() => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
    }
    bgMusic.pause();
  });

  createEffect(() => {
    console.log("Command: ", command());
    if (command().split(" ").includes("good")) {
      console.log("includes good!");
      queueAction(actions!.happy);
      setCommand("");
    }
  }, command);

  return (
    <main class={recording() ? "bg-red-500 bg-opacity-60" : ""}>
      <button
        onClick={() => setMuted((prev) => !prev)}
        class="absolute top-0 right-0 p-4 cursor-pointer"
      >
        <Show when={muted()} fallback={<Sound />}>
          <Muted />
        </Show>
      </button>
      <div class="flex flex-col items-center justify-start py-16 gap-16 min-h-screen">
        <h1
          class="text-7xl font-semibold italic text-center cursor-pointer"
          onClick={showToast}
        >
          Puppy
          {/* {
            <>
              <span> - </span>
              <span class="sm:hidden">xs</span>
              <span class="hidden sm:inline md:hidden">sm</span>
              <span class="hidden md:inline lg:hidden">md</span>
              <span class="hidden lg:inline xl:hidden">lg</span>
              <span class="hidden xl:inline">xl</span>
            </>
          } */}
        </h1>
        <div class="flex flex-col items-center">
          <canvas width={400} height={300} ref={canvasRef}></canvas>
          <button
            class={`bg-slate-300 hover:bg-slate-400 hover:text-white
                    active:bg-slate-500 active:text-white
                    border rounded-lg px-5 py-3 mt-4
                    hidden sm:block`}
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
          >
            {recording() ? "Stop Recording" : "Start Recording"}
          </button>
          {error() && <p class="text-lg mt-4 text-red-500">Error: {error()}</p>}
          {command() && (
            <>
              <p class="text-lg mt-4">
                Command: <strong>{command()}</strong>
              </p>
              <p class="text-lg mt-4">
                Confidence: <strong>{confidence()}</strong>
              </p>
            </>
          )}
          <button
            class="bg-slate-300 hover:bg-slate-400 active:bg-slate-500 border rounded-lg px-5 py-3 mt-4"
            onClick={() => actions && queueAction(actions.happy)}
          >
            "Good puppy!"
          </button>
        </div>
      </div>
    </main>
  );
}
