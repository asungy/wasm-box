/**
 * Runs the Fibonacci benchmark test
 *
 * @param {number} n - The n-th Fibonacci number to compute
 */
export async function runFibonacciTest(n: number): Promise<void> {
  console.log(`Computing the ${n}-th Fibonacci number`);

  const startMarker1 = "typescript-impl-start";
  const stopMarker1  = "typescript-impl-stop";
  const startMarker2 = "wasm-impl-start";
  const stopMarker2  = "wasm-impl-stop";
  const measureName1 = "Typescript Performance (Fibonacci)";
  const measureName2 = "WebAssembly Performance (Fibonacci)";

  const wasmFibonacci = await getWasmFunction();

  performance.mark(startMarker1);
  fibonacci(n);
  performance.mark(stopMarker1);

  performance.mark(startMarker2);
  wasmFibonacci(n);
  performance.mark(stopMarker2);

  performance.measure(measureName1, startMarker1, stopMarker1);
  performance.measure(measureName2, startMarker2, stopMarker2);

  console.log(performance.getEntriesByType("measure"));

  performance.clearMarks();
  performance.clearMeasures();
}

export function fibonacci(n: number): number {
  // Error case
  if (n < 0) {
    console.error(`Nonsensical input. Specified ${n} Fibonacci numbers.`);
    return n;
  }

  // Base case 1
  if (n == 0) {
    return 0
  }

  // Base case 2
  if (n == 1) {
    return 1
  }

  let s1 = 0;
  let s2 = 1;

  for (let i = 1; i < n; i++) {
    let tmp = s1 + s2;
    s1 = s2;
    s2 = tmp;
  }

  return s2;
}

export async function getWasmFunction(): Promise<CallableFunction> {
  const wasmCode = await Deno.readFile("./bin/fibonacci.wasm");
  const wasmModule = new WebAssembly.Module(wasmCode);
  const wasmInstance = new WebAssembly.Instance(wasmModule);
  return wasmInstance.exports.Fibonacci as CallableFunction;
}
