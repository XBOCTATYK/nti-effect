export let frameCount = function _fc(fastTimeStart, preciseTimeStart, callbackFast, callbackPrecise){

  let now = performance.now();

  let fastDuration = now - (fastTimeStart || _fc.startTime);
  let preciseDuration = now - (preciseTimeStart || _fc.startTime);

  if(fastDuration < 100){

    _fc.fastCounter++;

  } else {

    _fc.fastFPS = _fc.fastCounter * 10;
    _fc.fastCounter = 0;
    fastTimeStart = now;
    callbackFast(_fc.fastFPS);
  }

  if(preciseDuration < 1000){

    _fc.preciseCounter++;

  } else {

    _fc.preciseFPS = _fc.preciseCounter;
    _fc.preciseCounter = 0;
    preciseTimeStart = now;
    callbackPrecise(_fc.preciseFPS);

  }
  requestAnimationFrame(() => frameCount(fastTimeStart, preciseTimeStart, callbackFast, callbackPrecise));
};
