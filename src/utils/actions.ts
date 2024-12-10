export type ActionName =
  | "normal"
  | "down"
  | "happy"
  | "rollOver"
  | "up"
  | "eager"
  | "fetch_1"
  | "fetch_2";
export type Action = {
  name: ActionName;
  img: HTMLImageElement;
  audio: AudioBuffer | null;
  frames: number;
  rate: number;
  from: ActionName | null | "any";
  next: ActionName;
  imageToAudioRatio: number;
};

export const audioContext = new AudioContext();

const loadAudioBuffer = async (url: string): Promise<AudioBuffer> => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return audioContext.decodeAudioData(arrayBuffer);
};

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

export const pendingQueue: Action[] = [];
