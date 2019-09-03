import {frameCount} from "./frameCounter";

export const setFrameCounter = (callback) => {
  frameCount.fastCounter = 0;
  frameCount.fastFPS = 0;
  frameCount.preciseCounter = 0;
  frameCount.preciseFPS = 0;
  frameCount.startTime = performance.now();

  let averageFpsArr = [];
  let avg = 0;

  frameCount(
    performance.now(),
    performance.now(),
    (fps) => {avg = fps;},
    (fps) => {}
  );

  setTimeout(() => {
    console.log(avg);
    callback(avg);
  }, 1500)
};
