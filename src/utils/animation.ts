// This module handles sprite animation and audio playback for game actions
import {
  audioContext,
  pendingQueue,
  type Action,
  getActions,
  ActionName,
} from "@/utils/actions";
import { muted, actions, setActions } from "@/utils/store";

// Initialize actions from store
getActions().then((actions) => setActions(actions));

// Canvas and sprite dimensions
const offset = 80;
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;

const SPRITE_WIDTH = 688;
const SPRITE_HEIGHT = 432;
let gameFrame = 0;
let startTime: number | null = null; // Tracks the start time of the animation

// Audio playback state
let currentAudio: AudioBufferSourceNode | undefined;

/**
 * Plays an audio buffer through the audio context
 * @param buffer - The audio buffer to play
 */
const playAudio = (buffer: AudioBuffer) => {
  currentAudio = audioContext.createBufferSource();
  currentAudio.buffer = buffer;
  currentAudio.connect(audioContext.destination);
  currentAudio.start(0); // Start immediately
};

/**
 * Draws a single frame of the sprite animation
 * @param ctx - The canvas rendering context
 * @param frameX - The frame index to draw
 * @param img - The sprite sheet image
 */
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

let newAnimation = true;

/**
 * Main animation loop that handles sprite animation and audio playback
 * @param ctx - The canvas rendering context
 * @param action - The current action being animated
 * @param timestamp - Current animation timestamp
 * @param iterRemaining - Number of iterations remaining for the current action
 */
export const animate = (
  ctx: CanvasRenderingContext2D,
  action: Action,
  timestamp: number = performance.now(),
  iterRemaining: number | null = null
) => {
  const frameInterval = 1000 / action.rate; // Time (ms) per frame based on rate
  const _iterRemaining =
    iterRemaining && iterRemaining >= 0
      ? iterRemaining
      : action.imageToAudioRatio;

  // Check if the audio should be initiated
  if (
    !muted() &&
    action.audio &&
    _iterRemaining === action.imageToAudioRatio &&
    newAnimation
  ) {
    // if (currentAudio) (currentAudio as AudioBufferSourceNode).stop();
    playAudio(action.audio);
    newAnimation = false; // Prevent audio from playing again during this cycle
  }

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
      animate(ctx, action, newTimestamp, _iterRemaining)
    );
  } else {
    // Animation complete -> reset and queue the next action
    gameFrame = 0;
    startTime = null; // Reset start time for the next animation

    let nextAction: Action | undefined;
    if (_iterRemaining > 1) {
      nextAction = action;
    } else {
      const nextInQueue = pendingQueue.shift();
      // if the next action in the queue is not allowed from the current action,
      // then ignore the next action in the queue and get the next action from the current action
      nextAction = [action.name, "any"].includes(nextInQueue?.from ?? "")
        ? nextInQueue
        : (actions() as Record<ActionName, Action>)[action.next];
    }

    requestAnimationFrame((newTimestamp) => {
      newAnimation = true;
      return animate(
        ctx,
        nextAction as Action,
        newTimestamp,
        _iterRemaining - 1
      );
    });
  }
};

/**
 * Adds an action to the pending queue if queue is empty
 * @param action - The action to queue
 */
export const queueAction = (action: Action) => {
  if (pendingQueue.length < 1) pendingQueue.push(action);
};
