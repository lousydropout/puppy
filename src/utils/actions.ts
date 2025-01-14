/**
 * Represents the valid action names for dog animations
 */
export type ActionName =
  | "normal" // Default standing/idle animation
  | "down" // Dog lying down
  | "happy" // Happy/excited animation
  | "rollOver" // Rolling over animation
  | "up" // Standing up from down position
  | "eager" // Eager/anticipating animation
  | "fetch_1" // First part of fetch animation
  | "fetch_2"; // Second part of fetch animation

/**
 * Represents a dog animation action with associated properties
 */
export type Action = {
  name: ActionName; // Name identifier for the action
  img: HTMLImageElement; // Sprite sheet image for the animation
  audio: AudioBuffer | null; // Associated audio for the action
  frames: number; // Number of frames in the animation
  rate: number; // Animation frame rate
  from: ActionName | null | "any"; // Valid previous action state(s)
  next: ActionName; // Next action in sequence
  imageToAudioRatio: number; // Ratio between image and audio duration
};

/**
 * AudioContext instance for handling audio playback
 */
export const audioContext = new AudioContext();

/**
 * Loads and decodes an audio file from the given URL
 * @param url URL of the audio file to load
 * @returns Promise resolving to decoded AudioBuffer
 */
const loadAudioBuffer = async (url: string): Promise<AudioBuffer> => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return audioContext.decodeAudioData(arrayBuffer);
};

/**
 * Loads and initializes all dog animation actions with their associated assets
 * @returns Promise resolving to a record of all available actions
 */
export const getActions = async (): Promise<Record<ActionName, Action>> => {
  const normal = new Image();
  normal.src = "/normal.webp";
  const panting = await loadAudioBuffer("/panting.m4a");

  const down = new Image();
  down.src = "/down.webp";

  const happy = new Image();
  happy.src = "/happy.webp";
  const happyYelp = await loadAudioBuffer("/yelp.aac");

  const rollOver = new Image();
  rollOver.src = "/rollOver.webp";
  const singleYelp = await loadAudioBuffer("/singleYelp.m4a");

  const wait = new Image();
  wait.src = "/wait.webp";

  const eager = new Image();
  eager.src = "/eager.webp";
  const eagerPanting = await loadAudioBuffer("/eagerPanting.m4a");

  const fetch_1 = new Image();
  fetch_1.src = "/fetch_1.webp";
  const fetch = await loadAudioBuffer("/runningYelps.m4a");

  const fetch_2 = new Image();
  fetch_2.src = "/fetch_2.webp";

  return {
    normal: {
      name: "normal",
      img: normal,
      frames: 6,
      audio: panting,
      rate: 6,
      next: "normal",
      from: null,
      imageToAudioRatio: 1,
    },
    down: {
      name: "down",
      img: down,
      frames: 6,
      audio: panting,
      rate: 6,
      next: "down",
      from: "normal",
      imageToAudioRatio: 1,
    },
    up: {
      name: "normal",
      img: normal,
      frames: 6,
      audio: panting,
      rate: 6,
      next: "normal",
      from: "down",
      imageToAudioRatio: 1,
    },
    happy: {
      name: "happy",
      img: happy,
      frames: 12,
      audio: happyYelp,
      rate: 9,
      from: "normal",
      next: "normal",
      imageToAudioRatio: 1,
    },
    rollOver: {
      name: "rollOver",
      img: rollOver,
      frames: 10,
      audio: singleYelp,
      rate: 7,
      from: "down",
      next: "down",
      imageToAudioRatio: 1,
    },
    eager: {
      name: "eager",
      img: eager,
      frames: 6,
      audio: eagerPanting,
      rate: 6,
      from: "any",
      next: "eager",
      imageToAudioRatio: 5,
    },
    fetch_1: {
      name: "fetch_1",
      img: fetch_1,
      frames: 18,
      audio: fetch,
      rate: 6,
      from: "eager",
      next: "fetch_2",
      imageToAudioRatio: 1,
    },
    fetch_2: {
      name: "fetch_2",
      img: fetch_2,
      frames: 18,
      audio: null,
      rate: 6,
      from: "fetch_1",
      next: "normal",
      imageToAudioRatio: 1,
    },
  };
};

/**
 * Queue for storing pending animation actions
 */
export const pendingQueue: Action[] = [];
