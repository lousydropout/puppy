import { Mic } from "./icons/Mic";
import { MicPressed } from "./icons/MicPressed";
import { isRecording, transcript } from "./store";

export const SpeechToText = () => {
  return (
    <div class="flex flex-col items-center space-y-4">
      <button
        class={`w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-200 ${
          isRecording() ? "bg-red-500" : "bg-gray-500"
        }`}
      >
        {isRecording() ? <MicPressed /> : <Mic />}
      </button>
      <p class="text-gray-800 text-center">{transcript()}</p>
    </div>
  );
};
