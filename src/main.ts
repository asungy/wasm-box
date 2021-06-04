import { runFibonacciTest } from "./fibonacci/fibonacci.ts";
import { buildWASMFiles } from "./util.ts";

switch (Deno.args[0]) {
  case undefined:
    console.log("Usage: main.ts <command>");
    break;
  // Compiles all WAT files
  case "compile":
    buildWASMFiles();
    break;
  // Run Fibonacci benchmark. Specify the desired index of the fibonacci sequence with arg1. 
  case "fibonacci":
    let arg1 = parseInt(Deno.args[1]);
    await buildWASMFiles();
    await runFibonacciTest(arg1);
    break;

  default:
    console.log(`Unknown command: ${Deno.args[0]}`);
}
