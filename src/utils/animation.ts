import { audioContext, pendingQueue, type Action } from "@/utils/actions";

const offset = 80;
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;

const SPRITE_WIDTH = 688;
const SPRITE_HEIGHT = 432;
let gameFrame = 0;
let startTime: number | null = null; // Tracks the start time of the animation

const playAudio = (buffer: AudioBuffer) => {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start(0); // Start immediately
};

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
  defaultAction: Action,
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
    requestAnimationFrame((newTimestamp) =>
      animate(ctx, action, defaultAction, newTimestamp)
    );
  } else {
    // Animation complete -> reset and queue the next action
    gameFrame = 0;
    startTime = null; // Reset start time for the next animation

    const nextAction: Action = pendingQueue.shift() || defaultAction;
    if (nextAction.audio) playAudio(nextAction.audio);
    requestAnimationFrame((newTimestamp) =>
      animate(ctx, nextAction, defaultAction, newTimestamp)
    );
  }
};

export const queueAction = (action: Action) => {
  if (pendingQueue.length < 1) pendingQueue.push(action);
};
