import { createSignal } from "solid-js";

const [transcript, setTranscript] = createSignal("");
const [sttCompatible, setSttCompatible] = createSignal(false);
const [isRecording, setIsRecording] = createSignal(false);

export {
  transcript,
  setTranscript,
  sttCompatible,
  setSttCompatible,
  isRecording,
  setIsRecording,
};
