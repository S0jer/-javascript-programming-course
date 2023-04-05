const worker = new Worker("worker.js");
let animation;
let primes = [];
let i = 0;


function calculatePrimes() {
    const iterations = document.forms[0].iterations_main.value || 50;
    // Source: https://udn.realityripple.com/docs/Tools/Performance/Scenarios/Intensive_JavaScript
    let primes = [];
    for (let i = 0; i < iterations; i++) {
      let candidate = i * (1000000000 * Math.random());
      let isPrime = true;
      for (let c = 2; c <= Math.sqrt(candidate); ++c) {
        if (candidate % c === 0) {
          // not prime
          isPrime = false;
          break;
        }
      }
      if (isPrime) {
        primes.push(candidate);
      }
    }
    return primes;
}


function calculatePrimesUsingWorker() {
    const iterations = document.forms[0].iterations_worker.value || 50;
    // Source: https://udn.realityripple.com/docs/Tools/Performance/Scenarios/Intensive_JavaScript
    worker.postMessage(iterations);
}


worker.onmessage = function(event)
{
    document.forms[0].result_worker.value = event.data;
}


function startAnimation() {
  document.forms[0].start.disabled = true;
  document.forms[0].stop.disabled = false;
  animation = window.requestAnimationFrame(step);
}


function step() {
  document.forms[0].counter.value = i++;
  animation = window.requestAnimationFrame(step);
}


function stopAnimation() {
  document.forms[0].start.disabled = false;
  document.forms[0].stop.disabled = true;
  window.cancelAnimationFrame(animation)
}

