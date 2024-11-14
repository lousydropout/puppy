import { ActionName, actions, pendingQueue, type Action } from "./actions";

const offset = 80;
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;

const SPRITE_WIDTH = 688;
const SPRITE_HEIGHT = 432;
let gameFrame = 0;
let k = 0;

const drawFrame = (
  ctx: CanvasRenderingContext2D,
  frameX: number,
  img: HTMLImageElement
) => {
  if (!ctx) return;
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(
    img,
    frameX * SPRITE_WIDTH + offset,
    0,
    SPRITE_WIDTH - offset,
    SPRITE_HEIGHT,
    0,
    0,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );
};

export const animate = (ctx: CanvasRenderingContext2D, action: Action) => {
  const effectiveStaggerFrames = Math.round(10 * action.rate);

  if (k % effectiveStaggerFrames === 0) {
    drawFrame(ctx, gameFrame % action.frames, action.img);
    gameFrame++;
  }
  k++;

  if (gameFrame < action.frames) {
    requestAnimationFrame(() => animate(ctx, action));
  } else {
    gameFrame = 0;
    k = 0;

    const nextAction: Action = pendingQueue.shift() || actions.normal;
    requestAnimationFrame(() => animate(ctx, nextAction));
  }
};

export const queueAction = (action: ActionName) => {
  if (pendingQueue.length < 5) pendingQueue.push(actions[action]);
};
