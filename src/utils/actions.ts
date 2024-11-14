export type ActionName = "normal" | "happy";
export type Action = {
  img: HTMLImageElement;
  frames: number;
  rate: number;
};

const getActions = (): Record<ActionName, Action> => {
  const normal = new Image();
  normal.src = "/normal.webp";

  const happy = new Image();
  happy.src = "/happy.webp";

  return {
    normal: { img: normal, frames: 6, rate: 1.8 },
    happy: { img: happy, frames: 12, rate: 1 },
  };
};

export const actions = getActions();
export const pendingQueue: Action[] = [];
