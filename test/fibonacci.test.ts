import { assertEquals } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { fibonacci, getWasmFunction } from "../src/fibonacci/fibonacci.ts";

Deno.test("Testing Fibonacci implementation (in TypeScript)", () => {
  assertEquals(fibonacci(0), 0);
  assertEquals(fibonacci(1), 1);
  assertEquals(fibonacci(2), 1);
  assertEquals(fibonacci(3), 2);
  assertEquals(fibonacci(4), 3);
  assertEquals(fibonacci(5), 5);
  assertEquals(fibonacci(6), 8);
});

Deno.test("Testing Fibonacci implementation (in WebAssembly Text)", async () => {
  const wasmFibonacci = await getWasmFunction();
  assertEquals(wasmFibonacci(0), 0);
  assertEquals(wasmFibonacci(1), 1);
  assertEquals(wasmFibonacci(2), 1);
  assertEquals(wasmFibonacci(3), 2);
  assertEquals(wasmFibonacci(4), 3);
  assertEquals(wasmFibonacci(5), 5);
  assertEquals(wasmFibonacci(6), 8);
});
