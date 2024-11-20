export type ActionName = "normal" | "happy";
export type Action = {
  img: HTMLImageElement;
  audio: HTMLAudioElement | null;
  frames: number;
  rate: number;
};

const getActions = (): Record<ActionName, Action> => {
  const normal = new Image();
  normal.src = "/normal.webp";

  const happy = new Image();
  happy.src = "/happy.webp";
  const happyYelp = new Audio("/yelp.aac");

  return {
    normal: { img: normal, frames: 6, audio: null, rate: 6 },
    happy: { img: happy, frames: 12, audio: happyYelp, rate: 12 },
  };
};

export const actions = getActions();
export const pendingQueue: Action[] = [];
