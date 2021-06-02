/**
 * Runs the Fibonacci benchmark test
 *
 * @param {number} n - The n-th Fibonacci number to compute
 */
export async function runFibonacciTest(n: number): Promise<void> {
  console.log(`Computing the ${n}-th Fibonacci number`);

  console.log(computeFibonacci(n));

  const wasmFibonacci = await getWasmFunction();
  console.log(wasmFibonacci(42));
}

export function computeFibonacci(n: number): number {
  // Error case
  if (n < 0) {
    console.error(`Nonsensical input. Specified ${n} Fibonacci numbers.`);
    return n;
  }

  // Base case 1
  if (n == 0) {
    return 0
  }

  // Base case 1
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

async function getWasmFunction(): Promise<CallableFunction> {
  const wasmCode = await Deno.readFile("./fibonacci.wasm");
  const wasmModule = new WebAssembly.Module(wasmCode);
  const wasmInstance = new WebAssembly.Instance(wasmModule);
  return wasmInstance.exports.Fibonacci as CallableFunction;
}
