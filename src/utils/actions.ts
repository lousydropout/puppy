export type ActionName = "normal" | "happy";
export type Action = {
  img: HTMLImageElement;
  audio: AudioBuffer | null;
  frames: number;
  rate: number;
};

export const audioContext = new AudioContext();

const loadAudioBuffer = async (url: string): Promise<AudioBuffer> => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return audioContext.decodeAudioData(arrayBuffer);
};

const getActions = async (): Promise<Record<ActionName, Action>> => {
  const normal = new Image();
  normal.src = "/normal.webp";

  const happy = new Image();
  happy.src = "/happy.webp";
  const happyYelp = await loadAudioBuffer("/yelp.aac");

  return {
    normal: { img: normal, frames: 6, audio: null, rate: 6 },
    happy: { img: happy, frames: 12, audio: happyYelp, rate: 12 },
  };
};

export const actions = await getActions();
export const pendingQueue: Action[] = [];
