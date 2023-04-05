const worker = new Worker("worker.js");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const runMainButton = document.getElementById("run_main");
const runWorkerButton = document.getElementById("run_worker");



let animation;
let primes = [];
let i = 0;


function calculatePrimes() {
    const iterations = document.getElementById("iterations_main").value || 50;

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
    document.getElementById("result_main").value = primes;
}


function calculatePrimesUsingWorker() {
    const iterations = document.getElementById("iterations_worker").value || 50;
    // Source: https://udn.realityripple.com/docs/Tools/Performance/Scenarios/Intensive_JavaScript
    worker.postMessage(iterations);
}


worker.onmessage = function(event)
{
    document.getElementById("result_worker").value = event.data;
}


function startAnimation() {
  startButton.disabled = true;
  stopButton.disabled = false;
  animation = window.requestAnimationFrame(step);
}


function step() {
  document.getElementById("counter").value = i++;
  animation = window.requestAnimationFrame(step);
}


function stopAnimation() {
  startButton.disabled = false;
  stopButton.disabled = true;
  window.cancelAnimationFrame(animation)
}


startButton.addEventListener('click', startAnimation);
stopButton.addEventListener('click', stopAnimation);
runMainButton.addEventListener('click', calculatePrimes);
runWorkerButton.addEventListener('click', calculatePrimesUsingWorker);

document.getElementById("animationForm").addEventListener("submit", function(event) {
  event.preventDefault();
});

