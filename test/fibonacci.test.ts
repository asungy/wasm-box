import { assertEquals } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { computeFibonacci, getWasmFunction } from "../src/fibonacci/fibonacci.ts";

Deno.test("Testing Fibonacci implementation (in TypeScript)", () => {
  assertEquals(computeFibonacci(0), 0);
  assertEquals(computeFibonacci(1), 1);
  assertEquals(computeFibonacci(2), 1);
  assertEquals(computeFibonacci(3), 2);
  assertEquals(computeFibonacci(4), 3);
  assertEquals(computeFibonacci(5), 5);
  assertEquals(computeFibonacci(6), 8);
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
