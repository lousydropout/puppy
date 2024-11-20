import { ActionName, actions, pendingQueue, type Action } from "./actions";

const offset = 80;
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;

const SPRITE_WIDTH = 688;
const SPRITE_HEIGHT = 432;
let gameFrame = 0;
let startTime: number | null = null; // Tracks the start time of the animation

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

export const animate = (
  ctx: CanvasRenderingContext2D,
  action: Action,
  timestamp: number = performance.now()
) => {
  const frameInterval = 1000 / action.rate; // Time (ms) per frame based on rate

  if (startTime === null) {
    startTime = timestamp; // Initialize start time at the first frame
  }

  // Calculate the expected time for the current frame
  const expectedTime = startTime + gameFrame * frameInterval;

  if (timestamp >= expectedTime) {
    // Render the frame
    drawFrame(ctx, gameFrame % action.frames, action.img);
    gameFrame++; // Move to the next frame
  }

  if (gameFrame < action.frames) {
    // Continue animation
    requestAnimationFrame((newTimestamp) => animate(ctx, action, newTimestamp));
  } else {
    // Animation complete -> reset and queue the next action
    gameFrame = 0;
    startTime = null; // Reset start time for the next animation

    const nextAction: Action = pendingQueue.shift() || actions.normal;
    if (nextAction.audio) {
      nextAction.audio.pause();
      nextAction.audio.currentTime = 0;
      nextAction.audio.play();
    }
    requestAnimationFrame((newTimestamp) =>
      animate(ctx, nextAction, newTimestamp)
    );
  }
};

export const queueAction = (action: ActionName) => {
  const queuedAction = actions[action];

  if (queuedAction.audio && queuedAction.audio.readyState < 4) {
    // Preload the audio if not already loaded
    queuedAction.audio.load();
  }

  if (pendingQueue.length < 3) pendingQueue.push(queuedAction);
};
