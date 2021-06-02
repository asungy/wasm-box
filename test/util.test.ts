import { assertEquals } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { getWATFiles } from "../src/util.ts";

Deno.test("Testing getWATFiles", async () => {
  const results: string[] = await getWATFiles();
  assertEquals(results[0], "./src/primes/primes.wat");
  assertEquals(results[1], "./src/fibonacci/fibonacci.wat"); 
});
