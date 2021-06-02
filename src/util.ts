export async function buildWASMFiles(): Promise<void> {
  await createWASMDirectory();
  await compileWAT();
}

export async function getWATFiles(): Promise<string[]> {
  // Run find command to search for .wat files
  const process = Deno.run({
    cmd: [ "find", ".", "-type", "f", "-name", "*.wat", ],
    stdout: "piped",
    stderr: "piped",
  });
  await process.status();
  const rawOutput = await process.output();
  // Closing resources
  process.stderr.close();
  process.close();
  // Convert raw bytes to characters
  let stringOutput = uint8ArrayToCharArray(rawOutput);
  let watFiles = stringOutput.split("\n").slice(0, -1);

  return watFiles;
}

async function createWASMDirectory(): Promise<void> {
  const process = Deno.run({
    cmd: ["mkdir", "-p", "bin"],
  });
  await process.status();
  process.close();
}

/**
 * Get filename from path without extension.
 *
 * @param path
 */
function getFileNameNoExt(path: string): string {
  const beginIdx = path.lastIndexOf("/") + 1;
  const lastIdx = path.lastIndexOf(".wat");
  return path.slice(beginIdx, lastIdx);
}

async function compileWAT(): Promise<void> {
  const watFiles: string[] = await getWATFiles();

  for (let filepath of watFiles) {
    const filename = "./bin/" + getFileNameNoExt(filepath) + ".wasm";
    const process = Deno.run({
      cmd: ["wat2wasm", filepath, "-o", filename],
    });
    const { code } = await process.status();
    process.close();

    if (code !== 0) {
      console.error(`Error compiling WAT file: ${filepath}`);
      Deno.exit(code);
    }
  }
}

function uint8ArrayToCharArray(intArray: Uint8Array): string {
  let result = "";
  for (let i = 0; i < intArray.length; i++) {
    result += String.fromCharCode(intArray[i]);
  }
  return result;
}

