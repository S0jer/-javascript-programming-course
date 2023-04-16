// Licznik uruchomień - src/console_script2.js
import { promises as fs, readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import readline from "readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const inputFile = `${__dirname}/licznik.txt`;

const args = process.argv.slice(2);

async function readAndIncrementCounter(file, sync) {
  let count;
  if (sync) {
    try {
      count = Number(readFileSync(file, "utf-8"));
    } catch (err) {
      count = 0;
    }
    count += 1;
    writeFileSync(file, String(count), "utf-8");
  } else {
    try {
      const data = await fs.readFile(file, "utf-8");
      count = Number(data) + 1;
    } catch (err) {
      count = 1;
    }
    await fs.writeFile(file, String(count), "utf-8");
  }
  return count;
}

(async () => {
  if (args.includes("--sync")) {
    const count = await readAndIncrementCounter(inputFile, true);
    console.log(`Liczba uruchomień: ${count}`);
  } else if (args.includes("--async")) {
    const count = await readAndIncrementCounter(inputFile, false);
    console.log(`Liczba uruchomień: ${count}`);
  } else {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log(
      "Wprowadź komendy — naciśnięcie Ctrl+D kończy wprowadzanie danych"
    );

    rl.on("line", (input) => {
      import("child_process").then(({ exec }) => {
        exec(input, (error, stdout) => {
          if (error) {
            console.error(`Błąd wykonania komendy: ${error}`);
            return;
          }
          console.log(stdout);
        });
      });
    });

    rl.on("close", () => {
      process.exit();
    });
  }
})();
